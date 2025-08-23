import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from '../Card';

describe('Card', () => {
  it('renders with children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Card variant='outlined'>Outlined</Card>);
    expect(screen.getByText('Outlined')).toHaveClass('border');

    rerender(<Card variant='elevated'>Elevated</Card>);
    expect(screen.getByText('Elevated')).toHaveClass('shadow-md');
  });

  it('applies correct padding classes', () => {
    const { rerender } = render(<Card padding='sm'>Small padding</Card>);
    expect(screen.getByText('Small padding')).toHaveClass('p-4');

    rerender(<Card padding='lg'>Large padding</Card>);
    expect(screen.getByText('Large padding')).toHaveClass('p-8');

    rerender(<Card padding='none'>No padding</Card>);
    expect(screen.getByText('No padding')).not.toHaveClass('p-4', 'p-6', 'p-8');
  });

  it('applies hover effects when hoverable', () => {
    render(<Card hoverable>Hoverable card</Card>);
    expect(screen.getByText('Hoverable card')).toHaveClass('hover:shadow-lg');
  });

  it('renders as button when clickable', () => {
    const handleClick = vi.fn();
    render(
      <Card clickable onClick={handleClick}>
        Clickable card
      </Card>
    );

    const card = screen.getByRole('button');
    expect(card).toHaveClass('cursor-pointer');

    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders compound components', () => {
    render(
      <Card>
        <Card.Header>Header content</Card.Header>
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer content</Card.Footer>
      </Card>
    );

    expect(screen.getByText('Header content')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card className='custom-class'>Custom card</Card>);
    expect(screen.getByText('Custom card')).toHaveClass('custom-class');
  });

  it('renders header with border', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
      </Card>
    );

    const header = screen.getByText('Header');
    expect(header).toHaveClass('border-b');
  });

  it('renders footer with border', () => {
    render(
      <Card>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    );

    const footer = screen.getByText('Footer');
    expect(footer).toHaveClass('border-t');
  });
});
