import React, { memo, forwardRef, useState, useCallback } from 'react';
import { BaseComponentProps } from '../../types';
import { classNames, generateId } from '../../utils';

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
  label?: string;
  description?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  id?: string;
  name?: string;
  autoComplete?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * A flexible input component with validation states, icons, and accessibility features
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 *   leftIcon={<EnvelopeIcon />}
 * />
 * ```
 */
const Input = memo(
  forwardRef<HTMLInputElement, InputProps>(
    (
      {
        type = 'text',
        value,
        defaultValue,
        placeholder,
        disabled = false,
        readOnly = false,
        required = false,
        size = 'md',
        variant = 'default',
        label,
        description,
        error,
        leftIcon,
        rightIcon,
        id,
        name,
        autoComplete,
        className,
        onChange,
        onFocus,
        onBlur,
        ...props
      },
      ref
    ) => {
      const [isFocused, setIsFocused] = useState(false);
      const inputId = id || generateId('input');
      const descriptionId = description ? `${inputId}-description` : undefined;
      const errorId = error ? `${inputId}-error` : undefined;

      const handleFocus = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(true);
          onFocus?.(event);
        },
        [onFocus]
      );

      const handleBlur = useCallback(
        (event: React.FocusEvent<HTMLInputElement>) => {
          setIsFocused(false);
          onBlur?.(event);
        },
        [onBlur]
      );

      const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-3 py-2 text-sm',
        lg: 'px-4 py-3 text-base',
      };

      const variantClasses = {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        error: 'border-red-300 focus:border-red-500 focus:ring-red-500',
        success: 'border-green-300 focus:border-green-500 focus:ring-green-500',
      };

      const iconSizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      };

      const finalVariant = error ? 'error' : variant;

      return (
        <div className={className}>
          {/* Label */}
          {label && (
            <label
              htmlFor={inputId}
              className={classNames(
                'block text-sm font-medium mb-1',
                disabled ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'
              )}
            >
              {label}
              {required && <span className='text-red-500 ml-1'>*</span>}
            </label>
          )}

          {/* Description */}
          {description && (
            <p
              id={descriptionId}
              className='text-sm text-gray-500 dark:text-gray-400 mb-1'
            >
              {description}
            </p>
          )}

          {/* Input Container */}
          <div className='relative'>
            {/* Left Icon */}
            {leftIcon && (
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <span
                  className={classNames('text-gray-400', iconSizeClasses[size])}
                >
                  {leftIcon}
                </span>
              </div>
            )}

            {/* Input */}
            <input
              ref={ref}
              type={type}
              id={inputId}
              name={name}
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              autoComplete={autoComplete}
              className={classNames(
                'block w-full rounded-md border shadow-sm transition-colors duration-200 focus:outline-none focus:ring-1 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400',
                sizeClasses[size],
                variantClasses[finalVariant],
                !!leftIcon && 'pl-10',
                !!rightIcon && 'pr-10',
                isFocused && 'ring-1'
              )}
              aria-describedby={
                [descriptionId, errorId].filter(Boolean).join(' ') || undefined
              }
              aria-invalid={!!error}
              onChange={onChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />

            {/* Right Icon */}
            {rightIcon && (
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                <span
                  className={classNames('text-gray-400', iconSizeClasses[size])}
                >
                  {rightIcon}
                </span>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <p
              id={errorId}
              className='mt-1 text-sm text-red-600 dark:text-red-400'
            >
              {error}
            </p>
          )}
        </div>
      );
    }
  )
);

Input.displayName = 'Input';

export default Input;
