/**
 * Data Loader Module
 * Loads and caches JSON data from data.json
 */

class DataLoader {
    constructor() {
        this.data = null;
        this.loaded = false;
        this.loadPromise = null;
    }

    /**
     * Load data from JSON file
     * @returns {Promise<Object>} The loaded data
     */
    async load() {
        if (this.loaded && this.data) {
            return Promise.resolve(this.data);
        }

        if (this.loadPromise) {
            return this.loadPromise;
        }

        // Add cache-busting query parameter to prevent browser caching
        const cacheBuster = `?v=${Date.now()}`;
        this.loadPromise = fetch(`assets/js/data.json${cacheBuster}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load data.json: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                this.data = data;
                this.loaded = true;
                return data;
            })
            .catch(error => {
                console.error('Error loading data:', error);
                this.loadPromise = null;
                throw error;
            });

        return this.loadPromise;
    }

    /**
     * Get data (loads if not already loaded)
     * @returns {Promise<Object>} The data object
     */
    async getData() {
        return this.load();
    }

    /**
     * Get a specific section of data
     * @param {string} path - Dot-separated path to data (e.g., 'hero.title')
     * @returns {Promise<any>} The value at the path
     */
    async get(path) {
        const data = await this.getData();
        return path.split('.').reduce((obj, key) => obj?.[key], data);
    }
}

// Create singleton instance
const dataLoader = new DataLoader();

