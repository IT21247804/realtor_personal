import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth-provider";
import { Button, Input, message } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      message.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_MYSQL_ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        login(data.user);
        message.success("Login successful!");
        navigate("/dashboard/properties");
      } else {
        message.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/images/add-listing.jpeg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-80 backdrop-blur-md">
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

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#085585]"
            disabled={loading}
          />
          
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="h-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#085585]"
            disabled={loading}
          />

          <div className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="h-10 w-full py-3 bg-[#085585] text-white rounded-md hover:bg-[#272c63] transition-colors"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Having trouble logging in? Contact your administrator
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;