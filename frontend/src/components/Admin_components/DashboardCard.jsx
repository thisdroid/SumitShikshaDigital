import styles from "./DashboardCard.module.css"

const DashboardCard = ({ title, count, action, icon, iconColor, borderColor, onClick }) => {
  return (
    <div className={styles.dashboardCard} style={{ borderLeftColor: borderColor }} onClick={onClick}>
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

export default DashboardCard
