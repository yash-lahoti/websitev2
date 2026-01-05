import React, { useEffect } from 'react';
import { useSnapFolioData } from '../../hooks/useSnapFolioData';
import styles from './FullCycle.module.scss';
import AOS from 'aos';

const FullCycle = () => {
  const { data, loading } = useSnapFolioData();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  if (loading || !data) {
    return null;
  }

  const fullCycleData = data.full_cycle || {};
  const serviceBenefits = fullCycleData.service_benefits || [];

  // This section is now integrated into the Services expandable cards
  // Keeping minimal structure for navigation compatibility
  return null;
};

export default FullCycle;

