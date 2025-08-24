import { forwardRef } from 'react';
import {
  IconProps,
  ICON_SIZES,
} from '../../types';
import { classNames } from '../../utils';

const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      children,
      className,
      name,
      size = 'md',
      color,
      'aria-hidden': ariaHidden = true,
      'aria-label': ariaLabel,
      as: Component = 'svg',
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      xl: 'w-8 h-8',
      '2xl': 'w-10 h-10',
    };

    const baseClasses = 'inline-block flex-shrink-0';

    const colorStyle = color ? { color } : undefined;

    // If no children provided and name is given, render a placeholder
    const iconContent = children || (name && (
      <>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" />
      </>
    ));

    return (
      <Component
        ref={ref}
        className={classNames(
          baseClasses,
          sizeClasses[size],
          className
        )}
        style={colorStyle}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        role={ariaLabel ? 'img' : undefined}
        {...props}
      >
        {iconContent}
      </Component>
    );
  }
);

Icon.displayName = 'Icon';

// Add static properties
(Icon as any).sizes = ICON_SIZES;

export default Icon;
