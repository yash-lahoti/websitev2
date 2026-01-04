import { useEffect } from 'react';

/**
 * Hook to dynamically load and unload Bootstrap CSS and Bootstrap Icons
 * Only loads when SnapFolio route is active to prevent global style conflicts
 * Uses link tag injection to load CSS dynamically
 */
const useBootstrapLoader = () => {
  useEffect(() => {
    // Check if Bootstrap is already loaded (avoid duplicates)
    const existingBootstrap = document.getElementById('snapfolio-bootstrap-css');
    const existingIcons = document.getElementById('snapfolio-bootstrap-icons-css');
    
    let shouldLoadBootstrap = !existingBootstrap;
    let shouldLoadIcons = !existingIcons;

    // Create and inject Bootstrap CSS link tag if not already loaded
    if (shouldLoadBootstrap) {
      const bootstrapLink = document.createElement('link');
      bootstrapLink.rel = 'stylesheet';
      bootstrapLink.type = 'text/css';
      bootstrapLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
      bootstrapLink.id = 'snapfolio-bootstrap-css';
      bootstrapLink.setAttribute('data-snapfolio', 'true');
      document.head.appendChild(bootstrapLink);
    }

    // Create and inject Bootstrap Icons link tag if not already loaded
    if (shouldLoadIcons) {
      const bootstrapIconsLink = document.createElement('link');
      bootstrapIconsLink.rel = 'stylesheet';
      bootstrapIconsLink.type = 'text/css';
      bootstrapIconsLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css';
      bootstrapIconsLink.id = 'snapfolio-bootstrap-icons-css';
      bootstrapIconsLink.setAttribute('data-snapfolio', 'true');
      document.head.appendChild(bootstrapIconsLink);
    }

    // Cleanup: Remove Bootstrap CSS when component unmounts
    // Only remove if we loaded it (check by data-snapfolio attribute)
    return () => {
      const bootstrapCSS = document.getElementById('snapfolio-bootstrap-css');
      const bootstrapIcons = document.getElementById('snapfolio-bootstrap-icons-css');
      
      // Only remove if they have the data-snapfolio attribute (we loaded them)
      if (bootstrapCSS && bootstrapCSS.getAttribute('data-snapfolio') === 'true') {
        bootstrapCSS.remove();
      }
      if (bootstrapIcons && bootstrapIcons.getAttribute('data-snapfolio') === 'true') {
        bootstrapIcons.remove();
      }
    };
  }, []);
};

export default useBootstrapLoader;

