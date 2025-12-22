# Contributing to 404-UI

First off, thank you for considering contributing to 404-UI! It's people like you who make the open-source community such an amazing place to learn, inspire, and create.

## Build Process

This project is a monorepo using **pnpm** and **Turborepo**.

### Prerequisites

- Node.js >= 18
- pnpm >= 9

### Development Setup

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the documentation site and library in watch mode:
   ```bash
   pnpm dev
   ```

## Project Structure

- `packages/404-ui`: The core library containing all components.
- `apps/docs`: The Astro-powered documentation and gallery site.

## Creating a New Template

To add a new 404 template:

1. Create the logic in `packages/404-ui/src/core`.
2. Implement the component for each framework:
   - `packages/404-ui/src/react/`
   - `packages/404-ui/src/vue/`
   - `packages/404-ui/src/vanilla/`
3. Export the new components in the respective `index.ts` files.
4. Add a preview of the new template to `apps/docs/src/pages/gallery/index.astro`.

## Pull Request Guidelines

1. **Commit Messages**: We use [Conventional Commits](https://www.conventionalcommits.org/). Examples:
   - `feat: add Glitch 404 template`
   - `fix: resolve overflow issue on mobile`
   - `docs: update installation instructions`
2. **Type Safety**: Ensure all changes are covered by TypeScript.
3. **Linting**: Run `pnpm lint` before submitting.

## Versioning & Publishing

We use **Changesets** for versioning. If your change requires a version bump:

1. Run `pnpm changeset`.
2. Follow the prompts to select the package and version type (patch, minor, major).
3. Commit the generated markdown file.

---

Questions? Feel free to open an issue!
