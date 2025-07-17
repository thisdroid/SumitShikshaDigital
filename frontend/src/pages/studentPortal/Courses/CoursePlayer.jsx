"use client"
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProgress } from '../../../slices/coursesSlice';
import {
  setCurrentLesson,
  setCurrentSection,
  setIsPlaying,
  setProgress,
  setNotes,
  setShowNotes,
  setShowResources,
  setCompletedLessons,
  setExpandedSections,
  setLoading,
} from '../../../slices/coursePlayerUiSlice';
import { useParams, useNavigate, useLocation } from "react-router-dom"
import styles from "./CoursePlayer.module.css"
import Header from "../header/Header"
import { enrolledCourses, availableCourses } from "./Courses"
import VideoPlayer from "./VideoPlayer"
import CoursePlayerSkeleton from "./CoursePlayerSkeleton"

const allCourses = [...enrolledCourses, ...availableCourses]

// Sample lesson data with different YouTube videos
const lessonVideos = {
  "0-0": {
    // youtubeId: "dQw4w9WgXcQ",
    videoUrl: "https://vimeo.com/1098951138?share=copy#t=1.84", // Optional, if you have direct video links
    title: "Introduction to React Native Setup",
    description:
      "Learn the fundamentals and build practical skills in this comprehensive lesson about React Native setup and configuration.",
  },
  "0-1": {
    // youtubeId: "9bZkp7q19f0",
    videoUrl: "https://drive.google.com/file/d/1IkH_WazNXZuErgm-D_G3bGOdZ4lNIdtb/view?usp=sharing",// ggl drive link
    title: "Environment Configuration",
    description: "Set up your development environment for React Native development with all necessary tools.",
  },
  "0-2": {
    youtubeId: "kJQP7kiw5Fk",
    title: "First React Native App",
    description: "Create your first React Native application and understand the basic structure.",
  },
  "1-0": {
    youtubeId: "L72fhGm1tfE",
    title: "Core Components Overview",
    description: "Explore the essential React Native components and their usage patterns.",
  },
  "1-1": {
    youtubeId: "vr0qNXmkUJ8",
    title: "Styling Components",
    description: "Learn how to style React Native components effectively using StyleSheet.",
  },
  "1-2": {
    youtubeId: "ZXsQAXx_ao0",
    title: "Component Props and State",
    description: "Understanding props and state management in React Native components.",
  },
  "2-0": {
    youtubeId: "hQAHSlTtcmY",
    title: "Navigation Basics",
    description: "Introduction to navigation patterns in React Native applications.",
  },
  "2-1": {
    youtubeId: "WcFoBma0RXU",
    title: "Stack Navigation",
    description: "Implementing stack navigation for seamless user experience.",
  },
  "2-2": {
    youtubeId: "1yup-QqJjEQ",
    title: "Tab Navigation",
    description: "Creating tab-based navigation for better app organization.",
  },
  "3-0": {
    youtubeId: "YQHsXMglC9A",
    title: "Native Features Introduction",
    description: "Accessing device native features in React Native applications.",
  },
  "3-1": {
    youtubeId: "ktvtqJ7bbXI",
    title: "Camera Integration",
    description: "Integrating camera functionality into your React Native app.",
  },
  "4-0": {
    youtubeId: "fq4N0hgOWzU",
    title: "Deployment Preparation",
    description: "Preparing your React Native app for production deployment.",
  },
}

const CoursePlayer = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();
  const currentLesson = useSelector((state) => state.coursePlayerUi.currentLesson);
  const currentSection = useSelector((state) => state.coursePlayerUi.currentSection);
  const isPlaying = useSelector((state) => state.coursePlayerUi.isPlaying);
  const progress = useSelector((state) => state.coursePlayerUi.progress);
  const notes = useSelector((state) => state.coursePlayerUi.notes);
  const showNotes = useSelector((state) => state.coursePlayerUi.showNotes);
  const showResources = useSelector((state) => state.coursePlayerUi.showResources);
  const completedLessons = useSelector((state) => state.coursePlayerUi.completedLessons);
  const expandedSections = useSelector((state) => state.coursePlayerUi.expandedSections);
  const loading = useSelector((state) => state.coursePlayerUi.loading);

  // Get course data
  let course = location.state?.course
  if (!course && courseId) {
    course = allCourses.find((c) => encodeURIComponent(c.title) === courseId)
  }

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => dispatch(setLoading(false)), 500)
    return () => clearTimeout(timer)
  }, [dispatch])

  if (loading) return <CoursePlayerSkeleton />

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

  const getCurrentVideoData = () => {
    const lessonKey = `${currentSection}-${currentLesson}`
    return lessonVideos[lessonKey] || lessonVideos["0-0"]
  }

  const toggleSection = (sectionIndex) => {
    const newExpanded = new Set(expandedSections)
    if (expandedSections.includes(sectionIndex)) {
      newExpanded.delete(sectionIndex)
    } else {
      newExpanded.add(sectionIndex)
    }
    dispatch(setExpandedSections(Array.from(newExpanded)))
  }

  const handleLessonSelect = (sectionIndex, lessonIndex) => {
    dispatch(setCurrentSection(sectionIndex))
    dispatch(setCurrentLesson(lessonIndex))
    dispatch(setProgress(0))
  }

  const handleMarkComplete = () => {
    const lessonKey = `${currentSection}-${currentLesson}`
    const updated = new Set(completedLessons)
    updated.add(lessonKey)
    dispatch(setCompletedLessons(Array.from(updated)))
  }

  const handleNextLesson = () => {
    const currentSectionData = course.courseContent[currentSection]
    if (currentLesson < currentSectionData.lessons - 1) {
      dispatch(setCurrentLesson(currentLesson + 1))
    } else if (currentSection < course.courseContent.length - 1) {
      dispatch(setCurrentSection(currentSection + 1))
      dispatch(setCurrentLesson(0))
    }
    dispatch(setProgress(0))
  }

  const handlePrevLesson = () => {
    if (currentLesson > 0) {
      dispatch(setCurrentLesson(currentLesson - 1))
    } else if (currentSection > 0) {
      dispatch(setCurrentSection(currentSection - 1))
      dispatch(setCurrentLesson(course.courseContent[currentSection - 1].lessons - 1))
    }
    dispatch(setProgress(0))
  }

  const isLessonCompleted = (sectionIndex, lessonIndex) => {
    return completedLessons.includes(`${sectionIndex}-${lessonIndex}`)
  }

  const calculateOverallProgress = () => {
    const totalLessons = course.courseContent.reduce((sum, section) => sum + section.lessons, 0)
    return Math.round((completedLessons.length / totalLessons) * 100)
  }

  const handleSaveNotes = () => {
    // In a real app, this would save to a database
    localStorage.setItem(`notes-${currentSection}-${currentLesson}`, notes)
    alert("Notes saved successfully!")
  }

  const handleNotesToggle = () => {
    if (!showNotes) {
      // Load saved notes when opening
      const savedNotes = localStorage.getItem(`notes-${currentSection}-${currentLesson}`) || ""
      dispatch(setNotes(savedNotes))
    }
    dispatch(setShowNotes(!showNotes))
    dispatch(setShowResources(false)) // Close resources if open
  }

  const handleResourcesToggle = () => {
    dispatch(setShowResources(!showResources))
    dispatch(setShowNotes(false)) // Close notes if open
  }

  const currentVideoData = getCurrentVideoData()

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
                  <VideoPlayer
                    type={
                      currentVideoData.youtubeId
                        ? "youtube"
                        : currentVideoData.videoUrl && currentVideoData.videoUrl.includes("vimeo.com")
                        ? "vimeo"
                        : currentVideoData.videoUrl
                        ? "mp4"
                        : null
                    }
                    url={currentVideoData.youtubeId
                      ? `https://www.youtube.com/watch?v=${currentVideoData.youtubeId}`
                      : currentVideoData.videoUrl || ""}
                    className={styles.videoPlayer}
                  />
                </div>

                {/* Video Info and Controls */}
                <div className={styles.videoInfo}>
                  <h2 className={styles.lessonTitle}>{currentVideoData.title}</h2>
                  <p className={styles.lessonDescription}>{currentVideoData.description}</p>
                  <div className={styles.controlButtons}>
                    <button
                      className={styles.controlBtn}
                      onClick={handlePrevLesson}
                      disabled={currentSection === 0 && currentLesson === 0}
                    >
                      <span className="material-icons">skip_previous</span>
                      Previous
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
                    <button className={styles.markCompleteBtn} onClick={handleMarkComplete}>
                      <span className="material-icons">check_circle</span>
                      Mark Complete
                    </button>
                  </div>
                </div>
              </div>

              {/* Notes and Resources Section */}
              <div className={styles.notesSection}>
                <div className={styles.notesHeader}>
                  <button
                    className={`${styles.notesToggle} ${showNotes ? styles.active : ""}`}
                    onClick={handleNotesToggle}
                  >
                    <span className="material-icons">note_add</span>
                    My Notes
                  </button>
                  <button
                    className={`${styles.resourcesBtn} ${showResources ? styles.active : ""}`}
                    onClick={handleResourcesToggle}
                  >
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
                      onChange={(e) => dispatch(setNotes(e.target.value))}
                    />
                    <button className={styles.saveNotesBtn} onClick={handleSaveNotes}>
                      <span className="material-icons">save</span>
                      Save Notes
                    </button>
                  </div>
                )}

                {showResources && (
                  <div className={styles.resourcesContent}>
                    <div className={styles.resourcesList}>
                      <div className={styles.resourceItem}>
                        <span className="material-icons">picture_as_pdf</span>
                        <div className={styles.resourceInfo}>
                          <span className={styles.resourceName}>Course Slides - Lesson {currentLesson + 1}</span>
                          <span className={styles.resourceSize}>2.5 MB</span>
                        </div>
                        <button className={styles.downloadBtn}>
                          <span className="material-icons">download</span>
                        </button>
                      </div>
                      <div className={styles.resourceItem}>
                        <span className="material-icons">code</span>
                        <div className={styles.resourceInfo}>
                          <span className={styles.resourceName}>Source Code Examples</span>
                          <span className={styles.resourceSize}>1.2 MB</span>
                        </div>
                        <button className={styles.downloadBtn}>
                          <span className="material-icons">download</span>
                        </button>
                      </div>
                      <div className={styles.resourceItem}>
                        <span className="material-icons">link</span>
                        <div className={styles.resourceInfo}>
                          <span className={styles.resourceName}>Additional Reading</span>
                          <span className={styles.resourceSize}>External Link</span>
                        </div>
                        <button className={styles.downloadBtn}>
                          <span className="material-icons">open_in_new</span>
                        </button>
                      </div>
                    </div>
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
                      <button className={styles.sectionHeader} onClick={() => toggleSection(sectionIndex)}>
                        <div className={styles.sectionInfo}>
                          <h4 className={styles.sectionTitle}>{section.title}</h4>
                          <span className={styles.sectionMeta}>
                            {section.lessons} lessons • {section.duration}
                          </span>
                        </div>
                        <span
                          className={`material-icons ${styles.expandIcon} ${expandedSections.includes(sectionIndex) ? styles.expanded : ""}`}
                        >
                          expand_more
                        </span>
                      </button>

                      {expandedSections.includes(sectionIndex) && (
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
                                  Lesson {lessonIndex + 1}:{" "}
                                  {lessonVideos[`${sectionIndex}-${lessonIndex}`]?.title ||
                                    `Introduction to ${section.title}`}
                                </span>
                                <span className={styles.lessonDuration}>8:30</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
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
                      <span className={styles.statValue}>{completedLessons.length} lessons</span>
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
