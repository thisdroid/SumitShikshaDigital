import styles from './AptitudeBanner.module.css'
import { Link } from 'react-router-dom';

const AptitudeBanner = () => {
  return (
    <div className={`${styles.wrapper} ${styles.theme}`}>
      <div className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          {/* Background decorative elements */}
          <div className={styles.backgroundDecorative}>
            <div className={styles.primaryCircle}></div>
            <div className={styles.secondaryCircle}></div>
          </div>

          {/* Content container */}
          <div className={styles.contentGrid}>
            {/* Left side with text */}
            <div className={styles.textSection}>
              <h1 className={styles.mainHeading}>
                Measure Your <span className={styles.highlightText}>Skills</span> with Our Official Aptitude Assessment
              </h1>

              <p className={styles.description}>
                Challenge yourself with our comprehensive aptitude assessments designed to measure your logical reasoning, numerical abilities, and problem-solving skills. Perfect for career advancement and personal growth.
              </p>

              <div className={styles.buttonContainer}>
                <Link to="/StudentLogin" className={styles.ctaLink}>
                {/* <a href="/home-courses/37/"> */}
                  <button className={styles.ctaButton}>
                    Start Your Assessment
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={styles.buttonIcon}
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                  </Link>
                {/* </a> */}
              </div>
            </div>

            {/* Right side with puzzle arrangement */}
            <div className={styles.puzzleSection}>
              <div className={styles.puzzleContainer}>
                {/* Main large plus shape - top left */}
                <div className={styles.plusWrapper1}>
                  <div className={styles.plusShadow1}></div>
                  <div className={`${styles.plusShape} ${styles.plusLarge} ${styles.bounceAnimation1}`}>
                    <div className={styles.plusHorizontal}></div>
                    <div className={styles.plusVertical}></div>
                  </div>
                </div>

                {/* Medium plus shape - top right */}
                <div className={styles.plusWrapper2}>
                  <div className={styles.plusShadow2}></div>
                  <div className={`${styles.plusShape} ${styles.plusMedium} ${styles.bounceAnimation2}`}>
                    <div className={styles.plusHorizontal}></div>
                    <div className={styles.plusVertical}></div>
                  </div>
                </div>

                {/* Large plus shape - bottom center */}
                <div className={styles.plusWrapper3}>
                  <div className={styles.plusShadow3}></div>
                  <div className={`${styles.plusShape} ${styles.plusXLarge} ${styles.bounceAnimation3}`}>
                    <div className={styles.plusHorizontal}></div>
                    <div className={styles.plusVertical}></div>
                  </div>
                </div>

                {/* Small plus shape - middle left */}
                <div className={styles.plusWrapper4}>
                  <div className={styles.plusShadow4}></div>
                  <div className={`${styles.plusShape} ${styles.plusSmall} ${styles.bounceAnimation4}`}>
                    <div className={styles.plusHorizontal}></div>
                    <div className={styles.plusVertical}></div>
                  </div>
                </div>

                {/* Medium plus shape - middle right */}
                <div className={styles.plusWrapper5}>
                  <div className={styles.plusShadow5}></div>
                  <div className={`${styles.plusShape} ${styles.plusMediumAlt} ${styles.bounceAnimation5}`}>
                    <div className={styles.plusHorizontal}></div>
                    <div className={styles.plusVertical}></div>
                  </div>
                </div>

                {/* Star icon - top right corner */}
                <div className={`${styles.starIcon} ${styles.pulseAnimation}`}>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2L15.09 8.09L22 9.9L17 14.5L18.18 21.33L12 18.13L5.82 21.33L7 14.5L2 9.9L8.91 8.09L12 2Z"></path>
                  </svg>
                </div>

                {/* Lightbulb icon - bottom left */}
                <div className={`${styles.lightbulbIcon} ${styles.pulseAnimationDelayed}`}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
                    <path d="M9 18h6"></path>
                    <path d="M10 22h4"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AptitudeBanner;