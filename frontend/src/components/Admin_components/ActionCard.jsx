"use client"
import styles from "./ActionCard.module.css"

const ActionCard = ({ title, description, icon, iconColor, borderColor, onClick }) => {
  return (
    <div className={styles.actionCard} style={{ borderTopColor: borderColor }} onClick={onClick}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <div className={styles.cardIconContainer}>
        <div className={`${styles.cardIcon} ${styles[iconColor]}`}>
          <span className="material-icons">{icon}</span>
        </div>
      </div>
    </div>
  )
}

export default ActionCard
