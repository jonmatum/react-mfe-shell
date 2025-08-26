import { forwardRef, useMemo, useState } from 'react';
import { CodeProps } from '../../types';
import { classNames } from '../../utils';
import { generateTypographyClasses } from '../../utils/typography';

/**
 * Code Component
 *
 * Specialized component for displaying code and monospace text.
 * Supports both inline and block code with syntax highlighting preparation.
 */
const Code = forwardRef<any, CodeProps>(
  (
    {
      children,
      className,
      inline = true,
      language,
      copyable = false,
      size = 'sm',
      weight = 'normal',
      color,
      as,
      ...props
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    // Determine component based on inline prop
    const Component = useMemo(() => {
      if (as) return as;
      return inline ? 'code' : 'pre';
    }, [as, inline]);

    // Generate typography classes
    const typographyClasses = useMemo(() => {
      return generateTypographyClasses({
        variant: 'code',
        size,
        weight,
        color,
      });
    }, [size, weight, color]);

    // Handle copy functionality
    const handleCopy = async () => {
      if (!copyable || typeof children !== 'string') return;

      try {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    };

    // Generate base classes
    const baseClasses = [typographyClasses, 'font-mono'];

    // Add inline-specific classes
    if (inline) {
      baseClasses.push(
        'px-1.5',
        'py-0.5',
        'bg-surface-secondary',
        'border',
        'border-border-primary',
        'rounded',
        'text-text-primary'
      );
    } else {
      // Add block-specific classes
      baseClasses.push(
        'block',
        'p-4',
        'bg-surface-primary',
        'border',
        'border-border-primary',
        'rounded-lg',
        'overflow-x-auto',
        'text-text-primary'
      );
    }

    // Add copyable classes
    if (copyable) {
      baseClasses.push(
        'relative',
        'cursor-pointer',
        'hover:bg-surface-tertiary',
        'transition-colors'
      );
    }

    const codeClasses = classNames(...baseClasses, className);

    const componentProps = {
      ref,
      className: codeClasses,
      onClick: copyable ? handleCopy : undefined,
      role: copyable ? 'button' : undefined,
      tabIndex: copyable ? 0 : undefined,
      'aria-label': copyable
        ? `${copied ? 'Copied!' : 'Copy code'}${language ? ` (${language})` : ''}`
        : undefined,
      'data-language': language,
      ...props,
    };

    // Copy icon SVG paths
    const CopyIcon = () => (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
        />
      </svg>
    );

    const CheckIcon = () => (
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M5 13l4 4L19 7'
        />
      </svg>
    );

    return (
      <Component {...componentProps}>
        {!inline && copyable && (
          <button
            className='absolute top-2 right-2 p-1.5 text-text-secondary hover:text-text-primary hover:bg-surface-secondary rounded transition-colors'
            onClick={handleCopy}
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
        )}
        {inline ? children : <code className='block'>{children}</code>}
      </Component>
    );
  }
);

Code.displayName = 'Code';

export default Code;
