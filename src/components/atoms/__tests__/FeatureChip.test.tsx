import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FeatureChip from '../FeatureChip';

describe('FeatureChip (DRY Component)', () => {
  it('renders with children', () => {
    render(<FeatureChip>Component Library</FeatureChip>);
    expect(screen.getByText('Component Library')).toBeInTheDocument();
  });

  it('generates semantic variant classes correctly', () => {
    const { rerender } = render(
      <FeatureChip variant='primary'>Primary Chip</FeatureChip>
    );
    const chip = screen.getByText('Primary Chip').parentElement;

    // Should contain the generated semantic classes
    expect(chip?.className).toContain('bg-primary-50');
    expect(chip?.className).toContain('text-primary-700');
    expect(chip?.className).toContain('dark:bg-primary-900/30');

    rerender(<FeatureChip variant='success'>Success Chip</FeatureChip>);
    const successChip = screen.getByText('Success Chip').parentElement;
    expect(successChip?.className).toContain('bg-success-50');
    expect(successChip?.className).toContain('text-success-700');
  });

  it('handles danger variant correctly (maps to error)', () => {
    render(<FeatureChip variant='danger'>Danger Chip</FeatureChip>);
    const chip = screen.getByText('Danger Chip').parentElement;

    // Should map danger to error color
    expect(chip?.className).toContain('bg-error-50');
    expect(chip?.className).toContain('text-error-700');
  });

  it('generates size classes dynamically', () => {
    const { rerender } = render(
      <FeatureChip size='sm'>Small Chip</FeatureChip>
    );
    const smallChip = screen.getByText('Small Chip').parentElement;
    expect(smallChip?.className).toContain('px-3');
    expect(smallChip?.className).toContain('py-1.5');
    expect(smallChip?.className).toContain('text-sm');

    rerender(<FeatureChip size='lg'>Large Chip</FeatureChip>);
    const largeChip = screen.getByText('Large Chip').parentElement;
    expect(largeChip?.className).toContain('px-5');
    expect(largeChip?.className).toContain('py-2.5');
    expect(largeChip?.className).toContain('text-base');
  });

  it('renders with icon prop correctly', () => {
    const TestIcon = () => (
      <svg data-testid='test-icon'>
        <path />
      </svg>
    );
    render(<FeatureChip icon={<TestIcon />}>Chip with Icon</FeatureChip>);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Chip with Icon')).toBeInTheDocument();
  });

  it('applies correct icon classes based on size and variant', () => {
    const TestIcon = () => (
      <svg data-testid='test-icon'>
        <path />
      </svg>
    );
    const { rerender } = render(
      <FeatureChip size='sm' variant='primary' icon={<TestIcon />}>
        Small Primary
      </FeatureChip>
    );

    const iconContainer = screen.getByTestId('test-icon').parentElement;
    expect(iconContainer?.className).toContain('w-4');
    expect(iconContainer?.className).toContain('h-4');
    expect(iconContainer?.className).toContain('text-primary-600');
    expect(iconContainer?.className).toContain('flex-shrink-0');

    rerender(
      <FeatureChip size='lg' variant='success' icon={<TestIcon />}>
        Large Success
      </FeatureChip>
    );

    const largeIconContainer = screen.getByTestId('test-icon').parentElement;
    expect(largeIconContainer?.className).toContain('w-6');
    expect(largeIconContainer?.className).toContain('h-6');
    expect(largeIconContainer?.className).toContain('text-success-600');
  });

  it('handles default variant correctly', () => {
    render(<FeatureChip variant='default'>Default Chip</FeatureChip>);
    const chip = screen.getByText('Default Chip').parentElement;

    expect(chip?.className).toContain('bg-surface-secondary');
    expect(chip?.className).toContain('text-text-primary');
  });

  it('handles secondary variant correctly', () => {
    const TestIcon = () => (
      <svg data-testid='test-icon'>
        <path />
      </svg>
    );
    render(
      <FeatureChip variant='secondary' icon={<TestIcon />}>
        Secondary Chip
      </FeatureChip>
    );

    const chip = screen.getByText('Secondary Chip').parentElement;
    const iconContainer = screen.getByTestId('test-icon').parentElement;

    expect(chip?.className).toContain('bg-surface-tertiary');
    expect(chip?.className).toContain('text-text-secondary');
    expect(iconContainer?.className).toContain('text-text-tertiary');
  });

  it('generates accessible aria-labels correctly', () => {
    render(<FeatureChip>Test Chip</FeatureChip>);
    const chip = screen.getByRole('status');
    expect(chip).toHaveAttribute('aria-label', 'Test Chip');
  });

  it('handles non-string children in aria-labels', () => {
    render(
      <FeatureChip>
        <span>Complex Content</span>
      </FeatureChip>
    );

    const chip = screen.getByRole('status');
    expect(chip).toHaveAttribute('aria-label', 'Feature indicator');
  });

  it('supports polymorphic rendering with as prop', () => {
    render(
      <FeatureChip as='div' data-testid='custom-chip'>
        Custom Element
      </FeatureChip>
    );

    const chip = screen.getByTestId('custom-chip');
    expect(chip.tagName).toBe('DIV');
    expect(chip).toHaveAttribute('role', 'status');
  });

  it('applies custom className while preserving base classes', () => {
    render(
      <FeatureChip className='custom-class' variant='success'>
        Custom Chip
      </FeatureChip>
    );

    const chip = screen.getByText('Custom Chip').parentElement;
    expect(chip?.className).toContain('custom-class');
    expect(chip?.className).toContain('inline-flex');
    expect(chip?.className).toContain('bg-success-50');
  });

  it('maintains proper layout with flex properties', () => {
    const TestIcon = () => (
      <svg data-testid='test-icon'>
        <path />
      </svg>
    );
    render(<FeatureChip icon={<TestIcon />}>Flex Layout Chip</FeatureChip>);

    const chip = screen.getByText('Flex Layout Chip').parentElement;
    expect(chip?.className).toContain('inline-flex');
    expect(chip?.className).toContain('items-center');

    const iconContainer = screen.getByTestId('test-icon').parentElement;
    expect(iconContainer?.className).toContain('flex-shrink-0');
  });

  it('handles edge case with empty string children', () => {
    render(<FeatureChip>{''}</FeatureChip>);
    const chip = screen.getByRole('status');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveAttribute('aria-label', '');
  });

  it('handles edge case with undefined children', () => {
    render(<FeatureChip>{undefined}</FeatureChip>);
    const chip = screen.getByRole('status');
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveAttribute('aria-label', 'Feature indicator');
  });

  it('exposes static properties correctly', () => {
    expect(FeatureChip.variants).toEqual([
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
    ]);
    expect(FeatureChip.sizes).toEqual(['sm', 'md', 'lg']);
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<FeatureChip ref={ref}>Ref Chip</FeatureChip>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it('maintains proper contrast and visibility classes', () => {
    const { rerender } = render(
      <FeatureChip variant='primary'>Primary</FeatureChip>
    );
    const primaryChip = screen.getByText('Primary').parentElement;
    expect(primaryChip?.className).toContain('text-primary-700');
    expect(primaryChip?.className).toContain('dark:text-primary-300');

    rerender(<FeatureChip variant='default'>Default</FeatureChip>);
    const defaultChip = screen.getByText('Default').parentElement;
    expect(defaultChip?.className).toContain('text-text-primary');
  });

  it('applies proper spacing and layout for different sizes', () => {
    const { rerender } = render(<FeatureChip size='sm'>Small</FeatureChip>);
    const smallChip = screen.getByText('Small').parentElement;
    expect(smallChip?.className).toContain('gap-2');

    rerender(<FeatureChip size='lg'>Large</FeatureChip>);
    const largeChip = screen.getByText('Large').parentElement;
    expect(largeChip?.className).toContain('gap-2.5');
  });

  it('handles all variant and size combinations', () => {
    const variants = [
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
    ] as const;
    const sizes = ['sm', 'md', 'lg'] as const;

    variants.forEach(variant => {
      sizes.forEach(size => {
        const { unmount } = render(
          <FeatureChip variant={variant} size={size}>
            {variant} {size}
          </FeatureChip>
        );
        expect(screen.getByText(`${variant} ${size}`)).toBeInTheDocument();
        unmount();
      });
    });
  });
});
