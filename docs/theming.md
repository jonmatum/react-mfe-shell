# Theming Guide

Learn how to customize React MFE Shell with your own colors, fonts, and design tokens while maintaining the component library's functionality.

## Overview

React MFE Shell provides flexible theming options that allow you to:
- Use your own brand colors and design tokens
- Extend our Tailwind preset with custom themes
- Override design tokens via CSS custom properties
- Create completely custom themes while keeping component functionality

## Quick Start: Custom Brand Colors

### Method 1: Extend the Preset (Recommended)

Use our preset as a foundation and add your custom theme on top:

```js
// tailwind.config.js
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset], // Use our preset as foundation
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js'
  ],
  theme: {
    extend: {
      // Your custom colors - these will be added to our preset
      colors: {
        // Brand colors
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Your primary brand color
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Custom accent colors
        accent: {
          purple: '#8b5cf6',
          pink: '#ec4899',
          orange: '#f97316',
        },
        // Override our semantic colors if needed
        primary: {
          // This will override our primary colors
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Your custom primary
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      // Custom fonts
      fontFamily: {
        'brand': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'system-ui', 'sans-serif'],
      },
      // Custom shadows
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(14, 165, 233, 0.15)',
        'brand-lg': '0 10px 25px 0 rgba(14, 165, 233, 0.2)',
      }
    }
  }
}
```

### Method 2: CSS Custom Properties Override

Override our design tokens with your custom colors using CSS custom properties:

```css
/* src/styles/theme.css */
:root {
  /* Override our primary colors with your brand colors */
  --color-primary-50: 240 249 255;
  --color-primary-100: 224 242 254;
  --color-primary-200: 186 230 253;
  --color-primary-300: 125 211 252;
  --color-primary-400: 56 189 248;
  --color-primary-500: 14 165 233;  /* Your brand primary */
  --color-primary-600: 2 132 199;
  --color-primary-700: 3 105 161;
  --color-primary-800: 7 89 133;
  --color-primary-900: 12 74 110;
  
  /* Add your custom brand colors */
  --color-brand-500: 14 165 233;
  --color-accent-purple: 139 92 246;
  --color-accent-pink: 236 72 153;
  
  /* Override semantic colors */
  --color-success-600: 34 197 94;  /* Your custom success color */
  --color-warning-600: 245 158 11; /* Your custom warning color */
  --color-danger-600: 239 68 68;   /* Your custom danger color */
}

.dark {
  /* Dark theme overrides */
  --color-primary-500: 56 189 248;
  --color-primary-600: 14 165 233;
  --color-background-primary: 17 24 39;
  --color-text-primary: 243 244 246;
  /* ... your dark theme colors */
}
```

Then import this in your app:

```tsx
// src/App.tsx
import { SettingsProvider } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/styles';
import './styles/theme.css'; // Your custom theme

function App() {
  return (
    <SettingsProvider>
      {/* Your app */}
    </SettingsProvider>
  );
}
```

## Complete Examples

### Example 1: SaaS Application Theme

```js
// tailwind.config.js - SaaS App with Blue Brand
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Your SaaS brand colors
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Your primary brand color
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Override our primary to match your brand
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Same as brand-500
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        // Custom accent colors for your app
        accent: {
          emerald: '#10b981',
          purple: '#8b5cf6',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      }
    }
  }
}
```

```tsx
// src/App.tsx - SaaS App Implementation
import { 
  SettingsProvider, 
  Button, 
  FormField, 
  Input, 
  Badge,
  useSettings 
} from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/styles';

function ThemeToggle() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <Button
      variant="ghost"
      onClick={() => updateSettings({ 
        theme: settings.theme === 'dark' ? 'light' : 'dark' 
      })}
      className="text-brand-600 hover:bg-brand-50 dark:text-brand-400 dark:hover:bg-brand-900/20"
    >
      {settings.theme === 'dark' ? '☀️' : '🌙'}
    </Button>
  );
}

function App() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-display font-bold text-brand-600">
                My SaaS App
              </h1>
              <div className="flex items-center gap-4">
                <Badge variant="success" className="bg-accent-emerald text-white">
                  Pro Plan
                </Badge>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
              Company Settings
            </h2>
            
            <div className="space-y-6">
              <FormField label="Company Name" required>
                <Input 
                  placeholder="Enter your company name"
                  className="border-brand-200 focus:border-brand-500 focus:ring-brand-500"
                />
              </FormField>
              
              <FormField label="Website URL">
                <Input 
                  type="url"
                  placeholder="https://yourcompany.com"
                  className="border-brand-200 focus:border-brand-500 focus:ring-brand-500"
                />
              </FormField>
            </div>
            
            <div className="mt-8 flex gap-3">
              <Button 
                variant="primary" 
                className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500"
              >
                Save Changes
              </Button>
              <Button 
                variant="secondary"
                className="border-brand-200 text-brand-600 hover:bg-brand-50 dark:border-brand-700 dark:text-brand-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </main>
      </div>
    </SettingsProvider>
  );
}
```

### Example 2: E-commerce Theme

```js
// tailwind.config.js - E-commerce with Purple Brand
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // E-commerce brand colors
        brand: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7', // Purple brand color
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Override primary with brand colors
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        // E-commerce specific colors
        sale: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
        rating: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        }
      }
    }
  }
}
```

### Example 3: Fintech Application

```js
// tailwind.config.js - Fintech with Green Brand
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Fintech brand colors
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e', // Green brand color
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Fintech specific colors
        profit: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        loss: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        }
      }
    }
  }
}
```

## Advanced Theming Techniques

### Method 3: Complete Custom Theme

Create a completely custom theme while still using our components:

```js
// tailwind.config.js
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js'
  ],
  theme: {
    // Completely override the theme
    colors: {
      // Keep our semantic structure but use your colors
      primary: {
        50: '#fef7ff',
        100: '#fdeeff',
        200: '#f9ddff',
        300: '#f3bbff',
        400: '#ea89ff',
        500: '#d946ef', // Your primary color
        600: '#c026d3',
        700: '#a21caf',
        800: '#86198f',
        900: '#701a75',
      },
      secondary: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      danger: {
        50: '#fef2f2',
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      // Add your brand colors
      brand: {
        // Your brand color scale
      },
      // Keep utility colors
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
    },
    extend: {
      // Additional customizations
    }
  }
}
```

## Using Your Colors with Components

Once you've set up your custom theme, you can use your colors in several ways:

### 1. Through Tailwind Classes
```tsx
// Use your custom brand colors
<Button className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500">
  Brand Button
</Button>

// Use your accent colors
<div className="bg-accent-purple text-white p-4 rounded-lg">
  Purple accent section
</div>

// Use custom semantic colors
<Badge className="bg-profit-500 text-white">
  +$1,234.56
</Badge>
```

### 2. Override Component Variants
```tsx
// Components will automatically use your overridden primary colors
<Button variant="primary">Uses your custom primary color</Button>
<Badge variant="primary">Uses your custom primary color</Badge>
<Input className="focus:border-primary-500 focus:ring-primary-500" />
```

### 3. CSS Custom Properties
```css
/* You can also use CSS custom properties directly */
.my-custom-element {
  background-color: rgb(var(--color-brand-600));
  color: rgb(var(--color-accent-purple));
  border-color: rgb(var(--color-primary-300));
}

/* Create custom component variants */
.button-brand {
  background-color: rgb(var(--color-brand-600));
  color: white;
}

.button-brand:hover {
  background-color: rgb(var(--color-brand-700));
}
```

## Dark Mode Support

Ensure your custom colors work well in dark mode:

```css
/* src/styles/theme.css */
:root {
  /* Light theme colors */
  --color-brand-50: 240 249 255;
  --color-brand-500: 14 165 233;
  --color-brand-600: 2 132 199;
  --color-brand-900: 12 74 110;
}

.dark {
  /* Dark theme adjustments */
  --color-brand-50: 12 74 110;    /* Darker in dark mode */
  --color-brand-500: 56 189 248;  /* Lighter in dark mode */
  --color-brand-600: 14 165 233;  /* Lighter in dark mode */
  --color-brand-900: 240 249 255; /* Much lighter in dark mode */
}
```

```tsx
// Components that work well in both themes
<Button className="bg-brand-600 hover:bg-brand-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600">
  Theme-aware Button
</Button>

<div className="bg-brand-50 text-brand-900 dark:bg-brand-900 dark:text-brand-50 p-4">
  Theme-aware container
</div>
```

## Typography Customization

Customize fonts to match your brand:

```js
// tailwind.config.js
module.exports = {
  presets: [mfeShellPreset],
  theme: {
    extend: {
      fontFamily: {
        // Override default sans font
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Add custom font families
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        brand: ['Montserrat', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Add custom font sizes
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      }
    }
  }
}
```

```tsx
// Use custom fonts in components
<h1 className="font-display text-4xl font-bold text-brand-900">
  Brand Heading
</h1>

<p className="font-sans text-base text-gray-700">
  Body text with custom font
</p>

<code className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
  Code snippet
</code>
```

## Best Practices

### 1. Maintain Semantic Structure
```js
// Good - Keep semantic meaning
colors: {
  primary: { /* your brand colors */ },
  success: { /* your success colors */ },
  warning: { /* your warning colors */ },
  danger: { /* your danger colors */ },
}

// Avoid - Don't use arbitrary names for semantic colors
colors: {
  blue: { /* should be primary */ },
  red: { /* should be danger */ },
}
```

### 2. Ensure Accessibility
```js
// Ensure sufficient contrast ratios
colors: {
  primary: {
    50: '#f0f9ff',   // Very light - good for backgrounds
    500: '#3b82f6',  // Medium - good for interactive elements
    600: '#2563eb',  // Darker - good for hover states
    900: '#1e3a8a',  // Very dark - good for text on light backgrounds
  }
}
```

### 3. Test Both Themes
```tsx
// Always test your colors in both light and dark modes
function TestComponent() {
  return (
    <div className="bg-brand-50 dark:bg-brand-900 p-4">
      <h2 className="text-brand-900 dark:text-brand-50">
        Heading that works in both themes
      </h2>
      <Button className="bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600">
        Theme-aware button
      </Button>
    </div>
  );
}
```

### 4. Document Your Theme
```js
// Document your color choices
const theme = {
  colors: {
    // Brand colors - used for primary actions and branding
    brand: {
      500: '#3b82f6', // Primary brand color
      600: '#2563eb', // Hover state for primary actions
    },
    // Semantic colors - used for status and feedback
    success: {
      500: '#22c55e', // Success messages and positive actions
    },
    warning: {
      500: '#f59e0b', // Warning messages and caution states
    },
    danger: {
      500: '#ef4444', // Error messages and destructive actions
    }
  }
}
```

### 5. Use Consistent Scales
```js
// Follow the 50-900 scale pattern
colors: {
  brand: {
    50: '#f0f9ff',   // Lightest
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Base color
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',  // Darkest
  }
}
```

## Troubleshooting

### Colors Not Applying
```tsx
// Make sure to import styles
import '@jonmatum/react-mfe-shell/styles';

// Ensure Tailwind config includes our content
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js' // Important!
]
```

### Dark Mode Not Working
```tsx
// Wrap your app with SettingsProvider
import { SettingsProvider } from '@jonmatum/react-mfe-shell';

<SettingsProvider>
  <App />
</SettingsProvider>
```

### CSS Custom Properties Not Working
```css
/* Use space-separated RGB values, not hex */
:root {
  --color-brand-600: 37 99 235; /* Correct */
  --color-brand-600: #2563eb;   /* Incorrect */
}
```

## Next Steps

- Explore [component customization](./components.md)
- Learn about [advanced patterns](./advanced-patterns.md)
- Check out the [integration guide](./integration-guide.md)
- See [troubleshooting](./troubleshooting.md) for common issues
