"use client"

import { useState } from "react"
import styles from "./Calendar.module.css"

const Calendar = ({ 
  title = "Calendar", 
  showYearSelector = true, 
  onDateClick = null,
  highlightedDates = [],
  className = "" 
}) => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const currentDate = today.getDate()
    const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear()

    const calendar = []

    for (let i = 0; i < firstDay; i++) {
      calendar.push(null)
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      const highlightedDate = highlightedDates.find(date => date.date === dateString)
      
      calendar.push({
        date: i,
        isToday: isCurrentMonth && i === currentDate,
        fullDate: dateString,
        highlighted: highlightedDate,
      })
    }

    return { calendar }
  }

  const { calendar } = generateCalendar()

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1))
    if (currentMonth === 0) setCurrentYear((y) => y - 1)
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1))
    if (currentMonth === 11) setCurrentYear((y) => y + 1)
  }

  const handleYearChange = (e) => {
    setCurrentYear(Number(e.target.value))
  }

  const handleDateClick = (day) => {
    if (onDateClick && day) {
      onDateClick({
        date: day.date,
        fullDate: day.fullDate,
        month: currentMonth + 1,
        year: currentYear,
        highlighted: day.highlighted
      })
    }
  }

  return (
    <div className={`${styles.calendarCard} ${className}`}>
      <div className={styles.calendarHeader}>
        <h3 className={styles.calendarTitle}>{title}</h3>
        {showYearSelector && (
          <div className={styles.calendarControls}>
            <select value={currentYear} onChange={handleYearChange}>
              {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      <div className={styles.monthHeader}>
        <button className={styles.monthNav} onClick={handlePrevMonth}>
          <span className="material-icons">chevron_left</span>
        </button>
        <span className={styles.monthTitle}>
          {new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" })} {currentYear}
        </span>
        <button className={styles.monthNav} onClick={handleNextMonth}>
          <span className="material-icons">chevron_right</span>
        </button>
      </div>
      
      <div className={styles.calendarGrid}>
        <div className={styles.weekDays}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <span key={day} className={styles.weekDay}>
              {day}
            </span>
          ))}
        </div>
        <div className={styles.calendarDays}>
          {calendar.map((day, index) => (
            <div 
              key={index} 
              className={`
                ${styles.calendarDay} 
                ${day?.isToday ? styles.currentDay : ""} 
                ${day?.highlighted ? styles.highlightedDay : ""}
                ${onDateClick && day ? styles.clickableDay : ""}
              `}
              onClick={() => handleDateClick(day)}
              style={day?.highlighted ? { backgroundColor: day.highlighted.color } : {}}
            >
              {day?.date}
              {day?.highlighted && (
                <div className={styles.dayIndicator} style={{ backgroundColor: day.highlighted.color }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Calendar
