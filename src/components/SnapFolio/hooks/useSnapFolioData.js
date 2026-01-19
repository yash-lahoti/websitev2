import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch SnapFolio data from JSON file
 * @returns {Object} { data, loading, error }
 */
export const useSnapFolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/admission/assets/js/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch SnapFolio data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};



