import { describe, it, expect } from 'vitest';
import {
  validateField,
  validationPatterns,
  getFieldErrorProps,
  getFormFieldAccessibility,
} from '../form';

describe('Form Utilities', () => {
  describe('validateField', () => {
    it('validates required fields', () => {
      const rules = { required: true };

      expect(validateField('', rules)).toBe('This field is required');
      expect(validateField(null, rules)).toBe('This field is required');
      expect(validateField(undefined, rules)).toBe('This field is required');
      expect(validateField([], rules)).toBe('This field is required');
      expect(validateField('value', rules)).toBeUndefined();
    });

    it('validates required fields with custom message', () => {
      const rules = { required: 'Email is required' };

      expect(validateField('', rules)).toBe('Email is required');
      expect(validateField('value', rules)).toBeUndefined();
    });

    it('validates minimum length', () => {
      const rules = { minLength: 3 };

      expect(validateField('ab', rules)).toBe('Must be at least 3 characters');
      expect(validateField('abc', rules)).toBeUndefined();
      expect(validateField('abcd', rules)).toBeUndefined();
    });

    it('validates minimum length with custom message', () => {
      const rules = { minLength: { value: 3, message: 'Too short' } };

      expect(validateField('ab', rules)).toBe('Too short');
      expect(validateField('abc', rules)).toBeUndefined();
    });

    it('validates maximum length', () => {
      const rules = { maxLength: 5 };

      expect(validateField('abcdef', rules)).toBe(
        'Must be no more than 5 characters'
      );
      expect(validateField('abcde', rules)).toBeUndefined();
      expect(validateField('abc', rules)).toBeUndefined();
    });

    it('validates maximum length with custom message', () => {
      const rules = { maxLength: { value: 5, message: 'Too long' } };

      expect(validateField('abcdef', rules)).toBe('Too long');
      expect(validateField('abcde', rules)).toBeUndefined();
    });

    it('validates pattern matching', () => {
      const rules = { pattern: /^\d+$/ };

      expect(validateField('abc', rules)).toBe('Invalid format');
      expect(validateField('123', rules)).toBeUndefined();
    });

    it('validates pattern matching with custom message', () => {
      const rules = { pattern: { value: /^\d+$/, message: 'Numbers only' } };

      expect(validateField('abc', rules)).toBe('Numbers only');
      expect(validateField('123', rules)).toBeUndefined();
    });

    it('validates with custom function', () => {
      const rules = {
        custom: (value: string) =>
          value === 'invalid' ? 'Custom error' : undefined,
      };

      expect(validateField('invalid', rules)).toBe('Custom error');
      expect(validateField('valid', rules)).toBeUndefined();
    });

    it('skips validation for empty non-required fields', () => {
      const rules = { minLength: 3, pattern: /^\d+$/ };

      expect(validateField('', rules)).toBeUndefined();
      expect(validateField(null, rules)).toBeUndefined();
      expect(validateField(undefined, rules)).toBeUndefined();
    });

    it('validates multiple rules in order', () => {
      const rules = {
        required: true,
        minLength: 3,
        pattern: /^\d+$/,
      };

      expect(validateField('', rules)).toBe('This field is required');
      expect(validateField('ab', rules)).toBe('Must be at least 3 characters');
      expect(validateField('abc', rules)).toBe('Invalid format');
      expect(validateField('123', rules)).toBeUndefined();
    });

    it('returns undefined when no rules provided', () => {
      expect(validateField('any value')).toBeUndefined();
    });
  });

  describe('validationPatterns', () => {
    it('validates email pattern', () => {
      const { value: emailPattern } = validationPatterns.email;

      expect(emailPattern.test('test@example.com')).toBe(true);
      expect(emailPattern.test('user.name+tag@domain.co.uk')).toBe(true);
      expect(emailPattern.test('invalid-email')).toBe(false);
      expect(emailPattern.test('test@')).toBe(false);
      expect(emailPattern.test('@example.com')).toBe(false);
    });

    it('validates phone pattern', () => {
      const { value: phonePattern } = validationPatterns.phone;

      expect(phonePattern.test('+1234567890')).toBe(true);
      expect(phonePattern.test('1234567890')).toBe(true);
      expect(phonePattern.test('+44123456789')).toBe(true);
      expect(phonePattern.test('abc123')).toBe(false);
      expect(phonePattern.test('+abc')).toBe(false);
    });

    it('validates URL pattern', () => {
      const { value: urlPattern } = validationPatterns.url;

      expect(urlPattern.test('https://example.com')).toBe(true);
      expect(urlPattern.test('http://test.org')).toBe(true);
      expect(urlPattern.test('ftp://files.com')).toBe(false);
      expect(urlPattern.test('example.com')).toBe(false);
    });

    it('validates alphanumeric pattern', () => {
      const { value: alphanumericPattern } = validationPatterns.alphanumeric;

      expect(alphanumericPattern.test('abc123')).toBe(true);
      expect(alphanumericPattern.test('ABC')).toBe(true);
      expect(alphanumericPattern.test('123')).toBe(true);
      expect(alphanumericPattern.test('abc-123')).toBe(false);
      expect(alphanumericPattern.test('abc 123')).toBe(false);
    });

    it('validates no special characters pattern', () => {
      const { value: noSpecialCharsPattern } =
        validationPatterns.noSpecialChars;

      expect(noSpecialCharsPattern.test('abc 123')).toBe(true);
      expect(noSpecialCharsPattern.test('Hello World')).toBe(true);
      expect(noSpecialCharsPattern.test('abc123')).toBe(true);
      expect(noSpecialCharsPattern.test('abc-123')).toBe(false);
      expect(noSpecialCharsPattern.test('abc@123')).toBe(false);
    });
  });

  describe('getFieldErrorProps', () => {
    it('returns correct props when error exists', () => {
      const props = getFieldErrorProps('Error message', 'field-id');

      expect(props).toEqual({
        'aria-invalid': 'true',
        'aria-describedby': 'field-id-error',
      });
    });

    it('returns correct props when no error', () => {
      const props = getFieldErrorProps(undefined, 'field-id');

      expect(props).toEqual({
        'aria-invalid': 'false',
        'aria-describedby': undefined,
      });
    });

    it('returns correct props when no fieldId', () => {
      const props = getFieldErrorProps('Error message');

      expect(props).toEqual({
        'aria-invalid': 'true',
        'aria-describedby': undefined,
      });
    });
  });

  describe('getFormFieldAccessibility', () => {
    it('returns complete accessibility props', () => {
      const props = getFormFieldAccessibility(
        'field-id',
        'Error message',
        'Help text',
        true
      );

      expect(props).toEqual({
        id: 'field-id',
        'aria-invalid': 'true',
        'aria-describedby': 'field-id-description field-id-error',
        'aria-required': 'true',
      });
    });

    it('returns props with only description', () => {
      const props = getFormFieldAccessibility(
        'field-id',
        undefined,
        'Help text',
        false
      );

      expect(props).toEqual({
        id: 'field-id',
        'aria-invalid': 'false',
        'aria-describedby': 'field-id-description',
        'aria-required': undefined,
      });
    });

    it('returns props with only error', () => {
      const props = getFormFieldAccessibility(
        'field-id',
        'Error message',
        undefined,
        false
      );

      expect(props).toEqual({
        id: 'field-id',
        'aria-invalid': 'true',
        'aria-describedby': 'field-id-error',
        'aria-required': undefined,
      });
    });

    it('returns minimal props when no description or error', () => {
      const props = getFormFieldAccessibility('field-id');

      expect(props).toEqual({
        id: 'field-id',
        'aria-invalid': 'false',
        'aria-describedby': undefined,
        'aria-required': undefined,
      });
    });
  });
});
