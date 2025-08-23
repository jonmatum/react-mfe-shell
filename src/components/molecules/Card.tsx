import React, { memo } from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

/**
 * A flexible card component for content containers
 *
 * @example
 * ```tsx
 * <Card variant="elevated" hoverable>
 *   <Card.Header>
 *     <h3>Card Title</h3>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Card content goes here</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Action</Button>
 *   </Card.Footer>
 * </Card>
 * ```
 */
const Card = memo<CardProps>(
  ({
    children,
    className,
    variant = 'default',
    padding = 'md',
    hoverable = false,
    clickable = false,
    onClick,
    ...props
  }) => {
    const baseClasses = 'rounded-lg transition-all duration-200';

    const variantClasses = {
      default: 'bg-white dark:bg-gray-800',
      outlined:
        'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
      elevated: 'bg-white dark:bg-gray-800 shadow-md',
    };

    const paddingClasses = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const interactiveClasses = {
      hoverable: hoverable && 'hover:shadow-lg hover:-translate-y-0.5',
      clickable:
        clickable &&
        'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    };

    const Component = clickable ? 'button' : 'div';

    return (
      <Component
        className={classNames(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          interactiveClasses.hoverable,
          interactiveClasses.clickable,
          className
        )}
        onClick={clickable ? onClick : undefined}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

/**
 * Card Header component for consistent header styling
 */
const CardHeader = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className }) => (
    <div
      className={classNames(
        'mb-4 pb-4 border-b border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  )
);

/**
 * Card Body component for main content
 */
const CardBody = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className }) => (
    <div className={classNames('flex-1', className)}>{children}</div>
  )
);

/**
 * Card Footer component for actions and additional content
 */
const CardFooter = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className }) => (
    <div
      className={classNames(
        'mt-4 pt-4 border-t border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  )
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';

// Define the compound component type
interface CardComponent extends React.NamedExoticComponent<CardProps> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

// Compound component pattern
const CardWithCompounds = Card as CardComponent;
CardWithCompounds.Header = CardHeader;
CardWithCompounds.Body = CardBody;
CardWithCompounds.Footer = CardFooter;

export default CardWithCompounds;
