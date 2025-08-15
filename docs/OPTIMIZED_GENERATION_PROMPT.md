# **Optimized Prompt: Production-Ready MFE App Shell**

## **Project Overview**

Create a production-ready micro frontend (MFE) app shell built with React 18+, TypeScript, Vite, Tailwind CSS 4.x, and Heroicons. The shell should achieve a **95%+ quality score** with zero dead code, proper atomic design structure, comprehensive design system, and full NPM package readiness.

## ** Architecture Requirements**

### **1. Atomic Design System (Strict Hierarchy)**

```
 src/components/
├── atoms/           # 20+ reusable UI primitives
│   ├── Button.tsx           # Primary/secondary/ghost variants
│   ├── Badge.tsx            # Status indicators with semantic colors
│   ├── Avatar.tsx           # User profile images with fallbacks
│   ├── LoadingSpinner.tsx   # Consistent loading states
│   ├── Switch.tsx           # Toggle controls with accessibility
│   ├── IconButton.tsx       # Icon-only interactive elements
│   ├── NavigationLink.tsx   # Smart navigation with active states
│   ├── Card.tsx             # Content containers
│   ├── Text.tsx             # Typography with design tokens
│   ├── Heading.tsx          # Semantic headings (h1-h6)
│   ├── Stack.tsx            # Vertical/horizontal layouts
│   └── Grid.tsx             # Responsive grid layouts
├── molecules/       # 8+ component combinations
│   ├── Modal.tsx            # Accessible dialog system
│   ├── UserMenu.tsx         # Profile dropdown with actions
│   ├── Logo.tsx             # Brand identity with variants
│   ├── SettingsForm.tsx     # Configuration interface
│   ├── NavigationDropdown.tsx # Multi-level navigation
│   ├── ThemeSelector.tsx    # Theme switching interface
│   └── MobileMenuToggle.tsx # Responsive navigation control
├── organisms/       # 3+ complex sections
│   ├── SettingsModal.tsx    # Complete settings interface
│   ├── NavigationBar.tsx    # Main navigation system
│   └── UserProfile.tsx      # User information display
├── templates/       # 2+ layout patterns
│   ├── StackedLayout.tsx    # Traditional header/content layout
│   └── SidebarLayout.tsx    # Side navigation layout
└── pages/           # 1+ complete pages
    └── AppShell.tsx         # Main shell orchestrator
```

### **2. Design System Tokens (Zero Hardcoded Values)**

```typescript
// src/design-system/tokens.ts
export const designTokens = {
  colors: {
    primary: { 50: 'indigo-50', 500: 'indigo-500', 900: 'indigo-900' },
    secondary: { 50: 'gray-50', 500: 'gray-500', 900: 'gray-900' },
    success: { 50: 'green-50', 500: 'green-500', 900: 'green-900' },
    warning: { 50: 'yellow-50', 500: 'yellow-500', 900: 'yellow-900' },
    danger: { 50: 'red-50', 500: 'red-500', 900: 'red-900' },
    info: { 50: 'blue-50', 500: 'blue-500', 900: 'blue-900' },
  },
  spacing: { xs: '0.5', sm: '1', md: '1.5', lg: '2', xl: '3', '2xl': '4' },
  typography: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  },
  borderRadius: { sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg' },
  shadows: { sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg' },
  transitions: {
    fast: 'duration-150',
    normal: 'duration-300',
    slow: 'duration-500',
  },
};
```

### **3. TypeScript Interface System**

```typescript
// src/types/index.ts
export interface AppShellConfig {
  title: string;
  navigation: NavigationItem[];
  userNavigation: UserNavigationItem[];
  user?: UserProfile;
  logo?: LogoConfig;
  defaultSettings?: AppSettings;
  loading?: LoadingConfig;
  errorReporting?: ErrorReportingConfig;
}

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  current?: boolean;
  badge?: string | number;
  children?: NavigationSubItem[]; // 3-level navigation support
  onClick?: (event: React.MouseEvent, item: NavigationItem) => void;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  layout: 'stacked' | 'sidebar';
  containerWidth: 'boxed' | 'full-width';
}
```

## ** Core Features & Requirements**

### **1. Multi-Layout System**

- **Stacked Layout**: Traditional header + content
- **Sidebar Layout**: Side navigation + content area
- **Responsive Behavior**: Automatic mobile adaptation
- **Layout Switching**: Runtime layout changes

### **2. Advanced Theme System**

- **Light/Dark/System Modes**: Complete theme switching
- **CSS Custom Properties**: Smooth theme transitions
- **WCAG AA Compliance**: All color combinations tested
- **Persistent Storage**: Theme preferences saved

### **3. Navigation Architecture**

- **3-Level Navigation**: Main → Sub → Leaf items
- **Active State Management**: Smart current page detection
- **Badge Support**: Notification indicators
- **Icon Integration**: Heroicons throughout
- **Mobile Optimization**: Collapsible navigation

### **4. Settings Management**

- **Modal Interface**: Accessible settings dialog
- **Real-time Updates**: Instant setting application
- **Local Storage**: Persistent user preferences
- **Context API**: Global state management

## ** Technical Specifications**

### **Build Configuration**

```typescript
// tsup.config.ts
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react', 'react-dom', '@heroicons/react'],
  esbuildOptions: {
    banner: { js: '"use client"' },
    jsx: 'automatic',
  },
});
```

### **Vitest Configuration**

```typescript
// vitest.config.ts
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/',
      ],
      thresholds: {
        global: {
          branches: 90,
          functions: 90,
          lines: 90,
          statements: 90,
        },
      },
    },
  },
});
```

### **Package.json Structure**

```json
{
  "name": "mfe-appshell",
  "version": "1.0.0",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "scripts": {
    "dev": "vite",
    "build": "npm run clean && npm run build:lib",
    "build:lib": "tsup",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "type-check": "tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "@heroicons/react": "^2.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.7.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "@vitest/coverage-v8": "^3.2.4",
    "@vitest/ui": "^3.2.4",
    "happy-dom": "^18.0.1",
    "vitest": "^3.2.4"
  }
}
```

## **🧪 Testing Requirements (Vitest)**

### **Test Structure**

```
 src/
├── test/
│   ├── setup.ts              # Test configuration and global setup
│   ├── utils.tsx             # Testing utilities and custom renders
│   └── __mocks__/            # Mock implementations
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx   # Unit tests for Button component
│   │   ├── Badge.tsx
│   │   └── Badge.test.tsx    # Unit tests for Badge component
│   └── molecules/
│       ├── Modal.tsx
│       └── Modal.test.tsx    # Integration tests for Modal
└── hooks/
    ├── useSettings.ts
    └── useSettings.test.tsx   # Hook testing with renderHook
```

### **Test Setup Configuration**

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock localStorage
beforeEach(() => {
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  vi.stubGlobal('localStorage', localStorageMock);
});

// Mock IntersectionObserver
vi.stubGlobal(
  'IntersectionObserver',
  vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }))
);
```

### **Testing Utilities**

```typescript
// src/test/utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { SettingsProvider } from '../contexts/SettingsContext';
import type { AppSettings } from '../types';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialSettings?: Partial<AppSettings>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  { initialSettings = {}, ...renderOptions }: CustomRenderOptions = {}
) {
  const defaultSettings: AppSettings = {
    theme: 'light',
    layout: 'stacked',
    containerWidth: 'boxed',
    ...initialSettings,
  };

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <SettingsProvider initialSettings={defaultSettings}>
        {children}
      </SettingsProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { renderWithProviders as render };
```

### **Component Testing Examples**

```typescript
// src/components/atoms/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../../test/utils';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant styles correctly', () => {
    render(<Button variant="primary">Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-indigo-600', 'text-white');
  });

  it('is accessible with keyboard navigation', () => {
    render(<Button>Accessible Button</Button>);
    const button = screen.getByRole('button');

    button.focus();
    expect(button).toHaveFocus();

    fireEvent.keyDown(button, { key: 'Enter' });
    // Test keyboard interaction
  });
});
```

### **Hook Testing Examples**

```typescript
// src/hooks/useSettings.test.tsx
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { SettingsProvider } from '../contexts/SettingsContext';
import { useSettings } from './useSettings';

describe('useSettings', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SettingsProvider>{children}</SettingsProvider>
  );

  it('provides default settings', () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    expect(result.current.settings).toEqual({
      theme: 'light',
      layout: 'stacked',
      containerWidth: 'boxed',
    });
  });

  it('updates theme setting', () => {
    const { result } = renderHook(() => useSettings(), { wrapper });

    act(() => {
      result.current.updateSettings({ theme: 'dark' });
    });

    expect(result.current.settings.theme).toBe('dark');
  });
});
```

### **Integration Testing Examples**

```typescript
// src/components/organisms/SettingsModal.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../test/utils';
import { SettingsModal } from './SettingsModal';

describe('SettingsModal Integration', () => {
  it('opens and closes modal correctly', async () => {
    const onClose = vi.fn();
    render(<SettingsModal isOpen={true} onClose={onClose} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/close/i));
    expect(onClose).toHaveBeenCalled();
  });

  it('saves settings and persists to localStorage', async () => {
    render(<SettingsModal isOpen={true} onClose={vi.fn()} />);

    // Change theme
    fireEvent.click(screen.getByLabelText(/dark mode/i));

    // Save settings
    fireEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'mfe-appshell-settings',
        expect.stringContaining('"theme":"dark"')
      );
    });
  });
});
```

### **Coverage Requirements**

- **Overall Coverage**: 90%+ (branches, functions, lines, statements)
- **Component Coverage**: 95%+ for all atoms and molecules
- **Hook Coverage**: 100% for custom hooks
- **Utility Coverage**: 95%+ for utility functions
- **Integration Coverage**: 85%+ for complete user flows

### **Test Categories**

1. **Unit Tests**: Individual component and function testing
2. **Integration Tests**: Component interaction and data flow
3. **Accessibility Tests**: ARIA attributes, keyboard navigation, screen readers
4. **Visual Regression Tests**: Component appearance consistency
5. **Performance Tests**: Render performance and memory usage

## ** Quality Standards**

### **DRY Principles (95%+ Compliance)**

- **Zero hardcoded values**: All styling uses design tokens
- **Configuration-driven**: No hardcoded navigation/user data
- **Reusable utilities**: Shared helper functions
- **Component composition**: Avoid code duplication

### **Performance Optimization**

- **Code splitting**: Lazy loading for non-critical components
- **Bundle optimization**: Tree-shaking friendly exports
- **Memory efficiency**: Proper cleanup and memoization
- **Render optimization**: Minimal re-renders

### **Accessibility Standards**

- **WCAG AA Compliance**: All interactive elements
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA attributes
- **Focus Management**: Visible focus indicators

## ** NPM Package Readiness**

### **Export Structure**

```typescript
// Main exports
export { AppShell } from './components/pages/AppShell';
export { SettingsProvider } from './contexts/SettingsContext';

// Component exports (all atoms, molecules, organisms)
export { Button, Badge, Avatar, LoadingSpinner } from './components/atoms';
export { Modal, UserMenu, Logo } from './components/molecules';

// Hook exports
export { useSettings, useDropdownState } from './hooks';

// Type exports
export type { AppShellConfig, NavigationItem, AppSettings } from './types';
```

### **Documentation Requirements**

- **README.md**: Complete usage guide with examples
- **API Documentation**: All props and interfaces documented
- **Migration Guide**: Upgrade paths between versions
- **Examples**: Working code samples for common use cases

## ** Design System Implementation**

### **Component Variants System**

```typescript
// Design system variants for consistent styling
export const buttonVariants = {
  variant: {
    primary: `bg-${colors.primary[600]} text-white hover:bg-${colors.primary[700]}`,
    secondary: `bg-${colors.secondary[100]} text-${colors.secondary[900]}`,
    ghost: `text-${colors.primary[600]} hover:bg-${colors.primary[50]}`,
  },
  size: {
    sm: `px-${spacing.sm} py-${spacing.xs} ${typography.sm}`,
    md: `px-${spacing.md} py-${spacing.sm} ${typography.base}`,
    lg: `px-${spacing.lg} py-${spacing.md} ${typography.lg}`,
  },
};
```

### **Responsive Design Patterns**

- **Mobile-first approach**: All components responsive by default
- **Breakpoint system**: Consistent responsive behavior
- **Touch-friendly**: Proper touch targets (44px minimum)
- **Progressive enhancement**: Works without JavaScript

## ** Success Criteria**

### **Quality Metrics**

- **Overall Quality Score**: 95%+
- **Design System Compliance**: 100%
- **DRY Principles**: 95%+
- **TypeScript Coverage**: 100%
- **Test Coverage**: 90%+ (Vitest)
- **Bundle Size**: <50KB gzipped
- **Performance Score**: 95%+ Lighthouse

### **Testing Metrics (Vitest)**

- **Unit Test Coverage**: 95%+ for components and utilities
- **Integration Test Coverage**: 85%+ for user workflows
- **Accessibility Test Coverage**: 100% for interactive elements
- **Performance Test Coverage**: Key rendering paths tested
- **Error Boundary Coverage**: All error scenarios tested

### **Deliverables**

1. **Complete source code** with proper atomic structure
2. **Comprehensive Vitest test suite** with 90%+ coverage
3. **Production build configuration** ready for NPM
4. **Complete documentation** with examples
5. **Demo application** showcasing all features
6. **Migration guides** and best practices
7. **CI/CD configuration** with automated testing

---

**Generate a complete, production-ready MFE App Shell that meets all these requirements with zero dead code, proper atomic design structure, comprehensive design system, full Vitest testing suite, and complete NPM package readiness.**
