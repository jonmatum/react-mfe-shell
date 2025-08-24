import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    render(<Checkbox />);

    const hiddenInput = screen.getAllByRole('checkbox')[0]; // Get the hidden input
    expect(hiddenInput).not.toBeChecked();
  });

  it('renders checked when checked prop is true', () => {
    render(<Checkbox checked />);

    const hiddenInput = screen.getAllByRole('checkbox')[0]; // Get the hidden input
    expect(hiddenInput).toBeChecked();
  });

  it('renders with label', () => {
    render(<Checkbox label='Accept terms' />);

    expect(screen.getByText('Accept terms')).toBeInTheDocument();
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('calls onChange when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox onChange={onChange} />);

    const checkboxContainer = screen.getAllByRole('checkbox')[1]; // Get the visible div
    await user.click(checkboxContainer);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange when label is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox label='Accept terms' onChange={onChange} />);

    const label = screen.getByText('Accept terms');
    await user.click(label);

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox onChange={onChange} />);

    const checkboxContainer = screen.getAllByRole('checkbox')[1]; // Get the visible div
    checkboxContainer.focus();
    await user.keyboard(' ');

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('handles Enter key', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox onChange={onChange} />);

    const checkboxContainer = screen.getAllByRole('checkbox')[1]; // Get the visible div
    checkboxContainer.focus();
    await user.keyboard('{Enter}');

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders indeterminate state', () => {
    render(<Checkbox indeterminate />);

    const checkbox = screen.getAllByRole('checkbox')[1]; // Get the visible div
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('shows indeterminate icon when indeterminate', () => {
    const { container } = render(<Checkbox indeterminate />);

    // Check for minus icon (indeterminate state)
    const minusIcon = container.querySelector('svg');
    expect(minusIcon).toBeInTheDocument();
  });

  it('shows check icon when checked', () => {
    const { container } = render(<Checkbox checked />);

    // Check for check icon
    const checkIcon = container.querySelector('svg');
    expect(checkIcon).toBeInTheDocument();
  });

  it('renders description', () => {
    const description = 'By checking this box, you agree to our terms';
    render(<Checkbox label='Accept terms' description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = 'You must accept the terms';
    render(<Checkbox label='Accept terms' error={error} />);

    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('does not render description when error is present', () => {
    const description = 'By checking this box, you agree to our terms';
    const error = 'You must accept the terms';

    render(
      <Checkbox label='Accept terms' description={description} error={error} />
    );

    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.queryByText(description)).not.toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Checkbox disabled />);

    const checkbox = screen.getAllByRole('checkbox')[1]; // Get the visible div
    expect(checkbox).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Checkbox disabled onChange={onChange} />);

    const checkbox = screen.getAllByRole('checkbox')[1]; // Get the visible div
    await user.click(checkbox);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders required indicator', () => {
    render(<Checkbox label='Accept terms' required />);

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { container: smallContainer } = render(<Checkbox size='sm' />);
    const { container: largeContainer } = render(<Checkbox size='lg' />);

    const smallCheckbox = smallContainer.querySelector('[role="checkbox"]');
    const largeCheckbox = largeContainer.querySelector('[role="checkbox"]');

    expect(smallCheckbox).toHaveClass('w-4', 'h-4');
    expect(largeCheckbox).toHaveClass('w-6', 'h-6');
  });

  it('applies different colors correctly', () => {
    const { container: primaryContainer } = render(
      <Checkbox checked color='primary' />
    );
    const { container: successContainer } = render(
      <Checkbox checked color='success' />
    );

    const primaryCheckbox = primaryContainer.querySelector('[role="checkbox"]');
    const successCheckbox = successContainer.querySelector('[role="checkbox"]');

    expect(primaryCheckbox).toHaveClass('bg-primary-600');
    expect(successCheckbox).toHaveClass('bg-success-600');
  });

  it('has proper accessibility attributes', () => {
    render(<Checkbox label='Accept terms' required />);

    const hiddenInput = screen.getAllByRole('checkbox')[0]; // Get the hidden input
    expect(hiddenInput).toHaveAttribute('aria-required', 'true');
    expect(hiddenInput).toHaveAttribute('aria-invalid', 'false');
  });

  it('links description with aria-describedby', () => {
    render(<Checkbox label='Accept terms' description='Terms description' />);

    const hiddenInput = screen.getAllByRole('checkbox')[0]; // Get the hidden input
    expect(hiddenInput).toHaveAttribute('aria-describedby');
  });

  it('links error with aria-describedby', () => {
    render(<Checkbox label='Accept terms' error='Error message' />);

    const hiddenInput = screen.getAllByRole('checkbox')[0]; // Get the hidden input
    expect(hiddenInput).toHaveAttribute('aria-describedby');
    expect(hiddenInput).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders without label or description', () => {
    render(<Checkbox />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(2); // Hidden input + visible div
  });

  it('handles value prop for form compatibility', () => {
    render(<Checkbox value='terms' />);

    const hiddenInput = screen.getAllByRole('checkbox')[0]; // Get the hidden input
    expect(hiddenInput).toHaveAttribute('value', 'terms');
  });

  it('generates unique IDs', () => {
    const { container } = render(<Checkbox label='Test' />);

    const hiddenInput = container.querySelector('input[type="checkbox"]');
    expect(hiddenInput).toHaveAttribute('id');
    expect(hiddenInput?.id).toMatch(/^checkbox-\d+-[a-z0-9]+$/);
  });

  it('uses provided ID', () => {
    render(<Checkbox id='custom-checkbox' label='Test' />);

    const hiddenInput = screen.getAllByRole('checkbox')[0]; // Get the hidden input
    expect(hiddenInput).toHaveAttribute('id', 'custom-checkbox');
  });
});
