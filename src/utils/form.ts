import { useId, useState, useCallback } from 'react';

// Form validation types
export interface ValidationRule {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  custom?: (value: any) => string | undefined;
}

export interface FormFieldState {
  value: any;
  error?: string;
  touched: boolean;
  dirty: boolean;
}

export interface UseFormFieldOptions {
  initialValue?: any;
  validation?: ValidationRule;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

// Validation utility functions
export const validateField = (value: any, rules?: ValidationRule): string | undefined => {
  if (!rules) return undefined;

  // Required validation
  if (rules.required) {
    const isEmpty = value === undefined || value === null || value === '' || 
                   (Array.isArray(value) && value.length === 0);
    if (isEmpty) {
      return typeof rules.required === 'string' ? rules.required : 'This field is required';
    }
  }

  // Skip other validations if value is empty and not required
  if (!value && !rules.required) return undefined;

  // String-based validations
  if (typeof value === 'string') {
    // Min length validation
    if (rules.minLength) {
      const minLength = typeof rules.minLength === 'number' ? rules.minLength : rules.minLength.value;
      const message = typeof rules.minLength === 'object' ? rules.minLength.message : 
                     `Must be at least ${minLength} characters`;
      if (value.length < minLength) return message;
    }

    // Max length validation
    if (rules.maxLength) {
      const maxLength = typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength.value;
      const message = typeof rules.maxLength === 'object' ? rules.maxLength.message : 
                     `Must be no more than ${maxLength} characters`;
      if (value.length > maxLength) return message;
    }

    // Pattern validation
    if (rules.pattern) {
      const pattern = rules.pattern instanceof RegExp ? rules.pattern : rules.pattern.value;
      const message = rules.pattern instanceof RegExp ? 'Invalid format' : rules.pattern.message;
      if (!pattern.test(value)) return message;
    }
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return undefined;
};

// Form field hook for consistent state management
export const useFormField = ({
  initialValue = '',
  validation,
  validateOnChange = false,
  validateOnBlur = true,
}: UseFormFieldOptions = {}) => {
  const [state, setState] = useState<FormFieldState>({
    value: initialValue,
    error: undefined,
    touched: false,
    dirty: false,
  });

  const validate = useCallback((value: any) => {
    return validateField(value, validation);
  }, [validation]);

  const setValue = useCallback((newValue: any) => {
    setState(prev => {
      const error = validateOnChange ? validate(newValue) : prev.error;
      return {
        ...prev,
        value: newValue,
        dirty: newValue !== initialValue,
        error,
      };
    });
  }, [initialValue, validate, validateOnChange]);

  const setTouched = useCallback(() => {
    setState(prev => {
      if (prev.touched) return prev;
      const error = validateOnBlur ? validate(prev.value) : prev.error;
      return {
        ...prev,
        touched: true,
        error,
      };
    });
  }, [validate, validateOnBlur]);

  const setError = useCallback((error?: string) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const reset = useCallback(() => {
    setState({
      value: initialValue,
      error: undefined,
      touched: false,
      dirty: false,
    });
  }, [initialValue]);

  const validateNow = useCallback(() => {
    const error = validate(state.value);
    setState(prev => ({ ...prev, error, touched: true }));
    return !error;
  }, [validate, state.value]);

  return {
    ...state,
    setValue,
    setTouched,
    setError,
    reset,
    validate: validateNow,
    isValid: !state.error,
  };
};

// Common validation patterns
export const validationPatterns = {
  email: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  phone: {
    value: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number',
  },
  url: {
    value: /^https?:\/\/.+/,
    message: 'Please enter a valid URL',
  },
  alphanumeric: {
    value: /^[a-zA-Z0-9]+$/,
    message: 'Only letters and numbers are allowed',
  },
  noSpecialChars: {
    value: /^[a-zA-Z0-9\s]+$/,
    message: 'Special characters are not allowed',
  },
};

// Generate consistent IDs for form fields
export const useFormFieldId = (prefix = 'field') => {
  return useId() || `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Form field error state utilities
export const getFieldErrorProps = (error?: string, fieldId?: string) => ({
  'aria-invalid': error ? 'true' as const : 'false' as const,
  'aria-describedby': error && fieldId ? `${fieldId}-error` : undefined,
});

// Form accessibility helpers
export const getFormFieldAccessibility = (
  fieldId: string,
  error?: string,
  description?: string,
  required?: boolean
) => {
  const describedBy = [];
  if (description) describedBy.push(`${fieldId}-description`);
  if (error) describedBy.push(`${fieldId}-error`);

  return {
    id: fieldId,
    'aria-invalid': error ? 'true' as const : 'false' as const,
    'aria-describedby': describedBy.length > 0 ? describedBy.join(' ') : undefined,
    'aria-required': required ? 'true' as const : undefined,
  };
};
