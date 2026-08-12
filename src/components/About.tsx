import React from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'

export const About: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="despre" className="py-24 md:py-32 bg-white">
      <div className="container-site">
        <div ref={ref} className="reveal max-w-3xl">
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-[2.6rem] leading-tight">{t.about.title}</h2>

          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-ink/75">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
            <p>{t.about.p4}</p>
            <p>{t.about.p5}</p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {t.about.pillars.map((p, i) => (
            <div key={i} className="card">
              <span className="text-sm font-semibold uppercase tracking-wide text-teal">{p.label}</span>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/70">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
