import React from 'react'
import { useLang } from '../i18n'

export const MobileActionBar: React.FC = () => {
  const { t } = useLang()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex lg:hidden items-center gap-3 border-t border-ink/8 bg-white/95 px-4 py-3 backdrop-blur-md">
      <a
        href="tel:+447470433212"
        aria-label={t.contact.phoneUK}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-purple"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
      <a href="#programare" className="btn-primary flex-1 text-center">
        {t.nav.cta}
      </a>
    </div>
  )
}
