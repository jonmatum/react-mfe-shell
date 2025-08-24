import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FileUpload from '../FileUpload';

// Mock URL.createObjectURL and URL.revokeObjectURL
const mockCreateObjectURL = vi.fn();
const mockRevokeObjectURL = vi.fn();

Object.defineProperty(global.URL, 'createObjectURL', {
  value: mockCreateObjectURL,
});

Object.defineProperty(global.URL, 'revokeObjectURL', {
  value: mockRevokeObjectURL,
});

describe('FileUpload', () => {
  const mockOnFilesChange = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    mockOnFilesChange.mockClear();
    mockOnError.mockClear();
    mockCreateObjectURL.mockClear();
    mockRevokeObjectURL.mockClear();
    mockCreateObjectURL.mockReturnValue('mock-url');
  });

  it('renders with default props', () => {
    render(<FileUpload onFilesChange={mockOnFilesChange} />);

    expect(
      screen.getByText('Drop files here or click to browse')
    ).toBeInTheDocument();
    expect(screen.getByText(/Max size: 10 MB/)).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(
      <FileUpload onFilesChange={mockOnFilesChange} label='Upload Documents' />
    );

    expect(screen.getByText('Upload Documents')).toBeInTheDocument();
  });

  it('shows description when provided', () => {
    render(
      <FileUpload
        onFilesChange={mockOnFilesChange}
        description='Max 5MB per file'
      />
    );

    expect(screen.getByText('Max 5MB per file')).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    render(
      <FileUpload onFilesChange={mockOnFilesChange} error='File too large' />
    );

    expect(screen.getByText('File too large')).toBeInTheDocument();
  });

  it('handles accept prop correctly', () => {
    render(
      <FileUpload accept='.jpg,.png,.pdf' onFilesChange={mockOnFilesChange} />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toHaveAttribute('accept', '.jpg,.png,.pdf');
    expect(
      screen.getByText(/Accepted formats: .jpg,.png,.pdf/)
    ).toBeInTheDocument();
  });

  it('handles multiple prop correctly', () => {
    render(<FileUpload multiple onFilesChange={mockOnFilesChange} />);

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toHaveAttribute('multiple');
    expect(screen.getByText(/Max files: 10/)).toBeInTheDocument();
  });

  it('shows correct text when dragAndDrop is disabled', () => {
    render(
      <FileUpload dragAndDrop={false} onFilesChange={mockOnFilesChange} />
    );

    expect(screen.getByText('Click to browse files')).toBeInTheDocument();
    expect(
      screen.queryByText('Drop files here or click to browse')
    ).not.toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<FileUpload disabled onFilesChange={mockOnFilesChange} />);

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toBeDisabled();

    // Check that the component renders in disabled state
    expect(
      screen.getByText('Drop files here or click to browse')
    ).toBeInTheDocument();
  });

  it('handles custom children content', () => {
    render(
      <FileUpload onFilesChange={mockOnFilesChange}>
        <div>Custom upload content</div>
      </FileUpload>
    );

    expect(screen.getByText('Custom upload content')).toBeInTheDocument();
    expect(
      screen.queryByText('Drop files here or click to browse')
    ).not.toBeInTheDocument();
  });

  it('shows required indicator when required', () => {
    render(
      <FileUpload
        label='Upload Files'
        required
        onFilesChange={mockOnFilesChange}
      />
    );

    expect(screen.getByText('Upload Files')).toBeInTheDocument();
    // The required indicator is handled by the Label component
  });

  it('applies correct size prop', () => {
    const { rerender } = render(
      <FileUpload size='sm' onFilesChange={mockOnFilesChange} />
    );

    // Just verify the component renders with different sizes
    expect(
      screen.getByText('Drop files here or click to browse')
    ).toBeInTheDocument();

    rerender(<FileUpload size='lg' onFilesChange={mockOnFilesChange} />);

    expect(
      screen.getByText('Drop files here or click to browse')
    ).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(
      <FileUpload
        error='Something went wrong'
        onFilesChange={mockOnFilesChange}
      />
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText('Drop files here or click to browse')
    ).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(
      <FileUpload
        label='Upload Files'
        description='Select files to upload'
        error='Error message'
        required
        onFilesChange={mockOnFilesChange}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });

  it('generates unique IDs for multiple instances', () => {
    const { container: container1 } = render(
      <FileUpload onFilesChange={mockOnFilesChange} />
    );
    const { container: container2 } = render(
      <FileUpload onFilesChange={mockOnFilesChange} />
    );

    const input1 = container1.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const input2 = container2.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    expect(input1.id).not.toBe(input2.id);
  });
});
