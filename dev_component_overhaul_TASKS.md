| ID | Phase | Task / User Story | Priority | Dependencies | Definition of Done (DoD) | Status |
|----|-------|-------------------|----------|--------------|---------------------------|--------|
| DOC | Guide | Use this table as a sequential checklist. Update **Status** with `[x]` when the **DoD** criteria are fully met. | - | - | Table committed to repo and referenced in README. | [ ] |
| F-1 | Foundation & CSS | Install/Check Tailwind CSS v4 and core plugins. | Critical | | Tailwind packages added to `package.json`; site builds without errors. | [x] |
| F-2 | Foundation & CSS | Install `clsx`, `tailwind-merge`, `class-variance-authority`. | High | | Packages added to `package.json`; build succeeds. | [x] |
| F-3 | Foundation & CSS | Install `@radix-ui/react-slot`. | High | | Package added; no type errors. | [x] |
| F-4 | Foundation & CSS | Add **shadcn-ui** CLI as dev dependency. | Critical | F-1 | `npx shadcn-ui init` executable locally. | [x] |
| F-5 | Foundation & CSS | Configure `tsconfig.json` with path aliases. | Critical | F-4 | `tsconfig.json` includes `baseUrl: "."` and `paths: { "@/*": ["./src/*"] }`. Project resolves `@/` alias. | [x] |
| F-6 | Foundation & CSS | Run `shadcn-ui init` to generate `components.json`. | Critical | F-5 | `components.json` created with project aliases & settings matching guide. | [x] |
| F-7 | Foundation & CSS | Configure `components.json` (style, paths, aliases). | High | F-6 | File matches guide sample; lint passes. | [x] |
| F-8 | Foundation & CSS | Create `src/lib/utils.ts` with `cn()` helper. | High | F-2 | File exists, exports `cn`, passes type-check. | [x] |
| F-9 | Foundation & CSS | Migrate color tokens to **OKLCH** and centralize them in `styles/theme/colors.css`. | High | | New color vars defined; old RGB tokens removed; visual diff approved. | [ ] |
| F-10 | Foundation & CSS | Implement shadow system in `styles/theme/shadows.css`. | Medium | | CSS vars `--shadow-elevation-*` created; applied to one demo element. | [ ] |
| F-11 | Foundation & CSS | Implement gradient system in `styles/theme/gradients.css`. | Medium | | `--gradient-*` vars & keyframes added; demo page shows animated gradient. | [ ] |
| F-12 | Foundation & CSS | Create modern animation styles in `styles/animations/modern.css`. | Medium | | View-transition and `slide-up` keyframes compile; demo works. | [ ] |
| F-13 | Foundation & CSS | Add interactive accent utilities (`styles/utilities/interactive.css`). | Medium | | `.interactive-accent` class renders hover state per spec. | [ ] |
| F-14 | Foundation & CSS | Define container contexts in `styles/base/containers.css`. | Medium | | `.container-root`, `.container-card`, `.container-sidebar` compile. | [ ] |
| F-15 | Foundation & CSS | Create `styles/layers.css` declaring layer hierarchy. | High | | Layer order matches guide; build warnings none. | [ ] |
| F-16 | Foundation & CSS | Update `styles/global.css` to import Tailwind & custom layers. | High | F-15 | File imports in correct layer order; site renders unchanged. | [ ] |
| F-17 | Foundation & CSS | Write `tailwind.config.mjs` with extended theme & container query plugin. | Critical | F-1 | Config matches guide; `npm run dev` succeeds with new classes. | [ ] |
| F-18 | Foundation & CSS | Create container-query variant plugin in Tailwind config. | High | F-17 | `card-sm` / `card-lg` variants generate utilities. | [ ] |
| F-19 | Foundation & CSS | Remove deprecated RGB tokens & redundant utilities. | Medium | F-9 | Codesearch shows zero legacy color usages. | [ ] |
| F-20 | Foundation & CSS | Scaffold style directories per guide (`theme`, `base`, `utilities`, etc.). | Medium | | Directory tree matches guide; imports resolved. | [ ] |
| F-21 | Foundation & CSS | Add CSS reset in `styles/base/reset.css`. | Medium | | Reset applied; no layout regression. | [ ] |
| F-22 | Foundation & CSS | Verify build & commit baseline modernization. | Critical | F-1→F-21 | `npm run build` passes; PR merged to main. | [ ] |
| M-1 | Component Migration | Add shadcn **Button** component via CLI. | Critical | F-22 | Button files generated in `/components`. | [ ] |
| M-2 | Component Migration | Create `Button.astro` wrapper with typed props. | Critical | M-1 | Wrapper compiles; storybook/demo renders. | [ ] |
| M-3 | Component Migration | Build test page `/test/button.astro` for Button. | High | M-2 | Clicking shows states & variants. | [ ] |
| M-4 | Component Migration | Replace legacy Button usages site-wide. | High | M-3 | Grep confirms 0 old Button refs; pages render. | [ ] |
| M-5 | Component Migration | Remove old Button source files & styles. | Medium | M-4 | Old files deleted; build clean. | [ ] |
| M-6 | Component Migration | Add shadcn **Badge** component. | High | F-22 | Badge files present. | [ ] |
| M-7 | Component Migration | Create `Badge.astro` wrapper. | High | M-6 | Wrapper tested. | [ ] |
| M-8 | Component Migration | Test page for Badge. | Medium | M-7 | Visual check passes. | [ ] |
| M-9 | Component Migration | Migrate & clean up Badge usages. | Medium | M-8 | No legacy Badge refs. | [ ] |
| M-10 | Component Migration | Add shadcn **Input** component. | High | F-22 | Input files generated. | [ ] |
| M-11 | Component Migration | Wrap Input in `Input.astro`. | High | M-10 | Form renders without console errors. | [ ] |
| M-12 | Component Migration | Test page for Input variations. | Medium | M-11 | Validations display. | [ ] |
| M-13 | Component Migration | Migrate & remove old Input. | Medium | M-12 | Build passes, no old imports. | [ ] |
| M-14 | Component Migration | Add shadcn **Label** component. | Medium | F-22 | Label files present. | [ ] |
| M-15 | Component Migration | Wrap Label in `Label.astro`. | Medium | M-14 | Wrapper compiled. | [ ] |
| M-16 | Component Migration | Replace old Label usages. | Medium | M-15 | Grep clean. | [ ] |
| M-17 | Component Migration | Add shadcn **Separator** component. | Medium | F-22 | Separator files present. | [ ] |
| M-18 | Component Migration | Wrap Separator in `Separator.astro`. | Medium | M-17 | Demo renders HR element. | [ ] |
| M-19 | Component Migration | Replace old Separator components. | Medium | M-18 | Clean build. | [ ] |
| M-20 | Component Migration | Commit Atom component migration. | High | M-5,M-9,M-13,M-16,M-19 | CI passes; PR merged. | [ ] |
| M-21 | Component Migration | Add shadcn **Card** component. | Critical | M-20 | Card files generated. | [ ] |
| M-22 | Component Migration | Create `Card.astro` wrapper with interactive/featured props. | Critical | M-21 | Wrapper shows hover shadow; featured border. | [ ] |
| M-23 | Component Migration | Test page for Card. | High | M-22 | Visual approval. | [ ] |
| M-24 | Component Migration | Replace legacy Card usages. | High | M-23 | No old Card refs. | [ ] |
| M-25 | Component Migration | Remove old Card code. | Medium | M-24 | Build clean. | [ ] |
| M-26 | Component Migration | Add shadcn **Alert** component. | High | M-20 | Alert files generated. | [ ] |
| M-27 | Component Migration | Wrap Alert in `Alert.astro`. | High | M-26 | Wrapper compiles. | [ ] |
| M-28 | Component Migration | Migrate Alert usages & clean. | Medium | M-27 | No old Alert refs. | [ ] |
| M-29 | Component Migration | Add shadcn **Avatar** component. | High | M-20 | Avatar files generated. | [ ] |
| M-30 | Component Migration | Wrap Avatar in `Avatar.astro`. | High | M-29 | Demo page renders. | [ ] |
| M-31 | Component Migration | Replace old Avatar usages. | Medium | M-30 | Build passes. | [ ] |
| M-32 | Component Migration | Add shadcn **Tooltip** component. | Medium | M-20 | Tooltip files generated. | [ ] |
| M-33 | Component Migration | Wrap Tooltip in `Tooltip.astro`. | Medium | M-32 | Demo shows tooltip delay & positioning. | [ ] |
| M-34 | Component Migration | Replace old Tooltip implementations. | Medium | M-33 | Clean build. | [ ] |
| M-35 | Component Migration | Add shadcn **Select** component. | Medium | M-20 | Select files generated. | [ ] |
| M-36 | Component Migration | Wrap Select in `Select.astro`. | Medium | M-35 | Form renders. | [ ] |
| M-37 | Component Migration | Replace old Select usages. | Medium | M-36 | Build passes. | [ ] |
| M-38 | Component Migration | Commit Molecule migration. | High | M-25,M-28,M-31,M-34,M-37 | CI passes; PR merged. | [ ] |
| M-39 | Component Migration | Add shadcn **Dialog/Modal** component. | Critical | M-38 | Dialog files generated. | [ ] |
| M-40 | Component Migration | Create `Dialog.astro` wrapper with event bus. | Critical | M-39 | Wrapper opens/closes via custom events. | [ ] |
| M-41 | Component Migration | Replace old Modal usages. | High | M-40 | No old modal code. | [ ] |
| M-42 | Component Migration | Add shadcn **Dropdown Menu** component. | High | M-38 | Dropdown files generated. | [ ] |
| M-43 | Component Migration | Wrap Dropdown in `DropdownMenu.astro`. | High | M-42 | Demo passes. | [ ] |
| M-44 | Component Migration | Replace old dropdown implementations. | Medium | M-43 | Build passes. | [ ] |
| M-45 | Component Migration | Add shadcn **Navigation Menu** component. | High | M-38 | NavMenu files generated. | [ ] |
| M-46 | Component Migration | Wrap Navigation Menu in `NavMenu.astro`. | High | M-45 | Header renders responsive nav. | [ ] |
| M-47 | Component Migration | Replace old navigation menu. | High | M-46 | No old nav code. | [ ] |
| M-48 | Component Migration | Add shadcn **Sheet/Drawer** component. | Medium | M-38 | Sheet files generated. | [ ] |
| M-49 | Component Migration | Wrap Sheet in `Drawer.astro`. | Medium | M-48 | Mobile drawer opens smoothly. | [ ] |
| M-50 | Component Migration | Replace old drawer implementations. | Medium | M-49 | Build passes. | [ ] |
| M-51 | Component Migration | Commit Organism migration. | High | M-41,M-44,M-47,M-50 | CI passes; PR merged. | [ ] |
| M-52 | Component Migration | Create **Form Layout** template. | Medium | M-20 | Astro template file with grid + validation. | [ ] |
| M-53 | Component Migration | Create **Grid System** template utilities. | Medium | M-20 | Responsive grid utilities documented. | [ ] |
| M-54 | Component Migration | Build **Page Templates** (landing, section pages). | Medium | M-52,M-53 | Pages render with components only. | [ ] |
| M-55 | Component Migration | Commit Template work. | Medium | M-54 | PR merged. | [ ] |
| V-1 | Validation & Governance | Implement AI readability audit script (`utils/ai-readability-audit.ts`). | High | M-20 | Script runs, outputs checklist JSON for each component. | [ ] |
| V-2 | Validation & Governance | Add JSDoc & data-attributes to all components for AI parsing. | High | V-1 | All wrappers include AI docs; audit passes. | [ ] |
| V-3 | Validation & Governance | Create `lighthouse.config.json` with performance assertions. | Critical | F-22 | Config file committed. | [ ] |
| V-4 | Validation & Governance | Setup GitHub Action to run Lighthouse CI on PRs. | Critical | V-3 | Workflow passes; blocking threshold enforced. | [ ] |
| V-5 | Validation & Governance | Optimize images (WebP/AVIF) & add Astro image optimizations. | High | | LargestContentfulPaint <1s in Lighthouse. | [ ] |
| V-6 | Validation & Governance | Subset & preload fonts; delete unused fonts. | High | | Font headers show woff2 subsets only. | [ ] |
| V-7 | Validation & Governance | Inline critical CSS & analyze bundle size <100KB gz. | High | | Bundle report under threshold; CLS <0.05. | [ ] |
| V-8 | Validation & Governance | Automated accessibility tests with `@axe-core/playwright`. | High | | CI passes with 0 violations. | [ ] |
| V-9 | Validation & Governance | Manual keyboard & screen-reader audit. | Medium | V-8 | Checklist complete, issues fixed. | [ ] |
| V-10 | Validation & Governance | Add `.github/shadcn-update.yml` protocol file. | Medium | | File merged; monthly schedule visible. | [ ] |
| V-11 | Validation & Governance | Add `COMPONENT_RULES.md` with new component checklist. | Medium | | Document available in repo root. | [ ] |
| V-12 | Validation & Governance | Add `UTILITY_RULES.css` governance doc. | Low | | File committed; referenced in README. | [ ] |
| V-13 | Validation & Governance | Final performance & accessibility regression run. | Critical | V-4→V-9 | Lighthouse & axe scores ≥98; badges added to README. | [ ] |
| V-14 | Validation & Governance | Project handoff & documentation update. | Medium | V-13 | CHANGELOG updated; dev docs reflect new system. | [ ] |
| V-15 | Validation & Governance | Launch updated site to production (Netlify/GitHub Pages). | Critical | V-13 | Deployment green; monitoring 24h shows no errors. | [ ] |