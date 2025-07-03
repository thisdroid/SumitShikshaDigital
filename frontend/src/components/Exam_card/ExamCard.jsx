import { useNavigate } from "react-router-dom"
import styles from "./ExamCard.module.css"

const ExamCard = ({ exam, activeTab }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    // Navigate to nested exam details page within StudentDashboard layout
    navigate(`/StudentDashboard/Examination/${encodeURIComponent(exam.name)}`, {
      state: { exam },
    })
  }

  return (
    <div className={styles.examCard}>
      <div className={styles.examHeader}>
        <div className={styles.examIcon} style={{ backgroundColor: exam.color }}>
          <span className="material-icons">{exam.icon}</span>
        </div>

        <div className={styles.examTitleSection}>
          <h3 className={styles.examTitle} title={exam.name}>
            {exam.name}
          </h3>
        </div>
      </div>

      <div className={styles.examContent}>
        <p className={styles.examDescription} title={exam.description}>
          {exam.description}
        </p>

        <div className={styles.examDetails}>
          <div className={styles.examDetail}>
            <span className="material-icons">schedule</span>
            <span>{exam.duration}</span>
          </div>

          <div className={styles.examDetail}>
            <span className="material-icons">quiz</span>
            <span>{exam.questions} Questions</span>
          </div>

          <div className={styles.examDetail}>
            <span className="material-icons">grade</span>
            <span>{exam.passingScore}% to Pass</span>
          </div>
        </div>
      </div>

      <div className={styles.examFooter}>
        <button className={styles.examBtn} onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  )
}

export default ExamCard
