"use client"
import { useState } from "react"
import styles from "./StudentPerformance.module.css"
import Header from "./header/Header"
import Calendar from "../../components/common_components/Calendar"

const StudentPerformance = () => {
  const [selectedCourse, setSelectedCourse] = useState("All Courses")

  // Function to calculate performance based on percentage
  const calculatePerformance = (obtainedMarks, totalMarks) => {
    const percentage = (obtainedMarks / totalMarks) * 100
    if (percentage >= 90) return "Excellent"
    if (percentage >= 80) return "Good"
    if (percentage >= 70) return "Average"
    if (percentage >= 60) return "Weak"
    return "Poor"
  }

  // Sample performance data
  const performanceData = [
    {
      course: "React Basics",
      attempts: 2,
      highestMarks: 85,
      totalMarks: 100,
      obtainedMarks: 85,
    },
    {
      course: "Python Fundamentals",
      attempts: 1,
      highestMarks: 78,
      totalMarks: 100,
      obtainedMarks: 78,
    },
    {
      course: "Data Structures",
      attempts: 3,
      highestMarks: 92,
      totalMarks: 100,
      obtainedMarks: 92,
    },
    {
      course: "JavaScript Advanced Concepts",
      highestMarks: 65,
      totalMarks: 100,
      obtainedMarks: 65,
    },
    {
      course: "Database Management",
      attempts: 1,
      highestMarks: 45,
      totalMarks: 100,
      obtainedMarks: 45,
    },
  ].map((item) => ({
    ...item,
    performance: calculatePerformance(item.obtainedMarks, item.totalMarks),
  }))

  const courses = ["All Courses", ...performanceData.map((item) => item.course)]

  const filteredData =
    selectedCourse === "All Courses"
      ? performanceData
      : performanceData.filter((item) => item.course === selectedCourse)

  // Calculate metrics
  const totalMarksObtained = performanceData.reduce((sum, item) => sum + item.obtainedMarks, 0)
  const averageScore = Math.round(
    performanceData.reduce((sum, item) => sum + item.obtainedMarks, 0) / performanceData.length,
  )
  const highestScore = Math.max(...performanceData.map((item) => item.highestMarks))
  const coursesTaken = performanceData.length

  const metrics = [
    {
      icon: "grade",
      label: "Total Marks Obtained",
      value: totalMarksObtained.toString(),
      color: "#3b82f6",
    },
    {
      icon: "trending_up",
      label: "Average Score",
      value: `${averageScore}%`,
      color: "#10b981",
    },
    {
      icon: "emoji_events",
      label: "Highest Score",
      value: `${highestScore}%`,
      color: "#f59e0b",
    },
    {
      icon: "school",
      label: "Courses Taken",
      value: coursesTaken.toString(),
      color: "#8b5cf6",
    },
  ]

  // Recent performance data for sidebar - also calculate performance
  const recentPerformance = [
    {
      id: 1,
      courseName: "React Basics",
      score: 85,
      date: "Dec 10, 2024",
      type: "course",
    },
    {
      id: 2,
      courseName: "Python Fundamentals",
      score: 78,
      date: "Dec 8, 2024",
      type: "course",
    },
    {
      id: 3,
      courseName: "Data Structures",
      score: 92,
      date: "Dec 5, 2024",
      type: "course",
    },
  ].map((item) => ({
    ...item,
    status: calculatePerformance(item.score, 100).toLowerCase().replace(" ", ""),
  }))

  const handleDateClick = (dateInfo) => {
    console.log("Date clicked:", dateInfo)
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        {/* Header Component */}
        <Header />
        <div className={styles.contentWrapper}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            {/* Performance Banner */}
            <div className={styles.examBanner}>
              <div className={styles.bannerContent}>
                <h1 className={styles.bannerTitle}>Track Your Academic Progress</h1>
                <p className={styles.bannerText}>
                  Monitor your performance across all courses and exams. View detailed analytics and track your
                  improvement over time.
                </p>
              </div>
              <div className={styles.bannerImage}>
                <img
                  src="/images/student-dashboard-banner.png?height=200&width=300"
                  alt="Performance illustration"
                  className={styles.bannerImg}
                  draggable={false}
                />
              </div>
            </div>

            {/* Filter Section */}
            <div className={styles.filterSection}>
              <div className={styles.filterContainer}>
                <span className={styles.filterLabel}>Filter by Course:</span>
                <select
                  className={styles.filterDropdown}
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                >
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
              {metrics.map((metric, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ color: metric.color }}>
                    <span className="material-icons">{metric.icon}</span>
                  </div>
                  <div className={styles.statValue}>{metric.value}</div>
                  <div className={styles.statLabel}>{metric.label}</div>
                </div>
              ))}
            </div>

            {/* Performance Details Section */}
            <div className={styles.performanceSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Performance Details</h2>
              </div>

              {filteredData.length > 0 ? (
                <>
                  {/* Desktop Table */}
                  <div className={styles.tableContainer}>
                    <div className={styles.tableWrapper}>
                      <table className={styles.dataTable}>
                        <thead>
                          <tr>
                            <th>Course</th>
                            <th className={styles.centerAlign}>Attempts</th>
                            <th className={styles.centerAlign}>Highest Marks</th>
                            <th className={styles.centerAlign}>Total Marks</th>
                            <th className={styles.centerAlign}>Obtained Marks</th>
                            <th className={styles.centerAlign}>Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredData.map((item, index) => (
                            <tr key={index}>
                              <td className={styles.courseCell}>
                                <div className={styles.courseInfo}>
                                  <span className="material-icons">school</span>
                                  <span title={item.course}>{item.course}</span>
                                </div>
                              </td>
                              <td className={styles.centerAlign}>{item.attempts}</td>
                              <td className={styles.centerAlign}>{item.highestMarks}%</td>
                              <td className={styles.centerAlign}>{item.totalMarks}</td>
                              <td className={styles.centerAlign}>{item.obtainedMarks}</td>
                              <td className={styles.centerAlign}>
                                <span
                                  className={`${styles.performanceBadge} ${styles[item.performance.toLowerCase().replace(" ", "")]}`}
                                >
                                  {item.performance}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile Cards */}
                  <div className={styles.mobileCards}>
                    {filteredData.map((item, index) => (
                      <div key={index} className={styles.mobileCard}>
                        <div className={styles.mobileCardHeader}>
                          <div className={styles.courseInfo}>
                            <span className="material-icons">school</span>
                            <span className={styles.courseName} title={item.course}>
                              {item.course}
                            </span>
                          </div>
                          <span
                            className={`${styles.performanceBadge} ${styles[item.performance.toLowerCase().replace(" ", "")]}`}
                          >
                            {item.performance}
                          </span>
                        </div>
                        <div className={styles.mobileCardContent}>
                          <div className={styles.mobileCardRow}>
                            <span className={styles.mobileLabel}>Attempts:</span>
                            <span className={styles.mobileValue}>{item.attempts}</span>
                          </div>
                          <div className={styles.mobileCardRow}>
                            <span className={styles.mobileLabel}>Highest Marks:</span>
                            <span className={styles.mobileValue}>{item.highestMarks}%</span>
                          </div>
                          <div className={styles.mobileCardRow}>
                            <span className={styles.mobileLabel}>Total Marks:</span>
                            <span className={styles.mobileValue}>{item.totalMarks}</span>
                          </div>
                          <div className={styles.mobileCardRow}>
                            <span className={styles.mobileLabel}>Obtained Marks:</span>
                            <span className={styles.mobileValue}>{item.obtainedMarks}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.noDataMessage}>
                  <span className="material-icons">info</span>
                  No performance data available for the selected filter.
                </div>
              )}
            </div>

            {/* Chart Section */}
            <div className={styles.chartSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Course Performance Distribution</h2>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.noChartMessage}>
                  <span className="material-icons">bar_chart</span>
                  <span>Performance charts will be available soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={styles.rightSidebar}>
            {/* Calendar Component */}
            <Calendar title="Calendar" showYearSelector={true} onDateClick={handleDateClick} highlightedDates={[]} />

            {/* Recent Performance */}
            <div className={styles.resultsCard}>
              <div className={styles.resultsHeader}>
                <h3 className={styles.resultsTitle}>Recent Performance</h3>
                <button className={styles.seeAllBtn}>View All</button>
              </div>
              <div className={styles.resultsList}>
                {recentPerformance.map((result) => (
                  <div key={result.id} className={styles.resultItem}>
                    <div className={styles.resultIcon}>
                      <span className={`material-icons ${styles[result.status]}`}>
                        {result.status === "excellent"
                          ? "star"
                          : result.status === "good"
                            ? "thumb_up"
                            : result.status === "average"
                              ? "trending_up"
                              : result.status === "weak"
                                ? "trending_down"
                                : "warning"}
                      </span>
                    </div>
                    <div className={styles.resultInfo}>
                      <h4 className={styles.resultExam}>{result.courseName}</h4>
                      <p className={styles.resultDate}>
                        {result.date} • {result.type === "course" ? "Course" : "Exam"}
                      </p>
                    </div>
                    <div className={styles.resultScore}>
                      <span className={`${styles.scoreValue} ${styles[result.status]}`}>{result.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className={styles.tipsCard}>
              <div className={styles.tipsHeader}>
                <h3 className={styles.tipsTitle}>Performance Tips</h3>
              </div>
              <div className={styles.tipsList}>
                <div className={styles.tipItem}>
                  <span className="material-icons">trending_up</span>
                  <span>Review your weak areas regularly</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">schedule</span>
                  <span>Set consistent study schedules</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">psychology</span>
                  <span>Practice active learning techniques</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">analytics</span>
                  <span>Track your progress over time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentPerformance
