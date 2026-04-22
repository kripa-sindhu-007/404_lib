# @kripa006/404-ui

Open-source animated 404 error page components for React, Vue, and vanilla JavaScript.

## 🚀 How to Use in 3 Steps

### Step 1: Install the package

```bash
npm install @kripa006/404-ui
```

### Step 2: Import the component

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

#### React Example

```tsx
<Space404
  title="404"
  subtitle="Page not found"
  buttonText="Go Home"
  onButtonClick={() => (window.location.href = "/")}
/>
```

#### Vue Example

```vue
<Space404
  title="404"
  subtitle="Page not found"
  buttonText="Go Home"
  @button-click="$router.push('/')"
/>
```

#### Vanilla JS Example

```js
createSpace404(document.getElementById("app"), {
  title: "404",
  subtitle: "Page not found",
  buttonText: "Go Home",
  onButtonClick: () => (window.location.href = "/"),
});
```

## Available templates

| Template   | Import                                                                                            | Theme                                                   |
| ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `Space404` | `@kripa006/404-ui/react` · `@kripa006/404-ui/vue` · `@kripa006/404-ui/vanilla` (`createSpace404`) | Apollo-era mission-control console with CRT phosphor UI |
| `Ocean404` | `@kripa006/404-ui/react` · `@kripa006/404-ui/vue` · `@kripa006/404-ui/vanilla` (`createOcean404`) | Bioluminescent deep sea with easter eggs                |

Both templates hide a few small touches worth finding in the gallery:

- `Space404` — click the off-nominal spacecraft on the orbital diagnostic
  for a morse burst; type `APOLLO` to launch a rocket; hold `Shift` to
  intensify the CRT; leave the page idle to see a private log line.
- `Ocean404` — click any bubble to pop it; the Konami code summons a
  submarine; an anglerfish drifts past after ~18 s of idle time; a looping
  depth HUD ticks through trench depths.

## Documentation

For full documentation, examples, and the template gallery, visit [https://kripa-sindhu-007.github.io/404_lib](https://kripa-sindhu-007.github.io/404_lib).

## License

MIT
