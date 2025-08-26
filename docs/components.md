# Component Library

Complete API reference for all React MFE Shell components with theming and customization examples.

## Core Components

### Button

Versatile button component with multiple variants, sizes, and states.

**Props:**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}
```

**Basic Usage:**
```tsx
import { Button } from '@jonmatum/react-mfe-shell';

<Button variant="primary" size="md">
  Click me
</Button>
```

**With Custom Brand Colors:**
```tsx
// Using your custom brand colors from Tailwind config
<Button 
  variant="primary" 
  className="bg-brand-600 hover:bg-brand-700 focus:ring-brand-500"
>
  Brand Button
</Button>

// Or using CSS custom properties
<Button 
  variant="primary"
  style={{ 
    backgroundColor: 'rgb(var(--color-brand-600))',
    borderColor: 'rgb(var(--color-brand-600))'
  }}
>
  Custom Styled Button
</Button>
```

**Loading State:**
```tsx
<Button loading={isSubmitting} variant="primary">
  {isSubmitting ? 'Saving...' : 'Save Changes'}
</Button>
```

### Input

Form input component with validation, icons, and accessibility features.

**Props:**
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
```

**Basic Usage:**
```tsx
import { Input, FormField } from '@jonmatum/react-mfe-shell';

<FormField label="Email" required error={emailError}>
  <Input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</FormField>
```

**With Custom Styling:**
```tsx
<Input
  placeholder="Custom styled input"
  className="border-brand-300 focus:border-brand-500 focus:ring-brand-500"
/>
```

### Badge

Status indicator component with variants and removable functionality.

**Props:**
```typescript
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  children?: React.ReactNode;
}
```

**Basic Usage:**
```tsx
import { Badge } from '@jonmatum/react-mfe-shell';

<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="danger">Error</Badge>
```

**Custom Colors:**
```tsx
<Badge className="bg-brand-100 text-brand-800 border-brand-200">
  Custom Brand Badge
</Badge>
```

## Form Components

### FormField

Universal form field wrapper with label, description, and error handling.

**Props:**
```typescript
interface FormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { FormField, Input } from '@jonmatum/react-mfe-shell';

<FormField 
  label="Company Name" 
  description="This will be displayed on your profile"
  required
  error={errors.companyName}
>
  <Input
    value={companyName}
    onChange={(e) => setCompanyName(e.target.value)}
  />
</FormField>
```

### Select

Dropdown component with search, multi-select, and accessibility features.

**Props:**
```typescript
interface SelectProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
}
```

**Usage:**
```tsx
import { Select, FormField } from '@jonmatum/react-mfe-shell';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' }
];

<FormField label="Country" required>
  <Select
    options={options}
    value={selectedCountry}
    onChange={setSelectedCountry}
    searchable
    placeholder="Choose a country..."
  />
</FormField>
```

### Checkbox

Accessible checkbox component with indeterminate state support.

**Props:**
```typescript
interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
}
```

**Usage:**
```tsx
import { Checkbox } from '@jonmatum/react-mfe-shell';

<Checkbox
  checked={agreedToTerms}
  onChange={setAgreedToTerms}
  label="I agree to the Terms of Service"
  description="You must agree to continue"
/>
```

## Layout Components

### Modal

Accessible modal component with focus management and backdrop handling.

**Props:**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { Modal, Button } from '@jonmatum/react-mfe-shell';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p className="text-gray-600 mb-6">
    Are you sure you want to delete this item?
  </p>
  <div className="flex gap-3 justify-end">
    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleDelete}>
      Delete
    </Button>
  </div>
</Modal>
```

### Card

Content container component with consistent styling and compound patterns.

**Props:**
```typescript
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { Card } from '@jonmatum/react-mfe-shell';

<Card className="max-w-md">
  <Card.Header>
    <h3 className="text-lg font-semibold">Card Title</h3>
  </Card.Header>
  <Card.Body>
    <p>Card content goes here.</p>
  </Card.Body>
  <Card.Footer>
    <Button variant="primary">Action</Button>
  </Card.Footer>
</Card>
```

## Utility Components

### LoadingSpinner

Animated loading indicator with multiple sizes and colors.

**Props:**
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'current';
  className?: string;
}
```

**Usage:**
```tsx
import { LoadingSpinner } from '@jonmatum/react-mfe-shell';

<LoadingSpinner size="md" color="primary" />

// Custom brand color
<LoadingSpinner 
  size="lg" 
  className="text-brand-600" 
  color="current" 
/>
```

### Switch

Toggle switch component with theme integration.

**Props:**
```typescript
interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  className?: string;
}
```

**Usage:**
```tsx
import { Switch } from '@jonmatum/react-mfe-shell';

<Switch
  checked={isEnabled}
  onChange={setIsEnabled}
  size="md"
  color="primary"
/>
```

## Theming Components

All components support theming through:

### 1. Tailwind Classes
```tsx
<Button className="bg-brand-600 hover:bg-brand-700 text-white">
  Custom Button
</Button>
```

### 2. CSS Custom Properties
```tsx
<Button 
  style={{ 
    backgroundColor: 'rgb(var(--color-brand-600))',
    color: 'white'
  }}
>
  CSS Custom Properties
</Button>
```

### 3. Theme Context
```tsx
import { useSettings } from '@jonmatum/react-mfe-shell';

function ThemedComponent() {
  const { settings } = useSettings();
  
  return (
    <div className={`p-4 ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      Theme-aware content
    </div>
  );
}
```

## Accessibility Features

All components include:

- **ARIA attributes**: Proper labeling and descriptions
- **Keyboard navigation**: Full keyboard support
- **Focus management**: Logical focus order and indicators
- **Screen reader support**: Semantic HTML and ARIA
- **Color contrast**: WCAG AA compliant color combinations

## Customization Examples

### SaaS Application Theme
```tsx
// Components with SaaS branding
<Button className="bg-blue-600 hover:bg-blue-700 focus:ring-blue-500">
  SaaS Action
</Button>

<Badge className="bg-blue-100 text-blue-800 border-blue-200">
  Pro Plan
</Badge>

<Input className="border-blue-200 focus:border-blue-500 focus:ring-blue-500" />
```

### E-commerce Theme
```tsx
// Components with e-commerce branding
<Button className="bg-purple-600 hover:bg-purple-700 focus:ring-purple-500">
  Add to Cart
</Button>

<Badge className="bg-green-100 text-green-800">
  In Stock
</Badge>

<Badge className="bg-red-100 text-red-800">
  Sale
</Badge>
```

### Fintech Theme
```tsx
// Components with fintech branding
<Button className="bg-green-600 hover:bg-green-700 focus:ring-green-500">
  Invest Now
</Button>

<Badge className="bg-green-100 text-green-800">
  +$1,234.56
</Badge>

<Badge className="bg-red-100 text-red-800">
  -$567.89
</Badge>
```

## Performance Tips

### Tree Shaking
```tsx
// Import only what you need
import { Button, Input } from '@jonmatum/react-mfe-shell';

// Avoid importing everything
import * as MFEShell from '@jonmatum/react-mfe-shell'; // Don't do this
```

### Lazy Loading
```tsx
import { lazy, Suspense } from 'react';

// Lazy load heavy components
const Modal = lazy(() => 
  import('@jonmatum/react-mfe-shell').then(m => ({ default: m.Modal }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal isOpen={isOpen} onClose={onClose}>
        Content
      </Modal>
    </Suspense>
  );
}
```

## Next Steps

- **[Theming Guide](./theming.md)**: Complete theming and customization examples
- **[Integration Guide](./integration-guide.md)**: Setup and integration instructions
- **[Advanced Patterns](./advanced-patterns.md)**: Complex usage patterns
- **[Troubleshooting](./troubleshooting.md)**: Common issues and solutions
