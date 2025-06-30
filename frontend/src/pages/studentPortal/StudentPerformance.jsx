import styles from "./StudentPerformance.module.css";

const StudentPerformance = () => {
  return (
    <>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={`${styles.headerBackground} ${styles.theme}`}>
          <div className={styles.header}>
            <h1 className={styles.title}>Performance</h1>
          </div>
        </div>

        {/* Filter Section */}
        <div className={styles.filterSection}>
          <div className={styles.filterContainer}>
            <span className={styles.filterLabel}>🔽 Filter by Course:</span>
            <select className={styles.filterDropdown}>
              <option>All Courses</option>
            </select>
            <button className={styles.applyButton}>🔄 Apply Filter</button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className={styles.metricsContainer}>
          <div className={styles.metricCard}>
            <div className={styles.cardTopBorder}></div>
            <div className={styles.cardContent}>
              <div className={styles.metricNumber}>0</div>
              <div className={styles.metricLabel}>Total Marks Obtained</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.cardTopBorder}></div>
            <div className={styles.cardContent}>
              <div className={styles.metricNumber}>0</div>
              <div className={styles.metricLabel}>Average Score</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.cardTopBorder}></div>
            <div className={styles.cardContent}>
              <div className={styles.metricNumber}>0</div>
              <div className={styles.metricLabel}>Highest Score</div>
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.cardTopBorder}></div>
            <div className={styles.cardContent}>
              <div className={styles.metricNumber}>0</div>
              <div className={styles.metricLabel}>Courses Taken</div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className={styles.tableContainer}>
          <table className={styles.dataTable}>
            <thead>
              <tr>
                <th>Course</th>
                <th>Attempts</th>
                <th>Highest Marks</th>
                <th>Total Marks</th>
                <th>Obtained Marks</th>
                <th>Performance</th>
              </tr>
            </thead>
          </table>
          <div className={styles.noDataMessage}>No performance data available for the selected filter.</div>
        </div>

        {/* Chart Section */}
        <div className={styles.chartSection}>
          <h2 className={styles.chartTitle}>Course Performance Distribution</h2>
          <div className={styles.chartContainer}>
            <div className={styles.noChartMessage}>No data available to generate the chart for the selected course.</div>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.socialIcons}>
            <span className={styles.socialIcon}>f</span>
            <span className={styles.socialIcon}>🐦</span>
            <span className={styles.socialIcon}>📷</span>
            <span className={styles.socialIcon}>in</span>
          </div>
          <div className={styles.copyright}>Copyright © Aarti Multi Services Pvt Ltd 2024</div>
        </div>
      </div>
    </>
  );
};

export default StudentPerformance;
