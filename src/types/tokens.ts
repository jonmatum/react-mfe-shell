/**
 * TypeScript interfaces for design tokens
 * Provides type safety and IntelliSense for all design tokens
 */

// =============================================================================
// COLOR TYPES
// =============================================================================

/**
 * Color scale interface for consistent color definitions
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

/**
 * Base colors interface
 */
export interface BaseColors {
  white: string;
  black: string;
  gray: ColorScale;
  blue: ColorScale;
  green: ColorScale;
  yellow: ColorScale;
  red: ColorScale;
  cyan: ColorScale;
}

/**
 * Semantic colors interface
 */
export interface SemanticColors {
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  error: ColorScale;
  info: ColorScale;
}

/**
 * Theme color categories
 */
export interface ThemeColorCategory {
  primary: string;
  secondary: string;
  tertiary: string;
  elevated?: string;
}

/**
 * Theme text colors
 */
export interface ThemeTextColors {
  primary: string;
  secondary: string;
  tertiary: string;
  inverse: string;
  disabled: string;
}

/**
 * Theme border colors
 */
export interface ThemeBorderColors {
  primary: string;
  secondary: string;
  tertiary: string;
  focus: string;
}

/**
 * Theme interactive colors
 */
export interface ThemeInteractiveColors {
  primary: string;
  'primary-hover': string;
  'primary-active': string;
  secondary: string;
  'secondary-hover': string;
  'secondary-active': string;
}

/**
 * Theme status colors
 */
export interface ThemeStatusColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * Complete theme colors interface
 */
export interface ThemeColors {
  background: ThemeColorCategory;
  surface: ThemeColorCategory;
  text: ThemeTextColors;
  border: ThemeBorderColors;
  interactive: ThemeInteractiveColors;
  status: ThemeStatusColors;
}

/**
 * Theme-aware color system
 */
export interface ThemeColorSystem {
  light: ThemeColors;
  dark: ThemeColors;
}

// =============================================================================
// TYPOGRAPHY TYPES
// =============================================================================

/**
 * Font family interface
 */
export interface FontFamily {
  sans: string[];
  mono: string[];
}

/**
 * Font size with line height
 */
export type FontSizeValue = [string, { lineHeight: string }];

/**
 * Font size scale interface
 */
export interface FontSize {
  xs: FontSizeValue;
  sm: FontSizeValue;
  base: FontSizeValue;
  lg: FontSizeValue;
  xl: FontSizeValue;
  '2xl': FontSizeValue;
  '3xl': FontSizeValue;
  '4xl': FontSizeValue;
  '5xl': FontSizeValue;
  '6xl': FontSizeValue;
  '7xl': FontSizeValue;
  '8xl': FontSizeValue;
  '9xl': FontSizeValue;
}

/**
 * Font weight interface
 */
export interface FontWeight {
  thin: string;
  extralight: string;
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
  black: string;
}

/**
 * Letter spacing interface
 */
export interface LetterSpacing {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

/**
 * Typography tokens interface
 */
export interface Typography {
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  letterSpacing: LetterSpacing;
}

// =============================================================================
// SPACING TYPES
// =============================================================================

/**
 * Spacing scale interface
 */
export interface Spacing {
  0: string;
  px: string;
  0.5: string;
  1: string;
  1.5: string;
  2: string;
  2.5: string;
  3: string;
  3.5: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  14: string;
  16: string;
  20: string;
  24: string;
  28: string;
  32: string;
  36: string;
  40: string;
  44: string;
  48: string;
  52: string;
  56: string;
  60: string;
  64: string;
  72: string;
  80: string;
  96: string;
}

// =============================================================================
// SHADOW TYPES
// =============================================================================

/**
 * Box shadow interface
 */
export interface BoxShadow {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

/**
 * Drop shadow interface
 */
export interface DropShadow {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

/**
 * Shadow tokens interface
 */
export interface Shadows {
  box: BoxShadow;
  drop: DropShadow;
}

// =============================================================================
// BORDER RADIUS TYPES
// =============================================================================

/**
 * Border radius interface
 */
export interface BorderRadius {
  none: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
}

// =============================================================================
// BREAKPOINT TYPES
// =============================================================================

/**
 * Breakpoints interface
 */
export interface Breakpoints {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

// =============================================================================
// ANIMATION TYPES
// =============================================================================

/**
 * Animation duration interface
 */
export interface AnimationDuration {
  75: string;
  100: string;
  150: string;
  200: string;
  300: string;
  500: string;
  700: string;
  1000: string;
}

/**
 * Animation timing function interface
 */
export interface AnimationTimingFunction {
  linear: string;
  in: string;
  out: string;
  'in-out': string;
}

/**
 * Animation tokens interface
 */
export interface Animation {
  duration: AnimationDuration;
  timingFunction: AnimationTimingFunction;
}

// =============================================================================
// Z-INDEX TYPES
// =============================================================================

/**
 * Z-index interface
 */
export interface ZIndex {
  auto: string;
  0: string;
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  dropdown: string;
  sticky: string;
  fixed: string;
  modal: string;
  popover: string;
  tooltip: string;
  toast: string;
}

// =============================================================================
// COMPONENT TYPES
// =============================================================================

/**
 * Component size configuration
 */
export interface ComponentSize {
  height: string;
  padding: string;
  fontSize: string;
}

/**
 * Component sizes interface
 */
export interface ComponentSizes {
  xs: ComponentSize;
  sm: ComponentSize;
  md: ComponentSize;
  lg: ComponentSize;
  xl: ComponentSize;
}

/**
 * Component tokens interface
 */
export interface Components {
  sizes: ComponentSizes;
}

// =============================================================================
// MAIN TOKEN INTERFACES
// =============================================================================

/**
 * Color tokens interface
 */
export interface ColorTokens {
  base: BaseColors;
  semantic: SemanticColors;
  theme: ThemeColorSystem;
}

/**
 * Complete design token system interface
 */
export interface DesignTokens {
  colors: ColorTokens;
  typography: Typography;
  spacing: Spacing;
  shadows: Shadows;
  borderRadius: BorderRadius;
  breakpoints: Breakpoints;
  animation: Animation;
  zIndex: ZIndex;
  components: Components;
}

// =============================================================================
// THEME TYPES
// =============================================================================

/**
 * Available theme modes
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * Theme configuration
 */
export interface ThemeConfig {
  mode: ThemeMode;
  colors: ThemeColors;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Extract keys from token objects for type safety
 */
export type ColorScaleKey = keyof ColorScale;
export type SpacingKey = keyof Spacing;
export type FontSizeKey = keyof FontSize;
export type FontWeightKey = keyof FontWeight;
export type BorderRadiusKey = keyof BorderRadius;
export type BoxShadowKey = keyof BoxShadow;
export type BreakpointKey = keyof Breakpoints;
export type ComponentSizeKey = keyof ComponentSizes;

/**
 * Token value types for runtime validation
 */
export type TokenValue = string | number | string[] | Record<string, unknown>;

/**
 * Token path for nested access
 */
export type TokenPath = string[];

/**
 * Token resolver function type
 */
export type TokenResolver<T = TokenValue> = (path: TokenPath) => T | undefined;
