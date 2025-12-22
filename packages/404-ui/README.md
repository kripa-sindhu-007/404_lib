# @kripa006/404-ui

Beautiful, animated 404 error pages for React, Vue, and Vanilla JS.

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

## Documentation

For full documentation and gallery, visit [https://kripa-sindhu-007.github.io/404_lib](https://kripa-sindhu-007.github.io/404_lib)

## License

MIT
