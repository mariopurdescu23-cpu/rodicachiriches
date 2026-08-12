import React, { useState } from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { Reveal } from './Reveal'

export const FAQ: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="container-site max-w-3xl">
        <div ref={ref} className="reveal">
          <span className="eyebrow">{t.faq.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] leading-tight">{t.faq.title}</h2>
        </div>

        <div className="mt-10 divide-y divide-ink/8 border-y border-ink/8">
          {t.faq.items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={i} delay={i * 80}>
                <button
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-[16.5px] font-medium text-ink transition-colors duration-300">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-xl font-light text-purple transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[15.5px] leading-relaxed text-ink/65 pr-8">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
