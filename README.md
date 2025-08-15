# React MFE Shell

A production-ready micro frontend (MFE) app shell built with React, TypeScript, and modern tooling. This shell provides the foundational architecture, shared components, and utilities for building scalable micro frontend applications.

## Overview

The React MFE Shell serves as the core foundation for micro frontend architectures, providing:

- **Shared Component Library**: Atomic design system with reusable components
- **Design System**: Comprehensive design tokens with WCAG AA compliance  
- **Theme Management**: Light, dark, and system theme modes
- **State Management**: Global settings and context providers
- **Modern Tooling**: React 18, TypeScript, Vite, Tailwind CSS
- **Quality Assurance**: 90%+ test coverage, comprehensive linting, code analysis
- **Developer Experience**: Hot reload, type safety, automated formatting

## Architecture

This MFE shell follows atomic design principles and provides the foundation for multiple micro frontend applications to share common components and utilities.

### Component Architecture

```
src/components/
├── atoms/           # Basic building blocks (Button, Input, etc.)
├── molecules/       # Simple combinations (Modal, SearchBox, etc.)
└── organisms/       # Complex combinations (Navigation, Layout, etc.)
```

### Core Features

- **Settings Management**: Global theme and layout preferences
- **Component Library**: Production-ready, accessible components
- **Design Tokens**: Consistent styling across all micro frontends
- **Utility Functions**: Shared helpers for common operations
- **Type Definitions**: Comprehensive TypeScript support

## Quick Start

### Prerequisites

- Node.js 22.x LTS (jod) or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/jonmatum/react-mfe-shell.git
cd react-mfe-shell

# Setup Node.js (if using nvm)
nvm use

# Or run the setup script
./scripts/setup-node.sh

# Install dependencies
npm install

# Start development server
npm run dev
```

### Using in Your MFE

```tsx
import React from 'react';
import { SettingsProvider, Button, Modal, useSettings } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/dist/style.css';

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
    <div className="p-4">
      <Button 
        variant="primary"
        onClick={() => console.log('MFE Shell Button clicked!')}
      >
        Shared Shell Component
      </Button>
    </div>
  );
}
```

## Available Components

### Atoms
- **Button**: Configurable button with variants (primary, secondary, ghost)
- **LoadingSpinner**: Animated loading indicator with customizable sizes
- **Switch**: Toggle switch for settings and preferences

### Molecules
- **Modal**: Accessible modal dialog with backdrop and keyboard support

### Contexts
- **SettingsProvider**: Global state management for theme and layout preferences

### Utilities
- **classNames**: Utility for combining CSS classes
- **storage**: Local storage helpers with error handling
- **theme**: Theme management utilities
- **tokens**: Comprehensive design token system

## Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run build:lib       # Build library for distribution

# Quality Assurance
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking
npm run test            # Run tests
npm run test:coverage   # Run tests with coverage
npm run analyze         # Run code analysis

# Code Analysis
npm run analyze:detailed    # Detailed file-by-file analysis
npm run analyze:complexity  # Focus on code complexity
npm run analyze:json       # Export analysis as JSON

# Formatting
npm run format          # Format with Prettier
npm run format:check    # Check formatting

# Documentation
npm run wiki:sync       # Sync documentation to GitHub Wiki
```

### Code Quality

This project maintains high code quality standards:

- **Test Coverage**: 90%+ across all components
- **Type Safety**: Strict TypeScript configuration
- **Code Analysis**: Automated complexity and quality metrics
- **Accessibility**: WCAG AA compliance
- **Performance**: Optimized bundle size and runtime performance

### Adding New Components

When adding components to the shell, follow the atomic design principles:

1. **Atoms**: Basic UI elements that can't be broken down further
2. **Molecules**: Simple combinations of atoms
3. **Organisms**: Complex combinations that form distinct sections

```tsx
// Example: Adding a new atom
// src/components/atoms/Badge.tsx
import React from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const Badge: React.FC<BadgeProps> = ({ 
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props 
}) => {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full font-medium',
        {
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
          'px-4 py-2 text-base': size === 'lg',
        },
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-green-100 text-green-800': variant === 'success',
          'bg-yellow-100 text-yellow-800': variant === 'warning',
          'bg-red-100 text-red-800': variant === 'error',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
```

Don't forget to export new components in `src/index.ts`:

```tsx
export { default as Badge } from './components/atoms/Badge';
```

## Design System

The shell includes a comprehensive design system with:

### Design Tokens
- **Colors**: Primary, secondary, and semantic color palettes
- **Typography**: Font families, sizes, and weights  
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation system
- **Breakpoints**: Responsive design breakpoints

### Theme Support
```tsx
import { useSettings } from '@jonmatum/react-mfe-shell';

function ThemeToggle() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <button
      onClick={() => updateSettings({ 
        theme: settings.theme === 'light' ? 'dark' : 'light' 
      })}
    >
      Toggle Theme
    </button>
  );
}
```

Available themes:
- `light`: Light theme
- `dark`: Dark theme  
- `system`: Follows system preference

## Testing

The shell uses Vitest for testing with comprehensive coverage requirements:

```tsx
// Example component test
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Button variant="primary">Primary Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Coverage Requirements
- Statements: 90%
- Branches: 90%
- Functions: 90%
- Lines: 90%

## Building and Distribution

### Library Build

```bash
npm run build:lib  # Creates dist/ with ESM and CJS builds
```

### Publishing to npm

```bash
# Update version
npm version patch|minor|major

# Publish to npm
npm publish
```

## Micro Frontend Integration

This shell is designed to be consumed by multiple micro frontend applications:

### Installation in MFE Apps

```bash
npm install @jonmatum/react-mfe-shell
```

### Usage Patterns

```tsx
// In your micro frontend application
import { 
  SettingsProvider, 
  Button, 
  Modal, 
  useSettings,
  tokens 
} from '@jonmatum/react-mfe-shell';

// Use shared components and utilities
function MyMFEApp() {
  return (
    <SettingsProvider>
      <div style={{ padding: tokens.spacing[4] }}>
        <Button variant="primary">
          Consistent Button Across MFEs
        </Button>
      </div>
    </SettingsProvider>
  );
}
```

## Configuration

### Environment Variables

```bash
# .env.development
VITE_API_URL=http://localhost:3001
VITE_MFE_SHELL_DEBUG=true

# .env.production  
VITE_API_URL=https://api.yourapp.com
VITE_MFE_SHELL_DEBUG=false
```

### Build Configuration

Customize the build in `tsup.config.ts`:

```typescript
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  external: ['react', 'react-dom'],
  // Shell-specific optimizations
});
```

## Contributing

We welcome contributions to the MFE Shell! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run quality checks: `npm run lint && npm run test && npm run analyze`
5. Submit a pull request

## Documentation

- **[Code Analysis Guide](docs/CODE_ANALYSIS.md)**: Comprehensive code quality analysis
- **[Implementation Guide](docs/IMPLEMENTATION_GUIDE.md)**: Detailed implementation instructions
- **[GitHub Wiki](https://github.com/jonmatum/react-mfe-shell/wiki)**: Auto-synced documentation

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Related Projects

- **[MFE App Shell](https://github.com/jonmatum/mfe-appshell)**: Complete micro frontend application shell
- **[React MFE Template](https://github.com/jonmatum/react-mfe-template)**: Template for creating new MFE projects

---

**Built with care for the micro frontend community**
