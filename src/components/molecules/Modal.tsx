import React, { memo, useEffect, useCallback, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ModalProps } from '../../types';
import { classNames } from '../../utils';
import Button from '../atoms/Button';

/**
 * A flexible modal component with accessibility features and keyboard navigation
 *
 * @example
 * ```tsx
 * <Modal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   title="Confirm Action"
 * >
 *   <p>Are you sure you want to continue?</p>
 *   <Modal.Footer>
 *     <Button variant="secondary" onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
const Modal = memo<ModalProps>(
  ({ isOpen, onClose, title, children, className }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Handle escape key and focus management
    useEffect(() => {
      if (!isOpen) return;

      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      const handleTabTrap = (event: KeyboardEvent) => {
        if (event.key !== 'Tab' || !modalRef.current) return;

        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      };

      // Add event listeners
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('keydown', handleTabTrap);
      document.body.style.overflow = 'hidden';

      // Focus the modal
      modalRef.current?.focus();

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('keydown', handleTabTrap);
        document.body.style.overflow = 'unset';

        // Restore focus to the previously focused element
        previousActiveElement.current?.focus();
      };
    }, [isOpen, onClose]);

    const handleBackdropClick = useCallback(
      (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      },
      [onClose]
    );

    if (!isOpen) return null;

    return (
      <div className='fixed inset-0 z-50 overflow-y-auto'>
        {/* Backdrop */}
        <div
          className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm transition-all duration-200'
          onClick={handleBackdropClick}
          aria-hidden='true'
        />

        {/* Modal */}
        <div className='flex min-h-full items-center justify-center p-4'>
          <div
            ref={modalRef}
            className={classNames(
              'relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all dark:bg-gray-800',
              className
            )}
            role='dialog'
            aria-modal='true'
            aria-labelledby={title ? 'modal-title' : undefined}
            tabIndex={-1}
          >
            {/* Header */}
            <div className='flex items-center justify-between mb-4'>
              {title && (
                <h3
                  id='modal-title'
                  className='text-lg font-semibold text-gray-900 dark:text-gray-100'
                >
                  {title}
                </h3>
              )}
              <Button
                variant='ghost'
                size='sm'
                onClick={onClose}
                className='ml-auto -mr-2 p-2'
                aria-label='Close modal'
              >
                <XMarkIcon className='h-5 w-5' />
              </Button>
            </div>

            {/* Content */}
            <div className='text-gray-700 dark:text-gray-300'>{children}</div>
          </div>
        </div>
      </div>
    );
  }
);

/**
 * Modal Header component for consistent header styling
 */
const ModalHeader = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className }) => (
    <div
      className={classNames(
        'mb-4 pb-4 border-b border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  )
);

/**
 * Modal Body component for consistent body styling
 */
const ModalBody = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className }) => (
    <div className={classNames('mb-4', className)}>{children}</div>
  )
);

/**
 * Modal Footer component for consistent footer styling with action buttons
 */
const ModalFooter = memo<{ children: React.ReactNode; className?: string }>(
  ({ children, className }) => (
    <div
      className={classNames(
        'flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700',
        className
      )}
    >
      {children}
    </div>
  )
);

Modal.displayName = 'Modal';
ModalHeader.displayName = 'ModalHeader';
ModalBody.displayName = 'ModalBody';
ModalFooter.displayName = 'ModalFooter';

// Define the compound component type
interface ModalComponent extends React.NamedExoticComponent<ModalProps> {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

// Compound component pattern
const ModalWithCompounds = Modal as ModalComponent;
ModalWithCompounds.Header = ModalHeader;
ModalWithCompounds.Body = ModalBody;
ModalWithCompounds.Footer = ModalFooter;

export default ModalWithCompounds;
