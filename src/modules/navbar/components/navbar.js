import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/auth-provider";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {user ? (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
