# Astro Starter Kit: Basics

```sh
pnpm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

Astro is a modern static site generator that allows you to build fast websites with your favorite UI components and libraries. This project is configured with [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha) for styling, utilizing its new Just-in-Time (JIT) engine and modular CSS capabilities.

## Tailwind CSS v4 Setup

This project uses Tailwind CSS v4, which is currently in alpha. The setup involves:

1.  **Installation**: Tailwind CSS is included as a dev dependency in `package.json`.
2.  **Configuration**:
    *   `tailwind.config.mjs`: Main Tailwind configuration file. (This file might not exist yet if we are using the default configuration or PostCSS-based configuration for v4 alpha).
    *   `postcss.config.cjs`: PostCSS configuration, which processes Tailwind CSS.
    *   `src/styles/global.css`: The entry point for global styles, importing modular CSS files.
3.  **Modular CSS**: Styles are organized into a modular structure under `src/styles/`. This includes:
    *   `base/`: Base styles and resets.
    *   `theme/`: Theme-specific styles (colors, typography, spacing, etc.).
    *   `utilities/`: Utility classes and custom components.
    *   `animations/`: Animation keyframes and properties.

Refer to `TAILWIND_V4_MIGRATION_TRACKER.md` for detailed migration notes and `TAILWIND_PATTERNS.md` for usage patterns and best practices with the new v4 features.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
