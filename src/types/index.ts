import { ComponentType } from 'react';

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

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

// Button Group for compound component pattern
export interface ButtonGroupProps extends BaseComponentProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  attached?: boolean;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Re-export design token types
export * from './tokens';
