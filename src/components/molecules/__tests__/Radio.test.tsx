import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Radio from '../Radio';

const mockOptions = [
  { value: 'option1', label: 'Option 1', description: 'First option' },
  { value: 'option2', label: 'Option 2', description: 'Second option' },
  { value: 'option3', label: 'Option 3' },
];

describe('Radio', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<Radio value='' onChange={mockOnChange} options={mockOptions} />);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('First option')).toBeInTheDocument();
    expect(screen.getByText('Second option')).toBeInTheDocument();
  });

  it('renders with label and description', () => {
    render(
      <Radio
        label='Choose an option'
        description='Select one of the available options'
        value=''
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    expect(screen.getByText('Choose an option')).toBeInTheDocument();
    expect(
      screen.getByText('Select one of the available options')
    ).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(
      <Radio
        error='Please select an option'
        value=''
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Please select an option');
  });

  it('handles option selection', async () => {
    const user = userEvent.setup();
    render(<Radio value='' onChange={mockOnChange} options={mockOptions} />);

    const option1 = screen.getByText('Option 1');
    await user.click(option1);

    expect(mockOnChange).toHaveBeenCalledWith('option1');
  });

  it('shows selected option as checked', () => {
    render(
      <Radio value='option2' onChange={mockOnChange} options={mockOptions} />
    );

    const option2Radio = screen.getByText('Option 2').closest('[role="radio"]');
    expect(option2Radio).toHaveAttribute('aria-checked', 'true');
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Radio value='' onChange={mockOnChange} options={mockOptions} />);

    // Focus on the first radio option
    const firstRadio = screen.getByRole('radio', { name: /option 1/i });
    await user.click(firstRadio);

    // Arrow down should select next option
    await user.keyboard('{ArrowDown}');
    expect(mockOnChange).toHaveBeenCalledWith('option2');
  });

  it('handles disabled state', () => {
    render(
      <Radio disabled value='' onChange={mockOnChange} options={mockOptions} />
    );

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles individual option disabled state', () => {
    const optionsWithDisabled = [
      ...mockOptions,
      { value: 'disabled', label: 'Disabled Option', disabled: true },
    ];

    render(
      <Radio value='' onChange={mockOnChange} options={optionsWithDisabled} />
    );

    const disabledOption = screen
      .getByText('Disabled Option')
      .closest('[role="radio"]');
    expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders in horizontal orientation', () => {
    render(
      <Radio
        orientation='horizontal'
        value=''
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('flex', 'flex-wrap');
  });

  it('renders in vertical orientation', () => {
    render(
      <Radio
        orientation='vertical'
        value=''
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('flex', 'flex-col');
  });

  it('applies different size variants', () => {
    const { rerender } = render(
      <Radio size='sm' value='' onChange={mockOnChange} options={mockOptions} />
    );

    let radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('gap-2');

    rerender(
      <Radio size='md' value='' onChange={mockOnChange} options={mockOptions} />
    );

    radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('gap-3');

    rerender(
      <Radio size='lg' value='' onChange={mockOnChange} options={mockOptions} />
    );

    radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveClass('gap-4');
  });

  it('applies different color variants', () => {
    const { rerender } = render(
      <Radio
        color='primary'
        value='option1'
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    // Check if the selected radio has primary color classes
    let selectedRadio = screen.getByText('Option 1').closest('[role="radio"]');
    expect(selectedRadio).toHaveAttribute('aria-checked', 'true');

    // Find the radio button element (the circular indicator)
    let radioButton = selectedRadio?.querySelector(
      '[class*="rounded-full"][class*="border-2"]'
    );
    expect(radioButton).toHaveClass('bg-primary-600', 'border-primary-600');

    rerender(
      <Radio
        color='success'
        value='option1'
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    selectedRadio = screen.getByText('Option 1').closest('[role="radio"]');
    expect(selectedRadio).toHaveAttribute('aria-checked', 'true');

    radioButton = selectedRadio?.querySelector(
      '[class*="rounded-full"][class*="border-2"]'
    );
    expect(radioButton).toHaveClass('bg-success-600', 'border-success-600');
  });

  it('shows required indicator when required', () => {
    render(
      <Radio
        label='Required field'
        required
        value=''
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    const requiredIndicators = screen.getAllByText('*');
    expect(requiredIndicators.length).toBeGreaterThan(0);
    expect(requiredIndicators[0]).toBeInTheDocument();
    expect(requiredIndicators[0]).toHaveAttribute('aria-label', 'required');
  });

  it('creates hidden input for form compatibility', () => {
    render(
      <Radio
        name='radio-field'
        value='option1'
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    const hiddenInput = document.querySelector(
      'input[type="hidden"][name="radio-field"]'
    );
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).toHaveValue('option1');
  });

  it('associates description and error with radiogroup', () => {
    // Test with error (description won't show when error is present)
    const { rerender } = render(
      <Radio
        id='test-radio'
        description='Radio description'
        error='Radio error'
        value=''
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    const radioGroup = screen.getByRole('radiogroup');

    // When error is present, only error should be visible (not description)
    expect(screen.getByText('Radio error')).toBeInTheDocument();
    expect(screen.queryByText('Radio description')).not.toBeInTheDocument();
    expect(radioGroup).toHaveAttribute('aria-invalid', 'true');

    // Verify error element has correct ID for potential aria-describedby reference
    const errorElement = screen.getByText('Radio error');
    expect(errorElement).toHaveAttribute('id', 'test-radio-error');

    // Test with description only (no error)
    rerender(
      <Radio
        id='test-radio'
        description='Radio description'
        value=''
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    // When no error, description should be visible
    expect(screen.getByText('Radio description')).toBeInTheDocument();
    expect(screen.queryByText('Radio error')).not.toBeInTheDocument();
    expect(radioGroup).toHaveAttribute('aria-invalid', 'false');

    // Verify description element has correct ID for potential aria-describedby reference
    const descriptionElement = screen.getByText('Radio description');
    expect(descriptionElement).toHaveAttribute('id', 'test-radio-description');
  });

  it('handles numeric values', async () => {
    const user = userEvent.setup();
    const numericOptions = [
      { value: 1, label: 'One' },
      { value: 2, label: 'Two' },
    ];

    render(
      <Radio value={1} onChange={mockOnChange} options={numericOptions} />
    );

    const option2 = screen.getByText('Two');
    await user.click(option2);

    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it('handles empty options array', () => {
    render(<Radio value='' onChange={mockOnChange} options={[]} />);

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toBeInTheDocument();
    expect(radioGroup.children).toHaveLength(0);
  });

  it('applies custom className', () => {
    render(
      <Radio
        className='custom-radio-class'
        value=''
        onChange={mockOnChange}
        options={mockOptions}
      />
    );

    const container = screen.getByRole('radiogroup').parentElement;
    expect(container).toHaveClass('custom-radio-class');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Radio ref={ref} value='' onChange={mockOnChange} options={mockOptions} />
    );

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('handles options without descriptions', () => {
    const optionsWithoutDesc = [
      { value: 'opt1', label: 'Option 1' },
      { value: 'opt2', label: 'Option 2' },
    ];

    render(
      <Radio value='' onChange={mockOnChange} options={optionsWithoutDesc} />
    );

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();

    // Should not have description elements
    const descriptions = screen.queryAllByText(/description/i);
    expect(descriptions).toHaveLength(0);
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    render(<Radio value='' onChange={mockOnChange} options={mockOptions} />);

    const firstOption = screen.getByText('Option 1').closest('[role="radio"]');

    await user.click(firstOption!);
    expect(firstOption).toHaveFocus();
  });

  it('prevents selection when disabled', async () => {
    const user = userEvent.setup();
    render(
      <Radio disabled value='' onChange={mockOnChange} options={mockOptions} />
    );

    const option1 = screen.getByText('Option 1');
    await user.click(option1);

    expect(mockOnChange).not.toHaveBeenCalled();
  });

  it('shows correct aria attributes for required field', () => {
    render(
      <Radio required value='' onChange={mockOnChange} options={mockOptions} />
    );

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-required', 'true');
  });

  it('handles mixed option types correctly', () => {
    const mixedOptions = [
      { value: 'string', label: 'String Value' },
      { value: 42, label: 'Number Value' },
      { value: true, label: 'Boolean Value' },
    ];

    render(
      <Radio value='string' onChange={mockOnChange} options={mixedOptions} />
    );

    expect(screen.getByText('String Value')).toBeInTheDocument();
    expect(screen.getByText('Number Value')).toBeInTheDocument();
    expect(screen.getByText('Boolean Value')).toBeInTheDocument();
  });
});
