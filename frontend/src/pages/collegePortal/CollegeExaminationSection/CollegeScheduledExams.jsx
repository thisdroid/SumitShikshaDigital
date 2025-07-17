"use client";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedExam } from '../../../slices/collegeScheduledExamsUiSlice';
import styles from "./CollegeScheduledExams.module.css";
import Header from "../CollegeHeader/CollegeHeaderFile";

const ScheduledExams = () => {
  const dispatch = useDispatch();
  const selectedExam = useSelector((state) => state.collegeScheduledExamsUi.selectedExam);

  // Dummy data for scheduled exams
  const dummyExams = [
    {
      examName: "Mathematics Midterm",
      professorName: "Dr. Smith",
      scheduleAt: "2023-11-15T09:00",
      totalQuestions: "20",
      totalMarks: "100",
      examDuration: "2 hours",
      questions: [
        {
          question: "What is the derivative of x^2?",
          options: ["x", "2x", "x^2", "2"],
          correctAnswer: "2x",
          marks: "5",
        },
      ],
    },
    {
      examName: "Physics Final",
      professorName: "Dr. Johnson",
      scheduleAt: "2023-11-20T14:00",
      totalQuestions: "15",
      totalMarks: "90",
      examDuration: "1.5 hours",
      questions: [
        {
          question: "What is Newton's first law?",
          options: [
            "Every action has an equal and opposite reaction",
            "Force equals mass times acceleration",
            "An object in motion stays in motion",
            "Energy cannot be created or destroyed",
          ],
          correctAnswer: "An object in motion stays in motion",
          marks: "5",
        },
      ],
    },
    {
      examName: "Chemistry Quiz",
      professorName: "Dr. Williams",
      scheduleAt: "2023-11-22T10:00",
      totalQuestions: "10",
      totalMarks: "50",
      examDuration: "1 hour",
      questions: [
        {
          question: "What is the pH of pure water?",
          options: ["0", "7", "14", "1"],
          correctAnswer: "7",
          marks: "5",
        },
      ],
    },
  ];

  const handleCardClick = (exam) => {
    dispatch(setSelectedExam(exam));
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>
          <div className={styles.statsSection}>
            {dummyExams.map((exam, index) => (
              <div key={index} className={styles.childStats} onClick={() => handleCardClick(exam)}>
                <div className={styles.StatsCollege}>
                  <h3 className={styles.examTitle}>{exam.examName}</h3>
                  <p className={styles.examProfessor}><strong>Professor:</strong> {exam.professorName}</p>
                  <p className={styles.examSchedule}><strong>Scheduled At:</strong> {new Date(exam.scheduleAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedExam && (
          <div className={styles.examDetailsOverlay}>
            <div className={styles.examDetailsContent}>
              <h2 className={styles.examDetailTitle}>{selectedExam.examName}</h2>
              <p className={styles.examDetailInfo}><strong>Professor:</strong> {selectedExam.professorName}</p>
              <p className={styles.examDetailInfo}><strong>Total Questions:</strong> {selectedExam.totalQuestions}</p>
              <p className={styles.examDetailInfo}><strong>Total Marks:</strong> {selectedExam.totalMarks}</p>
              <p className={styles.examDetailInfo}><strong>Exam Duration:</strong> {selectedExam.examDuration}</p>
              <p className={styles.examDetailInfo}><strong>Scheduled At:</strong> {new Date(selectedExam.scheduleAt).toLocaleString()}</p>
              <h3 className={styles.questionsTitle}>Questions:</h3>
              {selectedExam.questions.map((question, qIndex) => (
                <div key={qIndex} className={styles.questionDetails}>
                  <p className={styles.questionText}><strong>Question {qIndex + 1}:</strong> {question.question}</p>
                  <ul className={styles.optionsList}>
                    {question.options.map((option, optIndex) => (
                      <li key={optIndex} className={styles.optionItem}>{option}</li>
                    ))}
                  </ul>
                  <p className={styles.correctAnswer}><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                  <p className={styles.questionMarks}><strong>Marks:</strong> {question.marks}</p>
                </div>
              ))}
              <button onClick={() => dispatch(setSelectedExam(null))} className={styles.closeButton}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduledExams;
