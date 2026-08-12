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

Caută în cod după aceste marcaje și înlocuiește-le cu datele reale:

| Placeholder | Unde apare | Fișier |
|---|---|---|
| `[NUMĂR ROMÂNIA]` | Telefon România | `src/components/Contact.tsx`, `src/components/Footer.tsx` |
| `[EMAIL]` | Adresa de email | `src/components/Contact.tsx`, `src/components/Footer.tsx` |
| `[LINK PROGRAMARE]` | Buton "Programează o ședință" din secțiunea Programare | `src/components/Booking.tsx` (atributul `data-booking-slot`, și `href="#contact"` de înlocuit cu link-ul real) |
| Hartă Google Maps | Secțiunea Contact | `src/components/Contact.tsx` — înlocuiește blocul cu textul `t.contact.mapNote` cu un `<iframe>` Google Maps odată ce adresa este confirmată |
| Politică de confidențialitate / cookies / termeni | Footer | `src/components/Footer.tsx` — linkurile `href="#"` trebuie conectate la paginile reale |
| Fotografie profesională | Hero | `src/components/Hero.tsx` — containerul organic din dreapta afișează logo-ul; poate fi înlocuit cu o fotografie reală păstrând forma `rounded-organic` |

Telefonul UK (`+44 7470 433 212`) este deja completat.

## Design

- Paletă: mov `#7A32A7` / `#8F5CAF`, verde `#689F25`, teal `#31728B`, text `#170633`, fundal discret `#F6F0F9`
- Fonturi: Fraunces (titluri) + Manrope (corp de text), via Google Fonts
- Element de semnătură: ramura organică ("GrowingBranch") care reia motivul copacului ψ din logo, vizibilă în secțiunea „Cum lucrez"

## SEO & accesibilitate

- `index.html` conține title, meta description, Open Graph, canonical
- `public/robots.txt` și `public/sitemap.xml` incluse (actualizează domeniul real)
- Structură semantică (H1/H2/H3), `alt` text pe imagini, focus states vizibile, formulare cu `label`
