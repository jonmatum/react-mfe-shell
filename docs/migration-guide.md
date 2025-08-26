# Migration Guide

This guide helps you migrate to React MFE Shell v8.x with the new hybrid approach.

## Overview

Version 8.x introduces a hybrid Tailwind approach that provides multiple integration paths while maintaining full backward compatibility. **No breaking changes are required** for existing implementations.

## Migration Paths

### From v7.x to v8.x (Recommended)

**Current setup continues to work unchanged.** The hybrid approach adds new options without breaking existing functionality.

#### Option 1: Keep Current Setup (No Changes)

Your existing code continues to work:

```tsx
// This still works exactly the same
import { Button, Input } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/styles';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter text" />
    </div>
  );
}
```

#### Option 2: Upgrade to Zero-Config (Recommended for simplicity)

Switch to the standalone CSS bundle for easier maintenance:

```tsx
// Before
import '@jonmatum/react-mfe-shell/styles';

// After
import '@jonmatum/react-mfe-shell/standalone';
```

**Benefits**:
- No Tailwind configuration needed
- Smaller CSS bundle (12KB vs 38KB)
- Works in any environment
- Easier to maintain

#### Option 3: Upgrade to Tailwind Preset (Recommended for customization)

Add our Tailwind preset for enhanced design tokens:

```js
// tailwind.config.js - Before
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Your custom theme
    }
  }
}

// tailwind.config.js - After
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset], // Add this line
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js' // Add this line
  ],
  theme: {
    extend: {
      // Your custom theme extends our preset
    }
  }
}
```

**Benefits**:
- Enhanced design token integration
- Better Tailwind utility support
- Consistent theming across components
- Full customization capabilities

### From Other Component Libraries

#### From Material-UI (MUI)

**Component Mapping**:

```tsx
// Before (MUI)
import { Button, TextField, Chip } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained" color="primary">
        Click me
      </Button>
      <TextField label="Email" variant="outlined" />
      <Chip label="Active" color="success" />
    </ThemeProvider>
  );
}

// After (React MFE Shell)
import { Button, Input, Badge, SettingsProvider } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/standalone';

function App() {
  return (
    <SettingsProvider>
      <Button variant="primary">
        Click me
      </Button>
      <Input label="Email" placeholder="Enter email" />
      <Badge variant="success">Active</Badge>
    </SettingsProvider>
  );
}
```

**Key Differences**:
- `ThemeProvider` → `SettingsProvider`
- `TextField` → `Input` (with `label` prop)
- `Chip` → `Badge`
- `variant="contained"` → `variant="primary"`

#### From Chakra UI

```tsx
// Before (Chakra UI)
import { Button, Input, Tag, ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Button colorScheme="blue" size="md">
        Click me
      </Button>
      <Input placeholder="Enter email" />
      <Tag colorScheme="green">Active</Tag>
    </ChakraProvider>
  );
}

// After (React MFE Shell)
import { Button, Input, Badge, SettingsProvider } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/standalone';

function App() {
  return (
    <SettingsProvider>
      <Button variant="primary" size="md">
        Click me
      </Button>
      <Input placeholder="Enter email" />
      <Badge variant="success">Active</Badge>
    </SettingsProvider>
  );
}
```

#### From Ant Design

```tsx
// Before (Ant Design)
import { Button, Input, Tag } from 'antd';
import 'antd/dist/antd.css';

function App() {
  return (
    <div>
      <Button type="primary">Click me</Button>
      <Input placeholder="Enter email" />
      <Tag color="green">Active</Tag>
    </div>
  );
}

// After (React MFE Shell)
import { Button, Input, Badge, SettingsProvider } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/standalone';

function App() {
  return (
    <SettingsProvider>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Enter email" />
      <Badge variant="success">Active</Badge>
    </SettingsProvider>
  );
}
```

## Step-by-Step Migration

### Step 1: Install the Package

```bash
# Remove old component library (if applicable)
npm uninstall @mui/material @chakra-ui/react antd

# Install React MFE Shell
npm install @jonmatum/react-mfe-shell
```

### Step 2: Choose Integration Method

**For simple projects** (recommended):
```tsx
import '@jonmatum/react-mfe-shell/standalone';
```

**For Tailwind projects**:
```bash
npm install -D tailwindcss
```

```js
// tailwind.config.js
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js'
  ]
}
```

```tsx
import '@jonmatum/react-mfe-shell/styles';
```

### Step 3: Update Provider

```tsx
// Replace your existing provider
import { SettingsProvider } from '@jonmatum/react-mfe-shell';

function App() {
  return (
    <SettingsProvider>
      {/* Your app content */}
    </SettingsProvider>
  );
}
```

### Step 4: Update Component Imports

```tsx
// Before
import { Button, TextField, Chip } from '@mui/material';

// After
import { Button, Input, Badge } from '@jonmatum/react-mfe-shell';
```

### Step 5: Update Component Props

**Button Component**:
```tsx
// Before (MUI)
<Button variant="contained" color="primary" size="large">
  Click me
</Button>

// After
<Button variant="primary" size="lg">
  Click me
</Button>
```

**Input Component**:
```tsx
// Before (MUI)
<TextField 
  label="Email" 
  variant="outlined" 
  error={hasError}
  helperText="Enter your email"
/>

// After
<FormField label="Email" error={error} description="Enter your email">
  <Input type="email" />
</FormField>
```

**Badge/Tag Component**:
```tsx
// Before (MUI)
<Chip label="Active" color="success" variant="filled" />

// After
<Badge variant="success">Active</Badge>
```

### Step 6: Update Theming

**CSS Custom Properties** (works with both integration methods):
```css
:root {
  /* Override default theme colors */
  --color-primary-600: 37 99 235;
  --color-success-600: 22 163 74;
  --color-warning-600: 217 119 6;
  --color-danger-600: 220 38 38;
}

.dark {
  /* Dark theme overrides */
  --color-primary-600: 59 130 246;
  --color-background-primary: 17 24 39;
  --color-text-primary: 243 244 246;
}
```

**Programmatic Theme Management**:
```tsx
import { useSettings } from '@jonmatum/react-mfe-shell';

function ThemeToggle() {
  const { settings, updateSettings } = useSettings();
  
  const toggleTheme = () => {
    updateSettings({ 
      theme: settings.theme === 'dark' ? 'light' : 'dark' 
    });
  };
  
  return (
    <Button onClick={toggleTheme}>
      Toggle Theme
    </Button>
  );
}
```

## Common Migration Patterns

### Form Handling

**Before** (various libraries):
```tsx
// MUI example
<form>
  <TextField label="Name" required />
  <TextField label="Email" type="email" required />
  <Button type="submit" variant="contained">Submit</Button>
</form>
```

**After**:
```tsx
import { FormField, Input, Button } from '@jonmatum/react-mfe-shell';

<form>
  <FormField label="Name" required>
    <Input />
  </FormField>
  <FormField label="Email" required>
    <Input type="email" />
  </FormField>
  <Button type="submit" variant="primary">Submit</Button>
</form>
```

### Modal/Dialog Handling

**Before**:
```tsx
// MUI example
<Dialog open={isOpen} onClose={handleClose}>
  <DialogTitle>Confirm Action</DialogTitle>
  <DialogContent>
    <DialogContentText>Are you sure?</DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleConfirm}>Confirm</Button>
  </DialogActions>
</Dialog>
```

**After**:
```tsx
import { Modal, Button } from '@jonmatum/react-mfe-shell';

<Modal isOpen={isOpen} onClose={handleClose} title="Confirm Action">
  <p>Are you sure?</p>
  <div className="flex gap-2 mt-4">
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
    <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
  </div>
</Modal>
```

### Loading States

**Before**:
```tsx
// MUI example
<Button disabled={loading}>
  {loading ? <CircularProgress size={20} /> : 'Submit'}
</Button>
```

**After**:
```tsx
import { Button } from '@jonmatum/react-mfe-shell';

<Button loading={loading}>Submit</Button>
```

## Breaking Changes (None!)

Version 8.x maintains full backward compatibility. There are **no breaking changes** from v7.x.

**What's New** (all additive):
- Zero-config CSS bundle option
- Tailwind preset for enhanced integration
- CSS-in-JS runtime styling option
- Improved build process with dynamic CSS generation
- Enhanced documentation and examples

## Performance Improvements

### Bundle Size Optimization

**Before v8.x**:
- CSS: 38KB (static copy)
- Limited tree shaking

**After v8.x**:
- Standalone CSS: 12KB (optimized)
- Tailwind CSS: 38KB (fully processed)
- Better tree shaking
- Multiple integration options

### Runtime Performance

- **Faster theme switching**: Improved CSS custom property handling
- **Better caching**: Enhanced localStorage management
- **Reduced re-renders**: Optimized context providers

## Troubleshooting Migration

### Styles Not Loading

**Issue**: Components appear unstyled after migration

**Solution**:
```tsx
// Make sure to import styles
import '@jonmatum/react-mfe-shell/standalone'; // or
import '@jonmatum/react-mfe-shell/styles';
```

### TypeScript Errors

**Issue**: Type errors after updating imports

**Solution**:
```bash
# Update type dependencies
npm install --save-dev @types/react @types/react-dom

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### Theme Not Working

**Issue**: Theme colors not applying

**Solution**:
```tsx
// Wrap app with SettingsProvider
import { SettingsProvider } from '@jonmatum/react-mfe-shell';

<SettingsProvider>
  <App />
</SettingsProvider>
```

## Migration Checklist

- [ ] Install `@jonmatum/react-mfe-shell`
- [ ] Choose integration method (standalone or Tailwind)
- [ ] Update CSS imports
- [ ] Replace component library provider with `SettingsProvider`
- [ ] Update component imports
- [ ] Update component props to match new API
- [ ] Test theme switching functionality
- [ ] Update custom styling (CSS custom properties)
- [ ] Test responsive behavior
- [ ] Update TypeScript types if needed
- [ ] Test accessibility features
- [ ] Update documentation/comments

## Getting Help

If you encounter issues during migration:

1. **Check the troubleshooting guide**: [Troubleshooting](./troubleshooting.md)
2. **Review integration examples**: [Integration Guide](./integration-guide.md)
3. **Compare with demo**: [Live Demo](https://jonmatum.github.io/react-mfe-shell/)
4. **Ask for help**: [GitHub Issues](https://github.com/jonmatum/react-mfe-shell/issues)

## Next Steps

After migration:

1. **Explore new features**: Check out the enhanced theming system
2. **Optimize bundle size**: Use tree shaking and dynamic imports
3. **Customize design tokens**: Override CSS custom properties
4. **Add accessibility features**: Leverage built-in ARIA support
5. **Contribute back**: Share your migration experience
