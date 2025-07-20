import { useEffect, useState } from "react";
import styles from "./ExamQuestions.module.css";
import { Link, useLocation } from 'react-router-dom';
import { getItem, setItem } from "../../../utils/storage";
import { Helmet } from 'react-helmet-async';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ExamQuestions = () => {
  const query = useQuery();
  const examName = query.get("exam");
  const [questions, setQuestions] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const exams = getItem("exams", []);
    const exam = exams.find(e => e.examName.toLowerCase() === examName.toLowerCase());
    setQuestions(exam?.questions || []);
  }, [examName, location]);

  const handleEdit = (question) => {
    localStorage.setItem("editQuestionData", JSON.stringify({ ...question, examName }));
    // navigate by Link below
  };

  const handleDelete = (questionToDelete) => {
    const exams = getItem("exams", []);
    const examIndex = exams.findIndex(e => e.examName.toLowerCase() === examName.toLowerCase());
    if (examIndex !== -1) {
      exams[examIndex].questions = exams[examIndex].questions.filter(
        q => q.question !== questionToDelete.question
      );
      setItem("exams", exams);
      setQuestions(exams[examIndex].questions);
    }
  };

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Exam Questions - {examName}</title>
        <meta name="description" content={`Manage questions for the exam: ${examName}`} />
      </Helmet>

      <div className={styles.header}>
        <h1 className={styles.title}>Exam Questions</h1>
        <p className={styles.subtitle}>Manage all questions for <b>{examName}</b></p>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <div className={styles.headerCell}>QUESTION</div>
          <div className={styles.headerCell}>MARKS</div>
          <div className={styles.headerCell}>ACTIONS</div>
        </div>

        <div className={styles.tableBody}>
          {questions.length === 0 ? (
            <div className={styles.tableRow}>
              <div className={styles.questionCell} style={{ textAlign: "center" }}>
                No questions found for this exam.
              </div>
            </div>
          ) : (
            questions.map((question, idx) => (
              <div key={idx} className={styles.tableRow}>
                <div className={styles.questionCell}>
                  <p className={styles.questionText}>{question.question}</p>
                </div>
                <div className={styles.marksCell}>
                  <span className={styles.marksValue}>{question.marks}</span>
                </div>
                <div className={styles.actionsCell}>
                  <Link
                    to={`/AdminDashboard/UpdateQuestions/${encodeURIComponent(examName)}`}
                    onClick={() => handleEdit(question)}
                  >
                    <button className={styles.editButton} title="Edit Question">
                    Edit
                    </button>
                  </Link>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(question)}
                    title="Delete Question"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamQuestions;
