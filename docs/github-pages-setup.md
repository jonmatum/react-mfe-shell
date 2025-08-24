# GitHub Pages Setup Instructions

To enable automatic deployment of the demo app to GitHub Pages, follow these steps:

## 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/jonmatum/react-mfe-shell`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

## 2. Verify Deployment

Once GitHub Pages is enabled:

1. The workflow will automatically trigger on the next push to `main`
2. You can monitor the deployment in the **Actions** tab
3. The demo will be available at: `https://jonmatum.github.io/react-mfe-shell/`

## 3. Workflow Details

### Deploy Demo Workflow (`deploy-demo.yml`)
- **Triggers**: Push to `main` branch (when demo-related files change)
- **Manual trigger**: Available via workflow_dispatch
- **Steps**:
  1. Checkout code
  2. Setup Node.js 22
  3. Install dependencies
  4. Build library (`npm run build:lib`)
  5. Build demo (`npm run build:demo`)
  6. Deploy to GitHub Pages

### Test Demo Workflow (`test-demo.yml`)
- **Triggers**: Pull requests to `main` branch
- **Purpose**: Test that demo builds successfully before merging
- **Steps**:
  1. Run tests
  2. Build library
  3. Build demo
  4. Report build size

## 4. Troubleshooting

### Common Issues

1. **Pages not enabled**: Make sure GitHub Pages is enabled in repository settings
2. **Workflow permissions**: The workflow has the necessary permissions to deploy to Pages
3. **Build failures**: Check the Actions tab for detailed error logs
4. **Jekyll warning**: Can be safely ignored when using GitHub Actions deployment
5. **Native binding errors**: The workflows include fixes for SWC and Rollup native bindings

### Known Issues and Fixes

#### Jekyll Warning (Safe to Ignore)
If you see a warning like:
```
Actions is currently unavailable for your repository, and your Pages site requires a Jekyll build step
```

This warning can be **safely ignored** because:
- We're using GitHub Actions for deployment, not Jekyll
- The workflow will deploy successfully despite this warning
- GitHub Pages will work correctly with our custom deployment process

#### SWC Native Binding Error
If you see an error like:
```
Error: Failed to load native binding
```

This is caused by cached or incorrect native bindings for SWC. The workflows include a fix:
- Clean install dependencies to avoid cached bindings
- Explicitly reinstall `@swc/core` and `@swc/helpers`
- Remove `package-lock.json` for fresh dependency resolution

#### Rollup Optional Dependencies Error
If you see an error like:
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
```

This is a known npm bug with optional dependencies. The workflows include a fix:
- Remove npm cache to avoid stale dependencies
- Explicitly install the required rollup binary
- Use `--prefer-offline` and `--no-audit` flags

#### Build Failures
Common causes and solutions:
- **TypeScript errors**: Fix type issues in the source code
- **Missing dependencies**: Ensure all dependencies are in package.json
- **Build script issues**: Verify build scripts work locally first
- **Native binding issues**: Clean install usually resolves platform-specific problems

### Checking Deployment Status

1. Go to **Actions** tab in your repository
2. Look for "Deploy Demo App" workflow runs
3. Click on a run to see detailed logs
4. The deployment URL will be shown in the deploy job

## 5. Custom Domain (Optional)

If you want to use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings for your domain
3. Update the base URL in `vite.config.ts` if needed

## 6. Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab
2. Select "Deploy Demo App" workflow
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow"

The demo will be automatically updated whenever you push changes to the main branch that affect the demo or source code.
