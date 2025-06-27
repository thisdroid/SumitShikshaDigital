import React from 'react';
import styles from './ResumeCourseCard.module.css';

const ResumeCourseCard = ({ course }) => {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseImageContainer}>
        <img 
          src={course.image} 
          alt={course.title} 
          className={styles.courseImage}
        />
      </div>
      
      <div className={styles.courseContent}>
        <div>
          <h3 className={styles.courseTitle}>{course.title}</h3>
          <p className={styles.courseDescription}>{course.description}</p>
        </div>
        <div>
          <div className={styles.courseMeta}>
            <span className={styles.courseDuration}>{course.duration} days</span>
          </div>
          
          <button className={styles.viewCourseBtn}>
            Resume Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCourseCard;
