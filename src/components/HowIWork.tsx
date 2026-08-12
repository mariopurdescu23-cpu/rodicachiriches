import React from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { GrowingBranch } from './OrganicMotifs'
import { Reveal } from './Reveal'

export const HowIWork: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="cum-lucrez" className="relative py-24 md:py-32 bg-mist/60 overflow-hidden">
      <div className="container-site relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div ref={ref} className="reveal">
          <span className="eyebrow">{t.how.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] leading-tight">{t.how.title}</h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ink/75">{t.how.p1}</p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink/75">{t.how.p2}</p>
          <p className="mt-6 rounded-2xl bg-white/70 p-5 text-[15px] italic leading-relaxed text-ink/65 ring-1 ring-purple/10">
            {t.how.note}
          </p>
        </div>

        <div className="relative">
          <GrowingBranch className="hidden md:block absolute -left-8 top-0 h-full w-16" />
          <h3 className="text-lg font-semibold text-ink/90">{t.how.themesTitle}</h3>
          <ul className="mt-6 space-y-3">
            {t.how.themes.map((theme, i) => (
              <Reveal key={i} delay={i * 70} as="li">
                <div className="flex items-start gap-3.5 rounded-2xl bg-white px-5 py-4 shadow-card transition-all duration-300 hover:translate-x-1.5 hover:shadow-soft">
                  <span
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full transition-transform duration-300"
                    style={{ background: i % 2 === 0 ? '#689F25' : '#31728B' }}
                  />
                  <span className="text-[15.5px] leading-relaxed text-ink/80">{theme}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
