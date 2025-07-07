import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./StudentDashboard.module.css"

const StudentDashboardSkeleton = () => (
  <div className={styles.dashboardContainer}>
    <div className={styles.mainContent}>
      {/* Header Skeleton */}
      <div style={{ margin: "2rem" }}>
        <Skeleton height={48} width="60%" />
      </div>

      <div className={styles.contentWrapper}>
        {/* Left Content */}
        <div className={styles.leftContent}>
          {/* Banner Skeleton */}
          <div style={{ marginBottom: 24 }}>
            <Skeleton height={120} width="100%" />
          </div>

          {/* Stats Cards Skeleton */}
          <div className={styles.statsGrid}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={styles.statCard}>
                <Skeleton circle height={32} width={32} style={{ position: "absolute", top: 16, left: 16 }} />
                <Skeleton height={32} width={60} style={{ margin: "1rem 0 0.5rem 0" }} />
                <Skeleton height={16} width={80} />
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className={styles.sectionHeader}>
            <Skeleton height={32} width={180} />
          </div>
          <div className={styles.activityList}>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} height={60} width="100%" style={{ borderRadius: 8, marginBottom: 12 }} />
            ))}
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className={styles.rightSidebar}>
          <Skeleton height={320} width="100%" style={{ marginBottom: 24 }} />
          <Skeleton height={120} width="100%" />
        </div>
      </div>
    </div>
  </div>
)

export default StudentDashboardSkeleton

