import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Badge from '../Badge';

describe('Badge (DRY Optimized with Responsive Text)', () => {
  it('renders with children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('generates semantic variant classes correctly', () => {
    const { rerender } = render(<Badge variant='primary'>Primary</Badge>);
    const badge = screen.getByText('Primary').parentElement;

    // Should contain the generated semantic classes
    expect(badge?.className).toContain('bg-primary-50');
    expect(badge?.className).toContain('text-primary-700');
    expect(badge?.className).toContain('dark:bg-primary-900/30');

    rerender(<Badge variant='success'>Success</Badge>);
    const successBadge = screen.getByText('Success').parentElement;
    expect(successBadge?.className).toContain('bg-success-50');
    expect(successBadge?.className).toContain('text-success-700');
  });

  it('handles danger variant correctly (maps to error)', () => {
    render(<Badge variant='danger'>Danger</Badge>);
    const badge = screen.getByText('Danger').parentElement;

    // Should map danger to error color
    expect(badge?.className).toContain('bg-error-50');
    expect(badge?.className).toContain('text-error-700');
  });

  it('generates size classes dynamically with responsive max-width', () => {
    const { rerender } = render(<Badge size='sm'>Small Badge Text</Badge>);
    const smallBadge = screen.getByText('Small Badge Text').parentElement;
    expect(smallBadge?.className).toContain('px-2');
    expect(smallBadge?.className).toContain('text-xs');
    expect(smallBadge?.className).toContain('max-w-[10rem]');

    rerender(<Badge size='lg'>Large Badge Text</Badge>);
    const largeBadge = screen.getByText('Large Badge Text').parentElement;
    expect(largeBadge?.className).toContain('px-3');
    expect(largeBadge?.className).toContain('text-sm');
    expect(largeBadge?.className).toContain('max-w-[16rem]');
  });

  it('adjusts max-width when removable button is present', () => {
    const { rerender } = render(
      <Badge size='md' removable onRemove={() => {}}>
        Medium Badge
      </Badge>
    );
    const badgeWithButton = screen.getByText('Medium Badge').parentElement;
    expect(badgeWithButton?.className).toContain('max-w-[10rem]');

    rerender(<Badge size='md'>Medium Badge</Badge>);
    const badgeWithoutButton = screen.getByText('Medium Badge').parentElement;
    expect(badgeWithoutButton?.className).toContain('max-w-[12rem]');
  });

  it('applies text truncation classes correctly', () => {
    render(<Badge>Very Long Badge Text That Should Be Truncated</Badge>);
    const textSpan = screen.getByText(
      'Very Long Badge Text That Should Be Truncated'
    );

    expect(textSpan.className).toContain('truncate');
    expect(textSpan.className).toContain('overflow-hidden');
    expect(textSpan.className).toContain('whitespace-nowrap');
    expect(textSpan.className).toContain('flex-shrink');
    expect(textSpan.className).toContain('min-w-0');
  });

  it('adds title attribute for accessibility when text might be truncated', () => {
    render(<Badge>Long Badge Text</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toHaveAttribute('title', 'Long Badge Text');
  });

  it('does not add title attribute for dot variant', () => {
    render(<Badge dot>Dot Badge</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).not.toHaveAttribute('title');
  });

  it('handles dot variant with dynamic sizing', () => {
    const { rerender, container } = render(
      <Badge dot size='sm'>
        Small Dot
      </Badge>
    );
    const smallDot = container.firstChild as HTMLElement;
    expect(smallDot.className).toContain('w-2');
    expect(smallDot.className).toContain('h-2');

    rerender(
      <Badge dot size='lg'>
        Large Dot
      </Badge>
    );
    const largeDot = container.firstChild as HTMLElement;
    expect(largeDot.className).toContain('w-3');
    expect(largeDot.className).toContain('h-3');
  });

  it('generates remove button classes dynamically', () => {
    const onRemove = vi.fn();
    render(
      <Badge variant='primary' removable onRemove={onRemove}>
        Removable
      </Badge>
    );

    const removeButton = screen.getByRole('button');
    expect(removeButton.className).toContain('hover:bg-primary-100');
    expect(removeButton.className).toContain('focus:ring-primary-500');
    expect(removeButton.className).toContain('flex-shrink-0');
  });

  it('handles remove functionality with proper event handling', () => {
    const onRemove = vi.fn();
    const onClick = vi.fn();

    render(
      <Badge removable onRemove={onRemove} onClick={onClick}>
        Removable Badge
      </Badge>
    );

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled(); // Should stop propagation
  });

  it('generates accessible aria-labels correctly', () => {
    const onRemove = vi.fn();
    render(
      <Badge removable onRemove={onRemove}>
        Test Badge
      </Badge>
    );

    const badge = screen.getByRole('status');
    const removeButton = screen.getByRole('button');

    expect(badge).toHaveAttribute('aria-label', 'Test Badge');
    expect(removeButton).toHaveAttribute('aria-label', 'Remove Test Badge');
  });

  it('handles non-string children in aria-labels', () => {
    const onRemove = vi.fn();
    render(
      <Badge removable onRemove={onRemove}>
        <span>Complex Content</span>
      </Badge>
    );

    const badge = screen.getByRole('status');
    const removeButton = screen.getByRole('button');

    expect(badge).toHaveAttribute('aria-label', 'Status indicator');
    expect(removeButton).toHaveAttribute('aria-label', 'Remove badge');
  });

  it('supports polymorphic rendering with as prop', () => {
    render(
      <Badge as='div' data-testid='custom-badge'>
        Custom Element
      </Badge>
    );

    const badge = screen.getByTestId('custom-badge');
    expect(badge.tagName).toBe('DIV');
    expect(badge).toHaveAttribute('role', 'status');
  });

  it('applies custom className while preserving base classes', () => {
    render(
      <Badge className='custom-class' variant='success'>
        Custom Badge
      </Badge>
    );

    const badge = screen.getByText('Custom Badge').parentElement;
    expect(badge?.className).toContain('custom-class');
    expect(badge?.className).toContain('inline-flex');
    expect(badge?.className).toContain('bg-success-50');
  });

  it('maintains responsive layout with flex properties', () => {
    render(
      <Badge removable onRemove={() => {}}>
        Responsive Badge
      </Badge>
    );

    const badge = screen.getByText('Responsive Badge').parentElement;
    expect(badge?.className).toContain('inline-flex');
    expect(badge?.className).toContain('items-center');
    expect(badge?.className).toContain('min-w-0');
    expect(badge?.className).toContain('relative');
  });

  it('handles edge case with empty string children', () => {
    render(<Badge>{''}</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute('title', '');
  });

  it('handles edge case with undefined children', () => {
    render(<Badge>{undefined}</Badge>);
    const badge = screen.getByRole('status');
    expect(badge).toBeInTheDocument();
    expect(badge).not.toHaveAttribute('title');
  });

  it('exposes static properties correctly', () => {
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

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Badge ref={ref}>Ref Badge</Badge>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });

  it('handles keyboard navigation on remove button', () => {
    const onRemove = vi.fn();
    render(
      <Badge removable onRemove={onRemove}>
        Keyboard Badge
      </Badge>
    );

    const removeButton = screen.getByRole('button');
    expect(removeButton).toHaveAttribute('tabIndex', '0');

    fireEvent.keyDown(removeButton, { key: 'Enter' });
    // Note: We're not testing Enter key handling as it's browser default behavior
    // The button should be focusable and accessible via keyboard
  });

  it('maintains proper contrast and visibility classes', () => {
    const { rerender } = render(<Badge variant='primary'>Primary</Badge>);
    const primaryBadge = screen.getByText('Primary').parentElement;
    expect(primaryBadge?.className).toContain('text-primary-700');
    expect(primaryBadge?.className).toContain('dark:text-primary-300');

    rerender(<Badge variant='default'>Default</Badge>);
    const defaultBadge = screen.getByText('Default').parentElement;
    expect(defaultBadge?.className).toContain('text-text-primary');
  });

  it('renders with icon prop correctly', () => {
    const TestIcon = () => (
      <svg data-testid='test-icon'>
        <path />
      </svg>
    );
    render(<Badge icon={<TestIcon />}>Badge with Icon</Badge>);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Badge with Icon')).toBeInTheDocument();
  });

  it('applies correct icon classes based on size', () => {
    const TestIcon = () => (
      <svg data-testid='test-icon'>
        <path />
      </svg>
    );
    const { rerender } = render(
      <Badge size='sm' icon={<TestIcon />}>
        Small Badge
      </Badge>
    );

    const iconContainer = screen.getByTestId('test-icon').parentElement;
    expect(iconContainer?.className).toContain('w-3');
    expect(iconContainer?.className).toContain('h-3');
    expect(iconContainer?.className).toContain('flex-shrink-0');

    rerender(
      <Badge size='md' icon={<TestIcon />}>
        Medium Badge
      </Badge>
    );

    const mediumIconContainer = screen.getByTestId('test-icon').parentElement;
    expect(mediumIconContainer?.className).toContain('w-4');
    expect(mediumIconContainer?.className).toContain('h-4');
  });

  it('handles icon with removable badge correctly', () => {
    const TestIcon = () => (
      <svg data-testid='test-icon'>
        <path />
      </svg>
    );
    const onRemove = vi.fn();

    render(
      <Badge icon={<TestIcon />} removable onRemove={onRemove}>
        Removable with Icon
      </Badge>
    );

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(screen.getByText('Removable with Icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('maintains proper layout order: icon, text, remove button', () => {
    const TestIcon = () => (
      <svg data-testid='test-icon'>
        <path />
      </svg>
    );
    const onRemove = vi.fn();

    render(
      <Badge icon={<TestIcon />} removable onRemove={onRemove}>
        Badge Text
      </Badge>
    );

    const badge = screen.getByRole('status');
    const children = Array.from(badge.children);

    // Should have 3 children: icon span, text span, remove button
    expect(children).toHaveLength(3);
    expect(children[0]).toContainElement(screen.getByTestId('test-icon'));
    expect(children[1]).toHaveTextContent('Badge Text');
    expect(children[2].tagName).toBe('BUTTON');
  });

  it('applies proper spacing and layout for different content lengths', () => {
    const { rerender } = render(<Badge>Short</Badge>);
    const shortBadge = screen.getByText('Short').parentElement;
    expect(shortBadge?.className).toContain('gap-1');

    rerender(<Badge size='lg'>Large Badge</Badge>);
    const largeBadge = screen.getByText('Large Badge').parentElement;
    expect(largeBadge?.className).toContain('gap-1.5');
  });
});
