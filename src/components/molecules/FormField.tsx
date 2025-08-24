import React, { cloneElement, forwardRef } from 'react';
import { FormFieldProps } from '../../types';
import { classNames, generateId } from '../../utils';
import Label from '../atoms/Label';

/**
 * FormField component that wraps form inputs with consistent label, description, and error handling
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email Address"
 *   description="We'll never share your email"
 *   error={errors.email}
 *   required
 * >
 *   <Input
 *     type="email"
 *     value={email}
 *     onChange={(e) => setEmail(e.target.value)}
 *   />
 * </FormField>
 * ```
 */
const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      children,
      label,
      description,
      error,
      required = false,
      disabled = false,
      size = 'md',
      htmlFor,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const fieldId = id || generateId('form-field');
    const inputId = htmlFor || `${fieldId}-input`;
    const descriptionId = description ? `${fieldId}-description` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;

    // Clone the child element and add necessary props
    const childElement = React.isValidElement(children)
      ? cloneElement(children, {
          ...(children.props as Record<string, unknown>), // Preserve existing props first
          id: inputId,
          'aria-describedby':
            [descriptionId, errorId].filter(Boolean).join(' ') || undefined,
          'aria-invalid': error ? 'true' : 'false',
          'aria-required': required ? 'true' : undefined,
          disabled,
          size,
          // Don't pass error to child to avoid duplicate error messages
        } as any)
      : children;

    const sizeClasses = {
      sm: 'space-y-1',
      md: 'space-y-1.5',
      lg: 'space-y-2',
    };

    return (
      <div
        ref={ref}
        id={fieldId}
        className={classNames('w-full', sizeClasses[size], className)}
        {...props}
      >
        {label && (
          <Label
            htmlFor={inputId}
            required={required}
            disabled={disabled}
            size={size}
          >
            {label}
          </Label>
        )}

        {childElement}

        {description && !error && (
          <p
            id={descriptionId}
            className={classNames(
              'text-text-secondary',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className={classNames(
              'text-danger-600 flex items-center gap-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
            role='alert'
            aria-live='polite'
          >
            <svg
              className={classNames(
                'flex-shrink-0',
                size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
              )}
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                clipRule='evenodd'
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;
