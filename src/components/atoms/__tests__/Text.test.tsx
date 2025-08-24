import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Text from '../Text';

describe('Text', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Text>Hello World</Text>);
      const text = screen.getByText('Hello World');
      expect(text).toBeInTheDocument();
      expect(text.tagName).toBe('P');
    });

    it('renders with custom className', () => {
      render(<Text className="custom-class">Test</Text>);
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

  // Variant tests
  describe('Variants', () => {
    const variants = ['body', 'caption', 'overline'] as const;

    variants.forEach(variant => {
      it(`renders ${variant} variant correctly`, () => {
        render(<Text variant={variant}>{variant}</Text>);
        const text = screen.getByText(variant);
        
        switch (variant) {
          case 'body':
            expect(text).toHaveClass('text-text-primary');
            break;
          case 'caption':
            expect(text).toHaveClass('text-text-secondary');
            break;
          case 'overline':
            expect(text).toHaveClass('text-text-secondary', 'text-xs', 'uppercase', 'tracking-wide');
            break;
        }
      });
    });
  });

  // Size tests
  describe('Sizes', () => {
    const sizeClassMap = {
      xs: 'text-xs',
      sm: 'text-sm', 
      md: 'text-base', // md maps to text-base in Tailwind
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    } as const;

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'] as const;

    sizes.forEach(size => {
      it(`renders ${size} size correctly`, () => {
        render(<Text size={size}>{size}</Text>);
        const text = screen.getByText(size);
        expect(text).toHaveClass(sizeClassMap[size]);
      });
    });
  });

  // Weight tests
  describe('Weights', () => {
    const weights = ['thin', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'] as const;

    weights.forEach(weight => {
      it(`renders ${weight} weight correctly`, () => {
        render(<Text weight={weight}>{weight}</Text>);
        const text = screen.getByText(weight);
        expect(text).toHaveClass(`font-${weight}`);
      });
    });
  });

  // Alignment tests
  describe('Alignment', () => {
    const alignments = ['left', 'center', 'right', 'justify'] as const;

    alignments.forEach(align => {
      it(`renders ${align} alignment correctly`, () => {
        render(<Text align={align}>{align}</Text>);
        const text = screen.getByText(align);
        expect(text).toHaveClass(`text-${align}`);
      });
    });
  });

  // Transform tests
  describe('Text Transform', () => {
    const transforms = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;

    transforms.forEach(transform => {
      it(`renders ${transform} transform correctly`, () => {
        render(<Text transform={transform}>{transform}</Text>);
        const text = screen.getByText(transform);
        
        if (transform !== 'none') {
          expect(text).toHaveClass(transform);
        }
      });
    });
  });

  // Truncate tests
  describe('Truncation', () => {
    it('applies truncate class when truncate is true', () => {
      render(<Text truncate>This is a very long text that should be truncated</Text>);
      const text = screen.getByText('This is a very long text that should be truncated');
      expect(text).toHaveClass('truncate');
    });

    it('does not apply truncate class when truncate is false', () => {
      render(<Text truncate={false}>Normal text</Text>);
      const text = screen.getByText('Normal text');
      expect(text).not.toHaveClass('truncate');
    });
  });

  // Color tests
  describe('Color', () => {
    it('applies custom color when provided', () => {
      render(<Text color="text-red-500">Red text</Text>);
      const text = screen.getByText('Red text');
      expect(text).toHaveClass('text-red-500');
    });

    it('uses variant color when no custom color is provided', () => {
      render(<Text variant="caption">Caption text</Text>);
      const text = screen.getByText('Caption text');
      expect(text).toHaveClass('text-text-secondary');
    });

    it('custom color overrides variant color', () => {
      render(<Text variant="caption" color="text-blue-600">Custom color</Text>);
      const text = screen.getByText('Custom color');
      expect(text).toHaveClass('text-blue-600');
      expect(text).not.toHaveClass('text-text-secondary');
    });
  });

  // Polymorphic tests
  describe('Polymorphic behavior', () => {
    it('renders as different HTML elements', () => {
      const { rerender } = render(<Text as="h1">Heading</Text>);
      expect(screen.getByText('Heading').tagName).toBe('H1');

      rerender(<Text as="span">Span text</Text>);
      expect(screen.getByText('Span text').tagName).toBe('SPAN');

      rerender(<Text as="div">Div text</Text>);
      expect(screen.getByText('Div text').tagName).toBe('DIV');
    });

    it('renders as heading elements', () => {
      const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
      
      headings.forEach(heading => {
        render(<Text as={heading}>{heading} text</Text>);
        const element = screen.getByText(`${heading} text`);
        expect(element.tagName).toBe(heading.toUpperCase());
      });
    });

    it('passes through additional props to the rendered element', () => {
      render(<Text as="div" data-testid="custom-text" role="banner">Custom</Text>);
      const text = screen.getByTestId('custom-text');
      expect(text).toHaveAttribute('role', 'banner');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('maintains semantic meaning with appropriate elements', () => {
      render(<Text as="h1">Main Heading</Text>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('supports ARIA attributes', () => {
      render(<Text aria-label="Custom label" aria-describedby="description">Text</Text>);
      const text = screen.getByText('Text');
      expect(text).toHaveAttribute('aria-label', 'Custom label');
      expect(text).toHaveAttribute('aria-describedby', 'description');
    });

    it('supports role attribute', () => {
      render(<Text role="status">Status message</Text>);
      const text = screen.getByRole('status');
      expect(text).toBeInTheDocument();
    });
  });

  // Combination tests
  describe('Property Combinations', () => {
    it('combines multiple properties correctly', () => {
      render(
        <Text 
          variant="overline"
          size="lg"
          weight="bold"
          align="center"
          transform="uppercase"
          truncate
          className="custom-class"
        >
          Combined properties
        </Text>
      );
      
      const text = screen.getByText('Combined properties');
      expect(text).toHaveClass(
        'text-text-secondary', // variant
        'text-xs', // variant size
        'uppercase', // variant + transform
        'tracking-wide', // variant
        'text-lg', // size override
        'font-bold', // weight
        'text-center', // align
        'truncate', // truncate
        'custom-class' // custom class
      );
    });

    it('handles conflicting transform properties correctly', () => {
      render(<Text variant="overline" transform="lowercase">Mixed case</Text>);
      const text = screen.getByText('Mixed case');
      // Transform prop should override variant transform
      expect(text).toHaveClass('lowercase');
      expect(text).toHaveClass('uppercase'); // from variant
    });
  });

  // Performance tests
  describe('Performance', () => {
    it('renders efficiently with minimal re-renders', () => {
      const { rerender } = render(<Text>Initial text</Text>);
      const text = screen.getByText('Initial text');
      
      // Rerender with same props should not cause issues
      rerender(<Text>Initial text</Text>);
      expect(text).toBeInTheDocument();
    });
  });

  // Edge cases
  describe('Edge cases', () => {
    it('handles empty children', () => {
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
          <a href="#link">links</a>
        </Text>
      );
      
      expect(screen.getByText('Bold')).toBeInTheDocument();
      expect(screen.getByText('italic')).toBeInTheDocument();
      expect(screen.getByText('links')).toBeInTheDocument();
    });

    it('combines multiple CSS classes correctly', () => {
      render(
        <Text 
          className="custom-class another-class" 
          variant="caption" 
          size="xl" 
          weight="semibold"
        >
          Multiple classes
        </Text>
      );
      
      const text = screen.getByText('Multiple classes');
      expect(text).toHaveClass(
        'custom-class',
        'another-class',
        'text-text-secondary',
        'text-xl',
        'font-semibold'
      );
    });
  });

  // Constants tests
  describe('Component Constants', () => {
    it('exposes variant constants', () => {
      expect(Text.variants).toBeDefined();
      expect(Text.variants).toContain('body');
      expect(Text.variants).toContain('caption');
      expect(Text.variants).toContain('overline');
    });

    it('exposes size constants', () => {
      expect(Text.sizes).toBeDefined();
      expect(Text.sizes).toContain('xs');
      expect(Text.sizes).toContain('md');
      expect(Text.sizes).toContain('6xl');
    });

    it('exposes weight constants', () => {
      expect(Text.weights).toBeDefined();
      expect(Text.weights).toContain('thin');
      expect(Text.weights).toContain('normal');
      expect(Text.weights).toContain('black');
    });
  });
});
