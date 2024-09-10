import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Layout from "./modules/shared/components/layout";
import Login from "./pages/login";
import { useAuth } from "./hooks/auth-provider";
import SignatureProperty from "./pages/signature-property";
import AddListing from "./pages/add-listing";
import { ExploreToBuy } from "./pages/explore-to-buy";
import { BrowseRentals } from "./pages/browse-rentals";
import { BrowseProperty } from "./pages/browse-property";
import PropertyRequests from "./pages/property-requests";
import Properties from "./pages/properties";
import { BrowseDashboardProperty } from "./pages/browse-dashboard-property";
import Market from "./pages/market";
import Users from "./pages/users";
import AddProperty from "./pages/add-property";

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
        <Route path="/explore-to-buy" element={<ExploreToBuy />} />
        <Route path="/browse-rentals" element={<BrowseRentals />} />
        <Route path="/explore-to-buy/:id" element={<BrowseProperty />} />
        <Route path="/browse-rentals/:id" element={<BrowseProperty />} />
      </Route>

      <Route
        path="/dashboard/*"
        // element={user ? <Dashboard /> : <Navigate to="/login" />}
        element={<Dashboard />}
      >
        {/* Nested routes inside dashboard */}
        <Route path="property-requests" element={<PropertyRequests />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<BrowseDashboardProperty />} />
        <Route path="market" element={<Market />} />
        <Route path="users" element={<Users />} />
        <Route path="add-property" element={<AddProperty />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
