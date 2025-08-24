import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SearchBox from '../SearchBox';

describe('SearchBox', () => {
  it('renders with default placeholder', () => {
    render(<SearchBox />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<SearchBox placeholder='Search products...' />);
    expect(
      screen.getByPlaceholderText('Search products...')
    ).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<SearchBox label='Product Search' />);
    expect(screen.getByLabelText('Product Search')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchBox onChange={onChange} />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');

    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('calls onSearch when Enter is pressed', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBox onSearch={onSearch} />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');
    await user.keyboard('{Enter}');

    expect(onSearch).toHaveBeenCalledWith('test');
  });

  it('shows clear button when there is a value', async () => {
    const user = userEvent.setup();

    render(<SearchBox showClearButton />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');

    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const onClear = vi.fn();

    render(<SearchBox onChange={onChange} onClear={onClear} showClearButton />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');

    const clearButton = screen.getByLabelText('Clear search');
    await user.click(clearButton);

    expect(onChange).toHaveBeenLastCalledWith('');
    expect(onClear).toHaveBeenCalled();
  });

  it('debounces search calls', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<SearchBox onSearch={onSearch} debounceMs={100} />);

    const input = screen.getByRole('searchbox');
    await user.type(input, 'test');

    // Should not call immediately
    expect(onSearch).not.toHaveBeenCalled();

    // Should call after debounce delay
    await waitFor(
      () => {
        expect(onSearch).toHaveBeenCalledWith('test');
      },
      { timeout: 200 }
    );
  });

  it('shows loading spinner when loading', () => {
    render(<SearchBox loading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('syncs with external value changes', () => {
    const { rerender } = render(<SearchBox value='initial' />);

    expect(screen.getByDisplayValue('initial')).toBeInTheDocument();

    rerender(<SearchBox value='updated' />);
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<SearchBox disabled />);

    const input = screen.getByRole('searchbox');
    expect(input).toBeDisabled();
  });

  it('does not show clear button when disabled', async () => {
    render(<SearchBox value='test' disabled showClearButton />);

    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
  });

  it('renders error state', () => {
    const error = 'Search failed';
    render(<SearchBox error={error} />);

    expect(screen.getByText(error)).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders description', () => {
    const description = 'Search across all products';
    render(<SearchBox description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it('applies size classes correctly', () => {
    render(<SearchBox size='lg' data-testid='search-box' />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveClass('px-4', 'py-3', 'text-base');
  });

  it('has proper accessibility attributes', () => {
    render(<SearchBox label='Product Search' />);

    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('aria-label', 'Product Search');
    expect(input).toHaveAttribute('autoComplete', 'off');
  });

  it('cleans up debounce timer on unmount', () => {
    const onSearch = vi.fn();
    const { unmount } = render(
      <SearchBox onSearch={onSearch} debounceMs={100} />
    );

    unmount();

    // Timer should be cleaned up, no calls should happen
    setTimeout(() => {
      expect(onSearch).not.toHaveBeenCalled();
    }, 200);
  });
});
