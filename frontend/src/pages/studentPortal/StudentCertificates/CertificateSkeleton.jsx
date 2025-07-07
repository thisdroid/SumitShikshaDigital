import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./Certificates.module.css"

const CertificatesSkeleton = () => (
  <div className={styles.certificatesContainer}>
    <div className={styles.mainContent}>
      <div style={{ margin: "2rem" }}>
        <Skeleton height={48} width="60%" />
      </div>
      <div className={styles.contentWrapper}>
        {/* Banner Skeleton */}
        <div style={{ marginBottom: 24 }}>
          <Skeleton height={120} width="100%" />
        </div>
        {/* Search */}
        <Skeleton height={40} width="100%" style={{ marginBottom: 16 }} />
        {/* Stats */}
        <div className={styles.statsContainer}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.statCard}>
              <Skeleton circle height={32} width={32} style={{ position: "absolute", top: 16, left: 16 }} />
              <Skeleton height={32} width={60} style={{ margin: "1rem 0 0.5rem 0" }} />
              <Skeleton height={16} width={80} />
            </div>
          ))}
        </div>
        {/* Certificates List */}
        <div className={styles.certificatesSection}>
          <Skeleton height={32} width={200} style={{ marginBottom: 16 }} />
          <div className={styles.certificatesList}>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} height={100} width="100%" style={{ borderRadius: 12, marginBottom: 16 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CertificatesSkeleton