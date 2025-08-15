# **PERFECTED MFE APP SHELL GENERATION PROMPT**

## **Project Overview**

Create a **production-ready micro frontend (MFE) app shell** that achieves **98%+ quality score** with zero dead code, perfect atomic design structure, comprehensive design system, and complete NPM package readiness. This prompt is optimized based on analysis of existing high-quality MFE implementations and incorporates lessons learned from real-world production usage.

## **QUALITY TARGETS (Non-Negotiable)**

### **Code Quality Metrics**
- **Overall Test Coverage**: 95%+ (branches, functions, lines, statements)
- **Component Coverage**: 98%+ for atoms, 95%+ for molecules, 90%+ for organisms
- **TypeScript Strict Mode**: 100% compliance with no `any` types
- **Bundle Size**: <45KB gzipped (optimized from current 296KB)
- **Performance Score**: 98%+ Lighthouse
- **Accessibility**: WCAG AAA compliance (upgraded from AA)
- **DRY Compliance**: 98%+ (zero hardcoded values, complete token usage)

### **Architecture Excellence**
- **Zero Circular Dependencies**: Enforced via ESLint rules
- **Perfect Tree Shaking**: All exports properly marked as side-effect free
- **Memory Leak Prevention**: Proper cleanup in all hooks and components
- **Error Boundary Coverage**: 100% of async operations and user interactions

## **ENHANCED ATOMIC DESIGN ARCHITECTURE**

### **Atoms (25+ Components) - 98%+ Test Coverage Required**

```typescript
src/components/atoms/
├── Button.tsx              # 8 variants, loading states, accessibility
├── IconButton.tsx          # Icon-only with tooltip integration
├── Badge.tsx               # 6 semantic variants with animations
├── Avatar.tsx              # Fallback system, lazy loading, status indicators
├── LoadingSpinner.tsx      # 4 sizes, customizable colors, reduced motion
├── Switch.tsx              # Smooth animations, keyboard navigation
├── NavigationLink.tsx      # Active states, prefetch, analytics hooks
├── Card.tsx                # Elevation system, hover effects, responsive
├── Text.tsx                # Complete typography scale, semantic variants
├── Heading.tsx             # SEO-optimized, automatic anchor links
├── Stack.tsx               # Flexible spacing, responsive gaps
├── Grid.tsx                # CSS Grid with fallbacks, responsive columns
├── Input.tsx               # Validation states, accessibility labels
├── Select.tsx              # Custom dropdown, keyboard navigation
├── Checkbox.tsx            # Indeterminate state, group management
├── Radio.tsx               # Group context, keyboard navigation
├── Tooltip.tsx             # Smart positioning, touch support
├── Skeleton.tsx            # Content-aware loading states
├── Divider.tsx             # Horizontal/vertical, with labels
├── Tag.tsx                 # Removable, color variants, size options
├── ProgressBar.tsx         # Determinate/indeterminate, accessibility
├── StatusDot.tsx           # Real-time status indicators
├── Link.tsx                # External link detection, security
├── Image.tsx               # Lazy loading, error states, aspect ratios
├── Icon.tsx                # Heroicons wrapper with size variants
└── Portal.tsx              # Teleport components, z-index management
```

### **Molecules (12+ Components) - 95%+ Test Coverage Required**

```typescript
src/components/molecules/
├── Modal.tsx               # Focus trap, escape handling, backdrop
├── Dropdown.tsx            # Smart positioning, virtual scrolling
├── UserMenu.tsx            # Profile management, logout handling
├── NavigationDropdown.tsx  # Multi-level, keyboard navigation
├── SearchBox.tsx           # Debounced input, results preview
├── Pagination.tsx          # Accessible, customizable page sizes
├── Breadcrumbs.tsx         # Auto-generation, overflow handling
├── AlertDialog.tsx         # Confirmation patterns, custom actions
├── Toast.tsx               # Queue management, auto-dismiss
├── FileUpload.tsx          # Drag & drop, progress tracking
├── DatePicker.tsx          # Accessible calendar, range selection
└── FormField.tsx           # Label, error, help text composition
```

### **Organisms (6+ Components) - 90%+ Test Coverage Required**

```typescript
src/components/organisms/
├── Navigation.tsx          # Responsive, multi-level, search integration
├── Header.tsx              # Sticky behavior, responsive breakpoints
├── Sidebar.tsx             # Collapsible, persistent state
├── DataTable.tsx           # Sorting, filtering, virtual scrolling
├── SettingsPanel.tsx       # Tabbed interface, form validation
└── NotificationCenter.tsx  # Real-time updates, categorization
```

## **PERFECTED DESIGN SYSTEM**

### **Enhanced Token System**

```typescript
// src/design-system/tokens.ts
export const designTokens = {
  // Color system with semantic meaning
  colors: {
    primary: {
      50: 'var(--color-primary-50, #eef2ff)',
      100: 'var(--color-primary-100, #e0e7ff)',
      // ... complete scale with CSS custom properties
      DEFAULT: 'var(--color-primary-500, #6366f1)',
    },
    semantic: {
      success: 'var(--color-success, #10b981)',
      warning: 'var(--color-warning, #f59e0b)',
      error: 'var(--color-error, #ef4444)',
      info: 'var(--color-info, #3b82f6)',
    },
    surface: {
      background: 'var(--color-background)',
      foreground: 'var(--color-foreground)',
      muted: 'var(--color-muted)',
      accent: 'var(--color-accent)',
    }
  },
  
  // Spacing system with consistent ratios
  spacing: {
    0: '0',
    px: '1px',
    0.5: '0.125rem', // 2px
    1: '0.25rem',    // 4px
    // ... complete scale following 4px base unit
  },
  
  // Typography with fluid scaling
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      // ... with line heights and letter spacing
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    }
  },
  
  // Animation system
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    }
  },
  
  // Breakpoint system
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  }
} as const;
```

### **Component Variant System**

```typescript
// src/design-system/variants.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center rounded-md text-sm font-medium',
    'transition-colors focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 rounded-md px-3',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

## **🧪 COMPREHENSIVE TESTING STRATEGY**

### **Test Architecture**

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';

// Global test setup
beforeEach(() => {
  // Mock IntersectionObserver
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  
  // Mock ResizeObserver
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));
  
  // Mock matchMedia
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
```

### **Component Testing Patterns**

```typescript
// src/components/atoms/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders with correct text', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('applies variant styles correctly', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents clicks when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button disabled onClick={handleClick}>Disabled</Button>);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      
      render(<Button onClick={handleClick}>Keyboard accessible</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('has proper ARIA attributes', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });
});
```

### **Integration Testing**

```typescript
// src/test/integration/navigation.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppShell } from '../components/pages/AppShell';
import { mockAppShellConfig } from './mocks/config';

describe('Navigation Integration', () => {
  it('navigates through multi-level menu', async () => {
    const user = userEvent.setup();
    
    render(<AppShell config={mockAppShellConfig} />);
    
    // Open dropdown
    const dropdown = screen.getByRole('button', { name: /products/i });
    await user.click(dropdown);
    
    // Navigate to submenu
    const submenu = screen.getByRole('menuitem', { name: /web apps/i });
    await user.hover(submenu);
    
    // Click final item
    const finalItem = screen.getByRole('menuitem', { name: /react apps/i });
    await user.click(finalItem);
    
    // Verify navigation occurred
    expect(mockAppShellConfig.onNavigate).toHaveBeenCalledWith('/products/web-apps/react');
  });
});
```

## **PERFORMANCE OPTIMIZATION**

### **Bundle Optimization**

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  external: [
    'react',
    'react-dom',
    '@heroicons/react',
  ],
  esbuildOptions: {
    banner: {
      js: '"use client"',
    },
    jsx: 'automatic',
    target: 'es2020',
    treeShaking: true,
  },
  onSuccess: 'echo "Build completed successfully"',
});
```

### **Code Splitting Strategy**

```typescript
// src/components/lazy/index.ts
import { lazy } from 'react';

// Lazy load heavy components
export const SettingsModal = lazy(() => 
  import('../organisms/SettingsModal').then(module => ({
    default: module.SettingsModal
  }))
);

export const DataTable = lazy(() =>
  import('../organisms/DataTable').then(module => ({
    default: module.DataTable
  }))
);

// Preload critical components
export const preloadCriticalComponents = () => {
  import('../organisms/Navigation');
  import('../molecules/UserMenu');
};
```

### **Memory Management**

```typescript
// src/hooks/useMemoryOptimized.ts
import { useCallback, useRef, useEffect } from 'react';

export function useMemoryOptimizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  const callbackRef = useRef<T>(callback);
  
  useEffect(() => {
    callbackRef.current = callback;
  });
  
  return useCallback(
    ((...args) => callbackRef.current(...args)) as T,
    deps
  );
}

export function useCleanupEffect(cleanup: () => void, deps: React.DependencyList) {
  useEffect(() => {
    return cleanup;
  }, deps);
}
```

## **SECURITY & ACCESSIBILITY**

### **Security Headers**

```typescript
// src/utils/security.ts
export const securityHeaders = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export function sanitizeHtml(html: string): string {
  // Implement HTML sanitization
  return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}
```

### **Accessibility Utilities**

```typescript
// src/utils/accessibility.ts
export function announceToScreenReader(message: string) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  function handleTabKey(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  }
  
  element.addEventListener('keydown', handleTabKey);
  firstElement.focus();
  
  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
}
```

## **NPM PACKAGE OPTIMIZATION**

### **Package.json Configuration**

```json
{
  "name": "mfe-appshell",
  "version": "1.0.0",
  "description": "Production-ready micro frontend app shell with 98%+ quality score",
  "main": "dist/index.cjs",
  "module": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": "./dist/styles.css",
    "./tokens": {
      "types": "./dist/tokens.d.ts",
      "import": "./dist/tokens.js",
      "require": "./dist/tokens.cjs"
    }
  },
  "files": [
    "dist",
    "README.md",
    "CHANGELOG.md"
  ],
  "sideEffects": false,
  "keywords": [
    "micro-frontend",
    "mfe",
    "app-shell",
    "react",
    "typescript",
    "tailwind",
    "design-system",
    "accessibility",
    "performance"
  ],
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "peerDependencies": {
    "@heroicons/react": "^2.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "peerDependenciesMeta": {
    "@heroicons/react": {
      "optional": false
    }
  }
}
```

## **DEVELOPMENT EXPERIENCE**

### **Enhanced Developer Tools**

```typescript
// src/dev/DevTools.tsx
import React, { useState } from 'react';
import { useDesignTokens } from '../hooks/useDesignTokens';

export function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const tokens = useDesignTokens();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white p-2 rounded-full shadow-lg"
      >
        Settings
      </button>
      
      {isOpen && (
        <div className="absolute bottom-12 right-0 bg-white shadow-xl rounded-lg p-4 w-80 max-h-96 overflow-auto">
          <h3 className="font-bold mb-2">Design System Inspector</h3>
          
          <div className="space-y-2">
            <details>
              <summary>Colors</summary>
              <div className="grid grid-cols-4 gap-1 mt-2">
                {Object.entries(tokens.colors.primary).map(([key, value]) => (
                  <div
                    key={key}
                    className={`w-8 h-8 rounded bg-${value} border`}
                    title={`${key}: ${value}`}
                  />
                ))}
              </div>
            </details>
            
            <details>
              <summary>Typography</summary>
              <div className="space-y-1 mt-2">
                {Object.entries(tokens.typography.fontSize).map(([key, value]) => (
                  <div key={key} className={`text-${key}`}>
                    {key}: The quick brown fox
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
}
```

### **Storybook Integration**

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-design-tokens',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  features: {
    buildStoriesJson: true,
  },
};

export default config;
```

## **SUCCESS CRITERIA**

### **Quality Gates (All Must Pass)**

1. **Test Coverage**: 95%+ overall, 98%+ for atoms
2. **Bundle Size**: <45KB gzipped
3. **Performance**: 98%+ Lighthouse score
4. **Accessibility**: WCAG AAA compliance
5. **TypeScript**: Strict mode, zero `any` types
6. **ESLint**: Zero warnings or errors
7. **Visual Regression**: All components pixel-perfect
8. **Memory Leaks**: Zero detected in 24-hour stress test

### **Documentation Requirements**

1. **API Documentation**: 100% of public APIs documented
2. **Usage Examples**: Every component has working examples
3. **Migration Guide**: Clear upgrade paths
4. **Performance Guide**: Optimization recommendations
5. **Accessibility Guide**: WCAG compliance details

### **Deliverables Checklist**

- [ ] Complete source code with atomic structure
- [ ] Comprehensive test suite (95%+ coverage)
- [ ] Production build configuration
- [ ] NPM package ready for publishing
- [ ] Storybook with all components
- [ ] Complete documentation
- [ ] Performance benchmarks
- [ ] Security audit report
- [ ] Accessibility compliance report
- [ ] Demo application

## **IMPLEMENTATION PRIORITIES**

### **Phase 1: Foundation (Week 1)**
- Core atomic components (Button, Input, Text, etc.)
- Design system tokens and variants
- Basic testing infrastructure
- TypeScript configuration

### **Phase 2: Composition (Week 2)**
- Molecule components (Modal, Dropdown, etc.)
- Layout system (Stack, Grid, Container)
- Advanced testing patterns
- Accessibility implementation

### **Phase 3: Integration (Week 3)**
- Organism components (Navigation, Header, etc.)
- Theme system and context
- Performance optimization
- Error boundaries

### **Phase 4: Polish (Week 4)**
- Documentation and examples
- Bundle optimization
- Security hardening
- Final testing and QA

---

**Generate a complete, production-ready MFE App Shell that exceeds all quality targets, incorporates lessons learned from existing implementations, and sets the new standard for micro frontend architecture.**
