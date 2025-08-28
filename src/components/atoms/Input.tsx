import { forwardRef, useId } from 'react';
import { InputProps, INPUT_VARIANTS, INPUT_SIZES } from '../../types';
import { classNames } from '../../utils';
import Label from './Label';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      variant = 'default',
      size = 'md',
      label,
      description,
      error,
      leftIcon,
      rightIcon,
      required = false,
      disabled = false,
      readOnly = false,
      placeholder,
      className,
      as: Component = 'input',
      ...props
    },
    ref
  ) => {
    const id = useId();
    const inputId = props.id || id;
    const descriptionId = description ? `${inputId}-description` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    const baseClasses =
      'block w-full rounded-md border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    // Variant classes that match Textarea styling approach
    const variantClasses = {
      default:
        'border-border-primary bg-surface-primary text-text-primary placeholder-text-secondary focus:border-primary-500 focus:ring-primary-500',
      error:
        'border-danger-500 bg-surface-primary text-text-primary placeholder-text-secondary focus:border-danger-500 focus:ring-danger-500',
      success:
        'border-success-500 bg-surface-primary text-text-primary placeholder-text-secondary focus:border-success-500 focus:ring-success-500',
    };

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    };

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed bg-surface-disabled'
      : 'hover:border-border-hover';

    const readOnlyClasses = readOnly
      ? 'bg-surface-secondary cursor-default'
      : '';

    // Determine the effective variant (error takes precedence)
    const effectiveVariant = error ? 'error' : variant;

    const iconPadding = {
      left: leftIcon
        ? size === 'sm'
          ? 'pl-10'
          : size === 'lg'
            ? 'pl-12'
            : 'pl-11'
        : '',
      right: rightIcon
        ? size === 'sm'
          ? 'pr-10'
          : size === 'lg'
            ? 'pr-12'
            : 'pr-11'
        : '',
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const iconPositionClasses = {
      left: 'left-3',
      right: 'right-3',
    };

    return (
      <div className={classNames('space-y-1', className)}>
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

        <div className='relative'>
          {leftIcon && (
            <div
              className={classNames(
                'absolute inset-y-0 left-0 flex items-center pointer-events-none',
                iconPositionClasses.left
              )}
            >
              <span
                className={classNames(
                  'text-text-secondary',
                  iconSizeClasses[size]
                )}
              >
                {leftIcon}
              </span>
            </div>
          )}

          <Component
            ref={ref}
            id={inputId}
            type={type}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck={type === 'text' ? 'false' : undefined}
            autoCapitalize={type === 'email' || type === 'url' ? 'none' : undefined}
            aria-describedby={
              classNames(descriptionId, errorId).trim() || undefined
            }
            aria-invalid={error ? 'true' : 'false'}
            className={classNames(
              baseClasses,
              variantClasses[effectiveVariant],
              sizeClasses[size],
              iconPadding.left,
              iconPadding.right,
              disabledClasses,
              readOnlyClasses
            )}
            {...props}
          />

          {rightIcon && (
            <div
              className={classNames(
                'absolute inset-y-0 right-0 flex items-center pointer-events-none',
                iconPositionClasses.right
              )}
            >
              <span
                className={classNames(
                  'text-text-secondary',
                  iconSizeClasses[size]
                )}
              >
                {rightIcon}
              </span>
            </div>
          )}
        </div>

        {description && !error && (
          <p id={descriptionId} className='text-sm text-text-secondary'>
            {description}
          </p>
        )}

        {error && (
          <p id={errorId} className='text-sm text-danger-600' role='alert'>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Static properties
(
  Input as typeof Input & {
    variants: typeof INPUT_VARIANTS;
    sizes: typeof INPUT_SIZES;
  }
).variants = INPUT_VARIANTS;
(
  Input as typeof Input & {
    variants: typeof INPUT_VARIANTS;
    sizes: typeof INPUT_SIZES;
  }
).sizes = INPUT_SIZES;

export default Input;
