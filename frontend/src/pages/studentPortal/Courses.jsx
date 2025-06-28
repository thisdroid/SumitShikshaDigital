import { useRef, useEffect, useState } from "react"
import styles from "./Courses.module.css"
import CourseCard from "../../components/course_card/CourseCard"
import ResumeCourseCard from "../../components/course_card/ResumeCourseCard"
import CourseDetails from "./Courses/CourseDetails"

const enrolledCourses = [
  {
    image: "/images/FrontEnd.jpg",
    title: "Frontend for Beginners",
    description: "Learn the basics of React.js with hands-on projects.",
    price: "Free",
    rating: 4.8,
    reviewCount: 120,
    duration: 30,
  },
  {
    image: "/images/cyber_security.png",
    title: "Cyber Security Basics",
    description: "Learn the basics of Cyber Security with hands-on projects.",
    duration: 15,
  },
  {
    image: "/images/fullStack.jpg",
    title: "Python Programming",
    description: "Start your journey with Python programming.",
    price: "199.99",
    rating: 4.5,
    reviewCount: 80,
    duration: 25,
  },
  {
    image: "/images/ai_analysis.png",
    title: "Data Science Essentials",
    description: "Master the basics of Data Science.",
    price: "299.99",
    rating: 4.7,
    reviewCount: 95,
    duration: 40,
  },
  {
    image: "/images/backend.jpg",
    title: "Machine Learning",
    description: "Introduction to Machine Learning concepts.",
    price: "399.99",
    rating: 4.6,
    reviewCount: 70,
    duration: 35,
  },
]

const availableCourses = [
  {
    image: "/images/fullStack.jpg",
    title: "Python Programming",
    description: "Start your journey with Python programming.",
    price: "199.99",
    rating: 4.5,
    reviewCount: 80,
    duration: 25,
  },
  {
    image: "/images/ai_analysis.png",
    title: "Data Science Essentials",
    description: "Master the basics of Data Science.",
    price: "299.99",
    rating: 4.7,
    reviewCount: 95,
    duration: 40,
  },
  {
    image: "/images/backend.jpg",
    title: "Machine Learning",
    description: "Introduction to Machine Learning concepts.",
    price: "399.99",
    rating: 4.6,
    reviewCount: 70,
    duration: 35,
  },
  {
    image: "/images/FrontEnd.jpg",
    title: "Frontend for Beginners",
    description: "Learn the basics of React.js with hands-on projects.",
    price: "Free",
    rating: 4.8,
    reviewCount: 120,
    duration: 30,
  },
  {
    image: "/images/cyber_security.png",
    title: "Cyber Security Basics",
    description: "Learn the basics of Cyber Security with hands-on projects.",
    price: "399.99",
    rating: 4.2,
    reviewCount: 50,
    duration: 15,
  },
]

const Courses = () => {
  const [activeTab, setActiveTab] = useState("enrolled")
  const [search, setSearch] = useState("")
  const [filters, setFilters] = useState({
    duration: "all",
    rating: "all",
    price: "all",
  })
  const [showFilters, setShowFilters] = useState({
    duration: false,
    rating: false,
    price: false,
  })
  const [selectedCourse, setSelectedCourse] = useState(null) // Track course selected to view details

  const filterDropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target)
      ) {
        setShowFilters({
          duration: false,
          rating: false,
          price: false,
        })
      }
    }
    if (showFilters.duration || showFilters.rating || showFilters.price) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFilters])

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    setShowFilters((prev) => ({
      ...prev,
      [filterType]: false,
    }))
  }

  const toggleFilter = (filterType) => {
    setShowFilters((prev) => ({
      duration: false,
      rating: false,
      price: false,
      [filterType]: !prev[filterType],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      duration: "all",
      rating: "all",
      price: "all",
    })
    setSearch("")
  }

  const getFilteredCourses = () => {
    return availableCourses.filter((course) => {
      // Search filter
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase())

      // Duration filter
      let matchesDuration = true
      if (filters.duration !== "all") {
        switch (filters.duration) {
          case "short":
            matchesDuration = course.duration <= 20
            break
          case "medium":
            matchesDuration = course.duration > 20 && course.duration <= 35
            break
          case "long":
            matchesDuration = course.duration > 35
            break
        }
      }

      // Rating filter
      let matchesRating = true
      if (filters.rating !== "all" && course.rating) {
        switch (filters.rating) {
          case "4.0":
            matchesRating = course.rating >= 4.0
            break
          case "4.5":
            matchesRating = course.rating >= 4.5
            break
          case "4.8":
            matchesRating = course.rating >= 4.8
            break
        }
      }

      // Price filter
      let matchesPrice = true
      if (filters.price !== "all") {
        const price = course.price === "Free" ? 0 : Number.parseFloat(course.price)
        switch (filters.price) {
          case "free":
            matchesPrice = course.price === "Free"
            break
          case "under200":
            matchesPrice = price > 0 && price < 200
            break
          case "200to400":
            matchesPrice = price >= 200 && price <= 400
            break
          case "over400":
            matchesPrice = price > 400
            break
        }
      }

      return matchesSearch && matchesDuration && matchesRating && matchesPrice
    })
  }

  const filteredAvailable = getFilteredCourses()
  const hasActiveFilters =
    filters.duration !== "all" || filters.rating !== "all" || filters.price !== "all" || search !== ""

  // Open course detail view
  const handleViewCourse = (course) => {
    setSelectedCourse(course)
  }

  // Back from details to courses
  const handleBackToCourses = () => {
    setSelectedCourse(null)
  }

  // Render enrolled courses with onView
  const renderEnrolledCourses = () => (
    <div className={styles.coursesFlex}>
      {enrolledCourses.map((course, idx) => (
        <ResumeCourseCard
          key={idx}
          course={course}
          onView={() => handleViewCourse(course)}
        />
      ))}
    </div>
  )

  // Render available courses with onView
  const renderAvailableCourses = () => (
    <>
      <div className={styles.searchBarWrapper}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search courses by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.filtersWrapper} ref={filterDropdownRef}>
          {/* Duration Filter */}
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterBtn} ${filters.duration !== "all" ? styles.filterActive : ""}`}
              onClick={() => toggleFilter("duration")}
            >
              Duration
              <span className={styles.filterArrow}>▼</span>
            </button>
            {showFilters.duration && (
              <div className={styles.filterDropdown}>
                <div
                  className={`${styles.filterOption} ${filters.duration === "all" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("duration", "all")}
                >
                  All Durations
                </div>
                <div
                  className={`${styles.filterOption} ${filters.duration === "short" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("duration", "short")}
                >
                  Short (≤20 hours)
                </div>
                <div
                  className={`${styles.filterOption} ${filters.duration === "medium" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("duration", "medium")}
                >
                  Medium (21-35 hours)
                </div>
                <div
                  className={`${styles.filterOption} ${filters.duration === "long" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("duration", "long")}
                >
                  Long (35+ hours)
                </div>
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterBtn} ${filters.rating !== "all" ? styles.filterActive : ""}`}
              onClick={() => toggleFilter("rating")}
            >
              Rating
              <span className={styles.filterArrow}>▼</span>
            </button>
            {showFilters.rating && (
              <div className={styles.filterDropdown}>
                <div
                  className={`${styles.filterOption} ${filters.rating === "all" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("rating", "all")}
                >
                  All Ratings
                </div>
                <div
                  className={`${styles.filterOption} ${filters.rating === "4.0" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("rating", "4.0")}
                >
                  4.0+ ⭐
                </div>
                <div
                  className={`${styles.filterOption} ${filters.rating === "4.5" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("rating", "4.5")}
                >
                  4.5+ ⭐
                </div>
                <div
                  className={`${styles.filterOption} ${filters.rating === "4.8" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("rating", "4.8")}
                >
                  4.8+ ⭐
                </div>
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className={styles.filterContainer}>
            <button
              className={`${styles.filterBtn} ${filters.price !== "all" ? styles.filterActive : ""}`}
              onClick={() => toggleFilter("price")}
            >
              Price
              <span className={styles.filterArrow}>▼</span>
            </button>
            {showFilters.price && (
              <div className={styles.filterDropdown}>
                <div
                  className={`${styles.filterOption} ${filters.price === "all" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("price", "all")}
                >
                  All Prices
                </div>
                <div
                  className={`${styles.filterOption} ${filters.price === "free" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("price", "free")}
                >
                  Free
                </div>
                <div
                  className={`${styles.filterOption} ${filters.price === "under200" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("price", "under200")}
                >
                  Under $200
                </div>
                <div
                  className={`${styles.filterOption} ${filters.price === "200to400" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("price", "200to400")}
                >
                  $200 - $400
                </div>
                <div
                  className={`${styles.filterOption} ${filters.price === "over400" ? styles.selected : ""}`}
                  onClick={() => handleFilterChange("price", "over400")}
                >
                  Over $400
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button className={styles.clearFiltersBtn} onClick={clearAllFilters}>
              Clear All
            </button>
          )}
        </div>
      </div>

      <h2 className={styles.sectionHeading}>
        Available Courses
        {filteredAvailable.length !== availableCourses.length && (
          <span className={styles.resultCount}>({filteredAvailable.length} found)</span>
        )}
      </h2>
      <div className={styles.coursesFlex}>
        {filteredAvailable.length > 0 ? (
          filteredAvailable.map((course, idx) => (
            <CourseCard key={idx} course={course} onView={() => handleViewCourse(course)} />
          ))
        ) : (
          <div className={styles.noCoursesWrapper}>
            <div className={styles.noCourses}>
              No courses found matching your criteria.
              <button className={styles.resetFiltersBtn} onClick={clearAllFilters}>
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )

  // Note: end of renderAvailableCourses
  // )
  
  if (selectedCourse) {
    return <CourseDetails course={selectedCourse} onBack={handleBackToCourses} />
  }

  return (
    <div className={styles.coursesWrapper}>
      <div className={`${styles.headerBackground} ${styles.theme}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>Courses</h1>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === "enrolled" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("enrolled")}
        >
          Enrolled Courses
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "available" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("available")}
        >
          Available Courses
        </button>
      </div>

      <div className={styles.divider} />

      {activeTab === "enrolled" && renderEnrolledCourses()}
      {activeTab === "available" && renderAvailableCourses()}
    </div>
  )
}

export default Courses
