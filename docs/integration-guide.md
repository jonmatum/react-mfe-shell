# Integration Guide

This guide helps you integrate React MFE Shell into your project using the approach that best fits your needs.

## Quick Start

### Option 1: Zero-Config (Recommended for beginners)

Perfect for getting started quickly without any build configuration.

```bash
npm install @jonmatum/react-mfe-shell
```

```tsx
import { Button, Input, Badge, SettingsProvider } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/standalone';

function App() {
  return (
    <SettingsProvider>
      <div className="p-4 space-y-4">
        <Button variant="primary">Get Started</Button>
        <Input placeholder="Enter your email" />
        <Badge variant="success">Ready to use</Badge>
      </div>
    </SettingsProvider>
  );
}
```

**What you get:**
- All component styles included
- Theme system with light/dark mode
- No build configuration needed
- Works in any React environment

### Option 2: Tailwind Integration (Recommended for Tailwind users)

If you're already using Tailwind CSS and want full customization power.

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
  ],
  theme: {
    extend: {
      // Your custom theme extensions
    }
  }
}
```

```tsx
import { Button, Input, Badge, SettingsProvider } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/styles';

function App() {
  return (
    <SettingsProvider>
      <div className="p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
        <Button 
          variant="primary" 
          className="w-full shadow-lg hover:shadow-xl transition-shadow"
        >
          Enhanced Button
        </Button>
        <Input 
          placeholder="Custom styled input" 
          className="border-2 border-blue-500 focus:border-blue-600" 
        />
        <Badge variant="success" className="text-lg px-4 py-2">
          Custom Badge
        </Badge>
      </div>
    </SettingsProvider>
  );
}
```

**What you get:**
- Full Tailwind utility access
- Custom class composition
- Design token integration
- Tree-shaking optimization

## Component Examples

### Basic Form

```tsx
import { 
  FormField, 
  Input, 
  Button, 
  Checkbox, 
  SettingsProvider 
} from '@jonmatum/react-mfe-shell';

function ContactForm() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    subscribe: false
  });

  return (
    <SettingsProvider>
      <form className="space-y-4 max-w-md mx-auto p-6">
        <FormField 
          label="Email Address" 
          description="We'll never share your email"
          required
        >
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              email: e.target.value 
            }))}
            placeholder="john@example.com"
          />
        </FormField>
        
        <FormField label="Message">
          <Input
            as="textarea"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              message: e.target.value 
            }))}
            placeholder="Your message..."
            rows={4}
          />
        </FormField>
        
        <Checkbox
          checked={formData.subscribe}
          onChange={(checked) => setFormData(prev => ({ 
            ...prev, 
            subscribe: checked 
          }))}
          label="Subscribe to newsletter"
        />
        
        <Button type="submit" variant="primary" className="w-full">
          Send Message
        </Button>
      </form>
    </SettingsProvider>
  );
}
```

### Theme Management

```tsx
import { 
  SettingsProvider, 
  useSettings, 
  Button 
} from '@jonmatum/react-mfe-shell';

function ThemeToggle() {
  const { settings, updateSettings } = useSettings();
  
  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
  };
  
  return (
    <Button
      variant="ghost"
      onClick={toggleTheme}
      className="flex items-center gap-2"
    >
      {settings.theme === 'dark' ? '☀️' : '🌙'}
      {settings.theme === 'dark' ? 'Light' : 'Dark'} Mode
    </Button>
  );
}

function App() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-background-primary text-text-primary">
        <header className="p-4 border-b border-border-primary">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">My App</h1>
            <ThemeToggle />
          </div>
        </header>
        <main className="p-4">
          {/* Your app content */}
        </main>
      </div>
    </SettingsProvider>
  );
}
```

### Advanced Select Component

```tsx
import { FormField, Select } from '@jonmatum/react-mfe-shell';

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' }
];

function CountrySelector() {
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <FormField label="Country" required>
      <Select
        value={selectedCountry}
        onChange={setSelectedCountry}
        options={countries}
        searchable
        placeholder="Choose a country..."
        description="Select your country of residence"
      />
    </FormField>
  );
}
```

## Styling and Customization

### CSS Custom Properties

Both integration methods use CSS custom properties for theming:

```css
:root {
  /* Override default colors */
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

### Custom Brand Colors

You can easily use your own brand colors with our Tailwind preset:

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
    extend: {
      colors: {
        // Your brand colors
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6', // Your primary brand color
          600: '#2563eb',
          900: '#1e3a8a',
        },
        // Override our primary colors
        primary: {
          500: '#3b82f6', // Use your brand color
          600: '#2563eb',
        }
      }
    }
  }
}
```

**For complete theming examples and advanced customization, see our [Theming Guide](./theming.md).**

### Component Customization

```tsx
// Using className prop (works with both integration methods)
<Button 
  variant="primary"
  className="rounded-full px-8 py-4 text-lg font-bold"
>
  Custom Button
</Button>

// Using style prop for one-off customizations
<Button 
  variant="primary"
  style={{ 
    borderRadius: '20px',
    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)'
  }}
>
  Gradient Button
</Button>
```

## TypeScript Support

All components are fully typed:

```tsx
import type { ButtonProps, InputProps } from '@jonmatum/react-mfe-shell';

// Component props are fully typed
const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};

// Event handlers are typed
const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};
```

## Performance Tips

### Tree Shaking

Import only what you need:

```tsx
// Good - only imports what you use
import { Button, Input } from '@jonmatum/react-mfe-shell';

// Avoid - imports everything
import * as MFEShell from '@jonmatum/react-mfe-shell';
```

### Bundle Analysis

Check your bundle size:

```bash
# Analyze your bundle
npm run build -- --analyze

# Check component sizes
import { Button } from '@jonmatum/react-mfe-shell';
// Button: ~2KB gzipped
```

## Troubleshooting

### Common Issues

**Styles not loading:**
```tsx
// Make sure to import styles
import '@jonmatum/react-mfe-shell/standalone'; // or
import '@jonmatum/react-mfe-shell/styles';
```

**Theme not working:**
```tsx
// Wrap your app with SettingsProvider
<SettingsProvider>
  <App />
</SettingsProvider>
```

**TypeScript errors:**
```bash
# Make sure types are installed
npm install --save-dev @types/react @types/react-dom
```

### Getting Help

- **Documentation**: Check the [component documentation](./components.md)
- **Examples**: See the [demo site](https://jonmatum.github.io/react-mfe-shell/)
- **Issues**: Report bugs on [GitHub](https://github.com/jonmatum/react-mfe-shell/issues)

## Migration Guide

### From v7.x to v8.x

The hybrid approach is backward compatible. No breaking changes required.

**Optional enhancements:**
1. Switch to `@jonmatum/react-mfe-shell/standalone` for zero-config
2. Add Tailwind preset for enhanced customization
3. Use new theme management features

### From other component libraries

1. **Replace imports**: Update import statements
2. **Update styles**: Switch to our CSS imports
3. **Wrap with provider**: Add `SettingsProvider`
4. **Update props**: Check component API differences

## Next Steps

- Explore the [component library](./components.md)
- Learn about [theming](./theming.md)
- Check out [advanced patterns](./advanced-patterns.md)
- See the [hybrid approach details](./hybrid-approach.md)
