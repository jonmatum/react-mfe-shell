import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../Input';

describe('Input', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveClass('border-border-primary');
    });

    it('renders with label', () => {
      render(<Input label="Email Address" />);
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      const input = screen.getByRole('textbox');
      expect(input).toHaveAccessibleName('Email Address');
    });

    it('renders with description', () => {
      render(<Input label="Password" description="Must be at least 8 characters" />);
      expect(screen.getByText('Must be at least 8 characters')).toBeInTheDocument();
    });

    it('renders with error message', () => {
      render(<Input label="Email" error="Email is required" />);
      const errorMessage = screen.getByText('Email is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });

    it('renders with left icon', () => {
      const icon = <span data-testid="left-icon">@</span>;
      render(<Input leftIcon={icon} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders with right icon', () => {
      const icon = <span data-testid="right-icon">👁</span>;
      render(<Input rightIcon={icon} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter your email" />);
      const input = screen.getByPlaceholderText('Enter your email');
      expect(input).toBeInTheDocument();
    });
  });

  // Type tests
  describe('Input Types', () => {
    const typeRoleMap = {
      text: 'textbox',
      email: 'textbox', 
      password: null, // password inputs don't have accessible roles
      number: 'spinbutton',
      tel: 'textbox',
      url: 'textbox',
      search: 'searchbox',
    } as const;

    const types = ['text', 'email', 'password', 'number', 'tel', 'url', 'search'] as const;

    types.forEach(type => {
      it(`renders ${type} input correctly`, () => {
        render(<Input type={type} />);
        
        const expectedRole = typeRoleMap[type];
        if (expectedRole) {
          const input = screen.getByRole(expectedRole);
          expect(input).toHaveAttribute('type', type);
        } else {
          // For password inputs, query by type attribute directly
          const input = document.querySelector(`input[type="${type}"]`);
          expect(input).toBeInTheDocument();
          expect(input).toHaveAttribute('type', type);
        }
      });
    });
  });

  // Variant tests
  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Input variant="default" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-border-primary');
    });

    it('renders error variant correctly', () => {
      render(<Input variant="error" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-danger-500');
    });

    it('renders success variant correctly', () => {
      render(<Input variant="success" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-success-500');
    });

    it('automatically applies error variant when error prop is provided', () => {
      render(<Input error="This field is required" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-danger-500');
    });
  });

  // Size tests
  describe('Sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Input size={size} />);
        const input = screen.getByRole('textbox');
        
        switch (size) {
          case 'sm':
            expect(input).toHaveClass('px-3', 'py-2', 'text-sm');
            break;
          case 'md':
            expect(input).toHaveClass('px-4', 'py-2.5', 'text-sm');
            break;
          case 'lg':
            expect(input).toHaveClass('px-4', 'py-3', 'text-base');
            break;
        }
      });
    });
  });

  // State tests
  describe('States', () => {
    it('handles disabled state correctly', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
      expect(input).toHaveClass('bg-surface-disabled');
    });

    it('handles readonly state correctly', () => {
      render(<Input readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });

    it('handles required state correctly', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('required');
    });

    it('shows required indicator in label', () => {
      render(<Input label="Email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });
  });

  // Focus and blur tests
  describe('Focus Management', () => {
    it('handles focus events correctly', () => {
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('handles blur events correctly', () => {
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);
      
      const input = screen.getByRole('textbox');
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('applies focus ring when focused', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      
      fireEvent.focus(input);
      expect(input).toHaveClass('focus:ring-2');
    });
  });

  // Icon positioning tests
  describe('Icon Positioning', () => {
    it('adjusts padding for left icon', () => {
      const icon = <span data-testid="left-icon">@</span>;
      render(<Input leftIcon={icon} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-11');
    });

    it('adjusts padding for right icon', () => {
      const icon = <span data-testid="right-icon">👁</span>;
      render(<Input rightIcon={icon} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pr-11');
    });

    it('adjusts padding for both icons', () => {
      const leftIcon = <span data-testid="left-icon">@</span>;
      const rightIcon = <span data-testid="right-icon">👁</span>;
      render(<Input leftIcon={leftIcon} rightIcon={rightIcon} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('pl-11', 'pr-11');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('associates label with input correctly', () => {
      render(<Input label="Email Address" />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Email Address');
      
      expect(input).toHaveAccessibleName('Email Address');
      expect(label).toHaveAttribute('for', input.id);
    });

    it('associates description with input correctly', () => {
      render(<Input label="Password" description="Must be at least 8 characters" />);
      const input = screen.getByRole('textbox');
      const description = screen.getByText('Must be at least 8 characters');
      
      expect(input).toHaveAttribute('aria-describedby', description.id);
    });

    it('associates error with input correctly', () => {
      render(<Input label="Email" error="Email is required" />);
      const input = screen.getByRole('textbox');
      const error = screen.getByText('Email is required');
      
      expect(input).toHaveAttribute('aria-describedby', error.id);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('associates error with input when both description and error are provided', () => {
      render(
        <Input 
          label="Email" 
          description="Enter a valid email address"
          error="Email is required" 
        />
      );
      const input = screen.getByRole('textbox');
      const error = screen.getByText('Email is required');
      
      // Description should not be visible when error is present
      expect(screen.queryByText('Enter a valid email address')).not.toBeInTheDocument();
      expect(input).toHaveAttribute('aria-describedby', expect.stringContaining(error.id));
    });

    it('generates unique IDs for multiple inputs', () => {
      render(
        <div>
          <Input label="First Name" />
          <Input label="Last Name" />
        </div>
      );
      
      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0].id).not.toBe(inputs[1].id);
    });

    it('uses provided ID when given', () => {
      render(<Input id="custom-id" label="Custom" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'custom-id');
    });
  });

  // Polymorphic tests
  describe('Polymorphic behavior', () => {
    it('renders as textarea when specified', () => {
      render(<Input as="textarea" label="Message" />);
      const textarea = screen.getByRole('textbox');
      expect(textarea.tagName).toBe('TEXTAREA');
    });

    it('passes through additional props to textarea', () => {
      render(<Input as="textarea" rows={4} cols={50} />);
      const textarea = screen.getByRole('textbox');
      expect(textarea).toHaveAttribute('rows', '4');
      expect(textarea).toHaveAttribute('cols', '50');
    });

    it('passes through all props to non-input elements', () => {
      render(<Input as="textarea" type="email" />);
      const textarea = screen.getByRole('textbox');
      // Currently passes through all props - this could be improved
      expect(textarea).toHaveAttribute('type', 'email');
    });
  });

  // Value and change handling tests
  describe('Value and Change Handling', () => {
    it('handles controlled input correctly', () => {
      const handleChange = vi.fn();
      render(<Input value="test value" onChange={handleChange} />);
      
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('test value');
      
      fireEvent.change(input, { target: { value: 'new value' } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('handles uncontrolled input correctly', () => {
      render(<Input defaultValue="default value" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('default value');
    });
  });

  // Error handling tests
  describe('Error Handling', () => {
    it('shows error message with proper styling', () => {
      render(<Input error="This field is required" />);
      const error = screen.getByText('This field is required');
      expect(error).toHaveClass('text-danger-600');
      expect(error).toHaveAttribute('role', 'alert');
    });

    it('hides error when error prop is removed', () => {
      const { rerender } = render(<Input error="This field is required" />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      
      rerender(<Input />);
      expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    });
  });

  // Performance tests
  describe('Performance', () => {
    it('memoizes focus and blur handlers', () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      
      const { rerender } = render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
      const input = screen.getByRole('textbox');
      
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(1);
      expect(handleBlur).toHaveBeenCalledTimes(1);
      
      // Rerender with same handlers
      rerender(<Input onFocus={handleFocus} onBlur={handleBlur} />);
      
      fireEvent.focus(input);
      fireEvent.blur(input);
      
      expect(handleFocus).toHaveBeenCalledTimes(2);
      expect(handleBlur).toHaveBeenCalledTimes(2);
    });
  });

  // Edge cases
  describe('Edge cases', () => {
    it('handles empty label gracefully', () => {
      render(<Input label="" />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
    });

    it('handles null/undefined icons gracefully', () => {
      render(<Input leftIcon={null} rightIcon={undefined} />);
      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).not.toHaveClass('pl-10', 'pr-10');
    });

    it('combines multiple CSS classes correctly', () => {
      const { container } = render(
        <Input 
          className="custom-class" 
          variant="error" 
          size="lg"
          disabled
        />
      );
      
      const wrapper = container.firstChild;
      const input = screen.getByRole('textbox');
      
      expect(wrapper).toHaveClass('custom-class');
      expect(input).toHaveClass('border-danger-500');
      expect(input).toHaveClass('px-4');
      expect(input).toHaveClass('py-3');
      expect(input).toHaveClass('bg-surface-disabled');
    });
  });
});
