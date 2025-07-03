import React from 'react';
import styles from './CourseCard.module.css';

const CourseCard = ({ course, onView }) => {
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
            <span className={styles.coursePrice}>₹ {course.price}</span>
            <span className={styles.courseRating}>
              ⭐ {course.rating} ({course.reviewCount})
            </span>
            <span className={styles.courseDuration}>{course.duration} days</span>
          </div>
          <button className={styles.viewCourseBtn} onClick={onView}>
            View Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
