# Code Analysis Documentation

This project includes comprehensive code analysis tools built on top of `scc` (Sloc Cloc and Code) to provide detailed insights into your codebase quality, complexity, and structure.

## Quick Start

```bash
# Basic analysis
npm run analyze

# Detailed file-by-file breakdown
npm run analyze:detailed

# Focus on complexity analysis
npm run analyze:complexity

# Export data as JSON
npm run analyze:json > code-stats.json
```

## Available Scripts

### npm Scripts

| Command | Description |
|---------|-------------|
| `npm run analyze` | Basic code analysis with quality metrics |
| `npm run analyze:detailed` | Detailed breakdown by files |
| `npm run analyze:complexity` | Focus on code complexity analysis |
| `npm run analyze:json` | Export raw data in JSON format |
| `npm run analyze:bash` | Use bash version (Unix/Linux/macOS only) |

### Direct Script Usage

```bash
# Node.js version (cross-platform)
node scripts/code-analysis.js [options]

# Bash version (Unix/Linux/macOS)
./scripts/code-analysis.sh [options]
```

## Understanding the Output

### Basic Statistics Table

```
Language                 Files     Lines   Blanks  Comments     Code Complexity
TypeScript                  22      2222      343        77     1802         81
```

- **Files**: Number of files of this language type
- **Lines**: Total lines including code, comments, and blanks
- **Blanks**: Empty lines (for readability)
- **Comments**: Lines containing comments or documentation
- **Code**: Actual executable code lines
- **Complexity**: Cyclomatic complexity score

### Quality Metrics

The script calculates several important quality indicators:

#### Comment Ratio
- **Formula**: `(Comments / Code) × 100`
- **Industry Standard**: 10-20%
- **Interpretation**:
  - < 10%: Low documentation, consider adding more comments
  - 10-20%: Good documentation level
  - > 20%: High documentation, check for over-commenting

#### Blank Line Ratio
- **Formula**: `(Blanks / Total Lines) × 100`
- **Good Range**: 15-25%
- **Purpose**: Indicates code readability and formatting

#### Complexity per Line
- **Formula**: `Total Complexity / Code Lines`
- **Interpretation**:
  - < 0.1: Very maintainable code
  - 0.1-0.2: Reasonably maintainable
  - > 0.2: Consider refactoring complex functions

### Language Distribution

Shows the percentage breakdown of your codebase by programming language:

```
Language Distribution:
  TypeScript: 39.2% (1802 lines)
  Markdown: 42.8% (1969 lines)
  JSON: 4.2% (195 lines)
```

### Project Size Assessment

Categorizes your project size and provides organizational insights:

- **Small** (< 1,000 lines): Easy to maintain
- **Medium** (1,000-10,000 lines): Well manageable
- **Large** (10,000-100,000 lines): Requires good organization
- **Very Large** (> 100,000 lines): Consider modularization

## Advanced Usage

### Complexity Analysis

Use `--complexity` flag to identify the most complex parts of your codebase:

```bash
npm run analyze:complexity
```

This shows:
- Most complex files (sorted by complexity score)
- Complexity breakdown by language
- Files that might need refactoring

### Detailed File Analysis

Use `--detailed` flag for file-by-file breakdown:

```bash
npm run analyze:detailed
```

This provides:
- Largest files by code lines
- Files with most comments
- Individual file statistics

### JSON Export

Export raw data for further analysis or integration with other tools:

```bash
npm run analyze:json > analysis-$(date +%Y%m%d).json
```

## Integration with CI/CD

### GitHub Actions Example

```yaml
name: Code Analysis
on: [push, pull_request]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - name: Install scc
        run: |
          curl -L https://github.com/boyter/scc/releases/latest/download/scc-linux-amd64.tar.gz | tar xz
          sudo mv scc /usr/local/bin/
      - name: Run Code Analysis
        run: npm run analyze:json > code-analysis.json
      - name: Upload Analysis Results
        uses: actions/upload-artifact@v3
        with:
          name: code-analysis
          path: code-analysis.json
```

### Quality Gates

You can create quality gates based on the metrics:

```bash
# Example: Fail if comment ratio is too low
COMMENT_RATIO=$(npm run analyze:json | jq '.Total.Comments / .Total.Code * 100')
if (( $(echo "$COMMENT_RATIO < 5" | bc -l) )); then
  echo "Error: Comment ratio too low: $COMMENT_RATIO%"
  exit 1
fi
```

## Customization

### Excluding Directories

Modify the scripts to exclude specific directories:

```bash
# In the script, add --exclude-dir flag
scc --exclude-dir node_modules,dist,coverage
```

### Including Specific Languages

Focus on specific programming languages:

```bash
# Only analyze TypeScript and JavaScript
scc --include-lang TypeScript,JavaScript
```

### Custom Thresholds

Modify the quality assessment thresholds in the scripts:

```javascript
// In code-analysis.js, modify these values:
const COMMENT_RATIO_LOW = 10;    // Default: 10%
const COMMENT_RATIO_HIGH = 20;   // Default: 20%
const COMPLEXITY_LOW = 0.1;      // Default: 0.1
const COMPLEXITY_HIGH = 0.2;     // Default: 0.2
```

## Troubleshooting

### scc Not Found

If you get "scc not found" error:

```bash
# macOS with Homebrew
brew install scc

# Linux/macOS with Go
go install github.com/boyter/scc/v3@latest

# Windows with Chocolatey
choco install scc

# Or download binary from GitHub releases
# https://github.com/boyter/scc/releases
```

### Permission Denied

If you get permission errors on Unix systems:

```bash
chmod +x scripts/code-analysis.sh
chmod +x scripts/code-analysis.js
```

### Node.js Version Issues

The Node.js script requires ES modules support (Node.js 14+):

```bash
# Check Node.js version
node --version

# Update if needed
nvm install node  # or use your preferred method
```

## Best Practices

### Regular Analysis

Run code analysis regularly to track code quality trends:

```bash
# Weekly analysis with timestamp
npm run analyze:json > "analysis-$(date +%Y%m%d).json"
```

### Team Standards

Establish team standards based on the metrics:

- **Minimum comment ratio**: 10%
- **Maximum complexity per line**: 0.15
- **Maximum file size**: 300 lines
- **Target blank line ratio**: 15-25%

### Monitoring Trends

Track metrics over time to identify:
- Code quality improvements or degradation
- Growing complexity that needs attention
- Documentation gaps
- File size growth

## Example Output Interpretation

```
Code Analysis Report for: react-mfe-shell
Generated on: 8/15/2025, 12:27:29 PM

Quality Metrics
Comment Ratio: 3.3% (Industry standard: 10-20%)
Blank Line Ratio: 16.3% (Good readability: 15-25%)
Complexity per Line: 0.03 (Lower is better)

Quality Assessment:
  Comments: Low - Consider adding more documentation
  Complexity: Low - Very maintainable code

Project Insights
Project Size Assessment:
  Size: Medium (4597 lines) - Well manageable
  Average lines per file: 104
  File organization: Good - Reasonable file sizes

Recommendations
  • Add more inline comments and documentation
  • Run with --detailed for file-by-file analysis
  • Run with --complexity to identify complex code areas
```

**Interpretation**: This project has excellent complexity management and file organization, but needs more documentation. The low comment ratio (3.3%) suggests adding more inline comments and documentation would improve maintainability.

## Related Tools

- **scc**: The underlying tool for code counting
- **cloc**: Alternative code counter
- **tokei**: Rust-based code counter
- **SonarQube**: Comprehensive code quality platform
- **CodeClimate**: Code quality and maintainability analysis
