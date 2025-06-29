import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/common_components/Sidebar";
import Profile from "./Profile_icon/Profile";

const StudentDashboardLayout = () => (
  <>
    <Sidebar />
    <Profile />
    <main>
      <Outlet />
    </main>
  </>
);

export default StudentDashboardLayout;
