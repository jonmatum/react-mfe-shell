import { forwardRef, useState, useCallback } from 'react';
import {
  AvatarProps,
  AVATAR_SIZES,
} from '../../types';
import { classNames } from '../../utils';

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      size = 'md',
      fallback,
      loading = 'lazy',
      className,
      children,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const sizeClasses = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-20 h-20 text-2xl',
    };

    const baseClasses = 'relative inline-flex items-center justify-center rounded-full bg-surface-secondary overflow-hidden';

    const handleImageError = useCallback(() => {
      setImageError(true);
    }, []);

    const handleImageLoad = useCallback(() => {
      setImageLoaded(true);
    }, []);

    // Generate initials from fallback text
    const getInitials = (text: string) => {
      return text
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const showImage = src && !imageError;
    const showFallback = ((!src || imageError) || (!imageLoaded && src)) && (fallback || children);
    const showDefaultIcon = !showImage && !showFallback;

    return (
      <Component
        ref={ref}
        className={classNames(
          baseClasses,
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || ''}
            loading={loading}
            onError={handleImageError}
            onLoad={handleImageLoad}
            className={classNames(
              'w-full h-full object-cover',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
          />
        )}
        
        {showFallback && (
          <span
            className="font-medium text-text-secondary select-none"
            aria-hidden={!!alt}
          >
            {children || (fallback && getInitials(fallback))}
          </span>
        )}
        
        {showDefaultIcon && (
          <svg
            className="w-full h-full text-text-secondary"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </Component>
    );
  }
);

Avatar.displayName = 'Avatar';

// Add static properties
(Avatar as any).sizes = AVATAR_SIZES;

export default Avatar;
