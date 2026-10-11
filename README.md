# Compare PF

A responsive Samsung refrigerator comparison prototype built with Next.js, React, TypeScript, Tailwind CSS, and HeroUI.

## Development

Use Node.js 20.19 or newer, then install and start the app:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The comparison experience is served at `/`, and the conversational search prototype at `/search`.

## Checks

```bash
npm run lint
npm run build
```

The project uses Next.js static export and writes deployable files to `out/`.

## Deployment

- Vercel builds at the domain root with no asset prefix.
- GitHub Actions builds with `/Compare-PF` as the base path and deploys `out/` to GitHub Pages.
- The single workflow in `.github/workflows/deploy-pages.yml` deploys pushes to `main`.

Product and specification content lives in `src/app/data/specs.ts`. The UI is composed from:

- `ComparePage` – page layout, product slot selection (swap-aware), tab cross-fade and the sticky product bar.
- `ProductSelect` – the per-column product dropdown (HeroUI Select).
- `ProductCard` – badge, image, color swatches, description, price/savings and actions.
- `SpecificationTabs` – pill tab bar for spec categories (HeroUI Tabs).
- `SpecTable` – spec groups aligned to the product columns, with the "Apply Key Differences" highlight.

The conversational search prototype (`/search`) uses mocked answers from `src/app/data/searchAnswers.ts`, written from the same product data. Every search, keywords or a question, lands on one results view: an AI answer on top and the product grid it picked below. It is composed from:

- `ConversationalSearch` – the landing state, the results view, earlier questions, and the sticky follow-up field and compare tray.
- `SiteHeader` – a stand-in samsung.com header whose search trigger opens the overlay.
- `SearchOverlay` – the top search overlay: recent searches, questions to ask and recommended products; once typing, an "Ask Samsung AI" option and matching products.
- `AiOverview` – the answer, its sources and follow-up questions.
- `SearchResultCard` – a samsung.com-style result card with the AI's reason, color chips and a compare checkbox.
- `SearchComposer` and `PromptChips` – the query field and prompt chips.
- `CompareTray` – collects ticked products and opens the compare page with `/?compare=3,1`, which puts those products in the first columns.

Colors for the new components come from the design.md tokens added to `@theme` in `globals.css` (`ss-blue`, `ss-divider`, `ss-bg-gray` and so on).
