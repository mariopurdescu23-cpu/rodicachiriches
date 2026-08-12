import { supabase } from './supabaseClient'

export interface BookingPayload {
  date: string
  time: string
  name: string
  phone: string
  language: string
  message: string
}

export interface AdminBooking {
  id: string
  created_at: string
  date: string
  time: string
  name: string
  phone: string
  language: string
  message: string | null
  status: 'new' | 'confirmed' | 'cancelled' | 'completed'
  notes: string | null
}

/** Returns the time slots already taken (across ALL visitors) for a given date. */
export async function fetchBookedTimes(date: string): Promise<string[]> {
  const { data, error } = await supabase.from('bookings').select('time').eq('date', date)
  if (error) {
    // eslint-disable-next-line no-console
    console.error('fetchBookedTimes error', error)
    return []
  }
  return (data ?? []).map((row) => row.time as string)
}

/** Creates a new booking request. Fails with a Postgres unique-violation if the slot was just taken by someone else. */
export async function createBooking(payload: BookingPayload): Promise<{ error: string | null }> {
  const { error } = await supabase.from('bookings').insert({
    date: payload.date,
    time: payload.time,
    name: payload.name,
    phone: payload.phone,
    language: payload.language,
    message: payload.message || null,
  })

  if (error) {
    if (error.code === '23505') {
      return { error: 'slot_taken' }
    }
    // eslint-disable-next-line no-console
    console.error('createBooking error', error)
    return { error: 'unknown' }
  }
  return { error: null }
}

/** Subscribes to real-time changes for a given date so the availability grid updates live for every visitor. */
export function subscribeToDateChanges(date: string, onChange: () => void) {
  const channel = supabase
    .channel(`bookings-${date}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'bookings', filter: `date=eq.${date}` },
      onChange
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}

/** Admin: fetches all bookings, most recent first. Requires an authenticated session. */
export async function fetchAllBookings(): Promise<AdminBooking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true })

  if (error) {
    // eslint-disable-next-line no-console
    console.error('fetchAllBookings error', error)
    return []
  }
  return (data ?? []) as AdminBooking[]
}

export async function updateBookingStatus(id: string, status: AdminBooking['status']) {
  return supabase.from('bookings').update({ status }).eq('id', id)
}

export async function updateBookingNotes(id: string, notes: string) {
  return supabase.from('bookings').update({ notes }).eq('id', id)
}

export async function deleteBooking(id: string) {
  return supabase.from('bookings').delete().eq('id', id)
}

export function subscribeToAllChanges(onChange: () => void) {
  const channel = supabase
    .channel('bookings-admin')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, onChange)
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
