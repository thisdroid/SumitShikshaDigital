"use client"

import { useState } from "react"
import styles from "./CourseDetails.module.css"

const CourseDetails = ({ course, onBack }) => {
  const [isEnrolled, setIsEnrolled] = useState(false)

  // Sample course data - you can pass this as props or fetch from API
  const courseData = {
    image: course?.image || "/images/FrontEnd.jpg",
    title: course?.title || "Frontend for Beginners",
    description: course?.description || "Learn the basics of React.js with hands-on projects.",
    rating: course?.rating || 4.8,
    reviewCount: course?.reviewCount || 120,
    duration: course?.duration || 30,
    price: course?.price || "Free",
    originalPrice: "₹549.0",
    questionsCount: 75,
    totalMarks: 150,
    timeLimit: 60,
    studentsCount: 1250,

    whatYouLearn: [
      "Fundamental & Essential",
      "Logical & Structured",
      "Core Programming Language",
      "Efficient & Performance-Oriented",
      "Great for Beginners",
      "Powerful & Versatile",
      "Foundation for Other Languages",
      "Fast & Low-Level",
      "System-Oriented & Practical",
      "Educational & Career-Boosting",
      "Basic to Advanced Learning",
      "Evergreen & Industry Standard",
      "Widely Used & Reliable",
      "Ideal for System Programming",
      "Great for Competitive Coding",
      "High-Performance & Efficient",
      "Structured & Procedural",
      "Perfect for Logical Thinking",
      "Portable & Cross-Platform",
      "Foundation of Modern Programming",
    ],

    keyHighlights: [
      "Essential for Embedded Systems",
      "Great for Software Development",
      "Popular in Tech & Academia",
      "Versatile & Hardware-Friendly",
      "Timeless & Widely Adopted",
      "Key to Understanding Programming",
      "Ideal for Low-Level Development",
      "Highly Structured & Scalable",
    ],

    features: [
      "Lifetime access to materials",
      "Learn at your own pace",
      "Expert instructor guidance",
      "Downloadable resources & assignments",
    ],
  }

  const handleEnroll = () => {
    setIsEnrolled(true)
    // Add enrollment logic here
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < Math.floor(rating) ? styles.starFilled : styles.starEmpty}`}
      >
        ★
      </span>
    ))
  }

  return (
    <div className={styles.courseDetailsWrapper}>
      {/* <div className={`${styles.headerBackground} ${styles.theme}`}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <button className={styles.backButton} onClick={onBack}>
              <span className="material-icons">arrow_back</span>
              Back to Courses
            </button>
            <h1 className={styles.title}>Course Details</h1>
          </div>
        </div>
      </div> */}

      <button className={styles.backButton} onClick={onBack}>
        <span className="material-icons">arrow_back</span>
        Back to Courses
      </button>

      <div className={styles.courseContent}>
        {/* Course Header Section */}
        <div className={styles.courseHeader}>
          <div className={styles.courseImageContainer}>
            <img src={courseData.image || "/placeholder.svg"} alt={courseData.title} className={styles.courseImage} />
          </div>

          <div className={styles.courseInfo}>
            <h2 className={styles.courseTitle}>{courseData.title}</h2>

            <div className={styles.ratingSection}>
              <div className={styles.stars}>{renderStars(courseData.rating)}</div>
              <span className={styles.ratingText}>
                {courseData.rating} ({courseData.studentsCount} students)
              </span>
            </div>

            <div className={styles.courseStats}>
              <div className={styles.stat}>
                <span className="material-icons">quiz</span>
                <span>{courseData.questionsCount} Questions</span>
              </div>
              <div className={styles.stat}>
                <span className="material-icons">grade</span>
                <span>{courseData.totalMarks} Total Marks</span>
              </div>
              <div className={styles.stat}>
                <span className="material-icons">schedule</span>
                <span>{courseData.timeLimit} Min</span>
              </div>
            </div>

            <div className={styles.priceSection}>
              <span className={styles.currentPrice}>
                {courseData.price === "Free" ? "Free" : `₹${courseData.price}`}
              </span>
              {courseData.price !== "Free" && <span className={styles.originalPrice}>{courseData.originalPrice}</span>}
            </div>

            <button
              className={`${styles.enrollButton} ${isEnrolled ? styles.enrolled : ""}`}
              onClick={handleEnroll}
              disabled={isEnrolled}
            >
              <span className="material-icons">{isEnrolled ? "check_circle" : "shopping_cart"}</span>
              {isEnrolled ? "Enrolled" : "Enroll Now"}
            </button>
          </div>
        </div>

        {/* What You'll Learn Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>What You'll Learn</h3>
          <div className={styles.learningGrid}>
            {courseData.whatYouLearn.map((item, index) => (
              <div key={index} className={styles.learningItem}>
                <span className={`material-icons ${styles.checkIcon}`}>check_circle</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Highlights Section */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Key Highlights</h3>
          <div className={styles.highlightsGrid}>
            {courseData.keyHighlights.map((highlight, index) => (
              <div key={index} className={styles.highlightItem}>
                <span className={`material-icons ${styles.highlightIcon}`}>verified</span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhancement Section */}
        <div className={styles.enhancementSection}>
          <h3 className={styles.enhancementTitle}>Enhance Your Skills with Expert Guidance</h3>
          <p className={styles.enhancementDescription}>
            Gain in-depth knowledge and hands-on experience with this comprehensive course. Join thousands of learners
            who have already mastered new skills!
          </p>
          <div className={styles.featuresList}>
            {courseData.features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={`material-icons ${styles.featureIcon}`}>check_circle</span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <p className={styles.supportText}>
            To enroll, please visit our{" "}
            <a href="#" className={styles.link}>
              Courses Page
            </a>{" "}
            or contact support for assistance.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
