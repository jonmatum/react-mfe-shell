import { memo } from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'current';
  text?: string;
  'aria-label'?: string;
}

/**
 * A flexible loading spinner component with multiple sizes, colors, and optional text
 *
 * @example
 * ```tsx
 * <LoadingSpinner size="lg" color="primary" />
 * <LoadingSpinner size="sm" color="white" text="Loading..." />
 * ```
 */
const LoadingSpinner = memo<LoadingSpinnerProps>(
  ({
    className,
    size = 'md',
    color = 'primary',
    text,
    'aria-label': ariaLabel = 'Loading',
    ...props
  }) => {
    const sizeClasses = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-16 w-16',
    };

    const colorClasses = {
      primary: 'border-gray-300 border-t-blue-600',
      secondary: 'border-gray-200 border-t-gray-600',
      white: 'border-white/30 border-t-white',
      current: 'border-current/30 border-t-current',
    };

    const textSizeClasses = {
      xs: 'text-xs',
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    };

    return (
      <div
        className={classNames(
          'flex flex-col items-center justify-center',
          className
        )}
        {...props}
      >
        <div
          className={classNames(
            'animate-spin rounded-full border-2',
            sizeClasses[size],
            colorClasses[color]
          )}
          role='status'
          aria-label={ariaLabel}
        >
          <span className='sr-only'>{ariaLabel}</span>
        </div>
        {text && (
          <p
            className={classNames(
              'mt-2 text-gray-600 dark:text-gray-400',
              textSizeClasses[size]
            )}
          >
            {text}
          </p>
        )}
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
