import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import styles from "./ExamDetails.module.css";
import { availableExams, upcomingExams } from "./Examination";

const allExams = [...availableExams, ...upcomingExams];

const ExamDetails = () => {
  const { examName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Try to get exam from location.state (if navigated from Exams page)
  let exam = location.state?.exam;
  if (!exam && examName) {
    exam = allExams.find(e => encodeURIComponent(e.name) === examName);
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!exam) {
    return (
      <div className={styles.examDetailsWrapper}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <span className="material-icons">arrow_back</span>
          Back to Exams
        </button>
        <div className={styles.section}>
          <h2>Exam not found.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.examDetailsWrapper}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        <span className="material-icons">arrow_back</span>
        Back to Exams
      </button>
      <div className={styles.examContent}>
        <div className={styles.examHeader}>
          <div>
            <h2 className={styles.examTitle}>{exam.name}</h2>
            <div className={styles.examStats}>
              <span className={styles.examStat}><span className="material-icons">schedule</span> {exam.duration}</span>
              <span className={styles.examStat}><span className="material-icons">shield</span> {exam.level}</span>
            </div>
            <p className={styles.examDescription}>{exam.description}</p>
          </div>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Exam Details</h3>
          <ul className={styles.examDetailsList}>
            <li>Exam: {exam.name}</li>
            <li>Total Questions: 30</li>
            <li>Total Marks: 30</li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Exam Rules</h3>
          <ul className={styles.examRulesList}>
            <li>All questions are MCQ (multiple choice question)</li>
            <li>Only one choice is correct among the given</li>
            <li>Every question carries different marks</li>
            <li>Try to answer as quickly as possible</li>
            <li>If you refresh or go back, you’ll get a new question and the current one will count as an attempt</li>
            <li>Questions are presented randomly</li>
            <li>You’ll see your marks immediately after submitting</li>
          </ul>
        </div>
        <button className={styles.startExamButton}>
          Start Exam <span className="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default ExamDetails;