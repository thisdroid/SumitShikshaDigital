
import Profile from "../Profile_icon/Profile"
import styles from "./Header.module.css"

const Header = () => {
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

export default Header
