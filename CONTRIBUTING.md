# Contributing to React MFE Shell

Thank you for your interest in contributing to the React MFE Shell! This document provides guidelines and information for contributors.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- Git

### Setup

1. **Fork the repository**
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/react-mfe-shell.git
   cd react-mfe-shell
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes

- Follow the existing code style
- Write tests for new functionality
- Update documentation as needed
- Use conventional commit messages

### 3. Test Your Changes

```bash
# Run all tests
npm run test

# Run linting
npm run lint

# Run type checking
npm run type-check

# Run code analysis
npm run analyze

# Build the library
npm run build
```

### 4. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Examples:
git commit -m "feat: add new Button variant"
git commit -m "fix: resolve Modal accessibility issue"
git commit -m "docs: update installation instructions"
git commit -m "refactor: improve component organization"
```

**Commit Types**:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Provide proper type definitions
- Avoid `any` types when possible
- Use interfaces for object shapes

### React Components

- Use functional components with hooks
- Follow atomic design principles (Atoms → Molecules → Organisms)
- Provide proper prop types and default values
- Include accessibility attributes (ARIA labels, etc.)

### Testing

- Write unit tests for all components
- Use React Testing Library for component tests
- Aim for 90%+ test coverage
- Test user interactions and edge cases

### Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update component documentation
- Include usage examples

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Basic building blocks
│   ├── molecules/      # Simple combinations
│   └── organisms/      # Complex combinations
├── contexts/           # React contexts
├── types/             # TypeScript definitions
├── utils/             # Utility functions
└── styles/            # CSS files
```

## Component Guidelines

### Creating New Components

1. **Choose the right level**: Atom, Molecule, or Organism
2. **Create the component file**: `ComponentName.tsx`
3. **Create the test file**: `ComponentName.test.tsx`
4. **Export from index**: Add to `src/index.ts`

### Component Template

```tsx
import React from 'react';
import { BaseComponentProps } from '../../types';
import { classNames } from '../../utils';

interface ComponentNameProps extends BaseComponentProps {
  // Add specific props here
}

const ComponentName: React.FC<ComponentNameProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={classNames(
        'base-classes',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default ComponentName;
```

### Test Template

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ComponentName from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName>Test content</ComponentName>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<ComponentName className="custom-class">Content</ComponentName>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });
});
```

## Pull Request Guidelines

### Before Submitting

- [ ] All tests pass locally
- [ ] Code follows style guidelines
- [ ] Documentation is updated
- [ ] Commit messages follow conventional format
- [ ] No console.log statements left in code
- [ ] Code analysis passes without issues

### PR Description

Use the provided PR template and include:

- Clear description of changes
- Related issue numbers
- Type of change (bug fix, feature, etc.)
- Testing instructions
- Screenshots (if applicable)

### Review Process

1. **Automated checks** must pass (CI workflow)
2. **Code review** by maintainers
3. **Testing** of the changes
4. **Approval** and merge

## Release Process

Releases are automated using Release-Please:

1. **Conventional commits** trigger version bumps
2. **Release PR** is created automatically
3. **Manual merge** of Release PR creates the release
4. **Automated deployment** to GitHub Pages

## Reporting Issues

### Bug Reports

Use the bug report template and include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Code samples (if applicable)

### Feature Requests

Use the feature request template and include:

- Problem description
- Proposed solution
- Alternative solutions considered
- Additional context

## Questions and Support

- **GitHub Discussions**: For general questions
- **GitHub Issues**: For bugs and feature requests
- **GitHub Wiki**: For documentation

## Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes (for significant contributions)
- Documentation acknowledgments

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Getting Help

If you need help with contributing:

1. Check existing documentation
2. Search existing issues
3. Create a discussion post
4. Reach out to maintainers

Thank you for contributing to the React MFE Shell!
