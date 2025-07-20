import React, { useEffect, useState } from 'react';
import styles from './QuestionBank.module.css';
import { Link } from 'react-router-dom';
import { getItem } from '../../../utils/storage';
import { Helmet } from 'react-helmet-async'; // Use Helmet for SEO
const QuestionBank = () => {

  const [exams, setExams] = useState([]);

  useEffect(() => {
    const allExams = JSON.parse(localStorage.getItem("exams") || "[]");
    setExams(allExams.filter(e => e.examType === "platform"));
  }, []);

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Question Bank</title>
        <meta name="description" content="View and manage all examination questions in the question bank." />
      </Helmet>
      <h2 className={styles.title}>Question Bank</h2>
      <p className={styles.subtitle}>View and manage all examination questions</p>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>EXAM NAME</span>
          <span>TOTAL QUESTIONS</span>
          <span>TOTAL MARKS</span>
          <span>ACTIONS</span>
        </div>
        {exams.length === 0 ? (
          <div className={styles.emptyRow}>No exams found.</div>
        ) : (
          exams.map((exam, i) => (
            <div className={styles.tableRow} key={i}>
              <span>{exam.examName}</span>
              <span>{exam.questions ? exam.questions.length : 0}</span>
              <span>{exam.totalMarks || "-"}</span>
              <span>
                <Link to={`/AdminDashboard/ExamQuestions?exam=${encodeURIComponent(exam.examName)}`}>
                  <button className={styles.viewBtn}>
                    <span className="material-icons">visibility</span> View Questions
                  </button>
                </Link>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
