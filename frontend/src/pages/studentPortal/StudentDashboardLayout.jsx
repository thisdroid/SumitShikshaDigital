import React from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Sidebar from "../../components/common_components/Sidebar";

const StudentDashboardLayout = () => {
  const location = useLocation();
  // Hide sidebar on exam test or results page
  const hideSidebar =
    matchPath(
      "/StudentDashboard/Examination/:examName/test",
      location.pathname
    ) ||
    matchPath(
      "/StudentDashboard/Examination/:examName/results",
      location.pathname
    );
  return (
    <>
      {!hideSidebar && <Sidebar />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default StudentDashboardLayout;
