import React from 'react'
import { LangProvider } from './i18n'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { HowIWork } from './components/HowIWork'
import { WhatToFind } from './components/WhatToFind'
import { Diaspora } from './components/Diaspora'
import { Services } from './components/Services'
import { Booking } from './components/Booking'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { MobileActionBar } from './components/MobileActionBar'

function App() {
  return (
    <LangProvider>
      <Navbar />
      <main className="pb-16 lg:pb-0">
        <Hero />
        <About />
        <HowIWork />
        <WhatToFind />
        <Diaspora />
        <Services />
        <Booking />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </LangProvider>
  )
}

export default App
