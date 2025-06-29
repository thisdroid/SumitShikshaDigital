import React, { forwardRef } from 'react';
import styles from './CertificateTemplate.module.css';

// forwardRef so parent can reference for pdf generation
const CertificateTemplate = forwardRef(({ cert }, ref) => {
  return (
    <div className={styles.certificateWrapper} ref={ref}>
      <div className={styles.certificateBorder}>
        <h1 className={styles.title}>Certificate of Completion</h1>
        <p className={styles.subtitle}>This certificate is proudly presented to</p>
        <h2 className={styles.recipient}>{cert.certificateName}</h2>
        <p className={styles.description}>{cert.description}</p>
        <p className={styles.details}>
          <b>Exam:</b> {cert.examName}
        </p>
        <p className={styles.details}>
          <b>Issued by:</b> {cert.issuer}
        </p>
        <p className={styles.details}>
          <b>Date Issued:</b> {cert.dateIssued}
        </p>
        <div className={styles.signatureWrapper}>
          <div className={styles.signature}>
            <p>________________________</p>
            <p>Authorized Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CertificateTemplate;
