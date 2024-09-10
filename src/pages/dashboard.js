import React from "react";
import { Outlet } from "react-router-dom";
import { DashboardNavBar } from "../modules/dashboard/navbar/components/dashboard-nav-bar";

const Dashboard = () => {
  return (
    <div className="dashboard flex">
      <div className="fixed z-40">
        <DashboardNavBar />
      </div>
      <div className="content flex-1 p-6 ml-0 md:ml-64">
        {/* Nested routes will render here */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
