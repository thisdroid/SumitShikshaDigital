import React, { useEffect, useState } from 'react';
import DashboardCard from "../../components/Admin_components/DashboardCard";
import SectionHeader from "./SectionHeader";
import styles from "./AdminDashboard.module.css";
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
const AdminDashboard = () => {
  const navigate = useNavigate();

  // 👇 Safe parser that guarantees an array or fallback
  const getArray = (key) => {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  };

  const [studentCounts, setStudentCounts] = useState({ total: 0, college: 0 });
  const [collegeCount, setCollegeCount] = useState(0);
  const [courseCounts, setCourseCounts] = useState({ regular: 0, college: 0 });
  const [examCounts, setExamCounts] = useState({ regular: 0, college: 0 });
  const [questionCounts, setQuestionCounts] = useState({ regular: 0, college: 0 });
  const [messageCount, setMessageCount] = useState(0);

  useEffect(() => {
    // === Students ===
    const students = getArray("students");
    const collegeStudents = students.filter(s => s.college);
    setStudentCounts({ total: students.length, college: collegeStudents.length });

    // === Colleges ===
    const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
const registeredColleges = allColleges.filter(c => c.status === "registered");
setCollegeCount(registeredColleges.length);



    // === Courses ===
    setCourseCounts({
      regular: getArray("courses").length,
      college: getArray("collegeCourses").length,
    });

    // === Exams ===
    setExamCounts({
      regular: getArray("exams").filter(e => e.examType === "platform").length,
  college: getArray("exams").filter(e => e.examType === "college").length,
    });

    // === Contact Messages ===
    setMessageCount(getArray("contactMessages").length);
  }, []);

  // === Dashboard Cards Data ===
  const statsData = [
    {
      title: "Regular Students",
      count: String(studentCounts.total),
      action: "View all students",
      icon: "person",
      iconColor: "blue",
      borderColor: "#4f7cff",
      onClick: () => navigate('/AdminDashboard/StudentManagement')
    },
    {
      title: "College Students",
      count: String(studentCounts.college),
      action: "View college students",
      icon: "account_balance",
      iconColor: "blue",
      borderColor: "#4f7cff",
      onClick: () => navigate('/AdminDashboard/CollegeRegisteredStudents')
    },
    {
      title: "Colleges",
      count: String(collegeCount),
      action: "View colleges",
      icon: "domain",
      iconColor: "purple",
      borderColor: "#8b5cf6",
      onClick: () => navigate('/AdminDashboard/RegisteredColleges')
    },
  ];

  const courseData = [
    {
      title: "View Course",
      count: String(courseCounts.regular),
      action: "View courses",
      icon: "menu_book",
      iconColor: "cyan",
      borderColor: "#06b6d4",
      onClick: () => navigate('/AdminDashboard/CourseList')
    },
  ];

  const examData = [
    {
      title: "Regular Exams",
      count: String(examCounts.regular),
      action: "Manage exams",
      icon: "assignment",
      iconColor: "pink",
      borderColor: "#ec4899",
      onClick: () => navigate('/AdminDashboard/CourseManagement')
    },
    {
      title: "College Exams",
      count: String(examCounts.college),
      action: "View college exams",
      icon: "quiz",
      iconColor: "pink",
      borderColor: "#ec4899",
      onClick: () => navigate('/AdminDashboard/CourseManagementcollege')
    },
  ];

  const communicationData = [
    {
      title: "Contact Messages",
      count: String(messageCount),
      action: "View messages",
      icon: "chat_bubble_outline",
      iconColor: "blue",
      borderColor: "#4f7cff",
      onClick: () => navigate('/AdminDashboard/ContactManagement')
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
        <meta name="description" content="Welcome to the Admin Dashboard. Manage students, courses, exams, and communications efficiently." />
      </Helmet>
      <div className={styles.welcomeSection}>
        <h1 className={styles.pageTitle}>Admin Dashboard</h1>
        <p className={styles.pageSubtitle}>
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* === Student Stats === */}
      <div className={styles.statsGrid}>
        {statsData.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* === Courses Section === */}
      <div className={styles.section}>
        <SectionHeader icon="book" title="Courses" iconColor="cyan" />
        <div className={styles.statsGridTwo}>
          {courseData.map((item, index) => (
            <DashboardCard key={index} {...item} />
          ))}
        </div>
      </div>

      {/* === Examinations Section === */}
      <div className={styles.section}>
        <SectionHeader icon="assignment" title="Examinations" iconColor="blue" />
        <div className={styles.statsGridTwo}>
          {examData.map((exam, index) => (
            <DashboardCard key={index} {...exam} />
          ))}
        </div>
      </div>

      {/* === Communications Section === */}
      <div className={styles.section}>
        <SectionHeader icon="email" title="Communications" iconColor="blue" />
        <div className={styles.statsGridOne}>
          {communicationData.map((comm, index) => (
            <DashboardCard key={index} {...comm} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
