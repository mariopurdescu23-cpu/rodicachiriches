import React, { useMemo, useState } from 'react'

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1)
}

function startOfDay(d: Date) {
  const c = new Date(d)
  c.setHours(0, 0, 0, 0)
  return c
}

export const CalendarPicker: React.FC<{
  locale: string
  selected: Date | null
  onSelect: (d: Date) => void
  minDate: Date
  maxDate: Date
  isDayDisabled?: (d: Date) => boolean
}> = ({ locale, selected, onSelect, minDate, maxDate, isDayDisabled }) => {
  const [viewMonth, setViewMonth] = useState(
    () => new Date((selected ?? minDate).getFullYear(), (selected ?? minDate).getMonth(), 1)
  )

  const weeks = useMemo(() => {
    const firstOfMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1)
    const startOffset = (firstOfMonth.getDay() + 6) % 7 // grid starts on Monday
    const gridStart = new Date(firstOfMonth)
    gridStart.setDate(firstOfMonth.getDate() - startOffset)

    const days: Date[] = []
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart)
      d.setDate(gridStart.getDate() + i)
      days.push(d)
    }
    const result: Date[][] = []
    for (let i = 0; i < 6; i++) result.push(days.slice(i * 7, i * 7 + 7))
    return result
  }, [viewMonth])

  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewMonth)

  const weekdayLabels = useMemo(() => {
    const monday = new Date(2023, 0, 2)
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday)
      d.setDate(monday.getDate() + i)
      return new Intl.DateTimeFormat(locale, { weekday: 'narrow' }).format(d)
    })
  }, [locale])

  const canGoPrev = viewMonth > new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  const canGoNext = viewMonth < new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)

  return (
    <div className="w-full rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={!canGoPrev}
          onClick={() => setViewMonth((m) => addMonths(m, -1))}
          aria-label="Luna anterioară"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-mist disabled:opacity-20"
        >
          ‹
        </button>
        <p className="text-sm font-semibold capitalize text-ink">{monthLabel}</p>
        <button
          type="button"
          disabled={!canGoNext}
          onClick={() => setViewMonth((m) => addMonths(m, 1))}
          aria-label="Luna următoare"
          className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition-colors hover:bg-mist disabled:opacity-20"
        >
          ›
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-medium text-ink/35">
        {weekdayLabels.map((w, i) => (
          <div key={i}>{w}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {weeks.flat().map((d, i) => {
          const inMonth = d.getMonth() === viewMonth.getMonth()
          const rangeDisabled = d < minDate || d > maxDate
          const weekendDisabled = isDayDisabled ? isDayDisabled(d) : false
          const disabled = rangeDisabled || weekendDisabled
          const isSelected = selected && sameDay(d, selected)
          return (
            <button
              type="button"
              key={i}
              disabled={disabled}
              onClick={() => onSelect(startOfDay(d))}
              className={`aspect-square rounded-lg text-sm transition-colors ${
                !inMonth
                  ? 'text-ink/10'
                  : rangeDisabled
                  ? 'cursor-not-allowed text-ink/15'
                  : weekendDisabled
                  ? 'cursor-not-allowed bg-ink/5 text-ink/30'
                  : isSelected
                  ? 'bg-purple font-semibold text-white shadow-card'
                  : 'text-ink/70 hover:bg-mist'
              }`}
            >
              {d.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
