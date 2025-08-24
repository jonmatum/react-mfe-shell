import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Select from '../Select';

const mockOptions = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
];

const mockOptionsWithDescriptions = [
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'ca', label: 'Canada', description: 'North America' },
  { value: 'mx', label: 'Mexico', description: 'North America' },
];

describe('Select', () => {
  it('renders with placeholder', () => {
    render(<Select options={mockOptions} placeholder='Choose a country' />);
    expect(screen.getByText('Choose a country')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select options={mockOptions} label='Country' />);
    expect(screen.getByText('Country')).toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.getByText('Mexico')).toBeInTheDocument();
  });

  it('selects option when clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Select options={mockOptions} onChange={onChange} />);

    const button = screen.getByRole('button');
    await user.click(button);

    const option = screen.getByText('Canada');
    await user.click(option);

    expect(onChange).toHaveBeenCalledWith('ca');
  });

  it('displays selected value', () => {
    render(<Select options={mockOptions} value='ca' />);
    expect(screen.getByText('Canada')).toBeInTheDocument();
  });

  it('handles multiple selection', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Select options={mockOptions} multiple onChange={onChange} />);

    const button = screen.getByRole('button');
    await user.click(button);

    const option1 = screen.getByText('United States');
    await user.click(option1);

    expect(onChange).toHaveBeenCalledWith(['us']);
  });

  it('displays multiple selected count', () => {
    render(<Select options={mockOptions} multiple value={['us', 'ca']} />);
    expect(screen.getByText('2 selected')).toBeInTheDocument();
  });

  it('shows search input when searchable', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} searchable />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(
      screen.getByPlaceholderText('Search options...')
    ).toBeInTheDocument();
  });

  it('filters options when searching', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} searchable />);

    const button = screen.getByRole('button');
    await user.click(button);

    const searchInput = screen.getByPlaceholderText('Search options...');
    await user.type(searchInput, 'can');

    expect(screen.getByText('Canada')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });

  it('shows clear button when clearable and has value', () => {
    render(<Select options={mockOptions} clearable value='us' />);
    expect(screen.getByLabelText('Clear selection')).toBeInTheDocument();
  });

  it('clears selection when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <Select options={mockOptions} clearable value='us' onChange={onChange} />
    );

    const clearButton = screen.getByLabelText('Clear selection');
    await user.click(clearButton);

    expect(onChange).toHaveBeenCalledWith('');
  });

  it('shows loading spinner when loading', () => {
    render(<Select options={mockOptions} loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders option descriptions', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptionsWithDescriptions} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getAllByText('North America')).toHaveLength(3);
  });

  it('handles disabled options', async () => {
    const user = userEvent.setup();
    const optionsWithDisabled = [
      ...mockOptions,
      { value: 'disabled', label: 'Disabled Option', disabled: true },
    ];

    render(<Select options={optionsWithDisabled} />);

    const button = screen.getByRole('button');
    await user.click(button);

    const disabledOption = screen.getByText('Disabled Option');
    expect(disabledOption.closest('[role="option"]')).toHaveClass(
      'opacity-50',
      'cursor-not-allowed'
    );
  });

  it('renders error state', () => {
    const error = 'Please select a country';
    render(<Select options={mockOptions} error={error} />);

    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders description', () => {
    const description = 'Choose your country of residence';
    render(<Select options={mockOptions} description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Select options={mockOptions} disabled />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('shows "No options available" when options array is empty', async () => {
    const user = userEvent.setup();
    render(<Select options={[]} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('No options available')).toBeInTheDocument();
  });

  it('shows "No options found" when search yields no results', async () => {
    const user = userEvent.setup();
    render(<Select options={mockOptions} searchable />);

    const button = screen.getByRole('button');
    await user.click(button);

    const searchInput = screen.getByPlaceholderText('Search options...');
    await user.type(searchInput, 'xyz');

    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Select options={mockOptions} label='Country' required />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-invalid', 'false');
    expect(button).toHaveAttribute('aria-required', 'true');
  });

  it('creates hidden input for form compatibility', () => {
    const { container } = render(
      <Select options={mockOptions} name='country' value='us' />
    );

    const hiddenInput = container.querySelector('input[type="hidden"]');
    expect(hiddenInput).toHaveAttribute('name', 'country');
    expect(hiddenInput).toHaveAttribute('value', 'us');
  });

  it('handles multiple values in hidden input', () => {
    const { container } = render(
      <Select
        options={mockOptions}
        name='countries'
        multiple
        value={['us', 'ca']}
      />
    );

    const hiddenInput = container.querySelector('input[type="hidden"]');
    expect(hiddenInput).toHaveAttribute('value', 'us,ca');
  });

  it('calls onSearch when search input changes', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<Select options={mockOptions} searchable onSearch={onSearch} />);

    const button = screen.getByRole('button');
    await user.click(button);

    const searchInput = screen.getByPlaceholderText('Search options...');
    await user.type(searchInput, 'test');

    expect(onSearch).toHaveBeenCalledWith('test');
  });

  it('uses custom renderOption function', async () => {
    const user = userEvent.setup();
    const renderOption = (option: any) => `Custom: ${option.label}`;

    render(<Select options={mockOptions} renderOption={renderOption} />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(screen.getByText('Custom: United States')).toBeInTheDocument();
  });

  it('uses custom renderValue function', () => {
    const renderValue = (option: any) => `Selected: ${option.label}`;

    render(
      <Select options={mockOptions} value='us' renderValue={renderValue} />
    );

    expect(screen.getByText('Selected: United States')).toBeInTheDocument();
  });
});
