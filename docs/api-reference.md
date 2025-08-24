# API Reference

Complete API documentation for all components, hooks, and utilities.

## Components

### Core Components

#### Button
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}
```

#### Input
```tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
```

#### Badge
```tsx
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  removable?: boolean;
  onRemove?: () => void;
}
```

#### Avatar
```tsx
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  shape?: 'circle' | 'square';
}
```

#### Card
```tsx
interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}
```

#### Modal
```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}
```

#### Switch
```tsx
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning';
  disabled?: boolean;
}
```

#### Text
```tsx
interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'overline';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}
```

#### LoadingSpinner
```tsx
interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}
```

#### Divider
```tsx
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
}
```

### Form Components

#### FormField
```tsx
interface FormFieldProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  children: ReactNode;
}
```

#### SearchBox
```tsx
interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  clearable?: boolean;
  loading?: boolean;
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
}
```

#### Select
```tsx
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: SelectOption[];
  multiple?: boolean;
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
}
```

#### Checkbox
```tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  indeterminate?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

#### Radio
```tsx
interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface RadioProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  disabled?: boolean;
}
```

#### SwitchField
```tsx
interface SwitchFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  color?: 'primary' | 'success' | 'warning';
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
```

#### Textarea
```tsx
interface TextareaProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;
  disabled?: boolean;
}
```

#### FileUpload
```tsx
interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  onFilesChange: (files: File[]) => void;
  multiple?: boolean;
  showPreview?: boolean;
  placeholder?: string;
  disabled?: boolean;
}
```

## Hooks

### useSettings
```tsx
interface Settings {
  theme: 'light' | 'dark' | 'system';
  [key: string]: any;
}

interface UseSettingsReturn {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  resetSettings: () => void;
}

function useSettings(): UseSettingsReturn;
```

### useFormField
```tsx
interface UseFormFieldOptions {
  required?: boolean;
  validate?: (value: any) => string | undefined;
}

interface UseFormFieldReturn {
  value: any;
  error: string | undefined;
  setValue: (value: any) => void;
  setError: (error: string | undefined) => void;
  validate: () => boolean;
  reset: () => void;
}

function useFormField<T>(
  initialValue: T,
  options?: UseFormFieldOptions
): UseFormFieldReturn;
```

## Utilities

### Form Validation
```tsx
interface ValidationRule {
  required?: boolean | string;
  minLength?: { value: number; message?: string };
  maxLength?: { value: number; message?: string };
  pattern?: { value: RegExp; message?: string };
  custom?: (value: any) => string | undefined;
}

function validateField(value: any, rules: ValidationRule): string | undefined;

const validationPatterns: {
  email: RegExp;
  phone: RegExp;
  url: RegExp;
};
```

### Class Names
```tsx
function classNames(...classes: (string | Record<string, boolean> | undefined)[]): string;
```

### Theme Management
```tsx
interface ThemeManagementReturn {
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  cleanup: () => void;
}

function setupThemeManagement(
  callback?: (mode: string, resolvedTheme: string) => void
): ThemeManagementReturn;
```

## Design Tokens

### Colors
```tsx
const tokens = {
  colors: {
    base: {
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        // ... more gray shades
        900: '#111827',
        950: '#030712'
      }
    },
    semantic: {
      primary: { /* color scale */ },
      secondary: { /* color scale */ },
      success: { /* color scale */ },
      warning: { /* color scale */ },
      danger: { /* color scale */ }
    }
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    // ... more spacing values
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      // ... more font sizes
    }
  }
};
```

## Provider Setup

### SettingsProvider
```tsx
interface SettingsProviderProps {
  children: ReactNode;
  defaultSettings?: Partial<Settings>;
}

function SettingsProvider({ children, defaultSettings }: SettingsProviderProps): JSX.Element;
```

## TypeScript Types

### Base Types
```tsx
interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
  id?: string;
  'data-testid'?: string;
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost';
type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
```

### Form Types
```tsx
interface FormFieldState {
  value: any;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

interface FormState {
  [fieldName: string]: FormFieldState;
}
```

## CSS Classes

### Theme Classes
```css
/* Theme-aware color classes */
.bg-surface-primary     /* Adapts to theme */
.bg-surface-secondary   /* Secondary surface */
.text-text-primary      /* Primary text color */
.text-text-secondary    /* Secondary text color */
.border-border-primary  /* Border color */

/* Component-specific classes */
.btn-primary           /* Primary button styles */
.input-default         /* Default input styles */
.card-elevated         /* Elevated card variant */
```

### Utility Classes
```css
/* Spacing utilities */
.space-y-4            /* Vertical spacing */
.p-4                  /* Padding */
.m-4                  /* Margin */

/* Layout utilities */
.flex                 /* Flexbox */
.grid                 /* Grid */
.hidden               /* Hide element */
.sr-only              /* Screen reader only */
```

This API reference provides complete type information and usage patterns for all components and utilities in the library.
