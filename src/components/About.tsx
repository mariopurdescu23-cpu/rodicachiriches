import React from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { PRACTITIONER_NAME } from '../siteInfo'
import { Blob } from './OrganicMotifs'

export const About: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="despre" className="py-24 md:py-32 bg-white">
      <div className="container-site">
        <div ref={ref} className="reveal grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          {/* Portrait */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none lg:sticky lg:top-28">
            <Blob tone="green" className="absolute -top-8 -left-8 h-28 w-28 opacity-30 animate-drift" />
            <Blob
              tone="teal"
              className="absolute -bottom-10 -right-6 h-32 w-32 opacity-25 animate-drift"
              style={{ animationDelay: '-4s' } as React.CSSProperties}
            />
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] shadow-soft ring-1 ring-purple/10">
              <img
                src="/rodica-portrait.jpg"
                alt={PRACTITIONER_NAME}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="eyebrow">{t.about.eyebrow}</span>
            <h2 className="mt-4 text-3xl md:text-[2.6rem] leading-tight">{t.about.title}</h2>

            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink/75">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <p>{t.about.p3}</p>
              <p>{t.about.p4}</p>
              <p>{t.about.p5}</p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {t.about.pillars.map((p, i) => (
                <div key={i} className="card">
                  <span className="text-sm font-semibold uppercase tracking-wide text-teal">{p.label}</span>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
