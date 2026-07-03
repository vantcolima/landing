import { ContactForm } from '@/components/contact-form';

const services = [
  {
    title: 'Apps & Webs a Medida',
    description: 'Desarrollo de aplicaciones y plataformas web nativas adaptadas a tus procesos.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="7" y="2.5" width="10" height="19" rx="2.4" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    title: 'Sistemas Escalables',
    description: 'Arquitectura en la nube y sistemas diseñados para crecer junto con tu empresa.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 18a4 4 0 1 1 1.2-7.82A5 5 0 0 1 17.8 9.2 3.5 3.5 0 1 1 18 18H7Z" />
      </svg>
    ),
  },
  {
    title: 'Consultoría Tecnológica',
    description: 'Asesoramiento estratégico para optimizar e implementar soluciones digitales efectivas.',
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4.5 19.5V15a7.5 7.5 0 0 1 15 0v4.5" />
        <path d="M8.5 10a3.5 3.5 0 1 1 7 0" />
        <path d="M9 17.5h6" />
      </svg>
    ),
  },
];

const companies = ['NeuroClinic', 'Cuidarte', 'FlowersForYou Colima'];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(227,133,105,0.12),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.05),_transparent_24%)]">
      <main className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-4 border-b border-white/5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs font-medium tracking-[0.28em] text-gray-400">EST. 2026 — MÉXICO</div>
          <nav className="flex flex-wrap items-center gap-5 text-sm text-gray-400 sm:justify-end">
            <a href="#vision" className="transition-colors hover:text-white">Nuestra Visión</a>
            <a href="#servicios" className="transition-colors hover:text-white">Servicios</a>
            <a href="#precios" className="transition-colors hover:text-white">Precios</a>
            <a href="#contacto" className="transition-colors hover:text-white">Contacto</a>
            <span className="inline-block h-3 w-3 bg-accent" />
          </nav>
        </header>

        <section id="vision" className="grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-24">
          <div className="max-w-2xl">
            <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Vant. Tu software empresarial a la medida<span className="text-accent">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
              Apps, webs y sistemas diseñados para negocios que demandan tecnología real y funcional.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <p className="font-serif text-lg italic leading-none text-white sm:text-2xl">Tecnología hecha a tu medida</p>
            </div>

            <a href="#contacto" className="mt-10 inline-flex items-center justify-center bg-accent px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-ink transition-transform hover:-translate-y-0.5 hover:bg-[#f09a80]">
              Hablemos de tu proyecto
            </a>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="flex aspect-square w-full max-w-[520px] items-center justify-center border border-white/6 bg-surfaceAlt p-10 shadow-glow">
              <div className="flex h-full w-full items-center justify-center border border-dashed border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(227,133,105,0.04))]" aria-label="Placeholder visual">
                <svg viewBox="0 0 24 24" className="h-20 w-20 text-gray-400/80" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M7 15l3-3 3 3 4-4" />
                  <circle cx="9" cy="9" r="1.2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="py-16 sm:py-20 lg:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Nuestros Servicios</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="border border-white/7 bg-surface p-6 sm:p-7">
                {service.icon}
                <h3 className="mt-5 text-xl font-semibold text-white">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-400">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Confían en Nosotros</h2>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm uppercase tracking-[0.2em] text-gray-400 sm:text-base">
            {companies.map((company) => (
              <span key={company}>{company}</span>
            ))}
          </div>
        </section>

        <section id="contacto" className="py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-start">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Cuéntanos tu proyecto</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
                Completa el formulario y el mensaje se enviará de verdad a <span className="text-white">hola@vantmx.com.mx</span> usando Resend en una Serverless Function de Next.js.
              </p>

              <div className="mt-8 space-y-4 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" />
                  <span>Respuesta clara, diseño a medida y comunicación directa.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-accent" />
                  <span>Ideal para apps, webs, automatización y sistemas internos.</span>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>

        <div id="precios" aria-hidden="true" />

        <footer className="border-t border-white/8 py-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_auto] lg:items-end lg:gap-10">
            <div>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="mt-1 h-6 w-6 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6h16v12H4z" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">Escríbenos: hola@vantmx.com.mx</h2>
              </div>
              <p className="mt-4 text-xs font-semibold tracking-[0.35em] text-gray-400">APPS • WEBS • SISTEMAS</p>
            </div>

            <div className="lg:text-right">
              <div className="flex flex-wrap gap-5 text-sm text-gray-400 lg:justify-end">
                <a href="#servicios" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white">Apps</a>
                <a href="#servicios" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white">Webs</a>
                <a href="#servicios" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white">Sistemas</a>
              </div>
              <p className="mt-4 text-xs text-gray-500">© 2026 Vant. Tecnología hecha a tu medida.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}