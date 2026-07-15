
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
  return (
    <>
      <main className="w-full min-w-0">
        <Header />
        
        <article className="mx-auto max-w-[800px] px-6 py-32 md:px-12 md:py-48">
          <h1 
            className="hero-headline-gradient mb-12 text-[clamp(24px,7vw,64px)] font-black uppercase leading-[1.1] tracking-[-0.02em] inline-block"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Пользовательское<br/>соглашение
          </h1>
          
          <div className="max-w-none text-[15px] leading-relaxed text-[var(--site-muted)] space-y-6">
            <p className="text-white/40 mb-12">Последнее обновление: 2026 год.</p>

            <p>
              Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между Темировым Тимуром Куандыковичем, ИНН 543316901398, применяющим специальный налоговый режим «Налог на профессиональный доход» (самозанятый), именуемым в дальнейшем «Владелец сайта», и пользователем сети Интернет (далее — «Пользователь»), возникающие при использовании веб-сайта <strong className="text-white font-medium">820lab.ru</strong> (далее — «Сайт»).
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">1. Общие положения</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-[var(--site-accent)]">
              <li>Использование Сайта означает безоговорочное согласие Пользователя с настоящим Соглашением.</li>
              <li>Если Пользователь не согласен с условиями Соглашения, он обязан прекратить использование Сайта.</li>
              <li>Сайт носит информационный характер и предназначен для ознакомления с портфолио и услугами Исполнителя.</li>
            </ul>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">2. Отказ от публичной оферты</h2>
            <p>
              <strong className="text-white font-medium">Вся информация на Сайте не является публичной офертой.</strong> Цены, сроки, объемы работ и другие условия, указанные на Сайте (в том числе в разделе «Ориентиры»), носят исключительно ознакомительный характер. Итоговая стоимость и состав работ определяются индивидуально после брифинга и закрепляются в смете и/или договоре. Владелец сайта оставляет за собой право отказать в оказании услуг без объяснения причин до момента подписания договора.
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">3. Интеллектуальная собственность</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-[var(--site-accent)]">
              <li>Все материалы, размещенные на Сайте (дизайн, тексты, 3D-графика, программный код, изображения, видео), являются интеллектуальной собственностью Владельца сайта или используются на законных основаниях.</li>
              <li>Копирование, распространение или любое иное использование материалов Сайта без предварительного письменного согласия Владельца сайта строго запрещено и преследуется по закону.</li>
            </ul>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">4. Права и обязанности сторон</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-[var(--site-accent)]">
              <li><strong className="text-white font-medium">Владелец сайта вправе:</strong> в любое время изменять оформление Сайта, его контент, цены на услуги и условия данного Соглашения без предварительного уведомления Пользователя.</li>
              <li><strong className="text-white font-medium">Пользователь обязуется:</strong> не использовать Сайт для незаконных целей, не пытаться нарушить работоспособность Сайта или получить несанкционированный доступ к его коду и базе данных.</li>
            </ul>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">5. Ограничение ответственности</h2>
            <p>
              Владелец сайта не несет ответственности за любые прямые или косвенные убытки, возникшие в результате использования или невозможности использования Сайта, а также из-за ошибок, перебоев в работе или задержек передачи данных.
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">6. Заключительные положения</h2>
            <ul className="list-disc pl-6 space-y-2 marker:text-[var(--site-accent)]">
              <li>Настоящее Соглашение регулируется законодательством Российской Федерации.</li>
              <li>Все возможные споры, вытекающие из настоящего Соглашения, подлежат разрешению в соответствии с действующим законодательством по месту регистрации Владельца сайта.</li>
            </ul>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">7. Контакты</h2>
            <p>
              По вопросам, связанным с данным Соглашением, вы можете написать на почту:
              <br />
              Email: <a href="mailto:t1mmmurrr@mail.ru" className="text-[var(--site-accent)] transition-colors hover:text-white underline underline-offset-4">t1mmmurrr@mail.ru</a>
            </p>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
