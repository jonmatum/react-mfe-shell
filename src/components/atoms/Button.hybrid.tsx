/**
 * Enhanced Button Component - Hybrid Styling Support
 *
 * This version of the Button component supports multiple styling approaches:
 * 1. Tailwind CSS (when available)
 * 2. Standalone CSS classes
 * 3. CSS-in-JS for runtime styling
 */

import React, { useCallback } from 'react';
import { useComponentStyles, StyleMode } from '../../utils/styleAdapter';
import { LoadingSpinner } from './LoadingSpinner';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button variant */
  variant?:
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'success'
    | 'warning'
    | 'danger';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Show loading state */
  loading?: boolean;
  /** Make button full width */
  fullWidth?: boolean;
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Icon to display after text */
  iconRight?: React.ReactNode;
  /** Force specific styling mode */
  styleMode?: StyleMode;
  /** Additional CSS classes */
  className?: string;
  /** Children content */
  children?: React.ReactNode;
}

/**
 * Enhanced Button component with hybrid styling support
 */
export const Button = React.memo<ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled = false,
    icon,
    iconRight,
    styleMode,
    className,
    children,
    onClick,
    ...props
  }) => {
    // Build style variants array
    const styleVariants = ['base', `size-${size}`, `variant-${variant}`];

    // Get adaptive styles
    const { className: adaptiveClassName, style } = useComponentStyles(
      'button',
      styleVariants,
      className,
      styleMode
    );

    // Handle click events
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

    // Determine spinner size based on button size
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

    // Build final className
    const finalClassName = [
      adaptiveClassName,
      fullWidth && (styleMode === 'tailwind' ? 'w-full' : 'width: 100%'),
    ]
      .filter(Boolean)
      .join(' ');

    // Build final style object
    const finalStyle = {
      ...style,
      ...(fullWidth && styleMode === 'css-in-js' && { width: '100%' }),
    };

    return (
      <button
        className={finalClassName}
        style={Object.keys(finalStyle).length > 0 ? finalStyle : undefined}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <LoadingSpinner
            size={getSpinnerSize(size)}
            className={styleMode === 'tailwind' ? 'mr-2' : undefined}
            style={
              styleMode === 'css-in-js' ? { marginRight: '0.5rem' } : undefined
            }
          />
        )}

        {/* Left icon */}
        {!loading && icon && (
          <span
            className={styleMode === 'tailwind' ? 'mr-2' : undefined}
            style={
              styleMode === 'css-in-js' ? { marginRight: '0.5rem' } : undefined
            }
          >
            {icon}
          </span>
        )}

        {/* Button content */}
        {children && <span>{children}</span>}

        {/* Right icon */}
        {!loading && iconRight && (
          <span
            className={styleMode === 'tailwind' ? 'ml-2' : undefined}
            style={
              styleMode === 'css-in-js' ? { marginLeft: '0.5rem' } : undefined
            }
          >
            {iconRight}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
