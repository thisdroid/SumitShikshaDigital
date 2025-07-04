"use client"

import { useState, useEffect } from "react"
import styles from "./Courses.module.css"
import Header from "../header/Header"
import CourseCard from "./CourseCard"

function getTodayString() {
  const today = new Date()
  const options = { month: "short", day: "numeric" }
  return today.toLocaleDateString("en-US", options)
}

function getTodayWeekIndex() {
  return new Date().getDay()
}

function getLocalStreak() {
  const streak = parseInt(localStorage.getItem("streak") || "1", 10)
  const lastDate = localStorage.getItem("lastStreakDate")
  return { streak, lastDate }
}

function setLocalStreak(streak, date) {
  localStorage.setItem("streak", streak)
  localStorage.setItem("lastStreakDate", date)
}

const Courses = () => {
  const [activeTab, setActiveTab] = useState("enrolled")
  const [streak, setStreak] = useState(1)

  useEffect(() => {
    const today = new Date()
    const todayStr = today.toISOString().slice(0, 10) // YYYY-MM-DD
    const { streak: storedStreak, lastDate } = getLocalStreak()

    if (!lastDate) {
      setLocalStreak(1, todayStr)
      setStreak(1)
      return
    }

    if (lastDate === todayStr) {
      setStreak(storedStreak)
      return
    }

    const last = new Date(lastDate)
    const diff = Math.floor((today - last) / (1000 * 60 * 60 * 24))

    if (diff === 1) {
      setLocalStreak(storedStreak + 1, todayStr)
      setStreak(storedStreak + 1)
    } else if (diff > 1) {
      setLocalStreak(1, todayStr)
      setStreak(1)
    } else {
      setStreak(storedStreak)
    }
  }, [])

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
  ]

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        {/* Header Component */}
        <Header />

        <div className={styles.contentWrapper}>
          <div className={styles.leftContent}>
            <div className={styles.courseBanner}>
              <div className={styles.bannerContent}>
                <h1 className={styles.bannerTitle}>Sharpen Your Skills with Professional Online Courses</h1>
                <button className={styles.joinButton}>JOIN US</button>
              </div>
              <div className={styles.bannerImage}>
                <img
                  src="/images/student-dashboard-banner.png"
                  alt="Course illustration"
                  className={styles.bannerImg}
                  draggable={false}
                />
              </div>
            </div>

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

            {activeTab === "enrolled" && (
              <>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Enrolled Courses</h2>
                  <button className={styles.seeAllBtn}>See All</button>
                </div>
                <div className={styles.coursesGrid}>
                  {enrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </>
            )}

            {activeTab === "available" && (
              <>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Available Courses</h2>
                  <button className={styles.seeAllBtn}>See All</button>
                </div>
                <div className={styles.coursesGrid}>
                  {availableCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className={styles.rightSidebar}>
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
                  <span className={styles.streakNumber}>{streak}</span>
                  <span className={styles.streakLabel}>Days</span>
                  <span className={styles.streakStatus}>Active</span>
                </div>
              </div>
              <div className={styles.streakCalendar}>
                <div className={styles.streakDate}>
                  <span className={styles.streakToday}>Today visited</span>
                  <span className={styles.streakDateText}>{getTodayString()}</span>
                </div>
                <div className={styles.weekDays}>
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => {
                    const todayIdx = getTodayWeekIndex()
                    // Mark completed for the streak days ending today (max 7)
                    let completed = false
                    if (streak > 0) {
                      if (streak >= 7) completed = true
                      else if (index <= todayIdx && index > todayIdx - streak) completed = true
                    }
                    return (
                      <span key={index} className={`${styles.weekDay} ${completed ? styles.completed : ""}`}>
                        {day}
                      </span>
                    )
                  })}
                </div>
                {/* <p className={styles.streakReward}>🏆 7 days = Gold Badge + ₹200 voucher</p> */}
              </div>
            </div>

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

export const availableCourses = [
  {
    image: "/images/fullStack.jpg",
    title: "Python Programming",
    description: "Start your journey with Python programming.",
    price: "Free",
    rating: 4.5,
    reviewCount: 80,
    duration: 25,
  },
  {
    image: "/images/ai_analysis.png",
    title: "Data Science Essentials",
    description: "Master the basics of Data Science.",
    price: "₹299.99",
    rating: 4.7,
    reviewCount: 95,
    duration: 40,
  },
  {
    image: "/images/backend.jpg",
    title: "Machine Learning",
    description: "Introduction to Machine Learning concepts.",
    price: "₹399.99",
    rating: 4.6,
    reviewCount: 70,
    duration: 35,
  },
  {
    image: "/images/FrontEnd.jpg",
    title: "Frontend for Beginners",
    description: "Learn the basics of React.js with hands-on projects.",
    price: "₹199.99",
    rating: 4.8,
    reviewCount: 120,
    duration: 30,
  },
  {
    image: "/images/cyber_security.png",
    title: "Cyber Security Basics",
    description: "Learn the basics of Cyber Security with hands-on projects.",
    price: "₹399.99",
    rating: 4.2,
    reviewCount: 50,
    duration: 15,
  },
]

export const enrolledCourses = [
  {
    id: 1,
    title: "React Native",
    description: "React Native enables seamless cross-platform mobile development, cross-platform mobile development",
    image: "/images/backend.jpg",
    rating: 2,
    reviewCount: 120,
    duration: 30,
    price: "₹1499",
    color: "#61dafb",
  },
  {
    id: 2,
    title: "Flutter",
    description: "React Native enables seamless cross-platform mobile development, native-like performance.",
    image: "/images/ai_analysis.png",
    rating: 3,
    reviewCount: 95,
    duration: 25,
    price: "₹1499",
    color: "#02569B",
  },
  {
    id: 3,
    title: "Flutter Advanced",
    description: "Advanced Flutter concepts for professional mobile development.",
    image: "/images/cyber_security.png",
    rating: 4.6,
    reviewCount: 78,
    duration: 35,
    price: "₹1499",
    color: "#02569B",
  },
  {
    id: 4,
    title: "Flutter Pro",
    description: "Professional Flutter development with advanced techniques.",
    image: "/images/FrontEnd.jpg",
    rating: 4.7,
    reviewCount: 65,
    duration: 40,
    price: "₹1499",
    color: "#02569B",
  },
  {
    id: 5,
    title: "Flutter Expert",
    description: "Expert-level Flutter development and architecture patterns.",
    image: "/images/fullStack.jpg",
    rating: 4.9,
    reviewCount: 52,
    duration: 45,
    price: "₹1499",
    color: "#02569B",
  },
  {
    id: 6,
    title: "Flutter Master",
    description: "Master Flutter development with real-world projects.",
    image: "/images/prompt_engineering.png",
    rating: 4.4,
    reviewCount: 89,
    duration: 50,
    price: "₹1499",
    color: "#02569B",
  },
  {
    id: 7,
    title: "Flutter Complete",
    description: "Complete Flutter course from beginner to advanced level.",
    image: "/images/backend.jpg",
    rating: 4.3,
    reviewCount: 110,
    duration: 60,
    price: "₹1499",
    color: "#02569B",
  },
  {
    id: 8,
    title: "Kotlin",
    description: "Modern Android development with Kotlin programming language.",
    image: "/images/ai_analysis.png",
    rating: 4.6,
    reviewCount: 75,
    duration: 28,
    price: "₹1499",
    color: "#7F52FF",
  },
]

export default Courses
