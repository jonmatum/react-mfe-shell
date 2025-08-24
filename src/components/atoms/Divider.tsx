import { forwardRef } from 'react';
import { DividerProps } from '../../types';
import { classNames } from '../../utils';

const Divider = forwardRef<HTMLHRElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      spacing = 'md',
      label,
      className,
      as: Component = 'hr',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'border-border-primary';

    const orientationClasses = {
      horizontal: 'w-full border-t',
      vertical: 'h-full border-l',
    };

    const variantClasses = {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    };

    const spacingClasses = {
      none: orientation === 'horizontal' ? 'my-0' : 'mx-0',
      sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
      md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
      lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    };

    // If there's a label, render as a div with text
    if (label) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={classNames(
            'relative flex items-center',
            spacingClasses[spacing],
            className
          )}
          {...props}
        >
          <div
            className={classNames(
              'flex-grow',
              baseClasses,
              orientationClasses[orientation],
              variantClasses[variant]
            )}
          />
          <span className='px-3 text-sm text-text-secondary bg-background-primary'>
            {label}
          </span>
          <div
            className={classNames(
              'flex-grow',
              baseClasses,
              orientationClasses[orientation],
              variantClasses[variant]
            )}
          />
        </div>
      );
    }

    return (
      <Component
        ref={ref}
        className={classNames(
          baseClasses,
          orientationClasses[orientation],
          variantClasses[variant],
          spacingClasses[spacing],
          className
        )}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;
