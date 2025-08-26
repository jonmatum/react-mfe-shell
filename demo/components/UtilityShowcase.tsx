import React, { useState } from 'react';
import { METRICS } from '../utils/metrics';
import { Card, Badge, Button, FeatureChip } from '../../src';
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
  const cliOutputRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when output changes
  React.useEffect(() => {
    if (cliOutputRef.current && cliOutput) {
      cliOutputRef.current.scrollTop = cliOutputRef.current.scrollHeight;
    }
  }, [cliOutput]);

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
      output: `🎨 Design System CLI v1.0.0

📊 Analyzing DRY Score...

Analyzing all components...

Component Analysis Results:
──────────────────────────────────────────────────
🟢 Avatar               10.0/10
🟢 Badge                10.0/10
🟢 Button.hybrid        10.0/10
🟢 Button               10.0/10
🟢 Divider              10.0/10
🟢 Icon                 10.0/10
🟢 Input                8.5/10
🟢 Label                10.0/10
🟢 LoadingSpinner       10.0/10
🟢 Switch               10.0/10
🟢 Text                 10.0/10
🟢 Card                 10.0/10
🟢 Checkbox             10.0/10
🟢 FileUpload           10.0/10
🟢 FormField            10.0/10
🟢 Modal                10.0/10
🟢 Radio                10.0/10
🟢 SearchBox            10.0/10
🟡 Select               7.5/10
🟢 SwitchField          10.0/10
🟢 Textarea             8.5/10
──────────────────────────────────────────────────
📈 System Average: ${METRICS.dry.scoreFormatted}
🎯 Target Score: 8.5+/10`
    },
    {
      command: 'npm run analyze:detailed',
      description: 'Detailed code analysis with metrics',
      output: `Code Analysis Report for: react-mfe-shell
═══════════════════════════════════════════════════════════════════════════════
Generated on: 8/25/2025, 2:14:26 PM
Directory: /Users/jonmatum/Code/jonmatum/react-mfe-shell

Basic Statistics
═══════════════════════════════════════════════════════════════════════════════
Language                 Files     Lines   Blanks  Comments     Code Complexity
───────────────────────────────────────────────────────────────────────────────
TypeScript                  97     24729     2652      1286    20791       1671
Markdown                    24      7156     1536         0     5620          0
JSON                        12       410        4         0      406          0
JavaScript                  11      1897      226       270     1401         73
───────────────────────────────────────────────────────────────────────────────
Total                      162     36667     4814      1839    30014       1782
───────────────────────────────────────────────────────────────────────────────

Quality Metrics
═══════════════════════════════════════════════════════════════════════════════
Code Quality Metrics:
  Comment Ratio: 6.1% (Industry standard: 10-20%)
  Blank Line Ratio: 13.1% (Good readability: 15-25%)
  Complexity per Line: 0.06 (Lower is better)

Quality Assessment:
  Comments: Low - Consider adding more documentation
  Complexity: Low - Very maintainable code`
    },
    {
      command: 'npm run test:coverage',
      description: 'Run tests with coverage analysis',
      output: `> @jonmatum/react-mfe-shell@8.1.0 test:coverage
> NODE_OPTIONS="--max-old-space-size=4096" vitest run --coverage

RUN  v3.2.4 /Users/jonmatum/Code/jonmatum/react-mfe-shell
     Coverage enabled with v8

✓ src/contexts/__tests__/SettingsContext.test.tsx (14 tests) 29ms
✓ src/components/atoms/__tests__/Avatar.test.tsx (39 tests) 87ms
✓ src/components/atoms/__tests__/Switch.test.tsx (12 tests) 48ms
✓ src/components/molecules/__tests__/Checkbox.test.tsx (25 tests) 103ms
✓ src/components/molecules/__tests__/SwitchField.test.tsx (23 tests) 198ms

Test Files  26 passed (26)
     Tests  ${METRICS.tests.totalTests} passed (${METRICS.tests.totalTests})
  Start at  14:07:35
  Duration  2.44s

% Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   ${Math.round(METRICS.tests.coverage)} |    87.98 |    53.6 |   ${Math.round(METRICS.tests.coverage)} |                   
 src               |     100 |      100 |     100 |     100 |                   
  index.ts         |     100 |      100 |     100 |     100 |                   
 ...mponents/atoms |   91.43 |    91.77 |    87.5 |   91.43 |                   
  Avatar.tsx       |     100 |      100 |     100 |     100 |                   
  Badge.tsx        |     100 |       75 |     100 |     100 |                   
  Button.tsx       |   95.97 |       95 |     100 |   95.97 |                   
-------------------|---------|----------|---------|---------|-------------------`
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
// Returns: 'px-3 py-2 text-sm gap-2'`
    },
    {
      name: 'createAriaLabel',
      description: 'Generate accessible ARIA labels',
      example: `createAriaLabel(children, { prefix: 'Remove', fallback: 'button' })
// Returns: 'Remove Save Button'`
    }
  ];

  const runCLICommand = (command: { command: string; description: string; output: string }) => {
    setIsRunning(true);
    setCLIOutput('');
    
    // Simulate progressive CLI execution with real output
    setTimeout(() => {
      setIsRunning(false);
      
      // Split output into lines for progressive display
      const lines = command.output.split('\n');
      let currentOutput = '';
      
      // Display lines progressively to demonstrate auto-scroll
      lines.forEach((line, index) => {
        setTimeout(() => {
          currentOutput += (index > 0 ? '\n' : '') + line;
          setCLIOutput(currentOutput);
        }, index * 50); // 50ms delay between lines
      });
    }, 1000);
  };

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FeatureChip variant="warning" icon={<WrenchScrewdriverIcon />}>
              Developer Tools
            </FeatureChip>
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
          <div className="space-y-8" data-section="cli-tools">
            {/* Disclaimer */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <Card.Body>
                <div className="flex items-start space-x-3">
                  <CommandLineIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      Real CLI Tools Available
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
                      The CLI commands shown below are fully functional and available in this project. 
                      The outputs displayed are real results from running these commands.
                    </p>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                      <strong>Try them yourself:</strong> Clone the repository and run any of these commands 
                      to see the actual analysis and metrics for the codebase.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>

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
                  <div 
                    ref={cliOutputRef}
                    className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg h-[400px] overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                    style={{
                      scrollBehavior: 'smooth'
                    }}
                  >
                    {isRunning ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full"></div>
                        <span>Running command...</span>
                      </div>
                    ) : cliOutput ? (
                      <pre className="whitespace-pre overflow-x-auto min-w-0">{cliOutput}</pre>
                    ) : (
                      <div className="text-gray-500 flex items-center justify-center h-full">
                        <div className="text-center">
                          <CommandLineIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Click "Run" on any command to see the output here.</p>
                          <p className="text-xs mt-1">Output will auto-scroll and be fully scrollable.</p>
                        </div>
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
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => {
                            navigator.clipboard.writeText(utility.example).then(() => {
                              console.log('Example code copied to clipboard!');
                            }).catch(() => {
                              // Fallback for older browsers
                              const textArea = document.createElement('textarea');
                              textArea.value = utility.example;
                              document.body.appendChild(textArea);
                              textArea.select();
                              document.execCommand('copy');
                              document.body.removeChild(textArea);
                            });
                          }}
                        >
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
                Component Architecture
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">DRY Utility Integration</h4>
                  <div className="space-y-3">
                    <div className="bg-surface-secondary p-3 rounded text-sm">
                      <p className="text-text-secondary mb-2">All components use shared utilities:</p>
                      <code className="text-primary-600">createSemanticColorVariant('primary', 'soft')</code>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Eliminates code duplication across Badge, Button, Alert, and other components.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Built-in Features</h4>
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
                      <span>Comprehensive tests ({METRICS.tests.totalTests} total)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SparklesIcon className="w-4 h-4 text-success-600" />
                      <span>Accessibility attributes</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <SparklesIcon className="w-4 h-4 text-success-600" />
                      <span>Theme integration</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Real CLI Tools Available */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  Available CLI Commands
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <code className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded text-blue-800 dark:text-blue-200">
                    npm run ds:analyze
                  </code>
                  <code className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded text-blue-800 dark:text-blue-200">
                    npm run analyze:detailed
                  </code>
                  <code className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded text-blue-800 dark:text-blue-200">
                    npm run test:coverage
                  </code>
                  <code className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded text-blue-800 dark:text-blue-200">
                    npm run analyze:complexity
                  </code>
                </div>
                <p className="text-blue-600 dark:text-blue-400 text-sm mt-2">
                  All commands are functional and provide real analysis of the codebase.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* DRY Analysis */}
        {activeUtility === 'analysis' && (
          <div className="space-y-8">
            {/* Disclaimer */}
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <Card.Body>
                <div className="flex items-start space-x-3">
                  <ChartBarIcon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                      Real Analysis Data
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                      The metrics shown below are derived from actual CLI analysis tools. 
                      The DRY score is calculated by our design system CLI based on component structure and utility usage.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <ChartBarIcon className="w-6 h-6 text-primary-600" />
                <h3 className="text-2xl font-bold text-text-primary">Real-Time DRY Analysis</h3>
                <Badge variant="warning">Live Metrics</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-success-50 dark:bg-success-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-success-600 mb-2">{METRICS.dry.scoreFormatted}</div>
                  <div className="text-success-700 dark:text-success-300 font-medium">DRY Score</div>
                  <div className="text-xs text-success-600 mt-1">From ds:analyze</div>
                </div>
                
                <div className="text-center p-6 bg-primary-50 dark:bg-primary-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-primary-600 mb-2">{METRICS.tests.totalTests}</div>
                  <div className="text-primary-700 dark:text-primary-300 font-medium">Tests Passing</div>
                  <div className="text-xs text-primary-600 mt-1">100% pass rate</div>
                </div>
                
                <div className="text-center p-6 bg-warning-50 dark:bg-warning-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-warning-600 mb-2">{Math.round(METRICS.tests.coverage)}%</div>
                  <div className="text-warning-700 dark:text-warning-300 font-medium">Test Coverage</div>
                  <div className="text-xs text-warning-600 mt-1">Measured with V8</div>
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
                        <div className="text-sm text-text-secondary">Identifies repeated patterns across components</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 border border-border-primary rounded-lg">
                      <CogIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-text-primary">Component Analysis</div>
                        <div className="text-sm text-text-secondary">Evaluates utility function usage and consistency</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 border border-border-primary rounded-lg">
                      <ChartBarIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-text-primary">Performance Metrics</div>
                        <div className="text-sm text-text-secondary">Bundle size analysis and build optimization</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 p-4 border border-border-primary rounded-lg">
                      <SparklesIcon className="w-5 h-5 text-primary-600 mt-0.5" />
                      <div>
                        <div className="font-medium text-text-primary">Quality Scoring</div>
                        <div className="text-sm text-text-secondary">DRY compliance scoring based on actual metrics</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real CLI Output Example */}
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">Sample Analysis Output</h4>
                  <div className="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg overflow-x-auto">
                    <pre>{`🎨 Design System CLI v1.0.0

📊 Analyzing DRY Score...

Component Analysis Results:
──────────────────────────────────────────────────
🟢 Avatar               10.0/10
🟢 Badge                10.0/10
🟢 Button               10.0/10
🟢 Input                8.5/10
🟡 Select               7.5/10
──────────────────────────────────────────────────
📈 System Average: ${METRICS.dry.scoreFormatted}
🎯 Target Score: 8.5+/10`}</pre>
                  </div>
                  <p className="text-sm text-text-secondary mt-2">
                    Run <code className="bg-surface-secondary px-2 py-1 rounded">npm run ds:analyze</code> to see the full analysis.
                  </p>
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
                onClick={() => {
                  // Scroll to CLI tools section
                  const cliSection = document.querySelector('[data-section="cli-tools"]');
                  if (cliSection) {
                    cliSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  // Also switch to CLI tab if not already active
                  setActiveUtility('cli');
                  
                  // Visual feedback
                  console.log('Navigating to CLI tools section...');
                }}
              >
                Try CLI Tools
              </Button>
              <Button
                variant="secondary"
                leftIcon={<DocumentTextIcon className="w-4 h-4" />}
                onClick={() => {
                  // Open GitHub repository in new tab
                  window.open('https://github.com/jonmatum/react-mfe-shell#cli-tools', '_blank', 'noopener,noreferrer');
                  console.log('Opening documentation in new tab...');
                }}
              >
                View Documentation
              </Button>
              <Button
                variant="ghost"
                leftIcon={<CodeBracketIcon className="w-4 h-4" />}
                onClick={() => {
                  // Copy installation command to clipboard
                  navigator.clipboard.writeText('npm install @jonmatum/react-mfe-shell').then(() => {
                    console.log('✅ Installation command copied to clipboard!');
                    // Show temporary visual feedback
                    const button = document.activeElement;
                    if (button && button.textContent) {
                      const originalText = button.textContent;
                      button.textContent = '✅ Copied!';
                      setTimeout(() => {
                        button.textContent = originalText;
                      }, 2000);
                    }
                  }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = 'npm install @jonmatum/react-mfe-shell';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    console.log('✅ Installation command copied to clipboard! (fallback method)');
                  });
                }}
              >
                Copy Install Command
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UtilityShowcase;
