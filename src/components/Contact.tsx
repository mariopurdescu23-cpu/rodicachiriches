import React, { useState } from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { Reveal } from './Reveal'
import {
  PHONE_RO_DISPLAY,
  PHONE_RO_TEL,
  PHONE_RO_WHATSAPP,
  PHONE_UK_DISPLAY,
  PHONE_UK_TEL,
  EMAIL_DISPLAY,
  buildContactMailtoLink,
} from '../siteInfo'

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

export const Contact: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = buildContactMailtoLink({ name, email, message })
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-mist/50">
      <div className="container-site">
        <div ref={ref} className="reveal max-w-2xl">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] leading-tight">{t.contact.title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/70">{t.contact.text}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1fr_1.2fr]">
          <Reveal delay={0}>
            <a
              href={`tel:${PHONE_UK_TEL}`}
              className="flex h-full items-center gap-4 rounded-2xl bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-purple">
                <PhoneIcon />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{t.contact.phoneUK}</p>
                <p className="text-[17px] font-semibold text-ink">{PHONE_UK_DISPLAY}</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={80}>
            <a
              href={`tel:${PHONE_RO_TEL}`}
              className="flex h-full items-center gap-4 rounded-2xl bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-purple">
                <PhoneIcon />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{t.contact.phoneRO}</p>
                <p className="text-[17px] font-semibold text-ink">{PHONE_RO_DISPLAY}</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={160}>
            <a
              href={`https://wa.me/${PHONE_RO_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full items-center gap-4 rounded-2xl bg-purple p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.13-1.35A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm5.85 14.32c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.68-.63-2.96-1.28-4.89-4.25-5.04-4.45-.15-.2-1.2-1.6-1.2-3.06 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.68.52.25.6.85 2.06.93 2.21.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.18-.2.76-.88.96-1.19.2-.3.4-.25.68-.15.27.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.72-.17 1.42Z" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/60">WhatsApp</p>
                <p className="text-[17px] font-semibold text-white">{PHONE_RO_DISPLAY}</p>
              </div>
            </a>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5">
          <Reveal delay={240}>
            <a
              href={`mailto:${EMAIL_DISPLAY}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" opacity="0" />
                  <path d="M22 6l-10 7L2 6" />
                  <path d="M2 6h20v12H2z" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{t.contact.email}</p>
                <p className="text-[17px] font-semibold text-ink">{EMAIL_DISPLAY}</p>
              </div>
            </a>
          </Reveal>
        </div>

        <Reveal delay={320}>
          <form
            onSubmit={handleSubmit}
            className="mt-5 rounded-2xl bg-white p-6 md:p-8 shadow-card"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-ink/70">
                  {t.contact.formName}
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-ink/70">
                  {t.contact.formEmail}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-ink/70">
                {t.contact.formMessage}
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
              />
            </div>

            <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
              {t.contact.formSubmit}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
