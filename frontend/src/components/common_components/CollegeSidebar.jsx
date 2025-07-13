import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './CollegeSidebar.module.css';

const CollegeSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  // Track window width to control responsive behavior
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1024;
      setIsMobileView(mobileView);
      setIsOpen(!mobileView);
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
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
          <Link
            to="/CollegeDashboard"
            className={styles.navLink}
            onClick={() => isMobileView && setIsOpen(false)}
          >
            <span className={`material-icons ${styles.navIcon}`}>dashboard</span>
            Dashboard
          </Link>
          <Link
            to="/CollegeDashboard/CollegeStudents"
            className={styles.navLink}
            onClick={() => isMobileView && setIsOpen(false)}
          >
            <span className={`material-icons ${styles.navIcon}`}>group</span>
            Students
          </Link>
          <div>
            <button
              className={styles.navLink}
              onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
            >
              <span className={`material-icons ${styles.navIcon}`}>edit</span>
              Examination
            </button>
            {isExamDropdownOpen && (
              <div className={styles.dropdown}>
                <Link to="" className={styles.dropdownLink}>
                  <span className={`material-icons ${styles.navIcon}`}>check_circle</span>
                  Exam History
                </Link>
                <Link to="" className={styles.dropdownLink}>
                  <span className={`material-icons ${styles.navIcon}`}>add_circle</span>
                  Create Exams
                </Link>
                <Link to="/StudentDashboard/ScheduledExams" className={styles.dropdownLink}>
                  <span className={`material-icons ${styles.navIcon}`}>schedule</span>
                  Scheduled Exams
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default CollegeSidebar;
