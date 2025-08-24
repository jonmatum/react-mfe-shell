import { forwardRef } from 'react';
import { SwitchFieldProps } from '../../types';
import { classNames, generateId } from '../../utils';
import Switch from '../atoms/Switch';

/**
 * SwitchField component that wraps the Switch atom with form field functionality
 *
 * @example
 * ```tsx
 * <SwitchField
 *   checked={notifications}
 *   onChange={setNotifications}
 *   label="Email Notifications"
 *   description="Receive email updates about your account"
 *   error={errors.notifications}
 *   required
 * />
 * ```
 */
const SwitchField = forwardRef<HTMLDivElement, SwitchFieldProps>(
  (
    {
      checked,
      onChange,
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
    const fieldId = id || generateId('switch-field');

    return (
      <div ref={ref} className={className} {...props}>
        <Switch
          id={fieldId}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          size={size}
          color={color}
          label={label}
          description={description}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required ? 'true' : undefined}
        />

        {error && (
          <p
            id={`${fieldId}-error`}
            className={classNames(
              'mt-2 text-danger-600 flex items-center gap-1',
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

SwitchField.displayName = 'SwitchField';

export default SwitchField;
