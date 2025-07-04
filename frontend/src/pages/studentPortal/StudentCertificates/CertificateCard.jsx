"use client"
import styles from "./CertificateCard.module.css"

const CertificateCard = ({ cert, onView, onDownload }) => {
  return (
    <div className={styles.certificateCard}>
      <div className={styles.certificateIcon} style={{ backgroundColor: cert.color }}>
        <span className="material-icons">{cert.icon}</span>
      </div>

      <div className={styles.certificateInfo}>
        <h3 className={styles.certificateName}>{cert.certificateName}</h3>

        <div className={styles.certificateDetails}>
          <div className={styles.detailItem}>
            <span className="material-icons">school</span>
            <span>Exam: {cert.examName}</span>
          </div>

          <div className={styles.detailItem}>
            <span className="material-icons">calendar_today</span>
            <span>Date Issued: {cert.dateIssued}</span>
          </div>

          <div className={styles.detailItem}>
            <span className="material-icons">business</span>
            <span>Issued by: Shiksha Digital</span>
          </div>
        </div>
      </div>

      <div className={styles.certificateActions}>
        <button className={styles.viewBtn} onClick={() => onView(cert)}>
          <span className="material-icons">visibility</span>
          View Certificate
        </button>
        <button className={styles.downloadBtn} onClick={() => onDownload(cert)}>
          <span className="material-icons">download</span>
          Download PDF
        </button>
      </div>
    </div>
  )
}

export default CertificateCard
