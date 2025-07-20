// ✅ Manage_Exams.jsx
import ActionCard from '../../../components/Admin_components/ActionCard';
import styles from './Courses.module.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Uncomment if you want to use Helmet for SEO


const Courses = () => {
  const navigate = useNavigate();
  const examActions = [
    {
      title: "Add New Course",
      description: "Create a new course for your students",
      icon: "add",
      iconColor: "cyan",
      borderColor: "#06b6d4",
      onClick: () => navigate('/AdminDashboard/AddCourse')
    },
    {
      title: "View Courses",
      description: "Manage all existing courses",
      icon: "visibility",
      iconColor: "pink",
      borderColor: "#ec4899",
      onClick : () => navigate('/AdminDashboard/CourseList')
    },
  ];

  return (
    <div className={styles.pageContent}>
      <Helmet>
        <title>Course Management</title>
        <meta name="description" content="Create and manage courses for your institution" />
      </Helmet>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Course Management</h1>
        <p className={styles.pageSubtitle}>Create and manage courses for your institution</p>
      </div>

      <div className={styles.actionsGrid}>
        {examActions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default Courses;