import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';
import Button from '../atoms/Button';

// Base Modal Props
interface BaseModalProps extends Omit<BaseComponentProps, 'children'> {
  isOpen: boolean;
  onClose: () => void;
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | 'full'
    | 'fullscreen';
  position?: 'center' | 'top' | 'bottom';
  closeOnBackdropClick?: boolean;
  showBackdrop?: boolean;
  backdropClassName?: string;
  panelClassName?: string;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
}

// Main Modal Component Props
interface ModalProps extends BaseModalProps {
  children: React.ReactNode;
  /** @deprecated Use Modal.Header compound component instead */
  title?: string;
}

// Compound Component Props
interface ModalHeaderProps extends BaseComponentProps {
  children: React.ReactNode;
  showCloseButton?: boolean;
  onClose?: () => void;
  closeButtonProps?: React.ComponentProps<typeof Button>;
}

interface ModalBodyProps extends BaseComponentProps {
  children: React.ReactNode;
  scrollable?: boolean;
  maxHeight?: string;
}

interface ModalFooterProps extends BaseComponentProps {
  children: React.ReactNode;
  justify?: 'start' | 'center' | 'end' | 'between';
}

// Size configurations with responsive breakpoints
const sizeClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  full: 'max-w-[calc(100vw-1rem)] sm:max-w-[calc(100vw-2rem)] max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)]',
  fullscreen: 'w-screen h-screen max-w-none max-h-none',
} as const;

// Position configurations
const positionClasses = {
  center: 'items-center justify-center',
  top: 'items-start justify-center pt-4 sm:pt-16',
  bottom: 'items-end justify-center pb-4 sm:pb-16',
} as const;

/**
 * Enhanced Modal component with Headless UI integration
 *
 * Features:
 * - Full accessibility with focus management
 * - Smooth animations and transitions
 * - Responsive design with mobile-first approach
 * - Flexible sizing and positioning
 * - Compound component pattern
 * - Theme-aware styling
 *
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onClose={handleClose} size="lg">
 *   <Modal.Header showCloseButton onClose={handleClose}>
 *     Confirm Action
 *   </Modal.Header>
 *   <Modal.Body>
 *     <p>Are you sure you want to continue?</p>
 *   </Modal.Body>
 *   <Modal.Footer justify="end">
 *     <Button variant="secondary" onClick={handleClose}>Cancel</Button>
 *     <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *   </Modal.Footer>
 * </Modal>
 * ```
 */
const Modal = React.memo<ModalProps>(
  ({
    isOpen,
    onClose,
    size = 'md',
    position = 'center',
    closeOnBackdropClick = true,
    showBackdrop = true,
    backdropClassName,
    panelClassName,
    initialFocus,
    className,
    children,
    title, // Deprecated prop for backward compatibility
    ...props
  }) => {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-50'
          onClose={closeOnBackdropClick ? onClose : () => {}}
          initialFocus={initialFocus}
          {...props}
        >
          {/* Backdrop */}
          {showBackdrop && (
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div
                className={classNames(
                  'fixed inset-0 bg-black/50 backdrop-blur-sm',
                  backdropClassName
                )}
              />
            </Transition.Child>
          )}

          {/* Modal Container */}
          <div
            className={classNames(
              'fixed inset-0',
              size === 'fullscreen' ? '' : 'overflow-y-auto'
            )}
          >
            <div
              className={classNames(
                'flex min-h-full',
                size === 'fullscreen' ? 'p-0' : 'p-2 sm:p-4',
                size === 'fullscreen'
                  ? 'items-stretch justify-stretch'
                  : positionClasses[position]
              )}
            >
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom={
                  size === 'fullscreen'
                    ? 'opacity-0'
                    : 'opacity-0 scale-95 translate-y-4 sm:translate-y-0'
                }
                enterTo={
                  size === 'fullscreen'
                    ? 'opacity-100'
                    : 'opacity-100 scale-100 translate-y-0'
                }
                leave='ease-in duration-200'
                leaveFrom={
                  size === 'fullscreen'
                    ? 'opacity-100'
                    : 'opacity-100 scale-100 translate-y-0'
                }
                leaveTo={
                  size === 'fullscreen'
                    ? 'opacity-0'
                    : 'opacity-0 scale-95 translate-y-4 sm:translate-y-0'
                }
              >
                <Dialog.Panel
                  className={classNames(
                    'w-full transform overflow-hidden',
                    size === 'fullscreen' ? 'rounded-none' : 'rounded-lg',
                    'bg-surface-primary shadow-xl transition-all',
                    'border border-border-primary',
                    sizeClasses[size],
                    // Responsive adjustments
                    size === 'fullscreen'
                      ? 'h-full max-h-none'
                      : size === 'full'
                        ? 'max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-4rem)] h-full sm:h-auto'
                        : 'max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-4rem)]',
                    panelClassName,
                    className
                  )}
                >
                  {/* Backward compatibility: render title as header if provided */}
                  {title && (
                    <ModalHeader showCloseButton onClose={onClose}>
                      {title}
                    </ModalHeader>
                  )}

                  {/* Main content */}
                  {title ? (
                    <div className='px-6 py-4'>{children}</div>
                  ) : (
                    children
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
);

/**
 * Modal Header component with optional close button
 */
const ModalHeader = React.memo<ModalHeaderProps>(
  ({
    children,
    showCloseButton = true,
    onClose,
    closeButtonProps,
    className,
    ...props
  }) => {
    return (
      <div
        className={classNames(
          'flex items-center justify-between',
          'px-4 py-3 sm:px-6 sm:py-4 border-b border-border-primary',
          'bg-surface-primary',
          className
        )}
        {...props}
      >
        <div className='flex-1 min-w-0 pr-4'>
          {typeof children === 'string' ? (
            <Dialog.Title
              as='h3'
              className='text-lg font-semibold text-text-primary truncate'
            >
              {children}
            </Dialog.Title>
          ) : (
            children
          )}
        </div>

        {showCloseButton && onClose && (
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='flex-shrink-0 -mr-2'
            aria-label='Close modal'
            {...closeButtonProps}
          >
            <XMarkIcon className='w-5 h-5' />
          </Button>
        )}
      </div>
    );
  }
);

/**
 * Modal Body component with optional scrolling
 */
const ModalBody = React.memo<ModalBodyProps>(
  ({ children, scrollable = true, maxHeight, className, ...props }) => {
    return (
      <div
        className={classNames(
          'px-4 py-3 sm:px-6 sm:py-4',
          scrollable ? 'overflow-y-auto' : 'overflow-hidden',
          'bg-surface-primary text-text-primary',
          className
        )}
        style={maxHeight ? { maxHeight } : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

/**
 * Modal Footer component with flexible justification
 */
const ModalFooter = React.memo<ModalFooterProps>(
  ({ children, justify = 'end', className, ...props }) => {
    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        className={classNames(
          'flex items-center gap-2 sm:gap-3',
          'px-4 py-3 sm:px-6 sm:py-4 border-t border-border-primary',
          'bg-surface-secondary',
          justifyClasses[justify],
          // Stack buttons on mobile if there are many
          'flex-col-reverse sm:flex-row',
          justify === 'between' ? 'sm:flex-row' : '',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// Set display names
Modal.displayName = 'Modal';
ModalHeader.displayName = 'Modal.Header';
ModalBody.displayName = 'Modal.Body';
ModalFooter.displayName = 'Modal.Footer';

// Define the compound component type
interface ModalComponent extends React.NamedExoticComponent<ModalProps> {
  Header: typeof ModalHeader;
  Body: typeof ModalBody;
  Footer: typeof ModalFooter;
}

// Compound component pattern
const ModalCompound = Modal as ModalComponent;
ModalCompound.Header = ModalHeader;
ModalCompound.Body = ModalBody;
ModalCompound.Footer = ModalFooter;

export default ModalCompound;
export { ModalHeader, ModalBody, ModalFooter };
export type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps };
