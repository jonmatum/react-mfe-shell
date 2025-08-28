/** @type {import('tailwindcss').Config} */
// Import tokens from the built library
const { tokens } = require('./dist/index.cjs');

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './demo/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    // Override default Tailwind tokens with our design system
    extend: {
      // Colors from design tokens
      colors: {
        // Base colors
        ...tokens.colors.base,
        
        // Semantic colors
        primary: tokens.colors.semantic.primary,
        secondary: tokens.colors.semantic.secondary,
        success: tokens.colors.semantic.success,
        warning: tokens.colors.semantic.warning,
        error: tokens.colors.semantic.error,
        danger: tokens.colors.semantic.error, // Alias for error
        info: tokens.colors.semantic.info,
        
        // Theme-aware colors (CSS custom properties)
        background: {
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
          tertiary: 'var(--color-background-tertiary)',
        },
        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          tertiary: 'var(--color-surface-tertiary)',
          elevated: 'var(--color-surface-elevated)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
          disabled: 'var(--color-text-disabled)',
        },
        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          tertiary: 'var(--color-border-tertiary)',
          focus: 'var(--color-border-focus)',
        },
      },
      
      // Typography from design tokens
      fontFamily: tokens.typography.fontFamily,
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      letterSpacing: tokens.typography.letterSpacing,
      
      // Spacing from design tokens
      spacing: tokens.spacing,
      
      // Shadows from design tokens
      boxShadow: tokens.shadows.box,
      dropShadow: tokens.shadows.drop,
      
      // Border radius from design tokens
      borderRadius: tokens.borderRadius,
      
      // Explicit text colors to ensure semantic colors work
      textColor: {
        // Inherit all colors
        ...tokens.colors.base,
        
        // Semantic colors for text
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        tertiary: 'var(--color-text-tertiary)',
        inverse: 'var(--color-text-inverse)',
        disabled: 'var(--color-text-disabled)',
        
        // Brand colors for accent text
        'primary-50': tokens.colors.semantic.primary[50],
        'primary-100': tokens.colors.semantic.primary[100],
        'primary-200': tokens.colors.semantic.primary[200],
        'primary-300': tokens.colors.semantic.primary[300],
        'primary-400': tokens.colors.semantic.primary[400],
        'primary-500': tokens.colors.semantic.primary[500],
        'primary-600': tokens.colors.semantic.primary[600],
        'primary-700': tokens.colors.semantic.primary[700],
        'primary-800': tokens.colors.semantic.primary[800],
        'primary-900': tokens.colors.semantic.primary[900],
        
        // Other semantic colors
        success: tokens.colors.semantic.success[600],
        warning: tokens.colors.semantic.warning[600],
        error: tokens.colors.semantic.error[600],
        danger: tokens.colors.semantic.error[600],
      },
      
      // Breakpoints from design tokens
      screens: tokens.breakpoints,
      
      // Animation from design tokens
      transitionDuration: tokens.animation.duration,
      transitionTimingFunction: tokens.animation.timingFunction,
      
      // Z-index from design tokens
      zIndex: tokens.zIndex,
    },
  },
  safelist: [
    // Button variant classes - ensure these are always generated
    'bg-success-600',
    'bg-success-700',
    'bg-warning-600', 
    'bg-warning-700',
    'hover:bg-success-700',
    'hover:bg-warning-700',
    'dark:bg-success-500',
    'dark:bg-warning-500',
    'dark:hover:bg-success-600',
    'dark:hover:bg-warning-600',
    'text-white',
    'focus:ring-success-500',
    'focus:ring-warning-500',
    'dark:focus:ring-success-400',
    'dark:focus:ring-warning-400',
    
    // Badge variant classes - ensure these are always generated
    'bg-success-50',
    'bg-warning-50',
    'bg-error-50',
    'text-success-700',
    'text-warning-700',
    'text-error-700',
    'border-success-200',
    'border-warning-200',
    'border-error-200',
    'dark:bg-success-900/30',
    'dark:bg-warning-900/30',
    'dark:bg-error-900/30',
    'dark:text-success-300',
    'dark:text-warning-300',
    'dark:text-error-300',
    'dark:border-success-700/50',
    'dark:border-warning-700/50',
    'dark:border-error-700/50',
    
    // Badge remove button hover states
    'hover:bg-success-100',
    'hover:bg-warning-100',
    'hover:bg-error-100',
    'dark:hover:bg-success-800/50',
    'dark:hover:bg-warning-800/50',
    'dark:hover:bg-error-800/50',
    
    // Switch component classes - ensure these are always generated
    'bg-surface-secondary',
    'bg-primary-600',
    'bg-success-600',
    'bg-warning-600',
    'bg-danger-600',
    'focus:ring-primary-500',
    'focus:ring-success-500',
    'focus:ring-warning-500',
    'focus:ring-danger-500',
    
    // Switch size classes
    'h-5',
    'w-9',
    'h-6',
    'w-11',
    'h-8',
    'w-14',
    'h-4',
    'h-7',
    'translate-x-4',
    'translate-x-5',
    'translate-x-6',
    
    // LoadingSpinner component classes - ensure these are always generated
    // Size classes
    'h-3',
    'w-3',
    'h-4',
    'w-4',
    'h-8',
    'w-8',
    'h-12',
    'w-12',
    'h-16',
    'w-16',
    
    // Border and color classes with design tokens
    'border-surface-secondary',
    'border-t-primary-600',
    'border-t-text-secondary',
    'border-t-success-600',
    'border-t-warning-600',
    'border-t-danger-600',
    'border-white/30',
    'border-t-white',
    'border-current/30',
    'border-t-current',
    
    // Typography component classes - design system colors
    'bg-surface-primary',
    'bg-surface-secondary',
    'bg-surface-tertiary',
    'border-border-primary',
    'border-border-secondary',
    'text-primary',
    'text-secondary',
    'text-tertiary',
    'text-inverse',
    'text-disabled',
    'hover:bg-surface-tertiary',
    'hover:text-primary',
    
    // Primary color variants for accent text
    'text-primary-50',
    'text-primary-100',
    'text-primary-200',
    'text-primary-300',
    'text-primary-400',
    'text-primary-500',
    'text-primary-600',
    'text-primary-700',
    'text-primary-800',
    'text-primary-900',
    
    // Secondary color variants
    'text-secondary-50',
    'text-secondary-100',
    'text-secondary-200',
    'text-secondary-300',
    'text-secondary-400',
    'text-secondary-500',
    'text-secondary-600',
    'text-secondary-700',
    'text-secondary-800',
    'text-secondary-900',
    
    // Success color variants
    'text-success-50',
    'text-success-100',
    'text-success-200',
    'text-success-300',
    'text-success-400',
    'text-success-500',
    'text-success-600',
    'text-success-700',
    'text-success-800',
    'text-success-900',
    
    // Warning color variants
    'text-warning-50',
    'text-warning-100',
    'text-warning-200',
    'text-warning-300',
    'text-warning-400',
    'text-warning-500',
    'text-warning-600',
    'text-warning-700',
    'text-warning-800',
    'text-warning-900',
    
    // Error/Danger color variants
    'text-error-50',
    'text-error-100',
    'text-error-200',
    'text-error-300',
    'text-error-400',
    'text-error-500',
    'text-error-600',
    'text-error-700',
    'text-error-800',
    'text-error-900',
    'text-danger-50',
    'text-danger-100',
    'text-danger-200',
    'text-danger-300',
    'text-danger-400',
    'text-danger-500',
    'text-danger-600',
    'text-danger-700',
    'text-danger-800',
    'text-danger-900',
    
    // Typography size classes - ensure all sizes are available
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'text-6xl',
    'text-7xl',
    'text-8xl',
    'text-9xl',
    
    // Typography weight classes
    'font-thin',
    'font-extralight',
    'font-light',
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'font-extrabold',
    'font-black',
    
    // Typography alignment classes
    'text-left',
    'text-center',
    'text-right',
    'text-justify',
    'text-start',
    'text-end',
    
    // Typography transform classes
    'uppercase',
    'lowercase',
    'capitalize',
    
    // Typography decoration classes
    'underline',
    'overline',
    'line-through',
    'no-underline',
    
    // Typography whitespace classes
    'whitespace-normal',
    'whitespace-nowrap',
    'whitespace-pre',
    'whitespace-pre-line',
    'whitespace-pre-wrap',
    'whitespace-break-spaces',
    
    // Typography overflow classes
    'overflow-visible',
    'overflow-hidden',
    'text-clip',
    'text-ellipsis',
    'truncate',
    
    // Line clamp classes
    'line-clamp-1',
    'line-clamp-2',
    'line-clamp-3',
    'line-clamp-4',
    'line-clamp-5',
    'line-clamp-6',
    
    // Leading (line height) classes
    'leading-none',
    'leading-tight',
    'leading-snug',
    'leading-normal',
    'leading-relaxed',
    'leading-loose',
    
    // Tracking (letter spacing) classes
    'tracking-tighter',
    'tracking-tight',
    'tracking-normal',
    'tracking-wide',
    'tracking-wider',
    'tracking-widest',
    
    // Gradient text classes
    'bg-gradient-to-r',
    'bg-clip-text',
    'text-transparent',
    
    // Selection classes
    'select-none',
    'select-text',
    
    // Font family classes
    'font-mono',
    
    // Responsive prefixes for typography
    'sm:text-xs', 'sm:text-sm', 'sm:text-base', 'sm:text-lg', 'sm:text-xl', 'sm:text-2xl', 'sm:text-3xl', 'sm:text-4xl', 'sm:text-5xl', 'sm:text-6xl', 'sm:text-7xl', 'sm:text-8xl', 'sm:text-9xl',
    'md:text-xs', 'md:text-sm', 'md:text-base', 'md:text-lg', 'md:text-xl', 'md:text-2xl', 'md:text-3xl', 'md:text-4xl', 'md:text-5xl', 'md:text-6xl', 'md:text-7xl', 'md:text-8xl', 'md:text-9xl',
    'lg:text-xs', 'lg:text-sm', 'lg:text-base', 'lg:text-lg', 'lg:text-xl', 'lg:text-2xl', 'lg:text-3xl', 'lg:text-4xl', 'lg:text-5xl', 'lg:text-6xl', 'lg:text-7xl', 'lg:text-8xl', 'lg:text-9xl',
    'xl:text-xs', 'xl:text-sm', 'xl:text-base', 'xl:text-lg', 'xl:text-xl', 'xl:text-2xl', 'xl:text-3xl', 'xl:text-4xl', 'xl:text-5xl', 'xl:text-6xl', 'xl:text-7xl', 'xl:text-8xl', 'xl:text-9xl',
    '2xl:text-xs', '2xl:text-sm', '2xl:text-base', '2xl:text-lg', '2xl:text-xl', '2xl:text-2xl', '2xl:text-3xl', '2xl:text-4xl', '2xl:text-5xl', '2xl:text-6xl', '2xl:text-7xl', '2xl:text-8xl', '2xl:text-9xl',
    
    // Responsive font weights
    'sm:font-thin', 'sm:font-extralight', 'sm:font-light', 'sm:font-normal', 'sm:font-medium', 'sm:font-semibold', 'sm:font-bold', 'sm:font-extrabold', 'sm:font-black',
    'md:font-thin', 'md:font-extralight', 'md:font-light', 'md:font-normal', 'md:font-medium', 'md:font-semibold', 'md:font-bold', 'md:font-extrabold', 'md:font-black',
    'lg:font-thin', 'lg:font-extralight', 'lg:font-light', 'lg:font-normal', 'lg:font-medium', 'lg:font-semibold', 'lg:font-bold', 'lg:font-extrabold', 'lg:font-black',
    'xl:font-thin', 'xl:font-extralight', 'xl:font-light', 'xl:font-normal', 'xl:font-medium', 'xl:font-semibold', 'xl:font-bold', 'xl:font-extrabold', 'xl:font-black',
    '2xl:font-thin', '2xl:font-extralight', '2xl:font-light', '2xl:font-normal', '2xl:font-medium', '2xl:font-semibold', '2xl:font-bold', '2xl:font-extrabold', '2xl:font-black',
    
    // Responsive text alignment
    'sm:text-left', 'sm:text-center', 'sm:text-right', 'sm:text-justify', 'sm:text-start', 'sm:text-end',
    'md:text-left', 'md:text-center', 'md:text-right', 'md:text-justify', 'md:text-start', 'md:text-end',
    'lg:text-left', 'lg:text-center', 'lg:text-right', 'lg:text-justify', 'lg:text-start', 'lg:text-end',
    'xl:text-left', 'xl:text-center', 'xl:text-right', 'xl:text-justify', 'xl:text-start', 'xl:text-end',
    '2xl:text-left', '2xl:text-center', '2xl:text-right', '2xl:text-justify', '2xl:text-start', '2xl:text-end',
    
    // Paragraph spacing classes
    'mb-4',
    'last:mb-0',
    
    // Quote variant classes
    'italic',
    'border-l-4',
    'pl-4',
    
    // Code component icon classes
    'w-4',
    'h-4',
    'absolute',
    'top-2',
    'right-2',
    'p-1.5',
    'rounded',
    'transition-colors',
    
    // Responsive color variants for primary colors
    'sm:text-primary-600',
    'md:text-primary-600',
    'lg:text-primary-600',
    'xl:text-primary-600',
    '2xl:text-primary-600',
    
    // Dark mode variants for primary colors
    'dark:text-primary-400',
    'dark:text-primary-500',
    'dark:text-primary-600',
    
    // Hover states for colored text
    'hover:text-primary-700',
    'dark:hover:text-primary-300',
    
    // Input component classes - ensure these are always generated
    'border-border-primary',
    'bg-surface-primary',
    'text-text-primary',
    'placeholder-text-secondary',
    'focus:border-primary-500',
    'focus:ring-primary-500',
    'border-danger-500',
    'focus:border-danger-500',
    'focus:ring-danger-500',
    'border-success-500',
    'focus:border-success-500',
    'focus:ring-success-500',
    'bg-surface-disabled',
    'bg-surface-secondary',
    
    // Input size and padding classes
    'px-3',
    'py-2',
    'px-4',
    'py-2.5',
    'py-3',
    'pl-10',
    'pr-10',
    'pl-11',
    'pr-11',
    'pl-12',
    'pr-12',
    
    // Textarea resize classes
    'resize-none',
    'resize-y',
    'resize-x',
    'resize',
    'overflow-hidden',
    
    // Icon positioning classes
    'absolute',
    'inset-y-0',
    'left-0',
    'right-0',
    'left-3',
    'right-3',
    'flex',
    'items-center',
    'pointer-events-none',
    'pointer-events-auto',
    
    // Focus ring classes
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-1',
    
    // Transition classes
    'transition-colors',
    'duration-200',
  ],
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
