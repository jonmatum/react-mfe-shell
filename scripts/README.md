# Code Analysis Scripts - Quick Reference

## 🚀 Quick Commands

```bash
# Basic analysis
npm run analyze

# Detailed breakdown
npm run analyze:detailed

# Complexity focus
npm run analyze:complexity

# Export JSON data
npm run analyze:json > stats.json
```

## 📊 What Each Metric Means

| Metric | Good Range | What It Tells You |
|--------|------------|-------------------|
| **Comment Ratio** | 10-20% | How well documented your code is |
| **Blank Line Ratio** | 15-25% | Code readability and formatting |
| **Complexity per Line** | < 0.1 | How complex/maintainable your code is |
| **Average Lines per File** | < 300 | File organization quality |

## 🎯 Quality Indicators

### 🟢 Excellent Code
- Comment ratio: 10-20%
- Complexity per line: < 0.1
- Average file size: < 100 lines
- Good language distribution

### 🟡 Good Code
- Comment ratio: 5-10% or 20-30%
- Complexity per line: 0.1-0.2
- Average file size: 100-300 lines
- Reasonable organization

### 🔴 Needs Attention
- Comment ratio: < 5%
- Complexity per line: > 0.2
- Average file size: > 300 lines
- Poor organization

## 🛠️ Script Options

| Option | Description | Example |
|--------|-------------|---------|
| `--detailed` | File-by-file breakdown | `npm run analyze:detailed` |
| `--complexity` | Focus on complex code | `npm run analyze:complexity` |
| `--json` | Export raw data | `npm run analyze:json` |
| `--help` | Show help message | `node scripts/code-analysis.js --help` |

## 📈 Understanding Your Project

### Project Size Categories
- **Small** (< 1K lines): Easy to maintain
- **Medium** (1K-10K lines): Well manageable  
- **Large** (10K-100K lines): Needs good organization
- **Very Large** (> 100K lines): Consider modularization

### Language Distribution Insights
- **High documentation** (lots of Markdown): Good project health
- **Balanced code/tests**: Good testing practices
- **Too much configuration**: Might be over-engineered

## 🔧 Customization

Edit the scripts to:
- Change quality thresholds
- Exclude specific directories
- Focus on certain languages
- Add custom metrics

## 📝 Example Interpretation

```
Comment Ratio: 3.3% (Low - Add more documentation)
Complexity per Line: 0.03 (Excellent - Very maintainable)
Size: Medium (4827 lines - Well manageable)
```

**Translation**: Your code is very well-structured and maintainable, but needs more comments and documentation for better team collaboration.

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| "scc not found" | `brew install scc` (macOS) |
| Permission denied | `chmod +x scripts/*.sh` |
| Node.js errors | Update to Node.js 14+ |

## 📚 More Info

See [docs/CODE_ANALYSIS.md](../docs/CODE_ANALYSIS.md) for complete documentation.
