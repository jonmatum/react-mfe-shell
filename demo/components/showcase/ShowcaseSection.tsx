import React from 'react';
import { Card, FeatureChip } from '../../../src';

interface ShowcaseSectionProps {
  id?: string;
  title: string | React.ReactNode;
  description: string;
  badge?: {
    text: string;
    variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: React.ReactNode;
  };
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable showcase section component following atomic design
 * Now uses the actual FeatureChip component for consistency
 */
export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  id,
  title,
  description,
  badge,
  children,
  className = "py-16"
}) => {
  return (
    <section id={id} className={className}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          {badge && (
            <div className="flex justify-center mb-4">
              <FeatureChip 
                variant={badge.variant || 'primary'} 
                size={badge.size || 'md'}
                icon={badge.icon}
              >
                {badge.text}
              </FeatureChip>
            </div>
          )}
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            {title}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {description}
          </p>
        </div>
        {children}
      </div>
    </section>
  );
};

interface ShowcaseCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

/**
 * Reusable showcase card component
 */
export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  title,
  description,
  children,
  actions
}) => {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-text-primary">{title}</h3>
            {description && (
              <p className="text-sm text-text-secondary">{description}</p>
            )}
          </div>
          {actions}
        </div>
      </Card.Header>
      <Card.Body>
        {children}
      </Card.Body>
    </Card>
  );
};

interface ComponentGridProps {
  children: React.ReactNode;
  columns?: 'auto' | 1 | 2 | 3 | 4;
}

/**
 * Reusable grid layout for components
 */
export const ComponentGrid: React.FC<ComponentGridProps> = ({
  children,
  columns = 'auto'
}) => {
  const gridClasses = {
    'auto': 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
    1: 'grid gap-6',
    2: 'grid gap-6 md:grid-cols-2',
    3: 'grid gap-6 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid gap-6 md:grid-cols-2 lg:grid-cols-4'
  };

  return (
    <div className={gridClasses[columns]}>
      {children}
    </div>
  );
};
