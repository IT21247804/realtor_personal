import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Admin from "./pages/admin";
import Layout from "./modules/shared/component/layout";
import Login from "./pages/login";
import { useAuth } from "./hooks/auth-provider";

const App = () => {
  console.log(44, "app rendering");
  const { user } = useAuth();
  console.log(11, user);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Admin Dashboard (Protected Route) */}
      <Route
        path="/admin"
        element={user ? <Admin /> : <Navigate to="/login" />}
      />

      {/* Login Route */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
