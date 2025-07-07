import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./CourseDetails.module.css"

const CourseDetailsSkeleton = () => (
  <div className={styles.dashboardContainer}>
    <div className={styles.mainContent}>
      <div style={{ margin: "2rem" }}>
        <Skeleton height={48} width="40%" />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.leftContent}>
          {/* Banner/Card Skeleton */}
          <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 16 }}>
            <Skeleton circle height={64} width={64} />
            <div style={{ flex: 1 }}>
              <Skeleton height={32} width="60%" style={{ marginBottom: 8 }} />
              <Skeleton height={20} width="40%" />
            </div>
          </div>
          {/* Course Info Card */}
          <div style={{ marginBottom: 24, padding: 16, borderRadius: 12, background: "var(--skeleton-bg, #f3f3f3)", display: "flex", alignItems: "center", gap: 16 }}>
            <Skeleton circle height={40} width={40} />
            <div style={{ flex: 1 }}>
              <Skeleton height={20} width="50%" style={{ marginBottom: 8 }} />
              <Skeleton height={16} width="30%" />
            </div>
            <Skeleton height={36} width={100} style={{ borderRadius: 8 }} />
          </div>
          {/* What You'll Learn Card */}
          <div style={{ marginBottom: 24, padding: 16, borderRadius: 12, background: "var(--skeleton-bg, #f3f3f3)" }}>
            <Skeleton height={28} width={160} style={{ marginBottom: 12 }} />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} height={16} width="90%" style={{ marginBottom: 8 }} />
            ))}
          </div>
          {/* Curriculum Card */}
          <div style={{ padding: 16, borderRadius: 12, background: "var(--skeleton-bg, #f3f3f3)" }}>
            <Skeleton height={24} width={120} style={{ marginBottom: 12 }} />
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <Skeleton circle height={32} width={32} />
                <div style={{ flex: 1 }}>
                  <Skeleton height={16} width="80%" style={{ marginBottom: 4 }} />
                  <Skeleton height={12} width="60%" />
                </div>
                <Skeleton height={28} width={60} style={{ borderRadius: 8 }} />
              </div>
            ))}
          </div>
        </div>
        {/* Right Sidebar */}
        <div className={styles.rightSidebar}>
          <div style={{ marginBottom: 24, padding: 16, borderRadius: 12, background: "var(--skeleton-bg, #f3f3f3)" }}>
            <Skeleton height={24} width="60%" style={{ marginBottom: 16 }} />
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <Skeleton circle height={32} width={32} />
                <Skeleton height={16} width={80} />
              </div>
            ))}
          </div>
          <Skeleton height={48} width="80%" style={{ marginBottom: 16, borderRadius: 8 }} />
          <Skeleton height={32} width="60%" style={{ borderRadius: 8 }} />
        </div>
      </div>
    </div>
  </div>
)

export default CourseDetailsSkeleton