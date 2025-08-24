import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly with default props', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-600');

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(button).toHaveClass('bg-surface-secondary');

    rerender(<Button variant="danger">Danger</Button>);
    // The danger variant maps to error in our DRY implementation
    expect(button).toHaveClass('bg-error-600');
  });

  it('applies size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3', 'py-2', 'text-sm');

    rerender(<Button size="lg">Large</Button>);
    expect(button).toHaveClass('px-6', 'py-3', 'text-base');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // The disabled styles are applied via CSS, check for the disabled:opacity-50 class
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('handles loading state', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    // Use getAllByText to handle multiple "Loading" texts
    const loadingTexts = screen.getAllByText('Loading');
    const hiddenLoadingText = loadingTexts.find(el => el.classList.contains('opacity-0'));
    expect(hiddenLoadingText).toHaveClass('opacity-0');
  });

  it('renders with left icon', () => {
    const icon = <span data-testid="left-icon">←</span>;
    render(<Button leftIcon={icon}>With Icon</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    const icon = <span data-testid="right-icon">→</span>;
    render(<Button rightIcon={icon}>With Icon</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies fullWidth class when specified', () => {
    render(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents click when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('prevents click when loading', () => {
    const handleClick = vi.fn();
    render(<Button loading onClick={handleClick}>Loading</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('supports polymorphic rendering', () => {
    render(<Button as="a" href="/test">Link Button</Button>);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  describe('Button.Group', () => {
    it('renders button group correctly', () => {
      render(
        <Button.Group>
          <Button>First</Button>
          <Button>Second</Button>
        </Button.Group>
      );
      
      const group = screen.getByRole('group');
      expect(group).toBeInTheDocument();
      expect(screen.getByText('First')).toBeInTheDocument();
      expect(screen.getByText('Second')).toBeInTheDocument();
    });

    it('applies orientation classes', () => {
      const { rerender } = render(
        <Button.Group orientation="horizontal">
          <Button>First</Button>
        </Button.Group>
      );
      
      let group = screen.getByRole('group');
      expect(group).toHaveClass('flex-row');

      rerender(
        <Button.Group orientation="vertical">
          <Button>First</Button>
        </Button.Group>
      );
      
      group = screen.getByRole('group');
      expect(group).toHaveClass('flex-col');
    });

    it('applies spacing classes', () => {
      const { rerender } = render(
        <Button.Group spacing="sm">
          <Button>First</Button>
        </Button.Group>
      );
      
      let group = screen.getByRole('group');
      expect(group).toHaveClass('space-x-1');

      rerender(
        <Button.Group spacing="lg">
          <Button>First</Button>
        </Button.Group>
      );
      
      group = screen.getByRole('group');
      expect(group).toHaveClass('space-x-4');
    });
  });

  describe('Static properties', () => {
    it('exports variants correctly', () => {
      expect(Button.variants).toEqual([
        'primary',
        'secondary',
        'ghost',
        'danger',
        'success',
        'warning'
      ]);
    });

    it('exports sizes correctly', () => {
      expect(Button.sizes).toEqual(['xs', 'sm', 'md', 'lg', 'xl']);
    });
  });
});
