/**
 * Удаление `.next` с повторами (Windows: EPERM, если dev-сервер держит файлы).
 */
const fs = require("fs");
const path = ".next";
if (!fs.existsSync(path)) {
  console.log("clean-next: нет папки .next");
  process.exit(0);
}
try {
  fs.rmSync(path, { recursive: true, force: true, maxRetries: 20, retryDelay: 400 });
  console.log("clean-next: удалено .next");
} catch (e) {
  console.error("clean-next: не удалось удалить .next — закройте `npm run dev` и повторите.");
  console.error(e.message);
  process.exit(1);
}
