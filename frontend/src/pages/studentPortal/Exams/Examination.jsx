"use client"

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setExams, setCurrentExam } from '../../../slices/examsSlice';
import { setActiveTab, setExamCode, setCodeError, setLoading } from '../../../slices/examsUiSlice';
import styles from "./Examination.module.css"
import Header from "../header/Header"
import ExamCard from "../../../components/Exam_card/ExamCard"
import Calendar from "../../../components/common_components/Calendar"
import ExaminationSkeleton from "./ExaminationSkeleton"

// Course completion exams - only available after course completion
export const courseExams = [
  {
    id: 1,
    name: "React Basics Final Exam",
    duration: "60 mins",
    description:
      "Final assessment for React Basics course. Test your understanding of components, hooks, and state management.",
    color: "#61dafb",
    icon: "code",
    questions: 45,
    passingScore: 70,
    courseId: "REACT_001",
    courseName: "React Basics Course",
    status: "available", // available, locked, completed
  },
  {
    id: 2,
    name: "Python Fundamentals Final Exam",
    duration: "90 mins",
    description: "Comprehensive test covering Python syntax, data structures, and object-oriented programming.",
    color: "#3776ab",
    icon: "code",
    questions: 60,
    passingScore: 65,
    courseId: "PYTHON_001",
    courseName: "Python Fundamentals Course",
    status: "available", // Course not completed yet
  },
  {
    id: 3,
    name: "Data Structures Final Exam",
    duration: "120 mins",
    description: "Advanced concepts in data structures and algorithms implementation.",
    color: "#ff6b6b",
    icon: "account_tree",
    questions: 50,
    passingScore: 75,
    courseId: "DS_001",
    courseName: "Data Structures Course",
    status: "available", // Course not completed yet
  },
  {
    id: 4,
    name: "DSA Final Exam",
    duration: "120 mins",
    description: "Advanced concepts in data structures and algorithms implementation.",
    color: "#ff6b6b",
    icon: "account_tree",
    questions: 50,
    passingScore: 75,
    courseId: "DS_001",
    courseName: "Data Structures Course",
    status: "completed",
    score: 85,
    completedDate: "Dec 10, 2024",
  },
  {
    id: 5,
    name: "TOC",
    duration: "120 mins",
    description: "Advanced concepts in TOC and algorithms implementation.",
    color: "#ff6b6b",
    icon: "account_tree",
    questions: 50,
    passingScore: 75,
    courseId: "DS_001",
    courseName: "Data Structures Course",
    status: "completed",
    score: 85,
    completedDate: "Dec 10, 2024",
  },
]

export const availableExams = [
  {
    id: 4,
    name: "Data Science Essentials",
    duration: "120 mins",
    level: "Standard",
    description: "Covers statistics, data analysis, and machine learning basics.",
    color: "#4ecdc4",
    icon: "analytics",
    questions: 55,
    passingScore: 70,
    attempts: 3,
  },
  {
    id: 5,
    name: "Cyber Security Basics",
    duration: "75 mins",
    level: "Standard",
    description: "Covers security principles, threats, and best practices.",
    color: "#45b7d1",
    icon: "security",
    questions: 40,
    passingScore: 65,
    attempts: 2,
  },
  {
    id: 6,
    name: "Machine Learning",
    duration: "150 mins",
    level: "Advanced",
    description: "Advanced machine learning algorithms and implementation.",
    color: "#96ceb4",
    icon: "psychology",
    questions: 65,
    passingScore: 80,
    attempts: 2,
  },
  {
    id: 7,
    name: "Web Development",
    duration: "90 mins",
    level: "Intermediate",
    description: "Full-stack web development concepts and practices.",
    color: "#feca57",
    icon: "web",
    questions: 50,
    passingScore: 70,
    attempts: 3,
  },
]

export const upcomingExams = [
  {
    id: 1,
    name: "React Basics",
    duration: "60 mins",
    level: "Advanced",
    date: "Dec 15, 2024",
    time: "10:00 AM",
    description:
      "Comprehensive assessment covering all key concepts from React curriculum. Includes multiple choice, short answer, and practical questions.",
    color: "#61dafb",
    icon: "code",
    questions: 45,
    passingScore: 70,
  },
  {
    id: 2,
    name: "Python Fundamentals",
    duration: "90 mins",
    level: "Standard",
    date: "Dec 18, 2024",
    time: "2:00 PM",
    description: "Test your understanding of Python basics, syntax, and problem-solving skills.",
    color: "#3776ab",
    icon: "code",
    questions: 60,
    passingScore: 65,
  },
  {
    id: 3,
    name: "Data Structures",
    duration: "120 mins",
    level: "Advanced",
    date: "Dec 20, 2024",
    time: "9:00 AM",
    description: "Advanced concepts in data structures and algorithms implementation.",
    color: "#ff6b6b",
    icon: "account_tree",
    questions: 50,
    passingScore: 75,
  },
]

const Examination = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.examsUi.activeTab);
  const examCode = useSelector((state) => state.examsUi.examCode);
  const codeError = useSelector((state) => state.examsUi.codeError);
  const loading = useSelector((state) => state.examsUi.loading);
  const exams = useSelector((state) => state.exams.exams);
  const currentExam = useSelector((state) => state.exams.currentExam);

   useEffect(() => {
    const timer = setTimeout(() => dispatch(setLoading(false)), 500);
    return () => clearTimeout(timer);
  }, [dispatch]);
  const examStats = [
    {
      icon: "school",
      label: "Course Exams",
      value: "3",
      color: "#3b82f6",
    },
    {
      icon: "quiz",
      label: "College Exams",
      value: "2",
      color: "#f59e0b",
    },
    {
      icon: "check_circle",
      label: "Completed",
      value: "8",
      color: "#10b981",
    },
    {
      icon: "trending_up",
      label: "Pass Rate",
      value: "87%",
      color: "#8b5cf6",
    },
  ]

  const recentResults = [
    {
      id: 1,
      examName: "Data Structures Final",
      score: 85,
      status: "passed",
      date: "Dec 10, 2024",
      type: "course",
    },
    {
      id: 2,
      examName: "Database Design Quiz",
      score: 92,
      status: "passed",
      date: "Dec 8, 2024",
      type: "college",
    },
    {
      id: 3,
      examName: "Web Development Mid-term",
      score: 78,
      status: "passed",
      date: "Dec 5, 2024",
      type: "college",
    },
  ]

  const tabs = [
    { id: "course-exams", label: "Course Exams", icon: "school" },
    { id: "college-exams", label: "College Exams", icon: "business" },
  ]

  const handleExamCodeSubmit = (e) => {
    e.preventDefault()
    if (examCode.length !== 6) {
      dispatch(setCodeError("Please enter a 6-digit exam code"))
      return
    }
    // Here you would validate the code with your backend
    console.log("Validating exam code:", examCode)
    dispatch(setCodeError(""))
    // For demo purposes, show success/error
    if (examCode === "123456") {
      alert("Exam found! Redirecting to exam...")
      dispatch(setExamCode(""))
    } else {
      dispatch(setCodeError("Invalid exam code. Please check and try again."))
    }
  }

  const getAvailableCourseExams = () => {
    return courseExams.filter((exam) => exam.status === "available")
  }

  const handleDateClick = (dateInfo) => {
    console.log("Date clicked:", dateInfo)
  }

  if (loading) return <ExaminationSkeleton />

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        {/* Header Component */}
        <Header />

        <div className={styles.contentWrapper}>
          {/* Left Content */}
          <div className={styles.leftContent}>
            {/* Exam Banner */}
            <div className={styles.examBanner}>
              <div className={styles.bannerContent}>
                <h1 className={styles.bannerTitle}>Test Your Knowledge & Skills</h1>
                <p className={styles.bannerText}>
                  Take course completion exams after finishing your courses, or enter a 6-digit code to access college
                  exams shared by your institution.
                </p>
              </div>
              <div className={styles.bannerImage}>
                <img
                  src="/images/student-dashboard-banner.png?height=200&width=300"
                  alt="Examination illustration"
                  className={styles.bannerImg}
                  draggable={false}
                />
              </div>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
              {examStats.map((stat, index) => (
                <div key={index} className={styles.statCard}>
                  <div className={styles.statIcon} style={{ color: stat.color }}>
                    <span className="material-icons">{stat.icon}</span>
                  </div>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Navigation Tabs */}
            <div className={styles.tabsContainer}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ""}`}
                  onClick={() => dispatch(setActiveTab(tab.id))}
                >
                  <span className="material-icons">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Course Exams Section */}
            {activeTab === "course-exams" && (
              <div className={styles.examsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Available Course Exams</h2>
                </div>
                <div className={styles.examsGrid}>
                  {getAvailableCourseExams().map((exam) => (
                    <ExamCard key={exam.id} exam={exam} activeTab={activeTab} />
                  ))}
                </div>
              </div>
            )}

            {/* College Exams Section */}
            {activeTab === "college-exams" && (
              <div className={styles.examsSection}>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>Enter Exam Code</h2>
                  <span className={styles.sectionSubtitle}>Get the 6-digit code from your college</span>
                </div>
                <div className={styles.examCodeSection}>
                  <form onSubmit={handleExamCodeSubmit} className={styles.examCodeForm}>
                    <div className={styles.codeInputContainer}>
                      <input
                        type="text"
                        placeholder="Enter 6-digit exam code"
                        value={examCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                          dispatch(setExamCode(value))
                          dispatch(setCodeError(""))
                        }}
                        className={`${styles.codeInput} ${codeError ? styles.codeInputError : ""}`}
                        maxLength="6"
                      />
                      <button type="submit" className={styles.codeSubmitBtn}>
                        <span className="material-icons">search</span>
                        Find Exam
                      </button>
                    </div>
                    {codeError && (
                      <div className={styles.errorMessage}>
                        <span className="material-icons">error</span>
                        {codeError}
                      </div>
                    )}
                  </form>
                  <div className={styles.codeInstructions}>
                    <div className={styles.instructionItem}>
                      <span className="material-icons">info</span>
                      <span>Ask your college administrator for the exam code</span>
                    </div>
                    <div className={styles.instructionItem}>
                      <span className="material-icons">schedule</span>
                      <span>Exam codes are only valid during the scheduled exam period</span>
                    </div>
                    <div className={styles.instructionItem}>
                      <span className="material-icons">security</span>
                      <span>Each code can only be used once per student</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className={styles.rightSidebar}>
            {/* Calendar Component */}
            <Calendar title="Calendar" showYearSelector={true} onDateClick={handleDateClick} highlightedDates={[]} />

            {/* Recent Results */}
            <div className={styles.resultsCard}>
              <div className={styles.resultsHeader}>
                <h3 className={styles.resultsTitle}>Recent Results</h3>
                <button className={styles.seeAllBtn}>View All</button>
              </div>
              <div className={styles.resultsList}>
                {recentResults.map((result) => (
                  <div key={result.id} className={styles.resultItem}>
                    <div className={styles.resultIcon}>
                      <span className={`material-icons ${styles[result.status]}`}>
                        {result.status === "passed" ? "check_circle" : "cancel"}
                      </span>
                    </div>
                    <div className={styles.resultInfo}>
                      <h4 className={styles.resultExam}>{result.examName}</h4>
                      <p className={styles.resultDate}>
                        {result.date} • {result.type === "course" ? "Course" : "College"}
                      </p>
                    </div>
                    <div className={styles.resultScore}>
                      <span className={`${styles.scoreValue} ${styles[result.status]}`}>{result.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Tips */}
            <div className={styles.tipsCard}>
              <div className={styles.tipsHeader}>
                <h3 className={styles.tipsTitle}>Exam Tips</h3>
              </div>
              <div className={styles.tipsList}>
                <div className={styles.tipItem}>
                  <span className="material-icons">lightbulb</span>
                  <span>Review course materials before attempting</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">timer</span>
                  <span>Manage your time effectively</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">psychology</span>
                  <span>Stay calm and focused</span>
                </div>
                <div className={styles.tipItem}>
                  <span className="material-icons">fact_check</span>
                  <span>Read questions carefully</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Examination
