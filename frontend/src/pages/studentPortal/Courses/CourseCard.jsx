"use client"

import { useNavigate } from "react-router-dom"
import styles from "./CourseCard.module.css"

const CourseCard = ({ course }) => {
  const navigate = useNavigate()

  const handleViewCourse = () => {
    // Navigate to course details page with course data
    navigate(`/StudentDashboard/Courses/${encodeURIComponent(course.title)}`, {
      state: { course },
    })
  }

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className={`material-icons ${styles.star} ${styles.filled}`}>
          star
        </span>,
      )
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <span key="half" className={`material-icons ${styles.star} ${styles.halfFilled}`}>
          star_half
        </span>,
      )
    }

    // Empty stars
    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className={`material-icons ${styles.star}`}>
          star_border
        </span>,
      )
    }

    return stars
  }

  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImageContainer}>
        <img
          src={course.image || "/placeholder.svg?height=200&width=300"}
          alt={course.title}
          className={styles.courseImage}
        />
        <div className={styles.courseOverlay}>
          <button className={styles.viewCourseBtn} onClick={handleViewCourse}>
            View Course
          </button>
        </div>
      </div>
      <div className={styles.courseInfo}>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <p className={styles.courseDescription}>{course.description}</p>
        {/* Duration */}
        {course.duration && (
          <div className={styles.courseDuration}>
            <span className="material-icons">schedule</span>
            <span>{course.duration} days</span>
          </div>
        )}
        <div className={styles.courseFooter}>
          <div className={styles.courseRating}>
            <div className={styles.stars}>{renderStars(course.rating)}</div>
            <div className={styles.ratingInfo}>
              <span className={styles.ratingValue}>{course.rating}</span>
              {course.reviewCount && <span className={styles.reviewCount}>({course.reviewCount})</span>}
            </div>
          </div>
          <div className={styles.coursePrice}>
            <span className={styles.currentPrice}>{course.price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
