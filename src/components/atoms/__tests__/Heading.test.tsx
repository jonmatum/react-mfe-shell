import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Heading from '../Heading';

describe('Heading Component', () => {
  // =============================================================================
  // BASIC RENDERING TESTS
  // =============================================================================

  describe('Basic Rendering', () => {
    it('renders correctly with required level prop', () => {
      render(<Heading level={1}>Main Heading</Heading>);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H1');
      expect(heading).toHaveTextContent('Main Heading');
    });

    it('renders with custom className', () => {
      render(
        <Heading level={2} className='custom-heading'>
          Subheading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('custom-heading');
    });
  });

  // =============================================================================
  // HEADING LEVEL TESTS
  // =============================================================================

  describe('Heading Levels', () => {
    const levels = [1, 2, 3, 4, 5, 6] as const;

    levels.forEach(level => {
      it(`renders h${level} correctly with appropriate default styling`, () => {
        render(<Heading level={level}>Heading {level}</Heading>);
        const heading = screen.getByRole('heading', { level });

        expect(heading.tagName).toBe(`H${level}`);
        expect(heading).toHaveTextContent(`Heading ${level}`);

        // Test default size classes based on level
        const expectedSizes = {
          1: 'text-4xl',
          2: 'text-3xl',
          3: 'text-2xl',
          4: 'text-xl',
          5: 'text-lg',
          6: 'text-base',
        };

        expect(heading).toHaveClass(expectedSizes[level]);

        // Test default weight classes
        const expectedWeights = {
          1: 'font-bold',
          2: 'font-bold',
          3: 'font-semibold',
          4: 'font-semibold',
          5: 'font-medium',
          6: 'font-medium',
        };

        expect(heading).toHaveClass(expectedWeights[level]);
      });
    });
  });

  // =============================================================================
  // SIZE OVERRIDE TESTS
  // =============================================================================

  describe('Size Overrides', () => {
    it('allows size override for heading levels', () => {
      render(
        <Heading level={1} size='sm'>
          Small H1
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-sm');
      expect(heading).not.toHaveClass('text-4xl'); // Default h1 size
    });

    it('handles responsive sizes', () => {
      render(
        <Heading level={2} size={{ base: 'lg', md: '2xl', xl: '4xl' }}>
          Responsive Heading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-lg', 'md:text-2xl', 'xl:text-4xl');
    });
  });

  // =============================================================================
  // WEIGHT OVERRIDE TESTS
  // =============================================================================

  describe('Weight Overrides', () => {
    it('allows weight override for heading levels', () => {
      render(
        <Heading level={1} weight='light'>
          Light H1
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('font-light');
      expect(heading).not.toHaveClass('font-bold'); // Default h1 weight
    });

    it('handles responsive weights', () => {
      render(
        <Heading
          level={3}
          weight={{ base: 'normal', md: 'semibold', xl: 'bold' }}
        >
          Responsive Weight
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveClass(
        'font-normal',
        'md:font-semibold',
        'xl:font-bold'
      );
    });
  });

  // =============================================================================
  // TYPOGRAPHY FEATURES TESTS
  // =============================================================================

  describe('Typography Features', () => {
    it('applies alignment correctly', () => {
      render(
        <Heading level={2} align='center'>
          Centered Heading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('text-center');
    });

    it('applies responsive alignment', () => {
      render(
        <Heading level={2} align={{ base: 'left', md: 'center', xl: 'right' }}>
          Responsive Alignment
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass(
        'text-left',
        'md:text-center',
        'xl:text-right'
      );
    });

    it('applies text transform', () => {
      render(
        <Heading level={3} transform='uppercase'>
          Uppercase Heading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveClass('uppercase');
    });

    it('applies text decoration', () => {
      render(
        <Heading level={4} decoration='underline'>
          Underlined Heading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 4 });
      expect(heading).toHaveClass('underline');
    });

    it('applies leading (line height)', () => {
      render(
        <Heading level={2} leading='tight'>
          Tight Leading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('leading-tight');
    });

    it('applies tracking (letter spacing)', () => {
      render(
        <Heading level={2} tracking='wide'>
          Wide Tracking
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('tracking-wide');
    });
  });

  // =============================================================================
  // COLOR AND GRADIENT TESTS
  // =============================================================================

  describe('Color and Gradient', () => {
    it('applies custom color', () => {
      render(
        <Heading level={1} color='text-blue-600'>
          Blue Heading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass('text-blue-600');
    });

    it('applies gradient text', () => {
      render(
        <Heading level={1} gradient>
          Gradient Heading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass(
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent'
      );
    });
  });

  // =============================================================================
  // TEXT HANDLING TESTS
  // =============================================================================

  describe('Text Handling', () => {
    it('applies truncation', () => {
      render(
        <Heading level={2} truncate>
          Very long heading that should be truncated
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('truncate');
    });

    it('applies line clamping', () => {
      render(
        <Heading level={2} lineClamp={2}>
          Multi-line heading that should be clamped
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('line-clamp-2');
    });

    it('applies selectability', () => {
      render(
        <Heading level={2} selectable={false}>
          Non-selectable heading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('select-none');
    });
  });

  // =============================================================================
  // POLYMORPHIC BEHAVIOR TESTS
  // =============================================================================

  describe('Polymorphic Behavior', () => {
    it('renders as different elements when as prop is provided', () => {
      render(
        <Heading level={2} as='div'>
          Div Heading
        </Heading>
      );
      const element = screen.getByText('Div Heading');
      expect(element.tagName).toBe('DIV');
      // Should still have heading styles but not be a semantic heading
      expect(element).not.toHaveAttribute('role', 'heading');
    });

    it('maintains heading semantics by default', () => {
      render(<Heading level={3}>Semantic Heading</Heading>);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading.tagName).toBe('H3');
    });

    it('passes through additional props', () => {
      render(
        <Heading
          level={2}
          data-testid='custom-heading'
          aria-describedby='description'
        >
          Custom Props Heading
        </Heading>
      );
      const heading = screen.getByTestId('custom-heading');
      expect(heading).toHaveAttribute('aria-describedby', 'description');
    });
  });

  // =============================================================================
  // ACCESSIBILITY TESTS
  // =============================================================================

  describe('Accessibility', () => {
    it('maintains proper heading hierarchy', () => {
      render(
        <div>
          <Heading level={1}>Main Title</Heading>
          <Heading level={2}>Section Title</Heading>
          <Heading level={3}>Subsection Title</Heading>
        </div>
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Main Title'
      );
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
        'Section Title'
      );
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Subsection Title'
      );
    });

    it('supports ARIA attributes', () => {
      render(
        <Heading
          level={2}
          aria-label='Custom heading label'
          aria-describedby='heading-description'
        >
          ARIA Heading
        </Heading>
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveAttribute('aria-label', 'Custom heading label');
      expect(heading).toHaveAttribute(
        'aria-describedby',
        'heading-description'
      );
    });
  });

  // =============================================================================
  // COMBINATION TESTS
  // =============================================================================

  describe('Property Combinations', () => {
    it('combines multiple properties correctly', () => {
      render(
        <Heading
          level={1}
          size='3xl'
          weight='extrabold'
          align='center'
          transform='uppercase'
          decoration='underline'
          leading='tight'
          tracking='wider'
          gradient
          className='custom-heading'
        >
          Complex Heading
        </Heading>
      );

      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveClass(
        'text-3xl',
        'font-extrabold',
        'text-center',
        'uppercase',
        'underline',
        'leading-tight',
        'tracking-wider',
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent',
        'custom-heading'
      );
    });
  });

  // =============================================================================
  // EDGE CASES TESTS
  // =============================================================================

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      const { container } = render(<Heading level={1}></Heading>);
      const heading = container.querySelector('h1');
      expect(heading).toBeInTheDocument();
    });

    it('handles complex nested content', () => {
      render(
        <Heading level={2}>
          <span>Complex</span> <strong>Nested</strong> Content
        </Heading>
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Nested')).toBeInTheDocument();
    });
  });

  // =============================================================================
  // PERFORMANCE TESTS
  // =============================================================================

  describe('Performance', () => {
    it('renders efficiently with memoized classes', () => {
      const { rerender } = render(<Heading level={2}>Initial Heading</Heading>);
      const heading = screen.getByRole('heading', { level: 2 });
      const initialClasses = heading.className;

      // Rerender with same props
      rerender(<Heading level={2}>Initial Heading</Heading>);
      expect(heading.className).toBe(initialClasses);
    });
  });
});
