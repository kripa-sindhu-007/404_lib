# 404-UI

<div align="center">

**Open-source animated 404 error pages for React, Vue, and vanilla JavaScript**

[![npm version](https://img.shields.io/npm/v/@kripa006/404-ui.svg?style=flat-square)](https://www.npmjs.com/package/@kripa006/404-ui)
[![npm downloads](https://img.shields.io/npm/dm/@kripa006/404-ui.svg?style=flat-square)](https://www.npmjs.com/package/@kripa006/404-ui)
[![bundle size budget](https://img.shields.io/badge/bundle-12kb%20gzip%20max-brightgreen?style=flat-square)](https://github.com/kripa-sindhu-007/404_lib/blob/main/packages/404-ui/package.json#:~:text=size-limit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[Documentation](https://kripa-sindhu-007.github.io/404_lib) · [Gallery](https://kripa-sindhu-007.github.io/404_lib/gallery) · [Report Bug](https://github.com/kripa-sindhu-007/404_lib/issues) · [Request Feature](https://github.com/kripa-sindhu-007/404_lib/issues)

</div>

---

## ✨ Features

- 🎨 **Animated Templates** - Ready-made 404 pages that make dead ends feel intentional
- ⚡ **Framework Agnostic** - Works with React, Vue, and vanilla JavaScript
- 🎯 **TypeScript First** - Type definitions are included with the package
- 🌈 **Tailwind Powered** - Built with Tailwind CSS for practical customization
- 📦 **Tree-Shakable** - Import framework-specific entry points and only use what you need
- ♿ **Accessibility Minded** - Templates are designed with semantic content and keyboard-friendly actions
- 🌙 **Dark Mode Ready** - Current templates are built for polished dark-mode experiences

## 🚀 How to Use in 3 Steps

### Step 1: Install the package

Install the package using your favorite package manager:

```bash
# npm
npm install @kripa006/404-ui

# pnpm
pnpm add @kripa006/404-ui

# yarn
yarn add @kripa006/404-ui
```

### Step 2: Import the component

Import the `Space404` component into your project. React, Vue, and vanilla JavaScript entry points are available.

#### React

```tsx
import { Space404 } from "@kripa006/404-ui/react";
```

#### Vue

```vue
<script setup>
import { Space404 } from "@kripa006/404-ui/vue";
</script>
```

#### Vanilla JS

```js
import { createSpace404 } from "@kripa006/404-ui/vanilla";
```

### Step 3: Use the component

Add the component to your page and customize the text and button behavior.

#### React Example

```tsx
export default function NotFound() {
  return (
    <div style={{ height: "100vh" }}>
      <Space404
        title="404"
        subtitle="Page not found"
        buttonText="Go Home"
        onButtonClick={() => (window.location.href = "/")}
      />
    </div>
  );
}
```

#### Vue Example

```vue
<template>
  <div style="height: 100vh">
    <Space404
      title="404"
      subtitle="Page not found"
      buttonText="Go Home"
      @button-click="goHome"
    />
  </div>
</template>

<script setup>
function goHome() {
  window.location.href = "/";
}
</script>
```

#### Vanilla JS Example

```js
const container = document.getElementById("app");
// Make sure container has height
container.style.height = "100vh";

createSpace404(container, {
  title: "404",
  subtitle: "Page not found",
  buttonText: "Go Home",
  onButtonClick: () => (window.location.href = "/"),
});
```

## 🎨 Available Templates

| Template   | Description                       | Status         |
| ---------- | --------------------------------- | -------------- |
| Space 404  | Cosmic journey through the stars  | ✅ Available   |
| Glitch 404 | Retro-futuristic glitch effect    | 🚧 Coming Soon |
| Ocean 404  | Peaceful underwater scene         | 🚧 Coming Soon |
| Forest 404 | Serene forest with falling leaves | 🚧 Coming Soon |

## 📖 API Reference

### Space404 Props

| Prop            | Type         | Default              | Description              |
| --------------- | ------------ | -------------------- | ------------------------ |
| `title`         | `string`     | `"404"`              | Main title text          |
| `subtitle`      | `string`     | `"Lost in space..."` | Subtitle text            |
| `buttonText`    | `string`     | `"Return Home"`      | Button label             |
| `onButtonClick` | `() => void` | Navigate to `/`      | Button click handler     |
| `starCount`     | `number`     | `100`                | Number of animated stars |
| `showRocket`    | `boolean`    | `true`               | Show floating rocket     |
| `showPlanet`    | `boolean`    | `true`               | Show background planets  |
| `className`     | `string`     | `""`                 | Additional CSS classes   |

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/kripa-sindhu-007/404_lib.git
cd 404_lib

# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm typecheck
```

## 📁 Project Structure

```
404_lib/
├── packages/
│   └── 404-ui/           # Main library
│       ├── src/
│       │   ├── core/     # Framework-agnostic utilities
│       │   ├── react/    # React components
│       │   ├── vue/      # Vue components
│       │   └── vanilla/  # Vanilla JS components
│       └── package.json
├── apps/
│   └── docs/             # Documentation website
├── .github/
│   └── workflows/        # CI/CD pipelines
└── package.json          # Root workspace
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please also review the [Code of Conduct](CODE_OF_CONDUCT.md) and [Security Policy](SECURITY.md) before opening community or security-related reports.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Tailwind CSS](https://tailwindcss.com/)
- Bundled with [tsup](https://tsup.egoist.dev/)
- Documentation powered by [Astro](https://astro.build/)
- Monorepo managed by [Turborepo](https://turbo.build/)

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/kripa-sindhu-007">Kripa Sindhu</a>
</div>
