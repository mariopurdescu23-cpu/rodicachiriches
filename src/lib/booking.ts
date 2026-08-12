export const TIME_SLOTS = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

const STORAGE_KEY = 'psiho-booked-slots-v1'

export function slotKey(dateKey: string, time: string) {
  return `${dateKey}_${time}`
}

/** Reads the set of already-requested slots from this browser's local storage. */
export function getBookedSlots(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

/** Marks a slot as booked so it shows as unavailable on future visits from this browser. */
export function markSlotBooked(dateKey: string, time: string) {
  if (typeof window === 'undefined') return
  try {
    const slots = getBookedSlots()
    const key = slotKey(dateKey, time)
    if (!slots.includes(key)) {
      slots.push(key)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slots))
    }
  } catch {
    // localStorage unavailable (private browsing, etc.) — booking still proceeds via WhatsApp
  }
}

export function isSlotBooked(dateKey: string, time: string): boolean {
  return getBookedSlots().includes(slotKey(dateKey, time))
}

/** Returns the next `count` weekdays (Mon–Fri), starting tomorrow. */
export function nextBusinessDays(count: number): Date[] {
  const days: Date[] = []
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  cursor.setDate(cursor.getDate() + 1)

  while (days.length < count) {
    const day = cursor.getDay()
    if (day !== 0 && day !== 6) {
      days.push(new Date(cursor))
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

export function dateToKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function formatDayLabel(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' }).format(d)
}

export function formatFullDateLabel(d: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(d)
}
