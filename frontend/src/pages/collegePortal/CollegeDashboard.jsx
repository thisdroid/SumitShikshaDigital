"use client"

import { useState } from "react"
import styles from "./CollegeDashboard.module.css"
import CollegeSidebar from "../../components/common_components/CollegeSidebar"
import Header from "./CollegeHeader/CollegeHeaderFile"
import Calendar from "../../components/common_components/Calendar"

const StudentDashboard = () => {

  const handleDateClick = (dateInfo) => {
    console.log("Date clicked:", dateInfo)
    // Add your date click logic here
  }

  return (
    <div className={styles.dashboardContainer}>
      <CollegeSidebar />
      <div className={styles.mainContent}>
        <Header/>
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
              </div>
            </div>
    </div>
  )
}

export default StudentDashboard
