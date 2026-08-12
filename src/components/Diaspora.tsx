import React from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'

export const Diaspora: React.FC = () => {
  const { t } = useLang()
  const ref = useReveal<HTMLDivElement>()

  return (
    <section id="diaspora" className="relative py-24 md:py-32 overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 15% 20%, #31728B 0%, transparent 45%), radial-gradient(circle at 85% 80%, #7A32A7 0%, transparent 45%)',
        }}
      />
      <div ref={ref} className="reveal container-site relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-teal">{t.diaspora.eyebrow}</span>
          <h2 className="mt-4 text-3xl md:text-[2.4rem] leading-tight text-white">{t.diaspora.title}</h2>

          <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-white/75">
            <p>{t.diaspora.p1}</p>
            <p>{t.diaspora.p2}</p>
            <p className="font-medium text-white/90">{t.diaspora.p3}</p>
          </div>

          <a href="#programare" className="btn-primary mt-10 !bg-teal hover:!bg-white hover:!text-ink">
            {t.diaspora.cta}
          </a>
        </div>
      </div>
    </section>
  )
}
