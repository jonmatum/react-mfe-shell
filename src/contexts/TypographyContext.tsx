import React, { createContext, useContext, useMemo } from 'react';
import { TypographyContextValue, TextSize, TextWeight } from '../types';

/**
 * Typography Context
 *
 * Provides global typography settings and inheritance.
 * Allows for consistent typography scaling across the application.
 */

const TypographyContext = createContext<TypographyContextValue | null>(null);

interface TypographyProviderProps {
  children: React.ReactNode;
  baseSize?: TextSize;
  baseWeight?: TextWeight;
  baseColor?: string;
  scale?: number;
  lineHeight?: number;
}

/**
 * Typography Provider Component
 *
 * Provides typography context to child components.
 * Enables consistent typography scaling and theming.
 */
export function TypographyProvider({
  children,
  baseSize = 'base',
  baseWeight = 'normal',
  baseColor = 'text-text-primary',
  scale = 1,
  lineHeight = 1.5,
}: TypographyProviderProps) {
  const contextValue = useMemo<TypographyContextValue>(
    () => ({
      baseSize,
      baseWeight,
      baseColor,
      scale,
      lineHeight,
    }),
    [baseSize, baseWeight, baseColor, scale, lineHeight]
  );

  return (
    <TypographyContext.Provider value={contextValue}>
      {children}
    </TypographyContext.Provider>
  );
}

/**
 * Hook to use typography context
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useTypography(): TypographyContextValue {
  const context = useContext(TypographyContext);

  // Return default values if no context is provided
  if (!context) {
    return {
      baseSize: 'base',
      baseWeight: 'normal',
      baseColor: 'text-text-primary',
      scale: 1,
      lineHeight: 1.5,
    };
  }

  return context;
}

/**
 * Hook to get scaled typography values
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useScaledTypography() {
  const { scale, baseSize, baseWeight, baseColor } = useTypography();

  return useMemo(() => {
    // Size scaling logic
    const sizeMap: Record<TextSize, TextSize> = {
      xs: scale > 1.2 ? 'sm' : 'xs',
      sm: scale > 1.2 ? 'base' : 'sm',
      base: scale > 1.2 ? 'lg' : scale < 0.8 ? 'sm' : 'base',
      lg: scale > 1.2 ? 'xl' : scale < 0.8 ? 'base' : 'lg',
      xl: scale > 1.2 ? '2xl' : scale < 0.8 ? 'lg' : 'xl',
      '2xl': scale > 1.2 ? '3xl' : scale < 0.8 ? 'xl' : '2xl',
      '3xl': scale > 1.2 ? '4xl' : scale < 0.8 ? '2xl' : '3xl',
      '4xl': scale > 1.2 ? '5xl' : scale < 0.8 ? '3xl' : '4xl',
      '5xl': scale > 1.2 ? '6xl' : scale < 0.8 ? '4xl' : '5xl',
      '6xl': scale > 1.2 ? '7xl' : scale < 0.8 ? '5xl' : '6xl',
      '7xl': scale > 1.2 ? '8xl' : scale < 0.8 ? '6xl' : '7xl',
      '8xl': scale > 1.2 ? '9xl' : scale < 0.8 ? '7xl' : '8xl',
      '9xl': scale < 0.8 ? '8xl' : '9xl',
    };

    return {
      getScaledSize: (size: TextSize): TextSize => sizeMap[size] || size,
      baseSize,
      baseWeight,
      baseColor,
      scale,
    };
  }, [scale, baseSize, baseWeight, baseColor]);
}
