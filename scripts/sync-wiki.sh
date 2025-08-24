#!/bin/bash

# Manual Wiki Sync Script
# Usage: ./scripts/sync-wiki.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/jonmatum/react-mfe-shell.wiki.git"
WIKI_DIR="temp-wiki"

echo -e "${BLUE}Syncing documentation to GitHub Wiki${NC}"

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}Error: Not in a git repository${NC}"
    exit 1
fi

# Get repository info
REPO_NAME=$(basename -s .git `git config --get remote.origin.url`)
REPO_OWNER=$(git config --get remote.origin.url | sed 's/.*[:/]\([^/]*\)\/[^/]*$/\1/')

echo -e "${YELLOW}Repository: ${REPO_OWNER}/${REPO_NAME}${NC}"

# Clone or update wiki repository
if [ -d "$WIKI_DIR" ]; then
    echo -e "${YELLOW}Updating existing wiki clone...${NC}"
    cd "$WIKI_DIR"
    git pull origin master || git pull origin main
    cd ..
else
    echo -e "${YELLOW}Cloning wiki repository...${NC}"
    git clone "${REPO_URL}" "$WIKI_DIR" || {
        echo -e "${RED}Failed to clone wiki. Make sure the wiki exists and you have access.${NC}"
        echo -e "${YELLOW}Create the wiki by visiting: https://github.com/${REPO_OWNER}/${REPO_NAME}/wiki${NC}"
        exit 1
    }
fi

echo -e "${YELLOW}Syncing documentation files...${NC}"

# Copy main README as Home page
cp README.md "$WIKI_DIR/Home.md"
echo -e "${GREEN}Synced README.md → Home.md${NC}"

# Copy documentation files with wiki-friendly names
declare -A doc_mapping=(
    ["docs/design-tokens.md"]="Design-Tokens.md"
    ["docs/implementation-guide.md"]="Implementation-Guide.md"
    ["docs/github-pages-setup.md"]="GitHub-Pages-Setup.md"
)

for source_file in "${!doc_mapping[@]}"; do
    target_file="${doc_mapping[$source_file]}"
    if [ -f "$source_file" ]; then
        cp "$source_file" "$WIKI_DIR/$target_file"
        echo -e "${GREEN}Synced $source_file → $target_file${NC}"
    else
        echo -e "${YELLOW}Warning: $source_file not found${NC}"
    fi
done

# Create Documentation Index
cat > "$WIKI_DIR/Documentation-Index.md" << EOF
# Documentation Index

Welcome to the React MFE Shell documentation! This wiki contains comprehensive guides and references for using and extending the design system.

## Main Documentation

- **[Home](Home)** - Project overview and quick start
- **[Implementation Guide](Implementation-Guide)** - Detailed implementation instructions
- **[Design Tokens](Design-Tokens)** - Comprehensive design token documentation
- **[GitHub Pages Setup](GitHub-Pages-Setup)** - Demo deployment guide

## Quick Links

### Getting Started
\`\`\`bash
# Install in your project
npm install @jonmatum/react-mfe-shell

# Or clone for development
git clone https://github.com/${REPO_OWNER}/${REPO_NAME}.git
cd ${REPO_NAME}
npm install
npm run dev
\`\`\`

### Design System Usage
\`\`\`tsx
import { 
  SettingsProvider, 
  Button, 
  Input, 
  Badge,
  tokens 
} from '@jonmatum/react-mfe-shell';

function App() {
  return (
    <SettingsProvider>
      <Button variant="primary">Hello World</Button>
    </SettingsProvider>
  );
}
\`\`\`

### Development Commands
\`\`\`bash
npm run dev              # Start development server
npm run build:lib        # Build library
npm run build:demo       # Build demo
npm run test:run         # Run tests
npm run lint             # Lint code
\`\`\`

## Live Demo

🚀 **[View Interactive Demo](https://jonmatum.github.io/react-mfe-shell/)**

## Additional Resources

- [GitHub Repository](https://github.com/${REPO_OWNER}/${REPO_NAME})
- [Issues & Bug Reports](https://github.com/${REPO_OWNER}/${REPO_NAME}/issues)
- [Contributing Guidelines](https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/CONTRIBUTING.md)
- [npm Package](https://www.npmjs.com/package/@jonmatum/react-mfe-shell)

---

*Last updated: $(date)*
*Synced from repository documentation*
EOF

echo -e "${GREEN}Created Documentation Index${NC}"

# Create sidebar navigation
cat > "$WIKI_DIR/_Sidebar.md" << EOF
## Documentation

**Getting Started**
- [Home](Home)
- [Implementation Guide](Implementation-Guide)

**Design System**
- [Design Tokens](Design-Tokens)
- [Live Demo](https://jonmatum.github.io/react-mfe-shell/)

**Deployment**
- [GitHub Pages Setup](GitHub-Pages-Setup)

**Reference**
- [Documentation Index](Documentation-Index)

---

**Quick Install**
\`\`\`bash
npm install @jonmatum/react-mfe-shell
\`\`\`
EOF

echo -e "${GREEN}Created Sidebar navigation${NC}"

# Commit and push changes
cd "$WIKI_DIR"

# Configure git if needed
git config user.name "$(git config --global user.name)" 2>/dev/null || git config user.name "Wiki Sync"
git config user.email "$(git config --global user.email)" 2>/dev/null || git config user.email "wiki-sync@local"

# Add all changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}No changes to commit${NC}"
else
    echo -e "${YELLOW}Committing and pushing changes...${NC}"
    git commit -m "docs: sync documentation from main repository

Updated: $(date -u +"%Y-%m-%d %H:%M:%S UTC")
Source commit: $(cd .. && git rev-parse --short HEAD)"
    
    git push origin master 2>/dev/null || git push origin main
    echo -e "${GREEN}Successfully pushed to wiki!${NC}"
fi

cd ..

# Cleanup
echo -e "${YELLOW}Cleaning up...${NC}"
rm -rf "$WIKI_DIR"

echo -e "${GREEN}Wiki sync completed successfully!${NC}"
echo -e "${BLUE}View your wiki at: https://github.com/${REPO_OWNER}/${REPO_NAME}/wiki${NC}"
