# Dynamic Version Management

## Overview

The demo application now uses dynamic version management to automatically pull version information from the actual package.json file, eliminating hardcoded versions and ensuring consistency across all displays.

## Implementation

### Version Utility (`demo/utils/version.ts`)

```typescript
// Version utility to get package version dynamically
import packageJson from '../../package.json';

export const getVersion = () => packageJson.version;
export const getPackageName = () => packageJson.name;
export const getDescription = () => packageJson.description;

// Get dependency versions
export const getReactVersion = () => {
  const reactVersion = packageJson.devDependencies?.react || packageJson.peerDependencies?.react;
  if (reactVersion) {
    // Extract major version (e.g., "^18.3.1" -> "18")
    const match = reactVersion.match(/(\d+)/);
    return match ? `React ${match[1]}` : 'React';
  }
  return 'React';
};

// Export for convenience
export const VERSION = packageJson.version;
export const PACKAGE_NAME = packageJson.name;
export const DESCRIPTION = packageJson.description;
export const REACT_VERSION = getReactVersion();
```

### Usage in Components

#### Demo Header
```typescript
import { VERSION } from './utils/version';

function DemoHeader() {
  return (
    <div>
      <h1>React MFE Shell</h1>
      <p>v{VERSION} - DRY Optimized</p>
    </div>
  );
}
```

#### Demo Footer
```typescript
import { VERSION, REACT_VERSION } from './utils/version';

function DemoFooter() {
  return (
    <div>
      <p>Built with care using React MFE Shell v{VERSION}</p>
      <Badge>{REACT_VERSION}</Badge>
    </div>
  );
}
```

#### CLI Output
```typescript
import { VERSION } from '../utils/version';

const cliOutput = `Design System CLI v${VERSION}
Analyzing DRY Score...`;
```

## Benefits

### 1. **Automatic Synchronization**
- Version displays automatically update when package.json is updated
- No manual updates required across multiple files
- Eliminates version drift between actual and displayed versions

### 2. **Single Source of Truth**
- All version information comes from package.json
- Consistent versioning across the entire application
- Reduces maintenance overhead

### 3. **Build-Time Resolution**
- Versions are resolved at build time for optimal performance
- No runtime overhead for version lookups
- Static analysis friendly

### 4. **Dependency Tracking**
- Automatically extracts React version from dependencies
- Can be extended to track other dependency versions
- Maintains accuracy as dependencies are updated

## Files Updated

### Core Implementation
- `demo/utils/version.ts` - Version utility functions
- `demo/App.tsx` - Main demo app with dynamic versions
- `demo/components/UtilityShowcase.tsx` - CLI output with dynamic versions

### Documentation
- `demo/README.md` - Removed hardcoded version references
- Updated all version-specific content to be version-agnostic

## Version Display Locations

### 1. **Header Section**
- Package version with "DRY Optimized" label
- Format: `v{VERSION} - DRY Optimized`

### 2. **Footer Section**
- Full package name and version
- React version badge
- Format: `Built with care using React MFE Shell v{VERSION}`

### 3. **Hero Section**
- React version in description text
- Format: `Built with {REACT_VERSION}, TypeScript, and modern tooling`

### 4. **CLI Output**
- Design System CLI version in command outputs
- Format: `Design System CLI v{VERSION}`

### 5. **Component Badges**
- Technology stack badges with dynamic versions
- React version automatically extracted from dependencies

## Maintenance

### Adding New Version Displays
1. Import the required version constants from `demo/utils/version.ts`
2. Use the constants in your component
3. No additional configuration required

### Extending Version Tracking
To track additional dependency versions:

```typescript
// In demo/utils/version.ts
export const getTypeScriptVersion = () => {
  const tsVersion = packageJson.devDependencies?.typescript;
  if (tsVersion) {
    const match = tsVersion.match(/(\d+\.\d+)/);
    return match ? `TypeScript ${match[1]}` : 'TypeScript';
  }
  return 'TypeScript';
};
```

### Version Format Customization
The utility functions can be extended to support different version formats:

```typescript
export const getShortVersion = () => {
  const version = packageJson.version;
  const [major, minor] = version.split('.');
  return `${major}.${minor}`;
};

export const getFullVersionString = () => {
  return `${packageJson.name}@${packageJson.version}`;
};
```

## Testing

### Build Verification
```bash
npm run build:demo
# Verifies that dynamic versions resolve correctly at build time
```

### Development Testing
```bash
npm run dev:demo
# Confirms dynamic versions display correctly in development
```

### Version Consistency Check
```bash
# Check for any remaining hardcoded versions
grep -r "v5.0.0\|5.0.0\|React 18" demo/ --exclude-dir=node_modules --exclude="*.md"
# Should return no results
```

## Best Practices

### 1. **Always Use Dynamic Versions**
- Never hardcode version numbers in demo components
- Import from the version utility instead
- Update documentation to be version-agnostic

### 2. **Consistent Formatting**
- Use consistent version display formats across the application
- Define format constants in the version utility if needed
- Maintain professional presentation standards

### 3. **Performance Considerations**
- Version resolution happens at build time, not runtime
- No performance impact on the running application
- Bundle size impact is negligible

### 4. **Error Handling**
- Version utility includes fallbacks for missing dependencies
- Graceful degradation if package.json is unavailable
- Maintains functionality even with incomplete version data

## Future Enhancements

### 1. **Automated Version Badges**
- Generate technology stack badges automatically from dependencies
- Include version ranges and compatibility information
- Dynamic dependency health indicators

### 2. **Build Information**
- Include build timestamp and commit hash
- Environment-specific version displays
- Deployment tracking information

### 3. **Changelog Integration**
- Automatically link to changelog for current version
- Display recent changes in demo interface
- Version history navigation

---

**Implementation Status**: ✅ Complete  
**Last Updated**: 2025-08-24  
**Version Management**: Fully Dynamic  
**Maintenance Required**: None
