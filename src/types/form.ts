import React from 'react';
import { BaseComponentProps } from './index';
import { ValidationRule } from '../utils/form';

// Common form field sizes and variants
export const FORM_FIELD_SIZES = ['sm', 'md', 'lg'] as const;
export const FORM_FIELD_VARIANTS = ['default', 'error', 'success'] as const;

export type FormFieldSize = (typeof FORM_FIELD_SIZES)[number];
export type FormFieldVariant = (typeof FORM_FIELD_VARIANTS)[number];

// Base form field props
export interface BaseFormFieldProps extends BaseComponentProps {
  id?: string;
  name?: string;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  size?: FormFieldSize;
  validation?: ValidationRule;
}

// FormField component props
export interface FormFieldProps extends BaseFormFieldProps {
  children: React.ReactElement;
  htmlFor?: string;
}

// SearchBox component props
export interface SearchBoxProps extends Omit<BaseFormFieldProps, 'children'> {
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  showClearButton?: boolean;
  loading?: boolean;
  onSearch?: (value: string) => void;
  debounceMs?: number;
}

// Select/Dropdown component props
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: React.ReactNode;
}

export interface SelectProps extends BaseFormFieldProps {
  value?: string | number | (string | number)[];
  onChange?: (value: string | number | (string | number)[]) => void;
  options: SelectOption[];
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  loading?: boolean;
  onSearch?: (query: string) => void;
  renderOption?: (option: SelectOption) => React.ReactNode;
  renderValue?: (option: SelectOption) => React.ReactNode;
}

// Checkbox component props
export interface CheckboxProps extends BaseFormFieldProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  value?: string;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

// Radio component props
export interface RadioOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioProps extends BaseFormFieldProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

// Textarea component props
export interface TextareaProps extends BaseFormFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  minRows?: number;
  maxRows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  autoResize?: boolean;
}

// FileUpload component props
export interface FileUploadProps extends BaseFormFieldProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  onFilesChange?: (files: File[]) => void;
  onError?: (error: string) => void;
  preview?: boolean;
  dragAndDrop?: boolean;
  children?: React.ReactNode;
}

// Switch props (extending existing)
export interface SwitchFieldProps extends BaseFormFieldProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}
