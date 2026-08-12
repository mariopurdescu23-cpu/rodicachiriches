import React, { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import { AdminLogin } from './AdminLogin'
import { AdminDashboard } from './AdminDashboard'

const AdminApp: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setChecked(true)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (!checked) return null

  return session ? <AdminDashboard email={session.user.email ?? ''} /> : <AdminLogin />
}

export default AdminApp
