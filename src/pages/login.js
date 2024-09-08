import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-provider";
import { Button, Input } from "antd";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login({ username, password });
    navigate("/dashboard");
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/add-listing.jpeg")' }} // Replace with your background image path
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Form Container */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-80 backdrop-blur-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo-primary.png"
            alt="Logo"
            className="w-80 h-auto object-contain"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Login to Your Account
        </h2>

        {/* Form Section */}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#085585]"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#085585]"
          />
        </div>

        <div className="mt-6">
          <Button
            onClick={handleLogin}
            className="h-10 w-full py-3 bg-[#085585] text-white rounded-md hover:bg-[#272c63] transition-colors"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
