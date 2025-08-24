import { memo } from 'react';
import { Switch as HeadlessSwitch } from '@headlessui/react';
import { BaseComponentProps } from '../../types';
import { classNames, generateId } from '../../utils';

interface SwitchProps extends BaseComponentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  label?: string;
  description?: string;
  id?: string;
  name?: string;
  'aria-describedby'?: string;
}

/**
 * A flexible switch component built on Headless UI with multiple sizes, colors, and accessibility features
 *
 * @example
 * ```tsx
 * <Switch
 *   checked={isDarkMode}
 *   onChange={setIsDarkMode}
 *   label="Dark Mode"
 *   description="Toggle between light and dark themes"
 * />
 * ```
 */
const Switch = memo<SwitchProps>(
  ({
    checked,
    onChange,
    disabled = false,
    size = 'md',
    color = 'primary',
    label,
    description,
    id,
    name,
    className,
    'aria-describedby': ariaDescribedBy,
    ...props
  }) => {
    const switchId = id || generateId('switch');
    const descriptionId = description ? `${switchId}-description` : undefined;
    const finalAriaDescribedBy = ariaDescribedBy || descriptionId;

    const sizeClasses = {
      sm: {
        switch: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
      },
      md: {
        switch: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
      },
      lg: {
        switch: 'h-8 w-14',
        thumb: 'h-7 w-7',
        translate: 'translate-x-6',
      },
    };

    const colorClasses = {
      primary: checked ? 'bg-primary-600' : 'bg-surface-secondary',
      success: checked ? 'bg-success-600' : 'bg-surface-secondary',
      warning: checked ? 'bg-warning-600' : 'bg-surface-secondary',
      danger: checked ? 'bg-danger-600' : 'bg-surface-secondary',
    };

    const focusColorClasses = {
      primary: 'focus:ring-primary-500',
      success: 'focus:ring-success-500',
      warning: 'focus:ring-warning-500',
      danger: 'focus:ring-danger-500',
    };

    const switchElement = (
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          // Base switch styles
          'group relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
          // Focus styles
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          // Size classes
          sizeClasses[size].switch,
          // Color classes
          colorClasses[color],
          focusColorClasses[color],
          // Disabled styles
          disabled && 'cursor-not-allowed opacity-50'
        )}
        {...props}
      >
        <span className="sr-only">{label || 'Toggle switch'}</span>
        <span
          aria-hidden="true"
          className={classNames(
            // Base thumb styles
            'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
            // Size classes
            sizeClasses[size].thumb,
            // Position based on checked state
            checked ? sizeClasses[size].translate : 'translate-x-0'
          )}
        />
      </HeadlessSwitch>
    );

    // Hidden input for form compatibility
    const hiddenInput = name ? (
      <input
        type="checkbox"
        id={switchId}
        name={name}
        checked={checked}
        onChange={() => {}} // Controlled by HeadlessSwitch
        disabled={disabled}
        className="sr-only"
        aria-describedby={finalAriaDescribedBy}
        tabIndex={-1}
      />
    ) : null;

    // If no label or description, return just the switch
    if (!label && !description) {
      return (
        <div className={className}>
          {hiddenInput}
          {switchElement}
        </div>
      );
    }

    // Return switch with label and description using Switch.Group for better accessibility
    return (
      <HeadlessSwitch.Group>
        <div
          className={classNames('flex items-center justify-between', className)}
        >
          <div className="flex flex-col">
            {label && (
              <HeadlessSwitch.Label
                className={classNames(
                  'text-sm font-medium text-gray-900 dark:text-gray-100 cursor-pointer',
                  disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {label}
              </HeadlessSwitch.Label>
            )}
            {description && (
              <HeadlessSwitch.Description
                className={classNames(
                  'text-sm text-gray-500 dark:text-gray-400',
                  disabled && 'opacity-50'
                )}
              >
                {description}
              </HeadlessSwitch.Description>
            )}
          </div>

          <div className="flex items-center">
            {hiddenInput}
            {switchElement}
          </div>
        </div>
      </HeadlessSwitch.Group>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;
