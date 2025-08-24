# React MFE Shell - Interactive Demo

This directory contains a comprehensive interactive demo showcasing all components and features of the React MFE Shell library.

## Features Demonstrated

- **Theme Management**: Light/dark mode switching with system preference detection
- **Atomic Design Components**: 
  - **Atoms**: Button, Input, Badge, LoadingSpinner, Switch
  - **Molecules**: Modal, Card (with compound patterns)
- **Accessibility**: WCAG AA compliance, keyboard navigation, screen reader support
- **TypeScript**: Full type safety and IntelliSense support
- **Performance**: Optimized bundle sizes and runtime performance

## Running the Demo

### Development Mode
```bash
# Start development server with hot reload
npm run dev

# Or start demo only (without rebuilding library)
npm run dev:demo
```

### Production Build
```bash
# Build and preview the demo
npm run preview

# Or build demo separately
npm run build:demo
```

## Demo Sections

1. **Hero Section**: Overview and feature badges
2. **Theme Settings**: Interactive theme switching
3. **Button Components**: All variants, sizes, states, and compound patterns
4. **Input Components**: Form inputs with validation, icons, and states
5. **Badge Components**: Status indicators with variants and interactions
6. **Card Components**: Layout containers with compound patterns
7. **Modal Components**: Accessible dialogs with keyboard navigation
8. **Loading Components**: Animated spinners with customization options

## Architecture

The demo is built using:
- **Vite** for fast development and optimized builds
- **React 18** with modern hooks and patterns
- **TypeScript** for type safety
- **Tailwind CSS** for styling (same as the library)
- **Direct imports** from the source library for real-time development

## File Structure

```
demo/
├── App.tsx          # Main demo application
├── main.tsx         # React entry point
└── README.md        # This file
```

The demo imports directly from `../src` to showcase the library components in real-time during development.

---

*Pura Vida & Happy Coding!*
