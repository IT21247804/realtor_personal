import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Layout from "./modules/shared/components/layout";
import Login from "./pages/login";
import { useAuth } from "./hooks/auth-provider";
import SignatureProperty from "./pages/signature-property";
import AddListing from "./pages/add-listing";

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route
          path="/signature-collection/:id"
          element={<SignatureProperty />}
        />
      </Route>

      <Route
        path="/admin"
        element={user ? <Admin /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
