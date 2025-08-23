import React, { memo } from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

/**
 * A flexible badge component for status indicators, labels, and tags
 *
 * @example
 * ```tsx
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" dot>Pending</Badge>
 * <Badge variant="danger" removable onRemove={handleRemove}>Error</Badge>
 * ```
 */
const Badge = memo<BadgeProps>(
  ({
    children,
    className,
    variant = 'default',
    size = 'md',
    dot = false,
    removable = false,
    onRemove,
    ...props
  }) => {
    const baseClasses = 'inline-flex items-center font-medium rounded-full';

    const variantClasses = {
      default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
      primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      secondary:
        'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
      success:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      warning:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
      danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
    };

    const sizeClasses = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-sm',
      lg: 'px-3 py-1 text-sm',
    };

    const dotClasses = {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    };

    const dotColorClasses = {
      default: 'bg-gray-400',
      primary: 'bg-blue-400',
      secondary: 'bg-gray-400',
      success: 'bg-green-400',
      warning: 'bg-yellow-400',
      danger: 'bg-red-400',
    };

    return (
      <span
        className={classNames(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <span
            className={classNames(
              'rounded-full mr-1.5',
              dotClasses[size],
              dotColorClasses[variant]
            )}
          />
        )}

        {/* Content */}
        {children}

        {/* Remove button */}
        {removable && onRemove && (
          <button
            type='button'
            className={classNames(
              'ml-1 inline-flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 focus:outline-none focus:bg-black focus:bg-opacity-10 transition-colors',
              size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
            )}
            onClick={onRemove}
            aria-label='Remove badge'
          >
            <svg
              className={classNames(
                'fill-current',
                size === 'sm'
                  ? 'h-2 w-2'
                  : size === 'md'
                    ? 'h-3 w-3'
                    : 'h-4 w-4'
              )}
              viewBox='0 0 20 20'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

// Export constants for external use (defined after component to avoid fast-refresh warnings)
const BADGE_VARIANTS = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
] as const;
const BADGE_SIZES = ['sm', 'md', 'lg'] as const;

// Define the component type with constants
interface BadgeComponent extends React.NamedExoticComponent<BadgeProps> {
  variants: typeof BADGE_VARIANTS;
  sizes: typeof BADGE_SIZES;
}

const BadgeWithConstants = Badge as BadgeComponent;
BadgeWithConstants.variants = BADGE_VARIANTS;
BadgeWithConstants.sizes = BADGE_SIZES;

export default BadgeWithConstants;
