import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Icon from './Icon';

// Mock icon content for testing
const MockIconContent = () => (
  <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
);

describe('Icon', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      render(
        <Icon data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
      expect(icon.tagName).toBe('svg');
    });

    it('renders children content', () => {
      render(
        <Icon data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon.querySelector('path')).toBeInTheDocument();
    });

    it('renders with custom component via as prop', () => {
      render(
        <Icon as='div' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon.tagName).toBe('DIV');
    });
  });

  describe('Size Variants', () => {
    it('applies default medium size', () => {
      render(
        <Icon data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-5', 'h-5');
    });

    it('applies extra small size', () => {
      render(
        <Icon size='xs' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-3', 'h-3');
    });

    it('applies small size', () => {
      render(
        <Icon size='sm' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-4', 'h-4');
    });

    it('applies large size', () => {
      render(
        <Icon size='lg' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-6', 'h-6');
    });

    it('applies extra large size', () => {
      render(
        <Icon size='xl' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-8', 'h-8');
    });

    it('applies 2xl size', () => {
      render(
        <Icon size='2xl' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('w-10', 'h-10');
    });
  });

  describe('Styling', () => {
    it('applies base classes', () => {
      render(
        <Icon data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('inline-block', 'flex-shrink-0');
    });

    it('applies custom className', () => {
      render(
        <Icon className='custom-class' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('custom-class');
    });

    it('applies color classes when color prop is provided', () => {
      render(
        <Icon color='primary-600' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass('text-primary-600');
    });

    it('applies default SVG attributes', () => {
      render(
        <Icon data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('fill', 'currentColor');
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
    });
  });

  describe('Accessibility', () => {
    it('is hidden from screen readers by default', () => {
      render(
        <Icon data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('can be made visible to screen readers', () => {
      render(
        <Icon aria-hidden={false} data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('aria-hidden', 'false');
    });

    it('applies aria-label when provided', () => {
      render(
        <Icon aria-label='Star icon' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('aria-label', 'Star icon');
    });

    it('supports both aria-hidden and aria-label', () => {
      render(
        <Icon
          aria-hidden={false}
          aria-label='Decorative star'
          data-testid='icon'
        >
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('aria-hidden', 'false');
      expect(icon).toHaveAttribute('aria-label', 'Decorative star');
    });
  });

  describe('Props and Attributes', () => {
    it('forwards additional props', () => {
      render(
        <Icon data-testid='icon' data-custom='value' role='img'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('data-custom', 'value');
      expect(icon).toHaveAttribute('role', 'img');
    });

    it('accepts name prop for identification', () => {
      render(
        <Icon name='star' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      // Name prop should be available but not necessarily rendered as attribute
      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('overrides default attributes with custom ones', () => {
      render(
        <Icon fill='red' viewBox='0 0 16 16' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('fill', 'red');
      expect(icon).toHaveAttribute('viewBox', '0 0 16 16');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the component', () => {
      let iconRef: SVGSVGElement | null = null;

      render(
        <Icon
          ref={ref => {
            iconRef = ref;
          }}
          data-testid='icon'
        >
          <MockIconContent />
        </Icon>
      );

      expect(iconRef).toBeInstanceOf(SVGSVGElement);
      expect(iconRef).toBe(screen.getByTestId('icon'));
    });

    it('forwards ref when using custom component', () => {
      let divRef: HTMLDivElement | null = null;

      render(
        <Icon
          as='div'
          ref={ref => {
            divRef = ref;
          }}
          data-testid='icon'
        >
          <MockIconContent />
        </Icon>
      );

      expect(divRef).toBeInstanceOf(HTMLDivElement);
      expect(divRef).toBe(screen.getByTestId('icon'));
    });
  });

  describe('Edge Cases', () => {
    it('handles empty children', () => {
      render(<Icon data-testid='icon' />);

      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toBeEmptyDOMElement();
    });

    it('handles multiple children', () => {
      render(
        <Icon data-testid='icon'>
          <path d='M1 1L2 2' />
          <circle cx='5' cy='5' r='2' />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon.querySelector('path')).toBeInTheDocument();
      expect(icon.querySelector('circle')).toBeInTheDocument();
    });

    it('handles undefined color gracefully', () => {
      render(
        <Icon color={undefined} data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).not.toHaveClass('text-undefined');
    });
  });

  describe('Component Integration', () => {
    it('works with different HTML elements via as prop', () => {
      const elements = ['div', 'span', 'i'] as const;

      elements.forEach(element => {
        const { unmount } = render(
          <Icon as={element} data-testid={`icon-${element}`}>
            <MockIconContent />
          </Icon>
        );

        const icon = screen.getByTestId(`icon-${element}`);
        expect(icon.tagName).toBe(element.toUpperCase());

        unmount();
      });
    });

    it('maintains consistent styling across different elements', () => {
      render(
        <Icon as='div' size='lg' className='custom' data-testid='icon'>
          <MockIconContent />
        </Icon>
      );

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveClass(
        'inline-block',
        'flex-shrink-0',
        'w-6',
        'h-6',
        'custom'
      );
    });
  });
});
