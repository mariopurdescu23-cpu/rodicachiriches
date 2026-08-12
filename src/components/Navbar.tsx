import React, { useEffect, useState } from 'react'
import { useLang } from '../i18n'
import { BrandMark } from './BrandMark'

const links = [
  { href: '#despre', key: 'about' as const },
  { href: '#cum-lucrez', key: 'how' as const },
  { href: '#servicii', key: 'services' as const },
  { href: '#diaspora', key: 'diaspora' as const },
  { href: '#faq', key: 'faq' as const },
  { href: '#contact', key: 'contact' as const },
]

export const Navbar: React.FC = () => {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(23,6,51,0.06)]' : 'bg-white/40 backdrop-blur-sm'
      }`}
    >
      <nav
        className="mx-auto flex h-[76px] w-full max-w-[1400px] items-center justify-between gap-4 px-5 md:px-8"
        aria-label="Navigare principală"
      >
        <BrandMark className="shrink-0" />

        <ul className="hidden xl:flex items-center gap-8 2xl:gap-10">
          {links.map((l) => (
            <li key={l.key}>
              <a
                href={l.href}
                className="group relative whitespace-nowrap py-2 text-[15px] font-medium text-ink/70 transition-colors duration-300 hover:text-purple"
              >
                {t.nav[l.key]}
                <span className="absolute inset-x-0 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-purple transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden xl:flex items-center gap-4 shrink-0">
          <div className="flex items-center rounded-full border border-ink/10 p-0.5 text-sm font-semibold">
            <button
              onClick={() => setLang('ro')}
              className={`rounded-full px-2.5 py-1 transition-colors duration-300 ${lang === 'ro' ? 'bg-mist text-purple' : 'text-ink/50'}`}
              aria-pressed={lang === 'ro'}
            >
              RO
            </button>
            <span className="text-ink/20">|</span>
            <button
              onClick={() => setLang('en')}
              className={`rounded-full px-2.5 py-1 transition-colors duration-300 ${lang === 'en' ? 'bg-mist text-purple' : 'text-ink/50'}`}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
          <a href="#programare" className="btn-primary whitespace-nowrap">
            {t.nav.cta}
          </a>
        </div>

        <button
          className="xl:hidden flex flex-col gap-1.5 p-2 shrink-0"
          aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-ink transition-transform duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </nav>

      <div
        className={`xl:hidden overflow-hidden border-t border-ink/5 bg-white shadow-soft transition-[max-height,opacity] duration-400 ease-out ${
          open ? 'max-h-[560px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2">
          <ul className="flex flex-col divide-y divide-ink/5">
            {links.map((l, i) => (
              <li
                key={l.key}
                className={`transition-all duration-300 ${open ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`}
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-ink/80"
                >
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center rounded-full border border-ink/10 p-0.5 text-sm font-semibold">
              <button
                onClick={() => setLang('ro')}
                className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${lang === 'ro' ? 'bg-mist text-purple' : 'text-ink/50'}`}
              >
                RO
              </button>
              <button
                onClick={() => setLang('en')}
                className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${lang === 'en' ? 'bg-mist text-purple' : 'text-ink/50'}`}
              >
                EN
              </button>
            </div>
            <a href="#programare" onClick={() => setOpen(false)} className="btn-primary flex-1 text-center">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
