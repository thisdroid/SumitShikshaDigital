"use client"
import { useState, useEffect } from "react"
import styles from "./Courses.module.css"
import Header from "../header/Header"
import CourseCard from "./CourseCard"
import CoursesSkeleton from "./CoursesSkeleton"

function getTodayString() {
  const today = new Date()
  const options = { month: "short", day: "numeric" }
  return today.toLocaleDateString("en-US", options)
}

function getTodayWeekIndex() {
  return new Date().getDay()
}

function getLocalStreak() {
  const streak = Number.parseInt(localStorage.getItem("streak") || "1", 10)
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Always show skeleton for 500ms, then run streak logic and show content
    const timer = setTimeout(() => {
      // Streak logic after skeleton
      const today = new Date()
      const todayStr = today.toISOString().slice(0, 10)
      const { streak: storedStreak, lastDate } = getLocalStreak()

      if (!lastDate) {
        setLocalStreak(1, todayStr)
        setStreak(1)
        setLoading(false)
        return
      }

      if (lastDate === todayStr) {
        setStreak(storedStreak)
        setLoading(false)
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
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
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

  if (loading) return <CoursesSkeleton />

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
    id: 1,
    image: "/images/fullStack.jpg",
    title: "Python Programming",
    description:
      "Start your journey with Python programming and learn the fundamentals of one of the most popular programming languages.",
    price: "Free",
    originalPrice: null,
    rating: 4.5,
    reviewCount: 80,
    duration: 25,
    studentsCount: 1250,
    lessonsCount: 18,
    projectsCount: 3,
    level: "Beginner",
    language: "English",
    lastUpdated: "December 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Python syntax and basic programming concepts",
      "Data types, variables, and control structures",
      "Functions and object-oriented programming",
      "File handling and error management",
      "Working with libraries and modules",
      "Building simple applications and scripts",
    ],
    courseContent: [
      { title: "Python Basics", lessons: 4, duration: "1 hour" },
      { title: "Data Structures", lessons: 5, duration: "1.5 hours" },
      { title: "Functions and OOP", lessons: 6, duration: "2 hours" },
      { title: "File Operations", lessons: 3, duration: "45 mins" },
    ],
    keyHighlights: [
      "Beginner-friendly approach",
      "Hands-on coding exercises",
      "Real-world project examples",
      "Industry best practices",
      "Career guidance included",
    ],
  },
  {
    id: 2,
    image: "/images/ai_analysis.png",
    title: "Data Science Essentials",
    description:
      "Master the basics of Data Science and learn to analyze data effectively using modern tools and techniques.",
    price: "₹299.99",
    originalPrice: "₹1,999",
    rating: 4.7,
    reviewCount: 95,
    duration: 40,
    studentsCount: 890,
    lessonsCount: 28,
    projectsCount: 5,
    level: "Intermediate",
    language: "English",
    lastUpdated: "November 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Data analysis fundamentals",
      "Statistical concepts and methods",
      "Data visualization techniques",
      "Working with pandas and numpy",
      "Machine learning basics",
      "Creating data-driven insights",
    ],
    courseContent: [
      { title: "Introduction to Data Science", lessons: 5, duration: "2 hours" },
      { title: "Data Analysis with Python", lessons: 8, duration: "3 hours" },
      { title: "Statistical Methods", lessons: 7, duration: "2.5 hours" },
      { title: "Data Visualization", lessons: 5, duration: "2 hours" },
      { title: "Machine Learning Basics", lessons: 3, duration: "1.5 hours" },
    ],
    keyHighlights: [
      "Industry-relevant curriculum",
      "Real datasets and projects",
      "Statistical analysis focus",
      "Career transition support",
      "Expert instructor guidance",
    ],
  },
  {
    id: 3,
    image: "/images/backend.jpg",
    title: "Machine Learning",
    description: "Introduction to Machine Learning concepts and practical implementation using popular frameworks.",
    price: "₹399.99",
    originalPrice: "₹2,499",
    rating: 4.6,
    reviewCount: 70,
    duration: 35,
    studentsCount: 650,
    lessonsCount: 24,
    projectsCount: 4,
    level: "Advanced",
    language: "English",
    lastUpdated: "December 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Machine learning algorithms and concepts",
      "Supervised and unsupervised learning",
      "Model training and evaluation",
      "Feature engineering techniques",
      "Deep learning fundamentals",
      "Real-world ML applications",
    ],
    courseContent: [
      { title: "ML Fundamentals", lessons: 6, duration: "2.5 hours" },
      { title: "Supervised Learning", lessons: 8, duration: "3 hours" },
      { title: "Unsupervised Learning", lessons: 5, duration: "2 hours" },
      { title: "Deep Learning Intro", lessons: 5, duration: "2.5 hours" },
    ],
    keyHighlights: [
      "Advanced ML techniques",
      "Industry case studies",
      "Practical implementation focus",
      "Portfolio project development",
      "Expert mentorship included",
    ],
  },
  {
    id: 4,
    image: "/images/FrontEnd.jpg",
    title: "Frontend for Beginners",
    description: "Learn the basics of React.js with hands-on projects and build modern web applications.",
    price: "₹199.99",
    originalPrice: "₹1,499",
    rating: 4.8,
    reviewCount: 120,
    duration: 30,
    studentsCount: 1450,
    lessonsCount: 22,
    projectsCount: 6,
    level: "Beginner",
    language: "English",
    lastUpdated: "December 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "React.js fundamentals and components",
      "State management and props",
      "Event handling and lifecycle methods",
      "Building responsive user interfaces",
      "Working with APIs and data",
      "Modern development practices",
    ],
    courseContent: [
      { title: "React Basics", lessons: 6, duration: "2 hours" },
      { title: "Components and Props", lessons: 5, duration: "1.5 hours" },
      { title: "State Management", lessons: 6, duration: "2.5 hours" },
      { title: "Advanced Concepts", lessons: 5, duration: "2 hours" },
    ],
    keyHighlights: [
      "Project-based learning",
      "Modern React practices",
      "Responsive design focus",
      "Industry-standard tools",
      "Job-ready skills development",
    ],
  },
  {
    id: 5,
    image: "/images/cyber_security.png",
    title: "Cyber Security Basics",
    description: "Learn the basics of Cyber Security with hands-on projects and protect digital assets effectively.",
    price: "₹399.99",
    originalPrice: "₹2,299",
    rating: 4.2,
    reviewCount: 50,
    duration: 15,
    studentsCount: 420,
    lessonsCount: 16,
    projectsCount: 3,
    level: "Beginner",
    language: "English",
    lastUpdated: "October 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Cybersecurity fundamentals and principles",
      "Network security and protocols",
      "Threat detection and prevention",
      "Security tools and techniques",
      "Risk assessment and management",
      "Incident response procedures",
    ],
    courseContent: [
      { title: "Security Fundamentals", lessons: 4, duration: "1.5 hours" },
      { title: "Network Security", lessons: 5, duration: "2 hours" },
      { title: "Threat Management", lessons: 4, duration: "1.5 hours" },
      { title: "Security Tools", lessons: 3, duration: "1 hour" },
    ],
    keyHighlights: [
      "Practical security scenarios",
      "Industry-standard tools",
      "Hands-on lab exercises",
      "Security certification prep",
      "Expert instructor guidance",
    ],
  },
]

export const enrolledCourses = [
  {
    id: 1,
    title: "React Native",
    description:
      "React Native enables seamless cross-platform mobile development with native-like performance and efficiency.",
    image: "/images/backend.jpg",
    rating: 4.2,
    reviewCount: 120,
    duration: 30,
    price: "₹1499",
    originalPrice: "₹3,999",
    color: "#61dafb",
    studentsCount: 980,
    lessonsCount: 26,
    projectsCount: 5,
    level: "Intermediate",
    language: "English",
    lastUpdated: "November 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "React Native fundamentals and setup",
      "Cross-platform mobile development",
      "Navigation and state management",
      "Native device features integration",
      "Performance optimization techniques",
      "App store deployment process",
    ],
    courseContent: [
      { title: "React Native Setup", lessons: 4, duration: "1.5 hours" },
      { title: "Core Components", lessons: 8, duration: "3 hours" },
      { title: "Navigation & State", lessons: 7, duration: "2.5 hours" },
      { title: "Native Features", lessons: 5, duration: "2 hours" },
      { title: "Deployment", lessons: 2, duration: "1 hour" },
    ],
    keyHighlights: [
      "Cross-platform development",
      "Native performance optimization",
      "Real-world app projects",
      "Industry best practices",
      "App store deployment guide",
    ],
  },
  {
    id: 2,
    title: "Flutter",
    description:
      "Flutter enables seamless cross-platform mobile development with native-like performance and beautiful UIs.",
    image: "/images/ai_analysis.png",
    rating: 4.3,
    reviewCount: 95,
    duration: 25,
    price: "₹1499",
    originalPrice: "₹3,499",
    color: "#02569B",
    studentsCount: 750,
    lessonsCount: 20,
    projectsCount: 4,
    level: "Beginner",
    language: "English",
    lastUpdated: "December 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Flutter framework fundamentals",
      "Dart programming language",
      "Widget-based UI development",
      "State management solutions",
      "API integration and data handling",
      "App publishing and deployment",
    ],
    courseContent: [
      { title: "Flutter & Dart Basics", lessons: 5, duration: "2 hours" },
      { title: "UI Development", lessons: 6, duration: "2.5 hours" },
      { title: "State Management", lessons: 5, duration: "2 hours" },
      { title: "Advanced Features", lessons: 4, duration: "1.5 hours" },
    ],
    keyHighlights: [
      "Beautiful UI development",
      "Single codebase for multiple platforms",
      "Hot reload development",
      "Google's framework expertise",
      "Production-ready applications",
    ],
  },
  {
    id: 3,
    title: "Flutter Advanced",
    description:
      "Advanced Flutter concepts for professional mobile development with complex architectures and patterns.",
    image: "/images/cyber_security.png",
    rating: 4.6,
    reviewCount: 78,
    duration: 35,
    price: "₹1499",
    originalPrice: "₹4,999",
    color: "#02569B",
    studentsCount: 520,
    lessonsCount: 28,
    projectsCount: 6,
    level: "Advanced",
    language: "English",
    lastUpdated: "November 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Advanced Flutter architecture patterns",
      "Custom widget development",
      "Performance optimization techniques",
      "Advanced state management",
      "Testing and debugging strategies",
      "Enterprise-level app development",
    ],
    courseContent: [
      { title: "Advanced Architecture", lessons: 8, duration: "3 hours" },
      { title: "Custom Widgets", lessons: 6, duration: "2.5 hours" },
      { title: "Performance Optimization", lessons: 7, duration: "3 hours" },
      { title: "Testing & Debugging", lessons: 5, duration: "2 hours" },
      { title: "Enterprise Patterns", lessons: 2, duration: "1 hour" },
    ],
    keyHighlights: [
      "Enterprise-level development",
      "Advanced architectural patterns",
      "Performance optimization focus",
      "Professional testing strategies",
      "Industry expert instruction",
    ],
  },
  {
    id: 4,
    title: "Flutter Pro",
    description:
      "Professional Flutter development with advanced techniques and enterprise-level application architecture.",
    image: "/images/FrontEnd.jpg",
    rating: 4.7,
    reviewCount: 65,
    duration: 40,
    price: "₹1499",
    originalPrice: "₹5,499",
    color: "#02569B",
    studentsCount: 380,
    lessonsCount: 32,
    projectsCount: 7,
    level: "Expert",
    language: "English",
    lastUpdated: "December 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Professional Flutter development practices",
      "Scalable application architecture",
      "Advanced animation and graphics",
      "Platform-specific integrations",
      "CI/CD pipeline setup",
      "Team collaboration workflows",
    ],
    courseContent: [
      { title: "Professional Setup", lessons: 6, duration: "2.5 hours" },
      { title: "Scalable Architecture", lessons: 8, duration: "3.5 hours" },
      { title: "Advanced UI/UX", lessons: 7, duration: "3 hours" },
      { title: "Platform Integration", lessons: 6, duration: "2.5 hours" },
      { title: "DevOps & Deployment", lessons: 5, duration: "2 hours" },
    ],
    keyHighlights: [
      "Professional development workflows",
      "Scalable architecture design",
      "Advanced UI/UX techniques",
      "DevOps integration",
      "Team collaboration focus",
    ],
  },
  {
    id: 5,
    title: "Flutter Expert",
    description:
      "Expert-level Flutter development and architecture patterns for building world-class mobile applications.",
    image: "/images/fullStack.jpg",
    rating: 4.9,
    reviewCount: 52,
    duration: 45,
    price: "₹1499",
    originalPrice: "₹5,999",
    color: "#02569B",
    studentsCount: 290,
    lessonsCount: 36,
    projectsCount: 8,
    level: "Expert",
    language: "English",
    lastUpdated: "November 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Expert-level Flutter architecture",
      "Custom engine modifications",
      "Advanced performance profiling",
      "Complex animation systems",
      "Multi-platform deployment strategies",
      "Open source contribution practices",
    ],
    courseContent: [
      { title: "Expert Architecture", lessons: 10, duration: "4 hours" },
      { title: "Engine Customization", lessons: 8, duration: "3.5 hours" },
      { title: "Performance Mastery", lessons: 7, duration: "3 hours" },
      { title: "Advanced Animations", lessons: 6, duration: "2.5 hours" },
      { title: "Open Source Contribution", lessons: 5, duration: "2 hours" },
    ],
    keyHighlights: [
      "Expert-level mastery",
      "Engine-level customization",
      "Performance optimization mastery",
      "Open source contribution",
      "Industry leadership preparation",
    ],
  },
  {
    id: 6,
    title: "Flutter Master",
    description:
      "Master Flutter development with real-world projects and comprehensive understanding of the ecosystem.",
    image: "/images/prompt_engineering.png",
    rating: 4.4,
    reviewCount: 89,
    duration: 50,
    price: "₹1499",
    originalPrice: "₹6,499",
    color: "#02569B",
    studentsCount: 450,
    lessonsCount: 40,
    projectsCount: 10,
    level: "Advanced",
    language: "English",
    lastUpdated: "December 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Complete Flutter ecosystem mastery",
      "Real-world project development",
      "Advanced debugging techniques",
      "Performance monitoring and optimization",
      "Team leadership and mentoring",
      "Industry trends and future technologies",
    ],
    courseContent: [
      { title: "Ecosystem Overview", lessons: 8, duration: "3 hours" },
      { title: "Real-world Projects", lessons: 12, duration: "5 hours" },
      { title: "Advanced Debugging", lessons: 6, duration: "2.5 hours" },
      { title: "Performance Monitoring", lessons: 7, duration: "3 hours" },
      { title: "Leadership & Mentoring", lessons: 5, duration: "2 hours" },
      { title: "Future Technologies", lessons: 2, duration: "1 hour" },
    ],
    keyHighlights: [
      "Complete ecosystem mastery",
      "Real-world project portfolio",
      "Advanced debugging skills",
      "Leadership development",
      "Future technology preparation",
    ],
  },
  {
    id: 7,
    title: "Flutter Complete",
    description: "Complete Flutter course from beginner to advanced level with comprehensive project-based learning.",
    image: "/images/backend.jpg",
    rating: 4.3,
    reviewCount: 110,
    duration: 60,
    price: "₹1499",
    originalPrice: "₹7,999",
    color: "#02569B",
    studentsCount: 680,
    lessonsCount: 48,
    projectsCount: 12,
    level: "All Levels",
    language: "English",
    lastUpdated: "November 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Complete Flutter development journey",
      "From basics to advanced concepts",
      "Multiple real-world applications",
      "Industry best practices",
      "Career development guidance",
      "Continuous learning strategies",
    ],
    courseContent: [
      { title: "Flutter Fundamentals", lessons: 10, duration: "4 hours" },
      { title: "Intermediate Concepts", lessons: 12, duration: "5 hours" },
      { title: "Advanced Development", lessons: 10, duration: "4.5 hours" },
      { title: "Real-world Projects", lessons: 12, duration: "5.5 hours" },
      { title: "Career Development", lessons: 4, duration: "1.5 hours" },
    ],
    keyHighlights: [
      "Complete learning journey",
      "Progressive skill development",
      "Extensive project portfolio",
      "Career guidance included",
      "Lifetime learning support",
    ],
  },
  {
    id: 8,
    title: "Kotlin",
    description: "Modern Android development with Kotlin programming language and contemporary development practices.",
    image: "/images/ai_analysis.png",
    rating: 4.6,
    reviewCount: 75,
    duration: 28,
    price: "₹1499",
    originalPrice: "₹3,999",
    color: "#7F52FF",
    studentsCount: 560,
    lessonsCount: 24,
    projectsCount: 5,
    level: "Intermediate",
    language: "English",
    lastUpdated: "December 2024",
    certificateAvailable: true,
    whatYouLearn: [
      "Kotlin programming fundamentals",
      "Modern Android development",
      "Jetpack Compose UI development",
      "Architecture components usage",
      "Testing and debugging strategies",
      "Play Store deployment process",
    ],
    courseContent: [
      { title: "Kotlin Fundamentals", lessons: 6, duration: "2.5 hours" },
      { title: "Android Development", lessons: 8, duration: "3.5 hours" },
      { title: "Jetpack Compose", lessons: 6, duration: "2.5 hours" },
      { title: "Architecture Components", lessons: 4, duration: "1.5 hours" },
    ],
    keyHighlights: [
      "Modern Android development",
      "Kotlin language mastery",
      "Jetpack Compose expertise",
      "Industry-standard practices",
      "Professional app development",
    ],
  },
]

export default Courses
