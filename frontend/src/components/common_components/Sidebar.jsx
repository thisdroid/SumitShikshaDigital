import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.css'; 

const Sidebar = () => {
  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.logoContainer}>
        <div className={styles.logoBox}>
          <img src="/images/logo_latest.png" alt="ShikshaDigital Logo" className={styles.logoImage} />
        </div>
        <div className={styles.divider}></div>
      </div>
      <nav className={styles.nav}>
        <Link to="/StudentDashboard" className={styles.navLink}>
          <span className={`material-icons ${styles.navIcon}`}>dashboard</span>
          Dashboard
        </Link>
        <Link to="/StudentCourses" className={styles.navLink}>
          <span className={`material-icons ${styles.navIcon}`}>menu_book</span>
          Courses
        </Link>
        <Link to="/StudentExamination" className={styles.navLink}>
          <span className={`material-icons ${styles.navIcon}`}>edit</span>
          Examination
        </Link>
        <Link to="/StudentPerformance" className={styles.navLink}>
          <span className={`material-icons ${styles.navIcon}`}>analytics</span>
          Performance
        </Link>
        <Link to="/StudentCertificates" className={styles.navLink}>
          <span className={`material-icons-outlined ${styles.navIcon}`}>verified</span>
          Certificates
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;