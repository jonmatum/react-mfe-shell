import React, { forwardRef, useRef, useEffect } from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/solid';
import { CheckboxProps } from '../../types';
import { classNames, generateId } from '../../utils';
import Label from '../atoms/Label';

/**
 * Checkbox component with indeterminate state support and accessibility features
 * 
 * @example
 * ```tsx
 * <Checkbox
 *   checked={isChecked}
 *   onChange={setIsChecked}
 *   label="Accept terms and conditions"
 *   description="By checking this box, you agree to our terms"
 *   required
 * />
 * ```
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked = false,
      onChange,
      indeterminate = false,
      value,
      label,
      description,
      error,
      required = false,
      disabled = false,
      size = 'md',
      color = 'primary',
      className,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const fieldId = id || generateId('checkbox');
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    // Handle indeterminate state
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate, inputRef]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event.target.checked);
    };

    const sizeClasses = {
      sm: {
        checkbox: 'w-4 h-4',
        icon: 'w-3 h-3',
        text: 'text-sm',
        spacing: 'gap-2',
      },
      md: {
        checkbox: 'w-5 h-5',
        icon: 'w-4 h-4',
        text: 'text-sm',
        spacing: 'gap-3',
      },
      lg: {
        checkbox: 'w-6 h-6',
        icon: 'w-5 h-5',
        text: 'text-base',
        spacing: 'gap-3',
      },
    };

    const colorClasses = {
      primary: {
        checked: 'bg-primary-600 border-primary-600',
        unchecked: 'border-border-primary',
        focus: 'focus:ring-primary-500',
        icon: 'text-white',
      },
      success: {
        checked: 'bg-success-600 border-success-600',
        unchecked: 'border-border-primary',
        focus: 'focus:ring-success-500',
        icon: 'text-white',
      },
      warning: {
        checked: 'bg-warning-600 border-warning-600',
        unchecked: 'border-border-primary',
        focus: 'focus:ring-warning-500',
        icon: 'text-white',
      },
      danger: {
        checked: 'bg-danger-600 border-danger-600',
        unchecked: 'border-border-primary',
        focus: 'focus:ring-danger-500',
        icon: 'text-white',
      },
    };

    const baseClasses = 'rounded border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const stateClasses = (checked || indeterminate)
      ? colorClasses[color].checked
      : colorClasses[color].unchecked;

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer hover:border-border-hover';

    const errorClasses = error
      ? 'border-danger-500 focus:ring-danger-500'
      : colorClasses[color].focus;

    const renderIcon = () => {
      if (indeterminate) {
        return (
          <MinusIcon
            className={classNames(
              sizeClasses[size].icon,
              colorClasses[color].icon
            )}
            aria-hidden="true"
          />
        );
      }
      
      if (checked) {
        return (
          <CheckIcon
            className={classNames(
              sizeClasses[size].icon,
              colorClasses[color].icon
            )}
            aria-hidden="true"
          />
        );
      }
      
      return null;
    };

    return (
      <div className={className}>
        <div className={classNames('flex items-start', sizeClasses[size].spacing)}>
          <div className="flex items-center">
            <div className="relative">
              <input
                ref={inputRef}
                id={fieldId}
                name={name}
                type="checkbox"
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
                value={value}
                className="sr-only"
                aria-describedby={
                  [
                    description ? `${fieldId}-description` : null,
                    error ? `${fieldId}-error` : null,
                  ].filter(Boolean).join(' ') || undefined
                }
                aria-invalid={error ? 'true' : 'false'}
                aria-required={required ? 'true' : undefined}
                {...props}
              />
              
              <div
                className={classNames(
                  baseClasses,
                  sizeClasses[size].checkbox,
                  stateClasses,
                  disabledClasses,
                  errorClasses,
                  'flex items-center justify-center'
                )}
                onClick={() => !disabled && onChange?.(!checked)}
                role="checkbox"
                aria-checked={indeterminate ? 'mixed' : checked}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
                    e.preventDefault();
                    onChange?.(!checked);
                  }
                }}
              >
                {renderIcon()}
              </div>
            </div>
          </div>

          {(label || description) && (
            <div className="flex-1 min-w-0">
              {label && (
                <Label
                  htmlFor={fieldId}
                  required={required}
                  disabled={disabled}
                  size={size}
                  className={classNames(
                    'cursor-pointer',
                    sizeClasses[size].text,
                    disabled && 'cursor-not-allowed'
                  )}
                >
                  {label}
                </Label>
              )}
              
              {description && !error && (
                <p
                  id={`${fieldId}-description`}
                  className={classNames(
                    'text-text-secondary mt-0.5',
                    size === 'sm' ? 'text-xs' : 'text-sm'
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>

        {error && (
          <p
            id={`${fieldId}-error`}
            className={classNames(
              'mt-1.5 text-danger-600 flex items-center gap-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
            role="alert"
            aria-live="polite"
          >
            <svg
              className={classNames(
                'flex-shrink-0',
                size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
