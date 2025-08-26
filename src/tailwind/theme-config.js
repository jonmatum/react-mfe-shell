/**
 * React MFE Shell - Theme Configuration Utility
 *
 * This utility helps consumers easily override design tokens and create custom themes
 * while maintaining compatibility with the MFE Shell components.
 *
 * Usage:
 *
 * // tailwind.config.js
 * const { createMfeTheme } = require('@jonmatum/react-mfe-shell/theme-config');
 *
 * module.exports = {
 *   presets: [require('@jonmatum/react-mfe-shell/tailwind-preset')],
 *   theme: createMfeTheme({
 *     colors: {
 *       primary: {
 *         500: '#10b981', // Custom primary color
 *         600: '#059669',
 *       }
 *     }
 *   }),
 *   content: ['./src/**\/*.{js,ts,jsx,tsx}']
 * }
 */

const defaultTheme = require('tailwindcss/defaultTheme');

/**
 * Creates a theme configuration with MFE Shell design tokens
 * @param {Object} overrides - Theme overrides to apply
 * @returns {Object} Complete theme configuration
 */
function createMfeTheme(overrides = {}) {
  const baseTheme = {
    extend: {
      colors: {
        // Primary brand colors (can be overridden)
        primary: {
          50: 'rgb(239 246 255)',
          100: 'rgb(219 234 254)',
          200: 'rgb(191 219 254)',
          300: 'rgb(147 197 253)',
          400: 'rgb(96 165 250)',
          500: 'rgb(59 130 246)',
          600: 'rgb(37 99 235)',
          700: 'rgb(29 78 216)',
          800: 'rgb(30 64 175)',
          900: 'rgb(30 58 138)',
        },

        // Semantic colors (theme-aware via CSS custom properties)
        text: {
          primary: 'rgb(var(--color-text-primary))',
          secondary: 'rgb(var(--color-text-secondary))',
          tertiary: 'rgb(var(--color-text-tertiary))',
          inverse: 'rgb(var(--color-text-inverse))',
          disabled: 'rgb(var(--color-text-disabled))',
        },

        background: {
          primary: 'rgb(var(--color-background-primary))',
          secondary: 'rgb(var(--color-background-secondary))',
          tertiary: 'rgb(var(--color-background-tertiary))',
        },

        surface: {
          primary: 'rgb(var(--color-surface-primary))',
          secondary: 'rgb(var(--color-surface-secondary))',
          tertiary: 'rgb(var(--color-surface-tertiary))',
          elevated: 'rgb(var(--color-surface-elevated))',
        },

        border: {
          primary: 'rgb(var(--color-border-primary))',
          secondary: 'rgb(var(--color-border-secondary))',
          tertiary: 'rgb(var(--color-border-tertiary))',
          focus: 'rgb(var(--color-border-focus))',
        },
      },
    },
  };

  // Deep merge overrides with base theme
  return mergeDeep(baseTheme, overrides);
}

/**
 * Generates CSS custom properties for theme tokens
 * @param {Object} colorOverrides - Color overrides to apply
 * @returns {string} CSS custom properties
 */
function generateThemeCSS(colorOverrides = {}) {
  const defaultColors = {
    primary: {
      50: '239 246 255',
      100: '219 234 254',
      200: '191 219 254',
      300: '147 197 253',
      400: '96 165 250',
      500: '59 130 246',
      600: '37 99 235',
      700: '29 78 216',
      800: '30 64 175',
      900: '30 58 138',
    },
    success: {
      50: '240 253 244',
      100: '220 252 231',
      200: '187 247 208',
      300: '134 239 172',
      400: '74 222 128',
      500: '34 197 94',
      600: '22 163 74',
      700: '21 128 61',
      800: '22 101 52',
      900: '20 83 45',
    },
    warning: {
      50: '255 251 235',
      100: '254 243 199',
      200: '253 230 138',
      300: '252 211 77',
      400: '251 191 36',
      500: '245 158 11',
      600: '217 119 6',
      700: '180 83 9',
      800: '146 64 14',
      900: '120 53 15',
    },
    danger: {
      50: '254 242 242',
      100: '254 226 226',
      200: '254 202 202',
      300: '252 165 165',
      400: '248 113 113',
      500: '239 68 68',
      600: '220 38 38',
      700: '185 28 28',
      800: '153 27 27',
      900: '127 29 29',
    },
  };

  const colors = mergeDeep(defaultColors, colorOverrides);

  let css = ':root {\n';

  // Generate color variables
  Object.entries(colors).forEach(([colorName, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      css += `  --color-${colorName}-${shade}: ${value};\n`;
    });
  });

  // Add semantic color variables (light theme)
  css += `
  /* Semantic Colors - Light Theme */
  --color-text-primary: 31 41 55;
  --color-text-secondary: 107 114 128;
  --color-text-tertiary: 156 163 175;
  --color-text-inverse: 255 255 255;
  --color-text-disabled: 209 213 219;
  
  --color-background-primary: 255 255 255;
  --color-background-secondary: 249 250 251;
  --color-background-tertiary: 243 244 246;
  
  --color-surface-primary: 255 255 255;
  --color-surface-secondary: 243 244 246;
  --color-surface-tertiary: 229 231 235;
  --color-surface-elevated: 255 255 255;
  
  --color-border-primary: 229 231 235;
  --color-border-secondary: 209 213 219;
  --color-border-tertiary: 156 163 175;
  --color-border-focus: var(--color-primary-500);
`;

  css += '}\n\n';

  // Add dark theme
  css += `.dark {
  /* Semantic Colors - Dark Theme */
  --color-text-primary: 243 244 246;
  --color-text-secondary: 156 163 175;
  --color-text-tertiary: 107 114 128;
  --color-text-inverse: 17 24 39;
  --color-text-disabled: 75 85 99;
  
  --color-background-primary: 17 24 39;
  --color-background-secondary: 31 41 55;
  --color-background-tertiary: 55 65 81;
  
  --color-surface-primary: 31 41 55;
  --color-surface-secondary: 55 65 81;
  --color-surface-tertiary: 75 85 99;
  --color-surface-elevated: 55 65 81;
  
  --color-border-primary: 75 85 99;
  --color-border-secondary: 107 114 128;
  --color-border-tertiary: 156 163 175;
  --color-border-focus: var(--color-primary-400);
}\n`;

  return css;
}

/**
 * Creates a complete Tailwind config with MFE Shell preset and custom overrides
 * @param {Object} options - Configuration options
 * @returns {Object} Complete Tailwind configuration
 */
function createMfeConfig(options = {}) {
  const { colors = {}, content = [], plugins = [], ...otherOptions } = options;

  return {
    presets: [require('./preset.js')],
    content: [
      './src/**/*.{js,ts,jsx,tsx}',
      './node_modules/@jonmatum/react-mfe-shell/dist/**/*.{js,ts,jsx,tsx}',
      ...content,
    ],
    theme: createMfeTheme({ colors }),
    plugins: [...plugins],
    ...otherOptions,
  };
}

/**
 * Deep merge utility function
 * @param {Object} target - Target object
 * @param {Object} source - Source object to merge
 * @returns {Object} Merged object
 */
function mergeDeep(target, source) {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
}

/**
 * Check if value is an object
 * @param {*} item - Item to check
 * @returns {boolean} Whether item is an object
 */
function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

module.exports = {
  createMfeTheme,
  createMfeConfig,
  generateThemeCSS,
  mergeDeep,
};
