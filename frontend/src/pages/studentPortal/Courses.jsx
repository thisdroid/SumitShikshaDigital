import React, { useState } from 'react';
import Sidebar from '../../components/common_components/Sidebar';
import styles from './Courses.module.css';
import CourseCard from '../../components/course_card/CourseCard';
import ResumeCourseCard from '../../components/course_card/ResumeCourseCard';

const enrolledCourses = [
  {
    image: '/images/FrontEnd.jpg',
    title: 'Frontend for Beginners',
    description: 'Learn the basics of React.js with hands-on projects.',
    price: 'Free',
    rating: 4.8,
    reviewCount: 120,
    duration: 30,
  },
  {
    image: '/images/cyber_security.png',
    title: 'Cyber Security Basics',
    description: 'Learn the basics of Cyber Security with hands-on projects.',
    duration: 15,
  },
];

const availableCourses = [
  {
    image: '/images/fullStack.jpg',
    title: 'Python Programming',
    description: 'Start your journey with Python programming.',
    price: '199.99',
    rating: 4.5,
    reviewCount: 80,
    duration: 25,
  },
  {
    image: '/images/ai_analysis.png',
    title: 'Data Science Essentials',
    description: 'Master the basics of Data Science.',
    price: '299.99',
    rating: 4.7,
    reviewCount: 95,
    duration: 40,
  },
  {
    image: '/images/backend.jpg',
    title: 'Machine Learning',
    description: 'Introduction to Machine Learning concepts.',
    price: '399.99',
    rating: 4.6,
    reviewCount: 70,
    duration: 35,
  },
];

const Courses = () => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const [search, setSearch] = useState('');

  const filteredAvailable = availableCourses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Sidebar />
      <div className={styles.coursesWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Courses</h1>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'enrolled' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('enrolled')}
          >
            Enrolled Courses
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'available' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('available')}
          >
            Available Courses
          </button>
        </div>

        {activeTab === 'enrolled' && (
          <div>
            <h2 className={styles.sectionHeading}>Enrolled Courses</h2>
            <div className={styles.coursesFlex}>
              <CourseCard course={enrolledCourses[0]} />
              <ResumeCourseCard course={enrolledCourses[1]} />
            </div>
          </div>
        )}

        {activeTab === 'available' && (
          <div>
            <div className={styles.searchBarWrapper}>
              <input
                type="text"
                className={styles.searchBar}
                placeholder="Search courses by name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <h2 className={styles.sectionHeading}>Available Courses</h2>
            <div className={styles.coursesFlex}>
              {filteredAvailable.length > 0 ? (
                filteredAvailable.map((course, idx) => (
                  <CourseCard key={idx} course={course} />
                ))
              ) : (
                <div className={styles.noCourses}>No courses found.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;