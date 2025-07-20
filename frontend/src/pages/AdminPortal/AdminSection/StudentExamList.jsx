

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styles from "./StudentExamList.module.css"

const StudentExamList = () => {
  const { studentName } = useParams()
  const [exams, setExams] = useState([])
  const [student, setStudent] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students") || "[]")
    const foundStudent = students.find((s) => s.name === studentName)
    setStudent(foundStudent)
    // Example: Assume student.exams is an array of { examName, marks, ... }
    setExams(foundStudent?.exams || [])
  }, [studentName])

  if (!student) {
    return (
      <div className={styles.container}>
        <div className={styles.noExamsCard}>
          <div className={styles.noExamsIcon}>👤</div>
          <h2 className={styles.noExamsTitle}>Student Not Found</h2>
          <p className={styles.noExamsText}>The requested student could not be found in the system.</p>
        </div>
      </div>
    )
  }

  if (exams.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>{student.name}'s Exams</h2>
        <p className={styles.subtitle}>View and manage exam records</p>
        <div className={styles.noExamsCard}>
          <div className={styles.noExamsIcon}>📝</div>
          <h2 className={styles.noExamsTitle}>No Exams Given</h2>
          <p className={styles.noExamsText}>This student hasn't taken any exams yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{student.name}'s Exams</h2>
      <p className={styles.subtitle}>View and manage exam records</p>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>EXAM NAME</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, idx) => (
              <tr key={idx}>
                <td>{exam.examName}</td>
                <td>
                  <button
                    className={styles.viewBtn}
                    onClick={() =>
                      navigate(
                        `/AdminDashboard/StudentExamDetail/${encodeURIComponent(student.name)}/${encodeURIComponent(exam.examName)}`,
                      )
                    }
                  >
                    <span className="material-icons">visibility</span> View Marks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentExamList
