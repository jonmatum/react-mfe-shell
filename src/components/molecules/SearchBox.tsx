import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { SearchBoxProps } from '../../types';
import { classNames, generateId } from '../../utils';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';

/**
 * SearchBox component with search icon, clear functionality, and optional debouncing
 * 
 * @example
 * ```tsx
 * <SearchBox
 *   value={searchQuery}
 *   onChange={setSearchQuery}
 *   placeholder="Search products..."
 *   onSearch={handleSearch}
 *   debounceMs={300}
 *   showClearButton
 * />
 * ```
 */
const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  (
    {
      value = '',
      onChange,
      onClear,
      onSearch,
      placeholder = 'Search...',
      showClearButton = true,
      loading = false,
      debounceMs = 0,
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
    const fieldId = id || generateId('search-box');
    const [internalValue, setInternalValue] = useState(value);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

    // Sync internal value with external value
    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    // Handle debounced search
    const handleDebouncedSearch = useCallback(
      (searchValue: string) => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }

        if (debounceMs > 0) {
          const timer = setTimeout(() => {
            onSearch?.(searchValue);
          }, debounceMs);
          setDebounceTimer(timer);
        } else {
          onSearch?.(searchValue);
        }
      },
      [debounceMs, onSearch, debounceTimer]
    );

    // Handle input change
    const handleChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInternalValue(newValue);
        onChange?.(newValue);
        
        if (onSearch) {
          handleDebouncedSearch(newValue);
        }
      },
      [onChange, onSearch, handleDebouncedSearch]
    );

    // Handle clear
    const handleClear = useCallback(() => {
      setInternalValue('');
      onChange?.('');
      onClear?.();
      
      if (onSearch) {
        onSearch('');
      }
    }, [onChange, onClear, onSearch]);

    // Handle key press for immediate search
    const handleKeyPress = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onSearch) {
          event.preventDefault();
          if (debounceTimer) {
            clearTimeout(debounceTimer);
          }
          onSearch(internalValue);
        }
      },
      [onSearch, internalValue, debounceTimer]
    );

    // Cleanup debounce timer on unmount
    useEffect(() => {
      return () => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
      };
    }, [debounceTimer]);

    const sizeClasses = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
    };

    const iconSizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    const hasValue = internalValue.length > 0;
    const showClear = showClearButton && hasValue && !disabled;

    // Build right icon based on state
    const rightIcon = (
      <div className="flex items-center gap-1">
        {loading && (
          <LoadingSpinner
            size={size === 'sm' ? 'xs' : size === 'lg' ? 'sm' : 'xs'}
            color="primary"
          />
        )}
        {showClear && (
          <Button
            variant="ghost"
            size="xs"
            onClick={handleClear}
            disabled={disabled}
            className={classNames(
              'p-0 hover:bg-transparent focus:ring-1 focus:ring-primary-500',
              sizeClasses[size]
            )}
            aria-label="Clear search"
          >
            <XMarkIcon className={iconSizeClasses[size]} />
          </Button>
        )}
      </div>
    );

    return (
      <div className={className}>
        <Input
          ref={ref}
          id={fieldId}
          name={name}
          type="search"
          value={internalValue}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          label={label}
          description={description}
          error={error}
          required={required}
          disabled={disabled}
          size={size}
          leftIcon={<MagnifyingGlassIcon className={iconSizeClasses[size]} />}
          rightIcon={rightIcon}
          autoComplete="off"
          role="searchbox"
          aria-label={label || 'Search'}
          {...props}
        />
      </div>
    );
  }
);

SearchBox.displayName = 'SearchBox';

export default SearchBox;
