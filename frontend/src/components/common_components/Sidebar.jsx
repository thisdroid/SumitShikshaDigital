import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar, openSidebar, closeSidebar } from '../../slices/uiSlice';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.isSidebarOpen);
  const [activeLink, setActiveLink] = React.useState('');
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  // Track window width to control responsive behavior
  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1024;
      setIsMobileView(mobileView);
      if (mobileView) {
        dispatch(closeSidebar());
      } else {
        dispatch(openSidebar());
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger on mount
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

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
          dispatch(closeSidebar());
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileView, isOpen, dispatch]);

  useEffect(() => {
    // Update active link based on current location
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      {/* Hamburger Button - only show on mobile */}
      {isMobileView && (
        <button
          ref={buttonRef}
          className={styles.hamburgerButton}
          onClick={() => dispatch(toggleSidebar())}
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
              src="/images/SD-logo.png"
              alt="Shiksha Digital Logo"
              className={styles.logoImage}
            />
          </div>
          <div className={styles.divider}></div>
        </div>
        <nav className={styles.nav}>
          <Link
            to="/StudentDashboard"
            className={`${styles.navLink} ${activeLink === '/StudentDashboard' ? styles.navLinkActive : ''}`}
            onClick={() => {
              setActiveLink('/StudentDashboard');
              if (isMobileView) dispatch(closeSidebar());
            }}
          >
            <span className={`material-icons ${styles.navIcon}`}>dashboard</span>
            Dashboard
          </Link>
          <Link
            to="/StudentDashboard/Courses"
            className={`${styles.navLink} ${activeLink === '/StudentDashboard/Courses' ? styles.navLinkActive : ''}`}
            onClick={() => {
              setActiveLink('/StudentDashboard/Courses');
              if (isMobileView) dispatch(closeSidebar());
            }}
          >
            <span className={`material-icons ${styles.navIcon}`}>menu_book</span>
            Courses
          </Link>
          <Link
            to="/StudentDashboard/Examination"
            className={`${styles.navLink} ${activeLink === '/StudentDashboard/Examination' ? styles.navLinkActive : ''}`}
            onClick={() => {
              setActiveLink('/StudentDashboard/Examination');
              if (isMobileView) dispatch(closeSidebar());
            }}
          >
            <span className={`material-icons ${styles.navIcon}`}>edit</span>
            Examination
          </Link>
          <Link
            to="/StudentDashboard/StudentPerformance"
            className={`${styles.navLink} ${activeLink === '/StudentDashboard/StudentPerformance' ? styles.navLinkActive : ''}`}
            onClick={() => {
              setActiveLink('/StudentDashboard/StudentPerformance');
              if (isMobileView) dispatch(closeSidebar());
            }}
          >
            <span className={`material-icons ${styles.navIcon}`}>analytics</span>
            Performance
          </Link>
          <Link
            to="/StudentDashboard/Certificates"
            className={`${styles.navLink} ${activeLink === '/StudentDashboard/Certificates' ? styles.navLinkActive : ''}`}
            onClick={() => {
              setActiveLink('/StudentDashboard/Certificates');
              if (isMobileView) dispatch(closeSidebar());
            }}
          >
            <span className={`material-icons ${styles.navIcon}`}>verified</span>
            Certificates
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
