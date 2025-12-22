# @404-ui/core

Beautiful, animated 404 error pages for React, Vue, and Vanilla JS.

## Installation

```bash
npm install @404-ui/core
```

## Usage

### React

```tsx
import { Space404 } from '@404-ui/core/react';

<Space404 onButtonClick={() => navigate('/')} />
```

### Vue

```vue
<script setup>
import { Space404 } from '@404-ui/core/vue';
</script>

<template>
  <Space404 @button-click="$router.push('/')" />
</template>
```

### Vanilla JS

```js
import { createSpace404 } from '@404-ui/core/vanilla';

createSpace404(document.getElementById('app'), {
  onButtonClick: () => window.location.href = '/'
});
```

## Documentation

For full documentation, visit [https://kripa-sindhu-007.github.io/404_lib](https://kripa-sindhu-007.github.io/404_lib)

## License

MIT
