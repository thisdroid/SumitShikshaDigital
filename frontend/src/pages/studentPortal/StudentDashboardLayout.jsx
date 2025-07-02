import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common_components/Sidebar";

const StudentDashboardLayout = () => (
  <>
    <Sidebar />
    <main>
      <Outlet />
    </main>
  </>
);

export default StudentDashboardLayout;
