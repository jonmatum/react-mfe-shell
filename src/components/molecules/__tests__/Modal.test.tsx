import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Modal from '../Modal';
import Button from '../../atoms/Button';

describe('Modal', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  describe('Basic Functionality', () => {
    it('renders when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <div>Modal content</div>
        </Modal>
      );

      expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={mockOnClose}>
          <div>Modal content</div>
        </Modal>
      );

      expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
    });
  });

  describe('Compound Components', () => {
    describe('Modal.Header', () => {
      it('renders header with title', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Header>Test Title</Modal.Header>
            <Modal.Body>Content</Modal.Body>
          </Modal>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
      });

      it('renders close button by default', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Header onClose={mockOnClose}>Test Title</Modal.Header>
          </Modal>
        );

        expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
      });

      it('hides close button when showCloseButton is false', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Header showCloseButton={false}>Test Title</Modal.Header>
          </Modal>
        );

        expect(screen.queryByLabelText('Close modal')).not.toBeInTheDocument();
      });

      it('calls onClose when close button is clicked', async () => {
        const user = userEvent.setup();

        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Header onClose={mockOnClose}>Test Title</Modal.Header>
          </Modal>
        );

        await user.click(screen.getByLabelText('Close modal'));
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });

      it('renders custom content instead of string title', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Header>
              <div data-testid='custom-header'>Custom Header Content</div>
            </Modal.Header>
          </Modal>
        );

        expect(screen.getByTestId('custom-header')).toBeInTheDocument();
      });
    });

    describe('Modal.Body', () => {
      it('renders body content', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Body>Body content</Modal.Body>
          </Modal>
        );

        expect(screen.getByText('Body content')).toBeInTheDocument();
      });

      it('applies scrollable styles by default', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Body>Content</Modal.Body>
          </Modal>
        );

        const body = screen.getByText('Content').closest('div');
        expect(body).toHaveClass('overflow-y-auto');
      });

      it('applies non-scrollable styles when scrollable is false', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Body scrollable={false}>Content</Modal.Body>
          </Modal>
        );

        const body = screen.getByText('Content').closest('div');
        expect(body).toHaveClass('overflow-hidden');
      });

      it('applies custom maxHeight', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Body maxHeight='200px'>Content</Modal.Body>
          </Modal>
        );

        const body = screen.getByText('Content').closest('div');
        expect(body).toHaveStyle({ maxHeight: '200px' });
      });
    });

    describe('Modal.Footer', () => {
      it('renders footer content', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Footer>
              <Button>Action</Button>
            </Modal.Footer>
          </Modal>
        );

        expect(screen.getByText('Action')).toBeInTheDocument();
      });

      it('applies end justification by default', () => {
        render(
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Footer>
              <Button>Action</Button>
            </Modal.Footer>
          </Modal>
        );

        const footer = screen.getByText('Action').closest('div');
        expect(footer).toHaveClass('justify-end');
      });

      const justifications = ['start', 'center', 'end', 'between'] as const;

      justifications.forEach(justify => {
        it(`applies ${justify} justification`, () => {
          render(
            <Modal isOpen={true} onClose={mockOnClose}>
              <Modal.Footer justify={justify}>
                <Button>Action</Button>
              </Modal.Footer>
            </Modal>
          );

          const footer = screen.getByText('Action').closest('div');
          expect(footer).toHaveClass(`justify-${justify}`);
        });
      });
    });
  });

  describe('Backward Compatibility', () => {
    it('renders deprecated title prop as header', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title='Legacy Title'>
          <div>Content</div>
        </Modal>
      );

      expect(screen.getByText('Legacy Title')).toBeInTheDocument();
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    it('wraps content in padding when using title prop', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} title='Title'>
          <div>Content</div>
        </Modal>
      );

      const content = screen.getByText('Content').parentElement;
      expect(content).toHaveClass('px-6', 'py-4');
    });
  });

  describe('Complex Usage Scenarios', () => {
    it('handles full compound component structure', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose} size='lg'>
          <Modal.Header showCloseButton onClose={mockOnClose}>
            Complex Modal
          </Modal.Header>
          <Modal.Body scrollable maxHeight='400px'>
            <p>This is a complex modal with all features.</p>
            <Button>Interactive element</Button>
          </Modal.Body>
          <Modal.Footer justify='between'>
            <Button variant='secondary'>Cancel</Button>
            <Button variant='primary'>Confirm</Button>
          </Modal.Footer>
        </Modal>
      );

      expect(screen.getByText('Complex Modal')).toBeInTheDocument();
      expect(
        screen.getByText('This is a complex modal with all features.')
      ).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    it('handles nested interactive elements', async () => {
      const user = userEvent.setup();
      const handleButtonClick = vi.fn();

      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <Modal.Body>
            <Button onClick={handleButtonClick}>Click me</Button>
          </Modal.Body>
        </Modal>
      );

      await user.click(screen.getByText('Click me'));
      expect(handleButtonClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('handles empty content gracefully', () => {
      render(
        <Modal isOpen={true} onClose={mockOnClose}>
          <Modal.Body></Modal.Body>
        </Modal>
      );

      // Should render without errors
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('handles multiple modals (z-index stacking)', () => {
      render(
        <>
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Body>First modal</Modal.Body>
          </Modal>
          <Modal isOpen={true} onClose={mockOnClose}>
            <Modal.Body>Second modal</Modal.Body>
          </Modal>
        </>
      );

      expect(screen.getByText('First modal')).toBeInTheDocument();
      expect(screen.getByText('Second modal')).toBeInTheDocument();
    });

    it('handles rapid open/close cycles', async () => {
      const { rerender } = render(
        <Modal isOpen={false} onClose={mockOnClose}>
          <Modal.Body>Content</Modal.Body>
        </Modal>
      );

      // Rapidly toggle
      rerender(
        <Modal isOpen={true} onClose={mockOnClose}>
          <Modal.Body>Content</Modal.Body>
        </Modal>
      );

      rerender(
        <Modal isOpen={false} onClose={mockOnClose}>
          <Modal.Body>Content</Modal.Body>
        </Modal>
      );

      rerender(
        <Modal isOpen={true} onClose={mockOnClose}>
          <Modal.Body>Content</Modal.Body>
        </Modal>
      );

      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('has correct display names', () => {
      expect(Modal.displayName).toBe('Modal');
      expect(Modal.Header.displayName).toBe('Modal.Header');
      expect(Modal.Body.displayName).toBe('Modal.Body');
      expect(Modal.Footer.displayName).toBe('Modal.Footer');
    });

    it('exports compound components correctly', () => {
      expect(Modal.Header).toBeDefined();
      expect(Modal.Body).toBeDefined();
      expect(Modal.Footer).toBeDefined();
    });
  });
});
