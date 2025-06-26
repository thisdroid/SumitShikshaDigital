import React from 'react';
import styles from './ExamCard.module.css';

const ExamCard = ({ exam }) => {
  return (
    <div className={styles.examCard}>
      <h3 className={styles.examName}>{exam.name}</h3>

      <div className={styles.examInfo}>
        <span className="material-icons">assignment</span>
        <span className="material-icons">schedule</span>
        <span className={styles.examDuration}>{exam.duration} mins</span>
      </div>

      <p className={styles.examDescription}>
        {exam.description}
      </p>

      <button className={styles.startExamBtn}>
        Start Exam
      </button>
    </div>
  );
};

export default ExamCard;
