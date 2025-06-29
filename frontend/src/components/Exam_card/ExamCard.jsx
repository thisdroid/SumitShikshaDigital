import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './ExamCard.module.css';

const CalendarIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#2563EB"
        viewBox="0 0 24 24"
        width="18" height="18"
        aria-hidden="true"
    >
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM5 20V9h14v11H5z"></path>
    </svg>
);

const ClockIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#2563EB"
        viewBox="0 0 24 24"
        width="18" height="18"
        aria-hidden="true"
    >
        <path d="M12 20a8 8 0 1 0-8-8 8 8 0 0 0 8 8zm0-14a6 6 0 1 1-6 6 6 6 0 0 1 6-6zm.5 3v4.25l3.2 1.92.8-1.28-2.5-1.5V9z"></path>
    </svg>
);

const ShieldIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#6B7280"
        viewBox="0 0 24 24"
        width="18" height="18"
        aria-hidden="true"
    >
        <path d="M12 2l7 3v5c0 5-3.33 9.74-7 11-3.67-1.26-7-6-7-11V5l7-3z"></path>
    </svg>
);

function ExamCard({ exam }) {
    const navigate = useNavigate();
    if (!exam) return null;
    return (
        <div className={styles.card}>
            <div className={styles.cardTopBorder}></div>

            <h2 className={styles.cardTitle}>{exam.name}</h2>

            <div className={styles.cardInfo}>
                <div className={styles.cardInfoItem}>
                    <CalendarIcon />
                </div>
                <div className={styles.cardInfoText}>{exam.duration}</div>

                <div className={styles.cardInfoItem}>
                    <ClockIcon />
                </div>
                <div className={styles.cardInfoText}>{exam.duration}</div>

                <div className={`${styles.cardInfoItem} ${styles.shieldIcon}`}>
                    <ShieldIcon />
                </div>
                <div className={styles.cardInfoText}>{exam.level}</div>
            </div>

            <p className={styles.cardDescription}>{exam.description}</p>
            <div className={styles.cardActions}>
                <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    type="button"
                    onClick={() =>
                        navigate(`/StudentDashboard/Examination/${encodeURIComponent(exam.name)}`, { state: { exam } })
                    }
                >
                    <span className="material-icons" style={{ fontSize: '18px', verticalAlign: 'middle' }}>
                        visibility
                    </span>{' '}
                    View Exam
                </button>
            </div>
        </div>
    );
}

export default ExamCard;