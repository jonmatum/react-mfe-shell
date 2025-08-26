import React, { useState, lazy, Suspense } from 'react';
import { METRICS } from './utils/metrics';
import {
  SettingsProvider,
  Button,
  FeatureChip,
  Badge,
  Card,
  Modal,
  useSettings,
} from '../src';
import { 
  SunIcon, 
  MoonIcon,
  RocketLaunchIcon,
  SparklesIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  CodeBracketIcon,
  BeakerIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

// Import modular showcase components
import { ThemingShowcase } from './components/showcase/ThemingShowcase';
import { HybridApproachShowcase } from './components/showcase/HybridApproachShowcase';
import { FormMoleculesShowcase } from './components/showcase/FormMoleculesShowcase';
import { ShowcaseSection } from './components/showcase/ShowcaseSection';
import DevelopmentInvestmentShowcase from './components/showcase/DevelopmentInvestmentShowcase';

// Lazy load heavier components for better initial load performance
const ComponentShowcase = lazy(() => import('./components/ComponentShowcase'));
const UtilityShowcase = lazy(() => import('./components/UtilityShowcase'));
const DRYShowcase = lazy(() => import('./components/DRYShowcase'));

// Import loading fallback for sections
import SectionLoadingFallback from './components/SectionLoadingFallback';

import { VERSION, REACT_VERSION } from './utils/version';

// Integration Modal Component
interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  const copyToClipboard = async (text: string, stepIndex: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStep(stepIndex);
      setTimeout(() => setCopiedStep(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const integrationSteps = [
    {
      title: "1. Install the Package",
      code: "npm install @jonmatum/react-mfe-shell",
      description: "Add the component library to your project"
    },
    {
      title: "2. Import Components",
      code: `import { 
  SettingsProvider, 
  Button, 
  Input, 
  Card 
} from '@jonmatum/react-mfe-shell';`,
      description: "Import the components you need"
    },
    {
      title: "3. Add Styles (Choose One)",
      code: `// Option A: Zero-Config (Recommended)
import '@jonmatum/react-mfe-shell/standalone';

// Option B: Tailwind Integration
import '@jonmatum/react-mfe-shell/styles';`,
      description: "Choose your preferred styling approach"
    },
    {
      title: "4. Use in Your App",
      code: `function App() {
  return (
    <SettingsProvider>
      <Card>
        <Card.Header>
          <h1>Welcome to MFE Shell</h1>
        </Card.Header>
        <Card.Body>
          <Input label="Email" type="email" />
          <Button variant="primary">Get Started</Button>
        </Card.Body>
      </Card>
    </SettingsProvider>
  );
}`,
      description: "Start building with production-ready components"
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <Modal.Header>
        <div className="flex items-center space-x-3">
          <RocketLaunchIcon className="w-6 h-6 text-primary-600" />
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Quick Integration Guide</h2>
            <p className="text-text-secondary text-sm">Get started in under 2 minutes</p>
          </div>
        </div>
      </Modal.Header>
      
      <Modal.Body>
        <div className="space-y-6">
          {integrationSteps.map((step, index) => (
            <div key={index} className="border border-border-primary rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-text-primary">{step.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(step.code, index)}
                  className="text-xs"
                >
                  {copiedStep === index ? '✓ Copied!' : 'Copy'}
                </Button>
              </div>
              <p className="text-text-secondary text-sm mb-3">{step.description}</p>
              <pre className="bg-surface-secondary p-3 rounded text-sm overflow-x-auto">
                <code className="text-text-primary">{step.code}</code>
              </pre>
            </div>
          ))}
          
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <SparklesIcon className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-primary-700 dark:text-primary-300 mb-1">
                  Ready to explore more?
                </h4>
                <p className="text-primary-600 dark:text-primary-400 text-sm mb-3">
                  Check out our comprehensive integration options and advanced features.
                </p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    onClose();
                    scrollToSection('hybrid-approach');
                  }}
                >
                  View Integration Options
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// Main Demo App - Clean and organized
function DemoApp() {
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-background-primary transition-colors duration-200">
        <DemoHeader />
        <main id="main-content" className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="space-y-16">
            <HeroSection onTryIntegration={() => setShowIntegrationModal(true)} />
            <HybridApproachShowcase />
            <DevelopmentInvestmentShowcase />
            <ThemingShowcase />
            
            <Suspense fallback={<SectionLoadingFallback />}>
              <ComponentShowcase />
            </Suspense>
            
            <FormMoleculesShowcase />
            
            <Suspense fallback={<SectionLoadingFallback />}>
              <DRYShowcase />
            </Suspense>
            
            <Suspense fallback={<SectionLoadingFallback />}>
              <UtilityShowcase />
            </Suspense>
            
            <PerformanceSection />
          </div>
        </main>
        <DemoFooter />
        
        {/* Integration Modal */}
        <IntegrationModal 
          isOpen={showIntegrationModal} 
          onClose={() => setShowIntegrationModal(false)} 
        />
      </div>
    </SettingsProvider>
  );
}

// Atomic components for the demo
const DemoHeader: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  
  return (
    <header className="bg-surface-primary border-b border-border-primary shadow-sm sticky top-0 z-40">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
      >
        Skip to main content
      </a>
      
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        {/* Simplified two-section layout */}
        <div className="flex items-center justify-between">
          
          {/* Left section: Logo and branding */}
          <div className="flex items-center space-x-3 min-w-0">
            <RocketLaunchIcon className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-text-primary truncate">
                React MFE Shell
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary">
                v{VERSION} - Hybrid Approach
              </p>
            </div>
          </div>

          {/* Right section: Minimalistic theme toggle */}
          <div className="flex-shrink-0">
            <ThemeToggle 
              isDark={settings.theme === 'dark'}
              onToggle={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: (checked: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => (
  <button
    onClick={() => onToggle(!isDark)}
    className="p-2 rounded-lg hover:bg-surface-secondary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
    aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
  >
    {isDark ? (
      <SunIcon className="w-5 h-5 text-text-secondary hover:text-text-primary transition-colors" />
    ) : (
      <MoonIcon className="w-5 h-5 text-text-secondary hover:text-text-primary transition-colors" />
    )}
  </button>
);

interface HeroSectionProps {
  onTryIntegration?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onTryIntegration }) => (
  <ShowcaseSection
    title={
      <>
        Production-Ready
        <span className="text-primary-600"> Micro Frontend Shell</span>
      </>
    }
    description={`A comprehensive component library with hybrid integration options, featuring ${METRICS.dry?.componentsAnalyzed || 20} production-ready components with built-in theming, accessibility, and multiple styling approaches.`}
    badge={{
      text: "Zero-Friction Components",
      variant: "primary",
      size: "md",
      icon: <SparklesIcon className="w-4 h-4" />
    }}
    className="text-center py-16"
  >
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      <FeatureChip variant="success" icon={<CpuChipIcon />}>
        {METRICS.tests.totalTests} Tests ({Math.round(METRICS.tests.coverage)}%+ Coverage)
      </FeatureChip>
      <FeatureChip variant="success" icon={<ShieldCheckIcon />}>
        100% Type Safe
      </FeatureChip>
      <FeatureChip variant="success" icon={<LightBulbIcon />}>
        WCAG AA Compliant
      </FeatureChip>
      <FeatureChip variant="primary" icon={<DocumentTextIcon />}>
        {METRICS.dry?.componentsAnalyzed || 20} Components
      </FeatureChip>
    </div>
    
    <div className="flex flex-wrap justify-center gap-4">
      <Button
        variant="primary"
        size="lg"
        icon={<CodeBracketIcon className="w-5 h-5" />}
        onClick={() => scrollToSection('component-showcase')}
      >
        View Components
      </Button>
      <Button
        variant="secondary"
        size="lg"
        icon={<BeakerIcon className="w-5 h-5" />}
        onClick={onTryIntegration || (() => scrollToSection('hybrid-approach'))}
      >
        Try Integration
      </Button>
    </div>
  </ShowcaseSection>
);

const PerformanceSection: React.FC = () => (
  <ShowcaseSection
    title="Performance & Bundle Size"
    description="Optimized for production with multiple integration options"
  >
    <div className="grid md:grid-cols-3 gap-6">
      <PerformanceCard title="Core Library" value={`${METRICS.bundle.esm?.sizeFormatted || '124.4KB'}`} subtitle="ESM Bundle" detail={`${METRICS.bundle.esm?.gzippedFormatted || '24KB'} gzipped`} color="primary" />
      <PerformanceCard title="Standalone CSS" value={`${METRICS.bundle.standalone?.sizeFormatted || '12.2KB'}`} subtitle="Zero-config" detail={`${METRICS.bundle.standalone?.gzippedFormatted || '2.8KB'} gzipped`} color="success" />
      <PerformanceCard title="Test Coverage" value={`${Math.round(METRICS.tests.coverage)}%+`} subtitle={`${METRICS.tests.totalTests} Tests`} detail="All passing" color="warning" />
    </div>
  </ShowcaseSection>
);

interface PerformanceCardProps {
  title: string;
  value: string;
  subtitle: string;
  detail: string;
  color: 'primary' | 'success' | 'warning';
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({ title, value, subtitle, detail, color }) => (
  <Card>
    <Card.Header>
      <h3 className="font-semibold">{title}</h3>
    </Card.Header>
    <Card.Body>
      <div className="text-center">
        <div className={`text-3xl font-bold mb-2 ${
          color === 'primary' ? 'text-primary-600' :
          color === 'success' ? 'text-success-600' :
          'text-warning-600'
        }`}>
          {value}
        </div>
        <p className="text-text-secondary">{subtitle}</p>
        <p className="text-sm text-text-tertiary mt-2">{detail}</p>
      </div>
    </Card.Body>
  </Card>
);

const DemoFooter: React.FC = () => (
  <footer className="bg-surface-secondary border-t border-border-primary">
    <div className="container mx-auto px-4 max-w-7xl">
      {/* Main Footer Content */}
      <div className="py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <FooterBrand />
          <FooterLinks />
          <FooterDocs />
        </div>
      </div>

      <FooterBottom />
      <FooterSignature />
    </div>
  </footer>
);

const FooterBrand: React.FC = () => (
  <div className="md:col-span-2">
    <div className="flex items-center space-x-2 mb-4">
      <RocketLaunchIcon className="w-8 h-8 text-primary-600" />
      <div>
        <h3 className="text-xl font-bold text-text-primary">React MFE Shell</h3>
        <p className="text-sm text-text-secondary">v{VERSION}</p>
      </div>
    </div>
    <p className="text-text-secondary mb-4 max-w-md">
      A production-ready micro frontend shell with comprehensive design system, 
      form molecules, and accessibility-first components.
    </p>
    <div className="flex space-x-4">
      <Badge variant="success" size="sm">{METRICS.tests.totalTests} Tests Passing</Badge>
      <Badge variant="primary" size="sm">{Math.round(METRICS.tests.coverage)}%+ Coverage</Badge>
      <Badge variant="secondary" size="sm">WCAG AA</Badge>
    </div>
  </div>
);

const FooterLinks: React.FC = () => (
  <div>
    <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
    <ul className="space-y-2">
      <li>
        <button 
          onClick={() => scrollToSection('component-showcase')}
          className="text-text-secondary hover:text-primary-600 transition-colors cursor-pointer"
        >
          Components
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('hybrid-approach')}
          className="text-text-secondary hover:text-primary-600 transition-colors cursor-pointer"
        >
          Integration
        </button>
      </li>
      <li>
        <a 
          href="https://www.npmjs.com/package/@jonmatum/react-mfe-shell" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-primary-600 transition-colors"
        >
          NPM Package
        </a>
      </li>
      <li>
        <a 
          href="https://github.com/jonmatum/react-mfe-shell" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-primary-600 transition-colors"
        >
          GitHub Repository
        </a>
      </li>
    </ul>
  </div>
);

const FooterDocs: React.FC = () => (
  <div>
    <h4 className="font-semibold text-text-primary mb-4">Documentation</h4>
    <ul className="space-y-2">
      {[
        { name: 'Integration Guide', path: 'integration-guide.md' },
        { name: 'API Reference', path: 'components.md' },
        { name: 'Migration Guide', path: 'migration-guide.md' },
        { name: 'Troubleshooting', path: 'troubleshooting.md' }
      ].map(({ name, path }) => (
        <li key={name}>
          <a 
            href={`https://github.com/jonmatum/react-mfe-shell/blob/main/docs/${path}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-primary-600 transition-colors"
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const FooterBottom: React.FC = () => (
  <div className="border-t border-border-primary py-6">
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex items-center space-x-4 text-sm text-text-secondary">
        <span>Built with {REACT_VERSION}</span>
        <span>•</span>
        <span>TypeScript</span>
        <span>•</span>
        <span>Tailwind CSS</span>
        <span>•</span>
        <span>Vite</span>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="text-sm text-text-secondary">
          Bundle: {METRICS.bundle.esm?.sizeFormatted} ({METRICS.bundle.esm?.gzippedFormatted} gzipped)
        </div>
        <div className="text-sm text-text-tertiary">
          <a 
            href="https://github.com/jonmatum/react-mfe-shell/blob/main/LICENSE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary-600 transition-colors"
          >
            MIT License
          </a>
        </div>
      </div>
    </div>
  </div>
);

const FooterSignature: React.FC = () => (
  <div className="border-t border-border-primary py-6">
    <div className="flex flex-col items-center justify-center text-center space-y-2">
      <p className="text-text-tertiary text-sm">
        Built with care for the micro frontend community
      </p>
      <p className="text-text-tertiary text-xs">
        <span className="text-primary-600">Pura Vida</span> & Happy Coding!
      </p>
    </div>
  </div>
);

// Utility functions
const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export default DemoApp;
