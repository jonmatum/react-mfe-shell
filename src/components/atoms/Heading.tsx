import { forwardRef, useMemo } from 'react';
import { HeadingProps } from '../../types';
import { classNames } from '../../utils';
import {
  generateTypographyClasses,
  generateHeadingClasses,
} from '../../utils/typography';

/**
 * Heading Component
 *
 * Semantic heading component with automatic sizing and accessibility.
 * Provides consistent typography hierarchy while maintaining flexibility.
 *
 * Features:
 * - Automatic semantic HTML (h1-h6)
 * - Level-based default sizing
 * - Full typography customization
 * - Accessibility-first design
 * - Responsive typography support
 */
const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      children,
      className,
      level,
      size,
      weight,
      color,
      gradient = false,
      align,
      transform,
      decoration,
      leading,
      tracking,
      truncate = false,
      lineClamp,
      selectable,
      as,
      ...props
    },
    ref
  ) => {
    // Determine the component to render
    const Component = as || (`h${level}` as React.ElementType);

    // Get default size and weight for the heading level
    const { defaultSize, defaultWeight } = useMemo(() => {
      return generateHeadingClasses(level);
    }, [level]);

    // Generate typography classes
    const typographyClasses = useMemo(() => {
      return generateTypographyClasses({
        variant: 'headline',
        size: size || defaultSize,
        weight: weight || defaultWeight,
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
      size,
      defaultSize,
      weight,
      defaultWeight,
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

    return (
      <Component
        ref={ref}
        className={classNames(typographyClasses, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export default Heading;
