# React MFE Shell

A production-ready micro frontend shell with comprehensive design system, form molecules, and accessibility-first components.

## Integration Options

Choose the integration method that best fits your project:

### Option 1: Zero-Config (Recommended for quick start)

```bash
npm install @jonmatum/react-mfe-shell
```

```tsx
import { 
  SettingsProvider, 
  Button, 
  FormField, 
  Input 
} from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/standalone';

function App() {
  return (
    <SettingsProvider>
      <FormField label="Email" required>
        <Input type="email" placeholder="Enter email" />
      </FormField>
      <Button variant="primary">Submit</Button>
    </SettingsProvider>
  );
}
```

### Option 2: Tailwind Integration (Recommended for Tailwind users)

```bash
npm install @jonmatum/react-mfe-shell
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
import { 
  SettingsProvider, 
  Button, 
  FormField, 
  Input 
} from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/styles';

function App() {
  return (
    <SettingsProvider>
      <div className="p-4 space-y-4">
        <FormField label="Email" required>
          <Input type="email" placeholder="Enter email" className="border-2" />
        </FormField>
        <Button variant="primary" className="w-full">Submit</Button>
      </div>
    </SettingsProvider>
  );
}
```

## What's Included

### Core Components (10)
- **Button**: All variants, sizes, states, and icons
- **Input**: Text inputs with validation and icons
- **Badge**: Status indicators with removable option
- **Avatar**: User avatars with fallbacks
- **Card**: Content containers with consistent styling
- **Modal**: Accessible overlays with focus management
- **Switch**: Toggle controls with theme integration
- **Text**: Typography with semantic variants
- **LoadingSpinner**: Loading states in multiple sizes
- **Divider**: Section separators (horizontal/vertical)

### Form Molecules (8)
- **FormField**: Universal wrapper with label/error handling
- **SearchBox**: Debounced search with clear functionality
- **Select**: Dropdown with search and multi-select
- **Checkbox**: Accessible checkboxes with indeterminate state
- **Radio**: RadioGroup with full accessibility
- **SwitchField**: Enhanced switch with form integration
- **Textarea**: Auto-resizing text areas
- **FileUpload**: Drag-and-drop with preview and validation

### Design System
- **556 Tests**: 100% passing with 75%+ coverage
- **WCAG AA Compliant**: Full accessibility support
- **Theme System**: Light/dark/system modes with persistence
- **Design Tokens**: Consistent colors, spacing, typography
- **TypeScript**: Complete type safety and IntelliSense

## Key Features

- **Zero Configuration**: Works out of the box
- **Tree Shakeable**: Import only what you need
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG AA compliance built-in
- **Themeable**: Light/dark mode with custom brand colors and design tokens
- **Form Ready**: Complete form ecosystem with validation
- **Production Ready**: Used in real applications
- **Flexible Integration**: Multiple integration paths (zero-config, Tailwind preset, CSS-in-JS)

## Usage Examples

### Basic Form
```tsx
import { FormField, Input, Button, Checkbox } from '@jonmatum/react-mfe-shell';

function ContactForm() {
  const [email, setEmail] = useState('');
  const [subscribe, setSubscribe] = useState(false);

  return (
    <form>
      <FormField 
        label="Email Address" 
        description="We'll never share your email"
        required
      >
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john@example.com"
        />
      </FormField>
      
      <Checkbox
        checked={subscribe}
        onChange={setSubscribe}
        label="Subscribe to newsletter"
      />
      
      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
```

### Advanced Select with Search
```tsx
import { FormField, Select } from '@jonmatum/react-mfe-shell';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' }
];

function CountrySelector() {
  const [country, setCountry] = useState('');

  return (
    <FormField label="Country" required>
      <Select
        value={country}
        onChange={setCountry}
        options={countries}
        searchable
        placeholder="Choose a country..."
      />
    </FormField>
  );
}
```

### Theme Management
```tsx
import { SettingsProvider, useSettings, Button } from '@jonmatum/react-mfe-shell';

function ThemeToggle() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <Button
      variant="ghost"
      onClick={() => updateSettings({ 
        theme: settings.theme === 'dark' ? 'light' : 'dark' 
      })}
    >
      Toggle Theme
    </Button>
  );
}

// Wrap your app
function App() {
  return (
    <SettingsProvider>
      <ThemeToggle />
    </SettingsProvider>
  );
}
```

### Custom Brand Colors
```js
// tailwind.config.js - Use your own brand colors
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
        // Your brand colors
        brand: {
          500: '#3b82f6', // Your primary brand color
          600: '#2563eb',
        },
        // Override our primary colors
        primary: {
          500: '#3b82f6', // Components use your brand color
          600: '#2563eb',
        }
      }
    }
  }
}
```

```tsx
// Components automatically use your custom colors
<Button variant="primary">Uses your brand color</Button>
<Badge variant="primary">Matches your theme</Badge>
```

## API Reference

### Component Props Patterns

All components follow consistent prop patterns:

```tsx
// Size variants
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Color variants  
variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost'

// States
disabled?: boolean
loading?: boolean
required?: boolean

// Form components
label?: string
description?: string
error?: string
```

### Form Validation
```tsx
import { validateField, validationPatterns } from '@jonmatum/react-mfe-shell';

// Built-in validation
const error = validateField(email, {
  required: true,
  pattern: validationPatterns.email
});

// Custom validation
const error = validateField(password, {
  required: 'Password is required',
  minLength: { value: 8, message: 'Must be at least 8 characters' },
  custom: (value) => value.includes('@') ? 'Cannot contain @' : undefined
});
```

## Styling & Customization

The library uses Tailwind CSS with CSS custom properties for theming:

```css
:root {
  --color-primary-600: 37 99 235;
  --color-success-600: 22 163 74;
  --color-warning-600: 217 119 6;
  --color-danger-600: 220 38 38;
}

.dark {
  --color-primary-600: 59 130 246;
  /* Dark theme overrides */
}
```

## Automated Metrics System

The demo app uses an automated metrics generation system to ensure all displayed statistics are accurate and up-to-date.

### Metrics Generation

```bash
# Generate fresh metrics from current build
npm run generate:metrics

# Build library and generate metrics in one command
npm run build:with-metrics
```

### What Gets Measured

**Bundle Sizes:**
- ESM and CJS bundle sizes (raw and gzipped)
- CSS bundle sizes (main and standalone)
- TypeScript definition file sizes

**Test Metrics:**
- Total test count and test files
- Test coverage percentage
- Pass rate statistics

**Code Quality:**
- DRY score from design system analysis
- Component analysis results
- Code complexity metrics

**Architecture:**
- Total files and lines of code
- Component count and structure
- Utility function usage

### Automatic Updates

Metrics are automatically updated:
- After every `npm run build:lib` (via post-build hook)
- In CI/CD pipeline (validates metrics are current)
- When running `npm run generate:metrics` manually

### Files Generated

- `demo/utils/metrics.ts` - TypeScript metrics for demo app
- `metrics.json` - JSON metrics for external tools
- Auto-updates demo components with live data

This ensures the demo always shows real, verifiable metrics without manual maintenance.

## Bundle Size

- **Core Library**: ~124KB (24KB gzipped)
- **Standalone CSS**: ~12KB (2.9KB gzipped)
- **Tailwind CSS**: ~38KB (processed with utilities)
- **Tailwind Preset**: ~4.1KB
- **Tree Shakeable**: Import only what you use
- **Zero Dependencies**: No external runtime dependencies
- **Modern Build**: ESM and CJS formats included

## Documentation

### Getting Started
- **[Integration Guide](docs/integration-guide.md)**: Complete setup instructions for all integration methods
- **[Hybrid Approach](docs/hybrid-approach.md)**: Technical details about our multi-path integration system

### Component Documentation
- **[Component Library](docs/components.md)**: Complete component API reference
- **[Theming Guide](docs/theming.md)**: Customization and theme management
- **[Form Components](docs/form-components.md)**: Form-specific components and patterns

### Migration and Troubleshooting
- **[Migration Guide](docs/migration-guide.md)**: Upgrading from previous versions
- **[Troubleshooting](docs/troubleshooting.md)**: Common issues and solutions

## Links

- **[Live Demo](https://jonmatum.github.io/react-mfe-shell/)**: Interactive component showcase
- **[NPM Package](https://www.npmjs.com/package/@jonmatum/react-mfe-shell)**: Install and version info
- **[GitHub](https://github.com/jonmatum/react-mfe-shell)**: Source code and issues

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with care for scalable React applications**
```

### Using in Your MFE

**[View on npm](https://www.npmjs.com/package/@jonmatum/react-mfe-shell)**

```bash
npm install @jonmatum/react-mfe-shell
```

```tsx
import React from 'react';
import { 
  SettingsProvider, 
  Button, 
  Input, 
  Badge,
  useSettings 
} from '@jonmatum/react-mfe-shell';

function App() {
  return (
    <SettingsProvider>
      <MyMicroFrontend />
    </SettingsProvider>
  );
}

function MyMicroFrontend() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <div className="p-4 space-y-4">
      <Button 
        variant="primary"
        onClick={() => updateSettings({ 
          theme: settings.theme === 'light' ? 'dark' : 'light' 
        })}
      >
        Toggle Theme
      </Button>
      
      <Input 
        label="Email"
        type="email"
        placeholder="Enter your email"
      />
      
      <Badge variant="success">
        Active
      </Badge>
    </div>
  );
}
```

## Component Library

### Atoms (Basic Building Blocks)

- **Button**: Multiple variants, sizes, loading states, and icon support
- **Input**: Form inputs with validation, icons, and accessibility features
- **Badge**: Status indicators with variants and removable functionality
- **LoadingSpinner**: Animated loading indicators with customizable appearance
- **Switch**: Toggle switches with proper form integration

### Molecules (Component Combinations)

- **Modal**: Accessible dialogs with backdrop, keyboard navigation, and focus management
- **Card**: Layout containers with compound patterns (Header, Body, Footer)

### Contexts & Providers

- **SettingsProvider**: Global state management for theme and layout preferences

## Design System

### Design Tokens

Complete design token system with:

- **Colors**: Base colors, semantic colors, and theme-aware color system
- **Typography**: Font families, sizes, weights, and letter spacing
- **Spacing**: Consistent spacing scale from 0px to 24rem
- **Shadows**: Box and drop shadows for elevation
- **Border Radius**: Consistent corner rounding
- **Breakpoints**: Mobile-first responsive design
- **Animation**: Duration and timing functions
- **Z-Index**: Layering hierarchy

```tsx
import { tokens } from '@jonmatum/react-mfe-shell';

// Access design tokens
const primaryColor = tokens.colors.semantic.primary[500];
const baseSpacing = tokens.spacing[4];
const mediumShadow = tokens.shadows.box.md;
```

### Theme System

Comprehensive theme management with:

```tsx
import { setupThemeManagement } from '@jonmatum/react-mfe-shell';

// Set up theme management
const { setTheme, cleanup } = setupThemeManagement((mode, resolvedTheme) => {
  console.log(`Theme changed to ${mode} (resolved: ${resolvedTheme})`);
});

// Change themes
setTheme('dark');    // Dark mode
setTheme('light');   // Light mode
setTheme('system');  // Follow system preference
```

**Available themes:**
- `light`: Light theme with high contrast
- `dark`: Dark theme optimized for low light
- `system`: Automatically follows system preference

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run dev:demo         # Start demo only
npm run build           # Build library for production
npm run build:lib       # Build library only
npm run build:demo      # Build demo only

# Quality Assurance
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:coverage   # Run tests with coverage report
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking

# Formatting
npm run format          # Format with Prettier
npm run format:check    # Check formatting
```

### Code Quality Standards

- **Test Coverage**: 90%+ across statements, branches, functions, and lines
- **Type Safety**: Strict TypeScript with comprehensive type definitions
- **Accessibility**: WCAG AA compliance with proper ARIA attributes
- **Performance**: Optimized bundle sizes and runtime performance
- **Code Analysis**: Automated complexity and quality metrics

### Adding New Components

Follow atomic design principles:

1. **Create the component** in the appropriate directory:
   ```
   src/components/
   ├── atoms/           # Basic building blocks
   ├── molecules/       # Simple combinations
   └── organisms/       # Complex combinations
   ```

2. **Add comprehensive tests** with 90%+ coverage

3. **Export the component** in `src/index.ts`

4. **Update documentation** and add to demo

Example component structure:

```tsx
// src/components/atoms/NewComponent.tsx
import React from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

interface NewComponentProps extends BaseComponentProps {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const NewComponent = React.memo<NewComponentProps>(({ 
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props 
}) => {
  return (
    <div
      className={classNames(
        'base-styles',
        {
          'size-sm': size === 'sm',
          'size-md': size === 'md',
          'size-lg': size === 'lg',
        },
        {
          'variant-default': variant === 'default',
          'variant-primary': variant === 'primary',
          'variant-secondary': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

NewComponent.displayName = 'NewComponent';

export default NewComponent;
```

## Testing

Using Vitest with comprehensive testing requirements:

```tsx
// Example test structure
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component>Test</Component>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('applies variants correctly', () => {
    render(<Component variant="primary">Primary</Component>);
    expect(screen.getByText('Primary')).toHaveClass('variant-primary');
  });

  it('handles interactions', () => {
    const handleClick = vi.fn();
    render(<Component onClick={handleClick}>Click</Component>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('supports accessibility', () => {
    render(<Component aria-label="Test component">Content</Component>);
    expect(screen.getByLabelText('Test component')).toBeInTheDocument();
  });
});
```

## Building and Distribution

### Library Build

```bash
npm run build:lib
```

Creates optimized builds:
- **ESM**: `dist/index.js` (modern bundlers)
- **CJS**: `dist/index.cjs` (Node.js compatibility)
- **Types**: `dist/index.d.ts` (TypeScript definitions)
- **Styles**: `dist/style.css` (CSS bundle)

### Bundle Analysis

Current bundle sizes:
- **ESM**: ~124KB (gzipped: ~24KB)
- **CJS**: ~132KB (gzipped: ~26KB)
- **Tailwind CSS**: ~38KB (processed with utilities)
- **Standalone CSS**: ~12KB (gzipped: ~2.9KB)

## Micro Frontend Integration

### Installation in MFE Apps

```bash
npm install @jonmatum/react-mfe-shell
```

### Integration Patterns

```tsx
// Complete integration example
import React from 'react';
import { 
  SettingsProvider, 
  Button, 
  Modal, 
  Card,
  tokens,
  useSettings 
} from '@jonmatum/react-mfe-shell';

function MicroFrontendApp() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-background-primary">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </SettingsProvider>
  );
}

function Header() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <header className="bg-surface-primary border-b border-border-primary p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-text-primary font-semibold">My MFE App</h1>
        <Button
          variant="ghost"
          onClick={() => updateSettings({ 
            theme: settings.theme === 'light' ? 'dark' : 'light' 
          })}
        >
          Toggle Theme
        </Button>
      </div>
    </header>
  );
}
```

## Configuration

### Tailwind CSS Integration

The design tokens are automatically integrated with Tailwind CSS:

```tsx
// Use theme-aware classes
<div className="bg-surface-primary text-text-primary border border-border-primary">
  Content adapts to theme automatically
</div>

// Use design token utilities
<div className="p-4 rounded-md shadow-md">
  Consistent spacing and styling
</div>
```

### Custom Configuration

```typescript
// tailwind.config.js
import { tokens } from '@jonmatum/react-mfe-shell';

export default {
  theme: {
    extend: {
      colors: tokens.colors.base,
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamily,
    },
  },
};
```

## Documentation

- **[Design Tokens](docs/design-tokens.md)**: Comprehensive design token documentation
- **[Implementation Guide](docs/implementation-guide.md)**: Detailed implementation instructions
- **[API Reference](docs/api-reference.md)**: Complete API documentation

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run quality checks: `npm run test:run && npm run lint && npm run type-check`
5. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
6. Push and create a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built with care for the micro frontend community**

*Pura Vida & Happy Coding!*
