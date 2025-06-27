import React from 'react';
import Sidebar from '../../components/common_components/Sidebar';
import styles from './StudentDashboard.module.css'; // ✅ Import CSS Module
import CourseCard from '../../components/course_card/CourseCard';
import ResumeCourseCard from '../../components/course_card/ResumeCourseCard';
import ExamCard from '../../components/exam_card/ExamCard';

const StudentDashboard = () => {
  const stats = {
    Course_Enrolled: 1,
    Available_Exams: 1,
    Certificates_Earned: 0,
    Learning_Streak: 0,
  };

  const statsCards = [
    {
      title: 'Course Enrolled',
      value: stats.Course_Enrolled,
      icon: <span className={`material-icons ${styles.textBlue600}`}>menu_book</span>,
      description: 'Courses you have enrolled',
    },
    {
      title: 'Available Exams',
      value: stats.Available_Exams,
      icon: <span className={`material-icons ${styles.textGreen600}`}>edit</span>,
      description: 'Exams available for you',
    },
    {
      title: 'Certificates Earned',
      value: stats.Certificates_Earned,
      icon: <span className={`material-icons ${styles.textIndigo600}`}>verified</span>,
      description: 'Certificates awarded',
    },
    {
      title: 'Learning Streak',
      value: stats.Learning_Streak,
      icon: <span className={`material-icons ${styles.textOrange600}`}>local_fire_department</span>,
      description: 'Days of continuous learning',
    },
  ];

  return (
    <>
      <Sidebar />
      <div className={styles.dashboardWrapper}>
        <div className={`${styles.headerBackground} ${styles.theme}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Welcome back, Ready to continue your learning journey?</p>
          </div>
        </div>


        <div className={styles.statsGrid}>
          {statsCards.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{stat.title}</h3>
                {stat.icon}
              </div>
              <div className={styles.cardValue}>{stat.value}</div>
              <p className={styles.cardDescription}>{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Courses Section */}
        <h2 className={styles.sectionHeading}>Courses Enrolled</h2>
        <div className={styles.coursesFlex}>
          <CourseCard
            course={{
              image: '/images/FrontEnd.jpg',
              title: 'Frontend for Beginners',
              description: 'Learn the basics of React.js with hands-on projects.',
              price: 'Free',
              rating: 4.8,
              reviewCount: 120,
              duration: 30,
            }}
          />
          <ResumeCourseCard
            course={{
              image: '/images/FrontEnd.jpg',
              title: 'Frontend for Beginners',
              description: 'Learn the basics of React.js with hands-on projects.',
              duration: 30,
            }}
          />
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Exams Section */}
        <h2 className={styles.sectionHeading}>Upcoming Exam</h2>
        <div className={styles.coursesFlex}>
          <ExamCard />
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;