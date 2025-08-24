import { forwardRef } from 'react';
import {
  TextProps,
  TEXT_VARIANTS,
  TEXT_SIZES,
  TEXT_WEIGHTS,
} from '../../types';
import { classNames } from '../../utils';

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      children,
      className,
      variant = 'body',
      size = 'md',
      weight = 'normal',
      color,
      align = 'left',
      transform = 'none',
      truncate = false,
      as: Component = 'p',
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      body: 'text-text-primary',
      caption: 'text-text-secondary text-sm',
      overline: 'text-text-secondary text-xs uppercase tracking-wide',
    };

    const sizeClasses = {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    };

    const weightClasses = {
      thin: 'font-thin',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    };

    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    };

    const transformClasses = {
      none: '',
      uppercase: 'uppercase',
      lowercase: 'lowercase',
      capitalize: 'capitalize',
    };

    const truncateClasses = truncate ? 'truncate' : '';

    // Support both CSS classes (starting with text-) and inline styles
    const isColorClass = color?.startsWith('text-');
    const colorClasses = isColorClass ? color : '';
    const colorStyle = !isColorClass && color ? { color } : undefined;

    return (
      <Component
        ref={ref}
        className={classNames(
          !colorClasses && variantClasses[variant], // Only apply variant color if no custom color class
          sizeClasses[size],
          weightClasses[weight],
          alignClasses[align],
          transformClasses[transform],
          truncateClasses,
          colorClasses,
          className
        )}
        style={colorStyle}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

// Add static properties
type TextWithStatics = typeof Text & {
  variants: typeof TEXT_VARIANTS;
  sizes: typeof TEXT_SIZES;
  weights: typeof TEXT_WEIGHTS;
};

(Text as TextWithStatics).variants = TEXT_VARIANTS;
(Text as TextWithStatics).sizes = TEXT_SIZES;
(Text as TextWithStatics).weights = TEXT_WEIGHTS;

export default Text;
