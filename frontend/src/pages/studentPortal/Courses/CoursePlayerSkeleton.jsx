import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import styles from "./CoursePlayer.module.css"

const CoursePlayerSkeleton = () => (
  <div className={styles.coursePlayerContainer}>
    <div className={styles.mainContent}>
      <div style={{ margin: "2rem" }}>
        <Skeleton height={48} width="40%" />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.playerLayout}>
          {/* Left Content - Video and Info */}
          <div className={styles.leftContent}>
            {/* Video Card */}
            <div className={styles.videoSection}>
              <div className={styles.videoContainer} style={{ marginBottom: 24 }}>
                <Skeleton height={360} width="100%" style={{ borderRadius: 12 }} />
              </div>
              <div className={styles.videoInfo}>
                <Skeleton height={32} width="60%" style={{ marginBottom: 12 }} />
                <Skeleton height={20} width="40%" style={{ marginBottom: 16 }} />
                <div style={{ display: "flex", gap: 12 }}>
                  <Skeleton height={36} width={100} style={{ borderRadius: 8 }} />
                  <Skeleton height={36} width={100} style={{ borderRadius: 8 }} />
                  <Skeleton height={36} width={140} style={{ borderRadius: 8 }} />
                </div>
              </div>
            </div>
            {/* Notes/Resources Card */}
            <div className={styles.notesSection} style={{ marginTop: 32 }}>
              <Skeleton height={32} width="30%" style={{ marginBottom: 16 }} />
              <Skeleton height={80} width="100%" style={{ borderRadius: 8, marginBottom: 12 }} />
              <Skeleton height={32} width="40%" />
            </div>
          </div>
          {/* Right Sidebar - Course Content and Stats */}
          <div className={styles.rightSidebar}>
            <div className={styles.courseContentCard} style={{ marginBottom: 24 }}>
              <Skeleton height={28} width="60%" style={{ marginBottom: 16 }} />
              {[...Array(3)].map((_, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <Skeleton height={24} width="80%" style={{ marginBottom: 8 }} />
                  <Skeleton height={18} width="60%" />
                </div>
              ))}
              <Skeleton height={20} width="40%" style={{ marginTop: 8 }} />
            </div>
            <div className={styles.courseStatsCard}>
              <Skeleton height={28} width="40%" style={{ marginBottom: 16 }} />
              {[...Array(3)].map((_, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <Skeleton circle height={32} width={32} />
                  <div style={{ flex: 1 }}>
                    <Skeleton height={16} width="60%" />
                    <Skeleton height={16} width="40%" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CoursePlayerSkeleton