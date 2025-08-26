# Troubleshooting Guide

Common issues and solutions when using React MFE Shell.

## Installation Issues

### Package Not Found

**Problem**: `npm install @jonmatum/react-mfe-shell` fails

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Try with specific registry
npm install @jonmatum/react-mfe-shell --registry https://registry.npmjs.org/

# Check npm version (requires Node 18+)
node --version
npm --version
```

### Peer Dependency Warnings

**Problem**: Warnings about React version compatibility

**Solution**:
```bash
# Install required peer dependencies
npm install react@^18.0.0 react-dom@^18.0.0

# Or with specific versions
npm install react@18.2.0 react-dom@18.2.0
```

## Styling Issues

### Styles Not Loading

**Problem**: Components appear unstyled

**Solutions**:

For Zero-Config setup:
```tsx
// Make sure to import standalone styles
import '@jonmatum/react-mfe-shell/standalone';
```

For Tailwind setup:
```tsx
// Import Tailwind styles
import '@jonmatum/react-mfe-shell/styles';

// And ensure Tailwind config includes our preset
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');
module.exports = {
  presets: [mfeShellPreset],
  // ...
}
```

### CSS Custom Properties Not Working

**Problem**: Theme colors not applying

**Solution**:
```css
/* Ensure CSS custom properties are supported */
:root {
  --color-primary-600: 37 99 235; /* Space-separated RGB values */
}

/* Check browser support */
.fallback {
  background-color: #2563eb; /* Fallback for older browsers */
  background-color: rgb(var(--color-primary-600)); /* Modern browsers */
}
```

### Tailwind Classes Not Working

**Problem**: Tailwind utilities not applying to components

**Solutions**:

1. **Check content configuration**:
```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Include our components
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js'
  ],
  // ...
}
```

2. **Verify preset is loaded**:
```js
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset], // Must be first
  // Your config extends the preset
}
```

3. **Check build process**:
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

## Component Issues

### Theme Not Persisting

**Problem**: Theme resets on page reload

**Solution**:
```tsx
// Wrap your entire app with SettingsProvider
import { SettingsProvider } from '@jonmatum/react-mfe-shell';

function App() {
  return (
    <SettingsProvider>
      {/* Your app content */}
    </SettingsProvider>
  );
}

// Theme is automatically persisted to localStorage
```

### Form Validation Not Working

**Problem**: Form fields don't show validation errors

**Solution**:
```tsx
import { FormField, Input } from '@jonmatum/react-mfe-shell';

function MyForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
    return '';
  };

  return (
    <FormField 
      label="Email" 
      error={error} // Pass error to FormField
      required
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(validateEmail(e.target.value));
        }}
      />
    </FormField>
  );
}
```

### Modal Not Closing

**Problem**: Modal remains open after clicking backdrop

**Solution**:
```tsx
import { Modal } from '@jonmatum/react-mfe-shell';

function MyModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)} // Required for backdrop clicks
      title="My Modal"
    >
      <p>Modal content</p>
    </Modal>
  );
}
```

## TypeScript Issues

### Type Errors

**Problem**: TypeScript compilation errors

**Solutions**:

1. **Install type dependencies**:
```bash
npm install --save-dev @types/react @types/react-dom
```

2. **Update tsconfig.json**:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true
  }
}
```

3. **Import types explicitly**:
```tsx
import type { ButtonProps, InputProps } from '@jonmatum/react-mfe-shell';
```

### Missing Type Definitions

**Problem**: `Cannot find module` errors

**Solution**:
```tsx
// Create types/react-mfe-shell.d.ts
declare module '@jonmatum/react-mfe-shell' {
  export * from '@jonmatum/react-mfe-shell/dist/index';
}

declare module '@jonmatum/react-mfe-shell/standalone' {
  const content: string;
  export default content;
}
```

## Build Issues

### Bundle Size Too Large

**Problem**: Bundle includes unused components

**Solutions**:

1. **Use tree shaking**:
```tsx
// Good - only imports what you need
import { Button, Input } from '@jonmatum/react-mfe-shell';

// Bad - imports everything
import * as MFEShell from '@jonmatum/react-mfe-shell';
```

2. **Analyze bundle**:
```bash
# Use webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

3. **Dynamic imports for large components**:
```tsx
// Lazy load heavy components
const Modal = lazy(() => import('@jonmatum/react-mfe-shell').then(m => ({ default: m.Modal })));
```

### CSS Not Minified

**Problem**: CSS bundle is too large in production

**Solution**:
```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: 'default',
      },
    }),
  },
}
```

## Performance Issues

### Slow Initial Load

**Solutions**:

1. **Code splitting**:
```tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

2. **Preload critical CSS**:
```html
<link rel="preload" href="/path/to/mfe-shell.css" as="style">
```

### Memory Leaks

**Problem**: Components not cleaning up properly

**Solution**:
```tsx
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    const cleanup = () => {
      // Clean up event listeners, timers, etc.
    };
    
    return cleanup; // Always return cleanup function
  }, []);
}
```

## Browser Compatibility

### Internet Explorer Support

**Problem**: Components not working in IE11

**Solution**:
```js
// Add polyfills for IE11
npm install --save core-js

// In your entry file
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

### Safari Issues

**Problem**: CSS custom properties not working in older Safari

**Solution**:
```css
/* Provide fallbacks */
.button {
  background-color: #2563eb; /* Fallback */
  background-color: rgb(var(--color-primary-600)); /* Modern */
}
```

## Development Issues

### Hot Reload Not Working

**Problem**: Changes not reflecting during development

**Solutions**:

1. **Check file watching**:
```js
// vite.config.js
export default {
  server: {
    watch: {
      usePolling: true, // For Docker/WSL
    }
  }
}
```

2. **Clear cache**:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Clear Next.js cache
rm -rf .next
```

### Source Maps Missing

**Problem**: Can't debug component source code

**Solution**:
```js
// webpack.config.js
module.exports = {
  devtool: 'source-map', // Enable source maps
}

// vite.config.js
export default {
  build: {
    sourcemap: true,
  }
}
```

## Getting Help

If you're still experiencing issues:

1. **Check the documentation**: [Integration Guide](./integration-guide.md)
2. **Search existing issues**: [GitHub Issues](https://github.com/jonmatum/react-mfe-shell/issues)
3. **Create a minimal reproduction**: Use [CodeSandbox](https://codesandbox.io)
4. **Report the issue**: Include:
   - React MFE Shell version
   - React version
   - Build tool (Vite, Webpack, etc.)
   - Minimal code example
   - Error messages
   - Browser/Node.js version

## Common Error Messages

### `Cannot resolve module '@jonmatum/react-mfe-shell/standalone'`

**Cause**: Package not properly installed or wrong import path

**Fix**:
```bash
npm install @jonmatum/react-mfe-shell
```

### `ReferenceError: regeneratorRuntime is not defined`

**Cause**: Missing async/await polyfill

**Fix**:
```bash
npm install --save regenerator-runtime
```

### `TypeError: Cannot read property 'theme' of undefined`

**Cause**: Missing SettingsProvider

**Fix**:
```tsx
import { SettingsProvider } from '@jonmatum/react-mfe-shell';

<SettingsProvider>
  <App />
</SettingsProvider>
```
