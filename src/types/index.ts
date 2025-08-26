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
  icon?: React.ReactNode;
}

// FeatureChip component types (larger than badges, with icon color variants)
export const FEATURE_CHIP_VARIANTS = [
  'default',
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
] as const;
export const FEATURE_CHIP_SIZES = ['sm', 'md', 'lg'] as const;

export type FeatureChipVariant = (typeof FEATURE_CHIP_VARIANTS)[number];
export type FeatureChipSize = (typeof FEATURE_CHIP_SIZES)[number];

export interface FeatureChipProps extends BaseComponentProps {
  variant?: FeatureChipVariant;
  size?: FeatureChipSize;
  icon?: React.ReactNode;
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

// =============================================================================
// TYPOGRAPHY SYSTEM TYPES
// =============================================================================

// Typography variants - semantic and contextual
export const TEXT_VARIANTS = [
  // Content variants
  'body',
  'body-large',
  'body-small',
  'caption',
  'overline',
  'label',
  'helper',

  // Display variants
  'display',
  'headline',
  'title',
  'subtitle',

  // Specialized variants
  'code',
  'kbd',
  'quote',
  'lead',
  'muted',
] as const;

// Typography sizes - comprehensive scale
export const TEXT_SIZES = [
  'xs', // 12px
  'sm', // 14px
  'base', // 16px (renamed from 'md' for clarity)
  'lg', // 18px
  'xl', // 20px
  '2xl', // 24px
  '3xl', // 30px
  '4xl', // 36px
  '5xl', // 48px
  '6xl', // 60px
  '7xl', // 72px
  '8xl', // 96px
  '9xl', // 128px
] as const;

// Typography weights - complete scale
export const TEXT_WEIGHTS = [
  'thin', // 100
  'extralight', // 200
  'light', // 300
  'normal', // 400
  'medium', // 500
  'semibold', // 600
  'bold', // 700
  'extrabold', // 800
  'black', // 900
] as const;

// Typography alignment options
export const TEXT_ALIGNMENTS = [
  'left',
  'center',
  'right',
  'justify',
  'start',
  'end',
] as const;

// Typography transforms
export const TEXT_TRANSFORMS = [
  'none',
  'uppercase',
  'lowercase',
  'capitalize',
] as const;

// Typography decoration options
export const TEXT_DECORATIONS = [
  'none',
  'underline',
  'overline',
  'line-through',
] as const;

// Typography whitespace handling
export const TEXT_WHITESPACE = [
  'normal',
  'nowrap',
  'pre',
  'pre-line',
  'pre-wrap',
  'break-spaces',
] as const;

// Typography overflow handling
export const TEXT_OVERFLOW = ['visible', 'hidden', 'clip', 'ellipsis'] as const;

// Line clamping options
export const LINE_CLAMP_OPTIONS = [1, 2, 3, 4, 5, 6] as const;

// Responsive typography breakpoints
export const TYPOGRAPHY_BREAKPOINTS = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
] as const;

// Type definitions
export type TextVariant = (typeof TEXT_VARIANTS)[number];
export type TextSize = (typeof TEXT_SIZES)[number];
export type TextWeight = (typeof TEXT_WEIGHTS)[number];
export type TextAlignment = (typeof TEXT_ALIGNMENTS)[number];
export type TextTransform = (typeof TEXT_TRANSFORMS)[number];
export type TextDecoration = (typeof TEXT_DECORATIONS)[number];
export type TextWhitespace = (typeof TEXT_WHITESPACE)[number];
export type TextOverflow = (typeof TEXT_OVERFLOW)[number];
export type LineClamp = (typeof LINE_CLAMP_OPTIONS)[number];
export type TypographyBreakpoint = (typeof TYPOGRAPHY_BREAKPOINTS)[number];

// Responsive typography type
export type ResponsiveTypographyValue<T> =
  | T
  | Partial<Record<TypographyBreakpoint, T>>;

// Enhanced text props interface
export interface TextProps extends BaseComponentProps {
  // Core typography properties
  variant?: TextVariant;
  size?: ResponsiveTypographyValue<TextSize>;
  weight?: ResponsiveTypographyValue<TextWeight>;

  // Color and appearance
  color?: string;
  gradient?: boolean;

  // Layout and alignment
  align?: ResponsiveTypographyValue<TextAlignment>;
  transform?: TextTransform;
  decoration?: TextDecoration;
  whitespace?: TextWhitespace;

  // Text overflow and truncation
  truncate?: boolean;
  lineClamp?: LineClamp;
  overflow?: TextOverflow;

  // Spacing and layout
  leading?: 'none' | 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  tracking?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';

  // Interactive states
  selectable?: boolean;
  copyable?: boolean;

  // Accessibility
  semanticLevel?: 1 | 2 | 3 | 4 | 5 | 6; // For headings

  // Polymorphic component
  as?: React.ElementType;
}

// Typography context interface
export interface TypographyContextValue {
  baseSize: TextSize;
  baseWeight: TextWeight;
  baseColor: string;
  scale: number;
  lineHeight: number;
}

// Typography scale configuration
export interface TypographyScale {
  name: string;
  sizes: Record<TextSize, { fontSize: string; lineHeight: string }>;
  weights: Record<TextWeight, string>;
}

// Heading component props
export interface HeadingProps extends Omit<TextProps, 'as' | 'semanticLevel'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span';
}

// Paragraph component props
export interface ParagraphProps extends Omit<TextProps, 'as'> {
  as?: 'p' | 'div' | 'span';
}

// Code component props
export interface CodeProps extends Omit<TextProps, 'variant' | 'as'> {
  inline?: boolean;
  language?: string;
  copyable?: boolean;
  as?: 'code' | 'pre' | 'span';
}

// Quote component props
export interface QuoteProps extends Omit<TextProps, 'variant' | 'as'> {
  cite?: string;
  author?: string;
  as?: 'blockquote' | 'q' | 'div';
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
