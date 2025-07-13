
import Profile from "../CollegeProfile_icon/CollegeProfile"
import styles from "./CollegeHeaderFile.module.css"

const CollegeHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.searchContainer}>
          <span className="material-icons">search</span>
          <input type="text" placeholder="Search" className={styles.searchInput} />
        </div>
        <div className={styles.userSection}>
          <button className={styles.notificationBtn}>
            <span className="material-icons">notifications</span>
            <span className={styles.notificationBadge}></span>
          </button>
          <Profile />
        </div>
      </div>
    </header>
  )
}

export default CollegeHeader
