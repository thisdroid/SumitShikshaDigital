import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./Courses.module.css"

const CoursesSkeleton = () => (
  <div className={styles.dashboardContainer}>
    <div className={styles.mainContent}>
      <div style={{ margin: "2rem" }}>
        <Skeleton height={48} width="60%" />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.leftContent}>
          {/* Banner Skeleton */}
          <div style={{ marginBottom: 24 }}>
            <Skeleton height={120} width="100%" />
          </div>
          {/* Tabs */}
          <div className={styles.tabsContainer}>
            {[...Array(2)].map((_, i) => (
              <Skeleton key={i} height={40} width={160} style={{ marginRight: 12 }} />
            ))}
          </div>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <Skeleton height={32} width={180} />
            <Skeleton height={32} width={80} />
          </div>
          {/* Courses Grid */}
          <div className={styles.coursesGrid}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={styles.courseCard}>
                <Skeleton height={140} width="100%" />
                <div style={{ padding: 12 }}>
                  <Skeleton height={24} width="80%" style={{ margin: "8px 0" }} />
                  <Skeleton height={16} width="60%" />
                  <Skeleton height={16} width="40%" />
                  <Skeleton height={32} width={100} style={{ marginTop: 12 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          <Skeleton height={320} width="100%" style={{ marginBottom: 24 }} />
          <Skeleton height={120} width="100%" />
        </div>
      </div>
    </div>
  </div>
)

export default CoursesSkeleton