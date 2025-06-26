import { useState, useEffect } from "react"
import { BarChart3, Shield, Users } from "lucide-react"
import styles from "./College.module.css"
import Navbar from "../../components/common_components/Navbar"
import Animated from "../../components/common_components/Animated"
import { Link } from "react-router-dom"

const College = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <Navbar />
      <div className={styles.examinationPlatform}>
        <div className={styles.backgroundWrapper}>
          <Animated />  
        </div>

        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span>🎓 Welcome to the Future of Education</span>
              </div>
              <h1 className={styles.heroTitle}>
                Hello <span className={styles.highlight}>College,</span>
              </h1>
              <h2 className={styles.heroSubtitle}>Welcome to Our Online Examination Platform</h2>
              <p className={styles.heroDescription}>
                Transform your examination process with our comprehensive digital
                <br />
                solution designed for educational institutions
              </p>
              <div className={styles.heroButtons}>
                <Link to="/CollegeSignUp" >
                <button className={styles.btnPrimary}>
                  <span className={styles.btnIcon}>+</span>
                  <span>CREATE ACCOUNT</span>
                  <div className={styles.btnShine}></div>
                </button>
                  </Link>
                <Link to="/CollegeLogin" className={styles.btnSecondary}>
                  <span className={styles.btnIcon}>→</span>
                  <span className={styles.btnLink}>LOGIN NOW</span>
                  <div className={styles.btnRipple}></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Powerful Features for Modern Education</h2>
              <p className={styles.sectionSubtitle}>Everything you need to manage examinations efficiently</p>
            </div>

            <div className={styles.featuresGrid}>
              <div className={`${styles.featureCard} ${styles.cardAnalytics}`}>
                <div className={styles.collegeCardHeader}>
                  <div className={styles.featureIcon}>
                    <BarChart3 size={32} />
                  </div>
                  <div className={styles.cardGlow}></div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.featureTitle}>Dashboard Analytics</h3>
                  <p className={styles.featureDescription}>
                    Real-time insights into student performance and exam statistics with advanced reporting tools
                  </p>
                  <div className={styles.featureStats}>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>95%</span>
                      <span className={styles.statLabel}>Accuracy</span>
                    </div>
                    <div className={styles.stat}>
                      <span className={styles.statNumber}>24/7</span>
                      <span className={styles.statLabel}>Monitoring</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.featureCard} ${styles.cardSecurity}`}>
                <div className={styles.collegeCardHeader}>
                  <div className={styles.featureIcon}>
                    <Shield size={32} />
                  </div>
                  <div className={styles.cardGlow}></div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.featureTitle}>Secure Platform</h3>
                  <p className={styles.featureDescription}>
                    Enterprise-grade security to protect your examination data with end-to-end encryption
                  </p>
                  <div className={styles.securityBadges}>
                    <span className={styles.badge}>SSL Encrypted</span>
                    <span className={styles.badge}>GDPR Compliant</span>
                    <span className={styles.badge}>ISO 27001</span>
                  </div>
                </div>
              </div>

              <div className={`${styles.featureCard} ${styles.cardManagement}`}>
                <div className={styles.collegeCardHeader}>
                  <div className={styles.featureIcon}>
                    <Users size={32} />
                  </div>
                  <div className={styles.cardGlow}></div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.featureTitle}>Student Management</h3>
                  <p className={styles.featureDescription}>
                    Easily organize and manage all your students in one place with bulk operations and smart filtering
                  </p>
                  <div className={styles.managementFeatures}>
                    <div className={styles.featureItem}>✓ Bulk Import/Export</div>
                    <div className={styles.featureItem}>✓ Smart Grouping</div>
                    <div className={styles.featureItem}>✓ Progress Tracking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default College
