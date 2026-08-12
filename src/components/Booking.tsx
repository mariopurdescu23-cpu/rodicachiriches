import React, { useEffect, useMemo, useState } from 'react'
import { useLang } from '../i18n'
import { useReveal } from '../hooks/useReveal'
import { TIME_SLOTS, nextBusinessDays, dateToKey, formatDayLabel, formatFullDateLabel } from '../lib/booking'
import { fetchBookedTimes, createBooking, subscribeToDateChanges } from '../lib/bookingApi'
import { buildWhatsAppBookingLink, PHONE_RO_DISPLAY } from '../siteInfo'

type Stage = 'form' | 'success'

export const Booking: React.FC = () => {
  const { t, lang } = useLang()
  const ref = useReveal<HTMLDivElement>()

  const locale = lang === 'ro' ? 'ro-RO' : 'en-GB'
  const days = useMemo(() => nextBusinessDays(10), [])

  const [selectedDate, setSelectedDate] = useState<Date>(days[0])
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [bookedTimes, setBookedTimes] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(true)
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

  const handlePickDate = (d: Date) => {
    setSelectedDate(d)
    setSelectedTime(null)
    setError(null)
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

    const link = buildWhatsAppBookingLink({
      name,
      phone,
      language: language === 'ro' ? t.booking.langRo : t.booking.langEn,
      dateLabel: formatFullDateLabel(selectedDate, locale),
      time: selectedTime,
      message,
    })
    window.open(link, '_blank', 'noopener,noreferrer')

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
                <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-1 px-1">
                  {days.map((d) => {
                    const key = dateToKey(d)
                    const isSelected = key === dateKey
                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => handlePickDate(d)}
                        className={`shrink-0 rounded-2xl border px-4 py-3 text-sm font-medium capitalize transition-all duration-300 ${
                          isSelected
                            ? 'border-purple bg-purple text-white shadow-card'
                            : 'border-ink/10 bg-white text-ink/70 hover:border-purple/40 hover:bg-mist'
                        }`}
                      >
                        {formatDayLabel(d, locale)}
                      </button>
                    )
                  })}
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.76.46 3.48 1.34 5L2 22l5.13-1.35A9.96 9.96 0 0 0 12.04 22c5.52 0 10-4.48 10-10s-4.48-10-10-10Zm5.85 14.32c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.68-.63-2.96-1.28-4.89-4.25-5.04-4.45-.15-.2-1.2-1.6-1.2-3.06 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.68.52.25.6.85 2.06.93 2.21.08.15.13.32.03.52-.1.2-.15.32-.3.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.47.13.65-.08.18-.2.76-.88.96-1.19.2-.3.4-.25.68-.15.27.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.72-.17 1.42Z" />
                </svg>
                {t.booking.formSubmit}
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
