import React, { useState } from 'react';
import { 
  Card, 
  Badge, 
  Button, 
  Input, 
  Label,
  Switch, 
  LoadingSpinner,
  Modal,
  Avatar,
  Text,
  Heading,
  Code,
  Divider,
  FeatureChip,
  Icon,
  useSettings 
} from '../../src';
import { 
  SwatchIcon,
  CubeIcon,
  PuzzlePieceIcon,
  StarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const ComponentShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('atoms');
  const [modalOpen, setModalOpen] = useState(false);
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);
  const [removedBadges, setRemovedBadges] = useState<Set<string>>(new Set());
  const [interactiveState, setInteractiveState] = useState({
    notifications: 3,
    status: 'Online' as 'Online' | 'Away' | 'Offline',
    tags: ['React', 'TypeScript', 'Tailwind']
  });

  const { settings: _settings } = useSettings();

  const tabs = [
    { id: 'atoms', label: 'Atoms', icon: CubeIcon },
    { id: 'molecules', label: 'Molecules', icon: PuzzlePieceIcon },
    { id: 'interactive', label: 'Interactive', icon: StarIcon }
  ];

  const handleRemoveBadge = (badgeId: string) => {
    setRemovedBadges(prev => new Set([...prev, badgeId]));
  };

  const resetBadges = () => {
    setRemovedBadges(new Set());
  };

  const updateInteractiveState = (updates: Partial<typeof interactiveState>) => {
    setInteractiveState(prev => ({ ...prev, ...updates }));
  };

  const addTag = (tag: string) => {
    if (!interactiveState.tags.includes(tag)) {
      setInteractiveState(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tag: string) => {
    setInteractiveState(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  return (
    <section id="component-showcase" className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FeatureChip variant="primary" icon={<SwatchIcon />}>
              Component Library
            </FeatureChip>
          </div>
          
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Atomic Design System
          </h2>
          <p className="text-lg text-text-secondary max-w-4xl mx-auto mb-6">
            A comprehensive collection of 24 production-ready components built with DRY principles, 
            accessibility-first design, and seamless theme integration. Features enhanced Modal system 
            with Headless UI, compound components, and responsive design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-sm">
            <div className="p-4 bg-surface-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <PuzzlePieceIcon className="w-4 h-4 text-primary-500" />
                <h3 className="font-semibold text-text-primary">Enhanced Components</h3>
              </div>
              <p className="text-text-secondary">
                Modal with Headless UI integration, compound patterns, 9 sizes, 3 positions, 
                and mobile-first responsive design
              </p>
            </div>
            <div className="p-4 bg-surface-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheckIcon className="w-4 h-4 text-success-500" />
                <h3 className="font-semibold text-text-primary">Accessibility First</h3>
              </div>
              <p className="text-text-secondary">
                WCAG AA compliant with proper focus management, keyboard navigation, 
                and screen reader support
              </p>
            </div>
            <div className="p-4 bg-surface-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <SwatchIcon className="w-4 h-4 text-secondary-500" />
                <h3 className="font-semibold text-text-primary">Design Tokens</h3>
              </div>
              <p className="text-text-secondary">
                Consistent theming with design tokens, light/dark modes, 
                and seamless Tailwind integration
              </p>
            </div>
          </div>
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
                      ? 'bg-primary-600 text-white dark:bg-primary-500 dark:text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {activeTab === 'atoms' && (
            <AtomsTab 
              removedBadges={removedBadges}
              onRemoveBadge={handleRemoveBadge}
              onResetBadges={resetBadges}
            />
          )}
          {activeTab === 'molecules' && (
            <MoleculesTab 
              setModalOpen={setModalOpen}
              setFullscreenModalOpen={setFullscreenModalOpen}
            />
          )}
          {activeTab === 'interactive' && (
            <InteractiveTab 
              state={interactiveState}
              onUpdateState={updateInteractiveState}
              onAddTag={addTag}
              onRemoveTag={removeTag}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
              setFullscreenModalOpen={setFullscreenModalOpen}
            />
          )}
        </div>
      </div>
      
      {/* Fullscreen Modal - at component level for global access */}
      <Modal
        isOpen={fullscreenModalOpen}
        onClose={() => setFullscreenModalOpen(false)}
        size="fullscreen"
      >
        <Modal.Header showCloseButton onClose={() => setFullscreenModalOpen(false)}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-warning-500 dark:bg-warning-400 rounded-full flex items-center justify-center">
              <Icon name="ArrowsPointingOutIcon" className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Fullscreen Modal Experience</h3>
              <p className="text-sm text-text-secondary">Maximum space utilization for complex interfaces</p>
            </div>
          </div>
        </Modal.Header>
        
        <Modal.Body scrollable>
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-text-primary">Fullscreen Benefits</h4>
                <ul className="space-y-2 text-text-secondary">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckIcon" className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span>Maximum viewport utilization - no wasted space</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckIcon" className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span>Perfect for complex forms, dashboards, and data tables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckIcon" className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span>Immersive experience without distractions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckIcon" className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span>Mobile-friendly with proper responsive behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckIcon" className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                    <span>Smooth transitions and animations</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-text-primary">Use Cases</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-surface-secondary rounded-lg">
                    <h5 className="font-medium text-text-primary mb-2">Data Management</h5>
                    <p className="text-sm text-text-secondary">Large tables, spreadsheets, and data entry forms</p>
                  </div>
                  <div className="p-4 bg-surface-secondary rounded-lg">
                    <h5 className="font-medium text-text-primary mb-2">Media Viewers</h5>
                    <p className="text-sm text-text-secondary">Image galleries, video players, document viewers</p>
                  </div>
                  <div className="p-4 bg-surface-secondary rounded-lg">
                    <h5 className="font-medium text-text-primary mb-2">Dashboards</h5>
                    <p className="text-sm text-text-secondary">Analytics, monitoring, and reporting interfaces</p>
                  </div>
                  <div className="p-4 bg-surface-secondary rounded-lg">
                    <h5 className="font-medium text-text-primary mb-2">Editors</h5>
                    <p className="text-sm text-text-secondary">Code editors, rich text editors, design tools</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg">
              <h4 className="font-medium text-primary-800 dark:text-primary-200 mb-2">Implementation Example</h4>
              <Code className="text-sm">
{`<Modal
  isOpen={isFullscreenOpen}
  onClose={handleClose}
  size="fullscreen"
>
  <Modal.Header showCloseButton onClose={handleClose}>
    <h3>Fullscreen Interface</h3>
  </Modal.Header>
  
  <Modal.Body scrollable>
    {/* Your complex interface here */}
    <YourComplexComponent />
  </Modal.Body>
  
  <Modal.Footer justify="between">
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>`}
              </Code>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-text-primary">Technical Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-surface-secondary rounded-lg">
                  <Icon name="DevicePhoneMobileIcon" className="w-6 h-6 text-primary-500 mb-2" />
                  <h5 className="font-medium text-text-primary mb-1">Responsive</h5>
                  <p className="text-sm text-text-secondary">Adapts perfectly to all screen sizes</p>
                </div>
                <div className="p-4 bg-surface-secondary rounded-lg">
                  <Icon name="EyeIcon" className="w-6 h-6 text-primary-500 mb-2" />
                  <h5 className="font-medium text-text-primary mb-1">Accessible</h5>
                  <p className="text-sm text-text-secondary">Full keyboard navigation and screen reader support</p>
                </div>
                <div className="p-4 bg-surface-secondary rounded-lg">
                  <Icon name="BoltIcon" className="w-6 h-6 text-primary-500 mb-2" />
                  <h5 className="font-medium text-text-primary mb-1">Performant</h5>
                  <p className="text-sm text-text-secondary">Optimized animations and smooth interactions</p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        
        <Modal.Footer justify="between">
          <div className="flex items-center gap-2">
            <Icon name="InformationCircleIcon" className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">Press ESC to close</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => setFullscreenModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setFullscreenModalOpen(false)}>
              Awesome!
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

interface AtomsTabProps {
  removedBadges: Set<string>;
  onRemoveBadge: (badgeId: string) => void;
  onResetBadges: () => void;
}

const AtomsTab: React.FC<AtomsTabProps> = ({ removedBadges, onRemoveBadge, onResetBadges }) => {
  const badgeVariants = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const;
  const badgeSizes = ['sm', 'md', 'lg'] as const;
  const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div className="space-y-12">
      {/* Buttons */}
      <Card>
        <Card.Header>
          <h3 className="font-semibold text-text-primary">Buttons</h3>
          <p className="text-sm text-text-secondary">Interactive button components with multiple variants</p>
        </Card.Header>
        <Card.Body>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Badges */}
      <Card>
        <Card.Header>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-primary">Badges</h3>
              <p className="text-sm text-text-secondary">Status indicators with full theme support</p>
            </div>
            <Button size="sm" variant="secondary" onClick={onResetBadges}>
              Reset All
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="space-y-6">
            {/* Variants */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Variants</h4>
              <div className="flex flex-wrap gap-3">
                {badgeVariants.map((variant) => (
                  <Badge key={variant} variant={variant}>
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Sizes</h4>
              <div className="space-y-3">
                {badgeSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-text-secondary w-8">{size}:</span>
                    <div className="flex flex-wrap gap-2">
                      {['default', 'primary', 'secondary', 'success'].map((variant) => (
                        <Badge key={`${size}-${variant}`} variant={variant} size={size}>
                          {variant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Removable */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Removable Badges</h4>
              <div className="flex flex-wrap gap-2">
                {badgeVariants.map((variant) => (
                  !removedBadges.has(`removable-${variant}`) && (
                    <Badge 
                      key={`removable-${variant}`} 
                      variant={variant}
                      removable
                      onRemove={() => onRemoveBadge(`removable-${variant}`)}
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </Badge>
                  )
                ))}
              </div>
              {removedBadges.size > 0 && (
                <p className="text-sm text-text-secondary mt-2">
                  Removed {removedBadges.size} badge{removedBadges.size !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Numbers */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">With Numbers</h4>
              <div className="flex flex-wrap gap-3">
                <Badge variant="danger" size="sm">1</Badge>
                <Badge variant="warning" size="md">12</Badge>
                <Badge variant="success" size="lg">99+</Badge>
                <Badge variant="primary">New</Badge>
                <Badge variant="secondary">Beta</Badge>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Avatars */}
      <Card>
        <Card.Header>
          <h3 className="font-semibold text-text-primary">Avatars</h3>
          <p className="text-sm text-text-secondary">User avatars with image support and fallbacks</p>
        </Card.Header>
        <Card.Body>
          <div className="space-y-6">
            {/* Sizes */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Sizes</h4>
              <div className="flex items-center justify-center space-x-4">
                {avatarSizes.map((size) => (
                  <div key={size} className="text-center">
                    <Avatar size={size} name="John Doe" />
                    <p className="text-xs text-text-secondary mt-1">{size}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* With Images */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">With Images</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Avatar 
                    size="md" 
                    src="https://github.com/jonmatum.png" 
                    name="GitHub User" 
                  />
                  <div>
                    <p className="font-medium text-text-primary">GitHub User</p>
                    <p className="text-sm text-text-secondary">Software Engineer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Avatar size="md" name="Fallback User" />
                  <div>
                    <p className="font-medium text-text-primary">Fallback User</p>
                    <p className="text-sm text-text-secondary">No image provided</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Indicators */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Status Indicators</h4>
              <div className="space-y-4">
                {[
                  { name: 'Online User', status: 'online', color: 'bg-success-500' },
                  { name: 'Away User', status: 'away', color: 'bg-warning-500' },
                  { name: 'Offline User', status: 'offline', color: 'bg-text-tertiary' }
                ].map(({ name, status, color }) => (
                  <div key={name} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar size="md" name={name} />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${color} border-2 border-white rounded-full`} />
                    </div>
                    <span className="text-text-secondary">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Typography */}
      <Card>
        <Card.Header>
          <h3 className="font-semibold text-text-primary">Enhanced Typography System</h3>
          <p className="text-sm text-text-secondary">Comprehensive typography with 15+ semantic variants, responsive support, and advanced features</p>
        </Card.Header>
        <Card.Body>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Display & Headings */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Display & Headings</h4>
              <div className="space-y-3">
                <Text variant="display" size="4xl">Display Text</Text>
                <Text variant="headline" size="3xl">Headline</Text>
                <Text variant="title" size="2xl">Title</Text>
                <Text variant="subtitle" size="lg">Subtitle</Text>
              </div>
            </div>

            {/* Body Text Variants */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Body Text Variants</h4>
              <div className="space-y-3">
                <Text variant="lead" size="xl">Lead paragraph for introductions</Text>
                <Text variant="body-large">Large body text for emphasis</Text>
                <Text variant="body">Regular body text for content</Text>
                <Text variant="body-small">Small body text for details</Text>
                <Text variant="caption">Caption text for metadata</Text>
                <Text variant="helper">Helper text for guidance</Text>
              </div>
            </div>

            {/* Specialized Variants */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Specialized Text</h4>
              <div className="space-y-3">
                <Text variant="code">const example = 'inline code';</Text>
                <Text variant="kbd">Ctrl+K</Text>
                <Text variant="quote">"This is a quote"</Text>
                <Text variant="overline">OVERLINE TEXT</Text>
                <Text variant="label">Form Label</Text>
                <Text variant="muted">Muted text with reduced emphasis</Text>
              </div>
            </div>

            {/* Advanced Features */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Advanced Features</h4>
              <div className="space-y-3">
                <Text gradient size="xl" weight="bold">Gradient Text Effect</Text>
                <Text copyable>Click to copy this text</Text>
                <Text lineClamp={2}>This is a very long text that will be clamped to exactly two lines when it exceeds the available space, showing an ellipsis at the end.</Text>
                <Text truncate>This text will be truncated with ellipsis</Text>
              </div>
            </div>

            {/* Responsive Typography */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Responsive Typography</h4>
              <div className="space-y-3">
                <Text 
                  size={{ base: 'sm', md: 'lg', xl: '2xl' }}
                  weight={{ base: 'normal', md: 'semibold' }}
                  align={{ base: 'left', md: 'center' }}
                >
                  Responsive text that adapts to screen size
                </Text>
              </div>
            </div>

            {/* Typography Utilities */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Typography Utilities</h4>
              <div className="space-y-2">
                <Text transform="uppercase">Uppercase Transform</Text>
                <Text decoration="underline">Underlined Text</Text>
                <Text leading="tight" tracking="wide">Tight Leading, Wide Tracking</Text>
                <Text selectable={false}>Non-selectable Text</Text>
              </div>
            </div>
          </div>

          {/* New Component Examples */}
          <div className="mt-8 pt-6 border-t border-border-primary">
            <h4 className="font-medium text-text-primary mb-4">New Typography Components</h4>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Heading Component */}
              <div>
                <h5 className="font-medium text-text-secondary mb-3">Heading Component</h5>
                <div className="space-y-2">
                  <Heading level={1} size="2xl">Semantic H1</Heading>
                  <Heading level={2} size="xl">Semantic H2</Heading>
                  <Heading level={3} size="lg">Semantic H3</Heading>
                </div>
              </div>

              {/* Code Component */}
              <div>
                <h5 className="font-medium text-text-secondary mb-3">Code Component</h5>
                <div className="space-y-3">
                  <Code>Inline code example</Code>
                  <Code inline={false} copyable language="typescript">
{`function example() {
  return 'Block code with copy';
}`}
                  </Code>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Other Atoms */}
      <Card>
        <Card.Header>
          <h3 className="font-semibold text-text-primary">Additional Atoms</h3>
          <p className="text-sm text-text-secondary">Essential building blocks for forms and UI elements</p>
        </Card.Header>
        <Card.Body>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Inputs */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Inputs & Labels</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="demo-input">Email Address</Label>
                  <Input id="demo-input" placeholder="Enter email" />
                </div>
                <Input placeholder="With error state" error />
                <Input type="password" placeholder="Password input" />
              </div>
            </div>

            {/* Switches & Interactive */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Interactive Elements</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch checked={true} onChange={() => {}} />
                  <span className="text-text-secondary">Enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={false} onChange={() => {}} />
                  <span className="text-text-secondary">Disabled</span>
                </div>
                <div className="flex items-center space-x-4">
                  <LoadingSpinner size="sm" />
                  <LoadingSpinner size="md" />
                  <LoadingSpinner size="lg" />
                </div>
              </div>
            </div>

            {/* Layout & Visual */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Layout Elements</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-text-secondary text-sm mb-2">Horizontal Divider</p>
                  <Divider />
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-text-secondary text-sm">Vertical</span>
                  <Divider orientation="vertical" className="h-8" />
                  <span className="text-text-secondary text-sm">Divider</span>
                </div>
                <FeatureChip variant="primary">Feature Chip</FeatureChip>
              </div>
            </div>

            {/* Icons */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Icons & Visual</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="StarIcon" size="sm" />
                  <Icon name="StarIcon" size="md" />
                  <Icon name="StarIcon" size="lg" />
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckIcon" className="text-success-500" />
                  <span className="text-text-secondary text-sm">Success state</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="XMarkIcon" className="text-danger-500" />
                  <span className="text-text-secondary text-sm">Error state</span>
                </div>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

interface MoleculesTabProps {
  setModalOpen: (open: boolean) => void;
  setFullscreenModalOpen: (open: boolean) => void;
}

const MoleculesTab: React.FC<MoleculesTabProps> = ({ setModalOpen, setFullscreenModalOpen }) => (
  <div className="space-y-8">
    <Card>
      <Card.Header>
        <h3 className="font-semibold text-text-primary">Cards</h3>
        <p className="text-sm text-text-secondary">Compound card patterns with Header, Body, and Footer</p>
      </Card.Header>
      <Card.Body>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border border-border-primary">
            <Card.Header>
              <h4 className="font-semibold text-text-primary">Simple Card</h4>
            </Card.Header>
            <Card.Body>
              <p className="text-text-secondary">Card with header and body only.</p>
            </Card.Body>
          </Card>

          <Card className="border border-border-primary">
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

          <Card className="border-primary-200 bg-primary-50 dark:bg-primary-900/20 border">
            <Card.Header>
              <h4 className="font-semibold text-primary-700 dark:text-primary-300">Themed Card</h4>
            </Card.Header>
            <Card.Body>
              <p className="text-primary-600 dark:text-primary-400">Card with custom theme colors.</p>
            </Card.Body>
          </Card>
        </div>
      </Card.Body>
    </Card>

    <Card>
      <Card.Header>
        <h3 className="font-semibold text-text-primary">Enhanced Modal System</h3>
        <p className="text-sm text-text-secondary">
          Flexible, accessible modals with Headless UI integration and compound components
        </p>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">Key Features:</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Headless UI integration for accessibility</li>
              <li>• Compound components (Header, Body, Footer)</li>
              <li>• 10 responsive size variants (including fullscreen)</li>
              <li>• 3 position options (center, top, bottom)</li>
              <li>• Mobile-first responsive design</li>
              <li>• Custom styling and backdrop options</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-text-primary">Accessibility:</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• WCAG AA compliant</li>
              <li>• Automatic focus management</li>
              <li>• Keyboard navigation support</li>
              <li>• Screen reader optimized</li>
              <li>• Proper ARIA attributes</li>
              <li>• Focus trap implementation</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg mb-4">
          <p className="text-sm text-primary-800 dark:text-primary-200">
            <strong>New API:</strong> The Modal now uses compound components for better flexibility. 
            The old <code className="bg-primary-100 dark:bg-primary-800 px-1 rounded">title</code> prop is deprecated 
            in favor of <code className="bg-primary-100 dark:bg-primary-800 px-1 rounded">Modal.Header</code>.
          </p>
        </div>
        
        <div className="flex gap-3 mb-4">
          <Button onClick={() => setModalOpen(true)} variant="primary">
            Try Enhanced Modal
          </Button>
          <Button onClick={() => setFullscreenModalOpen(true)} variant="warning">
            Try Fullscreen
          </Button>
        </div>
      </Card.Body>
    </Card>

    <Card>
      <Card.Header>
        <h3 className="font-semibold text-text-primary">Form Molecules</h3>
        <p className="text-sm text-text-secondary">
          Advanced form components with validation and accessibility features
        </p>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <h4 className="font-medium text-text-primary mb-2">Available Components:</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• FormField - Universal form wrapper</li>
              <li>• SearchBox - Debounced search with clear</li>
              <li>• Select - Dropdown with search & multi-select</li>
              <li>• Checkbox - Accessible with indeterminate state</li>
              <li>• Radio - RadioGroup with full accessibility</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-2">Advanced Features:</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• SwitchField - Enhanced switch with labels</li>
              <li>• Textarea - Auto-resizing text areas</li>
              <li>• FileUpload - Drag-and-drop with preview</li>
              <li>• Built-in validation support</li>
              <li>• Consistent error handling</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-700 rounded-lg">
          <p className="text-sm text-primary-800 dark:text-primary-200">
            <strong>Form Showcase:</strong> See the dedicated Form Molecules section below 
            for interactive examples of all form components with validation and real-world usage patterns.
          </p>
        </div>
      </Card.Body>
    </Card>
  </div>
);

interface InteractiveTabProps {
  state: {
    notifications: number;
    status: 'Online' | 'Away' | 'Offline';
    tags: string[];
  };
  onUpdateState: (updates: Partial<InteractiveTabProps['state']>) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  setFullscreenModalOpen: (open: boolean) => void;
}

const InteractiveTab: React.FC<InteractiveTabProps> = ({ 
  state, 
  onUpdateState, 
  onAddTag, 
  onRemoveTag, 
  modalOpen, 
  setModalOpen,
  setFullscreenModalOpen
}) => (
  <div className="space-y-8">
    <Card>
      <Card.Header>
        <h3 className="font-semibold text-text-primary">Interactive Examples</h3>
        <p className="text-sm text-text-secondary">Real-world usage scenarios</p>
      </Card.Header>
      <Card.Body>
        <div className="space-y-6">
          {/* Notifications */}
          <div className="flex items-center space-x-3">
            <span className="text-text-secondary">Notifications:</span>
            <Badge variant="danger" size="sm">{state.notifications}</Badge>
            <div className="flex space-x-2">
              <Button 
                size="xs" 
                variant="secondary"
                onClick={() => onUpdateState({ notifications: Math.max(0, state.notifications - 1) })}
              >
                -
              </Button>
              <Button 
                size="xs" 
                variant="secondary"
                onClick={() => onUpdateState({ notifications: state.notifications + 1 })}
              >
                +
              </Button>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-3">
            <span className="text-text-secondary">Status:</span>
            <Badge 
              variant={
                state.status === 'Online' ? 'success' : 
                state.status === 'Away' ? 'warning' : 
                'secondary'
              }
            >
              {state.status}
            </Badge>
            <select 
              value={state.status}
              onChange={(e) => onUpdateState({ status: e.target.value })}
              className="text-sm border border-border-primary rounded px-2 py-1 bg-surface-primary text-text-primary"
            >
              <option value="Online">Online</option>
              <option value="Away">Away</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-text-secondary">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {state.tags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="primary" 
                    size="sm"
                    removable
                    onRemove={() => onRemoveTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button size="xs" variant="secondary" onClick={() => onAddTag('Vite')}>
                Add Vite
              </Button>
              <Button size="xs" variant="secondary" onClick={() => onAddTag('Jest')}>
                Add Jest
              </Button>
              <Button size="xs" variant="secondary" onClick={() => onAddTag('ESLint')}>
                Add ESLint
              </Button>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>

    <Card>
      <Card.Header>
        <h3 className="font-semibold text-text-primary">Enhanced Modal System</h3>
        <p className="text-sm text-text-secondary">
          Flexible, accessible modals with Headless UI integration, compound components, and responsive design
        </p>
      </Card.Header>
      <Card.Body>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Button 
            onClick={() => setModalOpen(true)}
            variant="primary"
          >
            Basic Modal
          </Button>
          <Button 
            onClick={() => setModalOpen(true)}
            variant="secondary"
          >
            Compound Components
          </Button>
          <Button 
            onClick={() => setModalOpen(true)}
            variant="success"
          >
            Responsive Sizes
          </Button>
          <Button 
            onClick={() => setFullscreenModalOpen(true)}
            variant="warning"
          >
            Fullscreen Modal
          </Button>
        </div>
        
        <div className="p-4 bg-surface-secondary rounded-lg mb-4">
          <h4 className="font-medium text-text-primary mb-2">Key Features:</h4>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• <strong>Headless UI Integration:</strong> Robust accessibility and focus management</li>
            <li>• <strong>Compound Components:</strong> Modal.Header, Modal.Body, Modal.Footer</li>
            <li>• <strong>10 Size Variants:</strong> xs, sm, md, lg, xl, 2xl, 3xl, 4xl, full, fullscreen</li>
            <li>• <strong>3 Positions:</strong> center, top, bottom</li>
            <li>• <strong>Mobile-First:</strong> Responsive design with adaptive spacing</li>
            <li>• <strong>Customizable:</strong> Backdrop, styling, and behavior options</li>
          </ul>
        </div>
        
        {/* Enhanced Modal with compound components */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          size="lg"
          position="center"
        >
          <Modal.Header showCloseButton onClose={() => setModalOpen(false)}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary-500 dark:bg-primary-400 rounded-full flex items-center justify-center">
                <StarIcon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">Enhanced Modal System</h3>
                <p className="text-sm text-text-secondary">Powered by Headless UI</p>
              </div>
            </div>
          </Modal.Header>
          
          <Modal.Body scrollable>
            <div className="space-y-4">
              <p className="text-text-secondary">
                This modal demonstrates the enhanced compound component pattern with improved scrolling:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-surface-secondary rounded-lg">
                  <h4 className="font-medium text-text-primary mb-1">Accessibility</h4>
                  <p className="text-xs text-text-secondary">WCAG AA compliant with proper focus management</p>
                </div>
                <div className="p-3 bg-surface-secondary rounded-lg">
                  <h4 className="font-medium text-text-primary mb-1">Enhanced Scrolling</h4>
                  <p className="text-xs text-text-secondary">Content grows indefinitely with proper scrolling</p>
                </div>
                <div className="p-3 bg-surface-secondary rounded-lg">
                  <h4 className="font-medium text-text-primary mb-1">Flexible Layout</h4>
                  <p className="text-xs text-text-secondary">Flex-based layout with optimal space distribution</p>
                </div>
                <div className="p-3 bg-surface-secondary rounded-lg">
                  <h4 className="font-medium text-text-primary mb-1">Responsive</h4>
                  <p className="text-xs text-text-secondary">Mobile-first design with adaptive behavior</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-text-primary">Scrolling Demonstration</h4>
                <p className="text-sm text-text-secondary">
                  The modal now allows content to grow without height constraints. 
                  Scroll down to see more content:
                </p>
                
                {/* Generate content to demonstrate scrolling */}
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="p-3 border border-border-primary rounded-md">
                    <h5 className="font-medium text-text-primary">Feature {i + 1}</h5>
                    <p className="text-sm text-text-secondary">
                      This demonstrates the improved scrolling behavior. The modal body 
                      can now accommodate large amounts of content while maintaining 
                      proper scrolling and fixed header/footer positioning.
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-700 rounded-lg">
                <p className="text-sm text-success-800 dark:text-success-200">
                  <strong>Fixed:</strong> Modal content can now grow indefinitely without height constraints, 
                  providing better UX for large content with proper scrolling behavior.
                </p>
              </div>
            </div>
          </Modal.Body>
          
          <Modal.Footer justify="between">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Learn More
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Got It!
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  </div>
);

export default ComponentShowcase;
