import React, { useState, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

// Import all old components
import { 
  Hero, 
  Navbar, 
  About, 
  Tech, 
  Experience, 
  Works, 
  Feedbacks, 
  Contact,
  HomeView,
  Activity,
  CanvasLoader
} from '../index';

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary, componentName }) {
  return (
    <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 m-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-red-400 font-bold text-lg">
          Error in {componentName || 'Component'}
        </h3>
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
      <pre className="text-red-300 text-sm overflow-auto max-h-60">
        {error.message}
        {'\n'}
        {error.stack}
      </pre>
    </div>
  );
}

// Loading Component
function ComponentLoader({ componentName }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-lg m-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
      <p className="text-secondary">Loading {componentName}...</p>
    </div>
  );
}

// Component Wrapper with Error Boundary
function ComponentWrapper({ component: Component, componentName, renderMode = 'default' }) {
  const [key, setKey] = useState(0);

  const renderComponent = () => {
    switch (renderMode) {
      case 'suspense':
        return (
          <Suspense fallback={<ComponentLoader componentName={componentName} />}>
            <Component />
          </Suspense>
        );
      case 'lazy':
        return <Component />;
      default:
        return <Component />;
    }
  };

  return (
    <ErrorBoundary
      key={key}
      FallbackComponent={ErrorFallback}
      componentName={componentName}
      onReset={() => setKey((prev) => prev + 1)}
    >
      <Suspense fallback={<ComponentLoader componentName={componentName} />}>
        {renderComponent()}
      </Suspense>
    </ErrorBoundary>
  );
}

// Main Component Tester
const ComponentTester = () => {
  const [selectedComponent, setSelectedComponent] = useState('all');
  const [renderMode, setRenderMode] = useState('default');
  const [showNavbar, setShowNavbar] = useState(true);
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  const components = {
    Hero: Hero,
    Navbar: Navbar,
    About: About,
    Tech: Tech,
    Experience: Experience,
    Works: Works,
    Feedbacks: Feedbacks,
    Contact: Contact,
    HomeView: HomeView,
    Activity: Activity,
  };

  const componentOrder = [
    'Navbar',
    'Hero',
    'About',
    'Tech',
    'Experience',
    'Works',
    'Feedbacks',
    'HomeView',
    'Activity',
    'Contact',
  ];

  const renderSelectedComponent = () => {
    if (selectedComponent === 'all') {
      return (
        <div className="w-full">
          {componentOrder.map((compName) => {
            if (compName === 'Navbar' && !showNavbar) return null;
            const Component = components[compName];
            if (!Component) return null;
            
            return (
              <div key={compName} className="mb-8 border-b border-gray-700 pb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-accent">{compName}</h2>
                  <span className="text-xs text-gray-500">
                    Component #{componentOrder.indexOf(compName) + 1}
                  </span>
                </div>
                <ComponentWrapper
                  component={Component}
                  componentName={compName}
                  renderMode={renderMode}
                />
              </div>
            );
          })}
        </div>
      );
    } else {
      const Component = components[selectedComponent];
      if (!Component) {
        return (
          <div className="text-red-400 p-4">
            Component "{selectedComponent}" not found
          </div>
        );
      }
      return (
        <ComponentWrapper
          component={Component}
          componentName={selectedComponent}
          renderMode={renderMode}
        />
      );
    }
  };

  return (
    <div className="relative z-0 bg-primary min-h-screen">
      {/* Control Panel */}
      <div className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold text-white mr-auto">
              Component Tester
            </h1>
            <button
              onClick={() => setShowDebugInfo(!showDebugInfo)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              {showDebugInfo ? 'Hide' : 'Show'} Debug Info
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Component Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Component:
              </label>
              <select
                value={selectedComponent}
                onChange={(e) => setSelectedComponent(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-accent focus:outline-none"
              >
                <option value="all">All Components (Full App)</option>
                {Object.keys(components).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Render Mode Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Render Mode:
              </label>
              <select
                value={renderMode}
                onChange={(e) => setRenderMode(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-accent focus:outline-none"
              >
                <option value="default">Default</option>
                <option value="suspense">With Suspense</option>
                <option value="lazy">Lazy Load</option>
              </select>
            </div>

            {/* Toggle Navbar */}
            <div className="flex items-end">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showNavbar}
                  onChange={(e) => setShowNavbar(e.target.checked)}
                  className="w-4 h-4 text-accent bg-gray-700 border-gray-600 rounded focus:ring-accent"
                />
                <span className="text-sm text-gray-300">Show Navbar</span>
              </label>
            </div>
          </div>

          {/* Debug Info */}
          {showDebugInfo && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded text-sm text-gray-400">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <strong>Selected:</strong> {selectedComponent}
                </div>
                <div>
                  <strong>Render Mode:</strong> {renderMode}
                </div>
                <div>
                  <strong>Navbar:</strong> {showNavbar ? 'Visible' : 'Hidden'}
                </div>
                <div>
                  <strong>Time:</strong> {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderSelectedComponent()}
      </div>

      {/* Status Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-700 p-2">
        <div className="max-w-7xl mx-auto text-xs text-gray-400 text-center">
          Testing {selectedComponent === 'all' 
            ? `${componentOrder.length} components` 
            : `1 component: ${selectedComponent}`}
          {' | '}
          Render Mode: {renderMode}
          {' | '}
          {showNavbar ? 'Navbar: ON' : 'Navbar: OFF'}
        </div>
      </div>
    </div>
  );
};

export default ComponentTester;
