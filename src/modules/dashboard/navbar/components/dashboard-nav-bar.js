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
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export const DashboardNavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 right-4 z-50 md:hidden h-screen">
        <button
          onClick={toggleMobileMenu}
          className="text-white bg-[#272c63] p-2 rounded"
        >
          {isMobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 h-screen w-64 shadow bg-[#272c63] text-white transition-transform duration-300 transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative  md:w-64`}
      >
        <div className="p-6 border-b-[1px]">
          <img
            src="/images/logo-light.png"
            className="w-full h-auto"
            alt="Logo"
          />
        </div>
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
      </div>
    </div>
  );
};
