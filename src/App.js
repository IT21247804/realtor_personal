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
        <Route path="/about" element={< About/>} />
        <Route path ="/services" element={<Services/>} />
        <Route path ="/blogspage" element={<BlogsPage />} />
        <Route path="/browse-rentals" element={<BrowseRentals />} />
        <Route path="/explore-to-buy/:id" element={<BrowseSellProperty />} />
        <Route path="/browse-rentals/:id" element={<BrowseRentalProperty />} />

      </Route>

      <Route
        path="/dashboard/"
        // element={user ? <Dashboard /> : <Navigate to="/login" />}
        element={<Dashboard />}
      >
        {/* Nested routes inside dashboard */}
        <Route
          path="add-team"
          element={<AddTeamForm />}
        />
        <Route
          path="get-team"
          element={<TeamList />}
        />
        <Route path="manage-testimonials" element={<ManageTestimonials />} />
        <Route path="update-testimonial/:id" element={<UpdateTestimonial />} />
        
        <Route path="add-testimonials" element={<AddTestimonialsForm />} />
         <Route path="update-team/:id" element={<TeamUpdate/>} />
        <Route path="property-requests" element={<PropertyRequests />} />
        <Route path="properties" element={<Properties />} />
        <Route path="properties/:id" element={<BrowseDashboardProperty />} />
        <Route path="market" element={<Market />} />
        <Route path="users" element={<Users />} />
        <Route path="add-property" element={<AddProperty />} />
        <Route path="manage-blog" element={<ManageBlogs />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="update-blog/:id" element={<UpdateBlog />} />
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
