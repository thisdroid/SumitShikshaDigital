// ✅ ManageCollegeQuestions.jsx
import { useNavigate } from 'react-router-dom';
import ActionCard from '../../../components/Admin_components/ActionCard';
import styles from './ManageCollegeQuestions.module.css';
import { Helmet } from 'react-helmet-async'; // Use Helmet for SEO
const ManageCollegeQuestions = () => {
  const navigate = useNavigate(); 
  const collegeQuestionActions = [
    {
      title: "Add College Question",
      description: "Create new questions for college exams",
      icon: "add",
      iconColor: "cyan",
      borderColor: "#06b6d4",
      onClick: () => navigate("/AdminDashboard/AddCollegeQuestions"),
    },
    {
      title: "View College Questions",
      description: "Manage all existing college exam questions",
      icon: "visibility",
      iconColor: "pink",
      borderColor: "#ec4899",
      onClick: () => navigate('/AdminDashboard/ViewCollegeQuestions'),
    },
  ];

  return (
    <div className={styles.pageContent}>
      <Helmet>
        <title>College Question Management</title>
        <meta name="description" content="Create and manage college exam questions" />
      </Helmet>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>College Question Management</h1>
        <p className={styles.pageSubtitle}>Create and manage college exam questions</p>
      </div>

      <div className={styles.actionsGrid}>
        {collegeQuestionActions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default ManageCollegeQuestions;
