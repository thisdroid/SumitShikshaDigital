import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './StudentExamDetail.module.css';

const StudentExamDetail = () => {
  const { studentName, examName } = useParams();
  const [examDetail, setExamDetail] = useState(null);

  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students") || "[]");
    const student = students.find(s => s.name === studentName);
    const exam = student?.exams?.find(e => e.examName === examName);
    setExamDetail(exam);
  }, [studentName, examName]);

  if (!examDetail) return <div>No exam details found.</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{examDetail.examName} - {studentName}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>COURSE</th>
            <th>TOTAL MARKS</th>
            <th>ATTEMPT</th>
            <th>EXAM DATE</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{examDetail.examName}</td>
            <td>{examDetail.totalMarks}</td>
            <td>{examDetail.attempt || "Attempt 1"}</td>
            <td>{examDetail.examDate}</td>
            {/* Add more cells as needed */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentExamDetail;