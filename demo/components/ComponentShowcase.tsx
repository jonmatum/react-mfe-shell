import React, { useState } from 'react';
import { 
  Card, 
  Badge, 
  Button, 
  Input, 
  Switch, 
  LoadingSpinner,
  Modal,
  Avatar,
  Text,
  Heading,
  Code,
  Divider,
  FeatureChip,
  useSettings 
} from '../../src';
import { 
  SwatchIcon,
  CubeIcon,
  PuzzlePieceIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const ComponentShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('atoms');
  const [modalOpen, setModalOpen] = useState(false);
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
          {activeTab === 'molecules' && <MoleculesTab />}
          {activeTab === 'interactive' && (
            <InteractiveTab 
              state={interactiveState}
              onUpdateState={updateInteractiveState}
              onAddTag={addTag}
              onRemoveTag={removeTag}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
          )}
        </div>
      </div>
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
          <h3 className="font-semibold text-text-primary">Other Components</h3>
          <p className="text-sm text-text-secondary">Additional atomic components</p>
        </Card.Header>
        <Card.Body>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Inputs */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Inputs</h4>
              <div className="space-y-3">
                <Input placeholder="Default input" />
                <Input placeholder="With error" error />
                <Input type="email" placeholder="Email input" />
              </div>
            </div>

            {/* Switches */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Switches</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch checked={true} onChange={() => {}} />
                  <span className="text-text-secondary">Enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch checked={false} onChange={() => {}} />
                  <span className="text-text-secondary">Disabled</span>
                </div>
              </div>
            </div>

            {/* Loading Spinners */}
            <div>
              <h4 className="font-medium text-text-primary mb-3">Loading</h4>
              <div className="flex items-center space-x-4">
                <LoadingSpinner size="sm" />
                <LoadingSpinner size="md" />
                <LoadingSpinner size="lg" />
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

const MoleculesTab: React.FC = () => (
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
        <h3 className="font-semibold text-text-primary">Other Molecules</h3>
        <p className="text-sm text-text-secondary">Additional compound components</p>
      </Card.Header>
      <Card.Body>
        <div className="space-y-4">
          <Divider />
          <p className="text-text-secondary text-center">More molecule components coming soon...</p>
          <Divider />
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
  onUpdateState: (updates: any) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const InteractiveTab: React.FC<InteractiveTabProps> = ({ 
  state, 
  onUpdateState, 
  onAddTag, 
  onRemoveTag, 
  modalOpen, 
  setModalOpen 
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
        <h3 className="font-semibold text-text-primary">Modal Example</h3>
        <p className="text-sm text-text-secondary">Accessible dialog with focus management</p>
      </Card.Header>
      <Card.Body>
        <Button onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>
        
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Example Modal"
        >
          <div className="space-y-4">
            <p className="text-text-secondary">
              This is an example modal with proper focus management and accessibility features.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setModalOpen(false)}>
                Confirm
              </Button>
            </div>
          </div>
        </Modal>
      </Card.Body>
    </Card>
  </div>
);

export default ComponentShowcase;
