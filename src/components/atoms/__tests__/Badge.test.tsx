import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Badge from '../Badge';

describe('Badge', () => {
  it('renders with children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies correct variant classes for light theme', () => {
    const { rerender } = render(<Badge variant='primary'>Primary</Badge>);
    const badge = screen.getByText('Primary');
    expect(badge).toHaveClass(
      'bg-primary-50',
      'text-primary-700',
      'border-primary-200'
    );

    rerender(<Badge variant='success'>Success</Badge>);
    const successBadge = screen.getByText('Success');
    expect(successBadge).toHaveClass(
      'bg-success-50',
      'text-success-700',
      'border-success-200'
    );

    rerender(<Badge variant='danger'>Danger</Badge>);
    const dangerBadge = screen.getByText('Danger');
    expect(dangerBadge).toHaveClass(
      'bg-error-50',
      'text-error-700',
      'border-error-200'
    );
  });

  it('applies dark theme classes', () => {
    const { rerender } = render(<Badge variant='primary'>Primary</Badge>);
    const badge = screen.getByText('Primary');
    expect(badge).toHaveClass(
      'dark:bg-primary-900/30',
      'dark:text-primary-300',
      'dark:border-primary-700/50'
    );

    rerender(<Badge variant='success'>Success</Badge>);
    const successBadge = screen.getByText('Success');
    expect(successBadge).toHaveClass(
      'dark:bg-success-900/30',
      'dark:text-success-300',
      'dark:border-success-700/50'
    );
  });

  it('applies theme-aware classes for default and secondary variants', () => {
    const { rerender } = render(<Badge variant='default'>Default</Badge>);
    const defaultBadge = screen.getByText('Default');
    expect(defaultBadge).toHaveClass(
      'bg-surface-secondary',
      'text-text-primary',
      'border-border-primary'
    );

    rerender(<Badge variant='secondary'>Secondary</Badge>);
    const secondaryBadge = screen.getByText('Secondary');
    expect(secondaryBadge).toHaveClass(
      'bg-surface-tertiary',
      'text-text-secondary',
      'border-border-secondary'
    );
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Badge size='sm'>Small</Badge>);
    const smallBadge = screen.getByText('Small');
    expect(smallBadge).toHaveClass('px-2', 'py-0.5', 'text-xs', 'gap-1');

    rerender(<Badge size='lg'>Large</Badge>);
    const largeBadge = screen.getByText('Large');
    expect(largeBadge).toHaveClass('px-3', 'py-1', 'text-sm', 'gap-1.5');
  });

  it('renders with dot indicator and proper accessibility', () => {
    const { container } = render(<Badge dot>Status</Badge>);
    const badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('rounded-full');
    expect(badge).toHaveClass('w-2.5', 'h-2.5'); // default md size for dot
    expect(badge).toHaveAttribute('role', 'status');
    expect(badge).toHaveAttribute('aria-label', 'Status');
  });

  it('renders dot with different sizes', () => {
    const { rerender, container } = render(<Badge dot size='sm'>Small Dot</Badge>);
    let badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('w-2', 'h-2');

    rerender(<Badge dot size='lg'>Large Dot</Badge>);
    badge = container.firstChild as HTMLElement;
    expect(badge).toHaveClass('w-3', 'h-3');
  });

  it('renders removable badge with theme-aware remove button', () => {
    const handleRemove = vi.fn();
    render(
      <Badge removable onRemove={handleRemove} variant='primary'>
        Removable
      </Badge>
    );

    const removeButton = screen.getByRole('button', { name: 'Remove Removable' });
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveClass(
      'hover:bg-primary-100',
      'focus:ring-primary-500',
      'dark:hover:bg-primary-800/50',
      'dark:focus:ring-primary-400'
    );

    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalled();
  });

  it('applies variant-specific remove button styles', () => {
    const { rerender } = render(
      <Badge removable onRemove={() => {}} variant='success'>
        Success Badge
      </Badge>
    );

    let removeButton = screen.getByRole('button');
    expect(removeButton).toHaveClass(
      'hover:bg-success-100',
      'focus:ring-success-500',
      'dark:hover:bg-success-800/50'
    );

    rerender(
      <Badge removable onRemove={() => {}} variant='danger'>
        Danger Badge
      </Badge>
    );

    removeButton = screen.getByRole('button');
    expect(removeButton).toHaveClass(
      'hover:bg-error-100',
      'focus:ring-error-500',
      'dark:hover:bg-error-800/50'
    );
  });

  it('does not render remove button when not removable', () => {
    render(<Badge>Not Removable</Badge>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className='custom-class'>Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<Badge>Status Badge</Badge>);
    const badge = screen.getByText('Status Badge');
    expect(badge).toHaveAttribute('role', 'status');
  });

  it('handles keyboard navigation for remove button', () => {
    const handleRemove = vi.fn();
    render(
      <Badge removable onRemove={handleRemove}>
        Keyboard Test
      </Badge>
    );

    const removeButton = screen.getByRole('button');
    expect(removeButton).toHaveAttribute('tabIndex', '0');
    
    // Test focus
    removeButton.focus();
    expect(removeButton).toHaveFocus();
  });

  it('stops event propagation on remove button click', () => {
    const handleRemove = vi.fn();
    const handleBadgeClick = vi.fn();
    
    render(
      <Badge removable onRemove={handleRemove} onClick={handleBadgeClick}>
        Test Badge
      </Badge>
    );

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);
    
    expect(handleRemove).toHaveBeenCalled();
    expect(handleBadgeClick).not.toHaveBeenCalled();
  });

  it('exposes variant and size constants', () => {
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
    render(<Badge as="div">Polymorphic Badge</Badge>);
    const badge = screen.getByText('Polymorphic Badge');
    expect(badge.tagName).toBe('DIV');
  });

  it('includes proper ARIA attributes for remove button icon', () => {
    render(
      <Badge removable onRemove={() => {}}>
        Test
      </Badge>
    );

    const removeButton = screen.getByRole('button');
    const icon = removeButton.querySelector('svg');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
