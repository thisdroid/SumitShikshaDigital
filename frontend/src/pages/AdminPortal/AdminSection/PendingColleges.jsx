// import React, { useEffect, useState } from 'react';
// import styles from './PendingColleges.module.css';

// const PendingColleges = () => {
//   const [colleges, setColleges] = useState([]);

//   useEffect(() => {
//     const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
//     setColleges(allColleges.filter(c => c.status === "pending"));
//   }, []);

//   const handleDelete = (collegeName) => {
//     if (window.confirm("Do you really want to delete this college?")) {
//       const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
//       const updatedColleges = allColleges.filter(
//         c => !(c.status === "pending" && c.name === collegeName)
//       );
//       localStorage.setItem("colleges", JSON.stringify(updatedColleges));
//       setColleges(updatedColleges.filter(c => c.status === "pending"));
//     }
//   };

//   const handleApprove = (collegeName) => {
//     if (window.confirm("Approve this college?")) {
//       const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
//       const updatedColleges = allColleges.map(c =>
//         c.status === "pending" && c.name === collegeName
//           ? { ...c, status: "registered" }
//           : c
//       );
//       localStorage.setItem("colleges", JSON.stringify(updatedColleges));
//       setColleges(updatedColleges.filter(c => c.status === "pending"));
//     }
//   };

//   return (
//     <div className={styles.pageContainer}>
//       <h1 className={styles.pageTitle}>Pending Colleges</h1>
//       <p className={styles.pageSubtitle}>Review and approve college applications</p>

//       <div className={styles.tableContainer}>
//         <div className={styles.tableHeader}>
//           <span>College Name</span>
//           <span>Contact Person</span>
//           <span>Contact Number</span>
//           <span>Actions</span>
//         </div>
//         {colleges.map((college, index) => (
//           <div className={styles.tableRow} key={index}>
//             <span>{college.name}</span>
//             <span>{college.contactPerson}</span>
//             <span>{college.contactNumber}</span>
//             <span>
//               <button
//                 className={styles.approveBtn}
//                 onClick={() => handleApprove(college.name)}
//               >✔ Approve</button>
//               <button
//                 className={styles.rejectBtn}
//                 onClick={() => handleDelete(college.name)}
//               >✖ Reject</button>
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // export default PendingColleges;
// import React, { useEffect, useState } from 'react';
// import styles from './PendingColleges.module.css';

// const PendingColleges = () => {
//   const [colleges, setColleges] = useState([]);

//   useEffect(() => {
//     const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
//     setColleges(allColleges.filter(c => c.status === "pending"));
//   }, []);

//   const handleDelete = (collegeName) => {
//     if (window.confirm("Do you really want to delete this college?")) {
//       const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
//       const updatedColleges = allColleges.filter(
//         c => !(c.status === "pending" && c.name === collegeName)
//       );
//       localStorage.setItem("colleges", JSON.stringify(updatedColleges));
//       setColleges(updatedColleges.filter(c => c.status === "pending"));
//     }
//   };

//   const handleApprove = (collegeName) => {
//     if (window.confirm("Approve this college?")) {
//       const codeCreditsInput = window.prompt("Enter number of code credits to give this college:", "3");
//       const codeCredits = parseInt(codeCreditsInput, 10);

//       if (isNaN(codeCredits) || codeCredits <= 0) {
//         alert("Invalid number of credits. Approval cancelled.");
//         return;
//       }

//       const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
//       const updatedColleges = allColleges.map(c =>
//         c.status === "pending" && c.name === collegeName
//           ? {
//               ...c,
//               status: "registered",
//               codeCredits: codeCredits,
//               codesUsed: 0,
//               remainingCredits: codeCredits
//             }
//           : c
//       );

//       localStorage.setItem("colleges", JSON.stringify(updatedColleges));
//       setColleges(updatedColleges.filter(c => c.status === "pending"));
//     }
//   };

//   return (
//     <div className={styles.pageContainer}>
//       <h1 className={styles.pageTitle}>Pending Colleges</h1>
//       <p className={styles.pageSubtitle}>Review and approve college applications</p>

//       <div className={styles.tableContainer}>
//         <div className={styles.tableHeader}>
//           <span>College Name</span>
//           <span>Contact Person</span>
//           <span>Contact Number</span>
//           <span>Actions</span>
//         </div>
//         {colleges.map((college, index) => (
//           <div className={styles.tableRow} key={index}>
//             <span>{college.name}</span>
//             <span>{college.contactPerson}</span>
//             <span>{college.contactNumber}</span>
//             <span>
//               <button
//                 className={styles.approveBtn}
//                 onClick={() => handleApprove(college.name)}
//               >✔ Approve</button>
//               <button
//                 className={styles.rejectBtn}
//                 onClick={() => handleDelete(college.name)}
//               >✖ Reject</button>
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PendingColleges;





// src/PendingColleges.js
import React, { useEffect, useState } from 'react';
import styles from './PendingColleges.module.css';

const PendingColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [codeCredits, setCodeCredits] = useState('');

  useEffect(() => {
    const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
    setColleges(allColleges.filter(c => c.status === "pending"));
  }, []);

  const handleDelete = (collegeName) => {
    if (window.confirm("Do you really want to delete this college?")) {
      const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
      const updatedColleges = allColleges.filter(
        c => !(c.status === "pending" && c.name === collegeName)
      );
      localStorage.setItem("colleges", JSON.stringify(updatedColleges));
      setColleges(updatedColleges.filter(c => c.status === "pending"));
    }
  };

  const openModal = (college) => {
    setSelectedCollege(college);
    setShowModal(true);
    setCodeCredits('');
  };

  const confirmApproval = () => {
    const credits = parseInt(codeCredits, 10);
    if (isNaN(credits) || credits <= 0) {
      alert("Please enter a valid number greater than 0");
      return;
    }

    const allColleges = JSON.parse(localStorage.getItem("colleges") || "[]");
    const updatedColleges = allColleges.map(c =>
      c.status === "pending" && c.name === selectedCollege.name
        ? {
            ...c,
            status: "registered",
            codeCredits: credits,
            codesUsed: 0,
            remainingCredits: credits
          }
        : c
    );

    localStorage.setItem("colleges", JSON.stringify(updatedColleges));
    setColleges(updatedColleges.filter(c => c.status === "pending"));
    setShowModal(false);
  };

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Pending Colleges</h1>
      <p className={styles.pageSubtitle}>Review and approve college applications</p>

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
                className={styles.approveBtn}
                onClick={() => openModal(college)}
              >✔ Approve</button>
              <button
                className={styles.rejectBtn}
                onClick={() => handleDelete(college.name)}
              >✖ Reject</button>
            </span>
          </div>
        ))}
      </div>

      {/* Modal for credit input */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2>Assign Code Credits</h2>
            <p>Enter number of exams this college can create:</p>
            <input
              type="number"
              value={codeCredits}
              onChange={(e) => setCodeCredits(e.target.value)}
              className={styles.modalInput}
              min={1}
            />
            <div className={styles.modalButtons}>
              <button className={styles.confirmBtn} onClick={confirmApproval}>Confirm</button>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingColleges;
