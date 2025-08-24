import React, { forwardRef, Fragment, useState, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  ChevronUpDownIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { SelectProps, SelectOption } from '../../types';
import { classNames, generateId } from '../../utils';
import Label from '../atoms/Label';
import LoadingSpinner from '../atoms/LoadingSpinner';

/**
 * Select component with search, multi-select, and accessibility features using HeadlessUI
 *
 * @example
 * ```tsx
 * <Select
 *   label="Choose a country"
 *   options={countries}
 *   value={selectedCountry}
 *   onChange={setSelectedCountry}
 *   searchable
 *   placeholder="Select a country..."
 * />
 * ```
 */
const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value,
      onChange,
      options,
      placeholder = 'Select an option...',
      searchable = false,
      clearable = false,
      multiple = false,
      loading = false,
      onSearch,
      renderOption,
      renderValue,
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
    const fieldId = id || generateId('select');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter options based on search query
    const filteredOptions = useMemo(() => {
      if (!searchable || !searchQuery) return options;

      return options.filter(
        option =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }, [options, searchQuery, searchable]);

    // Get selected option(s)
    const selectedOption = useMemo(() => {
      if (multiple) {
        return Array.isArray(value)
          ? options.filter(option => value.includes(option.value))
          : [];
      }
      return options.find(option => option.value === value);
    }, [options, value, multiple]);

    // Handle selection change
    const handleChange = (newValue: SelectOption | SelectOption[]) => {
      if (multiple && Array.isArray(newValue)) {
        onChange?.(newValue.map(option => option.value));
      } else if (!multiple && !Array.isArray(newValue)) {
        onChange?.(newValue.value);
      }
    };

    // Handle clear
    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (multiple) {
        (onChange as (value: string[]) => void)?.([] as string[]);
      } else {
        (onChange as (value: string) => void)?.('');
      }
    };

    // Handle search
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      onSearch?.(query);
    };

    const sizeClasses = {
      sm: 'min-h-[2rem] px-3 py-1.5 text-sm',
      md: 'min-h-[2.5rem] px-4 py-2 text-sm',
      lg: 'min-h-[3rem] px-4 py-3 text-base',
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const baseClasses =
      'relative w-full cursor-default rounded-md border bg-surface-primary text-left transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = error
      ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
      : 'border-border-primary focus:border-primary-500 focus:ring-primary-500';

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed bg-surface-disabled'
      : 'hover:border-border-hover';

    // Render selected value
    const renderSelectedValue = () => {
      if (multiple && Array.isArray(selectedOption)) {
        if (selectedOption.length === 0) {
          return <span className='text-text-secondary'>{placeholder}</span>;
        }
        if (selectedOption.length === 1) {
          return renderValue
            ? renderValue(selectedOption[0])
            : selectedOption[0].label;
        }
        return `${selectedOption.length} selected`;
      }

      if (!selectedOption || Array.isArray(selectedOption)) {
        return <span className='text-text-secondary'>{placeholder}</span>;
      }

      return renderValue ? renderValue(selectedOption) : selectedOption.label;
    };

    const hasValue = multiple
      ? Array.isArray(selectedOption) && selectedOption.length > 0
      : selectedOption;

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

        <Listbox
          value={selectedOption}
          onChange={handleChange}
          disabled={disabled}
          multiple={multiple}
        >
          <div className='relative'>
            <Listbox.Button
              ref={ref}
              id={fieldId}
              className={classNames(
                baseClasses,
                sizeClasses[size],
                variantClasses,
                disabledClasses
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
            >
              <span className='flex items-center justify-between w-full'>
                <span className='block truncate text-text-primary'>
                  {renderSelectedValue()}
                </span>

                <span className='flex items-center gap-1'>
                  {loading && (
                    <LoadingSpinner
                      size={size === 'sm' ? 'xs' : size === 'lg' ? 'sm' : 'xs'}
                      color='primary'
                    />
                  )}
                  {clearable && hasValue && !disabled && (
                    <div
                      onClick={handleClear}
                      className='p-0.5 hover:bg-surface-secondary rounded cursor-pointer'
                      aria-label='Clear selection'
                      role='button'
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleClear(e as React.MouseEvent<HTMLDivElement>);
                        }
                      }}
                    >
                      <XMarkIcon className={iconSizeClasses[size]} />
                    </div>
                  )}
                  <ChevronUpDownIcon
                    className={classNames(
                      'text-text-secondary',
                      iconSizeClasses[size]
                    )}
                    aria-hidden='true'
                  />
                </span>
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-surface-primary py-1 shadow-lg ring-1 ring-border-primary focus:outline-none'>
                {searchable && (
                  <div className='px-3 py-2 border-b border-border-primary'>
                    <input
                      type='text'
                      className='w-full px-3 py-1.5 text-sm border border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500'
                      placeholder='Search options...'
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onClick={e => e.stopPropagation()}
                    />
                  </div>
                )}

                {filteredOptions.length === 0 ? (
                  <div className='px-3 py-2 text-sm text-text-secondary'>
                    {searchQuery ? 'No options found' : 'No options available'}
                  </div>
                ) : (
                  filteredOptions.map(option => (
                    <Listbox.Option
                      key={option.value}
                      value={option}
                      disabled={option.disabled}
                      className={({ active }) =>
                        classNames(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active
                            ? 'bg-primary-50 text-primary-900'
                            : 'text-text-primary',
                          option.disabled && 'opacity-50 cursor-not-allowed'
                        )
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <div className='flex items-center'>
                            {option.icon && (
                              <span className='mr-3 flex-shrink-0'>
                                {option.icon}
                              </span>
                            )}
                            <div className='flex-1'>
                              <span
                                className={classNames(
                                  'block truncate',
                                  selected ? 'font-medium' : 'font-normal'
                                )}
                              >
                                {renderOption
                                  ? renderOption(option)
                                  : option.label}
                              </span>
                              {option.description && (
                                <span className='text-xs text-text-secondary'>
                                  {option.description}
                                </span>
                              )}
                            </div>
                          </div>

                          {selected && (
                            <span
                              className={classNames(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-primary-600' : 'text-primary-600'
                              )}
                            >
                              <CheckIcon
                                className='h-5 w-5'
                                aria-hidden='true'
                              />
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* Hidden input for form compatibility */}
        {name && (
          <input
            type='hidden'
            name={name}
            value={
              multiple && Array.isArray(value)
                ? value.map(String).join(',')
                : String(value || '')
            }
          />
        )}

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

Select.displayName = 'Select';

export default Select;
