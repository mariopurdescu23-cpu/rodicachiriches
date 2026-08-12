import React, { useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError('Email sau parolă incorecte.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-soft ring-1 ring-purple/10">
        <img src="/logo.png" alt="Cabinet de Psihologie" className="mx-auto h-14 w-14 object-contain" />
        <h1 className="mt-5 text-center font-display text-xl text-ink">Panou de administrare</h1>
        <p className="mt-1 text-center text-sm text-ink/50">Programări &amp; CRM</p>

        {!isSupabaseConfigured && (
          <p className="mt-6 rounded-xl bg-purple/5 px-4 py-3 text-center text-xs text-purple">
            Supabase nu este configurat încă. Adaugă VITE_SUPABASE_URL și VITE_SUPABASE_ANON_KEY în .env — vezi
            README.md.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-ink/70">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-ink/70">
              Parolă
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
            />
          </div>

          {error && <p className="text-sm font-medium text-purple">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? 'Se conectează…' : 'Conectează-te'}
          </button>
        </form>
      </div>
    </div>
  )
}
