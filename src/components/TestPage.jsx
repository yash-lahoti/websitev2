import React from 'react';

const TestPage = () => {
  return (
    <div className="main-app-route relative z-0 bg-primary min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Test Page - Main App
        </h1>
        <p className="text-xl text-secondary mb-8">
          If you can see this, the page is working!
        </p>
        <div className="bg-white/10 p-6 rounded-lg">
          <p className="text-white">
            This is a simple test component to verify visibility.
          </p>
          <p className="text-accent mt-4">
            Current time: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
