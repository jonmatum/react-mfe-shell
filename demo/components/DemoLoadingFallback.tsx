import React from 'react';
import { LoadingSpinner } from '../../src';

/**
 * Professional loading fallback for the demo app
 * Uses the library's own LoadingSpinner component
 */
const DemoLoadingFallback: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface-primary flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Main Loading Spinner */}
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">
            Loading React MFE Shell
          </h2>
          <p className="text-text-secondary">
            Preparing your component library demo...
          </p>
        </div>
        
        {/* Optional: Loading Progress Indicators */}
        <div className="flex justify-center space-x-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        {/* Branding */}
        <div className="text-xs text-text-tertiary">
          Production-ready micro frontend components
        </div>
      </div>
    </div>
  );
};

export default DemoLoadingFallback;
