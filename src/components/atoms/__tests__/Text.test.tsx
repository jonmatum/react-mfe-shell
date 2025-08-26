import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Text from '../Text';

// Mock clipboard API
beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: {
      writeText: vi.fn(() => Promise.resolve()),
    },
    writable: true,
  });
});

describe('Text Component', () => {
  // =============================================================================
  // BASIC RENDERING TESTS
  // =============================================================================

  describe('Basic Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Text>Hello World</Text>);
      const text = screen.getByText('Hello World');
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('P');
    });

    it('renders with custom className', () => {
      render(<Text className='custom-class'>Test</Text>);
      const text = screen.getByText('Test');
      expect(text).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
      render(
        <Text>
          <span>Complex</span> Content
        </Text>
      );
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  // =============================================================================
  // VARIANT TESTS
  // =============================================================================

  describe('Typography Variants', () => {
    const variants = [
      'body',
      'body-large',
      'body-small',
      'caption',
      'overline',
      'label',
      'helper',
      'display',
      'headline',
      'title',
      'subtitle',
      'code',
      'kbd',
      'quote',
      'lead',
      'muted',
    ] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Text variant={variant}>{variant}</Text>);
        const text = screen.getByText(variant);
        expect(text).toBeInTheDocument();

        // Test specific variant behaviors
        switch (variant) {
          case 'overline':
            expect(text).toHaveClass('uppercase', 'tracking-wide');
            break;
          case 'code':
            expect(text).toHaveClass('font-mono');
            break;
          case 'kbd':
            expect(text).toHaveClass('font-mono', 'px-1.5', 'py-0.5');
            break;
        }
      });
    });
  });

  // =============================================================================
  // SIZE TESTS
  // =============================================================================

  describe('Typography Sizes', () => {
    const sizes = [
      'xs',
      'sm',
      'base',
      'lg',
      'xl',
      '2xl',
      '3xl',
      '4xl',
      '5xl',
      '6xl',
      '7xl',
      '8xl',
      '9xl',
    ] as const;

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Text size={size}>{size}</Text>);
        const text = screen.getByText(size);
        const expectedClass = size === 'base' ? 'text-base' : `text-${size}`;
        expect(text).toHaveClass(expectedClass);
      });
    });

    it('handles responsive sizes', () => {
      render(
        <Text size={{ base: 'sm', md: 'lg', xl: '2xl' }}>Responsive text</Text>
      );
      const text = screen.getByText('Responsive text');
      expect(text).toHaveClass('text-sm', 'md:text-lg', 'xl:text-2xl');
    });
  });

  // =============================================================================
  // WEIGHT TESTS
  // =============================================================================

  describe('Typography Weights', () => {
    const weights = [
      'thin',
      'extralight',
      'light',
      'normal',
      'medium',
      'semibold',
      'bold',
      'extrabold',
      'black',
    ] as const;

    weights.forEach(weight => {
      it(`renders ${weight} weight correctly`, () => {
        render(<Text weight={weight}>{weight}</Text>);
        const text = screen.getByText(weight);
        expect(text).toHaveClass(`font-${weight}`);
      });
    });

    it('handles responsive weights', () => {
      render(
        <Text weight={{ base: 'normal', md: 'semibold', xl: 'bold' }}>
          Responsive weight
        </Text>
      );
      const text = screen.getByText('Responsive weight');
      expect(text).toHaveClass(
        'font-normal',
        'md:font-semibold',
        'xl:font-bold'
      );
    });
  });

  // =============================================================================
  // ALIGNMENT TESTS
  // =============================================================================

  describe('Text Alignment', () => {
    const alignments = [
      'left',
      'center',
      'right',
      'justify',
      'start',
      'end',
    ] as const;

    alignments.forEach(align => {
      it(`renders ${align} alignment correctly`, () => {
        render(<Text align={align}>{align}</Text>);
        const text = screen.getByText(align);
        expect(text).toHaveClass(`text-${align}`);
      });
    });

    it('handles responsive alignment', () => {
      render(
        <Text align={{ base: 'left', md: 'center', xl: 'right' }}>
          Responsive alignment
        </Text>
      );
      const text = screen.getByText('Responsive alignment');
      expect(text).toHaveClass('text-left', 'md:text-center', 'xl:text-right');
    });
  });

  // =============================================================================
  // ADVANCED TYPOGRAPHY TESTS
  // =============================================================================

  describe('Advanced Typography Features', () => {
    it('applies text transform correctly', () => {
      const transforms = ['uppercase', 'lowercase', 'capitalize'] as const;

      transforms.forEach(transform => {
        render(<Text transform={transform}>{transform}</Text>);
        const text = screen.getByText(transform);
        expect(text).toHaveClass(transform);
      });
    });

    it('applies text decoration correctly', () => {
      render(<Text decoration='underline'>Underlined text</Text>);
      const text = screen.getByText('Underlined text');
      expect(text).toHaveClass('underline');
    });

    it('applies whitespace handling correctly', () => {
      render(<Text whitespace='nowrap'>No wrap text</Text>);
      const text = screen.getByText('No wrap text');
      expect(text).toHaveClass('whitespace-nowrap');
    });

    it('applies line clamping correctly', () => {
      render(<Text lineClamp={3}>Long text that should be clamped</Text>);
      const text = screen.getByText('Long text that should be clamped');
      expect(text).toHaveClass('line-clamp-3');
    });

    it('applies truncation correctly', () => {
      render(<Text truncate>This text should be truncated</Text>);
      const text = screen.getByText('This text should be truncated');
      expect(text).toHaveClass('truncate');
    });

    it('applies leading (line height) correctly', () => {
      render(<Text leading='tight'>Tight leading</Text>);
      const text = screen.getByText('Tight leading');
      expect(text).toHaveClass('leading-tight');
    });

    it('applies tracking (letter spacing) correctly', () => {
      render(<Text tracking='wide'>Wide tracking</Text>);
      const text = screen.getByText('Wide tracking');
      expect(text).toHaveClass('tracking-wide');
    });
  });

  // =============================================================================
  // COLOR AND GRADIENT TESTS
  // =============================================================================

  describe('Color and Gradient', () => {
    it('applies custom color classes', () => {
      render(<Text color='text-red-500'>Red text</Text>);
      const text = screen.getByText('Red text');
      expect(text).toHaveClass('text-red-500');
    });

    it('applies primary color variants correctly', () => {
      render(<Text color='text-primary-600'>Primary text</Text>);
      const text = screen.getByText('Primary text');
      expect(text).toHaveClass('text-primary-600');
    });

    it('applies design system colors correctly', () => {
      render(<Text color='text-secondary'>Secondary text</Text>);
      const text = screen.getByText('Secondary text');
      expect(text).toHaveClass('text-secondary');
    });

    it('applies gradient text correctly', () => {
      render(<Text gradient>Gradient text</Text>);
      const text = screen.getByText('Gradient text');
      expect(text).toHaveClass(
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent'
      );
    });

    it('uses variant default color when no custom color provided', () => {
      render(<Text variant='caption'>Caption text</Text>);
      const text = screen.getByText('Caption text');
      expect(text).toHaveClass('text-secondary');
    });

    it('uses body variant default color', () => {
      render(<Text variant='body'>Body text</Text>);
      const text = screen.getByText('Body text');
      expect(text).toHaveClass('text-primary');
    });

    it('uses display variant default color', () => {
      render(<Text variant='display'>Display text</Text>);
      const text = screen.getByText('Display text');
      expect(text).toHaveClass('text-primary');
    });

    it('overrides variant default color with custom color', () => {
      render(
        <Text variant='caption' color='text-primary-600'>
          Custom caption
        </Text>
      );
      const text = screen.getByText('Custom caption');
      expect(text).toHaveClass('text-primary-600');
      expect(text).not.toHaveClass('text-secondary');
    });

    it('handles color prop with bg- prefix', () => {
      render(<Text color='bg-red-500'>Background color text</Text>);
      const text = screen.getByText('Background color text');
      expect(text).toHaveClass('bg-red-500');
    });

    it('ignores invalid color formats', () => {
      render(<Text color='invalid-color'>Invalid color</Text>);
      const text = screen.getByText('Invalid color');
      expect(text).not.toHaveClass('invalid-color');
      // Should fall back to variant default
      expect(text).toHaveClass('text-primary');
    });
  });

  // =============================================================================
  // INTERACTIVE FEATURES TESTS
  // =============================================================================

  describe('Interactive Features', () => {
    it('handles copy functionality', async () => {
      render(<Text copyable>Copy this text</Text>);
      const text = screen.getByText('Copy this text');

      expect(text).toHaveAttribute('role', 'button');
      expect(text).toHaveAttribute('tabIndex', '0');

      fireEvent.click(text);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        'Copy this text'
      );
    });

    it('applies selectable styles correctly', () => {
      render(<Text selectable={false}>Non-selectable text</Text>);
      const text = screen.getByText('Non-selectable text');
      expect(text).toHaveClass('select-none');
    });

    it('applies selectable styles for true value', () => {
      render(<Text selectable={true}>Selectable text</Text>);
      const text = screen.getByText('Selectable text');
      expect(text).toHaveClass('select-text');
    });
  });

  // =============================================================================
  // SEMANTIC AND ACCESSIBILITY TESTS
  // =============================================================================

  describe('Semantic Elements and Accessibility', () => {
    it('renders semantic heading when semanticLevel is provided', () => {
      render(<Text semanticLevel={2}>Heading text</Text>);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders as different HTML elements', () => {
      const { rerender } = render(<Text as='h1'>Heading</Text>);
      expect(screen.getByText('Heading').tagName).toBe('H1');

      rerender(<Text as='span'>Span text</Text>);
      expect(screen.getByText('Span text').tagName).toBe('SPAN');

      rerender(<Text as='div'>Div text</Text>);
      expect(screen.getByText('Div text').tagName).toBe('DIV');
    });

    it('supports ARIA attributes', () => {
      render(
        <Text aria-label='Custom label' aria-describedby='description'>
          Text with ARIA
        </Text>
      );
      const text = screen.getByText('Text with ARIA');
      expect(text).toHaveAttribute('aria-label', 'Custom label');
      expect(text).toHaveAttribute('aria-describedby', 'description');
    });

    it('provides proper copy accessibility', () => {
      render(
        <Text copyable aria-label='Custom copy label'>
          Copy me
        </Text>
      );
      const text = screen.getByText('Copy me');
      expect(text).toHaveAttribute('aria-label', 'Custom copy label: Copy me');
    });
  });

  // =============================================================================
  // POLYMORPHIC BEHAVIOR TESTS
  // =============================================================================

  describe('Polymorphic Behavior', () => {
    it('renders with variant-appropriate semantic elements', () => {
      render(<Text variant='code'>Code text</Text>);
      const text = screen.getByText('Code text');
      expect(text.tagName).toBe('CODE');
    });

    it('overrides semantic element with as prop', () => {
      render(
        <Text variant='code' as='span'>
          Code as span
        </Text>
      );
      const text = screen.getByText('Code as span');
      expect(text.tagName).toBe('SPAN');
    });

    it('passes through additional props', () => {
      render(
        <Text as='div' data-testid='custom-text' role='banner'>
          Custom props
        </Text>
      );
      const text = screen.getByTestId('custom-text');
      expect(text).toHaveAttribute('role', 'banner');
    });
  });

  // =============================================================================
  // COMBINATION AND EDGE CASE TESTS
  // =============================================================================

  describe('Property Combinations and Edge Cases', () => {
    it('combines multiple properties correctly', () => {
      render(
        <Text
          variant='title'
          size='2xl'
          weight='bold'
          align='center'
          transform='uppercase'
          decoration='underline'
          leading='tight'
          tracking='wide'
          gradient
          className='custom-class'
        >
          Combined properties
        </Text>
      );

      const text = screen.getByText('Combined properties');
      expect(text).toHaveClass(
        'text-2xl',
        'font-bold',
        'text-center',
        'uppercase',
        'underline',
        'leading-tight',
        'tracking-wide',
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent',
        'custom-class'
      );
    });

    it('handles empty children gracefully', () => {
      const { container } = render(<Text></Text>);
      const text = container.querySelector('p');
      expect(text).toBeInTheDocument();
    });

    it('handles null/undefined children gracefully', () => {
      render(<Text>{null}</Text>);
      const text = document.querySelector('p');
      expect(text).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <Text>
          <strong>Bold</strong> and <em>italic</em> text with{' '}
          <a href='#link'>links</a>
        </Text>
      );

      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
      expect(screen.getByText('links')).toBeInTheDocument();
    });
  });

  // =============================================================================
  // STATIC PROPERTIES TESTS
  // =============================================================================

  describe('Static Properties and Utilities', () => {
    it('exposes variant constants', () => {
      expect(Text.variants).toBeDefined();
      expect(Text.variants).toContain('body');
      expect(Text.variants).toContain('headline');
      expect(Text.variants).toContain('code');
    });

    it('exposes size constants', () => {
      expect(Text.sizes).toBeDefined();
      expect(Text.sizes).toContain('xs');
      expect(Text.sizes).toContain('base');
      expect(Text.sizes).toContain('9xl');
    });

    it('exposes weight constants', () => {
      expect(Text.weights).toBeDefined();
      expect(Text.weights).toContain('thin');
      expect(Text.weights).toContain('normal');
      expect(Text.weights).toContain('black');
    });

    it('exposes utility methods', () => {
      expect(Text.getVariantConfig).toBeDefined();
      expect(Text.generateClasses).toBeDefined();

      const config = Text.getVariantConfig('body');
      expect(config).toBeDefined();
      expect(config.defaultSize).toBe('base');
    });
  });

  // =============================================================================
  // PERFORMANCE TESTS
  // =============================================================================

  describe('Performance', () => {
    it('renders efficiently with minimal re-renders', () => {
      const { rerender } = render(<Text>Initial text</Text>);
      const text = screen.getByText('Initial text');

      // Rerender with same props should not cause issues
      rerender(<Text>Initial text</Text>);
      expect(text).toBeInTheDocument();
    });

    it('memoizes typography classes correctly', () => {
      const { rerender } = render(
        <Text variant='body' size='lg' weight='semibold'>
          Memoized text
        </Text>
      );

      const text = screen.getByText('Memoized text');
      const initialClasses = text.className;

      // Rerender with same props
      rerender(
        <Text variant='body' size='lg' weight='semibold'>
          Memoized text
        </Text>
      );

      expect(text.className).toBe(initialClasses);
    });
  });

  // =============================================================================
  // ERROR HANDLING TESTS
  // =============================================================================

  describe('Error Handling', () => {
    it('handles invalid variant gracefully in development', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      // Temporarily set NODE_ENV to development
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      render(<Text variant={'invalid' as any}>Invalid variant</Text>);

      expect(consoleSpy).toHaveBeenCalled();

      // Restore environment
      process.env.NODE_ENV = originalEnv;
      consoleSpy.mockRestore();
    });

    it('handles copy failure gracefully', async () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Mock clipboard to fail
      vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(
        new Error('Copy failed')
      );

      render(<Text copyable>Copy this</Text>);
      const text = screen.getByText('Copy this');

      fireEvent.click(text);

      // Wait for async operation
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(consoleSpy).toHaveBeenCalledWith(
        'Failed to copy text:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
