import React, { useState } from 'react';
import Sidebar from '../../components/common_components/Sidebar';
import styles from './Examination.module.css';
import ExamCard from '../../components/exam_card/ExamCard';

const upcomingExams = [
    {
        name: 'React Basics',
        duration: 60,
        description: 'Comprehensive assessment covering all key concepts from React curriculum. Includes multiple choice, short answer, and practical questions.',
    },
    {
        name: 'Python Fundamentals',
        duration: 90,
        description: 'Test your understanding of Python basics, syntax, and problem-solving skills.',
    },
];

const availableExams = [
    {
        name: 'Data Science Essentials',
        duration: 120,
        description: 'Covers statistics, data analysis, and machine learning basics.',
    },
    {
        name: 'Cyber Security Basics',
        duration: 75,
        description: 'Covers security principles, threats, and best practices.',
    },
];

const Examination = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [search, setSearch] = useState('');

    const filteredAvailable = availableExams.filter(exam =>
        exam.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Sidebar />
            <div className={styles.examinationWrapper}>
                <div className={`${styles.headerBackground} ${styles.theme}`}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>Examination</h1>
                    </div>
                </div>

                <div className={styles.tabs}>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'upcoming' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('upcoming')}
                    >
                        Upcoming Exams
                    </button>
                    <button
                        className={`${styles.tabBtn} ${activeTab === 'available' ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab('available')}
                    >
                        Available Exams
                    </button>
                </div>

                <div className={styles.divider} />

                {activeTab === 'upcoming' && (
                    <div>
                        <h2 className={styles.sectionHeading}>Upcoming Exams</h2>
                        <div className={styles.examsFlex}>
                            {upcomingExams.map((exam, idx) => (
                                <ExamCard key={idx} exam={exam} />
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'available' && (
                    <div>
                        <div className={styles.searchBarWrapper}>
                            <input
                                type="text"
                                className={styles.searchBar}
                                placeholder="Search exams by name..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <h2 className={styles.sectionHeading}>Available Exams</h2>
                        <div className={styles.examsFlex}>
                            {filteredAvailable.length > 0 ? (
                                filteredAvailable.map((exam, idx) => (
                                    <ExamCard key={idx} exam={exam} />
                                ))
                            ) : (
                                <div className={styles.noExams}>No exams found.</div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Examination;