"use client"

import { useSelector, useDispatch } from 'react-redux';
import styles from "./CollegeStudents.module.css";
import CollegeSidebar from "../../components/common_components/CollegeSidebar";
import Header from "./CollegeHeader/CollegeHeaderFile"
import { setView, acceptRequest, rejectRequest } from '../../slices/collegeStudentsUiSlice';

const CollegeStudents = () => {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.collegeStudentsUi.view);
  const students = useSelector((state) => state.collegeStudentsUi.students);
  const requests = useSelector((state) => state.collegeStudentsUi.requests);

  const handleAccept = (id) => {
    dispatch(acceptRequest(id));
  };

  const handleReject = (id) => {
    dispatch(rejectRequest(id));
  };

  const calculateAverage = (marks) => {
    return marks.reduce((acc, exam) => acc + exam.marks, 0) / marks.length;
  };

  const calculateGrade = (marks) => {
    const average = calculateAverage(marks);
    if (average >= 80) return "A";
    if (average >= 60) return "B";
    return "C";
  };

  return (
    <div className={styles.dashboardContainer}>
      <CollegeSidebar />

      <div className={styles.mainContent}>
        <Header/>

        <div className={styles.toggleButtons}>
          <button onClick={() => dispatch(setView("activities"))} className={view === "activities" ? styles.activeButton : ""}>
            Activities
          </button>
          <button onClick={() => dispatch(setView("requests"))} className={view === "requests" ? styles.activeButton : ""}>
            Requests
          </button>
        </div>

        <div className={styles.contentWrapper}>
          {view === "activities" && (
            <div className={styles.activitiesSection}>
              <h2>Activities</h2>
              {students.map(student => (
                <div key={student.id} className={styles.studentCard}>
                  <div className={styles.studentHeader}>
                    <h3>{student.name}</h3>
                    <div className={styles.studentDetails}>
                      <p>Class: {student.class}</p>
                      <p>Roll No: {student.rollNo}</p>
                    </div>
                  </div>
                  <div className={styles.exams}>
                    {student.exams.map((exam, index) => (
                      <div key={index} className={styles.exam}>
                        <p>{exam.name}</p>
                        <p>{exam.marks}</p>
                      </div>
                    ))}
                  </div>
                  <div className={styles.studentPerformance}>
                    <p>Average Marks: <span>{calculateAverage(student.exams).toFixed(2)}</span></p>
                    <p>Overall Performance: <span className={styles.grade}>{calculateGrade(student.exams)}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {view === "requests" && (
            <div className={styles.requestsSection}>
              <h2>Requests</h2>
              {requests.map(request => (
                <div key={request.id} className={styles.requestCard}>
                  <div className={styles.requestText}>
                    <div className={styles.requestName}>{request.name}</div>
                  </div>
                  <div className={styles.acceptRejectPart}>
                    <button onClick={() => handleAccept(request.id)}>Accept</button>
                    <button onClick={() => handleReject(request.id)}>Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeStudents;
