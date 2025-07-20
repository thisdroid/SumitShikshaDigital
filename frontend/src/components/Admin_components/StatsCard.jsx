"use client"
import styles from "./StatsCard.module.css"

const StatsCard = ({ title, count, action, icon, iconColor, borderColor }) => {
  return (
    <div className={styles.statsCard} style={{ borderLeftColor: borderColor }}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={`${styles.cardIcon} ${styles[iconColor]}`}>
          <span className="material-icons">{icon}</span>
        </div>
      </div>
      <div className={styles.cardCount}>{count}</div>
      <div className={styles.cardAction}>
        <span className="material-icons">arrow_forward</span>
        <span>{action}</span>
      </div>
    </div>
  )
}

export default StatsCard
