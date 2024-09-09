import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavBar } from "../modules/dashboard/navbar/components/dashboard-nav-bar";

const Dashboard = () => {
  return (
    <div className="dashboard flex">
      <DashboardNavBar />
      <div className="content flex-1 p-6">
        {/* Nested routes will render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
