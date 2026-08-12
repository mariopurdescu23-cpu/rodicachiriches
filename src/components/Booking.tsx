import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { TIME_SLOTS, nextBusinessDays, dateToKey, formatFullDateLabel } from '../lib/booking'
import { fetchBookedTimes, createBooking, subscribeToDateChanges } from '../lib/bookingApi'
import { PHONE_RO_DISPLAY } from '../siteInfo'
import { CalendarPicker } from './CalendarPicker'

type Stage = 'form' | 'success'

export const Booking: React.FC = () => {
  const { t, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  const locale = lang === 'ro' ? 'ro-RO' : 'en-GB'
  const defaultDate = useMemo(() => nextBusinessDays(1)[0], [])
  const { minDate, maxDate } = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const min = new Date(today)
    min.setDate(today.getDate() + 1)
    const max = new Date(today)
    max.setFullYear(today.getFullYear() + 1)
    return { minDate: min, maxDate: max }
  }, [])

  const [selectedDate, setSelectedDate] = useState<Date>(defaultDate)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(true)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [language, setLanguage] = useState<'ro' | 'en'>(lang)
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [stage, setStage] = useState<Stage>('form')

  const dateKey = dateToKey(selectedDate)

  // Live, shared availability: fetch on date change, then stay in sync via realtime updates
  // so a slot someone else just booked disappears immediately for every visitor.
  useEffect(() => {
    let active = true
    setLoadingSlots(true)

    fetchBookedTimes(dateKey).then((times) => {
      if (active) {
        setBookedTimes(times)
        setLoadingSlots(false)
      }
    })

    const unsubscribe = subscribeToDateChanges(dateKey, () => {
      fetchBookedTimes(dateKey).then((times) => active && setBookedTimes(times))
    })

    return () => {
      active = false
      unsubscribe()
    }
  }, [dateKey])

  useEffect(() => {
    if (!calendarOpen) return
    const onClick = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [calendarOpen])

  const handlePickDate = (d: Date) => {
    setSelectedDate(d)
    setSelectedTime(null)
    setError(null)
    setCalendarOpen(false)
  }

  const handlePickTime = (time: string) => {
    if (bookedTimes.includes(time)) return
    setSelectedTime(time)
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTime) {
      setError(t.booking.noTimeSelected)
      return
    }
    if (bookedTimes.includes(selectedTime)) {
      setError(t.booking.slotBookedNotice)
      setSelectedTime(null)
      return
    }

    setSubmitting(true)
    setError(null)

    const { error: bookingError } = await createBooking({
      date: dateKey,
      time: selectedTime,
      name,
      phone,
      language: language === 'ro' ? t.booking.langRo : t.booking.langEn,
      message,
    })

    if (bookingError === 'slot_taken') {
      setError(t.booking.slotTakenRace)
      setSelectedTime(null)
      setBookedTimes((prev) => [...prev, selectedTime])
      setSubmitting(false)
      return
    }
    if (bookingError) {
      setError(t.booking.genericError)
      setSubmitting(false)
      return
    }

    setSubmitting(false)
    setStage('success')
  }

  return (
    <section id="programare" className="py-24 md:py-28 bg-mist/60">
      <div className="container-site">
        <div
          ref={ref}
          className="reveal mx-auto max-w-3xl rounded-[2.5rem] bg-white p-7 md:p-12 shadow-soft ring-1 ring-purple/10"
        >
          <div className="text-center">
            <span className="eyebrow">{t.booking.eyebrow}</span>
            <h2 className="mt-4 text-3xl md:text-4xl leading-tight">{t.booking.title}</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink/70">{t.booking.text}</p>
          </div>

          {stage === 'success' && (
            <div className="mt-10 rounded-3xl bg-mist p-7 md:p-9 text-center animate-fadeUp">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#689F25" strokeWidth="2.5">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{t.booking.successTitle}</h3>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink/65">
                {t.booking.successText}
              </p>
            </div>
          )}

          {stage === 'form' && (
            <form onSubmit={handleSubmit} className="mt-10 space-y-7">
              {/* Date picker */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-ink/70">{t.booking.formDate}</label>
                <div ref={calendarRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setCalendarOpen((v) => !v)}
                    className="flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-white px-4 py-3.5 text-sm font-medium capitalize text-ink/80 transition-colors hover:border-purple/40"
                    aria-haspopup="true"
                    aria-expanded={calendarOpen}
                  >
                    <span>{formatFullDateLabel(selectedDate, locale)}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="shrink-0 text-purple"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="3" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </button>

                  {calendarOpen && (
                    <div className="absolute z-20 mt-2 w-full sm:w-[340px]">
                      <CalendarPicker
                        locale={locale}
                        selected={selectedDate}
                        onSelect={handlePickDate}
                        minDate={minDate}
                        maxDate={maxDate}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Time slots */}
              <div>
                <label className="mb-3 block text-sm font-semibold text-ink/70">{t.booking.formTime}</label>
                {loadingSlots ? (
                  <p className="text-sm text-ink/40">{t.booking.loadingSlots}</p>
                ) : (
                  <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-4">
                    {TIME_SLOTS.map((time) => {
                      const booked = bookedTimes.includes(time)
                      const isSelected = selectedTime === time
                      return (
                        <button
                          type="button"
                          key={time}
                          disabled={booked}
                          onClick={() => handlePickTime(time)}
                          className={`relative rounded-xl border px-3 py-2.5 text-sm font-semibold transition-all duration-300 ${
                            booked
                              ? 'cursor-not-allowed border-ink/5 bg-ink/5 text-ink/25 line-through'
                              : isSelected
                              ? 'border-purple bg-purple text-white shadow-card'
                              : 'border-ink/10 bg-white text-ink/75 hover:border-purple/40 hover:bg-mist'
                          }`}
                          title={booked ? t.booking.slotUnavailable : undefined}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-name" className="mb-1.5 block text-sm font-medium text-ink/70">
                    {t.booking.formName}
                  </label>
                  <input
                    id="booking-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
                  />
                </div>
                <div>
                  <label htmlFor="booking-phone" className="mb-1.5 block text-sm font-medium text-ink/70">
                    {t.booking.formPhone}
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
                  />
                </div>
              </div>

              <div>
                <span className="mb-1.5 block text-sm font-medium text-ink/70">{t.booking.formLanguage}</span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setLanguage('ro')}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      language === 'ro' ? 'border-purple bg-purple text-white' : 'border-ink/12 text-ink/60'
                    }`}
                  >
                    {t.booking.langRo}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors duration-300 ${
                      language === 'en' ? 'border-purple bg-purple text-white' : 'border-ink/12 text-ink/60'
                    }`}
                  >
                    {t.booking.langEn}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="booking-message" className="mb-1.5 block text-sm font-medium text-ink/70">
                  {t.booking.formMessage}
                </label>
                <textarea
                  id="booking-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full resize-none rounded-xl border border-ink/12 px-4 py-3 text-[15px] outline-none transition-colors focus:border-purple"
                />
              </div>

              {error && (
                <p className="rounded-xl bg-purple/5 px-4 py-3 text-sm font-medium text-purple" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full gap-2.5 disabled:opacity-60">
                {submitting ? '…' : t.booking.formSubmit}
              </button>

              <p className="text-center text-xs text-ink/40">{t.booking.disclaimer}</p>
              <p className="text-center text-xs text-ink/35">{PHONE_RO_DISPLAY}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
