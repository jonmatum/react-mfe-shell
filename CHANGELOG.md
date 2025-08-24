# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [6.0.3](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v6.0.2...react-mfe-shell-v6.0.3) (2025-08-24)


### Bug Fixes

* correct release-please output key format for npm publishing ([dd79caf](https://github.com/jonmatum/react-mfe-shell/commit/dd79caff8a27c1d2cd4cdf94fc49d837464f158b))

## [6.0.2](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v6.0.1...react-mfe-shell-v6.0.2) (2025-08-24)


### Bug Fixes

* resolve npm publishing workflow conditions ([fc90d69](https://github.com/jonmatum/react-mfe-shell/commit/fc90d6925ad27c44bbd2bb27f088288653530d31))

## [6.0.1](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v6.0.0...react-mfe-shell-v6.0.1) (2025-08-24)


### Documentation

* add npm package link to README for better discoverability ([98863f4](https://github.com/jonmatum/react-mfe-shell/commit/98863f436a2a85e123f4e00a32d1a0cd2c82e0a8))
* add version verification comment to trigger fresh deployment ([e29368e](https://github.com/jonmatum/react-mfe-shell/commit/e29368e63eee38c27942db931d765b7e6eccd32d))

## [6.0.0](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v5.0.0...react-mfe-shell-v6.0.0) (2025-08-24)


### ⚠ BREAKING CHANGES

* Button and Badge components now use semantic variants instead of basic color props

### Features

* add modern favicon system matching application design ([400fbab](https://github.com/jonmatum/react-mfe-shell/commit/400fbab68180af22ffd279003ade65a73d30eda3))
* enhance design system with semantic variants and dynamic version management ([9294f93](https://github.com/jonmatum/react-mfe-shell/commit/9294f93e340ca75a4ebc00e342560c1517c6d844))


### Bug Fixes

* eliminate all remaining ESLint warnings ([927dff8](https://github.com/jonmatum/react-mfe-shell/commit/927dff87930710b05a1e8de7cba09f2c731353ae))
* resolve ESLint errors and improve type safety ([b7a9ded](https://github.com/jonmatum/react-mfe-shell/commit/b7a9dedc27f5da240faba40494b8dcc8a9d3c0a6))
* resolve release-please configuration issues ([3776f87](https://github.com/jonmatum/react-mfe-shell/commit/3776f87c6eff05629d55a0dfa33b1269565567a7))
* resolve TypeScript build errors in Button component ([6e5a8f7](https://github.com/jonmatum/react-mfe-shell/commit/6e5a8f7aa8987943f9336a100dbb8f83464f0d13))


### Styles

* improve type annotation formatting in Button component ([0e3ed1c](https://github.com/jonmatum/react-mfe-shell/commit/0e3ed1cdc53fa6620efa9ff1359ab2fa1c3cd43f))

## [5.0.0](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v4.0.0...react-mfe-shell-v5.0.0) (2025-08-24)


### ⚠ BREAKING CHANGES

* Demo now has separate versioning from main library
* Documentation file names have changed to follow kebab-case convention

### Features

* add personal signature to footer and documentation ([6f09878](https://github.com/jonmatum/react-mfe-shell/commit/6f09878f49375b1c3e5c80ae019afe27b6d35deb))
* display package version in demo app ([4e574d9](https://github.com/jonmatum/react-mfe-shell/commit/4e574d91937ce36bcc30e0d58c70874858f93452))
* implement multi-package versioning with release-please ([8d1445c](https://github.com/jonmatum/react-mfe-shell/commit/8d1445c89998c4a2ac17b8b6403ee5602047f2dc))


### Bug Fixes

* **ci:** resolve npm optional dependencies issue in workflows ([5d48b93](https://github.com/jonmatum/react-mfe-shell/commit/5d48b9392fa64558b07c812a7e7c3fc8fb6ae3eb))
* **ci:** resolve SWC native binding issues in GitHub Actions ([b569391](https://github.com/jonmatum/react-mfe-shell/commit/b56939153fbc6081a9ada52ac0ab2ec3dadfa6d6))


### Documentation

* add GitHub Pages setup instructions ([ee8dd66](https://github.com/jonmatum/react-mfe-shell/commit/ee8dd66077a967f8b96bebb14a2b2669e6ed5dff))
* add personal signature to all documentation files ([7c298bf](https://github.com/jonmatum/react-mfe-shell/commit/7c298bfb005c8c0d76066036b04c82435356fd1b))
* add troubleshooting info for npm optional dependencies issue ([b323291](https://github.com/jonmatum/react-mfe-shell/commit/b3232915c8bfbd5954ad77b2476ff2f6e2407292))
* add troubleshooting info for SWC and Jekyll issues ([f18783b](https://github.com/jonmatum/react-mfe-shell/commit/f18783bc0a07f2ff22a0029a79dcc63db3d8d5d1))
* complete personal signature rollout across all documentation ([521b889](https://github.com/jonmatum/react-mfe-shell/commit/521b8892bcc901948d7e4e37f710b076aab9193b))
* standardize documentation structure and remove irrelevant content ([5116b3e](https://github.com/jonmatum/react-mfe-shell/commit/5116b3ee0fa901de16d90de547406fd9fab6e774))
* update scripts README to reflect current project structure ([8f4ec6c](https://github.com/jonmatum/react-mfe-shell/commit/8f4ec6c6852c529b23c29c12f45da67cf4c887e7))


### Code Refactoring

* remove community message and all emojis from project ([1202bd1](https://github.com/jonmatum/react-mfe-shell/commit/1202bd18b6033885b31500558f99fc960b0695c1))


### Continuous Integration

* add GitHub Actions workflows for demo deployment ([c5c5644](https://github.com/jonmatum/react-mfe-shell/commit/c5c56440b412aa7064e69d8a2ab83b1691720e08))

## [4.0.0](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v3.0.0...react-mfe-shell-v4.0.0) (2025-08-23)


### ⚠ BREAKING CHANGES

* Token structure has been reorganized for better consistency and type safety

### Features

* establish comprehensive design token foundation ([3a81d0b](https://github.com/jonmatum/react-mfe-shell/commit/3a81d0b03f2ad9c9b4d4b90f216c9d69d427e4ea))

## [3.0.0](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v2.1.0...react-mfe-shell-v3.0.0) (2025-08-15)


### ⚠ BREAKING CHANGES

* Node.js 22 or higher is now required

### Bug Fixes

* **ci:** install scc tool for code analysis in workflows ([8e4799a](https://github.com/jonmatum/react-mfe-shell/commit/8e4799a0f33f4b49a6e239de532802a04d72f6ae))
* **ci:** resolve tsup/rollup native dependency issues in workflows ([b320997](https://github.com/jonmatum/react-mfe-shell/commit/b320997779f7e15dd9a0a19f9eb71cdc723f08a3))
* **ci:** use Go to install scc tool instead of binary download ([eff4996](https://github.com/jonmatum/react-mfe-shell/commit/eff4996c0471906a40f8d2849b8ae71c3a233bab))


### Build System

* upgrade to Node.js 22 LTS and fix CI workflows ([53d9664](https://github.com/jonmatum/react-mfe-shell/commit/53d9664c1d9857ab4fc1f86a01ea30dc021a16c7))

## [2.1.0](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v2.0.0...react-mfe-shell-v2.1.0) (2025-08-15)


### Features

* enable npm publishing and fix repository URLs ([7e975a4](https://github.com/jonmatum/react-mfe-shell/commit/7e975a44d1d4dffaa08122aa7d4cbf372d9811ef))


### Bug Fixes

* **ci:** use correct NODE_AUTH_TOKEN secret name for npm publishing ([13abdf9](https://github.com/jonmatum/react-mfe-shell/commit/13abdf94821b97378c30d4cbcfa4d8b778f2c1e3))

## [2.0.0](https://github.com/jonmatum/react-mfe-shell/compare/react-mfe-shell-v1.0.0...react-mfe-shell-v2.0.0) (2025-08-15)


### ⚠ BREAKING CHANGES

* Repository identity changed from template to production MFE shell

### Features

* add comprehensive code analysis system with scc integration ([b3fe166](https://github.com/jonmatum/react-mfe-shell/commit/b3fe166048f6c0bf2fb20bf736d47a0c5b016716))
* rebrand as React MFE Shell and add comprehensive GitHub configuration ([61108cb](https://github.com/jonmatum/react-mfe-shell/commit/61108cb3d568ccb0361ded4ca311b601d99e0098))


### Bug Fixes

* **ci:** add issues:write permission for release-please label creation ([a41e26f](https://github.com/jonmatum/react-mfe-shell/commit/a41e26fd41852c7a3e2fc4278ebf1740e05139d9))


### Code Refactoring

* remove emojis and add GitHub wiki sync functionality ([82f92c5](https://github.com/jonmatum/react-mfe-shell/commit/82f92c5aa2eeeca1dddf64615a3b81f202cd53ae))

## [1.0.0] - 2025-08-15

### Added

#### Core Template Features
- **Atomic Design Architecture**: Complete component structure with Atoms, Molecules, and Organisms
- **TypeScript Support**: Strict TypeScript configuration with comprehensive type definitions
- **Modern Build System**: tsup for library builds, Vite for development with React SWC
- **Testing Infrastructure**: Vitest with 90%+ coverage thresholds and Happy DOM environment
- **Quality Tooling**: ESLint, Prettier, and comprehensive linting rules

#### Components
- **Button Atom**: Configurable button with variants (primary, secondary, ghost) and sizes
- **LoadingSpinner Atom**: Animated loading indicator with customizable sizes and text
- **Switch Atom**: Toggle switch component for settings and preferences
- **Modal Molecule**: Accessible modal dialog with backdrop and keyboard support

#### Design System
- **Design Tokens**: Comprehensive token system with colors, typography, spacing, shadows
- **Theme Support**: Light, dark, and system theme modes with automatic detection
- **WCAG AA Compliance**: Color tokens and components designed for accessibility
- **Responsive Design**: Mobile-first approach with consistent breakpoints

#### State Management
- **Settings Context**: Global state management for theme and layout preferences
- **Local Storage**: Persistent settings with error handling and fallbacks
- **Theme Management**: Automatic system theme detection and switching

#### Developer Experience
- **Format Script**: Safe code formatting with Prettier and ESLint auto-fix
- **Pre-commit Hooks**: Comprehensive pre-commit configuration for code quality
- **Node Version**: .nvmrc file for consistent Node.js version (18+)
- **Markdown Linting**: Configuration for consistent documentation formatting

#### Build & Distribution
- **Library Exports**: Proper ESM and CJS builds with TypeScript declarations
- **Peer Dependencies**: Externalized React, React DOM, and Heroicons
- **Source Maps**: Generated for debugging in development and production
- **Bundle Analysis**: Built-in bundle analysis capabilities

#### Documentation
- **Comprehensive README**: Detailed usage instructions and examples
- **Example Application**: Complete example showing all components and features
- **API Documentation**: TypeScript interfaces and component props
- **Best Practices**: Guidelines for component development and usage

#### Template Optimizations
- **MIT License**: Template-friendly license for maximum adoption
- **Clean Structure**: Organized directory structure following atomic design
- **Production Ready**: 95%+ quality score patterns from proven MFE architecture
- **Extensible**: Easy to add new components and features

### Technical Specifications
- **React**: 18.0.0+
- **TypeScript**: 5.8.3
- **Vite**: 7.1.2
- **Tailwind CSS**: 3.4.0
- **Heroicons**: 2.0.0+
- **Node.js**: 18.0.0+
- **npm**: 9.0.0+

### Package Information
- **Name**: react-mfe-template
- **Version**: 1.0.0
- **License**: MIT
- **Repository**: https://github.com/jonmatum/react-mfe-template
- **Author**: Jonatan Mata

[1.0.0]: https://github.com/jonmatum/react-mfe-template/releases/tag/v1.0.0
