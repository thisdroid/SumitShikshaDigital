"use client"

import { useState, useEffect } from "react"
import styles from "./StudentDashboard.module.css"
import Sidebar from "../../components/common_components/Sidebar"
import Header from "./header/Header"
import Calendar from "../../components/common_components/Calendar"
import StudentDashboardSkeleton from "./StudentDashboardSkeleton"

const StudentDashboard = () => {
  const [selectedCourseTab, setSelectedCourseTab] = useState("All")
  const [loading, setLoading] = useState(true)

  // Sample data
  const statsData = [
    {
      icon: "school",
      label: "Courses Enroll",
      value: "16",
      color: "#f97316",
    },
    {
      icon: "quiz",
      label: "Available Exams",
      value: "88",
      color: "#8b5cf6",
    },
    {
      icon: "workspace_premium",
      label: "Certificate Earned",
      value: "62",
      color: "#f59e0b",
    },
    {
      icon: "local_fire_department",
      label: "Learning Streak",
      value: "256",
      color: "#10b981",
    },
  ]

  const allCourses = [
    {
      id: 1,
      name: "Advance level of Mobile Application Design Course",
      rating: 4.3,
      color: "#8b5cf6",
      status: "ongoing",
    },
    {
      id: 2,
      name: "Java Full Stack Course - 6 Month Online Bootcamp",
      rating: 4.0,
      color: "#3b82f6",
      status: "ongoing",
    },
    {
      id: 3,
      name: "Python Full Stack Course - 6 Month Online Bootcamp",
      rating: 4.3,
      color: "#eab308",
      status: "completed",
    },
  ]

  const getFilteredCourses = () => {
    if (selectedCourseTab === "All") return allCourses
    return allCourses.filter((course) => course.status === selectedCourseTab.toLowerCase())
  }

  const upcomingExams = [
    {
      id: 1,
      title: "React Basic",
      duration: "60 mins",
      color: "#ef4444",
      icon: "description",
    },
    {
      id: 2,
      title: "Assignment 103",
      duration: "60 mins",
      color: "#3b82f6",
      icon: "description",
    },
    {
      id: 3,
      title: "Assignment 103",
      duration: "60 mins",
      color: "#10b981",
      icon: "description",
    },
    {
      id: 4,
      title: "Assignment 103",
      duration: "60 mins",
      color: "#8b5cf6",
      icon: "description",
    },
    {
      id: 5,
      title: "Assignment 103",
      duration: "60 mins",
      color: "#f59e0b",
      icon: "description",
    },
  ]

  const activityData = [
    { day: "Sun", value: 30 },
    { day: "Mon", value: 45 },
    { day: "Tue", value: 35 },
    { day: "Wed", value: 60 },
    { day: "Thu", value: 55 },
    { day: "Fri", value: 70 },
    { day: "Sat", value: 40 },
  ]

  // Generate SVG path for activity chart
  const generateActivityPath = () => {
    const width = 300
    const height = 100
    const padding = 20
    const maxValue = Math.max(...activityData.map((d) => d.value))
    const points = activityData.map((data, index) => {
      const x = padding + (index * (width - 2 * padding)) / (activityData.length - 1)
      const y = height - padding - (data.value / maxValue) * (height - 2 * padding)
      return `${x},${y}`
    })
    return `M ${points.join(" L ")}`
  }

  const handleDateClick = (dateInfo) => {
    console.log("Date clicked:", dateInfo)
    // Add your date click logic here
  }

   useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <StudentDashboardSkeleton />
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* <Sidebar /> */}
      <div className={styles.mainContent}>
        {/* Header Component */}
        <Header />

        <div className={styles.contentWrapper}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            {/* Welcome Banner */}
            <div className={styles.welcomeBanner}>
              <div className={styles.welcomeContent}>
                <h1 className={styles.welcomeTitle}>Hi David Yadav!</h1>
                <p className={styles.welcomeText}>
                  Artificial Intelligence is transforming the way businesses operate, making processes smarter and more
                  efficient. Artificial Intelligence leader.
                </p>
              </div>
              <div className={styles.welcomeImage}>
                <img
                  src="/images/student-dashboard-banner.png"
                  alt="Welcome illustration"
                  className={styles.bannerImg}
                  draggable={false}
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
              {statsData.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ color: stat.color }}>
                    <span className="material-icons">{stat.icon}</span>
                  </div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Learning Time and Activity */}
            <div className={styles.chartsGrid}>
              {/* Learning Time */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.chartTitle}>Learning Time</h3>
                  <span className={styles.chartSubtitle}>Tuesday</span>
                </div>
                <div className={styles.circularChart}>
                  <div className={styles.circularProgress}>
                    <svg className={styles.progressRing} width="120" height="120">
                      <circle
                        className={styles.progressRingCircle}
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                      />
                      <circle
                        className={styles.progressRingProgress}
                        stroke="#10b981"
                        strokeWidth="8"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                        strokeDasharray={`${2 * Math.PI * 52}`}
                        strokeDashoffset={`${2 * Math.PI * 52 * (1 - 0.65)}`}
                      />
                    </svg>
                    <div className={styles.progressText}>
                      <div className={styles.progressTime}>2 Hours 35 mins</div>
                    </div>
                  </div>
                </div>
                <div className={styles.chartLegend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: "#10b981" }}></span>
                    <span>Reading</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: "#6b7280" }}></span>
                    <span>Assignment</span>
                  </div>
                </div>
              </div>

              {/* My Activity */}
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <h3 className={styles.chartTitle}>My Activity</h3>
                  <select className={styles.chartSelect}>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className={styles.activityChart}>
                  <div className={styles.activityLine}>
                    <svg width="100%" height="120" viewBox="0 0 300 120">
                      <defs>
                        <linearGradient id="activityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Area under the curve */}
                      <path d={`${generateActivityPath()} L 280 100 L 20 100 Z`} fill="url(#activityGradient)" />
                      {/* Main line */}
                      <path
                        d={generateActivityPath()}
                        stroke="#8b5cf6"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {/* Data points */}
                      {activityData.map((data, index) => {
                        const x = 20 + (index * 260) / (activityData.length - 1)
                        const y = 100 - 20 - (data.value / 70) * 60
                        return <circle key={index} cx={x} cy={y} r="4" fill="#8b5cf6" stroke="white" strokeWidth="2" />
                      })}
                      {/* Task 4 label */}
                      <circle cx="235" cy="45" r="4" fill="#8b5cf6" />
                      <text x="225" y="35" fontSize="12" fill="#8b5cf6" fontWeight="600">
                        Task 4
                      </text>
                    </svg>
                  </div>
                  <div className={styles.activityDays}>
                    {activityData.map((item, index) => (
                      <span key={index} className={styles.dayLabel}>
                        {item.day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* My Courses */}
            <div className={styles.coursesSection}>
              <div className={styles.coursesHeader}>
                <h3 className={styles.sectionTitle}>My Courses</h3>
                <div className={styles.courseTabs}>
                  {["All", "Ongoing", "Completed"].map((tab) => (
                    <button
                      key={tab}
                      className={`${styles.courseTab} ${selectedCourseTab === tab ? styles.activeTab : ""}`}
                      onClick={() => setSelectedCourseTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.coursesTable}>
                <div className={styles.tableHeader}>
                  <span>Name</span>
                </div>
                {getFilteredCourses().map((course) => (
                  <div key={course.id} className={styles.courseRow}>
                    <div className={styles.courseInfo}>
                      <div className={styles.courseIcon} style={{ backgroundColor: course.color }}>
                        <span className="material-icons">code</span>
                      </div>
                      <span className={styles.courseName}>{course.name}</span>
                    </div>
                    <div className={styles.courseRating}>
                      <span className="material-icons" style={{ color: "#fbbf24", fontSize: "1rem" }}>
                        star
                      </span>
                      <span className={styles.ratingValue}>{course.rating}</span>
                    </div>
                    <button className={styles.viewCourseBtn}>View Course</button>
                    {/* Mobile-only actions container */}
                    <div className={styles.courseActions}>
                      <div className={styles.courseRating}>
                        <span className="material-icons" style={{ color: "#fbbf24", fontSize: "1rem" }}>
                          star
                        </span>
                        <span className={styles.ratingValue}>{course.rating}</span>
                      </div>
                      <button className={styles.viewCourseBtn}>View Course</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={styles.rightSidebar}>
            {/* Calendar Component */}
            <Calendar title="Calendar" showYearSelector={true} onDateClick={handleDateClick} highlightedDates={[]} />

            {/* Upcoming Exams */}
            <div className={styles.upcomingCard}>
              <div className={styles.upcomingHeader}>
                <h3 className={styles.upcomingTitle}>Upcoming Exam</h3>
                <button className={styles.seeAllBtn}>See all</button>
              </div>
              <div className={styles.examsList}>
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className={styles.examItem}>
                    <div className={styles.examIcon} style={{ backgroundColor: exam.color }}>
                      <span className="material-icons">{exam.icon}</span>
                    </div>
                    <div className={styles.examInfo}>
                      <div className={styles.examTitle}>{exam.title}</div>
                      <div className={styles.examDuration}>{exam.duration}</div>
                    </div>
                    <button className={styles.examOptions}>
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

export default StudentDashboard
