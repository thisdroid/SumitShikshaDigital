"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./CourseDetails.module.css"
import Header from "../header/Header"
import { enrolledCourses, availableCourses } from "./Courses"
import CourseDetailsSkeleton from "./CourseDetailsSkeleton"

const allCourses = [...enrolledCourses, ...availableCourses]

const CourseDetails = () => {
  const [loading, setLoading] = useState(true)
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Try to get course from location.state (if navigated from Courses page)
  let course = location.state?.course

  if (!course && courseId) {
    course = allCourses.find((c) => encodeURIComponent(c.title) === courseId)
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <CourseDetailsSkeleton />

  if (!course) {
    return (
      <div className={styles.courseDetailsContainer}>
        <div className={styles.mainContent}>
          <Header />
          <div className={styles.contentWrapper}>
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <span className="material-icons">error_outline</span>
              </div>
              <h2 className={styles.errorTitle}>Course Not Found</h2>
              <p className={styles.errorText}>The course you're looking for doesn't exist or has been removed.</p>
              <button className={styles.errorButton} onClick={() => navigate("/StudentDashboard/Courses")}>
                <span className="material-icons">arrow_back</span>
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleEnrollCourse = () => {
    console.log("Enrolling in course:", course.title)
    alert("Course enrollment functionality will be implemented here!")
  }

  const handleStartCourse = () => {
    console.log("Starting course:", course.title)
    navigate(`/StudentDashboard/Courses/${encodeURIComponent(course.title)}/player`, {
      state: { course },
    })
  }

  // Remove the hardcoded courseData object and replace it with:
  const courseData = {
    ...course,
    // Use all data from the course object directly
  }

  return (
    <div className={styles.courseDetailsContainer}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            {/* Back Button */}
            <button className={styles.backButton} onClick={() => navigate("/StudentDashboard/Courses")}>
              <span className="material-icons">arrow_back</span>
              Back to Courses
            </button>

            {/* Course Header Section */}
            <div className={styles.courseHeaderSection}>
              {/* Course Header Card */}
              <div className={styles.courseHeaderCard}>
                <div className={styles.courseImageColumn}>
                  <div className={styles.courseImageContainer}>
                    <img
                      src={course.image || "/placeholder.svg?height=200&width=300"}
                      alt={course.title}
                      className={styles.courseImage}
                    />
                    <div className={styles.courseOverlay}>
                      <button className={styles.previewBtn}>
                        <span className="material-icons">play_circle</span>
                        Preview Course
                      </button>
                    </div>
                  </div>
                  <div className={styles.imageButtonsSection}>
                    <button className={styles.enrollButton} onClick={handleEnrollCourse}>
                      <span className="material-icons">school</span>
                      Enroll in Course
                    </button>
                    <button className={styles.startButton} onClick={handleStartCourse}>
                      <span className="material-icons">play_arrow</span>
                      Start Learning
                    </button>
                  </div>
                </div>
                <div className={styles.courseHeaderInfo}>
                  <h1 className={styles.courseTitle}>{course.title}</h1>
                  <p className={styles.courseDescription}>{course.description}</p>

                  <div className={styles.priceSection}>
                    <span className={styles.currentPrice}>{course.price === "Free" ? "Free" : course.price}</span>
                    {course.originalPrice && <span className={styles.originalPrice}>{course.originalPrice}</span>}
                  </div>

                  <div className={styles.courseRating}>
                    <div className={styles.stars}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          className={`${styles.star} ${index < Math.floor(course.rating) ? styles.filled : ""}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className={styles.ratingText}>
                      {course.rating} ({course.studentsCount} students)
                    </span>
                  </div>

                  <div className={styles.courseMetrics}>
                    <div className={styles.metric}>
                      <span className="material-icons">schedule</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Duration</span>
                        <span className={styles.metricValue}>{course.duration} hours</span>
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <span className="material-icons">play_lesson</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Lessons</span>
                        <span className={styles.metricValue}>{course.lessonsCount}</span>
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <span className="material-icons">assignment</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Projects</span>
                        <span className={styles.metricValue}>{course.projectsCount}</span>
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <span className="material-icons">trending_up</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Level</span>
                        <span className={styles.metricValue}>{course.level}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Info Card */}
              <div className={styles.courseInfoCard}>
                <h3 className={styles.infoTitle}>Course Information</h3>
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <span className="material-icons">people</span>
                    <span>{course.studentsCount} students enrolled</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className="material-icons">language</span>
                    <span>Language: {course.language}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className="material-icons">update</span>
                    <span>Last updated: {course.lastUpdated}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className="material-icons">workspace_premium</span>
                    <span>Certificate included</span>
                  </div>
                </div>
              </div>
            </div>

            {/* What You'll Learn Section */}
            <div className={styles.learningSection}>
              <h2 className={styles.sectionTitle}>What You'll Learn</h2>
              <div className={styles.learningGrid}>
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className={styles.learningItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#10b981" />
                      <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content Section */}
            <div className={styles.contentSection}>
              <h2 className={styles.sectionTitle}>Course Content</h2>
              <div className={styles.contentList}>
                {course.courseContent.map((section, index) => (
                  <div key={index} className={styles.contentItem}>
                    <div className={styles.contentHeader}>
                      <span className={styles.contentTitle}>{section.title}</span>
                      <span className={styles.contentMeta}>
                        {section.lessons} lessons • {section.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights Section */}
            <div className={styles.keyHighlightsSection}>
              <h2 className={styles.sectionTitle}>Key Highlights</h2>
              <div className={styles.keyHighlightsList}>
                {course.keyHighlights.map((highlight, index) => (
                  <div key={index} className={styles.keyHighlightItem}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="12" fill="#10b981" />
                      <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                    </svg>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={styles.rightSidebar}>
            {/* Course Info Card - Mobile only */}
            <div className={styles.courseInfoCardMobile}>
              <h3 className={styles.infoTitle}>Course Information</h3>
              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <span className="material-icons">people</span>
                  <span>{course.studentsCount} students enrolled</span>
                </div>
                <div className={styles.infoItem}>
                  <span className="material-icons">language</span>
                  <span>Language: {course.language}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className="material-icons">update</span>
                  <span>Last updated: {course.lastUpdated}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className="material-icons">workspace_premium</span>
                  <span>Certificate included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
