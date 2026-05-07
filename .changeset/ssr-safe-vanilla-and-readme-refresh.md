---
"@kripa006/404-ui": patch
---

Make the vanilla entry SSR-safe and refresh the package README.

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
