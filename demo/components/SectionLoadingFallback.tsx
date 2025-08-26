import React from 'react';
import { LoadingSpinner } from '../../src';

/**
 * Loading fallback for individual sections
 * Smaller and more subtle than the main loading screen
 */
const SectionLoadingFallback: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <LoadingSpinner size="md" />
          </div>
          <p className="text-text-secondary">
            Loading section...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionLoadingFallback;
