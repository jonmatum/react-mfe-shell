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
    ["docs/CODE_ANALYSIS.md"]="Code-Analysis.md"
    ["docs/IMPLEMENTATION_GUIDE.md"]="Implementation-Guide.md"
    ["docs/TEMPLATE_USAGE.md"]="Template-Usage.md"
    ["docs/QUICK_START_EXAMPLE.md"]="Quick-Start-Example.md"
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

Welcome to the React MFE Shell documentation! This wiki contains comprehensive guides and references for using and extending the shell.

## Main Documentation

- **[Home](Home)** - Project overview and quick start
- **[Template Usage](Template-Usage)** - How to use this template
- **[Implementation Guide](Implementation-Guide)** - Detailed implementation instructions
- **[Quick Start Example](Quick-Start-Example)** - Get started quickly

## Tools & Analysis

- **[Code Analysis](Code-Analysis)** - Comprehensive code quality analysis tools

## Quick Links

### Getting Started
\`\`\`bash
# Clone and setup
git clone https://github.com/${REPO_OWNER}/${REPO_NAME}.git my-project
cd my-project
npm install
npm run dev
\`\`\`

### Code Analysis
\`\`\`bash
# Analyze your code
npm run analyze
npm run analyze:detailed
npm run analyze:complexity
\`\`\`

### Development Commands
\`\`\`bash
npm run dev              # Start development
npm run build           # Build for production
npm run test            # Run tests
npm run lint            # Lint code
\`\`\`

## Additional Resources

- [GitHub Repository](https://github.com/${REPO_OWNER}/${REPO_NAME})
- [Issues & Bug Reports](https://github.com/${REPO_OWNER}/${REPO_NAME}/issues)
- [Contributing Guidelines](https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/CONTRIBUTING.md)

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
- [Template Usage](Template-Usage)
- [Quick Start](Quick-Start-Example)

**Implementation**
- [Implementation Guide](Implementation-Guide)
- [Code Analysis](Code-Analysis)

**Reference**
- [Documentation Index](Documentation-Index)

---

**Quick Commands**
\`\`\`bash
npm run analyze
npm run dev
npm run build
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
