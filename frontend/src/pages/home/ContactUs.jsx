import React from "react";
import Navbar from "../../components/common_components/Navbar";
import contactImg from "/images/contactusimg.png";
import styles from "./ContactUs.module.css"; // Import the CSS module

const ContactUs = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.contactContainer}>
        <div className={styles.contactCard}>
          <div className={styles.contactContent}>
            <div className={styles.formSection}>
              <h1 className={styles.heading}>Let's talk</h1>
              <p className={styles.description}>
                Artificial Intelligence is transforming the way businesses operate, making processes smarter and more efficient.
              </p>
              <form className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your Name</label>
                  <input className={styles.formInput} type="text" placeholder="Enter your name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email</label>
                  <input className={styles.formInput} type="email" placeholder="Enter your email" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Message</label>
                  <textarea className={styles.formTextarea} placeholder="Type something if you want..." rows="4"></textarea>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Send message
                </button>
              </form>
            </div>
            <div className={styles.illustrationSection}>
              <img className={styles.redSquare} src={contactImg} alt="Vision" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
