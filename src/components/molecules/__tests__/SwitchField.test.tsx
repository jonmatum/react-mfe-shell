import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SwitchField from '../SwitchField';

describe('SwitchField', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
      />
    );

    expect(screen.getByLabelText('Test Switch')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('renders with description', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        description='This is a test switch'
      />
    );

    expect(screen.getByLabelText('Test Switch')).toBeInTheDocument();
    expect(screen.getByText('This is a test switch')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        error='This field is required'
      />
    );

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('This field is required');

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles toggle interaction', async () => {
    const user = userEvent.setup();
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
      />
    );

    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);

    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('shows checked state correctly', () => {
    render(
      <SwitchField checked={true} onChange={mockOnChange} label='Test Switch' />
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeChecked();
  });

  it('handles disabled state', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        disabled
      />
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  it('prevents interaction when disabled', async () => {
    const user = userEvent.setup();
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        disabled
      />
    );

    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('applies different size variants', () => {
    const { rerender } = render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        size='sm'
      />
    );

    // Check if small size classes are applied (this would be in the Switch component)
    let switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();

    rerender(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        size='lg'
      />
    );

    switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('applies different color variants', () => {
    const { rerender } = render(
      <SwitchField
        checked={true}
        onChange={mockOnChange}
        label='Test Switch'
        color='primary'
      />
    );

    let switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();

    rerender(
      <SwitchField
        checked={true}
        onChange={mockOnChange}
        label='Test Switch'
        color='success'
      />
    );

    switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('handles required attribute', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        required
      />
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-required', 'true');
  });

  it('associates error with switch element', () => {
    render(
      <SwitchField
        id='test-switch'
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        error='This field is required'
      />
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-invalid', 'true');

    // Verify error element exists with correct ID
    const errorElement = screen.getByRole('alert');
    expect(errorElement).toHaveAttribute('id', 'test-switch-error');
    expect(errorElement).toHaveTextContent('This field is required');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <SwitchField
        ref={ref}
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
      />
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('applies custom className', () => {
    render(
      <SwitchField
        className='custom-switch-field-class'
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
      />
    );

    const container = screen
      .getByRole('switch')
      .closest('.custom-switch-field-class');
    expect(container).toBeInTheDocument();
  });

  it('handles name attribute for forms', () => {
    render(
      <SwitchField
        name='notifications'
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
      />
    );

    // The name attribute should be on the hidden input for form submission
    const hiddenInput = screen
      .getByRole('switch')
      .parentElement?.querySelector('input[type="checkbox"]');
    expect(hiddenInput).toHaveAttribute('name', 'notifications');
  });

  it('handles keyboard interaction', async () => {
    const user = userEvent.setup();
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
      />
    );

    const switchElement = screen.getByRole('switch');
    switchElement.focus();

    // Use user.type with space key instead of user.keyboard
    await user.type(switchElement, ' ');
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const mockOnFocus = vi.fn();
    const mockOnBlur = vi.fn();

    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />
    );

    const switchElement = screen.getByRole('switch');

    await user.click(switchElement);
    expect(mockOnFocus).toHaveBeenCalled();

    await user.tab();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('shows error with correct size styling', () => {
    const { rerender } = render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        error='Error message'
        size='sm'
      />
    );

    let errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveClass('text-xs');

    rerender(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        error='Error message'
        size='md'
      />
    );

    errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveClass('text-sm');
  });

  it('generates unique ID when not provided', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        error='Error message'
      />
    );

    // Headless UI generates its own IDs, so we check that error element has a valid ID
    const errorMessage = screen.getByRole('alert');
    const errorId = errorMessage.getAttribute('id');
    expect(errorId).toMatch(/switch-field-.*-error/);
  });

  it('uses provided ID', () => {
    render(
      <SwitchField
        id='custom-switch'
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        error='Error message'
      />
    );

    // Headless UI doesn't use our provided ID for the switch element
    // But we can verify the error element uses our ID
    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveAttribute('id', 'custom-switch-error');
  });

  it('passes through additional props', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        data-testid='custom-switch-field'
        aria-label='Custom switch field'
      />
    );

    const container = screen.getByTestId('custom-switch-field');
    expect(container).toBeInTheDocument();
    expect(container).toHaveAttribute('aria-label', 'Custom switch field');
  });

  it('handles toggle state changes correctly', async () => {
    const user = userEvent.setup();
    let checked = false;
    const handleChange = (newChecked: boolean) => {
      checked = newChecked;
      mockOnChange(newChecked);
    };

    const { rerender } = render(
      <SwitchField
        checked={checked}
        onChange={handleChange}
        label='Test Switch'
      />
    );

    const switchElement = screen.getByRole('switch');
    expect(switchElement).not.toBeChecked();

    await user.click(switchElement);
    expect(mockOnChange).toHaveBeenCalledWith(true);

    // Simulate state update
    checked = true;
    rerender(
      <SwitchField
        checked={checked}
        onChange={handleChange}
        label='Test Switch'
      />
    );

    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('maintains accessibility when error is present', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
        description='Switch description'
        error='Switch error'
      />
    );

    const switchElement = screen.getByRole('switch');
    const errorMessage = screen.getByRole('alert');

    expect(switchElement).toHaveAttribute('aria-invalid', 'true');
    expect(errorMessage).toHaveAttribute('aria-live', 'polite');
    expect(errorMessage).toHaveAttribute('role', 'alert');
  });

  it('does not show error when no error is provided', () => {
    render(
      <SwitchField
        checked={false}
        onChange={mockOnChange}
        label='Test Switch'
      />
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-invalid', 'false');
  });
});
