"use client"
import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./CoursePlayer.module.css"
import Header from "../header/Header"
import { enrolledCourses, availableCourses } from "./Courses"

const allCourses = [...enrolledCourses, ...availableCourses]

const CoursePlayer = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [currentLesson, setCurrentLesson] = useState(0)
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [notes, setNotes] = useState("")
  const [showNotes, setShowNotes] = useState(false)
  const [completedLessons, setCompletedLessons] = useState(new Set())

  // Get course data
  let course = location.state?.course
  if (!course && courseId) {
    course = allCourses.find((c) => encodeURIComponent(c.title) === courseId)
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  if (!course) {
    return (
      <div className={styles.coursePlayerContainer}>
        <div className={styles.mainContent}>
          <Header />
          <div className={styles.contentWrapper}>
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <span className="material-icons">error_outline</span>
              </div>
              <h2 className={styles.errorTitle}>Course Not Found</h2>
              <p className={styles.errorText}>The course you're looking for doesn't exist or has been removed.</p>
              <button className={styles.errorButton} onClick={() => navigate("/StudentDashboard/Courses")}>
                <span className="material-icons">arrow_back</span>
                Back to Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Sample video data - in real app this would come from course data
  const videoData = {
    // YouTube embedded video
    youtubeId: "dQw4w9WgXcQ", // Sample YouTube ID
    // Or uploaded video URL
    videoUrl: "/sample-video.mp4",
    useYouTube: true, // Toggle between YouTube and uploaded video
  }

  const handleLessonSelect = (sectionIndex, lessonIndex) => {
    setCurrentSection(sectionIndex)
    setCurrentLesson(lessonIndex)
    setProgress(0)
  }

  const handleMarkComplete = () => {
    const lessonKey = `${currentSection}-${currentLesson}`
    setCompletedLessons((prev) => new Set([...prev, lessonKey]))
  }

  const handleNextLesson = () => {
    const currentSectionData = course.courseContent[currentSection]
    if (currentLesson < currentSectionData.lessons - 1) {
      setCurrentLesson(currentLesson + 1)
    } else if (currentSection < course.courseContent.length - 1) {
      setCurrentSection(currentSection + 1)
      setCurrentLesson(0)
    }
    setProgress(0)
  }

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1)
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
      setCurrentLesson(course.courseContent[currentSection - 1].lessons - 1)
    }
    setProgress(0)
  }

  const getCurrentLessonTitle = () => {
    return `${course.courseContent[currentSection].title} - Lesson ${currentLesson + 1}`
  }

  const isLessonCompleted = (sectionIndex, lessonIndex) => {
    return completedLessons.has(`${sectionIndex}-${lessonIndex}`)
  }

  const calculateOverallProgress = () => {
    const totalLessons = course.courseContent.reduce((sum, section) => sum + section.lessons, 0)
    return Math.round((completedLessons.size / totalLessons) * 100)
  }

  return (
    <div className={styles.coursePlayerContainer}>
      <div className={styles.mainContent}>
        <Header />
        <div className={styles.contentWrapper}>
          {/* Course Header */}
          <div className={styles.courseHeader}>
            <button className={styles.backButton} onClick={() => navigate("/StudentDashboard/Courses")}>
              <span className="material-icons">arrow_back</span>
              Back to Courses
            </button>
            <div className={styles.courseInfo}>
              <h1 className={styles.courseTitle}>{course.title}</h1>
              <div className={styles.progressInfo}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${calculateOverallProgress()}%` }}></div>
                </div>
                <span className={styles.progressText}>{calculateOverallProgress()}% Complete</span>
              </div>
            </div>
          </div>

          <div className={styles.playerLayout}>
            {/* Left Content - Video Player */}
            <div className={styles.leftContent}>
              {/* Video Player Section */}
              <div className={styles.videoSection}>
                <div className={styles.videoContainer}>
                  {videoData.useYouTube ? (
                    <iframe
                      className={styles.videoPlayer}
                      src={`https://www.youtube.com/embed/${videoData.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                      title="Course Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      className={styles.videoPlayer}
                      controls
                      poster={course.image}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    >
                      <source src={videoData.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>

                {/* Video Controls */}
                <div className={styles.videoControls}>
                  <div className={styles.lessonInfo}>
                    <h2 className={styles.lessonTitle}>{getCurrentLessonTitle()}</h2>
                    <p className={styles.lessonDescription}>
                      Learn the fundamentals and build practical skills in this comprehensive lesson.
                    </p>
                  </div>
                  <div className={styles.controlButtons}>
                    <button
                      className={styles.controlBtn}
                      onClick={handlePrevLesson}
                      disabled={currentSection === 0 && currentLesson === 0}
                    >
                      <span className="material-icons">skip_previous</span>
                      Previous
                    </button>
                    <button className={styles.markCompleteBtn} onClick={handleMarkComplete}>
                      <span className="material-icons">check_circle</span>
                      Mark Complete
                    </button>
                    <button
                      className={styles.controlBtn}
                      onClick={handleNextLesson}
                      disabled={
                        currentSection === course.courseContent.length - 1 &&
                        currentLesson === course.courseContent[currentSection].lessons - 1
                      }
                    >
                      Next
                      <span className="material-icons">skip_next</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className={styles.notesSection}>
                <div className={styles.notesHeader}>
                  <button
                    className={`${styles.notesToggle} ${showNotes ? styles.active : ""}`}
                    onClick={() => setShowNotes(!showNotes)}
                  >
                    <span className="material-icons">note_add</span>
                    My Notes
                  </button>
                  <button className={styles.resourcesBtn}>
                    <span className="material-icons">folder</span>
                    Resources
                  </button>
                </div>
                {showNotes && (
                  <div className={styles.notesContent}>
                    <textarea
                      className={styles.notesTextarea}
                      placeholder="Take notes for this lesson..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <button className={styles.saveNotesBtn}>
                      <span className="material-icons">save</span>
                      Save Notes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Sidebar - Course Content */}
            <div className={styles.rightSidebar}>
              <div className={styles.courseContentCard}>
                <div className={styles.contentHeader}>
                  <h3 className={styles.contentTitle}>Course Content</h3>
                  <span className={styles.contentStats}>
                    {course.lessonsCount} lessons • {course.duration} hours
                  </span>
                </div>

                <div className={styles.contentList}>
                  {course.courseContent.map((section, sectionIndex) => (
                    <div key={sectionIndex} className={styles.contentSection}>
                      <div className={styles.sectionHeader}>
                        <h4 className={styles.sectionTitle}>{section.title}</h4>
                        <span className={styles.sectionMeta}>
                          {section.lessons} lessons • {section.duration}
                        </span>
                      </div>
                      <div className={styles.lessonsList}>
                        {Array.from({ length: section.lessons }, (_, lessonIndex) => (
                          <button
                            key={lessonIndex}
                            className={`${styles.lessonItem} ${
                              currentSection === sectionIndex && currentLesson === lessonIndex
                                ? styles.currentLesson
                                : ""
                            } ${isLessonCompleted(sectionIndex, lessonIndex) ? styles.completedLesson : ""}`}
                            onClick={() => handleLessonSelect(sectionIndex, lessonIndex)}
                          >
                            <div className={styles.lessonIcon}>
                              {isLessonCompleted(sectionIndex, lessonIndex) ? (
                                <span className="material-icons">check_circle</span>
                              ) : currentSection === sectionIndex && currentLesson === lessonIndex ? (
                                <span className="material-icons">play_circle</span>
                              ) : (
                                <span className="material-icons">play_circle_outline</span>
                              )}
                            </div>
                            <div className={styles.lessonInfo}>
                              <span className={styles.lessonName}>
                                Lesson {lessonIndex + 1}: Introduction to {section.title}
                              </span>
                              <span className={styles.lessonDuration}>8:30</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Stats */}
              <div className={styles.courseStatsCard}>
                <h3 className={styles.statsTitle}>Your Progress</h3>
                <div className={styles.statsList}>
                  <div className={styles.statItem}>
                    <span className="material-icons">school</span>
                    <div className={styles.statInfo}>
                      <span className={styles.statLabel}>Completed</span>
                      <span className={styles.statValue}>{completedLessons.size} lessons</span>
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <span className="material-icons">schedule</span>
                    <div className={styles.statInfo}>
                      <span className={styles.statLabel}>Time Spent</span>
                      <span className={styles.statValue}>2.5 hours</span>
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <span className="material-icons">trending_up</span>
                    <div className={styles.statInfo}>
                      <span className={styles.statLabel}>Progress</span>
                      <span className={styles.statValue}>{calculateOverallProgress()}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePlayer
