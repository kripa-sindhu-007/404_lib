# @kripa006/404-ui

## 0.1.1

### Patch Changes

- eb48d1f: Make the vanilla entry SSR-safe and refresh the package README.

  **SSR fix.** Each vanilla theme used to declare `export class
<Theme>404Element extends HTMLElement` at module top, which threw
  `HTMLElement is not defined` the moment the package was imported
  under Node — Next.js SSR, Nuxt SSG, Astro build, Remix server. The
  class now extends a `SafeHTMLElement` reference that resolves to the
  real `HTMLElement` in browsers and to a dummy class in Node. The class
  is still only ever instantiated by `customElements.define` inside the
  existing `typeof window !== "undefined"` guard, so behavior in the
  browser is unchanged.

  **README refresh.** The npm-rendered README now shows the live
  4-template gallery (Space, Glitch, Ocean, Forest), per-framework
  code snippets, and the bundle-size badge. The previous publish
  stored an empty README in the version metadata; this version sets
  it correctly.

## 0.1.0

### Minor Changes

- ac84e00: Add **Forest 404** — an old-growth temperate-rainforest 404 page (React, Vue, and Vanilla JS).

  A new theme alongside Apollo / Ocean / Glitch. Atmosphere: deep moss-and-pine canopy at twilight, drifting fog, swaying tree silhouettes, a brass ranger compass with a wobbling needle, pulsing fireflies, and falling birch leaves in mixed tints. The "404" is set in a layered serif (Fraunces / Caudex / Cormorant fallback) with a golden ember gradient that breathes.

  **Easter eggs**
  - Click any firefly to burst it
  - Type `MOSS` to trigger a 5-second spring-bloom palette swap
  - Konami code summons a fox padding across the forest floor
  - Idle ~18s reveals a luminous moth fluttering through the canopy

  **API**
  - React: `import { Forest404 } from '@kripa006/404-ui/react'`
  - Vue: `import { Forest404 } from '@kripa006/404-ui/vue'`
  - Vanilla: `import { createForest404 } from '@kripa006/404-ui/vanilla'` (also registers a `<forest-404>` web component)

  Props: `title`, `eyebrow`, `headline`, `subtitle`, `buttonText`, `onButtonClick`, `coordinates`, `fireflyCount`, `leafCount`, `showTreeline`, `showNote`.

  **Theme additions**
  - `forest.*` color palette (`pine`, `moss`, `bark`, `parchment`, `mist`, `ember`, `firefly`, `rust`)
  - New keyframes: `canopySway`, `fogDrift`, `fireflyPulse`, `leafFall`, `compassWobble`, `emberBreathe`, `foxTrot`, `mothFlutter`, `fireflyBurst`
  - New `grove` serif font stack on the theme preset

  **Helpers**
  - `generateFireflies(count)` and `generateLeaves(count)` exported from each framework entry for advanced layout overrides.

  **Fix:** restored Ocean 404 and Glitch 404 styles that had been silently broken by a CSS-nesting issue introduced in a prior merge — Tailwind nested every Ocean/Glitch rule inside `.space-404-rail-val`, so none of their selectors matched. Top-level CSS structure is now restored; both themes render correctly again.
