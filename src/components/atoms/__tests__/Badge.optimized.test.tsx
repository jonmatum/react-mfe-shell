import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Badge from '../Badge.optimized';

describe('Badge (DRY Optimized)', () => {
  it('renders with children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('generates semantic variant classes correctly', () => {
    const { rerender } = render(<Badge variant='primary'>Primary</Badge>);
    const badge = screen.getByText('Primary');

    // Should contain the generated semantic classes
    expect(badge.className).toContain('bg-primary-50');
    expect(badge.className).toContain('text-primary-700');
    expect(badge.className).toContain('dark:bg-primary-900/30');

    rerender(<Badge variant='success'>Success</Badge>);
    const successBadge = screen.getByText('Success');
    expect(successBadge.className).toContain('bg-success-50');
    expect(successBadge.className).toContain('text-success-700');
  });

  it('handles danger variant correctly (maps to error)', () => {
    render(<Badge variant='danger'>Danger</Badge>);
    const badge = screen.getByText('Danger');

    // Should map danger to error color
    expect(badge.className).toContain('bg-error-50');
    expect(badge.className).toContain('text-error-700');
  });

  it('generates size classes dynamically', () => {
    const { rerender } = render(<Badge size='sm'>Small</Badge>);
    const smallBadge = screen.getByText('Small');
    expect(smallBadge.className).toContain('px-2');
    expect(smallBadge.className).toContain('text-xs');

    rerender(<Badge size='lg'>Large</Badge>);
    const largeBadge = screen.getByText('Large');
    expect(largeBadge.className).toContain('px-3');
    expect(largeBadge.className).toContain('text-sm');
  });

  it('handles dot variant with dynamic sizing', () => {
    const { rerender, container } = render(
      <Badge dot size='sm'>
        Small Dot
      </Badge>
    );
    let badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('w-2');
    expect(badge.className).toContain('h-2');

    rerender(
      <Badge dot size='lg'>
        Large Dot
      </Badge>
    );
    badge = container.firstChild as HTMLElement;
    expect(badge.className).toContain('w-3');
    expect(badge.className).toContain('h-3');
  });

  it('generates aria-labels correctly', () => {
    const { rerender } = render(<Badge>Test Badge</Badge>);
    let badge = screen.getByText('Test Badge');
    expect(badge).toHaveAttribute('aria-label', 'Test Badge');

    rerender(
      <Badge>
        <span>Complex</span>
      </Badge>
    );
    badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('aria-label', 'Status indicator');
  });

  it('generates remove button classes dynamically', () => {
    const handleRemove = vi.fn();
    render(
      <Badge removable onRemove={handleRemove} variant='primary'>
        Removable
      </Badge>
    );

    const removeButton = screen.getByRole('button');
    expect(removeButton.className).toContain('hover:bg-primary-100');
    expect(removeButton.className).toContain('focus:ring-primary-500');
    expect(removeButton.className).toContain('dark:hover:bg-primary-800/50');
  });

  it('generates remove button aria-label correctly', () => {
    const handleRemove = vi.fn();
    render(
      <Badge removable onRemove={handleRemove}>
        Test Badge
      </Badge>
    );

    const removeButton = screen.getByRole('button');
    expect(removeButton).toHaveAttribute('aria-label', 'Remove Test Badge');
  });

  it('handles icon sizing dynamically', () => {
    const handleRemove = vi.fn();
    const { rerender } = render(
      <Badge removable onRemove={handleRemove} size='sm'>
        Small
      </Badge>
    );

    let removeButton = screen.getByRole('button');
    expect(removeButton.className).toContain('w-3');
    expect(removeButton.className).toContain('h-3');

    rerender(
      <Badge removable onRemove={handleRemove} size='lg'>
        Large
      </Badge>
    );

    removeButton = screen.getByRole('button');
    expect(removeButton.className).toContain('w-4');
    expect(removeButton.className).toContain('h-4');
  });

  it('maintains all original functionality', () => {
    const handleRemove = vi.fn();
    render(
      <Badge
        variant='success'
        size='lg'
        removable
        onRemove={handleRemove}
        className='custom-class'
      >
        Full Featured
      </Badge>
    );

    const badge = screen.getByText('Full Featured');
    expect(badge).toHaveClass('custom-class');
    expect(badge).toHaveAttribute('role', 'status');

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalled();
  });

  it('exposes static properties', () => {
    expect(Badge.variants).toEqual([
      'default',
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
    ]);
    expect(Badge.sizes).toEqual(['sm', 'md', 'lg']);
  });

  it('supports polymorphic rendering', () => {
    render(<Badge as='div'>Polymorphic Badge</Badge>);
    const badge = screen.getByText('Polymorphic Badge');
    expect(badge.tagName).toBe('DIV');
  });
});
