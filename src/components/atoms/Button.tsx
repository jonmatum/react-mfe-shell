import React, { memo } from 'react';
import {
  ButtonProps,
  ButtonGroupProps,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
} from '../../types';
import { classNames } from '../../utils';
import LoadingSpinner from './LoadingSpinner';

/**
 * A flexible button component with multiple variants, sizes, and states
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" onClick={handleClick}>
 *   Click me
 * </Button>
 *
 * <Button variant="danger" loading leftIcon={<TrashIcon />}>
 *   Delete
 * </Button>
 * ```
 */
const Button = memo<ButtonProps>(
  ({
    children,
    className,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    leftIcon,
    rightIcon,
    onClick,
    type = 'button',
    fullWidth = false,
    ...props
  }) => {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
      primary:
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
      secondary:
        'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      ghost:
        'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
      success:
        'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
      warning:
        'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800',
    };

    const sizeClasses = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
      xl: 'px-8 py-4 text-lg',
    };

    const isDisabled = disabled || loading;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled && onClick) {
        onClick(event);
      }
    };

    return (
      <button
        type={type}
        className={classNames(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        onClick={handleClick}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <LoadingSpinner
            size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
            className='mr-2'
          />
        )}
        {!loading && leftIcon && (
          <span className='mr-2 flex-shrink-0'>{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className='ml-2 flex-shrink-0'>{rightIcon}</span>
        )}
      </button>
    );
  }
);

/**
 * Button Group component for grouping related buttons
 *
 * @example
 * ```tsx
 * <Button.Group attached>
 *   <Button variant="secondary">Left</Button>
 *   <Button variant="secondary">Middle</Button>
 *   <Button variant="primary">Right</Button>
 * </Button.Group>
 * ```
 */
const ButtonGroup = memo<ButtonGroupProps>(
  ({
    children,
    className,
    orientation = 'horizontal',
    spacing = 'sm',
    attached = false,
    ...props
  }) => {
    const baseClasses = 'inline-flex';

    const orientationClasses = {
      horizontal: attached ? 'flex-row' : 'flex-row',
      vertical: attached ? 'flex-col' : 'flex-col',
    };

    const spacingClasses = {
      none: '',
      sm: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
      md: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
      lg: orientation === 'horizontal' ? 'space-x-6' : 'space-y-6',
    };

    const attachedClasses = attached
      ? orientation === 'horizontal'
        ? '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:first-child)]:-ml-px'
        : '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:first-child)]:-mt-px'
      : '';

    return (
      <div
        className={classNames(
          baseClasses,
          orientationClasses[orientation],
          !attached && spacingClasses[spacing],
          attached && attachedClasses,
          className
        )}
        role='group'
        {...props}
      >
        {children}
      </div>
    );
  }
);

Button.displayName = 'Button';
ButtonGroup.displayName = 'ButtonGroup';

// Define the compound component type
interface ButtonComponent extends React.NamedExoticComponent<ButtonProps> {
  Group: typeof ButtonGroup;
  variants: typeof BUTTON_VARIANTS;
  sizes: typeof BUTTON_SIZES;
}

// Compound component pattern
const ButtonWithCompounds = Button as ButtonComponent;
ButtonWithCompounds.Group = ButtonGroup;

// Export constants for external use
ButtonWithCompounds.variants = BUTTON_VARIANTS;
ButtonWithCompounds.sizes = BUTTON_SIZES;

export default ButtonWithCompounds;
