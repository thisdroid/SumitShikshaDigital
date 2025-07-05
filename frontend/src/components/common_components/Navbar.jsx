import { useState } from "react"
import { Link, NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleNavClick = (section) => {
    console.log(`Navigating to: ${section}`)
    closeMobileMenu()
  }

  return (
    <>
      {/* Mobile Menu Overlay - render this FIRST so it covers everything */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}>
          <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileMenuContent}>
              {/* Top row: Home and Close */}
              <div className={styles.mobileMenuTopRow}>
                <NavLink to="/" className={styles.mobileNavLink} onClick={closeMobileMenu} end>
                  Home
                </NavLink>
                <button
                  className={styles.mobileMenuClose}
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#666">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </svg>
                </button>
              </div>
              <div className={styles.mobileDivider}></div>
              <NavLink to="/Student" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                Student
              </NavLink>
              <div className={styles.mobileDivider}></div>
              <NavLink to="/College" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                College
              </NavLink>
              <div className={styles.mobileDivider}></div>
              <NavLink to="/Training" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                Training
              </NavLink>
              <div className={styles.mobileDivider}></div>
              <NavLink to="/AboutUs" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                About Us
              </NavLink>
              <div className={styles.mobileDivider}></div>
              <NavLink to="/ContactUs" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                Contact Us
              </NavLink>

              {/* Auth buttons at the bottom */}
              <div className={styles.mobileAuthButtons} style={{ marginTop: "auto" }}>
                <Link to="/StudentLogin" onClick={closeMobileMenu}>
                  <button className={styles.mobileLoginBtnMenu}>
                    Log in
                  </button>
                </Link>
                <Link to="/StudentSignup" onClick={closeMobileMenu}>
                  <button className={styles.mobileSignupBtn}>
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav
        className={`${styles.navbar} ${styles.theme} ${
          isMobileMenuOpen ? styles.hideNavbarMobile : ""
        }`}
      >
        {/* Mobile Layout */}
        <div className={`${styles.mobileNavbar} ${styles.mdHidden}`}>
          <div className={styles.mobileSingleRow}>
            <div className={styles.mobileLogo}>
              <a href="/">
                <img src="/images/SD-logo.png" className={styles.logoImgMobile} alt="SD Shiksha Digital Logo" />
              </a>
            </div>

            <div className={styles.mobileSearchContainer}>
              <input
                type="text"
                className={styles.mobileSearchInput}
                placeholder="What do you want to learn?"
                autoComplete="off"
              />
              <button className={styles.mobileSearchBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </div>

            <button className={styles.hamburgerBtn} onClick={toggleMobileMenu} aria-label="Toggle menu">
              <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive1 : ""}`}></div>
              <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive2 : ""}`}></div>
              <div className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineActive3 : ""}`}></div>
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className={`${styles.desktopNavbar} ${styles.hiddenMdFlex}`}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <div className={styles.logo}>
              <a href="/">
                <img src="/images/SD-logo.png" className={styles.logoImg} alt="SD Shiksha Digital Logo" />
              </a>
            </div>

            <button className={styles.exploreBtn}>
              Explore
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="#0066cc">
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </button>

            <div className={styles.searchContainer}>
              <input type="text" className={styles.searchInput} placeholder="What do you want to learn?" autoComplete="off" />
              <button className={styles.searchBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Center Section */}
          <div className={styles.centerSection}>
            <NavLink to="/" className={styles.navLink} end>
              Home
            </NavLink>

            <span className={styles.divider}>|</span>
            <NavLink to="/Student/" className={styles.navLink}>
              Student
            </NavLink>

            <span className={styles.divider}>|</span>
            <NavLink to="/College/" className={styles.navLink}>
              College
            </NavLink>

            <span className={styles.divider}>|</span>
            <NavLink to="/Training" className={styles.navLink}>
              Training
            </NavLink>
          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <Link to="/StudentLogin">
              <button className={styles.loginBtn}>Log in</button>
            </Link>

            <Link to="/StudentSignup">
              <button className={styles.signupBtn}>Sign Up</button>
            </Link>
          </div>
        </div>
      </nav>
      <div className={styles.navbarSpacer}></div>
    </>
  )
}

export default Navbar