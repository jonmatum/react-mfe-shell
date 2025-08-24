import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormField from '../FormField';
import Input from '../../atoms/Input';

describe('FormField', () => {
  it('renders with label and input', () => {
    render(
      <FormField label="Email Address">
        <Input type="email" />
      </FormField>
    );

    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('renders with required indicator', () => {
    render(
      <FormField label="Email Address" required>
        <Input type="email" />
      </FormField>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    const description = "We'll never share your email";
    render(
      <FormField label="Email Address" description={description}>
        <Input type="email" />
      </FormField>
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders error message when provided', () => {
    const error = 'Email is required';
    render(
      <FormField label="Email Address" error={error}>
        <Input type="email" />
      </FormField>
    );

    expect(screen.getAllByText(error)).toHaveLength(1);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('does not render description when error is present', () => {
    const description = "We'll never share your email";
    const error = 'Email is required';
    
    render(
      <FormField label="Email Address" description={description} error={error}>
        <Input type="email" />
      </FormField>
    );

    expect(screen.getAllByText(error)).toHaveLength(1);
    expect(screen.queryByText(description)).not.toBeInTheDocument();
  });

  it('passes accessibility attributes to child input', () => {
    const error = 'Email is required';
    render(
      <FormField label="Email Address" error={error} required>
        <Input type="email" />
      </FormField>
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('applies size classes correctly', () => {
    const { container } = render(
      <FormField label="Email Address" size="lg">
        <Input type="email" />
      </FormField>
    );

    expect(container.firstChild).toHaveClass('space-y-2');
  });

  it('handles disabled state', () => {
    render(
      <FormField label="Email Address" disabled>
        <Input type="email" />
      </FormField>
    );

    const input = screen.getByLabelText('Email Address');
    expect(input).toBeDisabled();
  });

  it('generates unique IDs when not provided', () => {
    render(
      <FormField label="Email Address">
        <Input type="email" />
      </FormField>
    );

    const input = screen.getByLabelText('Email Address');
    expect(input).toHaveAttribute('id');
    expect(input.id).toMatch(/^form-field-\d+-[a-z0-9]+-input$/);
  });

  it('uses provided ID', () => {
    render(
      <FormField label="Email Address" id="custom-field">
        <Input type="email" />
      </FormField>
    );

    const input = screen.getByLabelText('Email Address');
    expect(input).toHaveAttribute('id', 'custom-field-input');
  });

  it('preserves existing child props', () => {
    render(
      <FormField label="Email Address">
        <Input type="email" placeholder="Enter email" data-testid="test-input" />
      </FormField>
    );

    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
  });
});
