
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./MarksWithoutCollege.module.css"

const MarksWithCollege = () => {
  const [students, setStudents] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students") || "[]")
    setStudents(allStudents.filter((s) => s.college))
  }, [])

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Students With College - Marks</h1>
        <p className={styles.subtitle}>View and manage student marks for registered college students</p>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Student Name</th>
              <th className={styles.th}>Profile Photo</th>
              <th className={styles.th}>College</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => (
              <tr key={idx}>
                <td className={styles.td}>{student.name}</td>
                <td className={styles.td}>
                  {student.photo ? (
                    <img className={styles.avatar} src={student.photo || "/placeholder.svg"} alt={student.name} />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      <span className="material-icons">person</span>
                    </div>
                  )}
                </td>
                <td className={styles.td}>{student.college}</td>
                <td className={styles.td}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => navigate(`/AdminDashboard/StudentExamList/${encodeURIComponent(student.name)}`)}
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

export default MarksWithCollege
