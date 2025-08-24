# Form Components Guide

Complete reference for all form molecule components with examples and API documentation.

## Quick Reference

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| FormField | Universal wrapper | Label, description, error handling |
| SearchBox | Search input | Debounced, clearable, loading states |
| Select | Dropdown selection | Searchable, multi-select, custom options |
| Checkbox | Boolean input | Indeterminate state, accessible |
| Radio | Single selection | RadioGroup, full accessibility |
| SwitchField | Toggle control | Enhanced switch with form integration |
| Textarea | Multi-line text | Auto-resize, character counting |
| FileUpload | File selection | Drag-and-drop, preview, validation |

## FormField

Universal wrapper for consistent form field styling and behavior.

```tsx
import { FormField, Input } from '@jonmatum/react-mfe-shell';

<FormField
  label="Email Address"
  description="We'll never share your email"
  error={errors.email}
  required
>
  <Input type="email" value={email} onChange={setEmail} />
</FormField>
```

**Props:**
- `label?: string` - Field label
- `description?: string` - Help text
- `error?: string` - Error message
- `required?: boolean` - Shows required indicator
- `disabled?: boolean` - Disables the field

## SearchBox

Debounced search input with clear functionality.

```tsx
import { SearchBox } from '@jonmatum/react-mfe-shell';

<SearchBox
  value={query}
  onChange={setQuery}
  placeholder="Search..."
  debounceMs={300}
  clearable
  loading={isSearching}
/>
```

**Props:**
- `value: string` - Current search value
- `onChange: (value: string) => void` - Change handler
- `debounceMs?: number` - Debounce delay (default: 300)
- `clearable?: boolean` - Show clear button
- `loading?: boolean` - Show loading spinner
- `onClear?: () => void` - Clear button handler

## Select

Dropdown with search and multi-select capabilities.

```tsx
import { Select } from '@jonmatum/react-mfe-shell';

const options = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' }
];

// Single select
<Select
  value={country}
  onChange={setCountry}
  options={options}
  searchable
  placeholder="Choose country..."
/>

// Multi-select
<Select
  value={skills}
  onChange={setSkills}
  options={skillOptions}
  multiple
  searchable
/>
```

**Props:**
- `value: string | string[]` - Selected value(s)
- `onChange: (value: string | string[]) => void` - Change handler
- `options: Array<{value: string, label: string}>` - Available options
- `multiple?: boolean` - Enable multi-select
- `searchable?: boolean` - Enable search filtering
- `placeholder?: string` - Placeholder text
- `disabled?: boolean` - Disable the select

## Checkbox

Accessible checkbox with indeterminate state support.

```tsx
import { Checkbox } from '@jonmatum/react-mfe-shell';

<Checkbox
  checked={isChecked}
  onChange={setIsChecked}
  label="Subscribe to newsletter"
  description="Get updates about new features"
  indeterminate={someSelected}
/>
```

**Props:**
- `checked: boolean` - Checked state
- `onChange: (checked: boolean) => void` - Change handler
- `label?: string` - Checkbox label
- `description?: string` - Help text
- `indeterminate?: boolean` - Indeterminate state
- `disabled?: boolean` - Disable checkbox

## Radio

RadioGroup for single selection from multiple options.

```tsx
import { Radio } from '@jonmatum/react-mfe-shell';

const options = [
  { value: 'light', label: 'Light Theme', description: 'Clean and bright' },
  { value: 'dark', label: 'Dark Theme', description: 'Easy on the eyes' }
];

<Radio
  value={theme}
  onChange={setTheme}
  options={options}
/>
```

**Props:**
- `value: string` - Selected value
- `onChange: (value: string) => void` - Change handler
- `options: Array<{value: string, label: string, description?: string}>` - Radio options
- `disabled?: boolean` - Disable all options

## SwitchField

Enhanced switch with form field integration.

```tsx
import { SwitchField } from '@jonmatum/react-mfe-shell';

<SwitchField
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Push Notifications"
  description="Receive important updates"
  color="success"
/>
```

**Props:**
- `checked: boolean` - Switch state
- `onChange: (checked: boolean) => void` - Change handler
- `label?: string` - Switch label
- `description?: string` - Help text
- `color?: 'primary' | 'success' | 'warning'` - Switch color
- `disabled?: boolean` - Disable switch

## Textarea

Auto-resizing textarea with character counting.

```tsx
import { Textarea } from '@jonmatum/react-mfe-shell';

<Textarea
  value={bio}
  onChange={(e) => setBio(e.target.value)}
  placeholder="Tell us about yourself..."
  rows={4}
  maxLength={500}
  autoResize
  minRows={3}
  maxRows={8}
/>
```

**Props:**
- `value: string` - Textarea value
- `onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void` - Change handler
- `rows?: number` - Initial rows
- `maxLength?: number` - Character limit
- `autoResize?: boolean` - Enable auto-resize
- `minRows?: number` - Minimum rows (with autoResize)
- `maxRows?: number` - Maximum rows (with autoResize)

## FileUpload

Drag-and-drop file upload with preview and validation.

```tsx
import { FileUpload } from '@jonmatum/react-mfe-shell';

<FileUpload
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  onFilesChange={setFiles}
  multiple
  showPreview
  placeholder="Drop images here or click to browse"
/>
```

**Props:**
- `accept?: string` - File type restrictions
- `maxSize?: number` - Maximum file size in bytes
- `onFilesChange: (files: File[]) => void` - File change handler
- `multiple?: boolean` - Allow multiple files
- `showPreview?: boolean` - Show file previews
- `placeholder?: string` - Placeholder text

## Form Validation

Built-in validation utilities for form components.

```tsx
import { validateField, validationPatterns } from '@jonmatum/react-mfe-shell';

// Basic validation
const emailError = validateField(email, {
  required: true,
  pattern: validationPatterns.email
});

// Custom validation
const passwordError = validateField(password, {
  required: 'Password is required',
  minLength: { value: 8, message: 'Must be at least 8 characters' },
  custom: (value) => {
    if (!value.match(/[A-Z]/)) return 'Must contain uppercase letter';
    if (!value.match(/[0-9]/)) return 'Must contain number';
    return undefined;
  }
});

// Built-in patterns
validationPatterns.email      // Email validation
validationPatterns.phone      // Phone number validation
validationPatterns.url        // URL validation
```

## Accessibility Features

All form components include:

- **WCAG AA Compliance**: Proper contrast ratios and focus indicators
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA attributes and announcements
- **Focus Management**: Logical tab order and focus trapping
- **Error Announcements**: Screen reader accessible error messages

## Complete Form Example

```tsx
import { 
  FormField, 
  Input, 
  Select, 
  Checkbox, 
  Textarea, 
  Button 
} from '@jonmatum/react-mfe-shell';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    message: '',
    subscribe: false
  });

  const countries = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' }
  ];

  return (
    <form className="space-y-6">
      <FormField label="Full Name" required>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="John Doe"
        />
      </FormField>

      <FormField label="Email Address" required>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="john@example.com"
        />
      </FormField>

      <FormField label="Country">
        <Select
          value={formData.country}
          onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
          options={countries}
          searchable
          placeholder="Choose your country..."
        />
      </FormField>

      <FormField label="Message">
        <Textarea
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          placeholder="Your message..."
          rows={4}
          maxLength={1000}
        />
      </FormField>

      <Checkbox
        checked={formData.subscribe}
        onChange={(checked) => setFormData(prev => ({ ...prev, subscribe: checked }))}
        label="Subscribe to newsletter"
        description="Get updates about new features and releases"
      />

      <Button type="submit" variant="primary" size="lg">
        Send Message
      </Button>
    </form>
  );
}
```

This example demonstrates all form components working together with consistent styling and behavior.
