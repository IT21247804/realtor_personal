import React from "react";
import { useAuth } from "../hooks/auth-provider";

const Admin = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Admin;
