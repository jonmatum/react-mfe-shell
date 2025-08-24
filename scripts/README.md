# Scripts Directory

This directory contains utility scripts for the React MFE Shell project.

## Available Scripts

### Wiki Sync Script

**File**: `sync-wiki.sh`

Manually sync documentation to GitHub Wiki.

```bash
# Run the wiki sync script
./scripts/sync-wiki.sh
```

**What it does**:
- Clones the GitHub Wiki repository
- Copies documentation files with proper naming
- Creates index and sidebar navigation
- Commits and pushes changes to wiki

**Requirements**:
- Git access to the wiki repository
- Proper git configuration (user.name and user.email)

### Node.js Setup Script

**File**: `setup-node.sh`

Sets up the correct Node.js version for the project.

```bash
# Run the setup script
./scripts/setup-node.sh
```

**What it does**:
- Checks for Node.js 22.x LTS
- Installs via nvm if available
- Provides installation instructions if needed

## Script Usage

### Making Scripts Executable

```bash
# Make all scripts executable
chmod +x scripts/*.sh

# Or make individual scripts executable
chmod +x scripts/sync-wiki.sh
chmod +x scripts/setup-node.sh
```

### Running Scripts

```bash
# From project root
./scripts/script-name.sh

# Or navigate to scripts directory
cd scripts
./script-name.sh
```

## Development Scripts (via npm)

These are defined in `package.json` and run via npm:

```bash
# Development
npm run dev              # Start development server
npm run dev:demo         # Start demo only

# Building
npm run build           # Build library for production
npm run build:lib       # Build library only
npm run build:demo      # Build demo only

# Quality Assurance
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:coverage   # Run tests with coverage
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript type checking

# Formatting
npm run format          # Format with Prettier
npm run format:check    # Check formatting
```

## Adding New Scripts

When adding new scripts:

1. **Create the script file** in the `scripts/` directory
2. **Make it executable**: `chmod +x scripts/new-script.sh`
3. **Add documentation** to this README
4. **Test the script** thoroughly
5. **Consider adding npm script** in `package.json` if appropriate

### Script Template

```bash
#!/bin/bash

# Script Name - Brief Description
# Usage: ./scripts/script-name.sh [options]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting script...${NC}"

# Your script logic here

echo -e "${GREEN}Script completed successfully!${NC}"
```

## Troubleshooting

### Common Issues

1. **Permission denied**: Run `chmod +x scripts/script-name.sh`
2. **Command not found**: Make sure you're in the project root
3. **Git errors**: Check your git configuration and repository access

### Getting Help

- Check script comments for usage instructions
- Run scripts with `-h` or `--help` if supported
- Review this README for general guidance
- Check the main project README for overall setup instructions
