import { forwardRef } from 'react';
import {
  LabelProps,
  LABEL_SIZES,
} from '../../types';
import { classNames } from '../../utils';

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      className,
      htmlFor,
      required = false,
      disabled = false,
      size = 'md',
      as: Component = 'label',
      ...props
    },
    ref
  ) => {
    const baseClasses = 'block font-medium transition-colors duration-200';

    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    const stateClasses = disabled
      ? 'text-text-disabled cursor-not-allowed'
      : 'text-text-primary';

    return (
      <Component
        ref={ref}
        htmlFor={htmlFor}
        className={classNames(
          baseClasses,
          sizeClasses[size],
          stateClasses,
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span
            className="ml-1 text-danger-500"
            aria-label="required"
            title="This field is required"
          >
            *
          </span>
        )}
      </Component>
    );
  }
);

Label.displayName = 'Label';

// Add static properties
(Label as any).sizes = LABEL_SIZES;

export default Label;
