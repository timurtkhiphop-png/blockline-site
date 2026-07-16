<?php

// Заголовки ответа
header("Content-Type: application/json; charset=utf-8");
header("Cache-Control: no-store");
header("X-Content-Type-Options: nosniff");

// Проверка метода
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["ok" => false, "error" => "method_not_allowed"]);
    exit;
}

// Ограничение размера запроса (32 KB)
$max_size = 32 * 1024;
if ((int) $_SERVER['CONTENT_LENGTH'] > $max_size) {
    http_response_code(413);
    echo json_encode(["ok" => false, "error" => "payload_too_large"]);
    exit;
}

// Чтение JSON из тела
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => "bad_request"]);
    exit;
}

// honeypot проверка
if (!empty($data['bot_check'])) {
    // Делаем вид, что всё ок, но не отправляем
    echo json_encode(["ok" => true]);
    exit;
}

// Извлечение form_started_at как дополнительного сигнала,
// но без жесткой блокировки пользователя.
$form_started_at = isset($data['form_started_at']) ? (int) $data['form_started_at'] : 0;
// $time_diff = (time() * 1000) - $form_started_at;

// Валидация полей
$name = isset($data['name']) ? trim((string)$data['name']) : '';
$contactMethod = isset($data['contactMethod']) ? trim((string)$data['contactMethod']) : '';
$description = isset($data['description']) ? trim((string)$data['description']) : '';
$consent = isset($data['consent']) ? $data['consent'] : false;

if ($consent !== true) {
    http_response_code(422);
    echo json_encode(["ok" => false, "error" => "consent_required"]);
    exit;
}

function safe_len($str) {
    return function_exists('mb_strlen') ? mb_strlen($str, 'UTF-8') : strlen($str);
}

$name_len = safe_len($name);
$contact_len = safe_len($contactMethod);
$desc_len = safe_len($description);

if ($name_len < 2 || $name_len > 80 ||
    $contact_len < 3 || $contact_len > 180 ||
    $desc_len < 10 || $desc_len > 2000) {
    echo json_encode(["ok" => false, "error" => "validation_failed"]);
    exit;
}

// Получение секретов
$token = getenv("TELEGRAM_BOT_TOKEN");
$chat_id = getenv("TELEGRAM_CHAT_ID");
$rate_limit_secret = getenv("RATE_LIMIT_SECRET");

$config_path = dirname($_SERVER["DOCUMENT_ROOT"]) . "/private/820lab-lead-config.php";
if (file_exists($config_path)) {
    $config = include $config_path;
    if (is_array($config)) {
        $token = $config['telegram_bot_token'] ?? $token;
        $chat_id = $config['telegram_chat_id'] ?? $chat_id;
        $rate_limit_secret = $config['rate_limit_secret'] ?? $rate_limit_secret;
    }
}

if (!$token || !$chat_id || !$rate_limit_secret) {
    http_response_code(503);
    echo json_encode(["ok" => false, "error" => "service_not_configured"]);
    exit;
}

// Rate Limiting (3 attempts / 10 min)
$ip = $_SERVER["REMOTE_ADDR"] ?? 'unknown_ip';
$ip_hash = hash_hmac("sha256", $ip, $rate_limit_secret);

$tmp_dir = sys_get_temp_dir();
$rate_limit_file = rtrim($tmp_dir, '/\\') . '/820lab_rate_limit.json';

$fp = fopen($rate_limit_file, 'c+');
if ($fp) {
    flock($fp, LOCK_EX);

    $file_content = stream_get_contents($fp);
    $limits = [];
    if (!empty($file_content)) {
        $limits = json_decode($file_content, true) ?: [];
    }

    $now = time();
    $window_start = $now - (10 * 60); // 10 min window

    // Cleanup old entries
    foreach ($limits as $hash => $timestamps) {
        $limits[$hash] = array_filter($timestamps, function($ts) use ($window_start) {
            return $ts >= $window_start;
        });
        if (empty($limits[$hash])) {
            unset($limits[$hash]);
        }
    }

    $user_attempts = $limits[$ip_hash] ?? [];

    if (count($user_attempts) >= 3) {
        flock($fp, LOCK_UN);
        fclose($fp);
        http_response_code(429);
        echo json_encode(["ok" => false, "error" => "rate_limited"]);
        exit;
    }

    // Record new attempt
    $limits[$ip_hash][] = $now;

    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($limits));
    flock($fp, LOCK_UN);
    fclose($fp);
}

// Формирование сообщения
$text = "Новая заявка с 820lab.ru\n\n";
$text .= "Имя:\n{$name}\n\n";
$text .= "Контакт:\n{$contactMethod}\n\n";
$text .= "Задача:\n{$description}\n\n";
$text .= "Согласие на обработку данных: получено";

// Отправка в Telegram
$tg_url = "https://api.telegram.org/bot" . urlencode($token) . "/sendMessage";
$tg_data = json_encode([
    "chat_id" => $chat_id,
    "text" => $text,
]);

$success = false;

if (function_exists("curl_init")) {
    $ch = curl_init($tg_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $tg_data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response !== false) {
        $res_data = json_decode($response, true);
        if ($http_code === 200 && isset($res_data['ok']) && $res_data['ok'] === true) {
            $success = true;
        }
    }
} else {
    $options = [
        "http" => [
            "method" => "POST",
            "header" => "Content-Type: application/json\r\n",
            "content" => $tg_data,
            "timeout" => 10,
        ]
    ];
    $context = stream_context_create($options);
    $response = @file_get_contents($tg_url, false, $context);

    if ($response !== false) {
        $res_data = json_decode($response, true);
        if (isset($res_data['ok']) && $res_data['ok'] === true) {
            $success = true;
        }
    }
}

if ($success) {
    echo json_encode(["ok" => true]);
} else {
    http_response_code(502);
    echo json_encode(["ok" => false, "error" => "bad_gateway"]);
}
