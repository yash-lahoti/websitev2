/**
 * Section Loader Module
 * Loads all section HTML files at once on page load for continuous scroll
 */

class SectionLoader {
    constructor() {
        this.mainContainer = null;
        this.sections = [
            'hero',
            'about',
            'philosophy',
            'full-cycle',
            'pricing',
            'faq',
            'contact'
        ];
    }

    /**
     * Initialize the section loader
     */
    init() {
        this.mainContainer = document.querySelector('#main-content');
        if (!this.mainContainer) {
            console.error('Main content container not found');
            return;
        }

        // Load all sections at once
        this.loadAllSections();

        // Set up smooth scrolling for navigation
        this.setupSmoothScrolling();
    }

    /**
     * Load all sections at once
     */
    async loadAllSections() {
        try {
            // Load all sections in parallel
            const sectionPromises = this.sections.map(sectionName => 
                this.fetchSection(sectionName)
            );

            const sectionContents = await Promise.all(sectionPromises);
            
            // Combine all sections into one HTML string
            const allSectionsHTML = sectionContents.join('\n');
            
            // Inject all sections into main container
            this.mainContainer.innerHTML = allSectionsHTML;

            // Trigger event that all sections are loaded
            this.triggerAllSectionsLoaded();

            // Handle initial hash if present
            this.handleInitialHash();

        } catch (error) {
            console.error('Error loading sections:', error);
            this.showError('Failed to load sections. Please refresh the page.');
        }
    }

    /**
     * Fetch a single section HTML file
     * @param {string} sectionName - Name of the section to fetch
     * @returns {Promise<string>} Section HTML content
     */
    async fetchSection(sectionName) {
        try {
            const response = await fetch(`sections/${sectionName}.html`);
            if (!response.ok) {
                throw new Error(`Failed to load section: ${sectionName}`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error loading section ${sectionName}:`, error);
            // Return empty string for failed sections to not break the page
            return '';
        }
    }

    /**
     * Handle initial hash on page load
     */
    handleInitialHash() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                this.scrollToSection(hash);
            }, 100);
        }
    }

    /**
     * Set up smooth scrolling for navigation clicks
     */
    setupSmoothScrolling() {
        // Listen for hash changes (when user clicks nav links)
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                this.scrollToSection(hash);
                this.updateActiveNavigation(hash);
            }
        });

        // Handle initial hash on page load
        window.addEventListener('load', () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                this.scrollToSection(hash);
                this.updateActiveNavigation(hash);
            }
        });

        // Update active nav on scroll (optional - for better UX)
        this.setupScrollSpy();
    }

    /**
     * Scroll to section smoothly
     * @param {string} sectionName - Name of the section
     */
    scrollToSection(sectionName) {
        const normalizedName = this.normalizeSectionName(sectionName);
        const section = document.querySelector(`#${normalizedName}`);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            this.updateActiveNavigation(normalizedName);
            this.closeMobileMenu();
        }
    }

    /**
     * Normalize section name to match file names
     * @param {string} name - Section name from hash
     * @returns {string} Normalized section name
     */
    normalizeSectionName(name) {
        const mappings = {
            'home': 'hero',
            'resume': 'resume',
            'portfolio': 'portfolio',
            'services': 'services',
            'testimonials': 'testimonials',
            'contact': 'contact',
            'philosophy': 'philosophy',
            'full-cycle': 'full-cycle',
            'fullcycle': 'full-cycle',
            'offerings': 'full-cycle',
            'pricing': 'pricing',
            'faq': 'faq'
        };

        return mappings[name.toLowerCase()] || name.toLowerCase();
    }

    /**
     * Update active navigation state
     * @param {string} sectionName - Name of the active section
     */
    updateActiveNavigation(sectionName) {
        // Remove active class from all nav items
        const navLinks = document.querySelectorAll('#navmenu a');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current nav item
        const activeLink = document.querySelector(`#navmenu a[href="#${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    /**
     * Set up scroll spy to update active nav as user scrolls
     */
    setupScrollSpy() {
        let ticking = false;

        const updateActiveNavOnScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const sections = this.sections.map(name => {
                    const element = document.querySelector(`#${name}`);
                    return { name, element, top: element ? element.getBoundingClientRect().top : Infinity };
                }).filter(s => s.element);

                // Find the section currently in view
                const currentSection = sections.find(s => s.top <= 100 && s.top >= -100) || 
                                      sections.find(s => s.top > 0 && s.top < window.innerHeight);

                if (currentSection) {
                    this.updateActiveNavigation(currentSection.name);
                }

                ticking = false;
            });
        };

        window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const header = document.querySelector('#header');
        const headerToggle = document.querySelector('.header-toggle');
        if (header && header.classList.contains('header-show')) {
            header.classList.remove('header-show');
            if (headerToggle) {
                headerToggle.classList.remove('bi-x');
                headerToggle.classList.add('bi-list');
            }
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message to display
     */
    showError(message) {
        if (this.mainContainer) {
            this.mainContainer.innerHTML = `
                <div class="error-message text-center" style="padding: 2rem;">
                    <i class="bi bi-exclamation-triangle" style="font-size: 3rem; color: #dc3545;"></i>
                    <p style="margin-top: 1rem; color: #dc3545;">${message}</p>
                    <a href="#hero" class="btn btn-primary mt-3">Go to Home</a>
                </div>
            `;
        }
    }

    /**
     * Trigger custom event when all sections are loaded
     */
    triggerAllSectionsLoaded() {
        const event = new CustomEvent('allSectionsLoaded', {
            detail: { sections: this.sections }
        });
        document.dispatchEvent(event);
    }
}

// Initialize section loader when DOM is ready
function initializeSectionLoader() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.sectionLoader = new SectionLoader();
            window.sectionLoader.init();
        });
    } else {
        window.sectionLoader = new SectionLoader();
        window.sectionLoader.init();
    }
}

// Start initialization
initializeSectionLoader();
