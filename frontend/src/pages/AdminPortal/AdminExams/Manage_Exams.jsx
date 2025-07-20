// ✅ Manage_Exams.jsx
import ActionCard from '../../../components/Admin_components/ActionCard';
import styles from './Manage_Exams.module.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Uncomment if you want to use Helmet for SEO

const Manage_Exams = () => {
  const navigate = useNavigate();
  const examActions = [
    {
      title: "Add New Exam",
      description: "Create a new exam for your students",
      icon: "add",
      iconColor: "cyan",
      borderColor: "#06b6d4",
      onClick: () => navigate('/AdminDashboard/AddnewExams')
    },
    {
      title: "View Exams",
      description: "Manage all existing exams",
      icon: "visibility",
      iconColor: "pink",
      borderColor: "#ec4899",
      onClick : () => navigate('/AdminDashboard/CourseManagement')
    },
  ];

  return (
    <div className={styles.pageContent}>
      <Helmet>
        <title>Exam Management</title>
        <meta name="description" content="Create and manage exams for your institution" />
      </Helmet>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Exam Management</h1>
        <p className={styles.pageSubtitle}>Create and manage exams for your institution</p>
      </div>

      <div className={styles.actionsGrid}>
        {examActions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default Manage_Exams;