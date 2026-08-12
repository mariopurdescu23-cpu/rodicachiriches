import React from 'react'
import { useLang } from '../i18n'
import { PhoneMenu } from './PhoneMenu'

export const MobileActionBar: React.FC = () => {
  const { t } = useLang()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex lg:hidden items-center gap-3 border-t border-ink/8 bg-white/95 px-4 py-3 backdrop-blur-md">
      <PhoneMenu />
      <a href="#programare" className="btn-primary flex-1 text-center">
        {t.nav.cta}
      </a>
    </div>
  )
}
