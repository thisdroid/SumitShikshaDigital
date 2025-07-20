import React, { useEffect, useState } from 'react';
import styles from './RegisteredColleges.module.css';

const RegisteredColleges = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
    setColleges(allColleges.filter(c => c.status === "registered"));
  }, []);

  const handleDelete = (collegeName) => {
    if (window.confirm("Do you really want to delete this college?")) {
      // Remove from localStorage
      const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
      const updatedColleges = allColleges.filter(
        c => !(c.status === "registered" && c.name === collegeName)
      );
      localStorage.setItem("colleges", JSON.stringify(updatedColleges));
      // Update state
      setColleges(updatedColleges.filter(c => c.status === "registered"));
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>College Management</h1>
      <p className={styles.pageSubtitle}>View and manage all registered colleges</p>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>College Name</span>
          <span>Contact Person</span>
          <span>Contact Number</span>
          <span>Actions</span>
        </div>
        {colleges.map((college, index) => (
          <div className={styles.tableRow} key={index}>
            <span>{college.name}</span>
            <span>{college.contactPerson}</span>
            <span>{college.contactNumber}</span>
            <span>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(college.name)}
              >
                🗑 Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisteredColleges;
