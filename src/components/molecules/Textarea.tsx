import React, { forwardRef, useCallback, useEffect, useRef } from 'react';
import { TextareaProps } from '../../types';
import { classNames, generateId } from '../../utils';
import Label from '../atoms/Label';

/**
 * Textarea component with auto-resize functionality and accessibility features
 *
 * @example
 * ```tsx
 * <Textarea
 *   label="Message"
 *   value={message}
 *   onChange={setMessage}
 *   placeholder="Enter your message..."
 *   autoResize
 *   minRows={3}
 *   maxRows={10}
 * />
 * ```
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      value = '',
      onChange,
      placeholder,
      rows = 4,
      minRows = 2,
      maxRows = 10,
      resize = 'vertical',
      autoResize = false,
      label,
      description,
      error,
      required = false,
      disabled = false,
      size = 'md',
      className,
      id,
      name,
      ...props
    },
    ref
  ) => {
    const fieldId = id || generateId('textarea');
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;

    // Auto-resize functionality
    const adjustHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';

      // Calculate the number of rows based on content
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const padding =
        parseInt(getComputedStyle(textarea).paddingTop) +
        parseInt(getComputedStyle(textarea).paddingBottom);

      const contentHeight = textarea.scrollHeight - padding;
      const calculatedRows = Math.ceil(contentHeight / lineHeight);

      // Constrain between minRows and maxRows
      const constrainedRows = Math.max(
        minRows,
        Math.min(maxRows, calculatedRows)
      );

      // Set the height based on rows
      textarea.style.height = `${constrainedRows * lineHeight + padding}px`;
    }, [autoResize, minRows, maxRows, textareaRef]);

    // Adjust height when value changes
    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    // Adjust height on mount
    useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      onChange?.(newValue);

      // Adjust height after state update
      setTimeout(adjustHeight, 0);
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    const baseClasses =
      'block w-full rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = error
      ? 'border-danger-500 bg-surface-primary text-text-primary placeholder-text-secondary focus:border-danger-500 focus:ring-danger-500'
      : 'border-border-primary bg-surface-primary text-text-primary placeholder-text-secondary focus:border-primary-500 focus:ring-primary-500';

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed bg-surface-disabled'
      : 'hover:border-border-hover';

    // Calculate initial rows
    const initialRows = autoResize ? minRows : rows;

    return (
      <div className={className}>
        {label && (
          <Label
            htmlFor={fieldId}
            required={required}
            disabled={disabled}
            size={size}
            className='mb-1.5'
          >
            {label}
          </Label>
        )}

        <textarea
          ref={textareaRef}
          id={fieldId}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={initialRows}
          disabled={disabled}
          className={classNames(
            baseClasses,
            sizeClasses[size],
            variantClasses,
            disabledClasses,
            resizeClasses[resize],
            autoResize && 'overflow-hidden'
          )}
          aria-describedby={
            [
              description ? `${fieldId}-description` : null,
              error ? `${fieldId}-error` : null,
            ]
              .filter(Boolean)
              .join(' ') || undefined
          }
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required ? 'true' : undefined}
          {...props}
        />

        {description && !error && (
          <p
            id={`${fieldId}-description`}
            className={classNames(
              'mt-1.5 text-text-secondary',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={`${fieldId}-error`}
            className={classNames(
              'mt-1.5 text-danger-600 flex items-center gap-1',
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

Textarea.displayName = 'Textarea';

export default Textarea;
