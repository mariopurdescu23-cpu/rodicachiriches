import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AdminApp from './admin/AdminApp'
import { LegalPage } from './legal/LegalPage'
import './index.css'

const path = window.location.pathname

function resolveRoute() {
  if (path.startsWith('/admin')) return <AdminApp />
  if (path.startsWith('/termeni-si-conditii')) return <LegalPage slug="terms" />
  if (path.startsWith('/politica-de-confidentialitate')) return <LegalPage slug="privacy" />
  if (path.startsWith('/politica-cookie-uri')) return <LegalPage slug="cookies" />
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{resolveRoute()}</React.StrictMode>,
)
