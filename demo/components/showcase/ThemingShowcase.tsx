import React, { useState, useEffect } from 'react';
import { Button, Badge, Input, Switch, LoadingSpinner } from '../../../src';
import { ShowcaseSection, ShowcaseCard } from './ShowcaseSection';
import { DEMO_THEMES, applyTheme, resetToDefaultTheme, ThemeConfig } from '../../utils/themeUtils';
import { PaintBrushIcon } from '@heroicons/react/24/outline';

export const ThemingShowcase: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const currentTheme = DEMO_THEMES.find(t => t.id === selectedTheme);

  useEffect(() => {
    if (currentTheme) {
      applyTheme(currentTheme);
    }
    
    return () => {
      if (selectedTheme !== 'default') {
        resetToDefaultTheme();
      }
    };
  }, [selectedTheme, currentTheme]);

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  return (
    <ShowcaseSection
      title="Custom Brand Colors"
      description="Easily customize components with your brand colors. All themes support light/dark mode and maintain accessibility standards."
      badge={{
        text: "Theming System",
        variant: "secondary",
        icon: <PaintBrushIcon />
      }}
    >
      <div className="space-y-8">
        {/* Theme Selector */}
        <div className="grid md:grid-cols-4 gap-4">
          {DEMO_THEMES.map((theme) => (
            <ThemeSelector
              key={theme.id}
              theme={theme}
              isSelected={selectedTheme === theme.id}
              onSelect={() => handleThemeChange(theme.id)}
            />
          ))}
        </div>

        {/* Live Preview */}
        <ShowcaseCard
          title={`${currentTheme?.name} Theme Preview`}
          description="Components automatically update with the selected theme colors"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <LiveComponentPreview currentTheme={currentTheme} selectedTheme={selectedTheme} />
            <ThemeConfiguration currentTheme={currentTheme} />
          </div>
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  );
};

interface ThemeSelectorProps {
  theme: ThemeConfig;
  isSelected: boolean;
  onSelect: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ theme, isSelected, onSelect }) => (
  <button
    onClick={onSelect}
    className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
      isSelected
        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
        : 'border-border-primary hover:border-border-secondary'
    }`}
  >
    <div className="flex items-center space-x-3 mb-2">
      <div 
        className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
        style={{ backgroundColor: theme.primary }}
      />
      <span className="font-medium text-text-primary">{theme.name}</span>
    </div>
    <p className="text-sm text-text-secondary">{theme.description}</p>
  </button>
);

interface LiveComponentPreviewProps {
  currentTheme?: ThemeConfig;
  selectedTheme: string;
}

const LiveComponentPreview: React.FC<LiveComponentPreviewProps> = ({ currentTheme, selectedTheme }) => (
  <div className="space-y-6">
    <h4 className="font-medium text-text-primary">Live Components</h4>
    <div className="space-y-6">
      {/* Buttons */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-secondary">Buttons:</p>
        <div className="space-y-3">
          <Button 
            variant="primary" 
            size="md"
            style={{ 
              backgroundColor: currentTheme?.primary,
              borderColor: currentTheme?.primary 
            }}
            className="hover:opacity-90"
          >
            Primary Button
          </Button>
          <Button 
            variant="primary" 
            size="sm"
            style={{ 
              backgroundColor: currentTheme?.primary,
              borderColor: currentTheme?.primary 
            }}
            className="hover:opacity-90"
          >
            Small Primary
          </Button>
        </div>
      </div>
      
      {/* Badges */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-secondary">Badges:</p>
        <div className="flex flex-wrap gap-2">
          <Badge 
            variant="primary"
            style={{ 
              backgroundColor: currentTheme?.primary,
              borderColor: currentTheme?.primary 
            }}
          >
            Primary Badge
          </Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </div>
      
      {/* Input */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-secondary">Input:</p>
        <Input placeholder="Themed input field" />
      </div>
      
      {/* Switch */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-secondary">Switch:</p>
        <div className="flex items-center space-x-3">
          <div key={selectedTheme}>
            <Switch 
              checked={true} 
              onChange={() => {}}
              style={{
                backgroundColor: currentTheme?.primary,
                borderColor: currentTheme?.primary
              }}
            />
          </div>
          <span className="text-text-secondary">Themed switch</span>
        </div>
      </div>
      
      {/* Loading Spinners */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-text-secondary">Loading Spinners:</p>
        <div className="flex items-center space-x-4">
          <div 
            key={`spinner-sm-${selectedTheme}`}
            style={{ color: currentTheme?.primary }}
          >
            <LoadingSpinner size="sm" color="current" />
          </div>
          <div 
            key={`spinner-md-${selectedTheme}`}
            style={{ color: currentTheme?.primary }}
          >
            <LoadingSpinner size="md" color="current" />
          </div>
          <span className="text-text-secondary">Themed spinners</span>
        </div>
      </div>
    </div>
  </div>
);

interface ThemeConfigurationProps {
  currentTheme?: ThemeConfig;
}

const ThemeConfiguration: React.FC<ThemeConfigurationProps> = ({ currentTheme }) => (
  <div className="space-y-4">
    <h4 className="font-medium text-text-primary">Configuration</h4>
    <div className="bg-surface-secondary p-4 rounded-lg">
      <h5 className="font-medium text-text-primary mb-2">Tailwind Config</h5>
      <pre className="text-sm overflow-x-auto">
        <code className="text-text-primary">
{`// tailwind.config.js
module.exports = {
  presets: [mfeShellPreset],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '${currentTheme?.primary}',
          600: '${currentTheme?.primaryHover}',
        }
      }
    }
  }
}`}
        </code>
      </pre>
    </div>
    
    <div className="bg-surface-secondary p-4 rounded-lg">
      <h5 className="font-medium text-text-primary mb-2">CSS Custom Properties</h5>
      <pre className="text-sm overflow-x-auto">
        <code className="text-text-primary">
{`:root {
  --color-primary-500: ${currentTheme?.cssVars['--color-primary-500']};
  --color-primary-600: ${currentTheme?.cssVars['--color-primary-600']};
  --color-primary-700: ${currentTheme?.cssVars['--color-primary-700']};
}`}
        </code>
      </pre>
    </div>
    
    <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
      <p className="text-sm text-primary-700 dark:text-primary-300">
        <strong>Live Preview:</strong> The components above are using the selected theme colors in real-time!
      </p>
    </div>
  </div>
);
