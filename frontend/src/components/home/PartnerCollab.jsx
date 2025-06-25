import React from 'react';
import styles from './partnerCollab.module.css';

const PartnerCollab = () => {
  return (
    <div className={`${styles.partnerCollabSection} ${styles.theme}`}>
      <div className={styles.partnerCollabHeader}>
        <h2>
          Trusted by <span className={styles.partnerHighlight}>Industry Leaders</span>
        </h2>
        <p className={styles.partnerSubtext}>
          We're proud to partner with organizations that share our commitment to excellence
        </p>
      </div>
      <div className={styles.partnerLogoGrid}>
        <div className={styles.partnerLogoWrapper}>
          <img
            src="/collaboration2.png"
            alt="MSME Logo"
            className={styles.partnerLogoImg}
          />
        </div>
      </div>
    </div>
  );
};

export default PartnerCollab;