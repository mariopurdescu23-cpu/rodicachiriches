import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase nu este configurat: setează VITE_SUPABASE_URL și VITE_SUPABASE_ANON_KEY în .env (vezi .env.example).'
  )
}

export const supabase = createClient(url ?? '', anonKey ?? '')
export const isSupabaseConfigured = Boolean(url && anonKey)
