"use client"
import { useState } from "react"
import styles from "./CollegeDashboard.module.css"
import CollegeSidebar from "../../components/common_components/CollegeSidebar"
import Header from "./CollegeHeader/CollegeHeaderFile"

const StudentDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <CollegeSidebar />
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>
          <div className={styles.statsSection}>
            <div className={styles.childStats}>
              <div className={styles.StatsCollege}>
                <span className="material-icons">school</span>
                <h3>Total Students</h3>
                <p>1,234</p>
                <a href="#">View Details</a>
              </div>
            </div>
            <div className={styles.childStats}>
              <div className={styles.StatsCollege}>
                <span className="material-icons">description</span>
                <h3>Total Exams</h3>
                <p>56</p>
                <a href="#">View Details</a>
              </div>
            </div>
            <div className={styles.childStats}>
              <div className={styles.StatsCollege}>
                <span className="material-icons">event</span>
                <h3>Upcoming Exams</h3>
                <p>5</p>
                <a href="#">View Details</a>
              </div>
            </div>
          </div>
          <div className={styles.recentActivitiesSection}>
            <div className={styles.recentExams}>
              <h3>Recent Exams</h3>
              <ul>
                <li>Mathematics Midterm</li>
                <li>Physics Final</li>
                <li>Chemistry Quiz</li>
              </ul>
            </div>
            <div className={styles.topPerformers}>
              <h3>Top Performers</h3>
              <div className={styles.performanceChart}></div>
              <ul>
                <li>Student 1 <span>90%</span></li>
                <li>Student 2 <span>80%</span></li>
                <li>Student 3 <span>70%</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
