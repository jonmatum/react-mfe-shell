import { describe, it, expect } from 'vitest';
import {
  baseColors,
  semanticColors,
  themeColors,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  boxShadow,
  borderRadius,
  breakpoints,
  animationTimingFunction,
  zIndex,
  tokens,
} from '../tokens';

describe('Design Tokens', () => {
  describe('Base Colors', () => {
    it('should have all base colors defined', () => {
      expect(baseColors.white).toBe('#ffffff');
      expect(baseColors.black).toBe('#000000');

      // Test gray scale
      expect(baseColors.gray).toHaveProperty('50');
      expect(baseColors.gray).toHaveProperty('500');
      expect(baseColors.gray).toHaveProperty('900');

      // Test color scales
      ['blue', 'green', 'yellow', 'red', 'cyan'].forEach(color => {
        expect(baseColors[color as keyof typeof baseColors]).toHaveProperty(
          '50'
        );
        expect(baseColors[color as keyof typeof baseColors]).toHaveProperty(
          '500'
        );
        expect(baseColors[color as keyof typeof baseColors]).toHaveProperty(
          '950'
        );
      });
    });

    it('should have valid hex color values', () => {
      const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

      expect(baseColors.white).toMatch(hexColorRegex);
      expect(baseColors.black).toMatch(hexColorRegex);

      Object.values(baseColors.gray).forEach(color => {
        expect(color).toMatch(hexColorRegex);
      });
    });
  });

  describe('Semantic Colors', () => {
    it('should have semantic colors mapped correctly', () => {
      expect(semanticColors.primary).toBe(baseColors.blue);
      expect(semanticColors.secondary).toBe(baseColors.gray);
      expect(semanticColors.success).toBe(baseColors.green);
      expect(semanticColors.warning).toBe(baseColors.yellow);
      expect(semanticColors.error).toBe(baseColors.red);
      expect(semanticColors.info).toBe(baseColors.cyan);
    });
  });

  describe('Theme Colors', () => {
    it('should have theme colors for light and dark modes', () => {
      // Light theme
      expect(themeColors.light).toHaveProperty('background');
      expect(themeColors.light).toHaveProperty('surface');
      expect(themeColors.light).toHaveProperty('text');
      expect(themeColors.light).toHaveProperty('border');
      expect(themeColors.light).toHaveProperty('interactive');
      expect(themeColors.light).toHaveProperty('status');

      // Dark theme
      expect(themeColors.dark).toHaveProperty('background');
      expect(themeColors.dark).toHaveProperty('surface');
      expect(themeColors.dark).toHaveProperty('text');
      expect(themeColors.dark).toHaveProperty('border');
      expect(themeColors.dark).toHaveProperty('interactive');
      expect(themeColors.dark).toHaveProperty('status');
    });
  });

  describe('Spacing', () => {
    it('should have consistent spacing scale', () => {
      expect(spacing[0]).toBe('0px');
      expect(spacing.px).toBe('1px');
      expect(spacing[1]).toBe('0.25rem');
      expect(spacing[4]).toBe('1rem');
      expect(spacing[8]).toBe('2rem');
    });

    it('should have all spacing values as strings with units', () => {
      Object.values(spacing).forEach(value => {
        expect(typeof value).toBe('string');
        expect(value).toMatch(/^(\d+(\.\d+)?(px|rem)|0px)$/);
      });
    });
  });

  describe('Typography', () => {
    it('should have font families', () => {
      expect(fontFamily.sans).toContain('Inter');
      expect(fontFamily.mono).toContain('"JetBrains Mono"');
    });

    it('should have font sizes with line heights', () => {
      expect(fontSize.xs).toEqual(['0.75rem', { lineHeight: '1rem' }]);
      expect(fontSize.base).toEqual(['1rem', { lineHeight: '1.5rem' }]);
      expect(fontSize['4xl']).toEqual(['2.25rem', { lineHeight: '2.5rem' }]);
    });

    it('should have font weights', () => {
      expect(fontWeight.normal).toBe('400');
      expect(fontWeight.medium).toBe('500');
      expect(fontWeight.bold).toBe('700');
    });
  });

  describe('Border Radius', () => {
    it('should have border radius values', () => {
      expect(borderRadius.none).toBe('0px');
      expect(borderRadius.sm).toBe('0.125rem');
      expect(borderRadius.md).toBe('0.375rem');
      expect(borderRadius.lg).toBe('0.5rem');
      expect(borderRadius.full).toBe('9999px');
    });
  });

  describe('Shadows', () => {
    it('should have shadow definitions', () => {
      expect(boxShadow.sm).toBeDefined();
      expect(boxShadow.md).toBeDefined();
      expect(boxShadow.lg).toBeDefined();
      expect(boxShadow.xl).toBeDefined();
    });

    it('should have proper shadow format', () => {
      expect(boxShadow.sm).toContain('rgb');
      expect(boxShadow.md).toContain('rgb');
    });
  });

  describe('Breakpoints', () => {
    it('should have responsive breakpoints', () => {
      expect(breakpoints.xs).toBe('475px');
      expect(breakpoints.sm).toBe('640px');
      expect(breakpoints.md).toBe('768px');
      expect(breakpoints.lg).toBe('1024px');
      expect(breakpoints.xl).toBe('1280px');
      expect(breakpoints['2xl']).toBe('1536px');
    });
  });

  describe('Animation Timing Functions', () => {
    it('should have timing functions', () => {
      expect(animationTimingFunction.linear).toBe('linear');
      expect(animationTimingFunction.in).toBe('cubic-bezier(0.4, 0, 1, 1)');
      expect(animationTimingFunction.out).toBe('cubic-bezier(0, 0, 0.2, 1)');
      expect(animationTimingFunction['in-out']).toBe(
        'cubic-bezier(0.4, 0, 0.2, 1)'
      );
    });
  });

  describe('Z-Index', () => {
    it('should have z-index values', () => {
      expect(zIndex.dropdown).toBe('1000');
      expect(zIndex.sticky).toBe('1020');
      expect(zIndex.fixed).toBe('1030');
      expect(zIndex.modal).toBe('1040');
      expect(zIndex.popover).toBe('1050');
      expect(zIndex.tooltip).toBe('1060');
    });

    it('should have proper z-index hierarchy', () => {
      expect(parseInt(zIndex.dropdown)).toBeLessThan(parseInt(zIndex.sticky));
      expect(parseInt(zIndex.sticky)).toBeLessThan(parseInt(zIndex.fixed));
      expect(parseInt(zIndex.fixed)).toBeLessThan(parseInt(zIndex.modal));
      expect(parseInt(zIndex.modal)).toBeLessThan(parseInt(zIndex.popover));
      expect(parseInt(zIndex.popover)).toBeLessThan(parseInt(zIndex.tooltip));
    });
  });

  describe('Complete Token System', () => {
    it('should export complete tokens object', () => {
      expect(tokens).toHaveProperty('colors');
      expect(tokens).toHaveProperty('typography');
      expect(tokens).toHaveProperty('spacing');
      expect(tokens).toHaveProperty('shadows');
      expect(tokens).toHaveProperty('borderRadius');
      expect(tokens).toHaveProperty('breakpoints');
      expect(tokens).toHaveProperty('animation');
      expect(tokens).toHaveProperty('zIndex');
      expect(tokens).toHaveProperty('components');
    });

    it('should have nested color structure', () => {
      expect(tokens.colors).toHaveProperty('base');
      expect(tokens.colors).toHaveProperty('semantic');
      expect(tokens.colors).toHaveProperty('theme');

      expect(tokens.colors.base).toBe(baseColors);
      expect(tokens.colors.semantic).toBe(semanticColors);
      expect(tokens.colors.theme).toBe(themeColors);
    });
  });

  describe('Token Consistency', () => {
    it('should have consistent color scale structure', () => {
      const colorScaleKeys = [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        '950',
      ];

      [
        baseColors.gray,
        baseColors.blue,
        baseColors.green,
        baseColors.yellow,
        baseColors.red,
        baseColors.cyan,
      ].forEach(colorScale => {
        colorScaleKeys.forEach(key => {
          expect(colorScale).toHaveProperty(key);
        });
      });
    });

    it('should have consistent unit usage', () => {
      // Font sizes should use rem
      Object.values(fontSize).forEach(([size]) => {
        expect(size).toMatch(/^\d+(\.\d+)?rem$/);
      });
    });
  });
});
