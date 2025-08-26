import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DemoLoadingFallback from './components/DemoLoadingFallback';

// Import styles using the correct path for development
import '../src/styles/index.css';

// For production apps using the package, you would use:
// import '@jonmatum/react-mfe-shell/styles'; // Tailwind integration
// import '@jonmatum/react-mfe-shell/standalone'; // Zero-config

// Ensure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Create and render the React app with Suspense
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={<DemoLoadingFallback />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
