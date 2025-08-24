import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
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

// Helper function to create mock files
const createMockFile = (name: string, size: number, type: string): File => {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};

describe('FileUpload', () => {
  const mockOnFilesChange = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockCreateObjectURL.mockReturnValue('mock-url');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<FileUpload onFilesChange={mockOnFilesChange} />);

    expect(
      screen.getByText('Drop files here or click to browse')
    ).toBeInTheDocument();
    expect(document.querySelector('input[type="file"]')).toBeInTheDocument();
  });

  it('renders with label and description', () => {
    render(
      <FileUpload
        label='Upload files'
        description='Select files to upload'
        onFilesChange={mockOnFilesChange}
      />
    );

    expect(screen.getByText('Upload files')).toBeInTheDocument();
    expect(screen.getByText('Select files to upload')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(
      <FileUpload error='Upload failed' onFilesChange={mockOnFilesChange} />
    );

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Upload failed');
  });

  it('handles file selection via input', async () => {
    const user = userEvent.setup();
    render(<FileUpload onFilesChange={mockOnFilesChange} />);

    const file = createMockFile('test.txt', 1024, 'text/plain');
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, file);

    expect(mockOnFilesChange).toHaveBeenCalledWith([file]);
  });

  it('handles multiple file selection', async () => {
    const user = userEvent.setup();
    render(<FileUpload multiple onFilesChange={mockOnFilesChange} />);

    const files = [
      createMockFile('test1.txt', 1024, 'text/plain'),
      createMockFile('test2.txt', 2048, 'text/plain'),
    ];
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, files);

    expect(mockOnFilesChange).toHaveBeenCalledWith(files);
  });

  it('validates file size', async () => {
    const user = userEvent.setup();
    render(
      <FileUpload
        maxSize={1024}
        onFilesChange={mockOnFilesChange}
        onError={mockOnError}
      />
    );

    const file = createMockFile('large.txt', 2048, 'text/plain');
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, file);

    expect(mockOnError).toHaveBeenCalledWith(
      expect.stringContaining('large.txt is too large')
    );
    expect(mockOnFilesChange).not.toHaveBeenCalled();
  });

  it('validates file type', async () => {
    const mockOnError = vi.fn();
    const mockOnFilesChange = vi.fn();

    render(
      <FileUpload
        accept='image/*'
        dragAndDrop
        onFilesChange={mockOnFilesChange}
        onError={mockOnError}
      />
    );

    const dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('div');
    const file = createMockFile('document.txt', 1024, 'text/plain');

    // Mock DataTransfer for drag and drop
    const dataTransfer = {
      files: [file],
    };

    // Simulate drag and drop (which bypasses native accept validation)
    fireEvent.drop(dropZone!, { dataTransfer });

    expect(mockOnError).toHaveBeenCalledWith(
      expect.stringContaining('document.txt is not an accepted file type')
    );
    expect(mockOnFilesChange).not.toHaveBeenCalled();
  });

  it('validates maximum number of files', async () => {
    const user = userEvent.setup();
    render(
      <FileUpload
        multiple
        maxFiles={2}
        onFilesChange={mockOnFilesChange}
        onError={mockOnError}
      />
    );

    const files = [
      createMockFile('test1.txt', 1024, 'text/plain'),
      createMockFile('test2.txt', 1024, 'text/plain'),
      createMockFile('test3.txt', 1024, 'text/plain'),
    ];
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, files);

    expect(mockOnError).toHaveBeenCalledWith('Maximum 2 files allowed');
    expect(mockOnFilesChange).not.toHaveBeenCalled();
  });

  it('handles drag and drop', async () => {
    render(<FileUpload dragAndDrop onFilesChange={mockOnFilesChange} />);

    const dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('div');
    const file = createMockFile('dropped.txt', 1024, 'text/plain');

    // Mock DataTransfer
    const dataTransfer = {
      files: [file],
    };

    fireEvent.dragOver(dropZone!, { dataTransfer });
    fireEvent.drop(dropZone!, { dataTransfer });

    expect(mockOnFilesChange).toHaveBeenCalledWith([file]);
  });

  it('shows drag over state', () => {
    render(<FileUpload dragAndDrop onFilesChange={mockOnFilesChange} />);

    const dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('.border-dashed');

    fireEvent.dragOver(dropZone!);

    expect(dropZone).toHaveClass('border-primary-500', 'bg-primary-50');
  });

  it('removes drag over state on drag leave', () => {
    render(<FileUpload dragAndDrop onFilesChange={mockOnFilesChange} />);

    const dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('div');

    fireEvent.dragOver(dropZone!);
    fireEvent.dragLeave(dropZone!);

    expect(dropZone).not.toHaveClass('border-primary-500', 'bg-primary-50');
  });

  it('displays selected files', async () => {
    const user = userEvent.setup();
    render(<FileUpload onFilesChange={mockOnFilesChange} />);

    const file = createMockFile('test.txt', 1024, 'text/plain');
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, file);

    expect(screen.getByText('Selected Files (1)')).toBeInTheDocument();
    expect(screen.getByText('test.txt')).toBeInTheDocument();
    expect(screen.getByText('1 KB')).toBeInTheDocument();
  });

  it('removes files when remove button is clicked', async () => {
    const user = userEvent.setup();
    render(<FileUpload onFilesChange={mockOnFilesChange} />);

    const file = createMockFile('test.txt', 1024, 'text/plain');
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, file);

    const removeButton = screen.getByLabelText('Remove test.txt');
    await user.click(removeButton);

    expect(mockOnFilesChange).toHaveBeenLastCalledWith([]);
    expect(screen.queryByText('Selected Files')).not.toBeInTheDocument();
  });

  it('shows image preview when preview is enabled', async () => {
    const user = userEvent.setup();
    render(<FileUpload preview onFilesChange={mockOnFilesChange} />);

    const file = createMockFile('image.jpg', 1024, 'image/jpeg');
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, file);

    const preview = screen.getByAltText('image.jpg');
    expect(preview).toBeInTheDocument();
    expect(preview).toHaveAttribute('src', 'mock-url');
    expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
  });

  it('shows document icon for non-image files', async () => {
    const user = userEvent.setup();
    render(<FileUpload onFilesChange={mockOnFilesChange} />);

    const file = createMockFile('document.pdf', 1024, 'application/pdf');
    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    await user.upload(input, file);

    // Document icon should be present (we can't easily test the specific icon, but we can test the structure)
    expect(screen.getByText('document.pdf')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<FileUpload disabled onFilesChange={mockOnFilesChange} />);

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('.border-dashed');

    expect(input).toBeDisabled();
    expect(dropZone).toHaveClass('opacity-50', 'cursor-not-allowed');
  });

  it('does not handle drag events when disabled', () => {
    render(
      <FileUpload disabled dragAndDrop onFilesChange={mockOnFilesChange} />
    );

    const dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('div');
    const file = createMockFile('test.txt', 1024, 'text/plain');

    const dataTransfer = { files: [file] };

    fireEvent.dragOver(dropZone!, { dataTransfer });
    fireEvent.drop(dropZone!, { dataTransfer });

    expect(mockOnFilesChange).not.toHaveBeenCalled();
    expect(dropZone).not.toHaveClass('border-primary-500');
  });

  it('opens file picker when clicked', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();

    // Mock the input click method
    const originalCreateElement = document.createElement;
    document.createElement = vi.fn().mockImplementation(tagName => {
      const element = originalCreateElement.call(document, tagName);
      if (tagName === 'input') {
        element.click = mockClick;
      }
      return element;
    });

    render(<FileUpload onFilesChange={mockOnFilesChange} />);

    const dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('div');
    await user.click(dropZone!);

    // Restore original createElement
    document.createElement = originalCreateElement;
  });

  it('formats file sizes correctly', async () => {
    const user = userEvent.setup();
    render(<FileUpload multiple onFilesChange={mockOnFilesChange} />);

    const files = [
      createMockFile('small.txt', 512, 'text/plain'),
      createMockFile('medium.txt', 1536, 'text/plain'), // 1.5 KB
      createMockFile('large.txt', 1048576, 'text/plain'), // 1 MB
    ];

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    for (const file of files) {
      await user.upload(input, file);
    }

    expect(screen.getByText('512 Bytes')).toBeInTheDocument();
    expect(screen.getByText('1.5 KB')).toBeInTheDocument();
    expect(screen.getByText('1 MB')).toBeInTheDocument();
  });

  it('handles different size variants', () => {
    const { rerender } = render(
      <FileUpload size='sm' onFilesChange={mockOnFilesChange} />
    );

    let dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('.border-dashed');
    expect(dropZone).toHaveClass('p-4');

    rerender(<FileUpload size='md' onFilesChange={mockOnFilesChange} />);
    dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('.border-dashed');
    expect(dropZone).toHaveClass('p-6');

    rerender(<FileUpload size='lg' onFilesChange={mockOnFilesChange} />);
    dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('.border-dashed');
    expect(dropZone).toHaveClass('p-8');
  });

  it('shows accept formats in description', () => {
    render(
      <FileUpload
        accept='image/*,.pdf'
        maxSize={5 * 1024 * 1024}
        maxFiles={3}
        multiple
        onFilesChange={mockOnFilesChange}
      />
    );

    expect(
      screen.getByText(/Accepted formats: image\/\*,\.pdf/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Max size: 5 MB/)).toBeInTheDocument();
    expect(screen.getByText(/Max files: 3/)).toBeInTheDocument();
  });

  it('handles custom children', () => {
    render(
      <FileUpload onFilesChange={mockOnFilesChange}>
        <div>Custom upload area</div>
      </FileUpload>
    );

    expect(screen.getByText('Custom upload area')).toBeInTheDocument();
    expect(
      screen.queryByText('Drop files here or click to browse')
    ).not.toBeInTheDocument();
  });

  it('validates file extensions correctly', async () => {
    const mockOnError = vi.fn();
    const mockOnFilesChange = vi.fn();

    render(
      <FileUpload
        accept='.pdf,.doc'
        dragAndDrop
        onFilesChange={mockOnFilesChange}
        onError={mockOnError}
      />
    );

    const dropZone = screen
      .getByText('Drop files here or click to browse')
      .closest('div');

    // Test valid file first
    const validFile = createMockFile('document.pdf', 1024, 'application/pdf');
    fireEvent.drop(dropZone!, { dataTransfer: { files: [validFile] } });
    expect(mockOnFilesChange).toHaveBeenCalledWith([validFile]);

    // Reset mocks
    vi.clearAllMocks();

    // Test invalid file
    const invalidFile = createMockFile('image.jpg', 1024, 'image/jpeg');
    fireEvent.drop(dropZone!, { dataTransfer: { files: [invalidFile] } });
    expect(mockOnError).toHaveBeenCalledWith(
      expect.stringContaining('image.jpg is not an accepted file type')
    );
  });

  it('handles required attribute', () => {
    render(
      <FileUpload
        required
        label='Required upload'
        onFilesChange={mockOnFilesChange}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toHaveAttribute('aria-required', 'true');

    const label = screen.getByText('Required upload');
    expect(label.textContent).toContain('*'); // Required indicator
  });

  it('associates description and error with input', () => {
    render(
      <FileUpload
        id='test-upload'
        description='Upload description'
        error='Upload error'
        onFilesChange={mockOnFilesChange}
      />
    );

    const input = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    expect(input).toHaveAttribute(
      'aria-describedby',
      'test-upload-description test-upload-error'
    );
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
