import React, { useState } from 'react';

const SnapFolioWrapper = () => {
  const [loading, setLoading] = useState(true);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            fontSize: '18px',
            color: '#666',
          }}
        >
          Loading...
        </div>
      )}
      <iframe
        src="/snapfolio/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: loading ? 'none' : 'block',
        }}
        onLoad={handleIframeLoad}
        title="SnapFolio Portfolio"
      />
    </div>
  );
};

export default SnapFolioWrapper;

