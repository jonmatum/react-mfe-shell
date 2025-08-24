# Design Token System

This document provides comprehensive documentation for the React MFE Shell design token system.

## Overview

The design token system serves as the single source of truth for all design values in the React MFE Shell. It provides:

- **Type-safe tokens** with comprehensive TypeScript definitions
- **Theme-aware colors** supporting light/dark/system modes
- **Tailwind CSS integration** for seamless utility class generation
- **CSS custom properties** for runtime theme switching
- **Accessibility compliance** with WCAG AA contrast ratios

## Token Categories

### Colors

#### Base Colors
```typescript
import { baseColors } from '@jonmatum/react-mfe-shell';

// Usage
baseColors.blue[500]    // #3b82f6
baseColors.gray[900]    // #111827
baseColors.white        // #ffffff
```

#### Semantic Colors
```typescript
import { semanticColors } from '@jonmatum/react-mfe-shell';

// Usage
semanticColors.primary[600]   // Primary brand color
semanticColors.success[500]   // Success state color
semanticColors.error[600]     // Error state color
```

#### Theme Colors
```typescript
import { themeColors } from '@jonmatum/react-mfe-shell';

// Light theme colors
themeColors.light.text.primary        // #111827
themeColors.light.background.primary  // #ffffff

// Dark theme colors
themeColors.dark.text.primary         // #f3f4f6
themeColors.dark.background.primary   // #111827
```

### Typography

```typescript
import { fontFamily, fontSize, fontWeight } from '@jonmatum/react-mfe-shell';

// Font families
fontFamily.sans  // ['Inter', '-apple-system', ...]
fontFamily.mono  // ['"JetBrains Mono"', 'Menlo', ...]

// Font sizes with line heights
fontSize.base    // ['1rem', { lineHeight: '1.5rem' }]
fontSize.lg      // ['1.125rem', { lineHeight: '1.75rem' }]

// Font weights
fontWeight.normal    // '400'
fontWeight.medium    // '500'
fontWeight.semibold  // '600'
```

### Spacing

```typescript
import { spacing } from '@jonmatum/react-mfe-shell';

// Consistent spacing scale
spacing[0]   // '0px'
spacing[1]   // '0.25rem'  (4px)
spacing[4]   // '1rem'     (16px)
spacing[8]   // '2rem'     (32px)
```

### Shadows

```typescript
import { boxShadow, dropShadow } from '@jonmatum/react-mfe-shell';

// Box shadows for elevation
boxShadow.sm    // Subtle shadow
boxShadow.md    // Medium shadow
boxShadow.lg    // Large shadow

// Drop shadows for filters
dropShadow.sm   // Subtle drop shadow
dropShadow.md   // Medium drop shadow
```

## Usage Examples

### With Tailwind CSS

The design tokens are automatically integrated with Tailwind CSS:

```tsx
// Using semantic colors
<div className="bg-primary-500 text-white">Primary Button</div>

// Using theme-aware colors
<div className="bg-background-primary text-text-primary">
  Adapts to light/dark theme
</div>

// Using spacing
<div className="p-4 m-8">Consistent spacing</div>

// Using typography
<h1 className="text-2xl font-semibold">Consistent typography</h1>
```

### With CSS Custom Properties

```css
.my-component {
  background-color: var(--color-surface-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--component-border-radius);
  box-shadow: var(--shadow-sm);
}
```

### With JavaScript/TypeScript

```typescript
import { tokens, getThemeColor } from '@jonmatum/react-mfe-shell';

// Access complete token system
const primaryColor = tokens.colors.semantic.primary[500];
const baseSpacing = tokens.spacing[4];

// Get theme-aware colors
const textColor = getThemeColor('text.primary', 'dark');
```

## Theme Management

### Setting Up Themes

```typescript
import { setupThemeManagement } from '@jonmatum/react-mfe-shell';

const { setTheme, cleanup } = setupThemeManagement((mode, resolvedTheme) => {
  console.log(`Theme changed to ${mode} (resolved: ${resolvedTheme})`);
});

// Change theme
setTheme('dark');    // Switch to dark mode
setTheme('light');   // Switch to light mode
setTheme('system');  // Follow system preference

// Cleanup when component unmounts
cleanup();
```

### Theme-Aware Components

```tsx
import { useSettings } from '@jonmatum/react-mfe-shell';

function MyComponent() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <button
      className="bg-interactive-primary hover:bg-interactive-primary-hover"
      onClick={() => updateSettings({ 
        theme: settings.theme === 'light' ? 'dark' : 'light' 
      })}
    >
      Toggle Theme
    </button>
  );
}
```

## Accessibility

All color tokens meet WCAG AA accessibility standards:

- **Contrast ratios**: Text colors provide sufficient contrast against background colors
- **Focus indicators**: Focus colors are clearly visible in both light and dark themes
- **High contrast support**: Tokens adapt to system high contrast preferences
- **Reduced motion**: Animation tokens respect user motion preferences

## Best Practices

### 1. Use Semantic Colors
```typescript
// ✅ Good - semantic meaning
className="text-status-error"

// ❌ Avoid - specific color values
className="text-red-600"
```

### 2. Use Theme-Aware Colors
```typescript
// ✅ Good - adapts to theme
className="bg-surface-primary text-text-primary"

// ❌ Avoid - fixed colors
className="bg-white text-black"
```

### 3. Use Consistent Spacing
```typescript
// ✅ Good - design system spacing
className="p-4 m-8"

// ❌ Avoid - arbitrary values
className="p-[17px] m-[33px]"
```

### 4. Leverage TypeScript
```typescript
// ✅ Good - type-safe token access
import type { ColorScaleKey } from '@jonmatum/react-mfe-shell';

function getColorShade(shade: ColorScaleKey) {
  return tokens.colors.base.blue[shade];
}
```

## Extending Tokens

To add new tokens, follow the established patterns:

```typescript
// Add to tokens.ts
export const customTokens = {
  animation: {
    bounce: 'bounce 1s infinite',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
} as const;

// Add TypeScript types
export interface CustomTokens {
  animation: {
    bounce: string;
  };
  gradients: {
    primary: string;
  };
}
```

## Migration Guide

### From Legacy Tokens

If migrating from the previous token system:

```typescript
// Old
import { colors } from '@jonmatum/react-mfe-shell';
colors.primary[500]

// New
import { semanticColors } from '@jonmatum/react-mfe-shell';
semanticColors.primary[500]
```

### Updating Components

```tsx
// Old approach
<div className="bg-blue-600 text-white">

// New approach
<div className="bg-primary-600 text-text-inverse">
```

## Performance

The design token system is optimized for performance:

- **Tree-shaking**: Only imported tokens are included in the bundle
- **CSS custom properties**: Enable runtime theme switching without JavaScript
- **Minimal runtime**: Theme utilities have minimal performance impact
- **Build-time optimization**: Tailwind CSS purges unused styles

## Browser Support

- **Modern browsers**: Full support for CSS custom properties
- **Legacy browsers**: Graceful fallbacks for older browsers
- **SSR compatible**: Works with server-side rendering
- **Mobile optimized**: Responsive design tokens for all screen sizes
