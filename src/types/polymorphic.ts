import React from 'react';

/**
 * Simplified polymorphic component types for flexible element rendering
 * Allows components to render as different HTML elements while maintaining type safety
 */

// Base polymorphic props
export type PolymorphicOwnProps<
  E extends React.ElementType = React.ElementType,
> = {
  as?: E;
};

// Polymorphic component props that merge own props with element props
export type PolymorphicComponentProps<
  E extends React.ElementType,
  Props = Record<string, unknown>,
> = Props &
  PolymorphicOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof (Props & PolymorphicOwnProps<E>)>;

// Polymorphic ref type
export type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>['ref'];

// Complete polymorphic component props with ref
export type PolymorphicComponentPropsWithRef<
  E extends React.ElementType,
  Props = Record<string, unknown>,
> = PolymorphicComponentProps<E, Props> & { ref?: PolymorphicRef<E> };

// Utility type for extracting element type from polymorphic props
export type ElementType<T> = T extends { as: infer E } ? E : never;

// Common HTML element types for convenience
export type HeadingElements = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TextElements = 'p' | 'span' | 'div' | 'label' | HeadingElements;
export type InteractiveElements =
  | 'button'
  | 'a'
  | 'input'
  | 'textarea'
  | 'select';
export type ContainerElements =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'main'
  | 'header'
  | 'footer';
