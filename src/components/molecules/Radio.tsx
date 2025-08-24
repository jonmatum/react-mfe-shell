import { forwardRef } from 'react';
import { RadioGroup } from '@headlessui/react';
import { RadioProps } from '../../types';
import { classNames, generateId } from '../../utils';
import Label from '../atoms/Label';

/**
 * Radio component group with accessibility features using HeadlessUI
 *
 * @example
 * ```tsx
 * <Radio
 *   label="Preferred contact method"
 *   value={contactMethod}
 *   onChange={setContactMethod}
 *   options={[
 *     { value: 'email', label: 'Email', description: 'Get notified via email' },
 *     { value: 'sms', label: 'SMS', description: 'Get notified via text message' },
 *     { value: 'phone', label: 'Phone', description: 'Get a phone call' }
 *   ]}
 * />
 * ```
 */
const Radio = forwardRef<HTMLDivElement, RadioProps>(
  (
    {
      value,
      onChange,
      options,
      orientation = 'vertical',
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
    const fieldId = id || generateId('radio-group');

    const handleChange = (newValue: string | number) => {
      onChange?.(newValue);
    };

    const sizeClasses = {
      sm: {
        radio: 'w-4 h-4',
        dot: 'w-2 h-2',
        text: 'text-sm',
        spacing: orientation === 'horizontal' ? 'gap-4' : 'gap-2',
        itemSpacing: 'gap-2',
      },
      md: {
        radio: 'w-5 h-5',
        dot: 'w-2.5 h-2.5',
        text: 'text-sm',
        spacing: orientation === 'horizontal' ? 'gap-6' : 'gap-3',
        itemSpacing: 'gap-3',
      },
      lg: {
        radio: 'w-6 h-6',
        dot: 'w-3 h-3',
        text: 'text-base',
        spacing: orientation === 'horizontal' ? 'gap-8' : 'gap-4',
        itemSpacing: 'gap-3',
      },
    };

    const colorClasses = {
      primary: {
        checked: 'bg-primary-600 border-primary-600',
        unchecked: 'border-border-primary',
        focus: 'focus:ring-primary-500',
        dot: 'bg-white',
      },
      success: {
        checked: 'bg-success-600 border-success-600',
        unchecked: 'border-border-primary',
        focus: 'focus:ring-success-500',
        dot: 'bg-white',
      },
      warning: {
        checked: 'bg-warning-600 border-warning-600',
        unchecked: 'border-border-primary',
        focus: 'focus:ring-warning-500',
        dot: 'bg-white',
      },
      danger: {
        checked: 'bg-danger-600 border-danger-600',
        unchecked: 'border-border-primary',
        focus: 'focus:ring-danger-500',
        dot: 'bg-white',
      },
    };

    const orientationClasses = {
      horizontal: 'flex flex-wrap',
      vertical: 'flex flex-col',
    };

    return (
      <div ref={ref} className={className} {...props}>
        {label && (
          <Label
            htmlFor={fieldId}
            required={required}
            disabled={disabled}
            size={size}
            className='mb-3'
          >
            {label}
          </Label>
        )}

        <RadioGroup
          value={value}
          onChange={handleChange}
          disabled={disabled}
          aria-disabled={disabled}
          className={classNames(
            orientationClasses[orientation],
            sizeClasses[size].spacing
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-required={required ? 'true' : undefined}
        >
          {options.map(option => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              disabled={option.disabled || disabled}
              className={({ disabled: optionDisabled }) =>
                classNames(
                  'relative flex cursor-pointer focus:outline-none',
                  optionDisabled && 'cursor-not-allowed opacity-50'
                )
              }
            >
              {({ checked, disabled: optionDisabled }) => (
                <div
                  className={classNames(
                    'flex items-start',
                    sizeClasses[size].itemSpacing
                  )}
                >
                  <div className='flex items-center'>
                    <div
                      className={classNames(
                        'rounded-full border-2 transition-colors duration-200 flex items-center justify-center',
                        sizeClasses[size].radio,
                        checked
                          ? colorClasses[color].checked
                          : colorClasses[color].unchecked,
                        colorClasses[color].focus,
                        !optionDisabled && 'hover:border-border-hover'
                      )}
                    >
                      {checked && (
                        <div
                          className={classNames(
                            'rounded-full',
                            sizeClasses[size].dot,
                            colorClasses[color].dot
                          )}
                        />
                      )}
                    </div>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <RadioGroup.Label
                      as='div'
                      className={classNames(
                        'font-medium text-text-primary cursor-pointer',
                        sizeClasses[size].text,
                        optionDisabled && 'cursor-not-allowed'
                      )}
                    >
                      {option.label}
                      {required && (
                        <span
                          className='ml-1 text-danger-500'
                          aria-label='required'
                          title='This field is required'
                        >
                          *
                        </span>
                      )}
                    </RadioGroup.Label>

                    {option.description && (
                      <RadioGroup.Description
                        className={classNames(
                          'text-text-secondary mt-0.5',
                          size === 'sm' ? 'text-xs' : 'text-sm'
                        )}
                      >
                        {option.description}
                      </RadioGroup.Description>
                    )}
                  </div>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>

        {/* Hidden input for form compatibility */}
        {name && <input type='hidden' name={name} value={value || ''} />}

        {description && !error && (
          <p
            id={`${fieldId}-description`}
            className={classNames(
              'mt-3 text-text-secondary',
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
              'mt-3 text-danger-600 flex items-center gap-1',
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

Radio.displayName = 'Radio';

export default Radio;
