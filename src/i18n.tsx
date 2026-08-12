import React, { createContext, useContext, useState, useCallback } from 'react'

export type Lang = 'ro' | 'en'

const dict = {
  ro: {
    nav: {
      home: 'Acasă',
      about: 'Despre',
      how: 'Cum lucrez',
      services: 'Servicii',
      diaspora: 'Diaspora',
      faq: 'Întrebări frecvente',
      contact: 'Contact',
      cta: 'Programează o ședință',
    },
    hero: {
      eyebrow: 'Cabinet de psihologie · Online · RO / EN',
      title: 'Împreună spre versiunea ta autentică.',
      subtitle:
        'Psihologie clinică și suport psihologic online, în limba română și engleză.',
      ctaPrimary: 'Programează o ședință',
      ctaSecondary: 'Află mai multe despre mine',
      note: 'Spațiu confidențial, fără judecată, în ritmul tău.',
    },
    about: {
      eyebrow: 'Despre mine',
      title: 'Un spațiu profesionist, construit pe experiență reală',
      p1: 'Sunt psiholog clinician practicant sub supervizare, înregistrată la Colegiul Psihologilor din România, și lucrez atât în limba română, cât și în limba engleză.',
      p2: 'În paralel cu practica mea privată, lucrez în Marea Britanie în domeniul neuropsihologiei și neuroreabilitării, în cadrul unui serviciu specializat pentru persoane cu leziuni cerebrale dobândite.',
      p3: 'Experiența mea profesională din UK include, de asemenea, lucrul în servicii de sănătate mintală cu persoane cu dificultăți complexe, dizabilitate intelectuală și autism.',
      p4: 'Am absolvit Facultatea de Psihologie la Universitatea din București și un Master în Applied Psychology with Professional Experience la Coventry University, Marea Britanie.',
      p5: 'În prezent, urmez o formare de bază în psihoterapie integrativă, care completează experiența mea în psihologie clinică și îmi permite să îmi dezvolt în continuare abordarea terapeutică.',
      pillars: [
        {
          label: 'Experiență',
          text: 'Neuropsihologie și neuroreabilitare în Marea Britanie, servicii de sănătate mintală pentru persoane cu dificultăți complexe, dizabilitate intelectuală și autism.',
        },
        {
          label: 'Educație',
          text: 'Facultatea de Psihologie, Universitatea din București. Master în Applied Psychology with Professional Experience, Coventry University, Marea Britanie.',
        },
        {
          label: 'Formare',
          text: 'Formare de bază în psihoterapie integrativă, în curs, complementară practicii clinice.',
        },
      ],
    },
    how: {
      eyebrow: 'Cum lucrez',
      title: 'Fiecare persoană vine cu propria poveste',
      p1: 'Pentru mine, psihologia nu înseamnă aplicarea aceleiași metode tuturor. Fiecare persoană vine cu propria poveste, propriile experiențe și propriul ritm.',
      p2: 'Îmi doresc ca ședințele să ofere un spațiu sigur, confidențial și lipsit de judecată, în care să putem înțelege împreună dificultățile cu care te confrunți, dar și resursele pe care le ai deja.',
      note: 'Experiența mea în neuropsihologie îmi oferă, de asemenea, o perspectivă asupra relației dintre creier, cogniție, emoții și comportament.',
      themesTitle: 'Teme cu care pot fi alături de tine',
      themes: [
        'Anxietate, stres și gestionarea emoțiilor',
        'Stimă de sine și autocunoaștere',
        'Relații și tipare relaționale',
        'Limite personale și comunicare',
        'Perioade de schimbare sau dificultăți de adaptare',
        'Dezvoltare personală și înțelegerea propriilor tipare de gândire și comportament',
      ],
    },
    find: {
      eyebrow: 'Ce îmi doresc să găsești aici',
      p1: 'Nu cred că rolul psihologului este să îți spună cum să îți trăiești viața.',
      p2: 'Rolul meu este să te ajut să înțelegi mai bine ce se întâmplă cu tine, să descoperim împreună ce te ține pe loc și să găsim modalități de a merge mai departe care să aibă sens pentru tine.',
      highlight: 'Împreună spre versiunea ta autentică.',
    },
    diaspora: {
      eyebrow: 'Pentru românii din Marea Britanie și din diaspora',
      title: 'Cunosc acest context, pentru că îl trăiesc și eu',
      p1: 'Știu că experiența de a trăi într-o altă țară poate veni cu provocări aparte: adaptarea la o cultură diferită, distanța față de familie, sentimentul de apartenență, relațiile, presiunea profesională sau senzația că trăiești între două lumi.',
      p2: 'Fiind stabilită și lucrând profesional în Marea Britanie, cunosc direct acest context.',
      p3: 'Ofer ședințe online în română și engleză, inclusiv persoanelor din comunitatea românească din diaspora.',
      cta: 'Programează o ședință online',
    },
    services: {
      eyebrow: 'Servicii',
      title: 'Cu ce te pot ajuta',
      subtitle:
        'Ședințe individuale, online, în limba română sau engleză — construite în jurul nevoilor tale.',
      items: [
        { title: 'Psihologie clinică', text: 'Sprijin psihologic clinic, oferit sub supervizare profesională.' },
        { title: 'Suport psihologic', text: 'Un spațiu de ascultare și înțelegere, fără judecată.' },
        { title: 'Ședințe online', text: 'Acces facil, oriunde te-ai afla, prin ședințe desfășurate online.' },
        { title: 'Ședințe în limba română', text: 'Pentru clienți din România și din diaspora română.' },
        { title: 'Ședințe în limba engleză', text: 'Pentru clienți vorbitori de limba engleză.' },
        { title: 'Anxietate, stres și gestionarea emoțiilor', text: 'Sprijin pentru înțelegerea și reglarea emoțiilor.' },
        { title: 'Autocunoaștere și stimă de sine', text: 'Explorarea propriilor tipare și resurse interioare.' },
        { title: 'Relații și limite personale', text: 'Comunicare, limite sănătoase și tipare relaționale.' },
        { title: 'Adaptare la schimbare', text: 'Sprijin în perioade de tranziție sau dificultăți de adaptare.' },
        { title: 'Dezvoltare personală', text: 'Înțelegerea propriilor tipare de gândire și comportament.' },
      ],
      note: 'Detalii precum durata ședințelor și tarifele pot fi discutate direct, la programare.',
    },
    booking: {
      eyebrow: 'Programare',
      title: 'Programează o primă discuție',
      text: 'Alege o zi și o oră disponibilă și completează câteva detalii — programarea se rezervă imediat.',
      cta: 'Programează o ședință',
      formName: 'Nume',
      formPhone: 'Telefon',
      formLanguage: 'Limbă preferată',
      langRo: 'Română',
      langEn: 'Engleză',
      formDate: 'Alege o zi',
      formTime: 'Alege o oră',
      formMessage: 'Un scurt context (opțional)',
      formSubmit: 'Trimite programarea',
      noTimeSelected: 'Selectează mai întâi o zi și o oră.',
      slotUnavailable: 'Indisponibil',
      slotBookedNotice: 'Această oră a fost deja solicitată — alege alta.',
      slotTakenRace: 'Ora tocmai a fost rezervată de altcineva — alege alta.',
      genericError: 'A apărut o eroare. Încearcă din nou, te rugăm.',
      loadingSlots: 'Se încarcă orele disponibile…',
      disclaimer:
        'Disponibilitatea este partajată, în timp real, între toți vizitatorii site-ului.',
      successTitle: 'Cererea ta a fost înregistrată',
      successText:
        'Ora a fost rezervată pentru tine. Vei fi contactat(ă) în curând pentru confirmare.',
    },
    faq: {
      eyebrow: 'Întrebări frecvente',
      title: 'Câteva răspunsuri utile',
      items: [
        {
          q: 'Ședințele se desfășoară online?',
          a: 'Da, ședințele se desfășoară online, ceea ce facilitează accesul indiferent de locația în care te afli, inclusiv din Marea Britanie sau din alte țări.',
        },
        {
          q: 'În ce limbi se pot desfășura ședințele?',
          a: 'Ședințele pot avea loc în limba română sau în limba engleză, în funcție de preferința ta.',
        },
        {
          q: 'Cum decurge o primă discuție?',
          a: 'O primă discuție este ocazia în care ne cunoaștem, vorbim despre ce te aduce în acest proces și despre cum putem lucra împreună.',
        },
        {
          q: 'Informațiile discutate în ședințe sunt confidențiale?',
          a: 'Confidențialitatea este un principiu fundamental al practicii psihologice.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Hai să vorbim',
      text: 'Poți alege modalitatea de contact care ți se potrivește: telefon, e-mail sau formularul de mai jos.',
      phoneRO: 'Telefon România',
      phoneUK: 'Telefon UK',
      email: 'Email',
      formName: 'Nume',
      formEmail: 'Email',
      formMessage: 'Mesajul tău',
      formSubmit: 'Trimite mesajul',
    },
    footer: {
      rights: 'Toate drepturile rezervate.',
      privacy: 'Politica de confidențialitate',
      cookies: 'Politica privind cookies',
      terms: 'Termeni și condiții',
      credit: 'Site realizat de',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      how: 'How I work',
      services: 'Services',
      diaspora: 'Diaspora',
      faq: 'FAQ',
      contact: 'Contact',
      cta: 'Book a session',
    },
    hero: {
      eyebrow: 'Psychology practice · Online · RO / EN',
      title: 'Together, towards your authentic self.',
      subtitle:
        'Clinical psychology and psychological support online, in Romanian and English.',
      ctaPrimary: 'Book a session',
      ctaSecondary: 'Learn more about me',
      note: 'A confidential, non-judgmental space, at your own pace.',
    },
    about: {
      eyebrow: 'About me',
      title: 'A professional space, built on real experience',
      p1: 'I am a trainee clinical psychologist working under supervision, registered with the Romanian College of Psychologists, and I work in both Romanian and English.',
      p2: 'Alongside my private practice, I work in the United Kingdom in neuropsychology and neurorehabilitation, within a specialist service for people with acquired brain injuries.',
      p3: 'My professional experience in the UK also includes working in mental health services with people with complex needs, intellectual disability and autism.',
      p4: 'I graduated from the Faculty of Psychology at the University of Bucharest, and hold a Master\u2019s in Applied Psychology with Professional Experience from Coventry University, UK.',
      p5: 'I am currently undertaking foundational training in integrative psychotherapy, which complements my clinical psychology experience and allows me to keep developing my therapeutic approach.',
      pillars: [
        {
          label: 'Experience',
          text: 'Neuropsychology and neurorehabilitation in the UK, mental health services for people with complex needs, intellectual disability and autism.',
        },
        {
          label: 'Education',
          text: 'Faculty of Psychology, University of Bucharest. MSc in Applied Psychology with Professional Experience, Coventry University, UK.',
        },
        {
          label: 'Training',
          text: 'Ongoing foundational training in integrative psychotherapy, complementing clinical practice.',
        },
      ],
    },
    how: {
      eyebrow: 'How I work',
      title: 'Everyone arrives with their own story',
      p1: 'To me, psychology isn\u2019t about applying the same method to everyone. Each person comes with their own story, their own experiences, and their own pace.',
      p2: 'I want sessions to offer a safe, confidential and non-judgmental space, where we can understand together the difficulties you\u2019re facing, as well as the resources you already have.',
      note: 'My background in neuropsychology also gives me a perspective on the relationship between the brain, cognition, emotions and behaviour.',
      themesTitle: 'Areas I can support you with',
      themes: [
        'Anxiety, stress and emotion regulation',
        'Self-esteem and self-understanding',
        'Relationships and relational patterns',
        'Personal boundaries and communication',
        'Periods of change or difficulty adapting',
        'Personal development and understanding your own patterns of thought and behaviour',
      ],
    },
    find: {
      eyebrow: 'What I hope you\u2019ll find here',
      p1: 'I don\u2019t believe the psychologist\u2019s role is to tell you how to live your life.',
      p2: 'My role is to help you better understand what\u2019s happening for you, to discover together what\u2019s holding you back, and to find ways forward that make sense to you.',
      highlight: 'Together, towards your authentic self.',
    },
    diaspora: {
      eyebrow: 'For Romanians in the UK and the diaspora',
      title: 'I understand this context, because I live it too',
      p1: 'I know that living in another country can bring particular challenges: adapting to a different culture, the distance from family, a sense of belonging, relationships, professional pressure, or the feeling of living between two worlds.',
      p2: 'Being based and working professionally in the United Kingdom, I understand this context directly.',
      p3: 'I offer online sessions in Romanian and English, including for people in the Romanian community across the diaspora.',
      cta: 'Book an online session',
    },
    services: {
      eyebrow: 'Services',
      title: 'How I can help',
      subtitle:
        'Individual, online sessions, in Romanian or English — built around what you need.',
      items: [
        { title: 'Clinical psychology', text: 'Clinical psychological support, offered under professional supervision.' },
        { title: 'Psychological support', text: 'A space to be heard and understood, without judgment.' },
        { title: 'Online sessions', text: 'Easy access, wherever you are, through online sessions.' },
        { title: 'Sessions in Romanian', text: 'For clients in Romania and across the Romanian diaspora.' },
        { title: 'Sessions in English', text: 'For English-speaking clients.' },
        { title: 'Anxiety, stress and emotion regulation', text: 'Support for understanding and regulating emotions.' },
        { title: 'Self-understanding and self-esteem', text: 'Exploring your own patterns and inner resources.' },
        { title: 'Relationships and personal boundaries', text: 'Communication, healthy boundaries and relational patterns.' },
        { title: 'Adapting to change', text: 'Support through transitions or periods of adjustment.' },
        { title: 'Personal development', text: 'Understanding your own patterns of thought and behaviour.' },
      ],
      note: 'Details such as session length and fees can be discussed directly, when booking.',
    },
    booking: {
      eyebrow: 'Booking',
      title: 'Book an initial conversation',
      text: 'Pick an available day and time and add a few details — the booking is reserved right away.',
      cta: 'Book a session',
      formName: 'Name',
      formPhone: 'Phone',
      formLanguage: 'Preferred language',
      langRo: 'Romanian',
      langEn: 'English',
      formDate: 'Choose a day',
      formTime: 'Choose a time',
      formMessage: 'A short note (optional)',
      formSubmit: 'Send booking request',
      noTimeSelected: 'Choose a day and a time first.',
      slotUnavailable: 'Unavailable',
      slotBookedNotice: 'This time has already been requested — pick another.',
      slotTakenRace: 'This time was just booked by someone else — pick another.',
      genericError: 'Something went wrong. Please try again.',
      loadingSlots: 'Loading available times…',
      disclaimer: 'Availability is shared in real time across every visitor to the site.',
      successTitle: 'Your request has been recorded',
      successText: 'The time has been reserved for you. We\u2019ll be in touch shortly to confirm.',
    },
    faq: {
      eyebrow: 'Frequently asked questions',
      title: 'A few helpful answers',
      items: [
        {
          q: 'Are sessions held online?',
          a: 'Yes, sessions are held online, which makes access easier regardless of where you are, including from the UK or other countries.',
        },
        {
          q: 'What languages are sessions available in?',
          a: 'Sessions can be held in Romanian or in English, depending on your preference.',
        },
        {
          q: 'What happens in a first conversation?',
          a: 'A first conversation is a chance to get to know each other, talk about what brings you to this process, and how we can work together.',
        },
        {
          q: 'Is what I share in sessions confidential?',
          a: 'Confidentiality is a fundamental principle of psychological practice.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Let\u2019s talk',
      text: 'Choose whichever contact method suits you best: phone, email, or the form below.',
      phoneRO: 'Phone Romania',
      phoneUK: 'Phone UK',
      email: 'Email',
      formName: 'Name',
      formEmail: 'Email',
      formMessage: 'Your message',
      formSubmit: 'Send message',
    },
    footer: {
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      terms: 'Terms & Conditions',
      credit: 'Website by',
    },
  },
}

export type Dict = typeof dict.ro

const LangContext = createContext<{
  lang: Lang
  t: Dict
  toggle: () => void
  setLang: (l: Lang) => void
}>({
  lang: 'ro',
  t: dict.ro,
  toggle: () => {},
  setLang: () => {},
})

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Lang>('ro')

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    document.documentElement.lang = l
  }, [])

  const toggle = useCallback(() => {
    setLang(lang === 'ro' ? 'en' : 'ro')
  }, [lang, setLang])

  return (
    <LangContext.Provider value={{ lang, t: dict[lang], toggle, setLang }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
