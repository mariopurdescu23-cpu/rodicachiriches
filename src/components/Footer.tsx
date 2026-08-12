import React from 'react'
import { useLang } from '../i18n'
import { BrandMark } from './BrandMark'
import { PHONE_RO_DISPLAY, PHONE_RO_TEL, PHONE_UK_DISPLAY, PHONE_UK_TEL, EMAIL_DISPLAY } from '../siteInfo'

export const Footer: React.FC = () => {
  const { t, lang, setLang } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-white/70">
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

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/35">
          © {year} Rodica Maria Chiriches — Cabinet de Psihologie. {t.footer.rights}
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/20">
        <div className="container-site flex items-center justify-center gap-2.5 py-5 text-sm text-white/45">
          <span>{t.footer.credit}</span>
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 font-semibold text-white/80 transition-colors hover:text-white"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[11px] font-bold text-white">
              W
            </span>
            <span className="underline decoration-white/30 underline-offset-4 transition-colors group-hover:decoration-white/70">
              Weberescu
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
