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

## Programare prin WhatsApp

Secțiunea „Programare" (`src/components/Booking.tsx`) este un formular complet:

- alegere zi (următoarele 10 zile lucrătoare) și oră (interval 09:00–17:00, pauză 13:00);
- câmpuri: nume, telefon, limbă preferată (RO/EN), mesaj opțional;
- la trimitere, se deschide WhatsApp (`wa.me`) către numărul din România, cu un mesaj pre-completat cu toate detaliile.

**Indisponibilitatea orelor este simulată local, în browser** (`localStorage`, vezi `src/lib/booking.ts`): odată ce cineva trimite o cerere pentru o oră anume, acea oră apare tăiată/indisponibilă *doar pe dispozitivul respectiv*. Acesta e un site static, fără bază de date — pentru o disponibilitate reală, partajată între toți vizitatorii (astfel încât o oră rezervată de o persoană să dispară pentru toți ceilalți), ai nevoie de un serviciu extern de programări (de exemplu Calendly, Cal.com, sau un backend propriu conectat la un calendar). Recomand acest pas ca îmbunătățire ulterioară dacă volumul de cereri crește.

## Design

- Paletă: mov `#7A32A7` / `#8F5CAF`, verde `#689F25`, teal `#31728B`, text `#170633`, fundal discret `#F6F0F9`
- Fonturi: Fraunces (titluri) + Manrope (corp de text), via Google Fonts
- Element de semnătură: ramura organică ("GrowingBranch") care reia motivul copacului ψ din logo, vizibilă în secțiunea „Cum lucrez"

## SEO & accesibilitate

- `index.html` conține title, meta description, Open Graph, canonical
- `public/robots.txt` și `public/sitemap.xml` incluse (actualizează domeniul real)
- Structură semantică (H1/H2/H3), `alt` text pe imagini, focus states vizibile, formulare cu `label`
