// ✅ ManageQuestions.jsx
import { useNavigate } from 'react-router-dom';
import ActionCard from '../../../components/Admin_components/ActionCard';
import styles from './ManageQuestions.module.css';
import { Helmet } from 'react-helmet-async'; // Use Helmet for SEO
const ManageQuestions = () => {
  const questionActions = [
    {
      title: "Add New Question",
      description: "Create new questions for your exams",
      icon: "add",
      iconColor: "cyan",
      borderColor: "#06b6d4",
      onClick: () => navigate("/AdminDashboard/AddnewQuestions"),
    },
    {
      title: "View Questions",
      description: "Manage all existing exam questions",
      icon: "visibility",
      iconColor: "pink",
      borderColor: "#ec4899",
      onClick: () => navigate('/AdminDashboard/QuestionBank'),
    },
  ];

  const navigate = useNavigate();

  return (
    <div className={styles.pageContent}>
      <Helmet>
        <title>Question Management</title>
        <meta name="description" content="Create and manage exam questions" />
      </Helmet>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Question Management</h1>
        <p className={styles.pageSubtitle}>Create and manage exam questions</p>
      </div>

      <div className={styles.actionsGrid}>
        {questionActions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </div>
    </div>
  );
};

export default ManageQuestions