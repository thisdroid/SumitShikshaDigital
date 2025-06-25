import  { useState, useEffect } from 'react';
import styles from './Student.module.css';
import Navbar from '../../components/common_components/Navbar';
import { Link } from 'react-router-dom';
import Animated from '../../components/common_components/Animated';
const Student = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Navbar />
       <div className={styles.examinationPlatform}>
        <div className={styles.backgroundWrapper}>
          <Animated />
        </div>

        <div className={styles.hero}>
          <div className={styles.container}>
          
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
                <span>🎓 Welcome to the Future of Education</span>
            </div>
            <h1 className={`${styles.heroTitle} `}>
              Hello <span className={styles.gradientText}>Student,</span>
            </h1>
            <h2 className={styles.heroSubtitle}>Welcome to Your Online Examination Portal</h2>
            <p className={styles.heroDescription}>
              Experience seamless testing with our innovative digital<br/> platform designed for your success.
            </p>
            <div className={styles.heroButtons}>
              <Link to="/StudentSignup">
              <button className={styles.btnPrimary}>
                <span className={styles.btnIcon}>+</span>
                <span>CREATE ACCOUNT</span>
              </button>
              </Link>
              <Link to="/StudentLogin">
                <button className={styles.btnSecondary}>
                  <span className={styles.btnIcon}>→</span>
                  <span>LOGIN NOW</span>
                </button>
              </Link>
            </div>
          </div>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3 className={styles.featureTitle}>Anywhere Access</h3>
              <p className={styles.featureDescription}>
                Take exams from any device with internet connection at your convenience.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔐</div>
              <h3 className={styles.featureTitle}>Secure Environment</h3>
              <p className={styles.featureDescription}>
                Advanced proctoring and security measures ensure exam integrity.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Instant Results</h3>
              <p className={styles.featureDescription}>
                Get your scores immediately after submission with detailed feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;