import React from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'

export const Booking: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="programare" className="py-24 md:py-28 bg-mist/60">
      <div className="container-site">
        <div
          ref={ref}
          className="reveal mx-auto max-w-2xl rounded-[2.5rem] bg-white p-10 md:p-14 text-center shadow-soft ring-1 ring-purple/10"
        >
          <span className="eyebrow">{t.booking.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-4xl leading-tight">{t.booking.title}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/70">{t.booking.text}</p>

          {/* Placeholder booking action — swap href for the real scheduling platform link when available */}
          <a
            href="#contact"
            className="btn-primary mt-8"
            data-booking-slot="[LINK PROGRAMARE]"
          >
            {t.booking.cta}
          </a>

          <p className="mt-5 text-xs text-ink/40">{t.booking.placeholder}</p>
        </div>
      </div>
    </section>
  )
}
