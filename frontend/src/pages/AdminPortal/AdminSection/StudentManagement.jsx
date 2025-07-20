import { useEffect, useState } from "react"
import styles from "./StudentManagement.module.css"

const StudentManagement = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students") || "[]")
    setStudents(allStudents)
  }, [])

  const handleDelete = (studentName) => {
    if (window.confirm("Do you really want to delete this student?")) {
      const allStudents = JSON.parse(localStorage.getItem("students") || "[]")
      const updated = allStudents.filter((s) => s.name !== studentName)
      localStorage.setItem("students", JSON.stringify(updated))
      setStudents(updated)
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Student Management</h2>
      <p className={styles.subtitle}>View and manage all registered students</p>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>NAME</span>
          <span>PHOTO</span>
          <span>CONTACT</span>
          <span>ADDRESS</span>
          <span>ACTIONS</span>
        </div>
        {students.map(({ name, photo, contact, address }, idx) => (
          <div className={styles.tableRow} key={idx}>
            <span>{name}</span>
            <span className={styles.photoCell}>
              {photo ? (
                <img src={photo || "/placeholder.svg"} alt={name} className={styles.profilePhoto} />
              ) : (
                <span className="material-icons">person_outline</span>
              )}
            </span>
            <span>{contact}</span>
            <span>{address}</span>
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

export default StudentManagement
