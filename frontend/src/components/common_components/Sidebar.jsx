import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  // Track window width to control responsive behavior
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1024;
      setIsMobileView(mobileView);
      setIsOpen(!mobileView); // Open if large screen, close if mobile
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Only add click outside listener on mobile view and when sidebar is open
    if (isMobileView && isOpen) {
      const handleClickOutside = (event) => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileView, isOpen]);

  return (
    <>
      {/* Hamburger Button - only show on mobile */}
      {isMobileView && (
        <button
          ref={buttonRef}
          className={styles.hamburgerButton}
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle sidebar"
          type="button"
        >
          <span className="material-icons">menu</span>
        </button>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${styles.sidebarWrapper} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.logoContainer}>
          <div className={styles.logoBox}>
            <img
              src="/images/logo_latest.png"
              alt="Shiksha Digital Logo"
              className={styles.logoImage}
            />
          </div>
          <div className={styles.divider}></div>
        </div>
        <nav className={styles.nav}>
          <Link to="/StudentDashboard" className={styles.navLink}>
            <span className={`material-icons ${styles.navIcon}`}>dashboard</span>
            Dashboard
          </Link>
          <Link to="/Courses" className={styles.navLink}>
            <span className={`material-icons ${styles.navIcon}`}>menu_book</span>
            Courses
          </Link>
          <Link to="/Examination" className={styles.navLink}>
            <span className={`material-icons ${styles.navIcon}`}>edit</span>
            Examination
          </Link>
          <Link to="/Performance" className={styles.navLink}>
            <span className={`material-icons ${styles.navIcon}`}>analytics</span>
            Performance
          </Link>
          <Link to="/Certificates" className={styles.navLink}>
            <span className={`material-icons ${styles.navIcon}`}>verified</span>
            Certificates
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
