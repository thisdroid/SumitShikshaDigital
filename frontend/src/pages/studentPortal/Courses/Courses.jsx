"use client"

import { useState } from "react"
import styles from "./Courses.module.css"
import Profile from "../Profile_icon/Profile"

const Courses = () => {
  const [activeTab, setActiveTab] = useState("enrolled")

  // Sample data
  const enrolledCourses = [
    {
      id: 1,
      title: "React Native",
      description: "React Native enables seamless cross-platform mobile development, cross-platform mobile development",
      image: "/images/react-native.jpg",
      rating: 4.5,
      price: "₹1499",
      originalPrice: "₹3999",
      color: "#61dafb",
    },
    {
      id: 2,
      title: "Flutter",
      description: "React Native enables seamless cross-platform mobile development, native-like performance.",
      image: "/images/flutter.jpg",
      rating: 4.8,
      price: "₹1499",
      originalPrice: "₹3999",
      color: "#02569B",
    },
    {
      id: 3,
      title: "Kotlin",
      description: "React Native enables seamless cross-platform mobile development, native-like performance.",
      image: "/images/kotlin.jpg",
      rating: 4.6,
      price: "₹1499",
      originalPrice: "₹3999",
      color: "#7F52FF",
    },
  ]

  const learningProgress = [
    {
      id: 1,
      title: "HTML5 Design",
      progress: 50,
      videos: 18,
      color: "#10b981",
    },
    {
      id: 2,
      title: "UI/UX Design",
      progress: 50,
      videos: 15,
      color: "#f59e0b",
    },
    {
      id: 3,
      title: "Copywriting",
      progress: 50,
      videos: 16,
      color: "#06b6d4",
    },
    {
      id: 4,
      title: "Mobile Apps",
      progress: 50,
      videos: 22,
      color: "#8b5cf6",
    },
  ]

  const recommendedCourses = [
    {
      id: 1,
      title: "Cyber Security",
      videos: 10,
      icon: "security",
      color: "#ef4444",
    },
    {
      id: 2,
      title: "Python",
      videos: 12,
      icon: "code",
      color: "#06b6d4",
    },
    {
      id: 3,
      title: "Prompt Engineering",
      videos: 16,
      icon: "psychology",
      color: "#10b981",
    },
    {
      id: 4,
      title: "AI Analysis",
      videos: 11,
      icon: "analytics",
      color: "#8b5cf6",
    },
    {
      id: 5,
      title: "React JS",
      videos: 21,
      icon: "code",
      color: "#f59e0b",
    },
  ]

  const tabs = [
    { id: "enrolled", label: "Enrolled Courses", icon: "school" },
    { id: "available", label: "Available Courses", icon: "library_books" },
    { id: "other1", label: "Other Details", icon: "info" },
    { id: "other2", label: "Other Details", icon: "info" },
  ]

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.searchContainer}>
              <span className="material-icons">search</span>
              <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>

            <div className={styles.userSection}>
              <button className={styles.notificationBtn}>
                <span className="material-icons">notifications</span>
                <span className={styles.notificationBadge}></span>
              </button>
              <Profile />
            </div>
          </div>
        </header>

        <div className={styles.contentWrapper}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            {/* Course Banner */}
            <div className={styles.courseBanner}>
              <div className={styles.bannerContent}>
                <h1 className={styles.bannerTitle}>Sharpen Your Skills with Professional Online Courses</h1>
                <p className={styles.bannerText}>
                  Artificial Intelligence is transforming the way businesses operate, making processes smarter and more
                  efficient. Join our comprehensive online courses today.
                </p>
              </div>
              <div className={styles.bannerImage}>
                <img
                  src="/images/course-banner.png"
                  alt="Course illustration"
                  className={styles.bannerImg}
                  draggable={false}
                />
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabsContainer}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="material-icons">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Enrolled Courses Section */}
            {activeTab === "enrolled" && (
              <>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Enrolled Courses</h2>
                  <button className={styles.seeAllBtn}>See All</button>
                </div>

                <div className={styles.coursesGrid}>
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className={styles.courseCard}>
                      <div className={styles.courseImageContainer}>
                        <img
                          src={course.image || "/placeholder.svg?height=200&width=300"}
                          alt={course.title}
                          className={styles.courseImage}
                        />
                        <div className={styles.courseOverlay}>
                          <button className={styles.viewCourseBtn}>View Course</button>
                        </div>
                      </div>
                      <div className={styles.courseInfo}>
                        <h3 className={styles.courseTitle}>{course.title}</h3>
                        <p className={styles.courseDescription}>{course.description}</p>
                        <div className={styles.courseFooter}>
                          <div className={styles.courseRating}>
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`material-icons ${styles.star} ${i < Math.floor(course.rating) ? styles.filled : ""}`}
                              >
                                star
                              </span>
                            ))}
                          </div>
                          <div className={styles.coursePrice}>
                            <span className={styles.currentPrice}>{course.price}</span>
                            <span className={styles.originalPrice}>{course.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Learning Time Section */}
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Learning Time</h2>
                </div>

                <div className={styles.learningGrid}>
                  {learningProgress.map((item) => (
                    <div key={item.id} className={styles.learningCard}>
                      <div className={styles.progressCircle}>
                        <svg className={styles.progressRing} width="80" height="80">
                          <circle
                            className={styles.progressRingCircle}
                            stroke="#e5e7eb"
                            strokeWidth="6"
                            fill="transparent"
                            r="34"
                            cx="40"
                            cy="40"
                          />
                          <circle
                            className={styles.progressRingProgress}
                            stroke={item.color}
                            strokeWidth="6"
                            fill="transparent"
                            r="34"
                            cx="40"
                            cy="40"
                            strokeDasharray={`${2 * Math.PI * 34}`}
                            strokeDashoffset={`${2 * Math.PI * 34 * (1 - item.progress / 100)}`}
                          />
                        </svg>
                        <div className={styles.progressText}>
                          <span className={styles.progressPercent}>{item.progress}%</span>
                        </div>
                      </div>
                      <h3 className={styles.learningTitle}>{item.title}</h3>
                      <p className={styles.learningVideos}>{item.videos} videos</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Other tabs content */}
            {activeTab !== "enrolled" && (
              <div className={styles.tabContent}>
                <h2 className={styles.sectionTitle}>Coming Soon</h2>
                <p className={styles.comingSoon}>This section is under development.</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className={styles.rightSidebar}>
            {/* Daily Streak */}
            <div className={styles.streakCard}>
              <div className={styles.streakHeader}>
                <div className={styles.streakIcon}>
                  <span className="material-icons">local_fire_department</span>
                </div>
                <div className={styles.streakInfo}>
                  <h3 className={styles.streakTitle}>Your Daily Streak</h3>
                  <p className={styles.streakSubtitle}>Complete your daily goals to keep your streak alive!</p>
                </div>
              </div>

              <div className={styles.streakStats}>
                <div className={styles.streakDays}>
                  <span className={styles.streakNumber}>4</span>
                  <span className={styles.streakLabel}>Days</span>
                  <span className={styles.streakStatus}>Active</span>
                </div>

                <div className={styles.streakProgress}>
                  <svg className={styles.streakRing} width="80" height="80">
                    <circle
                      className={styles.streakRingCircle}
                      stroke="#e5e7eb"
                      strokeWidth="6"
                      fill="transparent"
                      r="34"
                      cx="40"
                      cy="40"
                    />
                    <circle
                      className={styles.streakRingProgress}
                      stroke="#10b981"
                      strokeWidth="6"
                      fill="transparent"
                      r="34"
                      cx="40"
                      cy="40"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - 0.5)}`}
                    />
                  </svg>
                  <div className={styles.streakProgressText}>
                    <span className={styles.streakTime}>15/30</span>
                    <span className={styles.streakUnit}>min</span>
                  </div>
                </div>
              </div>

              <div className={styles.streakCalendar}>
                <div className={styles.streakDate}>
                  <span className={styles.streakToday}>Today visited</span>
                  <span className={styles.streakDateText}>Jun 30</span>
                </div>
                <div className={styles.weekDays}>
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                    <span key={index} className={`${styles.weekDay} ${index < 4 ? styles.completed : ""}`}>
                      {day}
                    </span>
                  ))}
                </div>
                <p className={styles.streakReward}>🏆 7 days = Gold Badge + ₹200 voucher</p>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className={styles.recommendedCard}>
              <div className={styles.recommendedHeader}>
                <h3 className={styles.recommendedTitle}>Recommended Courses</h3>
              </div>

              <div className={styles.recommendedList}>
                {recommendedCourses.map((course) => (
                  <div key={course.id} className={styles.recommendedItem}>
                    <div className={styles.recommendedIcon} style={{ backgroundColor: course.color }}>
                      <span className="material-icons">{course.icon}</span>
                    </div>
                    <div className={styles.recommendedInfo}>
                      <h4 className={styles.recommendedName}>{course.title}</h4>
                      <p className={styles.recommendedVideos}>{course.videos} videos</p>
                    </div>
                    <button className={styles.recommendedOptions}>
                      <span className="material-icons">more_vert</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export availableCourses for other components
export const availableCourses = [
  {
    image: "/images/fullStack.jpg",
    title: "Python Programming",
    description: "Start your journey with Python programming.",
    price: "199.99",
    rating: 4.5,
    reviewCount: 80,
    duration: 25,
  },
  {
    image: "/images/ai_analysis.png",
    title: "Data Science Essentials",
    description: "Master the basics of Data Science.",
    price: "299.99",
    rating: 4.7,
    reviewCount: 95,
    duration: 40,
  },
  {
    image: "/images/backend.jpg",
    title: "Machine Learning",
    description: "Introduction to Machine Learning concepts.",
    price: "399.99",
    rating: 4.6,
    reviewCount: 70,
    duration: 35,
  },
  {
    image: "/images/FrontEnd.jpg",
    title: "Frontend for Beginners",
    description: "Learn the basics of React.js with hands-on projects.",
    price: "Free",
    rating: 4.8,
    reviewCount: 120,
    duration: 30,
  },
  {
    image: "/images/cyber_security.png",
    title: "Cyber Security Basics",
    description: "Learn the basics of Cyber Security with hands-on projects.",
    price: "399.99",
    rating: 4.2,
    reviewCount: 50,
    duration: 15,
  },
]

export default Courses
