import React from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { Reveal } from './Reveal'

export const Services: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="servicii" className="py-24 md:py-32 bg-white">
      <div className="container-site">
        <div ref={ref} className="reveal max-w-2xl">
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] leading-tight">{t.services.title}</h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink/70">{t.services.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((item, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="card group">
              <h3 className="text-[17px] font-semibold text-ink transition-colors duration-300 group-hover:text-purple">
                {item.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink/65">{item.text}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink/45 italic">{t.services.note}</p>
      </div>
    </section>
  )
}
