// ✅ CollegeSection.jsx
import { useEffect, useState } from 'react';
import DashboardCard from '../../../components/Admin_components/DashboardCard';
import styles from './Admin_College.module.css';
import { Helmet } from 'react-helmet-async'; // Use Helmet for SEO
import { useNavigate } from 'react-router-dom';

const Admin_College = () => {
  const navigate = useNavigate();
  const [registeredCount, setRegisteredCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const colleges = JSON.parse(localStorage.getItem("colleges") || "[]");
    setRegisteredCount(colleges.filter(c => c.status === "registered").length);
    setPendingCount(colleges.filter(c => c.status === "pending").length);
  }, []);

  const collegeStats = [
    {
      title: "Registered Colleges",
      count: registeredCount,
      action: "View all",
      icon: "account_balance",
      iconColor: "blue",
      borderColor: "#4f7cff",
      onClick : () => navigate('/AdminDashboard/RegisteredColleges')
    },
    {
      title: "Pending Colleges",
      count: pendingCount,
      action: "Review requests",
      icon: "pending",
      iconColor: "orange",
      borderColor: "#f59e0b",
      onClick : () => navigate('/AdminDashboard/PendingColleges')
    },
  ];

  return (
    <div className={styles.pageContent} >
      <Helmet>
        <title>College Dashboard</title>
        <meta name="description" content="Manage college registrations and approvals" />
      </Helmet>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>College Dashboard</h1>
        <p className={styles.pageSubtitle}>Manage college registrations and approvals</p>
      </div>
      <div className={styles.statsGrid}>
        {collegeStats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

// Example: Add some mock colleges
localStorage.setItem("colleges", JSON.stringify([
  {
    name: "St. Vincent Pallotti College of Engineering and Technology",
    contactPerson: "Mohit Narnaware",
    contactNumber: "9359463350",
    status: "pending"
  },
  {
    name: "St. Vincent Pallotti",
    contactPerson: "aditya bhujade",
    contactNumber: "08956548357",
    status: "registered"
  }
]));

export default Admin_College;
