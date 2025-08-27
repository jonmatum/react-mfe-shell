import { forwardRef, useMemo } from 'react';
import { ParagraphProps } from '../../types';
import { classNames } from '../../utils';
import { generateTypographyClasses } from '../../utils/typography';

/**
 * Paragraph Component
 *
 * Semantic paragraph component optimized for body content.
 * Provides consistent spacing and typography for text blocks.
 *
 * Features:
 * - Semantic HTML (p, div, span)
 * - Optimized for readability
 * - Responsive typography
 * - Advanced text handling
 */
const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
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
      leading = 'relaxed',
      tracking,
      truncate = false,
      lineClamp,
      selectable,
      as = 'p',
      ...props
    },
    ref
  ) => {
    // Generate typography classes
    const typographyClasses = useMemo(() => {
      return generateTypographyClasses({
        variant,
        size,
        weight,
        align,
        transform,
        decoration,
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
      leading,
      tracking,
      lineClamp,
      truncate,
      color,
      gradient,
      selectable,
    ]);

    const Component = as;

    return (
      <Component
        ref={ref}
        className={classNames(
          typographyClasses,
          // Add default paragraph spacing
          as === 'p' && 'mb-4 last:mb-0',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Paragraph.displayName = 'Paragraph';

export default Paragraph;
