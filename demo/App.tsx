import React, { useState } from 'react';
import {
  SettingsProvider,
  Button,
  Modal,
  LoadingSpinner,
  Switch,
  Input,
  Badge,
  Card,
  useSettings,
} from '../src';
import { 
  EnvelopeIcon, 
  UserIcon, 
  CheckCircleIcon, 
  SunIcon, 
  MoonIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import '../src/styles/index.css';

// Demo App showcasing all MFE Shell components
function DemoApp() {
  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <DemoHeader />
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="space-y-12">
            <HeroSection />
            <ThemeSection />
            <ButtonSection />
            <InputSection />
            <BadgeSection />
            <CardSection />
            <ModalSection />
            <LoadingSection />
          </div>
        </main>
        <DemoFooter />
      </div>
    </SettingsProvider>
  );
}

function DemoHeader() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <BeakerIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                React MFE Shell
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interactive Component Demo
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateSettings({ theme: settings.theme === 'dark' ? 'light' : 'dark' })}
              leftIcon={settings.theme === 'dark' ? 
                <SunIcon className="h-4 w-4" /> : 
                <MoonIcon className="h-4 w-4" />
              }
            >
              {settings.theme === 'dark' ? 'Light' : 'Dark'}
            </Button>
            
            <Badge variant="primary">v2.1.0</Badge>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <div className="text-center py-12">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        Production-Ready MFE Components
      </h2>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
        A comprehensive component library built with React, TypeScript, and Tailwind CSS. 
        Featuring atomic design principles, accessibility compliance, and modern tooling.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <Badge variant="success">142 Tests Passing</Badge>
        <Badge variant="primary">TypeScript</Badge>
        <Badge variant="secondary">Tailwind CSS</Badge>
        <Badge variant="default">Atomic Design</Badge>
        <Badge variant="success">WCAG AA</Badge>
      </div>
    </div>
  );
}

function ThemeSection() {
  const { settings, updateSettings } = useSettings();
  
  return (
    <Card variant="outlined">
      <Card.Header>
        <h2 className="text-xl font-semibold">Theme Settings</h2>
      </Card.Header>
      <Card.Body>
        <div className="space-y-4">
          <Switch
            checked={settings.theme === 'dark'}
            onChange={(checked) => updateSettings({ theme: checked ? 'dark' : 'light' })}
            label="Dark Mode"
            description="Toggle between light and dark themes"
          />
          
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Current theme: <Badge variant="primary">{settings.theme}</Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function ButtonSection() {
  return (
    <Card variant="outlined">
      <Card.Header>
        <h2 className="text-xl font-semibold">Button Components</h2>
      </Card.Header>
      <Card.Body>
        <div className="space-y-6">
          {/* Button Variants */}
          <div>
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          {/* Button Sizes */}
          <div>
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          {/* Button States */}
          <div>
            <h3 className="text-lg font-medium mb-3">States</h3>
            <div className="flex flex-wrap gap-3">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button leftIcon={<UserIcon className="h-4 w-4" />}>With Left Icon</Button>
              <Button rightIcon={<CheckCircleIcon className="h-4 w-4" />}>With Right Icon</Button>
            </div>
          </div>

          {/* Button Group */}
          <div>
            <h3 className="text-lg font-medium mb-3">Button Group</h3>
            <Button.Group attached>
              <Button variant="secondary">Left</Button>
              <Button variant="secondary">Middle</Button>
              <Button variant="primary">Right</Button>
            </Button.Group>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function InputSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  return (
    <Card variant="outlined">
      <Card.Header>
        <h2 className="text-xl font-semibold">Input Components</h2>
      </Card.Header>
      <Card.Body>
        <div className="space-y-4 max-w-md">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value);
            }}
            placeholder="Enter your email"
            leftIcon={<EnvelopeIcon className="h-5 w-5" />}
            error={emailError}
            required
          />
          
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            description="Must be at least 8 characters"
          />

          <Input
            label="Search"
            type="search"
            placeholder="Search..."
            size="lg"
          />

          <Input
            label="Disabled Input"
            value="This is disabled"
            disabled
          />
        </div>
      </Card.Body>
    </Card>
  );
}

function BadgeSection() {
  const [badges, setBadges] = useState([
    { id: 1, text: 'Active', variant: 'success' as const },
    { id: 2, text: 'Pending', variant: 'warning' as const },
    { id: 3, text: 'Error', variant: 'danger' as const },
  ]);

  const removeBadge = (id: number) => {
    setBadges(badges.filter(badge => badge.id !== id));
  };

  return (
    <Card variant="outlined">
      <Card.Header>
        <h2 className="text-xl font-semibold">Badge Components</h2>
      </Card.Header>
      <Card.Body>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-3">Variants</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">With Dots</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success" dot>Online</Badge>
              <Badge variant="warning" dot>Away</Badge>
              <Badge variant="danger" dot>Offline</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Removable</h3>
            <div className="flex flex-wrap gap-2">
              {badges.map(badge => (
                <Badge
                  key={badge.id}
                  variant={badge.variant}
                  removable
                  onRemove={() => removeBadge(badge.id)}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function CardSection() {
  return (
    <Card variant="outlined">
      <Card.Header>
        <h2 className="text-xl font-semibold">Card Components</h2>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="default" hoverable>
            <Card.Header>
              <h3 className="font-semibold">Default Card</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-600 dark:text-gray-400">
                This is a default card with hover effects.
              </p>
            </Card.Body>
          </Card>

          <Card variant="outlined">
            <Card.Header>
              <h3 className="font-semibold">Outlined Card</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-600 dark:text-gray-400">
                This card has a border outline.
              </p>
            </Card.Body>
          </Card>

          <Card variant="elevated" clickable onClick={() => alert('Card clicked!')}>
            <Card.Header>
              <h3 className="font-semibold">Clickable Card</h3>
            </Card.Header>
            <Card.Body>
              <p className="text-gray-600 dark:text-gray-400">
                Click this card to see the action.
              </p>
            </Card.Body>
            <Card.Footer>
              <Badge variant="primary">Clickable</Badge>
            </Card.Footer>
          </Card>
        </div>
      </Card.Body>
    </Card>
  );
}

function ModalSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card variant="outlined">
      <Card.Header>
        <h2 className="text-xl font-semibold">Modal Component</h2>
      </Card.Header>
      <Card.Body>
        <Button onClick={() => setIsModalOpen(true)}>
          Open Modal
        </Button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
        >
          <Modal.Body>
            <p className="mb-4">
              This is an example modal with enhanced accessibility features including:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Keyboard navigation (Tab/Shift+Tab)</li>
              <li>Escape key to close</li>
              <li>Focus management</li>
              <li>Backdrop click to close</li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
}

function LoadingSection() {
  return (
    <Card variant="outlined">
      <Card.Header>
        <h2 className="text-xl font-semibold">Loading Components</h2>
      </Card.Header>
      <Card.Body>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Sizes</h3>
            <div className="flex items-center gap-4">
              <LoadingSpinner size="xs" />
              <LoadingSpinner size="sm" />
              <LoadingSpinner size="md" />
              <LoadingSpinner size="lg" />
              <LoadingSpinner size="xl" />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Colors</h3>
            <div className="flex items-center gap-4">
              <LoadingSpinner color="primary" />
              <LoadingSpinner color="secondary" />
              <div className="bg-blue-600 p-2 rounded">
                <LoadingSpinner color="white" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">With Text</h3>
            <LoadingSpinner text="Loading content..." />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function DemoFooter() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center">
          <div className="flex justify-center space-x-6 text-sm mb-4">
            <a 
              href="https://github.com/jonmatum/react-mfe-shell" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
            <a 
              href="https://github.com/jonmatum/react-mfe-shell/wiki" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
            <a 
              href="https://www.npmjs.com/package/@jonmatum/react-mfe-shell" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              NPM Package
            </a>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 italic">
            Pura Vida & Happy Coding!
          </div>
        </div>
      </div>
    </footer>
  );
}

export default DemoApp;
