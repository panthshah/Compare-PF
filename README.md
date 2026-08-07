# Compare PF

A responsive Samsung refrigerator comparison prototype built with Next.js, React, TypeScript, Tailwind CSS, and HeroUI.

## Development

Use Node.js 20.19 or newer, then install and start the app:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The production comparison experience is served at `/`; `/v3` through `/v6` retain earlier design iterations for reference.

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

Product and specification content lives in `src/app/data/specs.ts`; the current UI is implemented by `ComparePageV6` and `SpecTabsV6`.
