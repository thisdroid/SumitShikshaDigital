import React from "react";
import { Outlet } from "react-router-dom";
import CollegeSidebar from "../../components/common_components/CollegeSidebar";

const StudentDashboardLayout = () => (
  <>
    <CollegeSidebar />
    <main>
      <Outlet />
    </main>
  </>
);

export default StudentDashboardLayout;
