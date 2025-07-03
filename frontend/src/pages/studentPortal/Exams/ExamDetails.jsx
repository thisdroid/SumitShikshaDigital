"use client"

import { useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./ExamDetails.module.css"
import Profile from "../Profile_icon/Profile"
import { courseExams, availableExams, upcomingExams } from "./Examination"

const allExams = [...courseExams, ...availableExams, ...upcomingExams]

const ExamDetails = () => {
  const { examName } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  // Try to get exam from location.state (if navigated from Exams page)
  let exam = location.state?.exam

  if (!exam && examName) {
    exam = allExams.find((e) => encodeURIComponent(e.name) === examName)
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  if (!exam) {
    return (
      <div className={styles.examDetailsContainer}>
        <div className={styles.mainContent}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerTop}>
              <div className={styles.searchContainer}>
                <span className="material-icons">search</span>
                <input type="text" placeholder="Search exams..." className={styles.searchInput} />
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
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <span className="material-icons">error_outline</span>
              </div>
              <h2 className={styles.errorTitle}>Exam Not Found</h2>
              <p className={styles.errorText}>The exam you're looking for doesn't exist or has been removed.</p>
              <button className={styles.errorButton} onClick={() => navigate("/StudentDashboard/Examination")}>
                <span className="material-icons">arrow_back</span>
                Back to Examinations
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleStartExam = () => {
    // Add your exam start logic here
    console.log("Starting exam:", exam.name)
    alert("Exam functionality will be implemented here!")
  }

  return (
    <div className={styles.examDetailsContainer}>
      <div className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerTop}>
            <div className={styles.searchContainer}>
              <span className="material-icons">search</span>
              <input type="text" placeholder="Search exams..." className={styles.searchInput} />
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
            {/* Back Button */}
            <button className={styles.backButton} onClick={() => navigate("/StudentDashboard/Examination")}>
              <span className="material-icons">arrow_back</span>
              Back to Exams
            </button>

            {/* Exam Header Card */}
            <div className={styles.examHeaderCard}>
              <div className={styles.examIconLarge} style={{ backgroundColor: exam.color }}>
                <span className="material-icons">{exam.icon}</span>
              </div>
              <div className={styles.examHeaderInfo}>
                <h1 className={styles.examTitle}>{exam.name}</h1>
                <p className={styles.examDescription}>{exam.description}</p>

                <div className={styles.examMetrics}>
                  <div className={styles.metric}>
                    <span className="material-icons">schedule</span>
                    <div className={styles.metricInfo}>
                      <span className={styles.metricLabel}>Duration</span>
                      <span className={styles.metricValue}>{exam.duration}</span>
                    </div>
                  </div>

                  <div className={styles.metric}>
                    <span className="material-icons">quiz</span>
                    <div className={styles.metricInfo}>
                      <span className={styles.metricLabel}>Questions</span>
                      <span className={styles.metricValue}>{exam.questions}</span>
                    </div>
                  </div>

                  <div className={styles.metric}>
                    <span className="material-icons">grade</span>
                    <div className={styles.metricInfo}>
                      <span className={styles.metricLabel}>Passing Score</span>
                      <span className={styles.metricValue}>{exam.passingScore}%</span>
                    </div>
                  </div>

                  {exam.level && (
                    <div className={styles.metric}>
                      <span className="material-icons">trending_up</span>
                      <div className={styles.metricInfo}>
                        <span className={styles.metricLabel}>Level</span>
                        <span className={styles.metricValue}>{exam.level}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Exam Details Section */}
            <div className={styles.detailsSection}>
              <h2 className={styles.sectionTitle}>Exam Details</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Total Questions:</span>
                  <span className={styles.detailValue}>{exam.questions}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Total Marks:</span>
                  <span className={styles.detailValue}>{exam.questions}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Time Limit:</span>
                  <span className={styles.detailValue}>{exam.duration}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Passing Score:</span>
                  <span className={styles.detailValue}>{exam.passingScore}%</span>
                </div>
                {exam.attempts && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Attempts Allowed:</span>
                    <span className={styles.detailValue}>{exam.attempts}</span>
                  </div>
                )}
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Question Type:</span>
                  <span className={styles.detailValue}>Multiple Choice</span>
                </div>
              </div>
            </div>

            {/* Exam Rules Section */}
            <div className={styles.rulesSection}>
              <h2 className={styles.sectionTitle}>Exam Rules & Instructions</h2>
              <div className={styles.rulesList}>
                <div className={styles.ruleItem}>
                  <span className="material-icons">check_circle</span>
                  <span>All questions are multiple choice questions (MCQ)</span>
                </div>
                <div className={styles.ruleItem}>
                  <span className="material-icons">check_circle</span>
                  <span>Only one choice is correct among the given options</span>
                </div>
                <div className={styles.ruleItem}>
                  <span className="material-icons">check_circle</span>
                  <span>Every question carries equal marks</span>
                </div>
                <div className={styles.ruleItem}>
                  <span className="material-icons">check_circle</span>
                  <span>Try to answer as quickly and accurately as possible</span>
                </div>
                <div className={styles.ruleItem}>
                  <span className="material-icons">check_circle</span>
                  <span>Questions are presented in random order</span>
                </div>
                <div className={styles.ruleItem}>
                  <span className="material-icons">check_circle</span>
                  <span>You can review and change answers before submitting</span>
                </div>
                <div className={styles.ruleItem}>
                  <span className="material-icons">check_circle</span>
                  <span>Results will be displayed immediately after submission</span>
                </div>
              </div>
            </div>

            {/* Start Exam Button */}
            <div className={styles.startExamSection}>
              <button className={styles.startExamButton} onClick={handleStartExam}>
                <span className="material-icons">play_arrow</span>
                Start Exam
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={styles.rightSidebar}>
            {/* Quick Info Card */}
            <div className={styles.quickInfoCard}>
              <h3 className={styles.quickInfoTitle}>Quick Info</h3>
              <div className={styles.quickInfoList}>
                <div className={styles.quickInfoItem}>
                  <span className="material-icons">schedule</span>
                  <div>
                    <span className={styles.quickInfoLabel}>Duration</span>
                    <span className={styles.quickInfoValue}>{exam.duration}</span>
                  </div>
                </div>
                <div className={styles.quickInfoItem}>
                  <span className="material-icons">quiz</span>
                  <div>
                    <span className={styles.quickInfoLabel}>Questions</span>
                    <span className={styles.quickInfoValue}>{exam.questions}</span>
                  </div>
                </div>
                <div className={styles.quickInfoItem}>
                  <span className="material-icons">grade</span>
                  <div>
                    <span className={styles.quickInfoLabel}>Pass Mark</span>
                    <span className={styles.quickInfoValue}>{exam.passingScore}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className={styles.tipsCard}>
              <h3 className={styles.tipsTitle}>Exam Tips</h3>
              <div className={styles.tipsList}>
                <div className={styles.tipItem}>
                  <span className="material-icons">lightbulb</span>
                  <span>Read each question carefully before answering</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">timer</span>
                  <span>Manage your time effectively</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">psychology</span>
                  <span>Stay calm and focused throughout</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">fact_check</span>
                  <span>Review your answers before submitting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamDetails
