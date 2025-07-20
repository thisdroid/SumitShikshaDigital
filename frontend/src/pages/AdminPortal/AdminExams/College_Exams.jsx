// ✅ ManageCollegeExams.jsx
import { useNavigate } from 'react-router-dom';
import ActionCard from '../../../components/Admin_components/ActionCard';
import styles from './College_Exams.module.css';

import { Helmet } from 'react-helmet-async'; // Uncomment if you want to use Helmet for SEO
const ManageCollegeExams = () => {
  const navigate = useNavigate();
  const collegeExamActions = [
    {
      title: "Add New College Exam",
      description: "Create a new exam for college students",
      icon: "add",
      iconColor: "blue",
      borderColor: "#4f7cff",
      onClick: () => navigate('/AdminDashboard/AddnewExamsCollege')
    },
    {
      title: "View College Exams",
      description: "Manage all existing college exams",
      icon: "visibility",
      iconColor: "purple",
      borderColor: "#8b5cf6",
      onClick : () => navigate('/AdminDashboard/CourseManagementcollege')
    },
  ];

  return (
    <div className={styles.pageContent}>
      <Helmet>
        <title>College Exam Management</title>
        <meta name="description" content="Create and manage exams for college students" />
      </Helmet>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>College Exam Management</h1>
        <p className={styles.pageSubtitle}>Create and manage exams for college students</p>
      </div>

      <div className={styles.actionsGrid}>
        {collegeExamActions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default ManageCollegeExams;