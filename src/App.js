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
import { BrowseRentalProperty } from "./pages/browse-rental-property";
import { BrowseSellProperty } from "./pages/browse-sell-property";
import PropertyRequests from "./pages/property-requests";
import Properties from "./pages/properties";
import { BrowseDashboardProperty } from "./pages/browse-dashboard-property";
import Market from "./pages/market";
import Users from "./pages/users";
import AddProperty from "./pages/add-property";
import About from "./pages/about";
import Services from "./pages/Services";
import {AddTeamForm} from "./pages/add-team";
import {TeamList} from "./pages/get-team";
import {TeamUpdate} from "./pages/team-update";
import {AddTestimonialsForm} from "./pages/add-testimonials";
import {ManageTestimonials} from "./pages/ManageTestimonials";
import {UpdateTestimonial} from "./pages/UpdateTestimonial";
import { CreateBlog } from "./pages/CreateBlog";
import { ManageBlogs } from "./pages/ManageBlogs";
import { UpdateBlog } from "./pages/UpdateBlog";
import { BlogsPage } from "./pages/BlogsPage";
import { BlogPost } from "./pages/BlogPost";
import { UpdateProperty } from "./pages/UpdateProperty";

const App = () => {
  const { user } = useAuth();

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/add-listing" element={<AddListing />} />
        <Route path="/signature-collection/:id" element={<SignatureProperty />} />
        <Route path="/explore-to-buy" element={<ExploreToBuy />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blogspage" element={<BlogsPage />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/browse-rentals" element={<BrowseRentals />} />
        <Route path="/explore-to-buy/:id" element={<BrowseSellProperty />} />
        <Route path="/browse-rentals/:id" element={<BrowseRentalProperty />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route path="add-team" element={<AddTeamForm />} />
        <Route path="get-team" element={<TeamList />} />
        <Route path="manage-testimonials" element={<ManageTestimonials />} />
        <Route path="update-testimonial/:id" element={<UpdateTestimonial />} />
        <Route path="add-testimonials" element={<AddTestimonialsForm />} />
        <Route path="update-team/:id" element={<TeamUpdate />} />
        <Route path="property-requests" element={<PropertyRequests />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<BrowseDashboardProperty />} />
        <Route path="market" element={<Market />} />
        <Route path="users" element={<Users />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="manage-blog" element={<ManageBlogs />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="update-blog/:id" element={<UpdateBlog />} />
        <Route path="update-property/:id" element={<UpdateProperty />} />
      </Route>

      {/* Login Route with Redirect if Already Authenticated */}
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard/properties" /> : <Login />} 
      />

      {/* Catch All Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;