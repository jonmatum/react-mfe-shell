# Implementation Guide

Step-by-step guide for integrating React MFE Shell into your application.

## Installation

```bash
npm install @jonmatum/react-mfe-shell
```

## Basic Setup

### 1. Wrap Your App with SettingsProvider

```tsx
import React from 'react';
import { SettingsProvider } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/dist/style.css';

function App() {
  return (
    <SettingsProvider>
      <YourApp />
    </SettingsProvider>
  );
}
```

### 2. Configure Tailwind CSS

Add to your `tailwind.config.js`:

```js
import { tokens } from '@jonmatum/react-mfe-shell';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@jonmatum/react-mfe-shell/dist/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // Theme-aware colors
        'surface-primary': 'rgb(var(--color-surface-primary) / <alpha-value>)',
        'surface-secondary': 'rgb(var(--color-surface-secondary) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        'border-primary': 'rgb(var(--color-border-primary) / <alpha-value>)',
        
        // Semantic colors
        primary: tokens.colors.semantic.primary,
        secondary: tokens.colors.semantic.secondary,
        success: tokens.colors.semantic.success,
        warning: tokens.colors.semantic.warning,
        danger: tokens.colors.semantic.danger,
      },
      spacing: tokens.spacing,
      fontFamily: tokens.typography.fontFamily,
    },
  },
  plugins: [],
};
```

### 3. Add CSS Variables

Add to your main CSS file:

```css
@import '@jonmatum/react-mfe-shell/dist/style.css';

:root {
  /* Light theme */
  --color-surface-primary: 255 255 255;
  --color-surface-secondary: 249 250 251;
  --color-text-primary: 17 24 39;
  --color-text-secondary: 107 114 128;
  --color-border-primary: 229 231 235;
}

.dark {
  /* Dark theme */
  --color-surface-primary: 17 24 39;
  --color-surface-secondary: 31 41 55;
  --color-text-primary: 243 244 246;
  --color-text-secondary: 156 163 175;
  --color-border-primary: 75 85 99;
}
```

## Component Usage

### Basic Components

```tsx
import { Button, Input, Badge, Card } from '@jonmatum/react-mfe-shell';

function MyComponent() {
  return (
    <Card className="p-6">
      <h2 className="text-text-primary mb-4">Welcome</h2>
      
      <Input 
        placeholder="Enter your name"
        className="mb-4"
      />
      
      <div className="flex gap-2 mb-4">
        <Badge variant="success">Active</Badge>
        <Badge variant="primary">New</Badge>
      </div>
      
      <Button variant="primary">
        Get Started
      </Button>
    </Card>
  );
}
```

### Form Components

```tsx
import { 
  FormField, 
  Input, 
  Select, 
  Checkbox, 
  Button 
} from '@jonmatum/react-mfe-shell';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    subscribe: false
  });

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' }
  ];

  return (
    <form className="space-y-6">
      <FormField label="Full Name" required>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            name: e.target.value 
          }))}
        />
      </FormField>

      <FormField label="Email" required>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ 
            ...prev, 
            email: e.target.value 
          }))}
        />
      </FormField>

      <FormField label="Country">
        <Select
          value={formData.country}
          onChange={(value) => setFormData(prev => ({ 
            ...prev, 
            country: value 
          }))}
          options={countries}
          searchable
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

      <Button type="submit" variant="primary">
        Submit
      </Button>
    </form>
  );
}
```

### Theme Management

```tsx
import { useSettings, Button } from '@jonmatum/react-mfe-shell';

function ThemeToggle() {
  const { settings, updateSettings } = useSettings();

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    updateSettings({ theme: newTheme });
  };

  return (
    <Button variant="ghost" onClick={toggleTheme}>
      Toggle Theme
    </Button>
  );
}
```

## Advanced Usage

### Custom Validation

```tsx
import { validateField, validationPatterns } from '@jonmatum/react-mfe-shell';

function useFormValidation() {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const error = validateField(email, {
      required: 'Email is required',
      pattern: {
        value: validationPatterns.email,
        message: 'Please enter a valid email'
      }
    });
    
    setErrors(prev => ({ ...prev, email: error }));
    return !error;
  };

  const validatePassword = (password) => {
    const error = validateField(password, {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters'
      },
      custom: (value) => {
        if (!/[A-Z]/.test(value)) return 'Must contain uppercase letter';
        if (!/[0-9]/.test(value)) return 'Must contain number';
        return undefined;
      }
    });
    
    setErrors(prev => ({ ...prev, password: error }));
    return !error;
  };

  return { errors, validateEmail, validatePassword };
}
```

### Modal Workflows

```tsx
import { Modal, Button, FormField, Input } from '@jonmatum/react-mfe-shell';

function UserProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });

  return (
    <>
      <Button onClick={() => setIsEditModalOpen(true)}>
        Edit Profile
      </Button>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
        size="md"
      >
        <div className="space-y-4">
          <FormField label="Name">
            <Input
              value={userData.name}
              onChange={(e) => setUserData(prev => ({ 
                ...prev, 
                name: e.target.value 
              }))}
            />
          </FormField>

          <FormField label="Email">
            <Input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData(prev => ({ 
                ...prev, 
                email: e.target.value 
              }))}
            />
          </FormField>

          <div className="flex justify-end gap-2 pt-4">
            <Button 
              variant="ghost" 
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="primary">
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
```

## Best Practices

### 1. Component Composition
```tsx
// Good: Compose components for reusability
function UserCard({ user }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <Avatar src={user.avatar} alt={user.name} />
        <div>
          <Text variant="body" weight="semibold">{user.name}</Text>
          <Text variant="caption" color="secondary">{user.email}</Text>
        </div>
        <Badge variant={user.isActive ? 'success' : 'secondary'}>
          {user.isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>
    </Card>
  );
}
```

### 2. Form State Management
```tsx
// Good: Use consistent form patterns
function useFormState(initialState) {
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const setFieldError = (field, error) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  return { data, errors, updateField, setFieldError };
}
```

### 3. Accessibility
```tsx
// Good: Always include proper labels and ARIA attributes
function SearchForm() {
  return (
    <FormField 
      label="Search Products" 
      description="Enter keywords to find products"
    >
      <SearchBox
        placeholder="Search..."
        aria-label="Search products"
        // Component handles ARIA attributes automatically
      />
    </FormField>
  );
}
```

### 4. Theme Consistency
```tsx
// Good: Use theme-aware classes
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface-primary">
      <header className="bg-surface-secondary border-b border-border-primary p-4">
        <Text variant="h1" className="text-text-primary">My App</Text>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Styles not applying**: Ensure you've imported the CSS file
2. **Theme not working**: Check that SettingsProvider wraps your app
3. **TypeScript errors**: Make sure you have the latest type definitions
4. **Build errors**: Verify Tailwind configuration includes the library path

### Performance Tips

1. **Tree shaking**: Import only the components you need
2. **Bundle analysis**: Use webpack-bundle-analyzer to check bundle size
3. **Lazy loading**: Use React.lazy for large forms or modals
4. **Memoization**: Use React.memo for expensive components

This guide covers the essential implementation patterns for using React MFE Shell effectively in your applications.
