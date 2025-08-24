import React, { forwardRef, useCallback } from 'react';
import {
  ButtonProps,
  ButtonGroupProps,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
} from '../../types';
import { classNames } from '../../utils';
import {
  createSemanticColorVariant,
  createSizeClasses,
  createAriaAttributes,
  createSemanticFocusRing,
  BASE_INTERACTIVE_CLASSES,
  SURFACE_VARIANTS,
  INTERACTIVE_STATES,
} from '../../utils/componentUtils';
import LoadingSpinner from './LoadingSpinner';

// Button component implementation
const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      as: Component = 'button',
      ...props
    },
    ref
  ) => {
    const baseClasses = `${BASE_INTERACTIVE_CLASSES} rounded-md font-medium ${INTERACTIVE_STATES.disabled}`;

    // DRY variant classes using utility functions
    const variantClasses = {
      primary: createSemanticColorVariant('primary', 'solid'),
      secondary: `${SURFACE_VARIANTS.secondary} ${INTERACTIVE_STATES.hover} ${createSemanticFocusRing('primary')}`,
      ghost: `text-text-primary ${INTERACTIVE_STATES.hover} ${createSemanticFocusRing('primary')}`,
      danger: createSemanticColorVariant('danger', 'solid'),
      success: createSemanticColorVariant('success', 'solid'),
      warning: createSemanticColorVariant('warning', 'solid'),
    };

    // DRY size classes using utility function
    const sizeClasses = createSizeClasses(size, {
      customPadding: {
        xs: 'px-2.5 py-1.5',
        sm: 'px-3 py-2',
        md: 'px-4 py-2.5',
        lg: 'px-6 py-3',
        xl: 'px-8 py-4',
      },
      customText: {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
      },
    });

    const widthClasses = fullWidth ? 'w-full' : '';

    const { onClick } = props;

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (loading || disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      },
      [loading, disabled, onClick]
    );

    // DRY ARIA attributes generation
    const ariaAttributes = createAriaAttributes({
      disabled: disabled || loading,
      loading,
      label: (props as Record<string, unknown>)['aria-label'] as string | undefined,
      describedBy: (props as Record<string, unknown>)['aria-describedby'] as string | undefined,
    });

    // DRY spinner size mapping
    const getSpinnerSize = (buttonSize: string): 'sm' | 'md' | 'lg' => {
      const sizeMap: Record<string, 'sm' | 'md' | 'lg'> = {
        xs: 'sm',
        sm: 'sm',
        md: 'md',
        lg: 'md',
        xl: 'lg',
      };
      return sizeMap[buttonSize] || 'md';
    };

    const buttonProps = {
      ref,
      className: classNames(
        baseClasses,
        variantClasses[variant],
        sizeClasses,
        widthClasses,
        className
      ),
      disabled: disabled || loading,
      onClick: handleClick,
      ...ariaAttributes,
      ...props,
    };

    return (
      <Component {...buttonProps}>
        {loading && (
          <LoadingSpinner
            size={getSpinnerSize(size)}
            className='text-current'
          />
        )}
        {!loading && leftIcon && (
          <span className='flex-shrink-0' aria-hidden='true'>
            {leftIcon}
          </span>
        )}
        <span className={loading ? 'opacity-0' : ''}>{children}</span>
        {!loading && rightIcon && (
          <span className='flex-shrink-0' aria-hidden='true'>
            {rightIcon}
          </span>
        )}
      </Component>
    );
  }
);

ButtonComponent.displayName = 'Button';

// Button Group component for compound pattern
const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      className,
      orientation = 'horizontal',
      spacing = 'none',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'inline-flex';

    // DRY orientation and spacing classes
    const orientationClasses = {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    };

    const spacingClasses = {
      none: orientation === 'horizontal' ? 'space-x-0' : 'space-y-0',
      sm: orientation === 'horizontal' ? 'space-x-1' : 'space-y-1',
      md: orientation === 'horizontal' ? 'space-x-2' : 'space-y-2',
      lg: orientation === 'horizontal' ? 'space-x-4' : 'space-y-4',
    };

    return (
      <div
        ref={ref}
        className={classNames(
          baseClasses,
          orientationClasses[orientation],
          spacingClasses[spacing],
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

ButtonGroup.displayName = 'ButtonGroup';

// Export the main Button component with compound pattern
const Button = ButtonComponent as typeof ButtonComponent & {
  Group: typeof ButtonGroup;
  variants: typeof BUTTON_VARIANTS;
  sizes: typeof BUTTON_SIZES;
};

// Compound component pattern
Button.Group = ButtonGroup;
Button.variants = BUTTON_VARIANTS;
Button.sizes = BUTTON_SIZES;

export default Button;
