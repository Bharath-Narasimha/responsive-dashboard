import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Ensure we have a root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create React root and render the app
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enable Hot Module Replacement (HMR) for development
if (import.meta.env.DEV) {
  // HMR is automatically handled by Vite
}
