Mission
Transform the Luis Miguel Montoya portfolio from its current prototype into a fully-featured, production-ready website hosted on GitHub Pages by implementing Tasks 1-12 defined in the “Complete Portfolio Development Guide.”
Deliver each task sequentially, completely, and reliably, committing high-quality, well-tested code that respects the project’s conventions and technical standards.

0. Global Context (read once)
Tech stack: Astro v5.7.13 + TypeScript, Tailwind CSS v4 (CSS-first), MDX content collections, Vite, GitHub Actions → GitHub Pages.

The full task breakdown, requirements, and success criteria are embedded in the markdown guide that follows this prompt (treat it as the single source of truth).

Repository already contains the baseline code indicated in the Current State Analysis section.

(The markdown guide starts on the next delimiter and is guaranteed present in the root of the repository as docs/PORTFOLIO_GUIDE.md)

pgsql
Copy
Edit
<<< BEGIN PORTFOLIO GUIDE >>>
# Complete Portfolio Development Guide: Production-Ready Implementation
…   (full text here – do not edit)
<<< END PORTFOLIO GUIDE >>>
1. Operating Procedure (loop for each task)
Read & Plan

Parse the guide and locate the next uncompleted task (Tasks 1 → 12).

Verify all dependencies for that task are marked ✅ in the repository (e.g., completed code, passing tests).

If a dependency is missing, implement it first before returning to the current task.

Implement

Follow the “Implementation Steps” verbatim, adapting to existing project conventions.

Maintain TypeScript strictness (no any), accessibility, and theme support.

Add/modify files in the structure prescribed by the guide.

Test & Validate

Run local checks:

bash
Copy
Edit
pnpm i          # ensure deps
pnpm run build  # production build
pnpm run preview
npx astro check # TypeScript
Manually open the preview URL (or programmatically verify) to ensure success criteria tick-off:

UI renders, no console errors, responsive layout (320 → 1920 px).

Keyboard & screen-reader navigation.

SEO meta present (check head tags).

For new content, search index and sitemap update.

Commit & Push

Use conventional commits prefixed by the task:

scss
Copy
Edit
feat(task-03): Implement Projects section grid & filters
Push to a feature branch named task/<num>-<slug>; open a draft PR referencing the guide section and listing:

Summary of changes

Checklist of success-criteria met

Screenshots or GIFs (if visual)

Any trade-offs or TODOs

Mark Completion

In the PR description, append a checked checkbox beside the task in the guide’s task tracker.

Move on to the next task in numerical order.

2. Coding & Styling Rules (always)
Single-responsibility components, colocate styles with .astro when possible.

Absolute imports (@/components/...), no relative hell.

Tailwind utility ordering: position → display → box model → typographic → color → state → motion.

Animations use the existing transition-spring utilities; do NOT add custom keyframes unless the guide instructs.

Obey semantic color tokens (bg-surface-secondary, text-primary, etc.).

No hard-coded strings in components—prop-driven and translated where applicable.

3. Branch Protection Expectations
All PRs must pass:

pnpm run build

npx astro check

CI workflow (.github/workflows/build-and-deploy.yml) must stay green.

Do not merge to main; merging will be handled after human review.

4. Communication Back-Channel
After each pushed PR, post a summary message (markdown) in the repository discussion channel #ai-agent-progress containing:

Task number & name

Key implementation notes

Remaining open questions or blockers (if any)

If blocked, pause further tasks and request clarification by posting in the same channel.