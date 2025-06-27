import React from "react";
import { Outlet } from "react-router-dom";

const StudentDashboardLayout = () => (
  <>
    <main>
      <Outlet />
    </main>
  </>
);

export default StudentDashboardLayout;
