# @kripa006/404-ui

**Open-source animated 404 error pages for React, Vue, and vanilla JavaScript.**

[![npm version](https://img.shields.io/npm/v/@kripa006/404-ui.svg?style=flat-square)](https://www.npmjs.com/package/@kripa006/404-ui)
[![npm downloads](https://img.shields.io/npm/dm/@kripa006/404-ui.svg?style=flat-square)](https://www.npmjs.com/package/@kripa006/404-ui)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@kripa006/404-ui?label=gzip&style=flat-square)](https://bundlephobia.com/package/@kripa006/404-ui)
[![tree-shakable](https://img.shields.io/badge/tree--shakable-yes-brightgreen?style=flat-square)](https://github.com/kripa-sindhu-007/404_lib)
[![SSR-safe](https://img.shields.io/badge/SSR-safe-brightgreen?style=flat-square)](https://github.com/kripa-sindhu-007/404_lib)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

[Documentation](https://kripa-sindhu-007.github.io/404_lib) · [Gallery](https://kripa-sindhu-007.github.io/404_lib/gallery) · [GitHub](https://github.com/kripa-sindhu-007/404_lib) · [Report Bug](https://github.com/kripa-sindhu-007/404_lib/issues)

---

## 🖼️ Gallery

Four handcrafted templates, each shipping today for React, Vue, and Vanilla JS. Click any thumbnail to open the live demo.

<table>
  <tr>
    <td align="center" width="25%">
      <a href="https://kripa-sindhu-007.github.io/404_lib/demo/space">
        <img src="https://raw.githubusercontent.com/kripa-sindhu-007/404_lib/main/apps/docs/public/og/space.gif" alt="Space 404 — Apollo-era mission-control console" width="240" />
        <br />
        <strong>Space 404</strong>
      </a>
      <br />
      <sub>Mission-control console</sub>
    </td>
    <td align="center" width="25%">
      <a href="https://kripa-sindhu-007.github.io/404_lib/demo/glitch">
        <img src="https://raw.githubusercontent.com/kripa-sindhu-007/404_lib/main/apps/docs/public/og/glitch.gif" alt="Glitch 404 — corrupted broadcast feed" width="240" />
        <br />
        <strong>Glitch 404</strong>
      </a>
      <br />
      <sub>Corrupted broadcast</sub>
    </td>
    <td align="center" width="25%">
      <a href="https://kripa-sindhu-007.github.io/404_lib/demo/ocean">
        <img src="https://raw.githubusercontent.com/kripa-sindhu-007/404_lib/main/apps/docs/public/og/ocean.gif" alt="Ocean 404 — bioluminescent deep-sea drift" width="240" />
        <br />
        <strong>Ocean 404</strong>
      </a>
      <br />
      <sub>Deep-sea drift</sub>
    </td>
    <td align="center" width="25%">
      <a href="https://kripa-sindhu-007.github.io/404_lib/demo/forest">
        <img src="https://raw.githubusercontent.com/kripa-sindhu-007/404_lib/main/apps/docs/public/og/forest.gif" alt="Forest 404 — old-growth rainforest at twilight" width="240" />
        <br />
        <strong>Forest 404</strong>
      </a>
      <br />
      <sub>Twilight rainforest</sub>
    </td>
  </tr>
</table>

> 🎞️ Thumbnails are 12-frame GIF loops captured live from the Astro demos. The `<img>` tags use absolute `raw.githubusercontent.com` URLs so they render on npmjs.com without relying on `repository.directory` resolution. Source files live in `apps/docs/public/og/<theme>.gif` in the repo.

## ✨ Features

- 🎨 Four animated templates — Space, Glitch, Ocean, Forest. All shipping today.
- ⚡ First-class React, Vue 3, and vanilla JS entry points with the same prop API.
- 🎯 TypeScript first — full type definitions for every component and prop.
- 📦 Tree-shakable subpath imports per framework.
- 🌐 SSR-safe — no `window` / `document` access at module load. Works with Next.js, Nuxt, Astro, Remix.
- 🌈 Tailwind powered, themeable via CSS variables and the exported `theme` tokens.
- ♿ Accessible by default — semantic headings, `prefers-reduced-motion` respected.

## 🚀 Install

```bash
npm install @kripa006/404-ui
# or: pnpm add / yarn add
```

Import the styles once at the entry of your app:

```ts
import "@kripa006/404-ui/styles.css";
```

## 🎨 Available templates

All four templates ship today across React, Vue, and Vanilla.

| Template       | Component / Factory             | Theme                                                                        |
| -------------- | ------------------------------- | ---------------------------------------------------------------------------- |
| **Space 404**  | `Space404` · `createSpace404`   | Apollo-era mission-control console with CRT phosphor, telemetry, easter eggs |
| **Glitch 404** | `Glitch404` · `createGlitch404` | Corrupted broadcast feed — chromatic aberration, sync-bar tear, NO SIGNAL    |
| **Ocean 404**  | `Ocean404` · `createOcean404`   | Bioluminescent deep-sea drift with bubbles, jellyfish, sonar ping            |
| **Forest 404** | `Forest404` · `createForest404` | Old-growth rainforest at twilight — drifting fog, fireflies, falling leaves  |

## 🧩 Per-template snippets

Each template has the same prop shape across React, Vue, and Vanilla. Expand a template to see all three.

<details>
<summary><strong>Space 404</strong> — Apollo-era mission control</summary>

#### React

```tsx
import { Space404 } from "@kripa006/404-ui/react";

export default function NotFound() {
  return (
    <Space404
      title="404"
      eyebrow="SIGNAL LOST · UPLINK DEGRADED"
      headline="OFF-NOMINAL TRAJECTORY DETECTED"
      subtitle="The page you requested drifted outside the nominal envelope."
      buttonText="RE-VECTOR TO BASE"
      missionId="APOLLO · LM-404"
      onButtonClick={() => (window.location.href = "/")}
    />
  );
}
```

#### Vue

```vue
<script setup>
import { Space404 } from "@kripa006/404-ui/vue";
</script>

<template>
  <Space404
    title="404"
    eyebrow="SIGNAL LOST · UPLINK DEGRADED"
    headline="OFF-NOMINAL TRAJECTORY DETECTED"
    subtitle="The page you requested drifted outside the nominal envelope."
    button-text="RE-VECTOR TO BASE"
    mission-id="APOLLO · LM-404"
    @button-click="$router.push('/')"
  />
</template>
```

#### Vanilla JS

```js
import { createSpace404 } from "@kripa006/404-ui/vanilla";

const space404 = createSpace404(document.getElementById("app"), {
  title: "404",
  headline: "OFF-NOMINAL TRAJECTORY DETECTED",
  subtitle: "The page you requested drifted outside the nominal envelope.",
  buttonText: "RE-VECTOR TO BASE",
  missionId: "APOLLO · LM-404",
  onButtonClick: () => (window.location.href = "/"),
});

// space404.destroy(); // call when unmounting
```

</details>

<details>
<summary><strong>Glitch 404</strong> — corrupted broadcast</summary>

#### React

```tsx
import { Glitch404 } from "@kripa006/404-ui/react";

export default function NotFound() {
  return (
    <Glitch404
      title="404"
      eyebrow="Transmission interrupted"
      headline="Page corrupted"
      subtitle="The signal carrying this page has been lost in transit."
      buttonText="Retune"
      channelId="04"
      onButtonClick={() => (window.location.href = "/")}
    />
  );
}
```

#### Vue

```vue
<script setup>
import { Glitch404 } from "@kripa006/404-ui/vue";
</script>

<template>
  <Glitch404
    title="404"
    eyebrow="Transmission interrupted"
    headline="Page corrupted"
    subtitle="The signal carrying this page has been lost in transit."
    button-text="Retune"
    channel-id="04"
    @button-click="$router.push('/')"
  />
</template>
```

#### Vanilla JS

```js
import { createGlitch404 } from "@kripa006/404-ui/vanilla";

const glitch404 = createGlitch404(document.getElementById("app"), {
  title: "404",
  eyebrow: "Transmission interrupted",
  headline: "Page corrupted",
  subtitle: "The signal carrying this page has been lost in transit.",
  buttonText: "Retune",
  channelId: "04",
  onButtonClick: () => (window.location.href = "/"),
});

// glitch404.destroy();
```

</details>

<details>
<summary><strong>Ocean 404</strong> — bioluminescent deep-sea drift</summary>

#### React

```tsx
import { Ocean404 } from "@kripa006/404-ui/react";

export default function NotFound() {
  return (
    <Ocean404
      title="404"
      eyebrow="Signal lost · 11,034m"
      subtitle="You've drifted too deep. The surface is waiting."
      buttonText="Return to surface"
      bubbleCount={28}
      onButtonClick={() => (window.location.href = "/")}
    />
  );
}
```

#### Vue

```vue
<script setup>
import { Ocean404 } from "@kripa006/404-ui/vue";
</script>

<template>
  <Ocean404
    title="404"
    eyebrow="Signal lost · 11,034m"
    subtitle="You've drifted too deep. The surface is waiting."
    button-text="Return to surface"
    :bubble-count="28"
    @button-click="$router.push('/')"
  />
</template>
```

#### Vanilla JS

```js
import { createOcean404 } from "@kripa006/404-ui/vanilla";

const ocean404 = createOcean404(document.getElementById("app"), {
  title: "404",
  eyebrow: "Signal lost · 11,034m",
  subtitle: "You've drifted too deep. The surface is waiting.",
  buttonText: "Return to surface",
  bubbleCount: 28,
  onButtonClick: () => (window.location.href = "/"),
});

// ocean404.destroy();
```

</details>

<details>
<summary><strong>Forest 404</strong> — old-growth rainforest at twilight</summary>

#### React

```tsx
import { Forest404 } from "@kripa006/404-ui/react";

export default function NotFound() {
  return (
    <Forest404
      title="404"
      eyebrow="Trail uncharted"
      headline="The path forks here."
      subtitle="You've wandered off the map. The grove is quiet — find your bearings and head back."
      buttonText="Find your bearings"
      coordinates="47°23′N · 122°02′W"
      onButtonClick={() => (window.location.href = "/")}
    />
  );
}
```

#### Vue

```vue
<script setup>
import { Forest404 } from "@kripa006/404-ui/vue";
</script>

<template>
  <Forest404
    title="404"
    eyebrow="Trail uncharted"
    headline="The path forks here."
    subtitle="You've wandered off the map. The grove is quiet — find your bearings and head back."
    button-text="Find your bearings"
    coordinates="47°23′N · 122°02′W"
    @button-click="$router.push('/')"
  />
</template>
```

#### Vanilla JS

```js
import { createForest404 } from "@kripa006/404-ui/vanilla";

const forest404 = createForest404(document.getElementById("app"), {
  title: "404",
  eyebrow: "Trail uncharted",
  headline: "The path forks here.",
  subtitle:
    "You've wandered off the map. The grove is quiet — find your bearings and head back.",
  buttonText: "Find your bearings",
  coordinates: "47°23′N · 122°02′W",
  onButtonClick: () => (window.location.href = "/"),
});

// forest404.destroy();
```

</details>

## Documentation

For full documentation, prop tables, theming, and the template gallery, visit [https://kripa-sindhu-007.github.io/404_lib](https://kripa-sindhu-007.github.io/404_lib).

## License

MIT
