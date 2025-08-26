import { describe, it, expect } from 'vitest';
import { generateTypographyClasses, typographyVariants } from '../typography';

describe('Typography Utilities', () => {
  // =============================================================================
  // COLOR GENERATION TESTS
  // =============================================================================

  describe('Color Generation', () => {
    it('generates default colors for variants correctly', () => {
      const bodyClasses = generateTypographyClasses({ variant: 'body' });
      expect(bodyClasses).toContain('text-primary');

      const captionClasses = generateTypographyClasses({ variant: 'caption' });
      expect(captionClasses).toContain('text-secondary');

      const displayClasses = generateTypographyClasses({ variant: 'display' });
      expect(displayClasses).toContain('text-primary');
    });

    it('applies custom colors correctly', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        color: 'text-primary-600',
      });
      expect(classes).toContain('text-primary-600');
      expect(classes.split(' ')).not.toContain('text-primary'); // Check exact class match
    });

    it('applies design system colors correctly', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        color: 'text-secondary',
      });
      expect(classes).toContain('text-secondary');
      expect(classes).not.toContain('text-primary');
    });

    it('handles background colors correctly', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        color: 'bg-red-500',
      });
      expect(classes).toContain('bg-red-500');
    });

    it('ignores invalid color formats', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        color: 'invalid-color',
      });
      expect(classes).not.toContain('invalid-color');
      expect(classes).toContain('text-primary'); // Should use variant default
    });

    it('handles empty color correctly', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        color: '',
      });
      expect(classes).toContain('text-primary'); // Should use variant default
    });
  });

  // =============================================================================
  // VARIANT CONFIGURATION TESTS
  // =============================================================================

  describe('Variant Configurations', () => {
    it('has correct default colors for all variants', () => {
      expect(typographyVariants.body.defaultColor).toBe('text-primary');
      expect(typographyVariants.caption.defaultColor).toBe('text-secondary');
      expect(typographyVariants.display.defaultColor).toBe('text-primary');
      expect(typographyVariants.headline.defaultColor).toBe('text-primary');
      expect(typographyVariants.title.defaultColor).toBe('text-primary');
      expect(typographyVariants.subtitle.defaultColor).toBe('text-secondary');
      expect(typographyVariants.overline.defaultColor).toBe('text-secondary');
      expect(typographyVariants.label.defaultColor).toBe('text-primary');
      expect(typographyVariants.helper.defaultColor).toBe('text-secondary');
      expect(typographyVariants.code.defaultColor).toBe('text-primary');
      expect(typographyVariants.kbd.defaultColor).toBe('text-primary');
      expect(typographyVariants.quote.defaultColor).toBe('text-secondary');
      expect(typographyVariants.lead.defaultColor).toBe('text-primary');
      expect(typographyVariants.muted.defaultColor).toBe('text-tertiary');
    });
  });

  // =============================================================================
  // SIZE GENERATION TESTS
  // =============================================================================

  describe('Size Generation', () => {
    it('generates correct size classes', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        size: 'lg',
      });
      expect(classes).toContain('text-lg');
    });

    it('handles responsive sizes', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        size: { base: 'sm', md: 'lg', xl: '2xl' },
      });
      expect(classes).toContain('text-sm');
      expect(classes).toContain('md:text-lg');
      expect(classes).toContain('xl:text-2xl');
    });
  });

  // =============================================================================
  // WEIGHT GENERATION TESTS
  // =============================================================================

  describe('Weight Generation', () => {
    it('generates correct weight classes', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        weight: 'bold',
      });
      expect(classes).toContain('font-bold');
    });

    it('handles responsive weights', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        weight: { base: 'normal', md: 'semibold', xl: 'bold' },
      });
      expect(classes).toContain('font-normal');
      expect(classes).toContain('md:font-semibold');
      expect(classes).toContain('xl:font-bold');
    });
  });

  // =============================================================================
  // ALIGNMENT GENERATION TESTS
  // =============================================================================

  describe('Alignment Generation', () => {
    it('generates correct alignment classes', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        align: 'center',
      });
      expect(classes).toContain('text-center');
    });

    it('handles responsive alignment', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        align: { base: 'left', md: 'center', xl: 'right' },
      });
      expect(classes).toContain('text-left');
      expect(classes).toContain('md:text-center');
      expect(classes).toContain('xl:text-right');
    });
  });

  // =============================================================================
  // SPECIAL FEATURES TESTS
  // =============================================================================

  describe('Special Features', () => {
    it('generates gradient classes correctly', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        gradient: true,
      });
      expect(classes).toContain('bg-gradient-to-r');
      expect(classes).toContain('bg-clip-text');
      expect(classes).toContain('text-transparent');
    });

    it('generates truncate classes correctly', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        truncate: true,
      });
      expect(classes).toContain('truncate');
    });

    it('generates line clamp classes correctly', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        lineClamp: 3,
      });
      expect(classes).toContain('line-clamp-3');
    });
  });

  // =============================================================================
  // VARIANT-SPECIFIC TESTS
  // =============================================================================

  describe('Variant-Specific Features', () => {
    it('generates overline variant classes correctly', () => {
      const classes = generateTypographyClasses({ variant: 'overline' });
      expect(classes).toContain('uppercase');
      expect(classes).toContain('tracking-wide');
      expect(classes).toContain('text-secondary');
    });

    it('generates code variant classes correctly', () => {
      const classes = generateTypographyClasses({ variant: 'code' });
      expect(classes).toContain('font-mono');
      expect(classes).toContain('text-primary');
    });

    it('generates kbd variant classes correctly', () => {
      const classes = generateTypographyClasses({ variant: 'kbd' });
      expect(classes).toContain('font-mono');
      expect(classes).toContain('px-1.5');
      expect(classes).toContain('py-0.5');
      expect(classes).toContain('bg-surface-secondary');
      expect(classes).toContain('border-border-primary');
    });

    it('generates quote variant classes correctly', () => {
      const classes = generateTypographyClasses({ variant: 'quote' });
      expect(classes).toContain('italic');
      expect(classes).toContain('border-l-4');
      expect(classes).toContain('pl-4');
      expect(classes).toContain('text-secondary');
    });
  });

  // =============================================================================
  // COMBINATION TESTS
  // =============================================================================

  describe('Property Combinations', () => {
    it('combines multiple properties correctly', () => {
      const classes = generateTypographyClasses({
        variant: 'body',
        size: 'lg',
        weight: 'bold',
        align: 'center',
        color: 'text-primary-600',
        transform: 'uppercase',
        decoration: 'underline',
        leading: 'tight',
        tracking: 'wide',
        gradient: false,
        truncate: false,
      });

      expect(classes).toContain('text-lg');
      expect(classes).toContain('font-bold');
      expect(classes).toContain('text-center');
      expect(classes).toContain('text-primary-600');
      expect(classes).toContain('uppercase');
      expect(classes).toContain('underline');
      expect(classes).toContain('leading-tight');
      expect(classes).toContain('tracking-wide');
      expect(classes).not.toContain('text-primary '); // Should use custom color (with space to avoid substring match)
    });
  });

  // =============================================================================
  // DEBUG TESTS
  // =============================================================================

  describe('Debug Information', () => {
    it('returns string of classes', () => {
      const classes = generateTypographyClasses({ variant: 'body' });
      expect(typeof classes).toBe('string');
      expect(classes.length).toBeGreaterThan(0);
    });

    it('includes all expected classes for display variant', () => {
      const classes = generateTypographyClasses({
        variant: 'display',
        size: '4xl',
        weight: 'bold',
        color: 'text-primary-600',
      });

      console.log('Display variant classes:', classes);

      expect(classes).toContain('text-4xl');
      expect(classes).toContain('font-bold');
      expect(classes).toContain('text-primary-600');
      expect(classes.split(' ')).not.toContain('text-primary'); // Check exact class match
    });

    it('logs all variant default colors for debugging', () => {
      Object.entries(typographyVariants).forEach(([variant, config]) => {
        console.log(`${variant}: ${config.defaultColor}`);
      });
    });
  });
});
