import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./Examination.module.css"

const ExaminationSkeleton = () => (
  <div className={styles.dashboardContainer}>
    <div className={styles.mainContent}>
      <div style={{ margin: "2rem" }}>
        <Skeleton height={48} width="60%" />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.leftContent}>
          {/* Banner Skeleton - no background, just skeleton */}
          <div style={{ marginBottom: 24 }}>
            <Skeleton height={120} width="100%" />
          </div>
          {/* Stats */}
          <div className={styles.statsGrid}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.statCard}>
                <Skeleton circle height={32} width={32} style={{ position: "absolute", top: 16, left: 16 }} />
                <Skeleton height={32} width={60} style={{ margin: "1rem 0 0.5rem 0" }} />
                <Skeleton height={16} width={80} />
              </div>
            ))}
          </div>
          {/* Tabs */}
          <div className={styles.tabsContainer}>
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} height={40} width={160} style={{ marginRight: 12 }} />
            ))}
          </div>
          {/* Exams Grid */}
          <div className={styles.examsSection}>
            <div className={styles.sectionHeader}>
              <Skeleton height={32} width={180} />
            </div>
            <div className={styles.examsGrid}>
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} height={180} width="100%" style={{ borderRadius: 12 }} />
              ))}
            </div>
          </div>
        </div>
        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          <Skeleton height={320} width="100%" style={{ marginBottom: 24 }} />
          <div className={styles.resultsCard}>
            <Skeleton height={24} width={120} style={{ marginBottom: 12 }} />
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <Skeleton circle height={32} width={32} />
                <Skeleton height={16} width={100} />
                <Skeleton height={24} width={40} />
              </div>
            ))}
          </div>
          <div className={styles.tipsCard}>
            <Skeleton height={24} width={120} style={{ marginBottom: 12 }} />
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} height={16} width={180} style={{ marginBottom: 8 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ExaminationSkeleton