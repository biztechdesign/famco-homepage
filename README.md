# FAMCO Used Equipment — Homepage Prototype

BAS World–style redesign of [famco-usedequipment.com](https://www.famco-usedequipment.com/en/), built with **Next.js 15 + Tailwind CSS**.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Structure

```
app/
  layout.tsx        # Root layout, Google Fonts, metadata
  page.tsx          # Homepage composition
  globals.css       # Tailwind + design tokens
components/
  UtilityBar.tsx    # Top dark utility bar (phone, lang, currency, sign in)
  Header.tsx        # Sticky main header with mega-menu
  Hero.tsx          # Hero with tabbed search panel
  TrustStrip.tsx    # 4 trust stats under hero
  Categories.tsx    # 6 inventory category cards
  VehicleCard.tsx   # Reusable vehicle listing card
  Featured.tsx      # Latest arrivals grid
  WhyFamco.tsx      # 4 trust pillars
  Brands.tsx        # Authorized brand strip
  Services.tsx      # Finance / Rental / Service cards
  SellBand.tsx      # Full-bleed "Sell with FAMCO" CTA
  Locations.tsx     # UAE map + 3 branch cards
  News.tsx          # Offers & news cards
  Reviews.tsx       # Testimonials + stat row
  Footer.tsx        # Dark footer with 6 columns
tailwind.config.ts  # FAMCO design tokens (colors, type, radius, shadows)
```

## Design Tokens

- **Primary:** `#0E2233` (deep steel)
- **Accent:** `#E2231A` (FAMCO red)
- **Sand:** `#D9A441` (premium accents)
- **Display font:** Barlow Condensed
- **Body font:** Inter

All defined in `tailwind.config.ts` and `app/globals.css`.

## Next steps

- Wire real inventory feed (replace mock data in `Featured.tsx`).
- Add Arabic / RTL locale via `next-intl`.
- Replace placeholder Unsplash photos with on-yard photography.
- Build out stock listing, vehicle detail, and sell-your-vehicle pages.
