# 404-UI

<div align="center">

![404-UI Logo](https://via.placeholder.com/200x200?text=404-UI)

**Beautiful, animated 404 error pages for React, Vue, and Vanilla JS**

[![npm version](https://img.shields.io/npm/v/@kripa006/404-ui.svg?style=flat-square)](https://www.npmjs.com/package/@kripa006/404-ui)
[![npm downloads](https://img.shields.io/npm/dm/@kripa006/404-ui.svg?style=flat-square)](https://www.npmjs.com/package/@kripa006/404-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[Documentation](https://kripa-sindhu-007.github.io/404_lib) · [Gallery](https://kripa-sindhu-007.github.io/404_lib/gallery) · [Report Bug](https://github.com/kripa-sindhu-007/404_lib/issues) · [Request Feature](https://github.com/kripa-sindhu-007/404_lib/issues)

</div>

---

## ✨ Features

- 🎨 **Beautiful Designs** - Stunning, animated 404 pages that impress users
- ⚡ **Framework Agnostic** - Works with React, Vue, and Vanilla JavaScript
- 🎯 **TypeScript First** - Full TypeScript support with complete type definitions
- 🌈 **Tailwind Powered** - Built with Tailwind CSS for easy customization
- 📦 **Tree-Shakable** - Import only what you need, minimal bundle impact
- ♿ **Accessible** - WCAG compliant with proper ARIA attributes
- 🌙 **Dark Mode Ready** - All templates support dark mode out of the box

## 📦 Installation

```bash
# npm
npm install @kripa006/404-ui

# pnpm
pnpm add @kripa006/404-ui

# yarn
yarn add @kripa006/404-ui
```

## 🚀 Quick Start

### React

```tsx
import { Space404 } from "@kripa006/404-ui/react";

function NotFoundPage() {
  return (
    <Space404
      title="404"
      subtitle="Houston, we have a problem..."
      buttonText="Return Home"
      onButtonClick={() => (window.location.href = "/")}
    />
  );
}

export default NotFoundPage;
```

### Vue

```vue
<script setup>
import { Space404 } from "@kripa006/404-ui/vue";

function handleClick() {
  window.location.href = "/";
}
</script>

<template>
  <Space404
    title="404"
    subtitle="Houston, we have a problem..."
    button-text="Return Home"
    @button-click="handleClick"
  />
</template>
```

### Vanilla JavaScript

```js
import { createSpace404 } from "@kripa006/404-ui/vanilla";

const container = document.getElementById("app");

const space404 = createSpace404(container, {
  title: "404",
  subtitle: "Houston, we have a problem...",
  buttonText: "Return Home",
  onButtonClick: () => {
    window.location.href = "/";
  },
});

// Cleanup when needed
// space404.destroy();
```

### Web Component

```html
<script type="module">
  import "@kripa006/404-ui/vanilla";
</script>

<space-404
  title="404"
  subtitle="Houston, we have a problem..."
  button-text="Return Home"
></space-404>
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
