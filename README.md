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

The conversational search prototype (`/search`) uses mocked answers from `src/app/data/searchAnswers.ts`, written from the same product data. It is composed from:

- `ConversationalSearch` – empty state with suggested prompts, the conversation, and the sticky composer and compare tray.
- `SearchComposer` – the chat-style query field.
- `PromptChips` – suggested prompts and follow-up questions.
- `AnswerMessage` – the answer text, product results, sources and follow-ups.
- `SearchResultCard` – a compact product result with a compare checkbox.
- `CompareTray` – collects ticked products and opens the compare page with `/?compare=3,1`, which puts those products in the first columns.

Colors for the new components come from the design.md tokens added to `@theme` in `globals.css` (`ss-blue`, `ss-divider`, `ss-bg-gray` and so on).
