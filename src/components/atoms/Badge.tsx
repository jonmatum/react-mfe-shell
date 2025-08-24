import { forwardRef, useCallback } from 'react';
import { BadgeProps, BADGE_VARIANTS, BADGE_SIZES } from '../../types';
import { classNames } from '../../utils';
import {
  createSemanticColorVariant,
  createAriaLabel,
  createSemanticFocusRing,
  BASE_INTERACTIVE_CLASSES,
} from '../../utils/componentUtils';

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
    const baseClasses =
      'inline-flex items-center font-medium rounded-full transition-colors duration-200';

    // DRY variant classes using utility functions
    const variantClasses = {
      default:
        'bg-surface-secondary text-text-primary border border-border-primary',
      primary: createSemanticColorVariant('primary', 'soft'),
      secondary:
        'bg-surface-tertiary text-text-secondary border border-border-secondary',
      success: createSemanticColorVariant('success', 'soft'),
      warning: createSemanticColorVariant('warning', 'soft'),
      danger: createSemanticColorVariant('danger', 'soft'),
    };

    // DRY size classes - simplified implementation
    const getSizeClasses = (size: string, isDot: boolean) => {
      if (isDot) {
        const dotSizes = {
          sm: 'w-2 h-2',
          md: 'w-2.5 h-2.5',
          lg: 'w-3 h-3',
        };
        return dotSizes[size as keyof typeof dotSizes] || dotSizes.md;
      }

      const badgeSizes = {
        sm: 'px-2 py-0.5 text-xs gap-1',
        md: 'px-2.5 py-0.5 text-sm gap-1',
        lg: 'px-3 py-1 text-sm gap-1.5',
      };
      return badgeSizes[size as keyof typeof badgeSizes] || badgeSizes.md;
    };

    const sizeClasses = getSizeClasses(size, dot);

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
      const baseRemoveClasses = `ml-1 ${BASE_INTERACTIVE_CLASSES} rounded-full focus:ring-offset-transparent`;

      const variantRemoveClasses = {
        default: 'hover:bg-surface-tertiary focus:ring-border-focus',
        primary: `hover:bg-primary-100 ${createSemanticFocusRing('primary')} dark:hover:bg-primary-800/50`,
        secondary: 'hover:bg-surface-primary focus:ring-border-focus',
        success: `hover:bg-success-100 ${createSemanticFocusRing('success')} dark:hover:bg-success-800/50`,
        warning: `hover:bg-warning-100 ${createSemanticFocusRing('warning')} dark:hover:bg-warning-800/50`,
        danger: `hover:bg-error-100 ${createSemanticFocusRing('danger')} dark:hover:bg-error-800/50`,
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
      'aria-label': createAriaLabel(children, { fallback: 'Status indicator' }),
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
            aria-label={createAriaLabel(children, {
              prefix: 'Remove',
              fallback: 'badge',
            })}
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
(
  Badge as typeof Badge & {
    variants: typeof BADGE_VARIANTS;
    sizes: typeof BADGE_SIZES;
  }
).variants = BADGE_VARIANTS;
(
  Badge as typeof Badge & {
    variants: typeof BADGE_VARIANTS;
    sizes: typeof BADGE_SIZES;
  }
).sizes = BADGE_SIZES;

export default Badge;
