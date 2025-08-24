import { forwardRef, useCallback } from 'react';
import { BadgeProps, BADGE_VARIANTS, BADGE_SIZES } from '../../types';
import { classNames } from '../../utils';

// =============================================================================
// DRY UTILITIES - Shared across components
// =============================================================================

/**
 * Generates theme-aware variant classes for semantic colors
 * Eliminates duplication across color variants
 */
const createSemanticVariant = (colorName: string) => {
  const baseColor = colorName === 'danger' ? 'error' : colorName;
  return `bg-${baseColor}-50 text-${baseColor}-700 border border-${baseColor}-200 dark:bg-${baseColor}-900/30 dark:text-${baseColor}-300 dark:border-${baseColor}-700/50`;
};

/**
 * Generates theme-aware remove button classes for semantic colors
 * Eliminates duplication in interactive states
 */
const createRemoveButtonVariant = (colorName: string) => {
  const baseColor = colorName === 'danger' ? 'error' : colorName;
  return `hover:bg-${baseColor}-100 focus:ring-${baseColor}-500 dark:hover:bg-${baseColor}-800/50 dark:focus:ring-${baseColor}-400`;
};

/**
 * Generates size-based classes with conditional logic
 * Eliminates duplication in size mappings
 */
const createSizeClasses = (size: string, isDot: boolean) => {
  const sizeMap = {
    sm: { dot: 'w-2 h-2', badge: 'px-2 py-0.5 text-xs gap-1', icon: 'w-3 h-3' },
    md: {
      dot: 'w-2.5 h-2.5',
      badge: 'px-2.5 py-0.5 text-sm gap-1',
      icon: 'w-3.5 h-3.5',
    },
    lg: { dot: 'w-3 h-3', badge: 'px-3 py-1 text-sm gap-1.5', icon: 'w-4 h-4' },
  };

  return (
    sizeMap[size as keyof typeof sizeMap]?.[isDot ? 'dot' : 'badge'] ||
    sizeMap.md[isDot ? 'dot' : 'badge']
  );
};

/**
 * Generates accessible aria-label with consistent logic
 * Eliminates duplication in accessibility attributes
 */
const createAriaLabel = (
  children: React.ReactNode,
  prefix = '',
  fallback = 'Status indicator'
) => {
  const text = typeof children === 'string' ? children : fallback;
  return prefix ? `${prefix} ${text}` : text;
};

// =============================================================================
// COMPONENT IMPLEMENTATION
// =============================================================================

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className,
      variant = 'default',
      size = 'md',
      dot = false,
      removable = false,
      onRemove,
      as: Component = 'span',
      ...props
    },
    ref
  ) => {
    // Base classes - shared foundation
    const baseClasses =
      'inline-flex items-center font-medium rounded-full transition-colors duration-200';

    // DRY variant classes using utility functions
    const variantClasses = {
      default:
        'bg-surface-secondary text-text-primary border border-border-primary',
      primary: createSemanticVariant('primary'),
      secondary:
        'bg-surface-tertiary text-text-secondary border border-border-secondary',
      success: createSemanticVariant('success'),
      warning: createSemanticVariant('warning'),
      danger: createSemanticVariant('danger'),
    };

    // DRY size classes using utility function
    const sizeClasses = createSizeClasses(size, dot);

    // Memoized remove handler
    const handleRemove = useCallback(
      (event: React.MouseEvent) => {
        event.stopPropagation();
        onRemove?.();
      },
      [onRemove]
    );

    // DRY remove button classes generator
    const getRemoveButtonClasses = (variant: BadgeProps['variant']) => {
      const baseRemoveClasses =
        'ml-1 inline-flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent';

      const variantRemoveClasses = {
        default: 'hover:bg-surface-tertiary focus:ring-border-focus',
        primary: createRemoveButtonVariant('primary'),
        secondary: 'hover:bg-surface-primary focus:ring-border-focus',
        success: createRemoveButtonVariant('success'),
        warning: createRemoveButtonVariant('warning'),
        danger: createRemoveButtonVariant('danger'),
      };

      return classNames(
        baseRemoveClasses,
        variantRemoveClasses[variant || 'default']
      );
    };

    // DRY icon size mapping
    const getIconSize = (size: string) => {
      const sizeMap = { sm: 'w-3 h-3', md: 'w-3.5 h-3.5', lg: 'w-4 h-4' };
      return sizeMap[size as keyof typeof sizeMap] || sizeMap.md;
    };

    // DRY component props generation
    const getComponentProps = () => ({
      ref,
      className: classNames(
        dot ? 'rounded-full' : baseClasses,
        variantClasses[variant],
        sizeClasses,
        className
      ),
      role: 'status',
      'aria-label': createAriaLabel(children),
      ...props,
    });

    // Early return for dot variant
    if (dot) {
      return <Component {...getComponentProps()} />;
    }

    // Main badge component
    return (
      <Component {...getComponentProps()}>
        {children}
        {removable && (
          <button
            type='button'
            onClick={handleRemove}
            className={classNames(
              getRemoveButtonClasses(variant),
              getIconSize(size)
            )}
            aria-label={createAriaLabel(children, 'Remove', 'badge')}
            tabIndex={0}
          >
            <svg
              className='w-full h-full'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </Component>
    );
  }
);

Badge.displayName = 'Badge';

// Static properties
(Badge as any).variants = BADGE_VARIANTS;
(Badge as any).sizes = BADGE_SIZES;

export default Badge;
