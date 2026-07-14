import ClientShell from "@/components/ClientShell";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <ClientShell>
      <main className="w-full min-w-0">
        <Header />
        
        <article className="mx-auto max-w-[800px] px-6 py-32 md:px-12 md:py-48">
          <h1 
            className="hero-headline-gradient mb-12 text-[clamp(24px,7vw,64px)] font-black uppercase leading-[1.1] tracking-[-0.02em] inline-block"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            Политика<br/>конфиденциальности
          </h1>
          
          <div className="max-w-none text-[15px] leading-relaxed text-[var(--site-muted)] space-y-6">
            <p className="text-white/40 mb-12">Последнее обновление: 2026 год.</p>

            <p>
              Настоящая Политика конфиденциальности описывает, как Темиров Тимур Куандыкович, ИНН 543316901398, применяющий специальный налоговый режим «Налог на профессиональный доход» (самозанятый), именуемый в дальнейшем «Оператор», собирает, использует и защищает вашу личную информацию, когда вы используете веб-сайт <strong className="text-white font-medium">820lab.ru</strong> (далее — «Сайт»).
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">1. Сбор информации</h2>
            <p>Мы можем собирать следующие типы информации:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[var(--site-accent)]">
              <li><strong>Информация, которую вы предоставляете добровольно:</strong> Имя, адрес электронной почты, номер телефона, никнейм в мессенджерах и любые другие данные, которые вы сообщаете нам при обращении за консультацией или заказом услуг.</li>
              <li><strong>Технические данные:</strong> IP-адрес, тип браузера, время доступа и адреса запрашиваемых страниц (данные автоматически передаются вашим браузером).</li>
            </ul>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">2. Использование информации</h2>
            <p>Мы используем собранную информацию исключительно для следующих целей:</p>
            <ul className="list-disc pl-6 space-y-2 marker:text-[var(--site-accent)]">
              <li>Для связи с вами по вопросам предоставления услуг (разработка интерфейсов, сайтов, 3D-графики).</li>
              <li>Для улучшения качества работы нашего Сайта и предоставляемых услуг.</li>
              <li>Для выполнения наших обязательств перед вами в рамках возможных договоренностей.</li>
            </ul>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">3. Передача данных третьим лицам</h2>
            <p>
              Мы не продаем, не обмениваем и не передаем ваши персональные данные сторонним лицам без вашего явного согласия, за исключением случаев, предусмотренных законодательством Российской Федерации.
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">4. Защита информации</h2>
            <p>
              Мы принимаем необходимые организационные и технические меры для защиты вашей личной информации от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">5. Использование файлов Cookie</h2>
            <p>
              Сайт может использовать файлы cookie для улучшения пользовательского опыта. Файлы cookie не содержат конфиденциальную информацию и не передаются третьим лицам. Вы можете отключить использование файлов cookie в настройках вашего браузера.
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">6. Ваши права</h2>
            <p>
              Вы имеете право в любой момент запросить информацию о том, какие ваши персональные данные мы храним, а также потребовать их изменения или удаления, написав нам на электронную почту.
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">7. Изменения в Политике</h2>
            <p>
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Обновленная версия всегда доступна на этой странице.
            </p>

            <h2 className="text-white font-normal tracking-wide uppercase text-[20px] mt-16 mb-6">8. Контакты</h2>
            <p>
              По всем вопросам, связанным с настоящей Политикой конфиденциальности, вы можете связаться с нами:
              <br />
              Email: <a href="mailto:t1mmmurrr@mail.ru" className="text-[var(--site-accent)] transition-colors hover:text-white underline underline-offset-4">t1mmmurrr@mail.ru</a>
            </p>
          </div>
        </article>

        <Footer />
      </main>
    </ClientShell>
  );
}
