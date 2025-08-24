import React, { useState } from 'react';
import { 
  Card, 
  Badge, 
  Button, 
  Input, 
  Switch, 
  LoadingSpinner,
  Modal,
  useSettings 
} from '../../src';
import { 
  SwatchIcon,
  CubeIcon,
  PuzzlePieceIcon,
  StarIcon,
  HeartIcon,
  BoltIcon,
  ShieldCheckIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const ComponentShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('atoms');
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    notifications: true,
    theme: 'light'
  });
  const [removedBadges, setRemovedBadges] = useState<Set<string>>(new Set());

  const { settings } = useSettings();

  const tabs = [
    { id: 'atoms', label: 'Atoms', icon: CubeIcon },
    { id: 'molecules', label: 'Molecules', icon: PuzzlePieceIcon },
    { id: 'showcase', label: 'Interactive', icon: StarIcon }
  ];

  const handleRemoveBadge = (badgeId: string) => {
    setRemovedBadges(prev => new Set([...prev, badgeId]));
  };

  const resetBadges = () => {
    setRemovedBadges(new Set());
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-primary-50 dark:bg-primary-900/30 px-4 py-2 rounded-full">
              <SwatchIcon className="w-5 h-5 text-primary-600" />
              <span className="text-primary-700 dark:text-primary-300 font-medium">
                Component Library
              </span>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Atomic Design System
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            A comprehensive collection of reusable components built with DRY principles, 
            accessibility-first design, and seamless theme integration.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-surface-secondary rounded-lg p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Atoms Tab */}
        {activeTab === 'atoms' && (
          <div className="space-y-8">
            {/* Buttons */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                <BoltIcon className="w-5 h-5 text-primary-600" />
                <span>Buttons</span>
                <Badge variant="success" size="sm">DRY Optimized</Badge>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="success">Success</Button>
                    <Button variant="warning">Warning</Button>
                    <Button variant="danger">Danger</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Sizes</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">States & Icons</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button leftIcon={<HeartIcon className="w-4 h-4" />}>With Icon</Button>
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                    <Button fullWidth>Full Width</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text-primary flex items-center space-x-2">
                  <ShieldCheckIcon className="w-5 h-5 text-primary-600" />
                  <span>Badges</span>
                  <Badge variant="success" size="sm">Theme Aware</Badge>
                </h3>
                {removedBadges.size > 0 && (
                  <Button size="sm" variant="ghost" onClick={resetBadges}>
                    Reset Badges
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Variants</h4>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Sizes & Dots</h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge size="sm">Small</Badge>
                    <Badge size="md">Medium</Badge>
                    <Badge size="lg">Large</Badge>
                    <Badge variant="success" dot size="sm" />
                    <Badge variant="warning" dot size="md" />
                    <Badge variant="danger" dot size="lg" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-text-primary mb-3">Removable</h4>
                  <div className="flex flex-wrap gap-3">
                    {['React', 'TypeScript', 'Tailwind', 'Vite'].map((tech) => {
                      const badgeId = `tech-${tech}`;
                      if (removedBadges.has(badgeId)) return null;
                      
                      return (
                        <Badge
                          key={badgeId}
                          variant="primary"
                          removable
                          onRemove={() => handleRemoveBadge(badgeId)}
                        >
                          {tech}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>

            {/* Inputs */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center space-x-2">
                <EyeIcon className="w-5 h-5 text-primary-600" />
                <span>Inputs</span>
                <Badge variant="success" size="sm">Validation Ready</Badge>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="Default Input"
                    placeholder="Enter text..."
                  />
                  <Input
                    label="With Description"
                    placeholder="Enter email..."
                    description="We'll never share your email"
                  />
                  <Input
                    label="Error State"
                    placeholder="Enter password..."
                    error="Password is required"
                  />
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="With Icons"
                    placeholder="Search..."
                    leftIcon={<EyeIcon className="w-4 h-4" />}
                  />
                  <Input
                    label="Disabled"
                    placeholder="Disabled input"
                    disabled
                  />
                  <Input
                    label="Read Only"
                    value="Read only value"
                    readOnly
                  />
                </div>
              </div>
            </Card>

            {/* Switches & Loading */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">Switches</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">Notifications</span>
                    <Switch
                      checked={formData.notifications}
                      onChange={(checked) => setFormData(prev => ({ ...prev, notifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">Dark Mode</span>
                    <Switch
                      checked={settings.theme === 'dark'}
                      onChange={(checked) => console.warn('Theme toggle:', checked)}
                      size="sm"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Disabled</span>
                    <Switch disabled />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-4">Loading Spinners</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <LoadingSpinner size="sm" />
                    <span className="text-text-secondary">Small</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <LoadingSpinner size="md" />
                    <span className="text-text-secondary">Medium</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <LoadingSpinner size="lg" />
                    <span className="text-text-secondary">Large</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Molecules Tab */}
        {activeTab === 'molecules' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">Cards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-4">
                  <Card.Header>
                    <h4 className="font-semibold text-text-primary">Simple Card</h4>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-text-secondary">Basic card with header and body.</p>
                  </Card.Body>
                </Card>

                <Card className="p-4">
                  <Card.Header>
                    <h4 className="font-semibold text-text-primary">With Footer</h4>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-text-secondary">Card with all sections.</p>
                  </Card.Body>
                  <Card.Footer>
                    <Button size="sm" variant="primary">Action</Button>
                  </Card.Footer>
                </Card>

                <Card className="p-4 border-primary-200 bg-primary-50 dark:bg-primary-900/20">
                  <Card.Header>
                    <h4 className="font-semibold text-primary-700 dark:text-primary-300">Themed Card</h4>
                  </Card.Header>
                  <Card.Body>
                    <p className="text-primary-600 dark:text-primary-400">Custom styled card.</p>
                  </Card.Body>
                </Card>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">Modals</h3>
              <div className="space-y-4">
                <Button onClick={() => setModalOpen(true)}>
                  Open Modal
                </Button>
                
                <Modal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title="Demo Modal"
                >
                  <div className="space-y-4">
                    <p className="text-text-secondary">
                      This is a demo modal showcasing the modal component with 
                      proper accessibility features and theme support.
                    </p>
                    
                    <div className="space-y-3">
                      <Input
                        label="Name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="secondary" onClick={() => setModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={() => setModalOpen(false)}>
                        Save
                      </Button>
                    </div>
                  </div>
                </Modal>
              </div>
            </Card>
          </div>
        )}

        {/* Interactive Showcase Tab */}
        {activeTab === 'showcase' && (
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Interactive Component Demo
              </h3>
              <p className="text-text-secondary mb-6">
                Experience how all components work together in a real-world scenario.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">User Profile</h4>
                    <div className="space-y-4">
                      <Input
                        label="Full Name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Preferences</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-text-primary">Email Notifications</span>
                        <Switch
                          checked={formData.notifications}
                          onChange={(checked) => setFormData(prev => ({ ...prev, notifications: checked }))}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Status</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="success">Active</Badge>
                      <Badge variant="primary">Premium</Badge>
                      {formData.notifications && <Badge variant="warning">Notifications On</Badge>}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3">Actions</h4>
                    <div className="space-y-3">
                      <Button fullWidth variant="primary">
                        Save Profile
                      </Button>
                      <Button fullWidth variant="secondary">
                        Reset Changes
                      </Button>
                      <Button 
                        fullWidth 
                        variant="danger"
                        leftIcon={<TrashIcon className="w-4 h-4" />}
                      >
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComponentShowcase;
