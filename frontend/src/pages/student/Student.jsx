// import React, { useState, useEffect } from 'react';
// import './Student.css';
// import Navbar from '../components/common_components/Navbar';
// import { Link } from 'react-router-dom';
// const StudentLog = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     return () => window.removeEventListener('mousemove', handleMouseMove);
//   }, []);

//   return (
//     <>
//     <Navbar />
//     <div className="examination-platform">
//       {/* Animated Background */}
//       <div className="animated-background">
//         <div className="floating-shapes">
//           <div className="shape shape-1"></div>
//           <div className="shape shape-2"></div>
//           <div className="shape shape-3"></div>
//           <div className="shape shape-4"></div>
//           <div className="shape shape-5"></div>
//         </div>
//         <div
//           className="mouse-follower"
//           style={{
//             left: `${mousePosition.x - 100}px`,
//             top: `${mousePosition.y - 100}px`,
//           }}
//         ></div>
//       </div>

//       {/* Hero Section */}
//       <div className="hero">
//         <div className="hero-content">
//           <h1 className="hero-title">Hello <span className='gradient-text'>Student,</span></h1>
//           <h2 className="hero-subtitle">Welcome to Your Online Examination Portal</h2> 
//           <p className="hero-description">
//             Experience seamless testing with our innovative digital platform designed for your success.
//           </p>
//           <div className="hero-buttons">
//               <button className="btn-primary">
//               <span className="btn-icon">+</span>
//               <span>CREATE ACCOUNT</span>
//             </button>
            
//             <Link to="/StudentLogin"><button className="btn-secondary">
//               <span className="btn-icon">→</span>
//               <span>LOGIN NOW</span>
//             </button></Link>
            
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="features">
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon">📱</div>
//             <h3 className="feature-title">Anywhere Access</h3>
//             <p className="feature-description">
//               Take exams from any device with internet connection at your convenience.
//             </p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">🔐</div>
//             <h3 className="feature-title">Secure Environment</h3>
//             <p className="feature-description">
//               Advanced proctoring and security measures ensure exam integrity.
//             </p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">⚡</div>
//             <h3 className="feature-title">Instant Results</h3>
//             <p className="feature-description">
//               Get your scores immediately after submission with detailed feedback.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default StudentLog;


import  { useState, useEffect } from 'react';
import styles from './Student.module.css';
import Navbar from '../../components/common_components/Navbar';
import { Link } from 'react-router-dom';
import Animated from '../../components/common_components/Animated';
const StudentLog = () => {
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
        <div className={styles.animatedBackground}>
          <div className={styles.floatingShapes}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
            <div className={styles.shape4}></div>
            <div className={styles.shape5}></div>
          </div>
          <div
            className={styles.mouseFollower}
            style={{
              left: `${mousePosition.x - 100}px`,
              top: `${mousePosition.y - 100}px`,
            }}
          ></div>
        </div>
        <div className={styles.backgroundWrapper}>
          <Animated />
        </div>

        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={`${styles.heroTitle} `}>
              Hello <span className={styles.gradientText}>Student,</span>
            </h1>
            <h2 className={styles.heroSubtitle}>Welcome to Your Online Examination Portal</h2>
            <p className={styles.heroDescription}>
              Experience seamless testing with our innovative digital platform designed for your success.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.btnPrimary}>
                <span className={styles.btnIcon}>+</span>
                <span>CREATE ACCOUNT</span>
              </button>
              <Link to="/StudentLogin">
                <button className={styles.btnSecondary}>
                  <span className={styles.btnIcon}>→</span>
                  <span>LOGIN NOW</span>
                </button>
              </Link>
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

export default StudentLog;
