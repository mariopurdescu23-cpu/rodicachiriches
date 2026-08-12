import React, { useEffect, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { PHONE_RO_DISPLAY, PHONE_RO_TEL, PHONE_UK_DISPLAY, PHONE_UK_TEL } from '../siteInfo'

export const PhoneMenu: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`${t.contact.phoneUK} / ${t.contact.phoneRO}`}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mist text-purple transition-transform duration-300 active:scale-95"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </button>

      <div
        className={`fixed inset-x-4 bottom-24 z-50 mx-auto max-w-xs rounded-2xl bg-white p-2 shadow-soft ring-1 ring-ink/8 transition-all duration-200 ${
          open ? 'translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-2 scale-95 opacity-0'
        }`}
        role="menu"
      >
        <a
          href={`tel:${PHONE_UK_TEL}`}
          role="menuitem"
          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors hover:bg-mist"
        >
          <span className="font-medium text-ink/60">{t.contact.phoneUK}</span>
          <span className="font-semibold text-ink">{PHONE_UK_DISPLAY}</span>
        </a>
        <a
          href={`tel:${PHONE_RO_TEL}`}
          role="menuitem"
          className="flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors hover:bg-mist"
        >
          <span className="font-medium text-ink/60">{t.contact.phoneRO}</span>
          <span className="font-semibold text-ink">{PHONE_RO_DISPLAY}</span>
        </a>
      </div>
    </div>
  )
}
