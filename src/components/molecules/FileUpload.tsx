import React, { forwardRef, useCallback, useRef, useState } from 'react';
import {
  CloudArrowUpIcon,
  DocumentIcon,
  XMarkIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { FileUploadProps } from '../../types';
import { classNames, generateId } from '../../utils';
import Label from '../atoms/Label';
import Button from '../atoms/Button';

/**
 * FileUpload component with drag-and-drop, preview, and validation features
 *
 * @example
 * ```tsx
 * <FileUpload
 *   label="Upload documents"
 *   accept="image/*,.pdf,.doc,.docx"
 *   multiple
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   onFilesChange={handleFilesChange}
 *   preview
 *   dragAndDrop
 * />
 * ```
 */
const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      accept,
      multiple = false,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles = 10,
      onFilesChange,
      onError,
      preview = false,
      dragAndDrop = true,
      children,
      label,
      description,
      error,
      required = false,
      disabled = false,
      size = 'md',
      className,
      id,
      name,
      ...props
    },
    _ref // Prefix with underscore to indicate intentionally unused
  ) => {
    const fieldId = id || generateId('file-upload');
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);

    // Format file size
    const formatFileSize = useCallback((bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }, []);

    // Validate files
    const validateFiles = useCallback(
      (fileList: File[]): { valid: File[]; errors: string[] } => {
        const valid: File[] = [];
        const errors: string[] = [];

        // Check total number of files
        if (fileList.length > maxFiles) {
          errors.push(`Maximum ${maxFiles} files allowed`);
          return { valid, errors };
        }

        fileList.forEach(file => {
          // Check file size
          if (file.size > maxSize) {
            errors.push(
              `${file.name} is too large. Maximum size is ${formatFileSize(maxSize)}`
            );
            return;
          }

          // Check file type if accept is specified
          if (accept) {
            const acceptedTypes = accept.split(',').map(type => type.trim());
            const isValidType = acceptedTypes.some(type => {
              if (type.startsWith('.')) {
                return file.name.toLowerCase().endsWith(type.toLowerCase());
              }
              return file.type.match(type.replace('*', '.*'));
            });

            if (!isValidType) {
              errors.push(`${file.name} is not an accepted file type`);
              return;
            }
          }

          valid.push(file);
        });

        return { valid, errors };
      },
      [maxFiles, maxSize, accept, formatFileSize]
    );

    // Handle file selection
    const handleFiles = useCallback(
      (fileList: FileList | null) => {
        if (!fileList) return;

        const newFiles = Array.from(fileList);
        const { valid, errors } = validateFiles(newFiles);

        if (errors.length > 0) {
          onError?.(errors.join(', '));
          return;
        }

        const updatedFiles = multiple ? [...files, ...valid] : valid;
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
      },
      [files, multiple, onFilesChange, onError, validateFiles]
    );

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(event.target.files);
    };

    // Handle drag events
    const handleDragOver = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled]
    );

    const handleDragLeave = useCallback((event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDragOver(false);

        if (disabled) return;

        const droppedFiles = event.dataTransfer.files;
        handleFiles(droppedFiles);
      },
      [disabled, handleFiles]
    );

    // Remove file
    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    // Open file picker
    const openFilePicker = () => {
      if (!disabled && inputRef.current) {
        inputRef.current.click();
      }
    };

    // Get file icon
    const getFileIcon = (file: File) => {
      if (file.type.startsWith('image/')) {
        return <PhotoIcon className='w-8 h-8 text-primary-500' />;
      }
      return <DocumentIcon className='w-8 h-8 text-text-secondary' />;
    };

    // Get preview URL for images
    const getPreviewUrl = (file: File): string | null => {
      if (file.type.startsWith('image/')) {
        return URL.createObjectURL(file);
      }
      return null;
    };

    const sizeClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const baseClasses =
      'relative border-2 border-dashed rounded-lg transition-colors duration-200';

    const stateClasses = isDragOver
      ? 'border-primary-500 bg-primary-50'
      : error
        ? 'border-danger-500 bg-danger-50'
        : 'border-border-primary hover:border-border-hover';

    const disabledClasses = disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer';

    return (
      <div className={className}>
        {label && (
          <Label
            htmlFor={fieldId}
            required={required}
            disabled={disabled}
            size={size}
            className='mb-3'
          >
            {label}
          </Label>
        )}

        <div className='space-y-4'>
          {/* Upload Area */}
          <div
            className={classNames(
              baseClasses,
              sizeClasses[size],
              stateClasses,
              disabledClasses
            )}
            onDragOver={dragAndDrop ? handleDragOver : undefined}
            onDragLeave={dragAndDrop ? handleDragLeave : undefined}
            onDrop={dragAndDrop ? handleDrop : undefined}
            onClick={openFilePicker}
          >
            <input
              ref={inputRef}
              id={fieldId}
              name={name}
              type='file'
              accept={accept}
              multiple={multiple}
              onChange={handleInputChange}
              disabled={disabled}
              className='sr-only'
              aria-describedby={
                [
                  description ? `${fieldId}-description` : null,
                  error ? `${fieldId}-error` : null,
                ]
                  .filter(Boolean)
                  .join(' ') || undefined
              }
              aria-invalid={error ? 'true' : 'false'}
              aria-required={required ? 'true' : undefined}
              {...props}
            />

            <div className='text-center'>
              {children || (
                <>
                  <CloudArrowUpIcon className='mx-auto h-12 w-12 text-text-secondary' />
                  <div className='mt-4'>
                    <p className='text-sm font-medium text-text-primary'>
                      {dragAndDrop
                        ? 'Drop files here or click to browse'
                        : 'Click to browse files'}
                    </p>
                    <p className='text-xs text-text-secondary mt-1'>
                      {accept && `Accepted formats: ${accept}`}
                      {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                      {multiple && ` • Max files: ${maxFiles}`}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className='space-y-2'>
              <h4 className='text-sm font-medium text-text-primary'>
                Selected Files ({files.length})
              </h4>
              <div className='space-y-2'>
                {files.map((file, index) => {
                  const previewUrl = preview ? getPreviewUrl(file) : null;

                  return (
                    <div
                      key={`${file.name}-${index}`}
                      className='flex items-center gap-3 p-3 bg-surface-secondary rounded-lg'
                    >
                      {/* File Icon/Preview */}
                      <div className='flex-shrink-0'>
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt={file.name}
                            className='w-10 h-10 object-cover rounded'
                            onLoad={() => URL.revokeObjectURL(previewUrl)}
                          />
                        ) : (
                          getFileIcon(file)
                        )}
                      </div>

                      {/* File Info */}
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-medium text-text-primary truncate'>
                          {file.name}
                        </p>
                        <p className='text-xs text-text-secondary'>
                          {formatFileSize(file.size)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant='ghost'
                        size='xs'
                        onClick={e => {
                          e.stopPropagation();
                          removeFile(index);
                        }}
                        disabled={disabled}
                        className='p-1 hover:bg-danger-100 hover:text-danger-600'
                        aria-label={`Remove ${file.name}`}
                      >
                        <XMarkIcon className='w-4 h-4' />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {description && !error && (
          <p
            id={`${fieldId}-description`}
            className={classNames(
              'mt-3 text-text-secondary',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
          >
            {description}
          </p>
        )}

        {error && (
          <p
            id={`${fieldId}-error`}
            className={classNames(
              'mt-3 text-danger-600 flex items-center gap-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}
            role='alert'
            aria-live='polite'
          >
            <svg
              className={classNames(
                'flex-shrink-0',
                size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
              )}
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z'
                clipRule='evenodd'
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
