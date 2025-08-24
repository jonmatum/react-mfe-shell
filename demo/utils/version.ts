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
