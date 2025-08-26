import React, { useState } from 'react';
import { METRICS } from '../../utils/metrics';
import { Card } from '../../../src';
import { ShowcaseSection, ShowcaseCard, ComponentGrid } from './ShowcaseSection';
import { 
  RocketLaunchIcon, 
  SwatchIcon, 
  AdjustmentsHorizontalIcon,
  CodeBracketIcon 
} from '@heroicons/react/24/outline';

interface IntegrationApproach {
  id: string;
  name: string;
  description: string;
  size: string;
  icon: React.ReactNode;
  code: string;
}

const INTEGRATION_APPROACHES: IntegrationApproach[] = [
  {
    id: 'standalone',
    name: 'Zero-Config',
    description: 'Works out of the box, no configuration needed',
    size: METRICS.bundle.standalone?.sizeFormatted || '12KB',
    icon: <RocketLaunchIcon className="w-6 h-6" />,
    code: `import { Button } from '@jonmatum/react-mfe-shell';
import '@jonmatum/react-mfe-shell/standalone';

<Button variant="primary">Ready to use!</Button>`
  },
  {
    id: 'tailwind',
    name: 'Tailwind Preset',
    description: 'Full Tailwind power with design tokens',
    size: `${METRICS.bundle.css?.sizeFormatted || '42KB'} + utilities`,
    icon: <SwatchIcon className="w-6 h-6" />,
    code: `// tailwind.config.js
const { mfeShellPreset } = require('@jonmatum/react-mfe-shell/preset');

module.exports = {
  presets: [mfeShellPreset],
  content: ['./src/**/*.{js,ts,jsx,tsx}']
}`
  },
  {
    id: 'css-in-js',
    name: 'CSS-in-JS',
    description: 'Runtime styling without build dependencies',
    size: 'Runtime only',
    icon: <AdjustmentsHorizontalIcon className="w-6 h-6" />,
    code: `import { Button, configureStyles } from '@jonmatum/react-mfe-shell';

configureStyles({ mode: 'css-in-js' });
<Button styleMode="css-in-js">Dynamic styling</Button>`
  }
];

export const HybridApproachShowcase: React.FC = () => {
  const [selectedApproach, setSelectedApproach] = useState('tailwind');
  const currentApproach = INTEGRATION_APPROACHES.find(a => a.id === selectedApproach);

  return (
    <ShowcaseSection
      id="hybrid-approach"
      title="Hybrid Integration Approach"
      description="Choose the integration method that best fits your project. All approaches provide the same components with consistent theming."
      badge={{
        text: "Integration Options",
        variant: "primary",
        icon: <CodeBracketIcon />
      }}
    >
      <div className="space-y-8">
        {/* Approach Cards */}
        <ComponentGrid columns={3}>
          {INTEGRATION_APPROACHES.map((approach) => (
            <ApproachCard
              key={approach.id}
              approach={approach}
              isSelected={selectedApproach === approach.id}
              onSelect={() => setSelectedApproach(approach.id)}
            />
          ))}
        </ComponentGrid>

        {/* Code Example */}
        <ShowcaseCard
          title={`${currentApproach?.name} Integration`}
          description="Copy and paste this configuration into your project"
        >
          <CodeBlock code={currentApproach?.code || ''} />
        </ShowcaseCard>
      </div>
    </ShowcaseSection>
  );
};

interface ApproachCardProps {
  approach: IntegrationApproach;
  isSelected: boolean;
  onSelect: () => void;
}

const ApproachCard: React.FC<ApproachCardProps> = ({ approach, isSelected, onSelect }) => (
  <Card 
    className={`cursor-pointer transition-all duration-200 ${
      isSelected 
        ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' 
        : 'hover:shadow-lg'
    }`}
    onClick={onSelect}
  >
    <Card.Header>
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-lg ${
          isSelected 
            ? 'bg-primary-600 text-white' 
            : 'bg-surface-secondary text-text-secondary'
        }`}>
          {approach.icon}
        </div>
        <div>
          <h3 className="font-semibold text-text-primary">{approach.name}</h3>
          <p className="text-sm text-text-secondary">{approach.size}</p>
        </div>
      </div>
    </Card.Header>
    <Card.Body>
      <p className="text-text-secondary">{approach.description}</p>
    </Card.Body>
  </Card>
);

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => (
  <pre className="bg-surface-primary p-4 rounded-lg overflow-x-auto text-sm">
    <code className="text-text-primary">
      {code}
    </code>
  </pre>
);
