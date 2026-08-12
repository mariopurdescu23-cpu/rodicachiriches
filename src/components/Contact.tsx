import React, { useState } from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'

const PHONE_RO = '+40 756 262 594'
const PHONE_RO_TEL = '+40756262594'
const PHONE_UK = '+44 7470 433 212'
const PHONE_UK_TEL = '+447470433212'
const EMAIL = 'contact@rodicachiriches.ro'

export const Contact: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder handler — connect to a real form endpoint / email service when available.
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-mist/50">
      <div className="container-site">
        <div ref={ref} className="reveal max-w-2xl">
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] leading-tight">{t.contact.title}</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/70">{t.contact.text}</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <a
              href={`tel:${PHONE_UK_TEL}`}
              className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card transition-transform hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{t.contact.phoneUK}</p>
                <p className="text-[17px] font-semibold text-ink">{PHONE_UK}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{t.contact.phoneRO}</p>
                <p className="text-[17px] font-semibold text-ink/50">{PHONE_RO}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16v16H4z" opacity="0" />
                  <path d="M22 6l-10 7L2 6" />
                  <path d="M2 6h20v12H2z" />
                </svg>
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-ink/45">{t.contact.email}</p>
                <p className="text-[17px] font-semibold text-ink/50">{EMAIL}</p>
              </div>
            </div>

            {/* Map placeholder — ready for Google Maps embed once the practice address is provided */}
            <div className="flex h-44 items-center justify-center rounded-2xl bg-white/70 shadow-card ring-1 ring-dashed ring-ink/15">
              <p className="max-w-[220px] text-center text-xs text-ink/40">{t.contact.mapNote}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-7 md:p-9 shadow-card space-y-5">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink/70">
                {t.contact.formName}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink/70">
                {t.contact.formEmail}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink/70">
                {t.contact.formMessage}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full resize-none rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              {t.contact.formSubmit}
            </button>
            {sent && (
              <p className="text-center text-sm text-green" role="status">
                ✓
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
