
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./CourseList.module.css"
import { getItem, setItem } from "../../../utils/storage"
import { Helmet } from "react-helmet-async" // Use Helmet for SEO

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setCourses(getItem("courses", []))
  }, [])

  const handleDelete = (filteredIdx) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return

    // Remove by filteredIdx from the filtered array, but update the original array
    const filteredCourses = courses.filter((c) => c.courseName && c.courseName.trim() !== "")
    const courseToDelete = filteredCourses[filteredIdx]
    const updated = courses.filter((c) => c !== courseToDelete)
    setCourses(updated)
    setItem("courses", updated)
  }

  const filteredCourses = courses.filter((course) => course.courseName && course.courseName.trim() !== "")

  if (filteredCourses.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>All Courses</h2>
        <p className={styles.subtitle}>View and manage all available courses</p>
        <div className={styles.noCoursesCard}>
          <div className={styles.noCoursesIcon}>📚</div>
          <h2 className={styles.noCoursesTitle}>No Courses Available</h2>
          <p className={styles.noCoursesText}>There are no courses created yet. Start by adding your first course.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Course List</title>
        <meta name="description" content="View and manage all available courses in the system." />
      </Helmet>
      <h2 className={styles.title}>All Courses</h2>
      <p className={styles.subtitle}>View and manage all available courses</p>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Lessons</th>
              <th>Duration</th>
              <th>Rating</th>
              <th>Price</th>
              <th>Discounted</th>
              <th>Difficulty</th>
              <th>Category</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, filteredIdx) => (
              <tr key={filteredIdx}>
                <td>{course.courseName}</td>
                <td>{course.totalLessons}</td>
                <td>{course.totalDuration}</td>
                <td>{course.rating}</td>
                <td>{course.price}</td>
                <td>{course.discountedPrice}</td>
                <td>{course.difficulty}</td>
                <td>{course.category}</td>
                <td>{course.tag}</td>
                <td className={styles.actionsCell}>
                  <button
                    className={styles.editBtn}
                    onClick={() => navigate(`/AdminDashboard/EditCourse/${filteredIdx}`)}
                    aria-label={`Edit ${course.courseName}`}
                  >
                    <span className="material-icons">edit</span>
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(filteredIdx)}
                    aria-label={`Delete ${course.courseName}`}
                  >
                    <span className="material-icons">delete</span>
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

export default CourseList
