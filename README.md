# Website — Cabinet de Psihologie

Website React + TypeScript + Tailwind CSS, bilingv (RO/EN), construit cu Vite.

## Rulare locală

```bash
npm install
npm run dev       # server de dezvoltare
npm run build     # build de producție → folderul dist/
npm run preview   # previzualizare build-ul de producție
```

## Structură

- `src/App.tsx` — asamblează toate secțiunile paginii
- `src/i18n.tsx` — toate textele RO/EN, într-un singur loc, ușor de editat
- `src/components/` — fiecare secțiune (Hero, Despre, Cum lucrez, Servicii, Diaspora, FAQ, Contact, Footer etc.)
- `public/logo.png` — logo-ul cabinetului (folosit ca atare, neschimbat)

## Informații care lipsesc și trebuie completate

Toate datele de identificare (nume, telefoane) sunt centralizate în `src/siteInfo.ts`, ca să le poți actualiza dintr-un singur loc.

| Placeholder | Unde apare | Fișier |
|---|---|---|
| `[EMAIL]` | Adresa de email | `src/siteInfo.ts` (`EMAIL_DISPLAY`) |
| Hartă Google Maps | Secțiunea Contact | `src/components/Contact.tsx` — înlocuiește blocul cu textul `t.contact.mapNote` cu un `<iframe>` Google Maps odată ce adresa este confirmată |
| Politică de confidențialitate / cookies / termeni | Footer | `src/components/Footer.tsx` — linkurile `href="#"` trebuie conectate la paginile reale |
| Link Weberescu | Footer, bara de credit | `src/components/Footer.tsx` — linkul `href="#"` de lângă „Weberescu" poate fi conectat la site-ul lor |
| Fotografie profesională | Hero | `src/components/Hero.tsx` — containerul organic din dreapta afișează logo-ul; poate fi înlocuit cu o fotografie reală păstrând forma `rounded-organic` |

Telefonul UK (`+44 7470 433 212`) și cel din România (`+40 756 262 594`) sunt deja completate și funcționale (click-to-call).

## Programare prin WhatsApp + CRM propriu (Supabase)

Site-ul are un **calendar real, partajat între toți vizitatorii**, plus un **panou de administrare** (mini-CRM) unde poți vedea și gestiona toate cererile. Nu mai există nimic simulat local — totul e stocat central, într-o bază de date reală (Supabase, gratuit pentru un cabinet).

### 1. Creează proiectul Supabase

1. Mergi pe [supabase.com](https://supabase.com), creează un cont gratuit și un proiect nou.
2. În proiectul nou, mergi la **SQL Editor → New query**, lipește tot conținutul fișierului [`supabase/schema.sql`](supabase/schema.sql) din acest proiect și apasă **Run**. Asta creează tabela de programări și regulile de acces (cine vede ce).
3. Mergi la **Authentication → Users → Add user** și creează un utilizator cu emailul și parola cu care vrei să te loghezi în panoul de administrare (bifează „Auto Confirm User" ca să nu mai fie nevoie de confirmare prin email).
4. Mergi la **Project Settings → API** și copiază **Project URL** și **anon public key**.

### 2. Configurează site-ul cu aceste chei

Copiază fișierul `.env.example` în `.env` și completează:

```
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Rulează `npm install` (dacă nu ai făcut-o deja) și `npm run dev` — formularul de programare va folosi acum baza de date reală.

### 3. Panoul de administrare

Odată ce site-ul e publicat (sau chiar local, la `npm run dev`), panoul se accesează la:

```
https://domeniul-tau.ro/admin
```

Te loghezi cu emailul și parola create la pasul 1.3. De acolo poți:

- vedea toate cererile de programare, în timp real, pe măsură ce vin;
- filtra după status (Noi / Confirmate / Finalizate / Anulate);
- confirma, marca drept finalizată sau anula o programare (anularea eliberează automat ora, pentru toți vizitatorii);
- adăuga notițe interne pe fiecare client — practic un mini-CRM cu istoricul fiecărei persoane.

### 4. Deploy (Vercel sau Netlify, gratuit)

Ambele platforme detectează automat un proiect Vite. La deploy, adaugă aceleași variabile de mediu (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) în setările proiectului de pe platforma aleasă. Fișierele `vercel.json` și `public/_redirects` sunt deja incluse, ca ruta `/admin` să funcționeze corect și la reîmprospătarea paginii.

### Cum funcționează, pe scurt

- Când cineva trimite o programare, cererea se salvează direct în baza de date (nu doar în browser-ul lui) — deci ora dispare **pentru toți vizitatorii**, imediat, prin actualizări în timp real.
- Baza de date nu permite două programări active pe aceeași zi și oră, chiar dacă două persoane apasă „Trimite" în aceeași secundă.
- Dacă anulezi o programare din panoul de admin, ora redevine disponibilă pentru oricine.
- Vizitatorii obișnuiți nu pot vedea niciodată numele sau telefonul altcuiva — doar tu, din panoul de admin, ai acces la aceste date.

## Design

- Paletă: mov `#7A32A7` / `#8F5CAF`, verde `#689F25`, teal `#31728B`, text `#170633`, fundal discret `#F6F0F9`
- Fonturi: Fraunces (titluri) + Manrope (corp de text), via Google Fonts
- Element de semnătură: ramura organică ("GrowingBranch") care reia motivul copacului ψ din logo, vizibilă în secțiunea „Cum lucrez"

## SEO & accesibilitate

- `index.html` conține title, meta description, Open Graph, canonical
- `public/robots.txt` și `public/sitemap.xml` incluse (actualizează domeniul real)
- Structură semantică (H1/H2/H3), `alt` text pe imagini, focus states vizibile, formulare cu `label`
