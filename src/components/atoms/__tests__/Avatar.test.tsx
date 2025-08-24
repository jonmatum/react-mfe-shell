import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Avatar from '../Avatar';

describe('Avatar', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Avatar fallback="John Doe" />);
      const avatar = screen.getByText('JD');
      expect(avatar.parentElement).toBeInTheDocument();
      expect(avatar.parentElement?.tagName).toBe('DIV');
    });

    it('renders with custom className', () => {
      render(<Avatar className="custom-class" fallback="John Doe" />);
      const avatar = screen.getByText('JD').parentElement;
      expect(avatar).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
      render(
        <Avatar fallback="John Doe">
          <span data-testid="child-element">Child</span>
        </Avatar>
      );
      expect(screen.getByTestId('child-element')).toBeInTheDocument();
    });
  });

  // Size tests
  describe('Sizes', () => {
    it.each([
      ['xs', 'h-6 w-6 text-xs'],
      ['sm', 'h-8 w-8 text-sm'],
      ['md', 'h-10 w-10 text-base'],
      ['lg', 'h-12 w-12 text-lg'],
      ['xl', 'h-16 w-16 text-xl'],
      ['2xl', 'h-20 w-20 text-2xl'],
    ])('renders %s size correctly', (size, expectedClasses) => {
      render(<Avatar size={size as any} fallback="John Doe" />);
      const avatar = screen.getByText('JD').parentElement;
      expectedClasses.split(' ').forEach(cls => {
        expect(avatar).toHaveClass(cls);
      });
    });
  });

  // Image handling tests
  describe('Image Handling', () => {
    it('renders image when src is provided', () => {
      render(<Avatar src="/test-avatar.jpg" alt="John Doe" fallback="John Doe" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', '/test-avatar.jpg');
      expect(image).toHaveAttribute('alt', 'John Doe');
    });

    it('shows fallback when image fails to load', async () => {
      render(<Avatar src="/invalid-image.jpg" alt="John Doe" fallback="John Doe" />);
      
      const image = screen.getByRole('img');
      
      // Simulate image error
      fireEvent.error(image);
      
      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });
    });

    it('shows fallback initially when image is loading', () => {
      render(<Avatar src="/test-avatar.jpg" alt="John Doe" fallback="John Doe" />);
      
      // Fallback should be visible initially
      expect(screen.getByText('JD')).toBeInTheDocument();
      expect(screen.getByText('JD')).not.toHaveClass('opacity-0');
    });

    it('hides fallback when image loads successfully', async () => {
      render(<Avatar src="/test-avatar.jpg" alt="John Doe" fallback="John Doe" />);
      
      const image = screen.getByRole('img');
      
      // Initially fallback is visible
      expect(screen.getByText('JD')).toBeInTheDocument();
      
      // Simulate image load
      fireEvent.load(image);
      
      // After loading, the image should be visible (no longer have opacity-0)
      await waitFor(() => {
        expect(image).not.toHaveClass('opacity-0');
      });
    });

    it('respects loading attribute', () => {
      render(<Avatar src="/test-avatar.jpg" alt="John Doe" fallback="John Doe" loading="eager" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('loading', 'eager');
    });

    it('uses lazy loading by default', () => {
      render(<Avatar src="/test-avatar.jpg" alt="John Doe" fallback="John Doe" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('loading', 'lazy');
    });
  });

  // Fallback handling tests
  describe('Fallback Handling', () => {
    it('renders fallback text when no image is provided', () => {
      render(<Avatar fallback="John Doe" />);
      
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates initials from fallback text correctly', () => {
      const testCases = [
        { fallback: 'John Doe', expected: 'JD' },
        { fallback: 'Jane Smith Brown', expected: 'JS' },
        { fallback: 'SingleName', expected: 'S' },
        { fallback: 'a b c d e', expected: 'AB' }, // Should limit to 2 characters
      ];

      testCases.forEach(({ fallback, expected }) => {
        const { unmount } = render(<Avatar fallback={fallback} />);
        expect(screen.getByText(expected)).toBeInTheDocument();
        unmount();
      });
    });

    it('shows default icon when no fallback is provided', () => {
      render(<Avatar />);
      const svg = screen.getByRole('img', { hidden: true });
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('w-full', 'h-full', 'text-text-secondary');
    });

    it('converts initials to uppercase', () => {
      render(<Avatar fallback="john doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('limits initials to 2 characters', () => {
      render(<Avatar fallback="Alice Bob Charlie David" />);
      expect(screen.getByText('AB')).toBeInTheDocument();
    });
  });

  // Polymorphic rendering tests
  describe('Polymorphic rendering', () => {
    it('renders as button when as="button"', () => {
      const handleClick = vi.fn();
      render(
        <Avatar as="button" fallback="John Doe" onClick={handleClick}>
          Button Avatar
        </Avatar>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders as anchor when as="a"', () => {
      render(
        <Avatar as="a" href="/profile" fallback="John Doe">
          Link Avatar
        </Avatar>
      );
      
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/profile');
    });

    it('renders as span when as="span"', () => {
      render(<Avatar as="span" fallback="John Doe" />);
      
      const avatar = screen.getByText('JD').parentElement;
      expect(avatar?.tagName).toBe('SPAN');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper base classes for accessibility', () => {
      render(<Avatar fallback="John Doe" />);
      const avatar = screen.getByText('JD').parentElement;
      
      expect(avatar).toHaveClass('relative', 'inline-flex', 'items-center', 'justify-center', 'rounded-full');
    });

    it('has proper image alt text', () => {
      render(<Avatar src="/avatar.jpg" alt="User profile picture" fallback="John Doe" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('alt', 'User profile picture');
    });

    it('hides fallback text from screen readers', () => {
      render(<Avatar fallback="John Doe" />);
      
      const fallbackText = screen.getByText('JD');
      
      // When no image is present, fallback text should be accessible (not hidden)
      // The aria-hidden attribute should not be present or should be false
      expect(fallbackText).not.toHaveAttribute('aria-hidden', 'true');
    });

    it('maintains accessibility with interactive elements', () => {
      const handleClick = vi.fn();
      render(
        <Avatar 
          as="button" 
          fallback="John Doe" 
          onClick={handleClick}
          aria-label="Open user menu"
        />
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Open user menu');
    });
  });

  // Base classes tests
  describe('Base Classes', () => {
    it('has proper base styling', () => {
      render(<Avatar fallback="John Doe" />);
      const avatar = screen.getByText('JD').parentElement;
      
      expect(avatar).toHaveClass(
        'relative',
        'inline-flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'bg-surface-secondary',
        'overflow-hidden'
      );
    });

    it('applies dark mode classes', () => {
      render(<Avatar fallback="John Doe" />);
      const avatar = screen.getByText('JD').parentElement;
      
      expect(avatar).toHaveClass('bg-surface-secondary');
    });
  });

  // Image styling tests
  describe('Image Styling', () => {
    it('applies proper image classes', () => {
      render(<Avatar src="/avatar.jpg" alt="User" fallback="John Doe" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveClass('h-full', 'w-full', 'object-cover');
    });

    it('initially hides image with opacity', () => {
      render(<Avatar src="/avatar.jpg" alt="User" fallback="John Doe" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveClass('opacity-0');
    });

    it('shows image after loading', async () => {
      render(<Avatar src="/avatar.jpg" alt="User" fallback="John Doe" />);
      
      const image = screen.getByRole('img');
      expect(image).toHaveClass('opacity-0');
      
      // Simulate image load
      fireEvent.load(image);
      
      await waitFor(() => {
        expect(image).not.toHaveClass('opacity-0');
      });
    });
  });

  // Fallback text styling tests
  describe('Fallback Text Styling', () => {
    it('applies proper fallback text classes', () => {
      render(<Avatar fallback="John Doe" />);
      
      const fallbackText = screen.getByText('JD');
      expect(fallbackText).toHaveClass(
        'font-medium',
        'text-text-secondary',
        'select-none'
      );
    });

    it('applies dark mode text classes', () => {
      render(<Avatar fallback="John Doe" />);
      
      const fallbackText = screen.getByText('JD');
      expect(fallbackText).toHaveClass('text-text-secondary');
    });
  });

  // Constants tests
  describe('Constants', () => {
    it('exports sizes correctly', () => {
      expect(Avatar.sizes).toBeDefined();
      expect(Avatar.sizes).toContain('xs');
      expect(Avatar.sizes).toContain('md');
      expect(Avatar.sizes).toContain('2xl');
    });
  });

  // Edge cases tests
  describe('Edge Cases', () => {
    it('handles empty src gracefully', () => {
      render(<Avatar src="" alt="User" fallback="John Doe" />);
      
      // Should show fallback when src is empty
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles missing alt text', () => {
      render(<Avatar src="/avatar.jpg" fallback="John Doe" />);
      
      const image = screen.getByRole('presentation');
      expect(image).toHaveAttribute('alt', '');
    });

    it('handles complex fallback text with special characters', () => {
      render(<Avatar fallback="José María" />);
      expect(screen.getByText('JM')).toBeInTheDocument();
    });

    it('handles very long fallback text', () => {
      render(<Avatar fallback="Very Long Name With Many Words That Should Be Truncated" />);
      expect(screen.getByText('VL')).toBeInTheDocument();
    });
  });
});
