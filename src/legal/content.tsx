import React from 'react'
import { PRACTITIONER_NAME, EMAIL_DISPLAY, PHONE_RO_DISPLAY } from '../siteInfo'

export type LegalSlug = 'terms' | 'privacy' | 'cookies'

const LAST_UPDATED = '12 august 2026'

export const LEGAL_NAV: Array<{ slug: LegalSlug; href: string; label: string }> = [
  { slug: 'terms', href: '/termeni-si-conditii', label: 'Termeni și condiții' },
  { slug: 'privacy', href: '/politica-de-confidentialitate', label: 'Politica de confidențialitate' },
  { slug: 'cookies', href: '/politica-cookie-uri', label: 'Politica privind cookie-urile' },
]

function P({ children }: { children: React.ReactNode }) {
  return <p className="leading-relaxed text-ink/75">{children}</p>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 mb-3 font-display text-xl text-ink first:mt-0">{children}</h2>
}

function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc space-y-2 pl-5 leading-relaxed text-ink/75">{children}</ul>
}

export const LEGAL_PAGES: Record<LegalSlug, { title: string; body: React.ReactNode }> = {
  terms: {
    title: 'Termeni și condiții',
    body: (
      <>
        <P>
          Acești termeni și condiții reglementează utilizarea acestui site web și a formularului de programare,
          operate de {PRACTITIONER_NAME}, psiholog clinician practicant sub supervizare, înregistrată la Colegiul
          Psihologilor din România. Prin utilizarea site-ului, sunteți de acord cu termenii de mai jos.
        </P>

        <H2>1. Scopul site-ului</H2>
        <P>
          Acest site are un rol informativ și de programare. Formularul de programare reprezintă o{' '}
          <strong>cerere</strong> de programare, nu o confirmare automată a unei ședințe — programarea este
          considerată definitivă doar după confirmarea directă din partea psihologului (telefonic, prin WhatsApp
          sau email).
        </P>

        <H2>2. Serviciile oferite</H2>
        <P>
          Ședințele de psihologie clinică și suport psihologic se desfășoară online, în limba română sau engleză.
          Site-ul nu oferă consultații medicale de urgență. Dacă vă aflați într-o situație de criză sau urgență,
          vă rugăm să contactați serviciile de urgență locale (112) sau cea mai apropiată unitate medicală.
        </P>

        <H2>3. Confidențialitate profesională</H2>
        <P>
          Conținutul discuțiilor din ședințe este protejat de secretul profesional, conform Codului deontologic al
          profesiei de psiholog. Detalii despre modul în care sunt gestionate datele transmise prin site (nume,
          telefon, mesaje) găsiți în{' '}
          <a href="/politica-de-confidentialitate" className="text-purple underline underline-offset-2">
            Politica de confidențialitate
          </a>
          .
        </P>

        <H2>4. Programări și anulări</H2>
        <P>
          Programările se pot face prin formularul de pe site. Vă rugăm să anunțați din timp orice anulare sau
          reprogramare, telefonic sau prin WhatsApp, la numerele afișate în secțiunea de contact.
        </P>

        <H2>5. Proprietate intelectuală</H2>
        <P>
          Conținutul acestui site (texte, siglă, design) este protejat prin drepturi de autor și nu poate fi
          reprodus fără acordul prealabil al proprietarului site-ului.
        </P>

        <H2>6. Servicii terțe</H2>
        <P>
          Site-ul poate direcționa către servicii terțe (de exemplu WhatsApp, pentru comunicare directă). Utilizarea
          acestor servicii este supusă propriilor lor termeni și politici de confidențialitate, asupra cărora nu
          avem control.
        </P>

        <H2>7. Limitarea răspunderii</H2>
        <P>
          Informațiile de pe acest site au caracter general și informativ și nu înlocuiesc o evaluare sau un sfat
          profesional personalizat, oferit în cadrul unei ședințe.
        </P>

        <H2>8. Modificări</H2>
        <P>
          Acești termeni pot fi actualizați periodic. Data ultimei actualizări este afișată la începutul acestei
          pagini.
        </P>

        <H2>9. Contact</H2>
        <P>
          Pentru întrebări legate de acești termeni, ne puteți contacta la {EMAIL_DISPLAY} sau la {PHONE_RO_DISPLAY}.
        </P>
      </>
    ),
  },

  privacy: {
    title: 'Politica de confidențialitate',
    body: (
      <>
        <P>
          Această politică explică ce date colectăm prin intermediul acestui site, de ce le colectăm și ce
          drepturi aveți în legătură cu ele, în conformitate cu Regulamentul (UE) 2016/679 (GDPR).
        </P>

        <H2>1. Operatorul de date</H2>
        <P>
          Operator: {PRACTITIONER_NAME}, psiholog clinician practicant sub supervizare. Pentru orice solicitare
          legată de datele dumneavoastră personale, ne puteți contacta la {EMAIL_DISPLAY}.
        </P>

        <H2>2. Ce date colectăm</H2>
        <P>Prin formularele de pe acest site (programare și contact) putem colecta:</P>
        <Ul>
          <li>Nume</li>
          <li>Număr de telefon</li>
          <li>Adresă de email (dacă este folosit formularul de contact)</li>
          <li>Limba preferată pentru ședință</li>
          <li>Data și ora solicitate pentru programare</li>
          <li>Orice mesaj sau context transmis voluntar în formular</li>
        </Ul>
        <P>
          Nu colectăm date despre sănătate sau despre conținutul ședințelor prin intermediul acestui site — acestea
          sunt discutate exclusiv direct, în cadrul ședințelor, și fac obiectul secretului profesional.
        </P>

        <H2>3. Scopul colectării</H2>
        <P>
          Datele sunt folosite exclusiv pentru a răspunde solicitărilor dumneavoastră: a confirma o programare, a
          vă contacta în legătură cu o ședință sau a răspunde unui mesaj transmis prin formularul de contact.
        </P>

        <H2>4. Temeiul legal</H2>
        <P>
          Prelucrarea se bazează pe consimțământul dumneavoastră, acordat prin completarea și trimiterea
          formularului, respectiv pe necesitatea de a răspunde solicitării dumneavoastră (demersuri precontractuale,
          la cererea dumneavoastră).
        </P>

        <H2>5. Cui sunt transmise datele</H2>
        <P>Datele transmise prin formularul de programare sunt stocate într-o bază de date securizată, găzduită de furnizorul de servicii cloud Supabase, pe servere din Uniunea Europeană. Nu vindem și nu partajăm datele dumneavoastră cu terți în scopuri de marketing.</P>
        <P>
          Dacă alegeți să comunicați prin WhatsApp, mesajele transmise sunt supuse politicii de confidențialitate a
          Meta/WhatsApp, asupra căreia nu avem control.
        </P>

        <H2>6. Perioada de păstrare</H2>
        <P>
          Datele sunt păstrate cât timp este necesar pentru gestionarea programării și a relației profesionale,
          respectiv conform obligațiilor legale aplicabile profesiei de psiholog. Puteți solicita oricând ștergerea
          datelor care nu mai sunt necesare acestui scop.
        </P>

        <H2>7. Drepturile dumneavoastră</H2>
        <P>Conform GDPR, aveți dreptul de a solicita:</P>
        <Ul>
          <li>Acces la datele personale pe care le deținem despre dumneavoastră</li>
          <li>Rectificarea datelor incorecte sau incomplete</li>
          <li>Ștergerea datelor („dreptul de a fi uitat")</li>
          <li>Restricționarea sau opoziția la prelucrare</li>
          <li>Portabilitatea datelor</li>
          <li>Retragerea consimțământului, în orice moment</li>
        </Ul>
        <P>
          Pentru exercitarea oricăruia dintre aceste drepturi, ne puteți contacta la {EMAIL_DISPLAY}. Aveți de
          asemenea dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu
          Caracter Personal (ANSPDCP), dacă vă aflați în România.
        </P>

        <H2>8. Securitate</H2>
        <P>
          Luăm măsuri rezonabile, tehnice și organizatorice, pentru a proteja datele dumneavoastră împotriva
          accesului neautorizat, pierderii sau utilizării necorespunzătoare.
        </P>

        <H2>9. Modificări ale acestei politici</H2>
        <P>
          Această politică poate fi actualizată periodic. Data ultimei actualizări este afișată la începutul
          acestei pagini.
        </P>
      </>
    ),
  },

  cookies: {
    title: 'Politica privind cookie-urile',
    body: (
      <>
        <P>
          Această pagină explică modul în care acest site folosește cookie-uri și tehnologii similare de stocare
          locală.
        </P>

        <H2>1. Ce sunt cookie-urile</H2>
        <P>
          Cookie-urile sunt fișiere text de mici dimensiuni, stocate în browser-ul dumneavoastră atunci când
          vizitați un site web, folosite de obicei pentru a reține preferințe sau informații despre sesiunea de
          navigare.
        </P>

        <H2>2. Ce folosim pe acest site</H2>
        <P>
          Site-ul public <strong>nu folosește cookie-uri de marketing, publicitate sau tracking</strong> și nu
          include instrumente de analiză de tip terț (de exemplu Google Analytics) în mod implicit.
        </P>
        <P>
          Zona de administrare, rezervată exclusiv psihologului, folosește stocare locală strict necesară
          funcționării (menținerea sesiunii de autentificare), furnizată de platforma Supabase. Această stocare nu
          este accesibilă și nu afectează vizitatorii obișnuiți ai site-ului.
        </P>

        <H2>3. Controlul cookie-urilor</H2>
        <P>
          Puteți controla și șterge cookie-urile din setările browser-ului dumneavoastră în orice moment. Blocarea
          cookie-urilor stric necesare zonei de administrare ar putea afecta funcționarea acelei secțiuni, dar nu
          afectează navigarea pe site-ul public.
        </P>

        <H2>4. Modificări</H2>
        <P>
          Dacă în viitor site-ul va integra instrumente suplimentare (de exemplu statistici de trafic), această
          pagină va fi actualizată corespunzător, iar data ultimei actualizări va fi reflectată mai sus.
        </P>
      </>
    ),
  },
}

export { LAST_UPDATED }
