import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Textarea from '../Textarea';

// Mock getComputedStyle for auto-resize tests
const mockGetComputedStyle = vi.fn();
Object.defineProperty(window, 'getComputedStyle', {
  value: mockGetComputedStyle,
});

describe('Textarea', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetComputedStyle.mockReturnValue({
      lineHeight: '20px',
      paddingTop: '8px',
      paddingBottom: '8px',
    });
  });

  it('renders correctly with default props', () => {
    render(<Textarea onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('rows', '4');
  });

  it('renders with label and description', () => {
    render(
      <Textarea
        label='Message'
        description='Enter your message here'
        onChange={mockOnChange}
      />
    );

    expect(screen.getByText('Message')).toBeInTheDocument();
    expect(screen.getByText('Enter your message here')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(<Textarea error='Message is required' onChange={mockOnChange} />);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Message is required');

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles text input and change events', async () => {
    const user = userEvent.setup();
    render(<Textarea onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Hello world');

    expect(mockOnChange).toHaveBeenCalledTimes(11); // One for each character
    // Since the component is controlled with empty value, each call gets individual characters
    expect(mockOnChange).toHaveBeenLastCalledWith('d');
  });

  it('handles controlled value', () => {
    const { rerender } = render(
      <Textarea value='Initial text' onChange={mockOnChange} />
    );

    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Initial text');

    rerender(<Textarea value='Updated text' onChange={mockOnChange} />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Updated text');
  });

  it('applies different size variants', () => {
    const { rerender } = render(<Textarea size='sm' onChange={mockOnChange} />);

    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('px-3', 'py-2', 'text-sm');

    rerender(<Textarea size='md' onChange={mockOnChange} />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('px-4', 'py-2.5', 'text-sm');

    rerender(<Textarea size='lg' onChange={mockOnChange} />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('px-4', 'py-3', 'text-base');
  });

  it('applies different resize options', () => {
    const { rerender } = render(
      <Textarea resize='none' onChange={mockOnChange} />
    );

    let textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('resize-none');

    rerender(<Textarea resize='vertical' onChange={mockOnChange} />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('resize-y');

    rerender(<Textarea resize='horizontal' onChange={mockOnChange} />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('resize-x');

    rerender(<Textarea resize='both' onChange={mockOnChange} />);
    textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('resize');
  });

  it('handles disabled state', () => {
    render(<Textarea disabled onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('handles required attribute', () => {
    render(
      <Textarea required label='Required field' onChange={mockOnChange} />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-required', 'true');

    const label = screen.getByText('Required field');
    expect(label.textContent).toContain('*');
  });

  it('sets custom rows', () => {
    render(<Textarea rows={6} onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '6');
  });

  it('handles placeholder text', () => {
    render(
      <Textarea placeholder='Enter your message...' onChange={mockOnChange} />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter your message...');
  });

  it('associates description and error with textarea', () => {
    render(
      <Textarea
        id='test-textarea'
        description='Textarea description'
        error='Textarea error'
        onChange={mockOnChange}
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute(
      'aria-describedby',
      'test-textarea-description test-textarea-error'
    );
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} onChange={mockOnChange} />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('applies custom className', () => {
    render(
      <Textarea className='custom-textarea-class' onChange={mockOnChange} />
    );

    const container = screen.getByRole('textbox').parentElement;
    expect(container).toHaveClass('custom-textarea-class');
  });

  it('handles auto-resize functionality', async () => {
    const user = userEvent.setup();

    // Mock scrollHeight to simulate content height
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        return this.value.split('\n').length * 20 + 16; // 20px line height + 16px padding
      },
    });

    render(
      <Textarea autoResize minRows={2} maxRows={5} onChange={mockOnChange} />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('rows', '2'); // Initial minRows
    expect(textarea).toHaveClass('overflow-hidden');

    // Type multiple lines to trigger auto-resize
    await user.type(textarea, 'Line 1\nLine 2\nLine 3\nLine 4');

    // Wait for the height adjustment
    await waitFor(() => {
      expect(textarea.style.height).toBeTruthy();
    });
  });

  it('constrains auto-resize between minRows and maxRows', async () => {
    const user = userEvent.setup();

    // Mock scrollHeight for very long content
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        return 200; // Simulate very tall content
      },
    });

    render(
      <Textarea autoResize minRows={2} maxRows={4} onChange={mockOnChange} />
    );

    const textarea = screen.getByRole('textbox');

    // Type content that would exceed maxRows
    await user.type(textarea, 'Very\nlong\ncontent\nthat\nexceeds\nmax\nrows');

    // Should be constrained to maxRows height
    await waitFor(() => {
      const expectedHeight = 4 * 20 + 16; // 4 rows * 20px line height + 16px padding
      expect(textarea.style.height).toBe(`${expectedHeight}px`);
    });
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    const mockOnFocus = vi.fn();
    const mockOnBlur = vi.fn();

    render(
      <Textarea
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
        onChange={mockOnChange}
      />
    );

    const textarea = screen.getByRole('textbox');

    await user.click(textarea);
    expect(mockOnFocus).toHaveBeenCalled();

    await user.tab();
    expect(mockOnBlur).toHaveBeenCalled();
  });

  it('prevents interaction when disabled', async () => {
    const user = userEvent.setup();
    render(<Textarea disabled onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Should not work');

    expect(mockOnChange).not.toHaveBeenCalled();
    expect(textarea).toHaveValue('');
  });

  it('handles keyboard events', async () => {
    const user = userEvent.setup();
    const mockOnKeyDown = vi.fn();

    render(<Textarea onKeyDown={mockOnKeyDown} onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, '{enter}');

    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  it('shows correct error styling', () => {
    render(
      <Textarea error='This field has an error' onChange={mockOnChange} />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
      'border-danger-500',
      'focus:border-danger-500',
      'focus:ring-danger-500'
    );
  });

  it('shows correct normal styling', () => {
    render(<Textarea onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
      'border-border-primary',
      'focus:border-primary-500',
      'focus:ring-primary-500'
    );
  });

  it('handles name attribute for forms', () => {
    render(<Textarea name='message' onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('name', 'message');
  });

  it('handles maxLength attribute', async () => {
    const user = userEvent.setup();
    render(<Textarea maxLength={10} onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('maxLength', '10');

    await user.type(
      textarea,
      'This is a very long text that exceeds the limit'
    );

    // Should be truncated to maxLength
    expect(textarea.value.length).toBeLessThanOrEqual(10);
  });

  it('adjusts height on mount when autoResize is enabled', () => {
    const _mockAdjustHeight = vi.fn();

    // Mock the internal adjustHeight function
    const originalUseEffect = React.useEffect;
    React.useEffect = vi.fn().mockImplementation((fn, deps) => {
      if (deps && deps.length === 1) {
        fn(); // Call the effect immediately for mount effect
      }
      return originalUseEffect(fn, deps);
    });

    render(
      <Textarea autoResize value='Initial content' onChange={mockOnChange} />
    );

    // Restore original useEffect
    React.useEffect = originalUseEffect;

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('overflow-hidden');
  });

  it('handles empty value correctly', () => {
    render(<Textarea value='' onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('');
  });

  it('handles undefined value correctly', () => {
    render(<Textarea onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('');
  });

  it('handles auto-resize with no minRows/maxRows constraints', async () => {
    const user = userEvent.setup();
    
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        return 100; // Fixed height for test
      },
    });

    render(<Textarea autoResize onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    await user.type(textarea, 'Some content');

    await waitFor(() => {
      expect(textarea.style.height).toBeTruthy();
    });
  });

  it('handles auto-resize when content shrinks', async () => {
    const user = userEvent.setup();
    
    let contentHeight = 100;
    Object.defineProperty(HTMLTextAreaElement.prototype, 'scrollHeight', {
      configurable: true,
      get() {
        return contentHeight;
      },
    });

    render(<Textarea autoResize value="Initial long content" onChange={mockOnChange} />);

    const textarea = screen.getByRole('textbox');
    
    // Simulate content shrinking
    contentHeight = 50;
    await user.clear(textarea);
    await user.type(textarea, 'Short');

    await waitFor(() => {
      expect(textarea.style.height).toBeTruthy();
    });
  });
});
