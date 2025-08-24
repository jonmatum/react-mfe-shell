# Form Molecules Documentation

This document provides comprehensive documentation for all form molecule components in the React MFE Shell design system.

## Overview

Form molecules are composed components that combine atomic elements to create complete form field experiences. They provide consistent validation, error handling, accessibility, and user experience patterns across your application.

## Core Principles

- **Accessibility First**: All components follow WCAG AA guidelines
- **Consistent API**: Unified prop patterns across all form components
- **Validation Integration**: Built-in validation with customizable rules
- **Error Handling**: Consistent error state management and display
- **Keyboard Navigation**: Full keyboard accessibility support
- **Screen Reader Support**: Proper ARIA attributes and announcements

## Components

### FormField

A wrapper component that provides consistent label, description, and error handling for any form input.

```tsx
import { FormField, Input } from '@jonmatum/react-mfe-shell';

function ContactForm() {
  return (
    <FormField
      label="Email Address"
      description="We'll never share your email with anyone"
      error={errors.email}
      required
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </FormField>
  );
}
```

**Props:**
- `label?: string` - Field label text
- `description?: string` - Help text displayed below the field
- `error?: string` - Error message to display
- `required?: boolean` - Shows required indicator (*)
- `disabled?: boolean` - Disables the field
- `size?: 'sm' | 'md' | 'lg'` - Field size
- `children: React.ReactElement` - The form input component

### SearchBox

A search input with built-in search icon, clear functionality, and optional debouncing.

```tsx
import { SearchBox } from '@jonmatum/react-mfe-shell';

function ProductSearch() {
  const [query, setQuery] = useState('');

  return (
    <SearchBox
      value={query}
      onChange={setQuery}
      onSearch={handleSearch}
      placeholder="Search products..."
      debounceMs={300}
      showClearButton
      loading={isSearching}
    />
  );
}
```

**Props:**
- `value?: string` - Current search value
- `onChange?: (value: string) => void` - Called when input changes
- `onSearch?: (value: string) => void` - Called when search is triggered
- `onClear?: () => void` - Called when clear button is clicked
- `placeholder?: string` - Input placeholder text
- `showClearButton?: boolean` - Show clear button when there's a value
- `loading?: boolean` - Show loading spinner
- `debounceMs?: number` - Debounce delay for onSearch calls

### Select

A dropdown select component with search, multi-select, and accessibility features.

```tsx
import { Select } from '@jonmatum/react-mfe-shell';

const countries = [
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'ca', label: 'Canada', description: 'North America' },
  { value: 'mx', label: 'Mexico', description: 'North America' },
];

function CountrySelector() {
  const [country, setCountry] = useState('');

  return (
    <Select
      label="Country"
      options={countries}
      value={country}
      onChange={setCountry}
      searchable
      clearable
      placeholder="Select a country..."
    />
  );
}
```

**Props:**
- `options: SelectOption[]` - Array of options to display
- `value?: string | number` - Selected value
- `onChange?: (value: string | number) => void` - Called when selection changes
- `placeholder?: string` - Placeholder text
- `searchable?: boolean` - Enable search functionality
- `clearable?: boolean` - Show clear button
- `multiple?: boolean` - Enable multi-select
- `loading?: boolean` - Show loading state
- `renderOption?: (option: SelectOption) => React.ReactNode` - Custom option renderer
- `renderValue?: (option: SelectOption) => React.ReactNode` - Custom value renderer

### Checkbox

A checkbox component with indeterminate state support and accessibility features.

```tsx
import { Checkbox } from '@jonmatum/react-mfe-shell';

function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <Checkbox
      checked={accepted}
      onChange={setAccepted}
      label="I accept the terms and conditions"
      description="By checking this box, you agree to our terms of service"
      required
      color="primary"
    />
  );
}
```

**Props:**
- `checked?: boolean` - Checkbox state
- `onChange?: (checked: boolean) => void` - Called when state changes
- `indeterminate?: boolean` - Show indeterminate state
- `value?: string` - Form value
- `color?: 'primary' | 'success' | 'warning' | 'danger'` - Color theme

### Radio

A radio button group component with accessibility features.

```tsx
import { Radio } from '@jonmatum/react-mfe-shell';

const contactMethods = [
  { value: 'email', label: 'Email', description: 'Get notified via email' },
  { value: 'sms', label: 'SMS', description: 'Get notified via text message' },
  { value: 'phone', label: 'Phone', description: 'Get a phone call' },
];

function ContactPreferences() {
  const [method, setMethod] = useState('email');

  return (
    <Radio
      label="Preferred contact method"
      options={contactMethods}
      value={method}
      onChange={setMethod}
      orientation="vertical"
      color="primary"
    />
  );
}
```

**Props:**
- `options: RadioOption[]` - Array of radio options
- `value?: string | number` - Selected value
- `onChange?: (value: string | number) => void` - Called when selection changes
- `orientation?: 'horizontal' | 'vertical'` - Layout direction
- `color?: 'primary' | 'success' | 'warning' | 'danger'` - Color theme

### Textarea

A textarea component with auto-resize functionality and accessibility features.

```tsx
import { Textarea } from '@jonmatum/react-mfe-shell';

function MessageForm() {
  const [message, setMessage] = useState('');

  return (
    <Textarea
      label="Message"
      value={message}
      onChange={setMessage}
      placeholder="Enter your message..."
      autoResize
      minRows={3}
      maxRows={10}
      required
    />
  );
}
```

**Props:**
- `value?: string` - Textarea content
- `onChange?: (value: string) => void` - Called when content changes
- `placeholder?: string` - Placeholder text
- `rows?: number` - Initial number of rows
- `minRows?: number` - Minimum rows when auto-resizing
- `maxRows?: number` - Maximum rows when auto-resizing
- `resize?: 'none' | 'vertical' | 'horizontal' | 'both'` - Resize behavior
- `autoResize?: boolean` - Enable automatic height adjustment

### FileUpload

A file upload component with drag-and-drop, preview, and validation features.

```tsx
import { FileUpload } from '@jonmatum/react-mfe-shell';

function DocumentUpload() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FileUpload
      label="Upload documents"
      accept="image/*,.pdf,.doc,.docx"
      multiple
      maxSize={5 * 1024 * 1024} // 5MB
      maxFiles={10}
      onFilesChange={setFiles}
      onError={handleError}
      preview
      dragAndDrop
    />
  );
}
```

**Props:**
- `accept?: string` - Accepted file types
- `multiple?: boolean` - Allow multiple files
- `maxSize?: number` - Maximum file size in bytes
- `maxFiles?: number` - Maximum number of files
- `onFilesChange?: (files: File[]) => void` - Called when files change
- `onError?: (error: string) => void` - Called when validation fails
- `preview?: boolean` - Show image previews
- `dragAndDrop?: boolean` - Enable drag and drop

### SwitchField

An enhanced switch component with form field functionality.

```tsx
import { SwitchField } from '@jonmatum/react-mfe-shell';

function NotificationSettings() {
  const [notifications, setNotifications] = useState(false);

  return (
    <SwitchField
      checked={notifications}
      onChange={setNotifications}
      label="Email Notifications"
      description="Receive email updates about your account"
      color="primary"
    />
  );
}
```

**Props:**
- `checked: boolean` - Switch state
- `onChange: (checked: boolean) => void` - Called when state changes
- `color?: 'primary' | 'success' | 'warning' | 'danger'` - Color theme

## Form Validation

### Built-in Validation Utilities

The design system provides comprehensive validation utilities:

```tsx
import { useFormField, validateField, validationPatterns } from '@jonmatum/react-mfe-shell';

function EmailField() {
  const field = useFormField({
    initialValue: '',
    validation: {
      required: true,
      pattern: validationPatterns.email,
    },
    validateOnBlur: true,
  });

  return (
    <FormField
      label="Email Address"
      error={field.error}
      required
    >
      <Input
        type="email"
        value={field.value}
        onChange={(e) => field.setValue(e.target.value)}
        onBlur={field.setTouched}
      />
    </FormField>
  );
}
```

### Validation Patterns

Pre-built validation patterns for common use cases:

- `validationPatterns.email` - Email address validation
- `validationPatterns.phone` - Phone number validation
- `validationPatterns.url` - URL validation
- `validationPatterns.alphanumeric` - Alphanumeric characters only
- `validationPatterns.noSpecialChars` - No special characters allowed

### Custom Validation

Create custom validation rules:

```tsx
const validation = {
  required: 'Password is required',
  minLength: { value: 8, message: 'Password must be at least 8 characters' },
  custom: (value: string) => {
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Password must contain uppercase, lowercase, and number';
    }
  },
};
```

## Accessibility Features

All form components include comprehensive accessibility features:

### ARIA Attributes
- `aria-invalid` - Indicates validation state
- `aria-required` - Indicates required fields
- `aria-describedby` - Links descriptions and errors
- `role="alert"` - Announces errors to screen readers

### Keyboard Navigation
- Tab navigation through all interactive elements
- Space/Enter activation for checkboxes and radios
- Arrow key navigation in radio groups
- Escape to close dropdowns

### Screen Reader Support
- Proper labeling and descriptions
- Error announcements with `aria-live`
- Status updates for dynamic content
- Semantic HTML structure

## Best Practices

### Form Layout
```tsx
function ContactForm() {
  return (
    <form className="space-y-6">
      <FormField label="Full Name" required>
        <Input type="text" />
      </FormField>
      
      <FormField label="Email Address" required>
        <Input type="email" />
      </FormField>
      
      <FormField label="Message">
        <Textarea minRows={4} />
      </FormField>
      
      <Checkbox
        label="Subscribe to newsletter"
        description="Get updates about new features"
      />
      
      <Button type="submit" variant="primary">
        Send Message
      </Button>
    </form>
  );
}
```

### Error Handling
```tsx
function FormWithValidation() {
  const [errors, setErrors] = useState({});
  
  const validateForm = (data) => {
    const newErrors = {};
    
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!validationPatterns.email.value.test(data.email)) {
      newErrors.email = validationPatterns.email.message;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Email Address"
        error={errors.email}
        required
      >
        <Input type="email" />
      </FormField>
    </form>
  );
}
```

### Performance Optimization
```tsx
// Use debouncing for search inputs
<SearchBox
  onSearch={handleSearch}
  debounceMs={300}
/>

// Use callback optimization for large option lists
const memoizedOptions = useMemo(() => 
  largeDataSet.map(item => ({
    value: item.id,
    label: item.name
  })), [largeDataSet]
);

<Select options={memoizedOptions} />
```

## Theming and Customization

All form components support the design system's theming:

```tsx
// Custom color themes
<Checkbox color="success" />
<Radio color="warning" />
<SwitchField color="danger" />

// Size variations
<FormField size="lg">
  <Input size="lg" />
</FormField>

// Custom styling
<SearchBox className="custom-search-styles" />
```

## Integration with Form Libraries

The components work seamlessly with popular form libraries:

### React Hook Form
```tsx
import { useForm, Controller } from 'react-hook-form';

function HookFormExample() {
  const { control, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required' }}
        render={({ field, fieldState }) => (
          <FormField
            label="Email Address"
            error={fieldState.error?.message}
            required
          >
            <Input
              type="email"
              {...field}
            />
          </FormField>
        )}
      />
    </form>
  );
}
```

### Formik
```tsx
import { Formik, Field } from 'formik';

function FormikExample() {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Field name="email">
          {({ field }) => (
            <FormField
              label="Email Address"
              error={touched.email && errors.email}
              required
            >
              <Input
                type="email"
                {...field}
              />
            </FormField>
          )}
        </Field>
      )}
    </Formik>
  );
}
```

## Testing

All components include comprehensive test coverage. Example test patterns:

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('handles form submission', async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  
  render(<ContactForm onSubmit={onSubmit} />);
  
  await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
  await user.click(screen.getByRole('button', { name: 'Submit' }));
  
  expect(onSubmit).toHaveBeenCalledWith({
    email: 'test@example.com'
  });
});
```

## Migration Guide

When upgrading from basic form inputs to form molecules:

1. **Wrap existing inputs** with FormField for consistent styling
2. **Replace custom validation** with built-in validation utilities
3. **Update accessibility attributes** - they're now handled automatically
4. **Consolidate error handling** using the unified error prop pattern

This comprehensive form molecule system provides everything needed to build accessible, consistent, and user-friendly forms in your React applications.
