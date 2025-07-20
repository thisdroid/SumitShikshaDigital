// // ✅ StudentSection.jsx
// import { Link, useNavigate } from 'react-router-dom'
// import DashboardCard from '../../../components/Admin_components/DashboardCard';
// import styles from './Admin_Student.module.css';

// const Admin_Student = () => {
//   const navigate = useNavigate();
//   const studentStats = [
//     {
//       title: "Total Registered Students",
//       count: "47",
//       action: "View all",
//       icon: "person",
//       iconColor: "blue",
//       borderColor: "#4f7cff",
//       onClick: () => navigate('/AdminDashboard/StudentManagement')
//     },
//     {
//       title: "Student Marks Without College",
//       count: "0",
//       action: "View marks",
//       icon: "visibility",
//       iconColor: "purple",
//       borderColor: "#8b5cf6",
//       onClick: () => navigate('/AdminDashboard/MarksWithoutCollege')
//     },
//     {
//       title: "College Registered Students",
//       count: "2",
//       action: "View students",
//       icon: "school",
//       iconColor: "green",
//       borderColor: "#10b981",
//       onClick: () => navigate('/AdminDashboard/CollegeRegisteredStudents')
//     },
//     {
//       title: "Student Marks With College",
//       count: "0",
//       action: "View marks",
//       icon: "visibility",
//       iconColor: "orange",
//       borderColor: "#f59e0b",
//       onClick: () => navigate('/AdminDashboard/MarksWithCollege')
//     },
//   ];

//   return (
//     <div className={styles.pageContent}>
//       <div className={styles.pageHeader}>
//         <h1 className={styles.pageTitle}>Student Dashboard</h1>
//         <p className={styles.pageSubtitle}>Manage student records and academic performance</p>
//       </div>

//       <div className={styles.statsGrid}>
//         {studentStats.map((stat, index) => (
//           <DashboardCard key={index} {...stat} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Admin_Student;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../../components/Admin_components/DashboardCard';
import styles from './Admin_Student.module.css';

const Admin_Student = () => {
  const navigate = useNavigate();
  const [studentCounts, setStudentCounts] = useState({
    total: 0,
    withCollege: 0,
    withoutCollege: 0,
    marksWithCollege: 0,
    marksWithoutCollege: 0,
  });

  useEffect(() => {
    const allStudents = JSON.parse(localStorage.getItem("students") || "[]");
    const withCollege = allStudents.filter(s => s.college);
    const withoutCollege = allStudents.filter(s => !s.college);

    // Count exams for students (optional enhancement)
    const allExams = JSON.parse(localStorage.getItem("studentExams") || "[]");

const marksWithCollege = allExams.filter(exam => {
  const student = allStudents.find(s => s.name === exam.name);
  return student?.college !== null && student?.college !== "";
}).length;

const marksWithoutCollege = allExams.filter(exam => {
  const student = allStudents.find(s => s.name === exam.name);
  return student?.college === null || student?.college === "";
}).length;



    setStudentCounts({
      total: allStudents.length,
      withCollege: withCollege.length,
      withoutCollege: withoutCollege.length,
      marksWithCollege:withCollege.length,
      marksWithoutCollege: withoutCollege.length,
    });
  }, []);

  const studentStats = [
    {
      title: "Total Registered Students",
      count: String(studentCounts.total),
      action: "View all",
      icon: "person",
      iconColor: "blue",
      borderColor: "#4f7cff",
      onClick: () => navigate('/AdminDashboard/StudentManagement')
    },
    {
      title: "Student Marks Without College",
      count: String(studentCounts.marksWithoutCollege),
      action: "View marks",
      icon: "visibility",
      iconColor: "purple",
      borderColor: "#8b5cf6",
      onClick: () => navigate('/AdminDashboard/MarksWithoutCollege')
    },
    {
      title: "College Registered Students",
      count: String(studentCounts.withCollege),
      action: "View students",
      icon: "school",
      iconColor: "green",
      borderColor: "#10b981",
      onClick: () => navigate('/AdminDashboard/CollegeRegisteredStudents')
    },
    {
      title: "Student Marks With College",
      count: String(studentCounts.marksWithCollege),
      action: "View marks",
      icon: "visibility",
      iconColor: "orange",
      borderColor: "#f59e0b",
      onClick: () => navigate('/AdminDashboard/MarksWithCollege')
    },
  ];

  return (
    <div className={styles.pageContent}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Student Dashboard</h1>
        <p className={styles.pageSubtitle}>Manage student records and academic performance</p>
      </div>

      <div className={styles.statsGrid}>
        {studentStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default Admin_Student;
