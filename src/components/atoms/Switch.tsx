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
        switch: 'h-4 w-7',
        thumb: 'h-2.5 w-2.5',
        translate: 'translate-x-3.5',
      },
      md: {
        switch: 'h-6 w-11',
        thumb: 'h-4 w-4',
        translate: 'translate-x-6',
      },
      lg: {
        switch: 'h-8 w-14',
        thumb: 'h-6 w-6',
        translate: 'translate-x-7',
      },
    };

    const colorClasses = {
      primary: checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700',
      success: checked ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-700',
      warning: checked ? 'bg-yellow-600' : 'bg-gray-200 dark:bg-gray-700',
      danger: checked ? 'bg-red-600' : 'bg-gray-200 dark:bg-gray-700',
    };

    const focusColorClasses = {
      primary: 'focus:ring-blue-500',
      success: 'focus:ring-green-500',
      warning: 'focus:ring-yellow-500',
      danger: 'focus:ring-red-500',
    };

    const switchElement = (
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={classNames(
          'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
          sizeClasses[size].switch,
          colorClasses[color],
          focusColorClasses[color],
          disabled && 'cursor-not-allowed opacity-50'
        )}
        {...props}
      >
        <span className="sr-only">{label || 'Toggle switch'}</span>
        <span
          className={classNames(
            'pointer-events-none inline-block rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out',
            sizeClasses[size].thumb,
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
