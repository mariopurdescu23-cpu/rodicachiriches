import React, { useEffect, useMemo, useState } from 'react'
import { TIME_SLOTS, nextBusinessDays, dateToKey, formatFullDateLabel } from '../lib/booking'
import {
  AvailabilityBlock,
  fetchBookedTimes,
  fetchBlocksForDate,
  createBlock,
  deleteBlock,
  deleteAllBlocksForDate,
  subscribeToBlockChanges,
  subscribeToDateChanges,
} from '../lib/bookingApi'
import { CalendarPicker } from '../components/CalendarPicker'

function describeError(err: unknown): string {
  const message = (err as { message?: string })?.message || String(err)
  if (/relation .*availability_blocks.* does not exist/i.test(message)) {
    return 'Tabela "availability_blocks" nu există încă în baza de date. Rulează migrarea SQL (vezi README, secțiunea Disponibilitate) în Supabase → SQL Editor, apoi reîncearcă.'
  }
  if (/permission denied|row-level security|rls/i.test(message)) {
    return 'Acces refuzat de baza de date (RLS). Verifică dacă ai rulat exact scriptul SQL din supabase/schema.sql, secțiunea "Disponibilitate gestionată de psiholog".'
  }
  return `A apărut o eroare: ${message}`
}

export const AdminAvailability: React.FC = () => {
  const today = useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])
  const maxDate = useMemo(() => {
    const d = new Date(today)
    d.setFullYear(d.getFullYear() + 1)
    return d
  }, [today])

  const [selectedDate, setSelectedDate] = useState<Date>(() => nextBusinessDays(1)[0])
  const [pendingDate, setPendingDate] = useState<Date | null>(null)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([])
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dateKey = dateToKey(selectedDate)
  const wholeDayBlock = blocks.find((b) => b.time === null)
  const blockedHourSet = new Set(blocks.filter((b) => b.time !== null).map((b) => b.time as string))

  const load = () => {
    Promise.all([fetchBlocksForDate(dateKey), fetchBookedTimes(dateKey)]).then(([blks, booked]) => {
      setBlocks(blks)
      setBookedTimes(booked)
      setLoading(false)
    })
  }

  useEffect(() => {
    setLoading(true)
    load()
    const unsub1 = subscribeToBlockChanges(dateKey, load)
    const unsub2 = subscribeToDateChanges(dateKey, load)
    return () => {
      unsub1()
      unsub2()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKey])

  const openCalendar = () => {
    setPendingDate(selectedDate)
    setCalendarOpen(true)
    setError(null)
  }

  const confirmDate = () => {
    if (pendingDate) setSelectedDate(pendingDate)
    setCalendarOpen(false)
  }

  const cancelDate = () => {
    setPendingDate(null)
    setCalendarOpen(false)
  }

  const handleToggleWholeDay = async () => {
    setBusy(true)
    setError(null)
    if (wholeDayBlock) {
      const { error: err } = await deleteAllBlocksForDate(dateKey)
      if (err) setError(describeError(err))
    } else {
      const { error: err1 } = await deleteAllBlocksForDate(dateKey) // clear any partial-hour blocks first
      const { error: err2 } = err1 ? { error: err1 } : await createBlock(dateKey, null, 'Blocată integral din panoul de admin')
      if (err1 || err2) setError(describeError(err1 || err2))
    }
    setBusy(false)
    load()
  }

  const handleToggleHour = async (time: string) => {
    if (wholeDayBlock || bookedTimes.includes(time)) return
    setBusy(true)
    setError(null)
    const existing = blocks.find((b) => b.time === time)
    if (existing) {
      const { error: err } = await deleteBlock(existing.id)
      if (err) setError(describeError(err))
    } else {
      const { error: err } = await createBlock(dateKey, time)
      if (err) setError(describeError(err))
    }
    setBusy(false)
    load()
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h2 className="font-display text-xl text-ink">Disponibilitate</h2>
          <p className="mt-1 max-w-md text-sm text-ink/50">
            Blochează zile sau ore în care nu ești disponibilă (concediu, alte angajamente etc.). Vizitatorii nu vor
            mai putea selecta acele ore — se actualizează live pe site.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => (calendarOpen ? cancelDate() : openCalendar())}
            className="flex items-center gap-2.5 rounded-2xl border border-ink/12 bg-white px-4 py-3 text-sm font-medium capitalize text-ink/80 shadow-card transition-colors hover:border-purple/40"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple">
              <rect x="3" y="4" width="18" height="18" rx="3" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {formatFullDateLabel(selectedDate, 'ro-RO')}
          </button>

          {calendarOpen && (
            <div className="absolute right-0 z-20 mt-2 w-[320px] space-y-3">
              <CalendarPicker
                locale="ro-RO"
                selected={pendingDate ?? selectedDate}
                onSelect={(d) => setPendingDate(d)}
                minDate={today}
                maxDate={maxDate}
              />
              <div className="flex gap-2 rounded-2xl bg-white p-2 shadow-soft ring-1 ring-ink/8">
                <button
                  type="button"
                  onClick={cancelDate}
                  className="flex-1 rounded-xl px-4 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:bg-mist"
                >
                  Anulează
                </button>
                <button
                  type="button"
                  onClick={confirmDate}
                  className="flex-1 rounded-xl bg-purple px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ink"
                >
                  Confirmă data
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-2xl bg-purple/5 px-5 py-4 text-sm font-medium text-purple" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <p className="mt-8 text-sm text-ink/40">Se încarcă…</p>
      ) : (
        <div className="mt-8 rounded-2xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between gap-4 border-b border-ink/8 pb-5">
            <div>
              <p className="font-semibold text-ink">Ziua întreagă</p>
              <p className="text-sm text-ink/50">
                {wholeDayBlock ? 'Blocată — nimeni nu se poate programa în această zi.' : 'Disponibilă în mod normal.'}
              </p>
            </div>
            <button
              type="button"
              disabled={busy}
              onClick={handleToggleWholeDay}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 ${
                wholeDayBlock
                  ? 'bg-ink/8 text-ink/70 hover:bg-ink/15'
                  : 'bg-purple text-white hover:bg-ink'
              }`}
            >
              {busy ? 'Se salvează…' : wholeDayBlock ? 'Deblochează ziua' : 'Blochează toată ziua'}
            </button>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold text-ink/70">Sau blochează ore individuale</p>
            <div className={`grid grid-cols-4 gap-2.5 sm:grid-cols-7 ${wholeDayBlock ? 'opacity-40' : ''}`}>
              {TIME_SLOTS.map((time) => {
                const isBooked = bookedTimes.includes(time)
                const isBlocked = blockedHourSet.has(time)
                const disabled = wholeDayBlock !== undefined || isBooked || busy
                return (
                  <button
                    key={time}
                    type="button"
                    disabled={disabled}
                    onClick={() => handleToggleHour(time)}
                    title={isBooked ? 'Ora are deja o programare — nu poate fi blocată' : undefined}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors ${
                      isBooked
                        ? 'cursor-not-allowed border-teal/20 bg-teal/10 text-teal'
                        : isBlocked
                        ? 'border-ink/20 bg-ink/10 text-ink/60 line-through'
                        : 'border-ink/10 bg-white text-ink/75 hover:border-purple/40 hover:bg-mist'
                    } ${disabled && !isBooked ? 'cursor-not-allowed opacity-60' : ''}`}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink/45">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/20" /> Blocată de tine
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-teal/40" /> Are deja o programare
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full border border-ink/20" /> Disponibilă
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
