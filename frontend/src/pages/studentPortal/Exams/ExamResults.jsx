"use client"

import { useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./ExamResults.module.css"
import Header from "../header/Header"

const ExamResults = () => {
  const { examName } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { exam, score, correct, total, passed, answers, questions, timeSpent } = location.state || {}

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`
    }
    return `${minutes}m ${secs}s`
  }

  const getGrade = (score) => {
    if (score >= 90) return { grade: "A+", color: "#10b981" }
    if (score >= 80) return { grade: "A", color: "#10b981" }
    if (score >= 70) return { grade: "B", color: "#f59e0b" }
    if (score >= 60) return { grade: "C", color: "#f59e0b" }
    if (score >= 50) return { grade: "D", color: "#ef4444" }
    return { grade: "F", color: "#ef4444" }
  }

  if (!exam || score === undefined) {
    return (
      <div className={styles.resultsContainer}>
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <span className="material-icons">error_outline</span>
              </div>
              <h2 className={styles.errorTitle}>Results Not Found</h2>
              <p className={styles.errorText}>No exam results found. Please take the exam first.</p>
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

  const gradeInfo = getGrade(score)

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.mainContent}>
        <Header />

        <div className={styles.contentWrapper}>
          {/* Results Header */}
          <div className={styles.resultsHeader}>
            <div className={styles.resultIcon} style={{ backgroundColor: passed ? "#10b981" : "#ef4444" }}>
              <span className="material-icons">{passed ? "check_circle" : "cancel"}</span>
            </div>

            <div className={styles.resultInfo}>
              <h1 className={styles.resultTitle}>{passed ? "Congratulations!" : "Better Luck Next Time"}</h1>
              <p className={styles.resultSubtitle}>
                {passed
                  ? `You have successfully passed the ${exam.name}`
                  : `You need ${exam.passingScore}% to pass the ${exam.name}`}
              </p>
            </div>
          </div>

          <div className={styles.resultsContent}>
            {/* Score Card */}
            <div className={styles.scoreCard}>
              <div className={styles.scoreDisplay}>
                <div className={styles.scoreCircle} style={{ borderColor: gradeInfo.color }}>
                  <span className={styles.scoreNumber} style={{ color: gradeInfo.color }}>
                    {score}%
                  </span>
                  <span className={styles.scoreGrade} style={{ color: gradeInfo.grade }}>
                    {gradeInfo.grade}
                  </span>
                </div>
              </div>

              <div className={styles.scoreDetails}>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>Correct Answers</span>
                  <span className={styles.scoreValue}>
                    {correct} / {total}
                  </span>
                </div>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>Time Spent</span>
                  <span className={styles.scoreValue}>{formatTime(timeSpent)}</span>
                </div>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>Passing Score</span>
                  <span className={styles.scoreValue}>{exam.passingScore}%</span>
                </div>
                <div className={styles.scoreItem}>
                  <span className={styles.scoreLabel}>Status</span>
                  <span className={`${styles.scoreValue} ${passed ? styles.passed : styles.failed}`}>
                    {passed ? "PASSED" : "FAILED"}
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Analysis */}
            <div className={styles.analysisCard}>
              <h3 className={styles.cardTitle}>Performance Analysis</h3>

              <div className={styles.performanceStats}>
                <div className={styles.statItem}>
                  <div className={styles.statIcon} style={{ backgroundColor: "#10b981" }}>
                    <span className="material-icons">check</span>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{correct}</span>
                    <span className={styles.statLabel}>Correct</span>
                  </div>
                </div>

                <div className={styles.statItem}>
                  <div className={styles.statIcon} style={{ backgroundColor: "#ef4444" }}>
                    <span className="material-icons">close</span>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{total - correct}</span>
                    <span className={styles.statLabel}>Incorrect</span>
                  </div>
                </div>

                <div className={styles.statItem}>
                  <div className={styles.statIcon} style={{ backgroundColor: "#3b82f6" }}>
                    <span className="material-icons">quiz</span>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{total}</span>
                    <span className={styles.statLabel}>Total</span>
                  </div>
                </div>

                <div className={styles.statItem}>
                  <div className={styles.statIcon} style={{ backgroundColor: "#f59e0b" }}>
                    <span className="material-icons">schedule</span>
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{Math.round(timeSpent / total)}s</span>
                    <span className={styles.statLabel}>Avg/Question</span>
                  </div>
                </div>
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{
                    width: `${(correct / total) * 100}%`,
                    backgroundColor: gradeInfo.color,
                  }}
                ></div>
              </div>
              <div className={styles.progressLabel}>
                {correct} out of {total} questions answered correctly
              </div>
            </div>

            {/* Question Review */}
            <div className={styles.reviewCard}>
              <h3 className={styles.cardTitle}>Question Review</h3>

              <div className={styles.questionsList}>
                {questions?.map((question, index) => {
                  const userAnswer = answers[question.id]
                  const isCorrect = userAnswer === question.correctAnswer

                  return (
                    <div key={question.id} className={styles.questionReview}>
                      <div className={styles.questionHeader}>
                        <span className={styles.questionNumber}>Q{index + 1}</span>
                        <div className={`${styles.answerStatus} ${isCorrect ? styles.correct : styles.incorrect}`}>
                          <span className="material-icons">{isCorrect ? "check_circle" : "cancel"}</span>
                          <span>{isCorrect ? "Correct" : "Incorrect"}</span>
                        </div>
                      </div>

                      <div className={styles.questionText}>{question.question}</div>

                      <div className={styles.answersReview}>
                        {question.options.map((option, optionIndex) => {
                          const isUserAnswer = userAnswer === optionIndex
                          const isCorrectAnswer = question.correctAnswer === optionIndex

                          let className = styles.answerOption
                          if (isCorrectAnswer) className += ` ${styles.correctAnswer}`
                          if (isUserAnswer && !isCorrectAnswer) className += ` ${styles.wrongAnswer}`
                          if (isUserAnswer && isCorrectAnswer) className += ` ${styles.userCorrect}`

                          return (
                            <div key={optionIndex} className={className}>
                              <span className={styles.optionLetter}>{String.fromCharCode(65 + optionIndex)}</span>
                              <span className={styles.optionText}>{option}</span>
                              {isCorrectAnswer && (
                                <span className={styles.correctIcon}>
                                  <span className="material-icons">check</span>
                                </span>
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <span className={styles.wrongIcon}>
                                  <span className="material-icons">close</span>
                                </span>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      {question.explanation && (
                        <div className={styles.explanation}>
                          <div className={styles.explanationHeader}>
                            <span className="material-icons">lightbulb</span>
                            <span>Explanation</span>
                          </div>
                          <p>{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.secondaryButton} onClick={() => navigate("/StudentDashboard/Examination")}>
              <span className="material-icons">arrow_back</span>
              Back to Exams
            </button>

            {!passed && exam.attempts && (
              <button
                className={styles.primaryButton}
                onClick={() => navigate(`/StudentDashboard/Examination/${examName}/test`, { state: { exam } })}
              >
                <span className="material-icons">refresh</span>
                Retake Exam
              </button>
            )}

            {/* Removed Print Certificate button */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExamResults
