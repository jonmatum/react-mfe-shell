export interface ThemeConfig {
  id: string;
  name: string;
  primary: string;
  primaryHover: string;
  description: string;
  cssVars: Record<string, string>;
}

export const DEMO_THEMES: ThemeConfig[] = [
  {
    id: 'default',
    name: 'Default',
    primary: '#3b82f6',
    primaryHover: '#2563eb',
    description: 'Clean blue theme',
    cssVars: {
      '--color-primary-500': '59 130 246',
      '--color-primary-600': '37 99 235',
      '--color-primary-700': '29 78 216'
    }
  },
  {
    id: 'saas',
    name: 'SaaS',
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    description: 'Professional blue',
    cssVars: {
      '--color-primary-500': '37 99 235',
      '--color-primary-600': '29 78 216',
      '--color-primary-700': '30 64 175'
    }
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    primary: '#a855f7',
    primaryHover: '#9333ea',
    description: 'Purple brand',
    cssVars: {
      '--color-primary-500': '168 85 247',
      '--color-primary-600': '147 51 234',
      '--color-primary-700': '126 34 206'
    }
  },
  {
    id: 'fintech',
    name: 'Fintech',
    primary: '#22c55e',
    primaryHover: '#16a34a',
    description: 'Green finance',
    cssVars: {
      '--color-primary-500': '34 197 94',
      '--color-primary-600': '22 163 74',
      '--color-primary-700': '21 128 61'
    }
  }
];

export const applyTheme = (theme: ThemeConfig) => {
  const root = document.documentElement;
  Object.entries(theme.cssVars).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-primary-rgb', theme.cssVars['--color-primary-500']);
};

export const resetToDefaultTheme = () => {
  const defaultTheme = DEMO_THEMES.find(t => t.id === 'default');
  if (defaultTheme) {
    applyTheme(defaultTheme);
  }
};
