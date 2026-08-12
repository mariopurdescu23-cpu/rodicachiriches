import React, { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import {
  AdminBooking,
  fetchAllBookings,
  updateBookingStatus,
  updateBookingNotes,
  deleteBooking,
  subscribeToAllChanges,
} from '../lib/bookingApi'

const STATUS_LABEL: Record<AdminBooking['status'], string> = {
  new: 'Nouă',
  confirmed: 'Confirmată',
  cancelled: 'Anulată',
  completed: 'Finalizată',
}

const STATUS_STYLE: Record<AdminBooking['status'], string> = {
  new: 'bg-purple/10 text-purple',
  confirmed: 'bg-green/10 text-green',
  cancelled: 'bg-ink/10 text-ink/40',
  completed: 'bg-teal/10 text-teal',
}

const FILTERS: Array<{ key: 'all' | AdminBooking['status']; label: string }> = [
  { key: 'all', label: 'Toate' },
  { key: 'new', label: 'Noi' },
  { key: 'confirmed', label: 'Confirmate' },
  { key: 'completed', label: 'Finalizate' },
  { key: 'cancelled', label: 'Anulate' },
]

export const AdminDashboard: React.FC<{ email: string }> = ({ email }) => {
  const [bookings, setBookings] = useState<AdminBooking[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | AdminBooking['status']>('all')
  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({})

  const refresh = () => {
    fetchAllBookings().then((data) => {
      setBookings(data)
      setLoading(false)
    })
  }

  useEffect(() => {
    refresh()
    const unsubscribe = subscribeToAllChanges(refresh)
    return unsubscribe
  }, [])

  const visible = useMemo(
    () => (filter === 'all' ? bookings : bookings.filter((b) => b.status === filter)),
    [bookings, filter]
  )

  const handleStatus = async (id: string, status: AdminBooking['status']) => {
    await updateBookingStatus(id, status)
  }

  const handleSaveNotes = async (id: string) => {
    const notes = noteDrafts[id] ?? ''
    await updateBookingNotes(id, notes)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Ștergi definitiv această programare?')) return
    await deleteBooking(id)
  }

  return (
    <div className="min-h-screen bg-mist/50">
      <header className="border-b border-ink/8 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
            <div>
              <p className="font-display text-lg text-ink leading-tight">Programări &amp; CRM</p>
              <p className="text-xs text-ink/45">{email}</p>
            </div>
          </div>
          <button
            onClick={() => supabase.auth.signOut()}
            className="rounded-full border border-ink/12 px-4 py-2 text-sm font-medium text-ink/60 transition-colors hover:border-purple/40 hover:text-purple"
          >
            Deconectează-te
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                filter === f.key
                  ? 'border-purple bg-purple text-white'
                  : 'border-ink/12 bg-white text-ink/60 hover:border-purple/40'
              }`}
            >
              {f.label}
              {f.key !== 'all' && (
                <span className="ml-1.5 opacity-60">
                  {bookings.filter((b) => b.status === f.key).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-ink/40">Se încarcă…</p>
        ) : visible.length === 0 ? (
          <p className="mt-8 text-sm text-ink/40">Nicio programare în această categorie.</p>
        ) : (
          <div className="mt-6 space-y-4">
            {visible.map((b) => (
              <div key={b.id} className="rounded-2xl bg-white p-5 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-semibold text-ink">{b.name}</p>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLE[b.status]}`}>
                        {STATUS_LABEL[b.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink/60">
                      {new Date(b.date).toLocaleDateString('ro-RO', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}{' '}
                      · {b.time} · {b.language}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {b.status !== 'confirmed' && (
                      <button
                        onClick={() => handleStatus(b.id, 'confirmed')}
                        className="rounded-full bg-green/10 px-3.5 py-1.5 text-xs font-semibold text-green transition-colors hover:bg-green/20"
                      >
                        Confirmă
                      </button>
                    )}
                    {b.status !== 'completed' && (
                      <button
                        onClick={() => handleStatus(b.id, 'completed')}
                        className="rounded-full bg-teal/10 px-3.5 py-1.5 text-xs font-semibold text-teal transition-colors hover:bg-teal/20"
                      >
                        Finalizată
                      </button>
                    )}
                    {b.status !== 'cancelled' && (
                      <button
                        onClick={() => handleStatus(b.id, 'cancelled')}
                        className="rounded-full bg-ink/8 px-3.5 py-1.5 text-xs font-semibold text-ink/60 transition-colors hover:bg-ink/15"
                      >
                        Anulează (eliberează ora)
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-purple/70 transition-colors hover:bg-purple/10"
                    >
                      Șterge
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                  <a href={`tel:${b.phone}`} className="text-ink/70 hover:text-purple">
                    📞 {b.phone}
                  </a>
                  {b.message && <p className="text-ink/60 sm:col-span-2">„{b.message}"</p>}
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Notițe interne (vizibile doar aici)…"
                    defaultValue={b.notes ?? ''}
                    onChange={(e) => setNoteDrafts((prev) => ({ ...prev, [b.id]: e.target.value }))}
                    className="flex-1 rounded-xl border border-ink/12 px-3.5 py-2 text-sm outline-none transition-colors focus:border-purple"
                  />
                  <button
                    onClick={() => handleSaveNotes(b.id)}
                    className="rounded-xl border border-ink/12 px-4 py-2 text-sm font-medium text-ink/60 transition-colors hover:border-purple/40 hover:text-purple"
                  >
                    Salvează notița
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
