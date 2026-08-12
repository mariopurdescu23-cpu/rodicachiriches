import React from 'react'
import { useLang } from '../i18n'
import { BrandMark } from './BrandMark'
import { PHONE_RO_DISPLAY, PHONE_RO_TEL, PHONE_UK_DISPLAY, PHONE_UK_TEL, EMAIL_DISPLAY } from '../siteInfo'

export const Footer: React.FC = () => {
  const { t, lang, setLang } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white/70 pb-24 lg:pb-0">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <BrandMark dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              {t.hero.subtitle}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">{t.contact.eyebrow}</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <span className="text-white/40">{t.contact.phoneUK}: </span>
                <a href={`tel:${PHONE_UK_TEL}`} className="hover:text-white transition-colors">{PHONE_UK_DISPLAY}</a>
              </li>
              <li>
                <span className="text-white/40">{t.contact.phoneRO}: </span>
                <a href={`tel:${PHONE_RO_TEL}`} className="hover:text-white transition-colors">{PHONE_RO_DISPLAY}</a>
              </li>
              <li>
                <span className="text-white/40">{t.contact.email}: </span>
                <span className="text-white/60">{EMAIL_DISPLAY}</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">RO / EN</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
              <button onClick={() => setLang('ro')} className={`transition-colors ${lang === 'ro' ? 'text-white' : 'text-white/40'}`}>
                RO
              </button>
              <span className="text-white/20">|</span>
              <button onClick={() => setLang('en')} className={`transition-colors ${lang === 'en' ? 'text-white' : 'text-white/40'}`}>
                EN
              </button>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.cookies}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center gap-6 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/35 text-center sm:text-left">
            © {year} Rodica Maria Chiriches — Cabinet de Psihologie. {t.footer.rights}
          </p>

          <a
            href="https://weberescu.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-2 pl-3 pr-4 text-sm text-white/70 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-black">
              <img src="/weberescu-logo.jpg" alt="Weberescu" className="h-full w-full object-cover" />
            </span>
            <span>
              {t.footer.credit}{' '}
              <span className="font-semibold underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-white/70">
                Weberescu
              </span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
