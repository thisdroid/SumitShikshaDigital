import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common_components/AdminSidebar";
import styles from "./AdminDashboardLayout.module.css"; // Reuse styles from Admin_Layout

const AdminDashboardLayout = () => {
  const [isMobileView, setIsMobileView] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  const [sidebarOpen, setSidebarOpen] = useState(!isMobileView);
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setSidebarOpen(!isMobileView);
  }, [isMobileView]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className={styles.pageContainer}>
      {isMobileView && sidebarOpen && (
        <div
          ref={overlayRef}
          className={styles.overlay}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobileView={isMobileView}
      />

      {isMobileView && (
        <button
          aria-label="Toggle sidebar"
          type="button"
          className={styles.hamburgerButton}
          onClick={toggleSidebar}
        >
          <span className="material-icons">menu</span>
        </button>
      )}

      <div className={styles.mainContent}>
        <header className={styles.mainHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.headerIcon}>
              <span className="material-icons">groups</span>
            </div>
            <span className={styles.headerTitle}>Admin Dashboard</span>
          </div>
        </header>

        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
