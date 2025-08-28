# Changelog

## [8.0.1](https://github.com/jonmatum/react-mfe-shell/compare/demo-v8.0.0...demo-v8.0.1) (2025-08-28)


### Bug Fixes

* improve modal scrolling, input styling, and form functionality ([3e7da4a](https://github.com/jonmatum/react-mfe-shell/commit/3e7da4ace98b201fbcdb8e1644aabd5f66b6ab69))

## [8.0.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v7.0.0...demo-v8.0.0) (2025-08-27)


### ⚠ BREAKING CHANGES

* Modal component now uses HeadlessUI for better accessibility. Legacy props are still supported but compound components are recommended.

### Features

* add fullscreen modal support with improved accessibility ([ae89d9a](https://github.com/jonmatum/react-mfe-shell/commit/ae89d9a928391efe15ad355bc0a8846159bc78df))


### Bug Fixes

* resolve all TypeScript lint warnings ([ae89d9a](https://github.com/jonmatum/react-mfe-shell/commit/ae89d9a928391efe15ad355bc0a8846159bc78df))

## [7.0.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v6.0.0...demo-v7.0.0) (2025-08-26)


### ⚠ BREAKING CHANGES

* preset import path changed from /preset to /preset (now .cjs extension)

### Bug Fixes

* resolve CSS import issues and update documentation ([82c029d](https://github.com/jonmatum/react-mfe-shell/commit/82c029d5d01a13a57cb1a43ff9905cb8809398d4))

## [6.0.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v5.2.0...demo-v6.0.0) (2025-08-26)


### ⚠ BREAKING CHANGES

* Typography components now use semantic colors by default
    - text-primary, text-secondary, text-tertiary replace text-text-* classes
    - Color prop is now the recommended way to set text colors
    - Improved theme-aware color behavior in light/dark modes

### Features

* add comprehensive typography system with semantic colors ([642af28](https://github.com/jonmatum/react-mfe-shell/commit/642af280c927436703dec3f58d2adbb2f0bff25a))

## [5.2.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v5.1.1...demo-v5.2.0) (2025-08-26)


### Features

* comprehensive demo improvements and new features ([086031a](https://github.com/jonmatum/react-mfe-shell/commit/086031ad82b37bfb28206c64eb141672c66c129d))

## [5.1.1](https://github.com/jonmatum/react-mfe-shell/compare/demo-v5.1.0...demo-v5.1.1) (2025-08-24)


### Bug Fixes

* **docs:** correct test counts, component counts, and bundle sizes ([483b985](https://github.com/jonmatum/react-mfe-shell/commit/483b98512b4826281b42fe4796467ccee1684359))

## [5.1.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v5.0.1...demo-v5.1.0) (2025-08-24)


### Features

* **demo:** add Radio and FileUpload components showcase ([cd806da](https://github.com/jonmatum/react-mfe-shell/commit/cd806da2d282b8a3b05faaf634c912c6df8b41e1))

## [5.0.1](https://github.com/jonmatum/react-mfe-shell/compare/demo-v5.0.0...demo-v5.0.1) (2025-08-24)


### Bug Fixes

* **lint:** resolve all ESLint errors and warnings ([04da16a](https://github.com/jonmatum/react-mfe-shell/commit/04da16ac8394c49ab189fbd975d8b58f95ea8d97))

## [5.0.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v4.1.1...demo-v5.0.0) (2025-08-24)


### ⚠ BREAKING CHANGES

* None - all additions are backward compatible

### Features

* add comprehensive form molecules ecosystem with demo showcase ([528ead6](https://github.com/jonmatum/react-mfe-shell/commit/528ead6f9a695b2c12d7e0c028545004ed6ebb47))

## [4.1.1](https://github.com/jonmatum/react-mfe-shell/compare/demo-v4.1.0...demo-v4.1.1) (2025-08-24)


### Bug Fixes

* resolve lint errors and apply code formatting ([3b45d33](https://github.com/jonmatum/react-mfe-shell/commit/3b45d33f06623e95a5e543fdecf37c6789755d8f))

## [4.1.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v4.0.0...demo-v4.1.0) (2025-08-24)


### Features

* add meaningful functionality to demo app navigation buttons ([5b9e085](https://github.com/jonmatum/react-mfe-shell/commit/5b9e085204cf87be74d92d06e0d6bbc8fd985c80))
* comprehensive demo app QA - showcase all available components and features ([8ca788e](https://github.com/jonmatum/react-mfe-shell/commit/8ca788e18e4896343d60706939139ef66e5a4084))
* enhance LoadingSpinner with design tokens and comprehensive safelist ([144bf98](https://github.com/jonmatum/react-mfe-shell/commit/144bf986a75cbf6e14363c1ac3edfdcc1cc18181))
* remove redundant Live Demo link from footer ([12dde95](https://github.com/jonmatum/react-mfe-shell/commit/12dde9526dc7c7025227a5a79db1b036715b9eac))
* update Avatar demo to showcase jonmatum GitHub profile ([b60077e](https://github.com/jonmatum/react-mfe-shell/commit/b60077ea129b3c03c30b7441b5c9baf3fede60b4))
* update Avatar demo with proper name and professional title ([096b271](https://github.com/jonmatum/react-mfe-shell/commit/096b271b4ba7cf8d8e925a07ac2af18a289580d8))

## [4.0.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v3.0.0...demo-v4.0.0) (2025-08-24)


### ⚠ BREAKING CHANGES

* Button and Badge components now use semantic variants instead of basic color props

### Features

* enhance design system with semantic variants and dynamic version management ([9294f93](https://github.com/jonmatum/react-mfe-shell/commit/9294f93e340ca75a4ebc00e342560c1517c6d844))


### Bug Fixes

* eliminate all remaining ESLint warnings ([927dff8](https://github.com/jonmatum/react-mfe-shell/commit/927dff87930710b05a1e8de7cba09f2c731353ae))
* resolve ESLint errors and improve type safety ([b7a9ded](https://github.com/jonmatum/react-mfe-shell/commit/b7a9dedc27f5da240faba40494b8dcc8a9d3c0a6))

## [3.0.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v2.1.0...demo-v3.0.0) (2025-08-24)


### ⚠ BREAKING CHANGES

* Demo now has separate versioning from main library
* Token structure has been reorganized for better consistency and type safety

### Features

* add personal signature to footer and documentation ([6f09878](https://github.com/jonmatum/react-mfe-shell/commit/6f09878f49375b1c3e5c80ae019afe27b6d35deb))
* display package version in demo app ([4e574d9](https://github.com/jonmatum/react-mfe-shell/commit/4e574d91937ce36bcc30e0d58c70874858f93452))
* establish comprehensive design token foundation ([3a81d0b](https://github.com/jonmatum/react-mfe-shell/commit/3a81d0b03f2ad9c9b4d4b90f216c9d69d427e4ea))
* implement multi-package versioning with release-please ([8d1445c](https://github.com/jonmatum/react-mfe-shell/commit/8d1445c89998c4a2ac17b8b6403ee5602047f2dc))


### Documentation

* add personal signature to all documentation files ([7c298bf](https://github.com/jonmatum/react-mfe-shell/commit/7c298bfb005c8c0d76066036b04c82435356fd1b))


### Code Refactoring

* remove community message and all emojis from project ([1202bd1](https://github.com/jonmatum/react-mfe-shell/commit/1202bd18b6033885b31500558f99fc960b0695c1))

## [2.1.0](https://github.com/jonmatum/react-mfe-shell/compare/demo-v2.0.0...demo-v2.1.0) (2024-08-24)

### Features

* **demo:** add automatic version display from package.json
* **demo:** implement comprehensive component showcase
* **demo:** add theme switching functionality
* **demo:** enhance accessibility features and keyboard navigation
* **demo:** add personal signature "Pura Vida & Happy Coding!"

### Documentation

* **demo:** improve component examples and descriptions
* **demo:** add comprehensive footer with links
* **demo:** standardize documentation structure

### Styles

* **demo:** remove emojis for clean professional appearance
* **demo:** implement consistent spacing and typography
* **demo:** add dark mode support with smooth transitions

## [2.0.0] - 2024-08-15

### Features

* **demo:** initial comprehensive demo application
* **demo:** showcase all atomic design components
* **demo:** interactive theme management
* **demo:** responsive design implementation

### Documentation

* **demo:** complete component documentation
* **demo:** usage examples for all components
* **demo:** accessibility compliance showcase
