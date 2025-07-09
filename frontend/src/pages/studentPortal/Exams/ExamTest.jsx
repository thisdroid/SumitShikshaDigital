"use client"

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setExamResult, setCurrentExam } from '../../../slices/examsSlice';
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./ExamTest.module.css"
import Header from "../header/Header"
import { courseExams, availableExams, upcomingExams } from "./Examination"

const allExams = [...courseExams, ...availableExams, ...upcomingExams]

// Sample MCQ questions - in real app this would come from backend
const sampleQuestions = [
  {
    id: 1,
    question: "What is the correct way to create a React component?",
    options: [
      "function MyComponent() { return <div>Hello</div>; }",
      "const MyComponent = () => { return <div>Hello</div>; }",
      "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation: "All three methods are valid ways to create React components.",
    marks: 2,
  },
  {
    id: 2,
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useContext", "useReducer"],
    correctAnswer: 1,
    explanation: "useState is the primary hook for managing state in functional components.",
    marks: 1,
  },
  {
    id: 3,
    question: "What does JSX stand for?",
    options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "Java XML"],
    correctAnswer: 0,
    explanation: "JSX stands for JavaScript XML, which allows you to write HTML-like syntax in JavaScript.",
    marks: 1,
  },
  {
    id: 4,
    question: "Which method is used to update state in a class component?",
    options: ["this.updateState()", "this.setState()", "this.changeState()", "this.modifyState()"],
    correctAnswer: 1,
    explanation: "this.setState() is the correct method to update state in class components.",
    marks: 2,
  },
  {
    id: 5,
    question: "What is the purpose of useEffect hook?",
    options: [
      "To manage component state",
      "To handle side effects in functional components",
      "To create context",
      "To optimize performance",
    ],
    correctAnswer: 1,
    explanation: "useEffect is used to handle side effects like API calls, subscriptions, and DOM manipulation.",
    marks: 3,
  },
]

const ExamTest = () => {
  const { examName } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const currentExam = useSelector((state) => state.exams.currentExam);
  const results = useSelector((state) => state.exams.results);
  const dispatch = useDispatch();

  // Get exam data
  let exam = location.state?.exam
  if (!exam && examName) {
    exam = allExams.find((e) => encodeURIComponent(e.name) === examName)
  }

  // Exam state
  const [timeLeft, setTimeLeft] = useState(0)
  const [examStarted, setExamStarted] = useState(false)
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)
  const [questions, setQuestions] = useState([])
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())
  const [showSidebar, setShowSidebar] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  // Security state
  const [securityWarnings, setSecurityWarnings] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSecurityWarning, setShowSecurityWarning] = useState(false)
  const [warningMessage, setWarningMessage] = useState("")
  const [securityLogs, setSecurityLogs] = useState([])

  const timerRef = useRef(null)
  const examContainerRef = useRef(null)
  const lastActiveTime = useRef(Date.now())
  const isTabActive = useRef(true)

  // Security constants
  const MAX_WARNINGS = 3
  const INACTIVITY_THRESHOLD = 30000 // 30 seconds

  // ==================== SECURITY FUNCTIONS (DEFINED FIRST) ====================

  // Security event logger - MOVED TO TOP
  const logSecurityEvent = useCallback((event, type) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      event,
      type,
      userAgent: navigator.userAgent,
      url: window.location.href,
    }

    setSecurityLogs((prev) => [...prev, logEntry])

    // In a real application, you would send this to your backend
    console.warn("Security Event:", logEntry)
  }, [])

  // Auto-submit handler - MOVED TO TOP
  const handleAutoSubmit = useCallback(
    async (reason) => {
      setExamSubmitted(true)
      clearInterval(timerRef.current)

      // Exit fullscreen
      await exitFullscreen()

      // Log auto-submission
      logSecurityEvent(`Exam auto-submitted: ${reason}`, "warning")

      // Calculate results
      calculateResults()
    },
    [logSecurityEvent],
  ) // Added dependency

  // Security violation handler - MOVED TO TOP
  const handleSecurityViolation = useCallback(
    (violationType) => {
      setSecurityWarnings((prevWarnings) => {
        const newWarningCount = prevWarnings + 1

        // Log the security event
        logSecurityEvent(violationType, "warning")

        // Show warning to user
        setWarningMessage(`Security Warning ${newWarningCount}/${MAX_WARNINGS}: ${violationType}`)
        setShowSecurityWarning(true)

        // Auto-hide warning after 5 seconds
        setTimeout(() => {
          setShowSecurityWarning(false)
        }, 5000)

        // Auto-submit if max warnings reached
        if (newWarningCount >= MAX_WARNINGS) {
          setTimeout(() => {
            handleAutoSubmit(`Maximum security violations reached (${MAX_WARNINGS})`)
          }, 2000)
        }

        return newWarningCount
      })
    },
    [logSecurityEvent, handleAutoSubmit],
  )

  useEffect(() => {
    if (!exam) return

    // Initialize questions (in real app, fetch from backend)
    setQuestions(sampleQuestions.slice(0, exam.questions || 5))

    // Parse duration and set timer (convert "60 mins" to seconds)
    const durationMatch = exam.duration.match(/(\d+)/)
    const minutes = durationMatch ? Number.parseInt(durationMatch[1]) : 60
    setTimeLeft(minutes * 60)
  }, [exam])

  // Timer effect
  useEffect(() => {
    if (examStarted && timeLeft > 0 && !examSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleAutoSubmit("Time expired")
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }

    return () => clearInterval(timerRef.current)
  }, [examStarted, timeLeft, examSubmitted, handleAutoSubmit])

  // ==================== SECURITY MEASURES ====================

  // 1. FULLSCREEN SECURITY - Simple fullscreen without sidebar manipulation since there's no sidebar
  const enterFullscreen = useCallback(async () => {
    try {
      // Target document.documentElement (entire page) for fullscreen
      const element = document.documentElement
      if (element.requestFullscreen) {
        await element.requestFullscreen()
      } else if (element.webkitRequestFullscreen) {
        // Safari
        await element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        // IE/Edge
        await element.msRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        // Firefox
        await element.mozRequestFullScreen()
      }
    } catch (error) {
      console.error("Failed to enter fullscreen:", error)
      logSecurityEvent("Fullscreen entry failed", "error")
    }
  }, [logSecurityEvent])

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      } else if (document.webkitExitFullscreen) {
        await document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        await document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        await document.mozCancelFullScreen()
      }
    } catch (error) {
      console.error("Failed to exit fullscreen:", error)
    }
  }, [])

  // 2. FULLSCREEN CHANGE DETECTION
  const handleFullscreenChange = useCallback(() => {
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement
    )

    setIsFullscreen(isCurrentlyFullscreen)

    // Only trigger violation if exam is active and user manually exited fullscreen
    if (examStarted && !examSubmitted && !isCurrentlyFullscreen) {
      handleSecurityViolation("Exited fullscreen mode")
    }
  }, [examStarted, examSubmitted, handleSecurityViolation])

  // 3. TAB VISIBILITY DETECTION
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      // Tab became hidden (user switched tabs)
      isTabActive.current = false
      if (examStarted && !examSubmitted) {
        handleSecurityViolation("Switched to another tab/window")
      }
    } else {
      // Tab became visible again
      isTabActive.current = true
      lastActiveTime.current = Date.now()
    }
  }, [examStarted, examSubmitted, handleSecurityViolation])

  // 4. KEYBOARD SHORTCUTS BLOCKING
  const handleKeyDown = useCallback(
    (event) => {
      if (!examStarted || examSubmitted) return

      // Block common screenshot and developer tools shortcuts
      const blockedKeys = [
        // Screenshots
        { key: "PrintScreen", description: "Screenshot attempt" },
        { key: "F12", description: "Developer tools attempt" },
        // Developer tools combinations
        { ctrlKey: true, shiftKey: true, key: "I", description: "Developer tools attempt" },
        { ctrlKey: true, shiftKey: true, key: "J", description: "Console attempt" },
        { ctrlKey: true, shiftKey: true, key: "C", description: "Element inspector attempt" },
        { ctrlKey: true, key: "U", description: "View source attempt" },
        // Copy/Paste (optional - you might want to allow this)
        { ctrlKey: true, key: "c", description: "Copy attempt" },
        { ctrlKey: true, key: "v", description: "Paste attempt" },
        { ctrlKey: true, key: "a", description: "Select all attempt" },
        // Refresh
        { key: "F5", description: "Page refresh attempt" },
        { ctrlKey: true, key: "r", description: "Page refresh attempt" },
        // New tab/window
        { ctrlKey: true, key: "t", description: "New tab attempt" },
        { ctrlKey: true, key: "n", description: "New window attempt" },
        { ctrlKey: true, shiftKey: true, key: "N", description: "Incognito window attempt" },
        // Alt+Tab (Windows)
        { altKey: true, key: "Tab", description: "Alt+Tab attempt" },
      ]

      for (const blocked of blockedKeys) {
        const matches =
          blocked.key === event.key &&
          (blocked.ctrlKey === undefined || blocked.ctrlKey === event.ctrlKey) &&
          (blocked.shiftKey === undefined || blocked.shiftKey === event.shiftKey) &&
          (blocked.altKey === undefined || blocked.altKey === event.altKey)

        if (matches) {
          event.preventDefault()
          event.stopPropagation()
          handleSecurityViolation(blocked.description)
          return false
        }
      }
    },
    [examStarted, examSubmitted, handleSecurityViolation],
  )

  // 5. RIGHT-CLICK CONTEXT MENU BLOCKING
  const handleContextMenu = useCallback(
    (event) => {
      if (examStarted && !examSubmitted) {
        // Always prevent context menu from appearing, but don't trigger warning
        // This allows right-click but shows no menu - much better UX
        event.preventDefault()
        return false
      }
    },
    [examStarted, examSubmitted], // Removed handleSecurityViolation dependency
  )

  // 6. MOUSE SELECTION BLOCKING (Optional)
  const handleSelectStart = useCallback(
    (event) => {
      if (examStarted && !examSubmitted) {
        // Allow selection only in input areas (for answering questions)
        const target = event.target
        if (!target.closest('input[type="radio"]') && !target.closest(".optionContent")) {
          event.preventDefault()
          return false
        }
      }
    },
    [examStarted, examSubmitted],
  )

  // 7. WINDOW FOCUS DETECTION
  const handleWindowFocus = useCallback(() => {
    lastActiveTime.current = Date.now()
  }, [])

  const handleWindowBlur = useCallback(() => {
    if (examStarted && !examSubmitted) {
      handleSecurityViolation("Window lost focus")
    }
  }, [examStarted, examSubmitted, handleSecurityViolation])

  // 8. INACTIVITY DETECTION
  const checkInactivity = useCallback(() => {
    if (examStarted && !examSubmitted && isTabActive.current) {
      const now = Date.now()
      const inactiveTime = now - lastActiveTime.current

      if (inactiveTime > INACTIVITY_THRESHOLD) {
        handleSecurityViolation("Extended inactivity detected")
        lastActiveTime.current = now
      }
    }
  }, [examStarted, examSubmitted, handleSecurityViolation])

  // Setup security event listeners
  useEffect(() => {
    if (examStarted && !examSubmitted) {
      // Fullscreen events
      document.addEventListener("fullscreenchange", handleFullscreenChange)
      document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.addEventListener("msfullscreenchange", handleFullscreenChange)
      document.addEventListener("mozfullscreenchange", handleFullscreenChange)

      // Visibility and focus events
      document.addEventListener("visibilitychange", handleVisibilityChange)
      window.addEventListener("focus", handleWindowFocus)
      window.addEventListener("blur", handleWindowBlur)

      // Keyboard and mouse events
      document.addEventListener("keydown", handleKeyDown, true)
      document.addEventListener("contextmenu", handleContextMenu)
      document.addEventListener("selectstart", handleSelectStart)

      // Inactivity checker
      const inactivityInterval = setInterval(checkInactivity, 5000)

      // Mouse movement tracker (to update last active time)
      const handleMouseMove = () => {
        lastActiveTime.current = Date.now()
      }
      document.addEventListener("mousemove", handleMouseMove)

      // Cleanup function
      return () => {
        document.removeEventListener("fullscreenchange", handleFullscreenChange)
        document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
        document.removeEventListener("msfullscreenchange", handleFullscreenChange)
        document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
        document.removeEventListener("visibilitychange", handleVisibilityChange)
        window.removeEventListener("focus", handleWindowFocus)
        window.removeEventListener("blur", handleWindowBlur)
        document.removeEventListener("keydown", handleKeyDown, true)
        document.removeEventListener("contextmenu", handleContextMenu)
        document.removeEventListener("selectstart", handleSelectStart)
        document.removeEventListener("mousemove", handleMouseMove)
        clearInterval(inactivityInterval)
      }
    }
  }, [
    examStarted,
    examSubmitted,
    handleFullscreenChange,
    handleVisibilityChange,
    handleWindowFocus,
    handleWindowBlur,
    handleKeyDown,
    handleContextMenu,
    handleSelectStart,
    checkInactivity,
  ])

  // ==================== EXAM FUNCTIONS ====================

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartExam = async () => {
    setExamStarted(true)
    logSecurityEvent("Exam started", "info")

    // Initialize security tracking
    lastActiveTime.current = Date.now()
    isTabActive.current = true

    // Try to enter fullscreen - browsers require user interaction
    try {
      await enterFullscreen()
    } catch (error) {
      // If fullscreen fails, show a prompt to user
      alert(
        "Please manually enter fullscreen mode by pressing F11 or clicking the fullscreen button for exam security.",
      )
      logSecurityEvent("Auto-fullscreen failed, manual prompt shown", "warning")
    }
  }

  const handleAnswerSelect = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }))
    lastActiveTime.current = Date.now() // Update activity
  }

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
    lastActiveTime.current = Date.now()
  }

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
    lastActiveTime.current = Date.now()
  }

  const handleQuestionJump = (questionIndex) => {
    setCurrentQuestion(questionIndex)
    setShowSidebar(false)
    lastActiveTime.current = Date.now()
  }

  const handleFlagQuestion = (questionId) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
    lastActiveTime.current = Date.now()
  }

  const handleSubmitExam = () => {
    setShowConfirmSubmit(true)
  }

  const handleConfirmSubmit = async () => {
    setExamSubmitted(true)
    setShowConfirmSubmit(false)
    clearInterval(timerRef.current)

    // Exit fullscreen
    await exitFullscreen()

    // Log exam completion
    logSecurityEvent("Exam submitted manually", "info")

    // Calculate results
    calculateResults()
  }

  const calculateResults = () => {
    // In real app, this would be done on backend
    let correct = 0
    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correct++
      }
    })

    const score = Math.round((correct / questions.length) * 100)
    const passed = score >= exam.passingScore

    // Navigate to results page with data including security logs
    navigate(`/StudentDashboard/Examination/${examName}/results`, {
      state: {
        exam,
        score,
        correct,
        total: questions.length,
        passed,
        answers,
        questions,
        timeSpent: Number.parseInt(exam.duration) * 60 - timeLeft,
        securityLogs,
        securityWarnings,
      },
    })
  }

  const getQuestionStatus = (questionIndex) => {
    const question = questions[questionIndex]
    if (!question) return "unanswered"

    if (flaggedQuestions.has(question.id)) return "flagged"
    if (answers[question.id] !== undefined) return "answered"
    return "unanswered"
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  const getFlaggedCount = () => {
    return flaggedQuestions.size
  }

  // Calculate total marks
  const getTotalMarks = () => {
    return questions.reduce((total, question) => total + (question.marks || 1), 0)
  }

  // ==================== RENDER ====================

  if (!exam) {
    return (
      <div className={styles.examTestContainer}>
        <div className={styles.mainContent}>
          <Header />
          <div className={styles.contentWrapper}>
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <span className="material-icons">error_outline</span>
              </div>
              <h2 className={styles.errorTitle}>Exam Not Found</h2>
              <p className={styles.errorText}>The exam you're looking for doesn't exist or has been removed.</p>
              <button className={styles.errorButton} onClick={() => navigate("/StudentDashboard/Examination")}>
                <span className="material-icons">arrow_back</span>
                Back to Examinations
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!examStarted) {
    return (
      <div className={styles.examTestContainer}>
        <div className={styles.mainContent}>
          <div className={styles.contentWrapper}>
            <div className={styles.startExamCard}>
              <div className={styles.examIcon} style={{ backgroundColor: exam.color }}>
                <span className="material-icons">{exam.icon}</span>
              </div>
              <h1 className={styles.examTitle}>{exam.name}</h1>
              <p className={styles.examDescription}>{exam.description}</p>

              <div className={styles.examStats}>
                <div className={styles.stat}>
                  <span className="material-icons">quiz</span>
                  <span>{questions.length} Questions</span>
                </div>
                <div className={styles.stat}>
                  <span className="material-icons">schedule</span>
                  <span>{exam.duration}</span>
                </div>
                <div className={styles.stat}>
                  <span className="material-icons">grade</span>
                  <span>{exam.passingScore}% to Pass</span>
                </div>
                <div className={styles.stat}>
                  <span className="material-icons">star</span>
                  <span>{getTotalMarks()} Total Marks</span>
                </div>
              </div>

              <div className={styles.securityNotice}>
                <h3>🔒 Security Notice:</h3>
                <ul className={styles.bulletList}>
                  <li>The exam will automatically enter fullscreen mode</li>
                  <li>Screenshots and screen recording are disabled</li>
                  <li>Switching tabs or exiting fullscreen will trigger warnings</li>
                  <li>After 3 security violations, the exam will be auto-submitted</li>
                  <li>Your activity will be monitored throughout the exam</li>
                </ul>
              </div>

              <div className={styles.instructions}>
                <h3>Instructions:</h3>
                <ul className={styles.bulletList}>
                  <li>Read each question carefully before selecting your answer</li>
                  <li>You can navigate between questions using Next/Previous buttons</li>
                  <li>Flag questions you want to review later</li>
                  <li>You can change your answers before submitting</li>
                  <li>The exam will auto-submit when time runs out</li>
                </ul>
              </div>

              <button className={styles.startButton} onClick={handleStartExam}>
                <span className="material-icons">play_arrow</span>
                Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className={styles.examTestContainer} ref={examContainerRef}>
      <div className={styles.mainContent}>
        {/* Security Warning Overlay */}
        {showSecurityWarning && (
          <div className={styles.securityWarningOverlay}>
            <div className={styles.securityWarningCard}>
              <div className={styles.warningIcon}>
                <span className="material-icons">warning</span>
              </div>
              <h3>Security Violation Detected!</h3>
              <p>{warningMessage}</p>
              <div className={styles.warningProgress}>
                <div className={styles.warningBar}>
                  <div
                    className={styles.warningFill}
                    style={{ width: `${(securityWarnings / MAX_WARNINGS) * 100}%` }}
                  ></div>
                </div>
                <span>
                  {securityWarnings}/{MAX_WARNINGS} warnings
                </span>
              </div>
              {securityWarnings >= MAX_WARNINGS && (
                <p className={styles.finalWarning}>Maximum warnings reached! Exam will be submitted automatically.</p>
              )}
            </div>
          </div>
        )}

        {/* Exam Header */}
        <div className={styles.examHeader}>
          <div className={styles.examInfo}>
            <h1 className={styles.examName}>{exam.name}</h1>
            <div className={styles.questionCounter}>
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          <div className={styles.examControls}>
            <div className={styles.securityStatus}>
              <span className={`${styles.securityIndicator} ${isFullscreen ? styles.secure : styles.insecure}`}>
                <span className="material-icons">{isFullscreen ? "fullscreen" : "fullscreen_exit"}</span>
                {isFullscreen ? "Secure" : "Not Secure"}
              </span>
              {!isFullscreen && (
                <button className={styles.fullscreenButton} onClick={enterFullscreen}>
                  <span className="material-icons">fullscreen</span>
                  Enter Fullscreen
                </button>
              )}
              <span className={styles.warningCount}>
                Warnings: {securityWarnings}/{MAX_WARNINGS}
              </span>
            </div>

            <div className={styles.timer}>
              <span className="material-icons">schedule</span>
              <span className={timeLeft < 300 ? styles.timeWarning : ""}>{formatTime(timeLeft)}</span>
            </div>

            <button className={styles.sidebarToggle} onClick={() => setShowSidebar(!showSidebar)}>
              <span className="material-icons">menu</span>
              Questions
            </button>
          </div>
        </div>

        <div className={styles.examContent}>
          {/* Question Panel */}
          <div className={styles.questionPanel}>
            <div className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <span className={styles.questionNumber}>Q{currentQuestion + 1}.</span>
                <div className={styles.questionHeaderRight}>
                  <span className={styles.questionMarks}>
                    [{currentQ?.marks || 1} {currentQ?.marks === 1 ? "Mark" : "Marks"}]
                  </span>
                  <button
                    className={`${styles.flagButton} ${flaggedQuestions.has(currentQ?.id) ? styles.flagged : ""}`}
                    onClick={() => handleFlagQuestion(currentQ?.id)}
                  >
                    <span className="material-icons">flag</span>
                    {flaggedQuestions.has(currentQ?.id) ? "Flagged" : "Flag"}
                  </button>
                </div>
              </div>

              <div className={styles.questionText}>{currentQ?.question}</div>

              <div className={styles.optionsContainer}>
                {currentQ?.options.map((option, index) => (
                  <label key={index} className={styles.optionLabel}>
                    <input
                      type="radio"
                      name={`question-${currentQ.id}`}
                      value={index}
                      checked={answers[currentQ.id] === index}
                      onChange={() => handleAnswerSelect(currentQ.id, index)}
                      className={styles.optionInput}
                    />
                    <div className={styles.optionContent}>
                      <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
                      <span className={styles.optionText}>{option}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className={styles.navigationControls}>
              <button className={styles.navButton} onClick={handlePrevQuestion} disabled={currentQuestion === 0}>
                <span className="material-icons">chevron_left</span>
                Previous
              </button>

              <div className={styles.questionStatus}>
                <span className={styles.statusItem}>
                  <span className={`${styles.statusDot} ${styles.answered}`}></span>
                  Answered: {getAnsweredCount()}
                </span>
                <span className={styles.statusItem}>
                  <span className={`${styles.statusDot} ${styles.flagged}`}></span>
                  Flagged: {getFlaggedCount()}
                </span>
              </div>

              {currentQuestion === questions.length - 1 ? (
                <button className={styles.submitButton} onClick={handleSubmitExam}>
                  <span className="material-icons">send</span>
                  Submit Exam
                </button>
              ) : (
                <button className={styles.navButton} onClick={handleNextQuestion}>
                  Next
                  <span className="material-icons">chevron_right</span>
                </button>
              )}
            </div>
          </div>

          {/* Questions Sidebar */}
          <div className={`${styles.questionsSidebar} ${showSidebar ? styles.sidebarOpen : ""}`}>
            <div className={styles.sidebarHeader}>
              <h3>Questions Overview</h3>
              <button className={styles.closeSidebar} onClick={() => setShowSidebar(false)}>
                <span className="material-icons">close</span>
              </button>
            </div>

            <div className={styles.questionsGrid}>
              {questions.map((question, index) => (
                <button
                  key={index}
                  className={`${styles.questionButton} ${styles[getQuestionStatus(index)]} ${
                    index === currentQuestion ? styles.current : ""
                  }`}
                  onClick={() => handleQuestionJump(index)}
                  title={`Question ${index + 1} - ${question.marks || 1} marks`}
                >
                  <span className={styles.questionButtonNumber}>{index + 1}</span>
                  <span className={styles.questionButtonMarks}>{question.marks || 1}m</span>
                </button>
              ))}
            </div>

            <div className={styles.sidebarStats}>
              <div className={styles.statRow}>
                <span className={`${styles.statusDot} ${styles.answered}`}></span>
                <span>Answered: {getAnsweredCount()}</span>
              </div>
              <div className={styles.statRow}>
                <span className={`${styles.statusDot} ${styles.unanswered}`}></span>
                <span>Unanswered: {questions.length - getAnsweredCount()}</span>
              </div>
              <div className={styles.statRow}>
                <span className={`${styles.statusDot} ${styles.flagged}`}></span>
                <span>Flagged: {getFlaggedCount()}</span>
              </div>
              <div className={styles.statRow}>
                <span className="material-icons" style={{ fontSize: "0.75rem", color: "#3b82f6" }}>
                  star
                </span>
                <span>Total Marks: {getTotalMarks()}</span>
              </div>
            </div>

            <button className={styles.submitButtonSidebar} onClick={handleSubmitExam}>
              <span className="material-icons">send</span>
              Submit Exam
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Submit Modal */}
      {showConfirmSubmit && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Submit Exam?</h3>
            </div>
            <div className={styles.modalBody}>
              <p>Are you sure you want to submit your exam?</p>
              <div className={styles.submitStats}>
                <div>
                  Answered: {getAnsweredCount()} / {questions.length}
                </div>
                <div>Unanswered: {questions.length - getAnsweredCount()}</div>
                <div>Flagged: {getFlaggedCount()}</div>
                <div>Total Marks: {getTotalMarks()}</div>
                <div>Security Warnings: {securityWarnings}</div>
              </div>
              <p className={styles.warning}>You cannot change your answers after submission.</p>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelButton} onClick={() => setShowConfirmSubmit(false)}>
                Cancel
              </button>
              <button className={styles.confirmButton} onClick={handleConfirmSubmit}>
                Submit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExamTest
