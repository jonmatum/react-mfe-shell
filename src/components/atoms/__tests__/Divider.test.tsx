import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Divider from '../Divider';

describe('Divider', () => {
  it('renders correctly with default props', () => {
    render(<Divider />);

    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass(
      'border-border-primary',
      'w-full',
      'border-t',
      'border-solid',
      'my-4'
    );
  });

  it('renders horizontal orientation correctly', () => {
    render(<Divider orientation='horizontal' />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('w-full', 'border-t');
  });

  it('renders vertical orientation correctly', () => {
    render(<Divider orientation='vertical' />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('h-full', 'border-l');
  });

  it('applies different variant styles', () => {
    const { rerender } = render(<Divider variant='solid' />);

    let divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-solid');

    rerender(<Divider variant='dashed' />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-dashed');

    rerender(<Divider variant='dotted' />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('border-dotted');
  });

  it('applies different spacing options for horizontal', () => {
    const { rerender } = render(
      <Divider orientation='horizontal' spacing='none' />
    );

    let divider = screen.getByRole('separator');
    expect(divider).toHaveClass('my-0');

    rerender(<Divider orientation='horizontal' spacing='sm' />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('my-2');

    rerender(<Divider orientation='horizontal' spacing='md' />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('my-4');

    rerender(<Divider orientation='horizontal' spacing='lg' />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('my-6');
  });

  it('applies different spacing options for vertical', () => {
    const { rerender } = render(
      <Divider orientation='vertical' spacing='none' />
    );

    let divider = screen.getByRole('separator');
    expect(divider).toHaveClass('mx-0');

    rerender(<Divider orientation='vertical' spacing='sm' />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('mx-2');

    rerender(<Divider orientation='vertical' spacing='md' />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('mx-4');

    rerender(<Divider orientation='vertical' spacing='lg' />);
    divider = screen.getByRole('separator');
    expect(divider).toHaveClass('mx-6');
  });

  it('renders with label correctly', () => {
    render(<Divider label='Section Break' />);

    expect(screen.getByText('Section Break')).toBeInTheDocument();

    // When label is present, it should render as a div, not hr
    const container = screen.getByText('Section Break').parentElement;
    expect(container).toHaveClass('relative', 'flex', 'items-center');

    // Should have two divider lines on either side of the label
    const dividerLines = container?.querySelectorAll('div.flex-grow');
    expect(dividerLines).toHaveLength(2);
  });

  it('renders label with correct styling', () => {
    render(<Divider label='Test Label' />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveClass(
      'px-3',
      'text-sm',
      'text-text-secondary',
      'bg-background-primary'
    );
  });

  it('applies custom className', () => {
    render(<Divider className='custom-divider-class' />);

    const divider = screen.getByRole('separator');
    expect(divider).toHaveClass('custom-divider-class');
  });

  it('applies custom className with label', () => {
    render(<Divider label='Test' className='custom-divider-class' />);

    const container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('custom-divider-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLHRElement>();
    render(<Divider ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLHRElement);
  });

  it('forwards ref correctly with label', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Divider ref={ref} label='Test' />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('supports polymorphic as prop', () => {
    render(<Divider as='div' data-testid='custom-divider' />);

    const divider = screen.getByTestId('custom-divider');
    expect(divider.tagName).toBe('DIV');
    expect(divider).toHaveClass('border-border-primary');
  });

  it('passes through additional props', () => {
    render(
      <Divider
        data-testid='divider-with-props'
        aria-label='Custom divider'
        role='separator'
      />
    );

    const divider = screen.getByTestId('divider-with-props');
    expect(divider).toHaveAttribute('aria-label', 'Custom divider');
    expect(divider).toHaveAttribute('role', 'separator');
  });

  it('handles label with horizontal orientation and different spacings', () => {
    const { rerender } = render(
      <Divider label='Test' orientation='horizontal' spacing='sm' />
    );

    let container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('my-2');

    rerender(<Divider label='Test' orientation='horizontal' spacing='lg' />);

    container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('my-6');
  });

  it('handles label with vertical orientation and different spacings', () => {
    const { rerender } = render(
      <Divider label='Test' orientation='vertical' spacing='sm' />
    );

    let container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('mx-2');

    rerender(<Divider label='Test' orientation='vertical' spacing='lg' />);

    container = screen.getByText('Test').parentElement;
    expect(container).toHaveClass('mx-6');
  });

  it('applies variant classes to label divider lines', () => {
    render(<Divider label='Test' variant='dashed' />);

    const container = screen.getByText('Test').parentElement;
    const dividerLines = container?.querySelectorAll('div.flex-grow');

    dividerLines?.forEach(line => {
      expect(line).toHaveClass('border-dashed');
    });
  });

  it('applies orientation classes to label divider lines', () => {
    render(<Divider label='Test' orientation='vertical' />);

    const container = screen.getByText('Test').parentElement;
    const dividerLines = container?.querySelectorAll('div.flex-grow');

    dividerLines?.forEach(line => {
      expect(line).toHaveClass('border-l');
    });
  });
});
