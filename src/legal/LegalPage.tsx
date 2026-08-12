import React from 'react'
import { LangProvider } from '../i18n'
import { BrandMark } from '../components/BrandMark'
import { Footer } from '../components/Footer'
import { LEGAL_PAGES, LEGAL_NAV, LAST_UPDATED, LegalSlug } from './content'

export const LegalPage: React.FC<{ slug: LegalSlug }> = ({ slug }) => {
  const page = LEGAL_PAGES[slug]

  return (
    <LangProvider>
      <div className="min-h-screen bg-white">
        <header className="border-b border-ink/8 bg-white">
          <div className="container-site flex h-20 items-center justify-between">
            <BrandMark />
            <a href="/" className="text-sm font-medium text-purple transition-colors hover:text-ink">
              ← Înapoi la site
            </a>
          </div>
        </header>

        <main className="container-site max-w-3xl py-16 md:py-20">
          <span className="eyebrow">Document legal</span>
          <h1 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">{page.title}</h1>
          <p className="mt-2 text-sm text-ink/40">Ultima actualizare: {LAST_UPDATED}</p>

          <nav className="mt-8 flex flex-wrap gap-2 border-b border-ink/8 pb-8" aria-label="Documente legale">
            {LEGAL_NAV.map((l) => (
              <a
                key={l.slug}
                href={l.href}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  l.slug === slug
                    ? 'border-purple bg-purple text-white'
                    : 'border-ink/12 text-ink/60 hover:border-purple/40 hover:text-purple'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="mt-8">{page.body}</div>

          <p className="mt-14 rounded-2xl bg-mist p-5 text-sm leading-relaxed text-ink/60">
            Acest document are caracter general și informativ. Pentru conformitate legală completă, recomandăm o
            revizuire de către un consultant juridic specializat în protecția datelor, mai ales având în vedere
            natura sensibilă a datelor gestionate de un cabinet de psihologie.
          </p>
        </main>

        <Footer />
      </div>
    </LangProvider>
  )
}
