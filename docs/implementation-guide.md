# Implementation Guide

This guide provides detailed instructions for implementing and extending the React MFE Shell in your micro frontend applications.

## Getting Started

### Installation

```bash
npm install @jonmatum/react-mfe-shell
```

### Basic Setup

```tsx
// main.tsx or index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { SettingsProvider } from '@jonmatum/react-mfe-shell';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>
);
```

### CSS Integration

Import the CSS file in your main entry point:

```tsx
// Import the design system styles
import '@jonmatum/react-mfe-shell/dist/style.css';
```

Or in your CSS file:

```css
@import '@jonmatum/react-mfe-shell/dist/style.css';
```

## Component Usage

### Using Atomic Components

```tsx
import { Button, Input, Badge, LoadingSpinner, Switch } from '@jonmatum/react-mfe-shell';

function MyForm() {
  const [loading, setLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-4">
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        required
      />
      
      <Switch
        checked={enabled}
        onChange={setEnabled}
        label="Enable notifications"
      />
      
      <div className="flex items-center space-x-2">
        <Button
          variant="primary"
          loading={loading}
          onClick={() => setLoading(true)}
        >
          Submit
        </Button>
        
        <Badge variant="success">
          Active
        </Badge>
      </div>
      
      {loading && <LoadingSpinner size="md" />}
    </div>
  );
}
```

### Using Molecule Components

```tsx
import { Modal, Card } from '@jonmatum/react-mfe-shell';

function MyApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Card>
        <Card.Header>
          <h2>Welcome</h2>
        </Card.Header>
        <Card.Body>
          <p>This is a card component with compound pattern.</p>
        </Card.Body>
        <Card.Footer>
          <Button onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
        </Card.Footer>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
      >
        <p>Modal content goes here.</p>
      </Modal>
    </div>
  );
}
```

## Theme Management

### Using the Settings Context

```tsx
import { useSettings } from '@jonmatum/react-mfe-shell';

function ThemeToggle() {
  const { settings, updateSettings } = useSettings();

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
  };

  return (
    <Button onClick={toggleTheme}>
      Current theme: {settings.theme}
    </Button>
  );
}
```

### Advanced Theme Management

```tsx
import { setupThemeManagement } from '@jonmatum/react-mfe-shell';

// Set up theme management with callback
const { setTheme, cleanup } = setupThemeManagement((mode, resolvedTheme) => {
  console.log(`Theme changed to ${mode} (resolved: ${resolvedTheme})`);
  
  // Update your app's theme-dependent logic
  document.body.className = `theme-${resolvedTheme}`;
});

// Change theme programmatically
setTheme('system'); // Follow system preference
setTheme('dark');   // Force dark mode
setTheme('light');  // Force light mode

// Cleanup when component unmounts
useEffect(() => cleanup, []);
```

## Design Tokens

### Accessing Design Tokens

```tsx
import { tokens } from '@jonmatum/react-mfe-shell';

// Use tokens in your components
const MyComponent = () => (
  <div
    style={{
      padding: tokens.spacing[4],
      backgroundColor: tokens.colors.semantic.primary[500],
      borderRadius: tokens.borderRadius.md,
      boxShadow: tokens.shadows.box.md,
    }}
  >
    Styled with design tokens
  </div>
);
```

### Tailwind CSS Integration

If you're using Tailwind CSS, extend your configuration:

```javascript
// tailwind.config.js
import { tokens } from '@jonmatum/react-mfe-shell';

export default {
  theme: {
    extend: {
      colors: {
        ...tokens.colors.base,
        primary: tokens.colors.semantic.primary,
        secondary: tokens.colors.semantic.secondary,
      },
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      borderRadius: tokens.borderRadius,
      boxShadow: tokens.shadows.box,
    },
  },
};
```

Then use theme-aware classes:

```tsx
<div className="bg-surface-primary text-text-primary border border-border-primary">
  This adapts to the current theme automatically
</div>
```

## Creating Custom Components

### Following the Design System

When creating custom components, follow the established patterns:

```tsx
import React from 'react';
import { BaseComponentProps } from '@jonmatum/react-mfe-shell';
import { classNames } from '@jonmatum/react-mfe-shell';

interface CustomComponentProps extends BaseComponentProps {
  variant?: 'default' | 'highlighted';
  size?: 'sm' | 'md' | 'lg';
}

const CustomComponent = React.memo<CustomComponentProps>(({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={classNames(
        // Base styles
        'rounded-md border transition-colors',
        
        // Size variants
        {
          'p-2 text-sm': size === 'sm',
          'p-4 text-base': size === 'md',
          'p-6 text-lg': size === 'lg',
        },
        
        // Variant styles
        {
          'bg-surface-primary border-border-primary': variant === 'default',
          'bg-primary-50 border-primary-200': variant === 'highlighted',
        },
        
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

CustomComponent.displayName = 'CustomComponent';

export default CustomComponent;
```

### Adding TypeScript Support

Create proper type definitions:

```tsx
// types.ts
export interface CustomComponentProps extends BaseComponentProps {
  variant?: 'default' | 'highlighted';
  size?: 'sm' | 'md' | 'lg';
  onCustomEvent?: (data: string) => void;
}

// Export types for consumers
export type { CustomComponentProps };
```

## Testing Integration

### Testing Components with the Shell

```tsx
import { render, screen } from '@testing-library/react';
import { SettingsProvider } from '@jonmatum/react-mfe-shell';
import MyComponent from './MyComponent';

// Test wrapper with providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <SettingsProvider>
    {children}
  </SettingsProvider>
);

describe('MyComponent', () => {
  it('renders with theme context', () => {
    render(
      <MyComponent />,
      { wrapper: TestWrapper }
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('responds to theme changes', () => {
    const { rerender } = render(
      <SettingsProvider defaultSettings={{ theme: 'light' }}>
        <MyComponent />
      </SettingsProvider>
    );
    
    // Test light theme
    expect(screen.getByTestId('component')).toHaveClass('light-theme');
    
    // Change to dark theme
    rerender(
      <SettingsProvider defaultSettings={{ theme: 'dark' }}>
        <MyComponent />
      </SettingsProvider>
    );
    
    expect(screen.getByTestId('component')).toHaveClass('dark-theme');
  });
});
```

## Performance Optimization

### Tree Shaking

Import only what you need:

```tsx
// ✅ Good - tree-shakeable imports
import { Button, Input } from '@jonmatum/react-mfe-shell';

// ❌ Avoid - imports entire library
import * as MFEShell from '@jonmatum/react-mfe-shell';
```

### Lazy Loading

For large applications, consider lazy loading:

```tsx
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@jonmatum/react-mfe-shell';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner size="lg" />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Troubleshooting

### Common Issues

1. **Styles not applying**: Make sure you've imported the CSS file
2. **Theme not working**: Ensure components are wrapped in `SettingsProvider`
3. **TypeScript errors**: Check that you're using compatible React and TypeScript versions

### Debug Mode

Enable debug mode for development:

```tsx
<SettingsProvider debug={process.env.NODE_ENV === 'development'}>
  <App />
</SettingsProvider>
```

### Bundle Analysis

Analyze your bundle to ensure optimal imports:

```bash
# Using webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer build/static/js/*.js
```

## Migration Guide

### From Version 3.x to 4.x

1. **Update imports**: Some component names may have changed
2. **Check theme API**: Theme management API has been enhanced
3. **Update tests**: Test utilities may have new APIs
4. **Review breaking changes**: Check CHANGELOG.md for breaking changes

### From Other Design Systems

1. **Map components**: Create a mapping of your existing components to MFE Shell components
2. **Update theme tokens**: Migrate your design tokens to the new system
3. **Test thoroughly**: Ensure visual consistency across your application

## Best Practices

1. **Use semantic tokens**: Prefer semantic color tokens over base colors
2. **Follow atomic design**: Structure your components following atomic principles
3. **Test accessibility**: Use screen readers and keyboard navigation
4. **Optimize performance**: Import only what you need
5. **Document customizations**: Keep track of any custom components or overrides

---

*Pura Vida & Happy Coding!*
