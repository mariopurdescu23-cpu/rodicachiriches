import React from 'react'
import { useLang } from '../i18n'
import { BrandMark } from './BrandMark'

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
                <a href="tel:+447470433212" className="hover:text-white">+44 7470 433 212</a>
              </li>
              <li>
                <span className="text-white/40">{t.contact.phoneRO}: </span>
                <span className="text-white/60">[NUMĂR ROMÂNIA]</span>
              </li>
              <li>
                <span className="text-white/40">{t.contact.email}: </span>
                <span className="text-white/60">[EMAIL]</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">RO / EN</p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold">
              <button onClick={() => setLang('ro')} className={lang === 'ro' ? 'text-white' : 'text-white/40'}>
                RO
              </button>
              <span className="text-white/20">|</span>
              <button onClick={() => setLang('en')} className={lang === 'en' ? 'text-white' : 'text-white/40'}>
                EN
              </button>
            </div>

            <ul className="mt-6 space-y-2 text-sm text-white/50">
              <li><a href="#" className="hover:text-white">{t.footer.privacy}</a></li>
              <li><a href="#" className="hover:text-white">{t.footer.cookies}</a></li>
              <li><a href="#" className="hover:text-white">{t.footer.terms}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/35">
          © {year} Rodica Maria Chiriches — Cabinet de Psihologie. {t.footer.rights}
        </div>
      </div>
    </footer>
  )
}
