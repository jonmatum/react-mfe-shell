import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Badge from '../Badge';

describe('Badge', () => {
  it('renders with children', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Badge variant='primary'>Primary</Badge>);
    expect(screen.getByText('Primary')).toHaveClass(
      'bg-blue-100',
      'text-blue-800'
    );

    rerender(<Badge variant='success'>Success</Badge>);
    expect(screen.getByText('Success')).toHaveClass(
      'bg-green-100',
      'text-green-800'
    );

    rerender(<Badge variant='danger'>Danger</Badge>);
    expect(screen.getByText('Danger')).toHaveClass(
      'bg-red-100',
      'text-red-800'
    );
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Badge size='sm'>Small</Badge>);
    expect(screen.getByText('Small')).toHaveClass('px-2', 'py-0.5', 'text-xs');

    rerender(<Badge size='lg'>Large</Badge>);
    expect(screen.getByText('Large')).toHaveClass('px-3', 'py-1', 'text-sm');
  });

  it('renders with dot indicator', () => {
    render(<Badge dot>With Dot</Badge>);
    const badge = screen.getByText('With Dot');
    expect(badge.querySelector('span')).toBeInTheDocument();
  });

  it('renders removable badge with remove button', () => {
    const handleRemove = vi.fn();
    render(
      <Badge removable onRemove={handleRemove}>
        Removable
      </Badge>
    );

    const removeButton = screen.getByRole('button', { name: 'Remove badge' });
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalled();
  });

  it('does not render remove button when not removable', () => {
    render(<Badge>Not Removable</Badge>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Badge className='custom-class'>Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
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
});
