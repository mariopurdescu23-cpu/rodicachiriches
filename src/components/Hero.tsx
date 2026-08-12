import React from 'react'
import { useLang } from '../i18n'
import { Blob, FloatingLeaf } from './OrganicMotifs'
import { PRACTITIONER_NAME } from '../siteInfo'

export const Hero: React.FC = () => {
  const { t } = useLang()

  return (
    <section id="acasa" className="relative overflow-hidden pt-40 pb-28 md:pt-48 md:pb-36">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-mist via-white to-white" />
        <Blob
          tone="purple"
          className="absolute -top-16 -right-24 h-[420px] w-[420px] opacity-[0.12] animate-drift"
        />
        <Blob
          tone="teal"
          className="absolute bottom-0 -left-28 h-[320px] w-[320px] opacity-[0.10] animate-drift"
          style={{ animationDelay: '-4s' } as React.CSSProperties}
        />
        <FloatingLeaf tone="green" className="absolute top-28 left-[8%] h-8 w-8 opacity-70 animate-drift" delay="-2s" />
        <FloatingLeaf tone="teal" className="absolute bottom-24 right-[12%] h-6 w-6 opacity-60 animate-drift" delay="-6s" />
      </div>

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fadeUp">
          <span className="eyebrow">
            {PRACTITIONER_NAME} · {t.hero.eyebrow}
          </span>
          <h1 className="mt-5 text-[2.5rem] leading-[1.12] md:text-6xl md:leading-[1.08] font-normal">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-lg text-lg text-ink/70 leading-relaxed">{t.hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#programare" className="btn-primary">
              {t.hero.ctaPrimary}
            </a>
            <a href="#despre" className="btn-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <p className="mt-8 text-sm text-ink/50 italic">{t.hero.note}</p>
        </div>

        <div className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none">
          <div
            className="relative aspect-square w-full max-w-[380px] rounded-organic bg-gradient-to-br from-mist via-white to-mist shadow-soft ring-1 ring-purple/10 flex items-center justify-center animate-drift"
          >
            <img
              src="/logo.png"
              alt={`Sigla cabinetului — ${PRACTITIONER_NAME}, un profil uman cu un copac înflorit, simbol al minții și al creșterii interioare`}
              className="w-3/5 max-w-[220px] object-contain drop-shadow-sm transition-transform duration-700 hover:scale-105 hover:rotate-2"
            />
          </div>
          <Blob tone="green" className="absolute -bottom-6 -right-4 h-24 w-24 opacity-40 animate-drift" style={{ animationDelay: '-3s' } as React.CSSProperties} />
        </div>
      </div>
    </section>
  )
}
