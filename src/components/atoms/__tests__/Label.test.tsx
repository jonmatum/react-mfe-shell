import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Label from '../Label';

describe('Label', () => {
  // Basic rendering tests
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Label>Test Label</Label>);
      const label = screen.getByText('Test Label');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    it('renders with custom className', () => {
      render(<Label className='custom-class'>Test</Label>);
      const label = screen.getByText('Test');
      expect(label).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
      render(
        <Label>
          <span>Complex</span> Label
        </Label>
      );
      expect(screen.getByText('Complex')).toBeInTheDocument();
      expect(screen.getByText('Label')).toBeInTheDocument();
    });
  });

  // Size tests
  describe('Sizes', () => {
    it.each([
      ['sm', 'text-xs'],
      ['md', 'text-sm'],
      ['lg', 'text-base'],
    ])('renders %s size correctly', (size, expectedClass) => {
      render(<Label size={size as any}>Test Label</Label>);
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass(expectedClass);
    });
  });

  // State tests
  describe('States', () => {
    it('renders required state correctly', () => {
      render(<Label required>Required Label</Label>);
      const label = screen.getByText('Required Label');
      const asterisk = screen.getByText('*');

      expect(label).toBeInTheDocument();
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveClass('text-danger-500');
      expect(asterisk).toHaveAttribute('aria-label', 'required');
      expect(asterisk).toHaveAttribute('title', 'This field is required');
    });

    it('renders disabled state correctly', () => {
      render(<Label disabled>Disabled Label</Label>);
      const label = screen.getByText('Disabled Label');
      expect(label).toHaveClass('text-text-disabled', 'cursor-not-allowed');
    });

    it('renders normal state correctly', () => {
      render(<Label>Normal Label</Label>);
      const label = screen.getByText('Normal Label');
      expect(label).toHaveClass('text-text-primary');
      expect(label).not.toHaveClass('text-text-disabled', 'cursor-not-allowed');
    });
  });

  // Form association tests
  describe('Form Association', () => {
    it('associates with form input correctly', () => {
      render(
        <div>
          <Label htmlFor='test-input'>Test Label</Label>
          <input id='test-input' />
        </div>
      );

      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'test-input');
    });

    it('does not add htmlFor when rendered as non-label element', () => {
      render(
        <Label as='legend' htmlFor='test-input'>
          Legend Label
        </Label>
      );

      const legend = screen.getByText('Legend Label');
      expect(legend.tagName).toBe('LEGEND');
      expect(legend).not.toHaveAttribute('htmlFor');
    });
  });

  // Polymorphic tests
  describe('Polymorphic rendering', () => {
    it('renders as legend when as="legend"', () => {
      render(<Label as='legend'>Legend Label</Label>);

      const legend = screen.getByText('Legend Label');
      expect(legend.tagName).toBe('LEGEND');
    });

    it('renders as span when as="span"', () => {
      render(<Label as='span'>Span Label</Label>);

      const span = screen.getByText('Span Label');
      expect(span.tagName).toBe('SPAN');
    });

    it('renders as div when as="div"', () => {
      render(<Label as='div'>Div Label</Label>);

      const div = screen.getByText('Div Label');
      expect(div.tagName).toBe('DIV');
    });
  });

  // Accessibility tests
  describe('Accessibility', () => {
    it('has proper base classes for accessibility', () => {
      render(<Label>Accessible Label</Label>);
      const label = screen.getByText('Accessible Label');

      expect(label).toHaveClass('block', 'font-medium');
    });

    it('maintains accessibility with required indicator', () => {
      render(<Label required>Required Field</Label>);
      const asterisk = screen.getByText('*');

      expect(asterisk).toHaveAttribute('aria-label', 'required');
      expect(asterisk).toHaveAttribute('title', 'This field is required');
    });

    it('applies proper disabled styling for accessibility', () => {
      render(<Label disabled>Disabled Label</Label>);
      const label = screen.getByText('Disabled Label');

      expect(label).toHaveClass('cursor-not-allowed');
    });
  });

  // Combined state tests
  describe('Combined States', () => {
    it('renders required and disabled states together', () => {
      render(
        <Label required disabled>
          Required Disabled
        </Label>
      );

      const label = screen.getByText('Required Disabled');
      const asterisk = screen.getByText('*');

      expect(label).toHaveClass('text-text-disabled', 'cursor-not-allowed');
      expect(asterisk).toBeInTheDocument();
    });

    it('renders different sizes with required state', () => {
      render(
        <Label size='lg' required>
          Large Required
        </Label>
      );

      const label = screen.getByText('Large Required');
      const asterisk = screen.getByText('*');

      expect(label).toHaveClass('text-base');
      expect(asterisk).toBeInTheDocument();
    });
  });
});
