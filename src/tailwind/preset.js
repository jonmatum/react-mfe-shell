/**
 * React MFE Shell - Tailwind CSS Preset
 *
 * This preset provides all the design tokens and configurations needed
 * for the MFE Shell components to work correctly with Tailwind CSS.
 *
 * Usage in consumer projects:
 *
 * // tailwind.config.js
 * module.exports = {
 *   presets: [require('@jonmatum/react-mfe-shell/tailwind-preset')],
 *   content: [
 *     './src/**\/*.{js,ts,jsx,tsx}',
 *     './node_modules/@jonmatum/react-mfe-shell/dist/**\/*.{js,ts,jsx,tsx}'
 *   ]
 * }
 */

const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      // Design Token Colors
      colors: {
        // Primary brand colors
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

        // Success colors
        success: {
          50: 'rgb(240 253 244)',
          100: 'rgb(220 252 231)',
          200: 'rgb(187 247 208)',
          300: 'rgb(134 239 172)',
          400: 'rgb(74 222 128)',
          500: 'rgb(34 197 94)',
          600: 'rgb(22 163 74)',
          700: 'rgb(21 128 61)',
          800: 'rgb(22 101 52)',
          900: 'rgb(20 83 45)',
        },

        // Warning colors
        warning: {
          50: 'rgb(255 251 235)',
          100: 'rgb(254 243 199)',
          200: 'rgb(253 230 138)',
          300: 'rgb(252 211 77)',
          400: 'rgb(251 191 36)',
          500: 'rgb(245 158 11)',
          600: 'rgb(217 119 6)',
          700: 'rgb(180 83 9)',
          800: 'rgb(146 64 14)',
          900: 'rgb(120 53 15)',
        },

        // Danger/Error colors
        danger: {
          50: 'rgb(254 242 242)',
          100: 'rgb(254 226 226)',
          200: 'rgb(254 202 202)',
          300: 'rgb(252 165 165)',
          400: 'rgb(248 113 113)',
          500: 'rgb(239 68 68)',
          600: 'rgb(220 38 38)',
          700: 'rgb(185 28 28)',
          800: 'rgb(153 27 27)',
          900: 'rgb(127 29 29)',
        },

        // Error colors (alias for danger)
        error: {
          50: 'rgb(254 242 242)',
          100: 'rgb(254 226 226)',
          200: 'rgb(254 202 202)',
          300: 'rgb(252 165 165)',
          400: 'rgb(248 113 113)',
          500: 'rgb(239 68 68)',
          600: 'rgb(220 38 38)',
          700: 'rgb(185 28 28)',
          800: 'rgb(153 27 27)',
          900: 'rgb(127 29 29)',
        },

        // Info colors
        info: {
          50: 'rgb(240 249 255)',
          100: 'rgb(224 242 254)',
          200: 'rgb(186 230 253)',
          300: 'rgb(125 211 252)',
          400: 'rgb(56 189 248)',
          500: 'rgb(14 165 233)',
          600: 'rgb(2 132 199)',
          700: 'rgb(3 105 161)',
          800: 'rgb(7 89 133)',
          900: 'rgb(12 74 110)',
        },

        // Theme-aware semantic colors using CSS custom properties
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
          disabled: 'var(--color-text-disabled)',
        },

        background: {
          primary: 'var(--color-background-primary)',
          secondary: 'var(--color-background-secondary)',
          tertiary: 'var(--color-background-tertiary)',
        },

        surface: {
          primary: 'var(--color-surface-primary)',
          secondary: 'var(--color-surface-secondary)',
          tertiary: 'var(--color-surface-tertiary)',
          elevated: 'var(--color-surface-elevated)',
        },

        border: {
          primary: 'var(--color-border-primary)',
          secondary: 'var(--color-border-secondary)',
          tertiary: 'var(--color-border-tertiary)',
          focus: 'var(--color-border-focus)',
        },
      },

      // Design Token Spacing
      spacing: {
        0.5: '0.125rem',
        1.5: '0.375rem',
        2.5: '0.625rem',
        3.5: '0.875rem',
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        9.5: '2.375rem',
        11: '2.75rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
      },

      // Design Token Typography
      fontFamily: {
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // Design Token Shadows
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        outline: '0 0 0 3px rgb(var(--color-primary-500) / 0.1)',
        'outline-success': '0 0 0 3px rgb(var(--color-success-500) / 0.1)',
        'outline-warning': '0 0 0 3px rgb(var(--color-warning-500) / 0.1)',
        'outline-danger': '0 0 0 3px rgb(var(--color-danger-500) / 0.1)',
        'outline-error': '0 0 0 3px rgb(var(--color-error-500) / 0.1)',
      },

      // Design Token Border Radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // Design Token Animations
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-down': 'slideDown 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      // Design Token Z-Index
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },

  plugins: [
    // Custom plugin for MFE Shell utilities
    plugin(function ({ addUtilities, addComponents, theme }) {
      // Add custom utilities for semantic colors
      addUtilities({
        '.text-semantic-primary': {
          color: 'rgb(var(--color-text-primary))',
        },
        '.text-semantic-secondary': {
          color: 'rgb(var(--color-text-secondary))',
        },
        '.text-semantic-tertiary': {
          color: 'rgb(var(--color-text-tertiary))',
        },
        '.bg-semantic-primary': {
          backgroundColor: 'rgb(var(--color-background-primary))',
        },
        '.bg-semantic-secondary': {
          backgroundColor: 'rgb(var(--color-background-secondary))',
        },
        '.surface-primary': {
          backgroundColor: 'rgb(var(--color-surface-primary))',
        },
        '.surface-secondary': {
          backgroundColor: 'rgb(var(--color-surface-secondary))',
        },
        '.border-semantic': {
          borderColor: 'rgb(var(--color-border-primary))',
        },
      });

      // Add component base styles
      addComponents({
        '.mfe-button-base': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.md'),
          fontWeight: theme('fontWeight.medium'),
          transition: 'all 0.2s ease-in-out',
          cursor: 'pointer',
          '&:focus-visible': {
            outline: '2px solid rgb(var(--color-border-focus))',
            outlineOffset: '2px',
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },

        '.mfe-input-base': {
          display: 'block',
          width: '100%',
          borderRadius: theme('borderRadius.md'),
          border: '1px solid rgb(var(--color-border-primary))',
          backgroundColor: 'rgb(var(--color-surface-primary))',
          color: 'rgb(var(--color-text-primary))',
          fontSize: theme('fontSize.sm[0]'),
          lineHeight: theme('fontSize.sm[1].lineHeight'),
          transition: 'all 0.2s ease-in-out',
          '&:focus': {
            outline: 'none',
            borderColor: 'rgb(var(--color-border-focus))',
            boxShadow: '0 0 0 3px rgb(var(--color-primary-500) / 0.1)',
          },
          '&:disabled': {
            opacity: '0.5',
            cursor: 'not-allowed',
          },
        },

        '.mfe-card-base': {
          backgroundColor: 'rgb(var(--color-surface-primary))',
          borderRadius: theme('borderRadius.lg'),
          border: '1px solid rgb(var(--color-border-primary))',
          boxShadow: theme('boxShadow.sm'),
        },
      });
    }),
  ],
};
