# Documentation

Complete documentation for React MFE Shell - a production-ready micro frontend component library.

## Documentation Index

### Getting Started
- **[Implementation Guide](implementation-guide.md)** - Step-by-step setup and integration
- **[API Reference](api-reference.md)** - Complete component and utility documentation
- **[Form Components](form-components.md)** - Comprehensive form molecule guide

### Design System
- **[Design Tokens](design-tokens.md)** - Colors, spacing, typography, and theme system

## Quick Links

### For Developers
- **Installation**: `npm install @jonmatum/react-mfe-shell`
- **Live Demo**: [https://jonmatum.github.io/react-mfe-shell/](https://jonmatum.github.io/react-mfe-shell/)
- **NPM Package**: [https://www.npmjs.com/package/@jonmatum/react-mfe-shell](https://www.npmjs.com/package/@jonmatum/react-mfe-shell)

### For Amazon Q
This library provides:
- **18 Production-Ready Components** (10 core + 8 form molecules)
- **424 Tests Passing** with 100% accessibility compliance
- **Complete TypeScript Support** with IntelliSense
- **Theme System** with light/dark/system modes
- **Form Ecosystem** with validation and error handling

## Component Overview

### Core Components (10)
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| Button | Actions and interactions | All variants, loading states, icons |
| Input | Text input fields | Validation, icons, error states |
| Badge | Status indicators | Removable, semantic colors |
| Avatar | User representation | Fallbacks, multiple sizes |
| Card | Content containers | Variants, hover effects |
| Modal | Overlays and dialogs | Focus management, accessibility |
| Switch | Toggle controls | Theme integration, sizes |
| Text | Typography | Semantic variants, colors |
| LoadingSpinner | Loading states | Multiple sizes and colors |
| Divider | Section separators | Horizontal/vertical orientations |

### Form Molecules (8)
| Component | Purpose | Key Features |
|-----------|---------|--------------|
| FormField | Universal wrapper | Label, description, error handling |
| SearchBox | Search functionality | Debounced, clearable, loading states |
| Select | Dropdown selection | Searchable, multi-select, custom options |
| Checkbox | Boolean input | Indeterminate state, accessible |
| Radio | Single selection | RadioGroup, full accessibility |
| SwitchField | Toggle with form integration | Enhanced switch wrapper |
| Textarea | Multi-line text | Auto-resize, character counting |
| FileUpload | File selection | Drag-and-drop, preview, validation |

## Key Features

- **Zero Configuration**: Works out of the box
- **Tree Shakeable**: Import only what you need  
- **Responsive**: Mobile-first design approach
- **Accessible**: WCAG AA compliance built-in
- **Themeable**: Light/dark mode with custom themes
- **Form Ready**: Complete form ecosystem with validation
- **Production Ready**: Used in real applications

## Quick Start

```tsx
import { 
  SettingsProvider, 
  Button, 
  FormField, 
  Input 
} from '@jonmatum/react-mfe-shell';

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

## Documentation Structure

### Implementation Guide
Complete setup instructions with:
- Installation and configuration
- Tailwind CSS integration
- Theme setup and customization
- Best practices and troubleshooting

### API Reference
Comprehensive API documentation with:
- Component interfaces and props
- Hook signatures and return types
- Utility function parameters
- TypeScript type definitions

### Form Components Guide
Detailed form molecule documentation with:
- Individual component examples
- Validation patterns and utilities
- Complete form implementation examples
- Accessibility features and guidelines

### Design Tokens
Design system documentation covering:
- Color system and semantic tokens
- Typography scale and font families
- Spacing system and layout utilities
- Theme architecture and customization

This documentation is optimized for both human developers and AI assistants like Amazon Q to understand and effectively use the React MFE Shell library.
