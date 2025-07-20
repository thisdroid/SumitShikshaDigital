import styles from "./SectionHeader.module.css"

const SectionHeader = ({ icon, title, iconColor }) => {
  return (
    <div className={styles.sectionHeader}>
      <div className={`${styles.sectionIcon} ${styles[iconColor]}`}>
        <span className="material-icons">{icon}</span>
      </div>
      <h2 className={styles.sectionTitle}>{title}</h2>
    </div>
  )
}

export default SectionHeader
