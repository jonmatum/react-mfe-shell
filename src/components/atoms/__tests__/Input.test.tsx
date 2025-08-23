import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../Input';

describe('Input', () => {
  it('renders with basic props', () => {
    render(<Input placeholder='Enter text' />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label='Email' placeholder='Enter email' />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Input label='Email' required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with description', () => {
    render(<Input description='Enter your email address' />);
    expect(screen.getByText('Enter your email address')).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<Input error='This field is required' />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('applies error variant when error is present', () => {
    render(<Input error='Error message' />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-red-300');
  });

  it('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<Input size='sm' />);
    expect(screen.getByRole('textbox')).toHaveClass(
      'px-3',
      'py-1.5',
      'text-sm'
    );

    rerender(<Input size='lg' />);
    expect(screen.getByRole('textbox')).toHaveClass(
      'px-4',
      'py-3',
      'text-base'
    );
  });

  it('renders with icons', () => {
    render(
      <Input
        leftIcon={<span data-testid='left-icon'>@</span>}
        rightIcon={<span data-testid='right-icon'>✓</span>}
      />
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies correct padding when icons are present', () => {
    render(<Input leftIcon={<span>@</span>} rightIcon={<span>✓</span>} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('pl-10', 'pr-10');
  });

  it('sets aria attributes correctly', () => {
    render(
      <Input
        label='Email'
        description='Enter your email'
        error='Invalid email'
        id='email-input'
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});
