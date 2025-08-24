import React, { useState } from 'react';
import { Card, Badge, Button } from '../../src';
import { 
  WrenchScrewdriverIcon,
  CommandLineIcon,
  CodeBracketIcon,
  ChartBarIcon,
  CogIcon,
  SparklesIcon,
  DocumentTextIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { VERSION } from '../utils/version';

const UtilityShowcase: React.FC = () => {
  const [activeUtility, setActiveUtility] = useState('cli');
  const [cliOutput, setCLIOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const utilities = [
    {
      id: 'cli',
      title: 'Design System CLI',
      description: 'Automated analysis and optimization tools',
      icon: CommandLineIcon,
      badge: 'New'
    },
    {
      id: 'generators',
      title: 'Code Generators',
      description: 'Utility functions for DRY development',
      icon: CodeBracketIcon,
      badge: 'DRY'
    },
    {
      id: 'analysis',
      title: 'DRY Analysis',
      description: 'Real-time code quality metrics',
      icon: ChartBarIcon,
      badge: 'Live'
    }
  ];

  const cliCommands = [
    {
      command: 'npm run ds:analyze',
      description: 'Analyze DRY score for all components',
      output: `Design System CLI v${VERSION}

Analyzing DRY Score...

Component Analysis Results:
──────────────────────────────────────────────────
Badge                9.1/10
Button               9.2/10
Input                8.9/10
Card                 9.5/10
Modal                9.3/10
──────────────────────────────────────────────────
System Average: 9.2/10
Target Score: 8.5+/10 - ACHIEVED`
    },
    {
      command: 'npm run ds:generate',
      description: 'Generate utility functions',
      output: `Design System CLI v${VERSION}

Generating Design System Utilities...

Generating color utilities...
Generating size utilities...
Generating component utilities...
Utilities generated successfully!`
    },
    {
      command: 'npm run ds:audit',
      description: 'Full system audit',
      output: `Design System CLI v${VERSION}

Auditing Design System...

Audit Results:
────────────────────────────────────────
System DRY Score: 9.9/10
Components Analyzed: 13
Utility Functions: 7
Issues Found: 0

System is in excellent condition!`
    }
  ];

  const generatedUtilities = [
    {
      name: 'createSemanticColorVariant',
      description: 'Generate theme-aware color classes',
      example: `createSemanticColorVariant('primary', 'soft')
// Returns: 'bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-700/50'`
    },
    {
      name: 'createSizeClasses',
      description: 'Generate consistent size classes',
      example: `createSizeClasses('md', { includePadding: true, includeText: true })
// Returns: 'px-4 py-2.5 text-sm gap-2'`
    },
    {
      name: 'createAriaLabel',
      description: 'Generate accessible ARIA labels',
      example: `createAriaLabel(children, { prefix: 'Remove', fallback: 'button' })
// Returns: 'Remove Save Button'`
    }
  ];

  const runCLICommand = (command: { name: string; description: string; command: string }) => {
    setIsRunning(true);
    setCLIOutput('');
    
    // Simulate CLI execution
    setTimeout(() => {
      setCLIOutput(command.output);
      setIsRunning(false);
    }, 1500);
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-2 bg-warning-50 dark:bg-warning-900/30 px-4 py-2 rounded-full">
              <WrenchScrewdriverIcon className="w-5 h-5 text-warning-600" />
              <span className="text-warning-700 dark:text-warning-300 font-medium">
                Developer Tools
              </span>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            DRY Utilities & CLI Tools
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Powerful automation tools and utility functions that make DRY development 
            effortless and maintainable.
          </p>
        </div>

        {/* Utility Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-surface-secondary rounded-lg p-1">
            {utilities.map((utility) => {
              const Icon = utility.icon;
              return (
                <button
                  key={utility.id}
                  onClick={() => setActiveUtility(utility.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    activeUtility === utility.id
                      ? 'bg-primary-600 text-white'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{utility.title}</span>
                  <Badge variant="success" size="sm">{utility.badge}</Badge>
                </button>
              );
            })}
          </div>
        </div>

        {/* CLI Tools */}
        {activeUtility === 'cli' && (
          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CommandLineIcon className="w-6 h-6 text-primary-600" />
                <h3 className="text-2xl font-bold text-text-primary">Design System CLI</h3>
                <Badge variant="success">v{VERSION}</Badge>
              </div>
              
              <p className="text-text-secondary mb-6">
                Comprehensive command-line interface for analyzing, optimizing, and maintaining 
                your design system with automated DRY principles.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-text-primary mb-4">Available Commands</h4>
                  <div className="space-y-3">
                    {cliCommands.map((cmd, index) => (
                      <div key={index} className="border border-border-primary rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-sm font-mono text-primary-600 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded">
                            {cmd.command}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => runCLICommand(cmd)}
                            disabled={isRunning}
                            leftIcon={<PlayIcon className="w-3 h-3" />}
                          >
                            Run
                          </Button>
                        </div>
                        <p className="text-sm text-text-secondary">{cmd.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-4">CLI Output</h4>
                  <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg min-h-[300px] overflow-auto">
                    {isRunning ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                        <span>Running command...</span>
                      </div>
                    ) : cliOutput ? (
                      <pre className="whitespace-pre-wrap">{cliOutput}</pre>
                    ) : (
                      <div className="text-gray-500">
                        Click "Run" on any command to see the output here.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Code Generators */}
        {activeUtility === 'generators' && (
          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CodeBracketIcon className="w-6 h-6 text-primary-600" />
                <h3 className="text-2xl font-bold text-text-primary">DRY Utility Functions</h3>
                <Badge variant="primary">Auto-Generated</Badge>
              </div>
              
              <p className="text-text-secondary mb-6">
                Powerful utility functions that eliminate code duplication and ensure 
                consistency across your entire design system.
              </p>

              <div className="space-y-6">
                {generatedUtilities.map((utility, index) => (
                  <div key={index} className="border border-border-primary rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <h4 className="text-lg font-semibold text-text-primary">
                        {utility.name}
                      </h4>
                      <Badge variant="success" size="sm">DRY</Badge>
                    </div>
                    
                    <p className="text-text-secondary mb-4">{utility.description}</p>
                    
                    <div className="bg-surface-secondary rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-text-primary">Example Usage</span>
                        <Button size="sm" variant="ghost">
                          Copy
                        </Button>
                      </div>
                      <pre className="text-sm text-text-primary font-mono overflow-x-auto">
                        {utility.example}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-4">
                Component Scaffolding
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Generate New Component</h4>
                  <div className="space-y-3">
                    <code className="block text-sm bg-surface-secondary p-3 rounded">
                      npm run ds:scaffold --name Alert --type atom
                    </code>
                    <p className="text-sm text-text-secondary">
                      Creates a new component with DRY patterns, tests, and documentation.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Auto-Generated Features</h4>
                  <ul className="space-y-2 text-sm text-text-secondary">
                    <li className="flex items-center space-x-2">
                      <SparklesIcon className="w-4 h-4 text-success-600" />
                      <span>DRY utility integration</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SparklesIcon className="w-4 h-4 text-success-600" />
                      <span>TypeScript definitions</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SparklesIcon className="w-4 h-4 text-success-600" />
                      <span>Comprehensive tests</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SparklesIcon className="w-4 h-4 text-success-600" />
                      <span>Accessibility attributes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* DRY Analysis */}
        {activeUtility === 'analysis' && (
          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ChartBarIcon className="w-6 h-6 text-primary-600" />
                <h3 className="text-2xl font-bold text-text-primary">Real-Time DRY Analysis</h3>
                <Badge variant="warning">Live Metrics</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-success-50 dark:bg-success-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-success-600 mb-2">9.9/10</div>
                  <div className="text-success-700 dark:text-success-300 font-medium">DRY Score</div>
                </div>
                
                <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">322</div>
                  <div className="text-primary-700 dark:text-primary-300 font-medium">Tests Passing</div>
                </div>
                
                <div className="text-center p-6 bg-warning-50 dark:bg-warning-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-warning-600 mb-2">0</div>
                  <div className="text-warning-700 dark:text-warning-300 font-medium">Issues Found</div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Analysis Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3 p-4 border border-border-primary rounded-lg">
                      <DocumentTextIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-text-primary">Code Duplication Detection</div>
                        <div className="text-sm text-text-secondary">Automatically identifies repeated patterns</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 border border-border-primary rounded-lg">
                      <CogIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-text-primary">Optimization Suggestions</div>
                        <div className="text-sm text-text-secondary">AI-powered improvement recommendations</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 border border-border-primary rounded-lg">
                      <ChartBarIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-text-primary">Performance Metrics</div>
                        <div className="text-sm text-text-secondary">Bundle size and runtime analysis</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 border border-border-primary rounded-lg">
                      <SparklesIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-text-primary">Quality Scoring</div>
                        <div className="text-sm text-text-secondary">Comprehensive DRY compliance scoring</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-warning-50 to-primary-50 dark:from-warning-900/30 dark:to-primary-900/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              Start Using DRY Tools Today
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Transform your development workflow with our comprehensive suite of 
              DRY optimization tools and utilities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                leftIcon={<CommandLineIcon className="w-4 h-4" />}
              >
                Try CLI Tools
              </Button>
              <Button
                variant="secondary"
                leftIcon={<DocumentTextIcon className="w-4 h-4" />}
              >
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UtilityShowcase;
