import { useEffect, useState } from "react"
import { FaCog, FaFileAlt, FaEdit } from "react-icons/fa"
import styles from "./CourseManagement.module.css"
import { Link } from "react-router-dom"
import { getItem, setItem } from "../../../utils/storage"
import { Helmet } from "react-helmet-async"

const CourseManagement = ({ examType }) => {
  const [exams, setExams] = useState([])

  // Load exams from localStorage based on examType
  useEffect(() => {
    const allExams = getItem("exams", [])
    const filtered = allExams.filter((exam) => exam.examType === examType)
    setExams(filtered)
  }, [examType])

  // Delete exam handler
  const handleDelete = (name) => {
    if (window.confirm("Do you really want to delete this exam?")) {
      const allExams = getItem("exams", [])
      const updated = allExams.filter((exam) => !(exam.examType === examType && exam.examName === name))
      setItem("exams", updated)
      setExams(updated.filter((exam) => exam.examType === examType))
    }
  }

  if (exams.length === 0) {
    return (
      <section className={styles.courseManagementContainer}>
        <h1 className={styles.pageTitle}>
          {examType === "college" ? "College Exam Management" : "Platform Exam Management"}
        </h1>
        <p className={styles.pageSubtitle}>
          View and manage all {examType === "college" ? "college" : "platform"} exams
        </p>
        <div className={styles.noExamsCard}>
          <div className={styles.noExamsIcon}>📝</div>
          <h2 className={styles.noExamsTitle}>No Exams Available</h2>
          <p className={styles.noExamsText}>
            There are no {examType === "college" ? "college" : "platform"} exams created yet.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.courseManagementContainer}>
      <Helmet>
        <title>{examType === "college" ? "College Exam Management" : "Platform Exam Management"}</title>
        <meta name="description" content={`Manage all ${examType === "college" ? "college" : "platform"} exams`} />
      </Helmet>
      <h1 className={styles.pageTitle}>
        {examType === "college" ? "College Exam Management" : "Platform Exam Management"}
      </h1>
      <p className={styles.pageSubtitle}>View and manage all {examType === "college" ? "college" : "platform"} exams</p>
      <div className={styles.tableWrapper}>
        <table className={styles.courseTable} aria-label="Exam management table">
          <thead>
            <tr>
              <th className={styles.headerCourseName}>Exam Name</th>
              <th className={styles.headerTotalQuestions}>Total Questions</th>
              <th className={styles.headerTotalMarks}>Total Marks</th>
              <th className={styles.headerActions}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, idx) => (
              <tr key={idx}>
                <td data-label="Exam Name">{exam.examName}</td>
                <td data-label="Total Questions">{exam.questions ? exam.questions.length : 0}</td>
                <td data-label="Total Marks">{exam.totalMarks}</td>
                <td data-label="Actions" className={styles.actionsCell}>
                  <Link to={`/AdminDashboard/ExamQuestions?exam=${encodeURIComponent(exam.examName)}`}>
                    <button className={styles.editQuestionsButton} aria-label={`Edit questions for ${exam.examName}`}>
                      <FaEdit /> Edit Questions
                    </button>
                  </Link>
                  <Link to={`/AdminDashboard/UpdateCourseDetails/${encodeURIComponent(exam.examName)}`}>
                    <button className={styles.editButton} aria-label={`Edit ${exam.examName}`}>
                      <FaCog /> Edit
                    </button>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    aria-label={`Delete ${exam.examName}`}
                    onClick={() => handleDelete(exam.examName)}
                  >
                    <FaFileAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CourseManagement
