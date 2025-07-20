"use client";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedExam, setFilter, setIsDropdownOpen } from '../../../slices/collegeExamHistoryUiSlice';
import { useEffect, useRef } from 'react';
import styles from "./CollegeExamHistory.module.css";
import Header from "../CollegeHeader/CollegeHeaderFile";

const CollegeExamHistory = () => {
  const dispatch = useDispatch();
  const selectedExam = useSelector((state) => state.collegeExamHistoryUi.selectedExam);
  const filter = useSelector((state) => state.collegeExamHistoryUi.filter);
  const isDropdownOpen = useSelector((state) => state.collegeExamHistoryUi.isDropdownOpen);
  const popupRef = useRef(null);

  // Dummy data for exam history
  const dummyExams = [
    {
      examName: "Mathematics Midterm",
      professorName: "Dr. Smith",
      conductedAt: "2023-10-15T09:00",
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
      conductedAt: "2023-10-20T14:00",
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
      conductedAt: "2023-11-01T10:00",
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

  const toggleDropdown = () => {
    dispatch(setIsDropdownOpen(!isDropdownOpen));
  };

  const handleFilterChange = (selectedFilter) => {
    dispatch(setFilter(selectedFilter));
    dispatch(setIsDropdownOpen(false));
  };

  const filterExams = (exams) => {
    const now = new Date();
    return exams.filter((exam) => {
      const examDate = new Date(exam.conductedAt);
      if (filter === "All") return true;
      if (filter === "Past Week") {
        const pastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return examDate >= pastWeek;
      }
      if (filter === "Past Month") {
        const pastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return examDate >= pastMonth;
      }
      return true;
    });
  };

  const filteredExams = filterExams(dummyExams);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        dispatch(setSelectedExam(null));
      }
    };

    if (selectedExam) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedExam, dispatch]);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.filterOptions}>
          <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={styles.filterButton}>
              {filter} <span className={styles.dropdownIcon}>▼</span>
            </button>
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <button
                  onClick={() => handleFilterChange("All")}
                  className={`${styles.dropdownItem} ${filter === "All" ? styles.selected : ""}`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterChange("Past Week")}
                  className={`${styles.dropdownItem} ${filter === "Past Week" ? styles.selected : ""}`}
                >
                  Past Week
                </button>
                <button
                  onClick={() => handleFilterChange("Past Month")}
                  className={`${styles.dropdownItem} ${filter === "Past Month" ? styles.selected : ""}`}
                >
                  Past Month
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.statsSection}>
            {filteredExams.map((exam, index) => (
              <div key={index} className={styles.childStats} onClick={() => handleCardClick(exam)}>
                <div className={styles.StatsCollege}>
                  <h3 className={styles.examTitle}>{exam.examName}</h3>
                  <p className={styles.examProfessor}><strong>Professor:</strong> {exam.professorName}</p>
                  <p className={styles.examConducted}><strong>Conducted At:</strong> {new Date(exam.conductedAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedExam && (
          <div className={styles.examDetailsOverlay}>
            <div className={styles.examDetailsContent} ref={popupRef}>
              <h2 className={styles.examDetailTitle}>{selectedExam.examName}</h2>
              <p className={styles.examDetailInfo}><strong>Professor:</strong> {selectedExam.professorName}</p>
              <p className={styles.examDetailInfo}><strong>Total Questions:</strong> {selectedExam.totalQuestions}</p>
              <p className={styles.examDetailInfo}><strong>Total Marks:</strong> {selectedExam.totalMarks}</p>
              <p className={styles.examDetailInfo}><strong>Exam Duration:</strong> {selectedExam.examDuration}</p>
              <p className={styles.examDetailInfo}><strong>Conducted At:</strong> {new Date(selectedExam.conductedAt).toLocaleString()}</p>
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

export default CollegeExamHistory;
