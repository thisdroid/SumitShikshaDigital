"use client"
import { useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./CourseDetails.module.css"
import Header from "../header/Header"
import { enrolledCourses, availableCourses } from "./Courses"

const allCourses = [...enrolledCourses, ...availableCourses]

const CourseDetails = () => {
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
    alert("Course learning functionality will be implemented here!")
  }

  // Enhanced course data with additional details
  const courseData = {
    ...course,
    studentsCount: 1250,
    lessonsCount: 24,
    projectsCount: 5,
    certificateAvailable: true,
    level: course.level || "Beginner",
    language: "English",
    lastUpdated: "December 2024",
    whatYouLearn: [
      "Master the fundamentals and core concepts",
      "Build real-world projects from scratch",
      "Understand best practices and industry standards",
      "Learn debugging and problem-solving techniques",
      "Gain hands-on experience with practical exercises",
      "Develop portfolio-worthy applications",
      "Understand advanced concepts and patterns",
      "Learn to optimize performance and efficiency",
    ],
    courseContent: [
      { title: "Introduction and Setup", lessons: 3, duration: "45 mins" },
      { title: "Core Concepts", lessons: 6, duration: "2 hours" },
      { title: "Practical Applications", lessons: 8, duration: "3 hours" },
      { title: "Advanced Topics", lessons: 5, duration: "2.5 hours" },
      { title: "Projects and Practice", lessons: 2, duration: "1.5 hours" },
    ],
    requirements: [
      "Basic computer knowledge",
      "No prior programming experience required",
      "Willingness to learn and practice",
      "Access to a computer with internet connection",
    ],
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
                      src={courseData.image || "/placeholder.svg?height=200&width=300"}
                      alt={courseData.title}
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
                  <h1 className={styles.courseTitle}>{courseData.title}</h1>
                  <p className={styles.courseDescription}>{courseData.description}</p>

                  <div className={styles.priceSection}>
                    <span className={styles.currentPrice}>
                      {courseData.price === "Free" ? "Free" : courseData.price}
                    </span>
                    {courseData.price !== "Free" && <span className={styles.originalPrice}>₹2,499</span>}
                  </div>

                  <div className={styles.courseRating}>
                    <div className={styles.stars}>
                      {Array.from({ length: 5 }, (_, index) => (
                        <span
                          key={index}
                          className={`${styles.star} ${index < Math.floor(courseData.rating) ? styles.filled : ""}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className={styles.ratingText}>
                      {courseData.rating} ({courseData.studentsCount} students)
                    </span>
                  </div>

                  <div className={styles.courseMetrics}>
                    <div className={styles.metric}>
                      <span className="material-icons">schedule</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Duration</span>
                        <span className={styles.metricValue}>{courseData.duration} hours</span>
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <span className="material-icons">play_lesson</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Lessons</span>
                        <span className={styles.metricValue}>{courseData.lessonsCount}</span>
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <span className="material-icons">assignment</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Projects</span>
                        <span className={styles.metricValue}>{courseData.projectsCount}</span>
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <span className="material-icons">trending_up</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Level</span>
                        <span className={styles.metricValue}>{courseData.level}</span>
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
                    <span>{courseData.studentsCount} students enrolled</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className="material-icons">language</span>
                    <span>Language: {courseData.language}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className="material-icons">update</span>
                    <span>Last updated: {courseData.lastUpdated}</span>
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
                {courseData.whatYouLearn.map((item, index) => (
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
                {courseData.courseContent.map((section, index) => (
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
                {[
                  "Critical Thinking Development",
                  "Real-World Problem-Solving Skills",
                  "Goal-Oriented Learning Approach",
                  "Objective & Fair Skill Evaluation",
                  "Foundation for Career Planning",
                ].map((highlight, index) => (
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
                  <span>{courseData.studentsCount} students enrolled</span>
                </div>
                <div className={styles.infoItem}>
                  <span className="material-icons">language</span>
                  <span>Language: {courseData.language}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className="material-icons">update</span>
                  <span>Last updated: {courseData.lastUpdated}</span>
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
