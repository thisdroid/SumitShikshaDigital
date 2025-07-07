"use client"

import { useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./ExamDetails.module.css"
import Header from "../header/Header"
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
          {/* Header Component */}
          <Header />

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
    // Navigate to exam test page with exam data
    navigate(`/StudentDashboard/Examination/${examName}/test`, {
      state: { exam },
    })
  }

  return (
    <div className={styles.examDetailsContainer}>
      <div className={styles.mainContent}>
        {/* Header Component */}
        <Header />

        <div className={styles.contentWrapper}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            {/* Back Button */}
            <button className={styles.backButton} onClick={() => navigate("/StudentDashboard/Examination")}>
              <span className="material-icons">arrow_back</span>
              Back to Exams
            </button>

            {/* Exam Header Section - Desktop: side by side, Mobile: stacked */}
            <div className={styles.examHeaderSection}>
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

              {/* Tips Card - Desktop: beside header, Mobile: in sidebar */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#10b981" />
                    <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                  </svg>
                  <span>All questions are multiple choice questions (MCQ)</span>
                </div>
                <div className={styles.ruleItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#10b981" />
                    <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                  </svg>
                  <span>Only one choice is correct among the given options</span>
                </div>
                <div className={styles.ruleItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#10b981" />
                    <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                  </svg>
                  <span>Every question carries equal marks</span>
                </div>
                <div className={styles.ruleItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#10b981" />
                    <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                  </svg>
                  <span>Try to answer as quickly and accurately as possible</span>
                </div>
                <div className={styles.ruleItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#10b981" />
                    <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                  </svg>
                  <span>Questions are presented in random order</span>
                </div>
                <div className={styles.ruleItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#10b981" />
                    <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                  </svg>
                  <span>You can review and change answers before submitting</span>
                </div>
                <div className={styles.ruleItem}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="12" fill="#10b981" />
                    <path d="M9 16.2l-3.5-3.5-1.4 1.4L9 19l10-10-1.4-1.4z" fill="white" />
                  </svg>
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
            {/* Tips Card - Mobile only */}
            <div className={styles.tipsCardMobile}>
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
