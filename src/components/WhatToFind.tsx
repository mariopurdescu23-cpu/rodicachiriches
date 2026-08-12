import React from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'

export const WhatToFind: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section className="py-24 md:py-28 bg-white">
      <div className="container-site">
        <div ref={ref} className="reveal mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t.find.eyebrow}</span>
          <p className="mt-6 text-xl md:text-2xl leading-relaxed text-ink/80">{t.find.p1}</p>
          <p className="mt-5 text-xl md:text-2xl leading-relaxed text-ink/80">{t.find.p2}</p>

          <div className="mt-10 inline-block rounded-full bg-mist px-8 py-4">
            <p className="font-display text-xl md:text-2xl text-purple">{t.find.highlight}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
