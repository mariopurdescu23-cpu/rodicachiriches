import React from 'react'
import { PRACTITIONER_NAME, PRACTICE_NAME_RO, PRACTICE_NAME_EN } from '../siteInfo'
import { useLang } from '../i18n'

export const BrandMark: React.FC<{ dark?: boolean; className?: string }> = ({ dark, className = '' }) => {
  const { lang } = useLang()
  const practiceName = lang === 'ro' ? PRACTICE_NAME_RO : PRACTICE_NAME_EN

  return (
    <a href="#acasa" className={`group flex items-center gap-3 ${className}`}>
      <img
        src="/logo.png"
        alt={`${PRACTITIONER_NAME} — ${practiceName}`}
        className="h-11 w-11 shrink-0 object-contain transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105"
      />
      <span className="flex flex-col leading-tight">
        <span
          className={`font-display text-[17px] md:text-lg whitespace-nowrap ${dark ? 'text-white' : 'text-ink'}`}
        >
          {PRACTITIONER_NAME}
        </span>
        <span
          className={`text-[11px] md:text-xs font-medium tracking-[0.14em] uppercase whitespace-nowrap ${
            dark ? 'text-white/50' : 'text-purple-soft'
          }`}
        >
          {practiceName}
        </span>
      </span>
    </a>
  )
}
