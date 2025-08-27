import { forwardRef, useMemo } from 'react';
import {
  TextProps,
  TextVariant,
  TextSize,
  TextWeight,
  TEXT_VARIANTS,
  TEXT_SIZES,
  TEXT_WEIGHTS,
  TEXT_ALIGNMENTS,
  TEXT_TRANSFORMS,
  TEXT_DECORATIONS,
  TEXT_WHITESPACE,
  TEXT_OVERFLOW,
  LINE_CLAMP_OPTIONS,
} from '../../types';
import { classNames } from '../../utils';
import {
  generateTypographyClasses,
  getSemanticElement,
  validateTypographyProps,
  getVariantConfig,
} from '../../utils/typography';

/**
 * Enhanced Text Component
 *
 * A flexible, accessible text component with comprehensive typography support.
 * Follows DRY principles with semantic variants and responsive capabilities.
 *
 * Features:
 * - Semantic typography variants (body, headline, caption, etc.)
 * - Responsive typography (size, weight, alignment)
 * - Advanced text handling (truncation, line clamping, overflow)
 * - Accessibility-first design with proper semantic elements
 * - Gradient text support
 * - Copy functionality
 * - Full Tailwind CSS integration
 */
const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      children,
      className,
      variant = 'body',
      size,
      weight,
      color,
      gradient = false,
      align,
      transform,
      decoration,
      whitespace,
      overflow,
      leading,
      tracking,
      truncate = false,
      lineClamp,
      selectable,
      copyable = false,
      semanticLevel,
      as,
      ...props
    },
    ref
  ) => {
    // Validate props in development
    if (process.env.NODE_ENV === 'development') {
      const errors = validateTypographyProps({ variant, size, weight });
      if (errors.length > 0) {
        console.warn('Text component validation errors:', errors);
      }
    }

    // Determine the semantic element to use
    const Component = useMemo(() => {
      if (semanticLevel) {
        return `h${semanticLevel}` as React.ElementType;
      }
      return getSemanticElement(variant, as);
    }, [variant, as, semanticLevel]);

    // Generate typography classes using DRY utility
    const typographyClasses = useMemo(() => {
      return generateTypographyClasses({
        variant,
        size,
        weight,
        align,
        transform,
        decoration,
        whitespace,
        overflow,
        leading,
        tracking,
        lineClamp,
        truncate,
        color,
        gradient,
        selectable,
      });
    }, [
      variant,
      size,
      weight,
      align,
      transform,
      decoration,
      whitespace,
      overflow,
      leading,
      tracking,
      lineClamp,
      truncate,
      color,
      gradient,
      selectable,
    ]);

    // Handle copy functionality
    const handleCopy = async () => {
      if (!copyable || typeof children !== 'string') return;

      try {
        await navigator.clipboard.writeText(children);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy text:', err);
      }
    };

    // Prepare props for the component
    const { 'aria-label': ariaLabel, ...restProps } =
      props as React.HTMLAttributes<HTMLElement>;

    const componentProps = {
      ref,
      className: classNames(typographyClasses, className),
      onClick: copyable ? handleCopy : restProps.onClick,
      role: copyable ? 'button' : restProps.role,
      tabIndex: copyable ? 0 : restProps.tabIndex,
      'aria-label': copyable
        ? `${ariaLabel || 'Copy text'}: ${children}`
        : ariaLabel,
      ...restProps,
    };

    return <Component {...componentProps}>{children}</Component>;
  }
);

Text.displayName = 'Text';

// =============================================================================
// STATIC PROPERTIES AND UTILITIES
// =============================================================================

// Add static properties for easy access to constants
type TextWithStatics = typeof Text & {
  variants: typeof TEXT_VARIANTS;
  sizes: typeof TEXT_SIZES;
  weights: typeof TEXT_WEIGHTS;
  alignments: typeof TEXT_ALIGNMENTS;
  transforms: typeof TEXT_TRANSFORMS;
  decorations: typeof TEXT_DECORATIONS;
  whitespace: typeof TEXT_WHITESPACE;
  overflow: typeof TEXT_OVERFLOW;
  lineClampOptions: typeof LINE_CLAMP_OPTIONS;

  // Utility methods
  getVariantConfig: (variant: string) =>
    | {
        defaultSize: TextSize;
        defaultWeight: TextWeight;
        defaultColor: string;
        semanticElement?: string;
        description: string;
      }
    | undefined;
  generateClasses: (props: Partial<TextProps>) => string;
};

// Attach static properties
(Text as TextWithStatics).variants = TEXT_VARIANTS;
(Text as TextWithStatics).sizes = TEXT_SIZES;
(Text as TextWithStatics).weights = TEXT_WEIGHTS;
(Text as TextWithStatics).alignments = TEXT_ALIGNMENTS;
(Text as TextWithStatics).transforms = TEXT_TRANSFORMS;
(Text as TextWithStatics).decorations = TEXT_DECORATIONS;
(Text as TextWithStatics).whitespace = TEXT_WHITESPACE;
(Text as TextWithStatics).overflow = TEXT_OVERFLOW;
(Text as TextWithStatics).lineClampOptions = LINE_CLAMP_OPTIONS;

// Utility methods
(Text as TextWithStatics).getVariantConfig = (variant: string) => {
  return getVariantConfig(variant as TextVariant);
};

(Text as TextWithStatics).generateClasses = (props: Partial<TextProps>) => {
  return generateTypographyClasses(props);
};

export default Text as TextWithStatics;
