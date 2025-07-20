
import { useEffect, useState } from "react"
import styles from "./CollegeRegisteredStudents.module.css"
import { MdSchool } from "react-icons/md"

const CollegeRegisteredStudents = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students") || "[]")
    setStudents(allStudents.filter((s) => s.college))
  }, [])

  const handleDelete = (studentName) => {
    if (window.confirm("Do you really want to delete this student?")) {
      const allStudents = JSON.parse(localStorage.getItem("students") || "[]")
      const updated = allStudents.filter((s) => s.name !== studentName)
      localStorage.setItem("students", JSON.stringify(updated))
      setStudents(updated.filter((s) => s.college)) // Update filtered list
    }
  }

  if (students.length === 0) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Student Management</h1>
          <p className={styles.subtitle}>View and manage all registered students</p>
        </div>
        <div className={styles.card}>
          <MdSchool className={styles.icon} />
          <h2 className={styles.cardTitle}>No Students Registered</h2>
          <p className={styles.cardText}>There are no students registered in the system yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Student Management</h1>
        <p className={styles.subtitle}>View and manage all registered students</p>
      </div>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>NAME</span>
          <span>PHOTO</span>
          <span>COLLEGE</span>
          <span>ACTIONS</span>
        </div>
        {students.map(({ name, photo, college }, idx) => (
          <div className={styles.tableRow} key={idx}>
            <span>{name}</span>
            <span>
              {photo ? (
                <img src={photo || "/placeholder.svg"} alt={name} className={styles.profilePhoto} />
              ) : (
                <span className="material-icons">person_outline</span>
              )}
            </span>
            <span>{college}</span>
            <span>
              <button className={styles.deleteBtn} onClick={() => handleDelete(name)}>
                <span className="material-icons">delete</span> Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CollegeRegisteredStudents
