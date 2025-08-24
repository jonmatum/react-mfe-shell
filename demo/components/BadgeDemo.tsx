import React, { useState } from 'react';
import { Badge } from '../../src';

const BadgeDemo: React.FC = () => {
  const [removedBadges, setRemovedBadges] = useState<Set<string>>(new Set());

  const handleRemove = (badgeId: string) => {
    setRemovedBadges(prev => new Set([...prev, badgeId]));
  };

  const resetBadges = () => {
    setRemovedBadges(new Set());
  };

  const variants = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
  const sizes = ['sm', 'md', 'lg'] as const;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-4">Badge Component</h2>
        <p className="text-text-secondary mb-6">
          Status indicators with full dark theme support and accessibility features.
        </p>
      </div>

      {/* Basic Variants */}
      <section>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Variants</h3>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Badge key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Badge>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Sizes</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-3">
              <span className="text-text-secondary w-12 text-sm">{size}:</span>
              <div className="flex gap-3">
                {variants.slice(0, 4).map((variant) => (
                  <Badge key={`${size}-${variant}`} variant={variant} size={size}>
                    {variant}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dot Indicators */}
      <section>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Dot Indicators</h3>
        <div className="space-y-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-3">
              <span className="text-text-secondary w-12 text-sm">{size}:</span>
              <div className="flex items-center gap-3">
                {variants.slice(0, 4).map((variant) => (
                  <div key={`dot-${size}-${variant}`} className="flex items-center gap-2">
                    <Badge variant={variant} size={size} dot />
                    <span className="text-text-secondary text-sm">{variant}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Removable Badges */}
      <section>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Removable Badges</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => {
              const badgeId = `removable-${variant}`;
              if (removedBadges.has(badgeId)) return null;
              
              return (
                <Badge
                  key={badgeId}
                  variant={variant}
                  removable
                  onRemove={() => handleRemove(badgeId)}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Badge>
              );
            })}
          </div>
          
          {removedBadges.size > 0 && (
            <button
              onClick={resetBadges}
              className="px-3 py-1 text-sm bg-surface-secondary hover:bg-surface-tertiary text-text-primary border border-border-primary rounded-md transition-colors"
            >
              Reset Badges
            </button>
          )}
        </div>
      </section>

      {/* With Numbers */}
      <section>
        <h3 className="text-lg font-semibold text-text-primary mb-4">With Numbers</h3>
        <div className="flex flex-wrap gap-3">
          <Badge variant="primary">1</Badge>
          <Badge variant="success">12</Badge>
          <Badge variant="warning">99+</Badge>
          <Badge variant="danger">New</Badge>
          <Badge variant="secondary">Beta</Badge>
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Interactive Examples</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-text-secondary">Notifications:</span>
            <Badge variant="danger" size="sm">3</Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-text-secondary">Status:</span>
            <Badge variant="success" dot />
            <span className="text-text-secondary text-sm">Online</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-text-secondary">Tags:</span>
            <Badge variant="primary" removable onRemove={() => console.log('React removed')}>
              React
            </Badge>
            <Badge variant="secondary" removable onRemove={() => console.log('TypeScript removed')}>
              TypeScript
            </Badge>
            <Badge variant="success" removable onRemove={() => console.log('Tailwind removed')}>
              Tailwind
            </Badge>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Accessibility Features</h3>
        <div className="space-y-3">
          <div className="text-text-secondary text-sm space-y-1">
            <p>• All badges have proper <code>role="status"</code> attributes</p>
            <p>• Remove buttons include descriptive <code>aria-label</code> attributes</p>
            <p>• Keyboard navigation support with proper focus management</p>
            <p>• High contrast support for better visibility</p>
            <p>• Theme-aware focus rings that adapt to light/dark modes</p>
          </div>
        </div>
      </section>

      {/* Theme Comparison */}
      <section>
        <h3 className="text-lg font-semibold text-text-primary mb-4">Theme Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">Light Theme</h4>
            <div className="flex flex-wrap gap-2">
              {variants.slice(0, 4).map((variant) => (
                <Badge key={`light-${variant}`} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-gray-900 border border-gray-700 rounded-lg">
            <h4 className="font-medium text-gray-100 mb-3">Dark Theme</h4>
            <div className="flex flex-wrap gap-2">
              {variants.slice(0, 4).map((variant) => (
                <Badge key={`dark-${variant}`} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BadgeDemo;
