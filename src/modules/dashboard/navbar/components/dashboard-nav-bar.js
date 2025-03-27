import React, { useState } from "react";
import {
  AppstoreAddOutlined,
  HomeOutlined,
  MailOutlined,
  PlusCircleOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  MenuOutlined,
  CloseOutlined,
  CommentOutlined,
  FileAddOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/auth-provider"; // Make sure to import useAuth from the correct path

export const DashboardNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-white bg-[#272c63] p-2 rounded"
        >
          {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 bottom-0 h-screen w-64 bg-[#272c63] text-white transition-transform duration-300 transform z-40 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-64 md:z-auto shadow-lg overflow-y-auto`}
      >
        <div className="flex flex-col h-full">
          <div>
            <div className="p-6 border-b-[1px]">
              <img
                src="/images/logo-light.png"
                className="w-full h-auto"
                alt="Logo"
              />
            </div>

            {/* Links */}
            <div className="mt-16">
              <div className="flex items-center gap-4 mb-4 pl-6">
                <AppstoreAddOutlined className="text-2xl" />
                <p className="text-lg font-semibold">Dashboard</p>
              </div>

              <NavLink
                to="/dashboard/properties"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <HomeOutlined className="text-xl" />
                <p>Properties</p>
              </NavLink>

              <NavLink
                to="/dashboard/property-requests"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <MailOutlined className="text-xl" />
                <p>Property Requests</p>
              </NavLink>

              <NavLink
                to="/dashboard/add-property"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <PlusCircleOutlined className="text-xl" />
                <p>Add Property</p>
              </NavLink>

              <NavLink
                to="/dashboard/market"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <ShopOutlined className="text-xl" />
                <p>Market</p>
              </NavLink>
            </div>

            {/* Team Section */}
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-4 pl-6">
                <UsergroupAddOutlined className="text-2xl" />
                <p className="text-lg font-semibold">Team</p>
              </div>

              <NavLink
                to="/dashboard/get-team"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <UserOutlined className="text-xl" />
                <p>Get Team</p>
              </NavLink>

              <NavLink
                to="/dashboard/add-team"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <PlusCircleOutlined className="text-xl" />
                <p>Add Team</p>
              </NavLink>
            </div>

            {/* Users Section */}
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-4 pl-6">
                <UsergroupAddOutlined className="text-2xl" />
                <p className="text-lg font-semibold">Users</p>
              </div>

              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <UserOutlined className="text-xl" />
                <p>All Users</p>
              </NavLink>
            </div>

            {/* Testimonials Section */}
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-4 pl-6">
                <CommentOutlined className="text-2xl" />
                <p className="text-lg font-semibold">Testimonials</p>
              </div>

              <NavLink
                to="/dashboard/manage-testimonials"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <UserOutlined className="text-xl" />
                <p>Manage Testimonials</p>
              </NavLink>

              <NavLink
                to="/dashboard/add-testimonials"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <PlusCircleOutlined className="text-xl" />
                <p>Add Testimonials</p>
              </NavLink>
            </div>

            {/* Blog Section */}
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-4 pl-6">
                <FileTextOutlined className="text-2xl" />
                <p className="text-lg font-semibold">Blog</p>
              </div>

              <NavLink
                to="/dashboard/manage-blog"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <FileTextOutlined className="text-xl" />
                <p>Manage Blog</p>
              </NavLink>

              <NavLink
                to="/dashboard/create-blog"
                className={({ isActive }) =>
                  `pl-10 py-4 flex items-center gap-4 ${
                    isActive ? "bg-[#e53030]" : "hover:bg-[#e53030]"
                  } text-white transition-colors duration-300`
                }
              >
                <FileAddOutlined className="text-xl" />
                <p>Create Blog</p>
              </NavLink>
            </div>
          </div>

          {/* Logout Button at the bottom */}
          <div className="mt-auto mb-6">
            <button
              onClick={handleLogout}
              className="w-full pl-10 py-4 flex items-center gap-4 hover:bg-[#e53030] text-white transition-colors duration-300"
            >
              <LogoutOutlined className="text-xl" />
              <p>Logout</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};