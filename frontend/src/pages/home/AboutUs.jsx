import React from "react";
import Navbar from "../../components/common_components/Navbar";
import MyImage from "/images/aboutus1.jpg";
import MyImage2 from "/images/aboutus2.jpg";
import styles from "./AboutUs.module.css"; // Import the CSS module
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className={styles.aboutUs}>
        {/* Header Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Get to know us</h1>
            <p className={styles.heroSubtitle}>
              Empowering educators and learners with a seamless, secure, and scalable online examination platform.
            </p>
            <Link to="/ContactUs" className={styles.contactLink}>
            <button className={styles.contactBtn}>Contact us</button></Link>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className={styles.visionSection}>
          <div className={styles.container}>
            <div className={styles.contentRow}>
              <div className={styles.imageContainer}>
                <img className={styles.imagePlaceholder} src={MyImage} alt="Vision" />
              </div>
              <div>
                <h2 className={styles.sectionTitle}>Our Vision</h2>
                <p className={styles.sectionDescription}>
                  To bridge the gap between traditional assessments and modern technology, creating a future where
                  education is accessible to everyone, regardless of location or ability. We aim to be the global leader
                  in innovative examination solutions.
                </p>
                <ul className={styles.featureList}>
                  <li className={styles.featureListItem}>
                    <span className={styles.checkmark}>✓</span>
                    Continuously innovate to incorporate the latest advancements.
                  </li>
                  <li className={styles.featureListItem}>
                    <span className={styles.checkmark}>✓</span>
                    Strive for excellence in user experience.
                  </li>
                  <li className={styles.featureListItem}>
                    <span className={styles.checkmark}>✓</span>
                    Promote inclusivity and accessibility for all.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className={styles.missionSection}>
          <div className={styles.container}>
            <div className={`${styles.contentRow} ${styles.reverseContentRow}`}>
              <div className={styles.textContent}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <p className={styles.sectionDescription}>
                  To empower educators and learners by providing a user-friendly, reliable, and scalable examination
                  platform. We believe in harnessing the power of technology to create a future where education is
                  accessible and assessments are efficient.
                </p>
                <ul className={styles.featureList}>
                  <li className={styles.featureListItem}>
                    <span className={styles.checkmark}>✓</span>
                    Simplify exam creation and management.
                  </li>
                  <li className={styles.featureListItem}>
                    <span className={styles.checkmark}>✓</span>
                    Ensure fairness with advanced anti-cheating mechanisms.
                  </li>
                  <li className={styles.featureListItem}>
                    <span className={styles.checkmark}>✓</span>
                    Provide instant feedback and detailed analytics.
                  </li>
                </ul>
              </div>
              <div className={styles.imageContainer}>
                <img className={styles.imagePlaceholder} src={MyImage2} alt="Mission" />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className={styles.whyChooseSection}>
          <div className={styles.container}>
            <h2 className={`${styles.sectionTitle} ${styles.centeredSectionTitle}`}>Why Choose Us?</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>✓</div>
                <h3 className={styles.featureTitle}>Reliability</h3>
                <p className={styles.featureDescription}>
                  Our platform ensures smooth and uninterrupted examination processes, providing a hassle-free experience
                  for educators and students.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>✓</div>
                <h3 className={styles.featureTitle}>Customizability</h3>
                <p className={styles.featureDescription}>
                  Tailor exams to meet your institution's specific needs with our flexible and easy-to-use exam creation
                  tools.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>✓</div>
                <h3 className={styles.featureTitle}>Data Security</h3>
                <p className={styles.featureDescription}>
                  All data is encrypted and stored securely to protect user privacy and ensure compliance with global
                  standards.
                </p>
              </div>
              <div className={styles.featureCard}>
                <div className={styles.featureIcon}>✓</div>
                <h3 className={styles.featureTitle}>24/7 Support</h3>
                <p className={styles.featureDescription}>
                  Our dedicated support team is always available to assist you with any queries or issues.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
