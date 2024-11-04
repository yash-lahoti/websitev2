// components/Navbar/Navbar.tsx
import React from 'react';
import styles from './Navbar.module.scss';

interface NavbarProps {
  setActiveView: (view: string) => void;
}

export default function Navbar({ setActiveView }: NavbarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>My Research Projects</div>
      <div className={styles.links}>
        <button className={styles.linkButton} onClick={() => setActiveView('home')}>
          Home
        </button>
        <button className={styles.linkButton} onClick={() => setActiveView('articles')}>
          Articles
        </button>
      </div>
    </nav>
  );
}
