# Repository Setup Guide

This document explains how to set up and configure this React MFE Shell repository for optimal development and deployment.

## Initial Setup

### 1. Repository Settings

**General Settings**:
- Enable "Issues" for bug reports and feature requests
- Enable "Wiki" for documentation (auto-synced from docs/)
- Enable "Discussions" for community questions

**Branch Protection**:
- Protect `main` branch
- Require PR reviews before merging
- Require status checks to pass (CI workflow)
- Require branches to be up to date before merging

### 2. GitHub Pages Setup

**For Example Deployment**:
1. Go to Settings → Pages
2. Source: "GitHub Actions"
3. The example will be deployed automatically on releases

### 3. Secrets Configuration

**For npm Publishing** (optional):
```
NPM_TOKEN - Your npm authentication token
```

**For Enhanced Features** (optional):
```
CODECOV_TOKEN - For code coverage reporting
SONAR_TOKEN - For SonarCloud integration
```

## Workflow Configuration

### CI Workflow
- **Triggers**: Every push to main, all PRs
- **Actions**: Lint, test, build, code analysis
- **Artifacts**: Coverage reports, code analysis results

### Release Workflow
- **Triggers**: When Release-Please PR is merged
- **Actions**: Build, test, publish, deploy example
- **Artifacts**: Build files, code analysis, GitHub release

### Wiki Sync Workflow
- **Triggers**: Changes to docs/ or README.md
- **Actions**: Automatically sync documentation to GitHub Wiki

## Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-component

# Make changes with conventional commits
git commit -m "feat: add new Button variant"

# Push and create PR
git push origin feature/new-component
```

### 2. Code Quality Checks
```bash
# Run all quality checks locally
npm run lint
npm run type-check
npm run test
npm run analyze
```

### 3. Release Process
1. **Automatic**: Release-Please creates PR with version bump
2. **Manual**: Review and merge the Release PR
3. **Automatic**: Release workflow builds and deploys

## Repository Labels

Recommended labels for issues and PRs:

**Type Labels**:
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `question` - Further information is requested

**Priority Labels**:
- `priority: high` - High priority
- `priority: medium` - Medium priority
- `priority: low` - Low priority

**Status Labels**:
- `status: needs-review` - Needs review
- `status: in-progress` - Currently being worked on
- `status: blocked` - Blocked by external dependency

## Maintenance

### Regular Tasks
- Review and merge dependabot PRs
- Monitor CI workflow failures
- Update documentation as needed
- Review and respond to issues

### Monthly Tasks
- Review code analysis trends
- Update dependencies
- Review and update documentation
- Check GitHub Pages deployment

## Troubleshooting

### CI Failures
- Check Node.js version compatibility
- Verify all dependencies are properly installed
- Review test failures and fix issues

### Release Issues
- Ensure conventional commit format
- Check Release-Please configuration
- Verify branch protection rules

### Wiki Sync Issues
- Check workflow permissions
- Verify wiki is enabled
- Review sync-wiki.sh script logs

## Security

### Dependabot Configuration
- Automatic security updates enabled
- Weekly dependency updates
- Automatic PR creation for updates

### Code Scanning
- GitHub Advanced Security (if available)
- Dependency vulnerability scanning
- Secret scanning enabled

## Performance Monitoring

### Code Analysis
- Automatic code quality analysis on every build
- Complexity tracking over time
- Coverage reporting

### Bundle Analysis
- Build size monitoring
- Performance regression detection
- Optimization recommendations
