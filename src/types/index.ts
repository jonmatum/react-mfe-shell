import React, { ComponentType } from 'react';

// Core navigation types
export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  current?: boolean;
  badge?: string | number;
  onClick?: (event: React.MouseEvent, item: NavigationItem) => void;
}

export interface UserInfo {
  name: string;
  email: string;
  imageUrl?: string;
}

// Theme and layout types
export type Theme = 'light' | 'dark' | 'system';
export type Layout = 'stacked' | 'sidebar';
export type ContainerWidth = 'boxed' | 'full';

export interface AppSettings {
  theme: Theme;
  layout: Layout;
  containerWidth: ContainerWidth;
}

// Loading configuration
export interface LoadingConfig {
  text?: string;
  component?: ComponentType;
}

// Main app shell configuration
export interface AppShellConfig {
  title: string;
  navigation: NavigationItem[];
  userNavigation?: NavigationItem[];
  user?: UserInfo;
  defaultSettings?: Partial<AppSettings>;
  loading?: LoadingConfig;
}

// Component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Button constants for better type inference and reusability
export const BUTTON_VARIANTS = [
  'primary',
  'secondary',
  'ghost',
  'danger',
  'success',
  'warning',
] as const;
export const BUTTON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export type ButtonVariant = (typeof BUTTON_VARIANTS)[number];
export type ButtonSize = (typeof BUTTON_SIZES)[number];

// Polymorphic Button Props
export interface ButtonOwnProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: React.ElementType;
}

export interface ButtonProps
  extends Omit<BaseComponentProps, 'children'>,
    ButtonOwnProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// Button Group for compound component pattern
export interface ButtonGroupProps extends BaseComponentProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  attached?: boolean;
}

// Input component types
export const INPUT_VARIANTS = ['default', 'error', 'success'] as const;
export const INPUT_SIZES = ['sm', 'md', 'lg'] as const;

export type InputVariant = (typeof INPUT_VARIANTS)[number];
export type InputSize = (typeof INPUT_SIZES)[number];

export interface InputProps extends BaseComponentProps {
  id?: string;
  name?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  description?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  as?: React.ElementType;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  role?: string;
  'aria-label'?: string;
}

// Label component types
export const LABEL_SIZES = ['sm', 'md', 'lg'] as const;
export type LabelSize = (typeof LABEL_SIZES)[number];

export interface LabelProps extends BaseComponentProps {
  htmlFor?: string;
  required?: boolean;
  disabled?: boolean;
  size?: LabelSize;
  as?: React.ElementType;
}

// Icon component types
export const ICON_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
export type IconSize = (typeof ICON_SIZES)[number];

export interface IconProps extends BaseComponentProps {
  name?: string;
  size?: IconSize;
  color?: string;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
  as?: React.ElementType;
}

// Badge component types
export const BADGE_VARIANTS = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
] as const;
export const BADGE_SIZES = ['sm', 'md', 'lg'] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];
export type BadgeSize = (typeof BADGE_SIZES)[number];

export interface BadgeProps extends BaseComponentProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  as?: React.ElementType;
}

// Avatar component types
export const AVATAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;
export type AvatarSize = (typeof AVATAR_SIZES)[number];

export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  fallback?: string;
  loading?: 'eager' | 'lazy';
  as?: React.ElementType;
}

// Divider component types
export interface DividerProps extends BaseComponentProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  label?: string;
  as?: React.ElementType;
}

// Text/Typography component types
export const TEXT_VARIANTS = ['body', 'caption', 'overline'] as const;
export const TEXT_SIZES = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
] as const;
export const TEXT_WEIGHTS = [
  'thin',
  'light',
  'normal',
  'medium',
  'semibold',
  'bold',
  'extrabold',
  'black',
] as const;

export type TextVariant = (typeof TEXT_VARIANTS)[number];
export type TextSize = (typeof TEXT_SIZES)[number];
export type TextWeight = (typeof TEXT_WEIGHTS)[number];

export interface TextProps extends BaseComponentProps {
  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  transform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  truncate?: boolean;
  as?: React.ElementType;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Re-export design token types
export * from './tokens';

// Re-export form types
export * from './form';
