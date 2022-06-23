import React, { useState, useContext } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

import { Auth } from "../context/AuthContext";

function Navbar() {
  const context = useContext(Auth);
  console.log(context.state.data, "first in Navbar");
  const [isAuthenticated, setIsAuthenticated] = useState(
    context.state.isAuthenticated
  );
  const navigate = useNavigate();

  const login = () => {
    context.dispatch({ type: "LOGIN" });
    setIsAuthenticated(true);
  };

  const logout = () => {
    context.dispatch({ type: "LOG_OUT" });
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="navbar">
      {console.log("RENDERED")}
      <div className="navbar-btn-container">
        <div className="navbar-left-btns-container">
          <NavLink to="/">
            <div className="navbar-btn">Home</div>
          </NavLink>
          {isAuthenticated ? (
            <NavLink to="/popular">
              <div className="navbar-btn">Popular</div>
            </NavLink>
          ) : (
            <div className="btn-disabled">Popular</div>
          )}
        </div>

        {isAuthenticated ? (
          <div onClick={() => logout()} className="navbar-btn">
            Logout
          </div>
        ) : (
          <div onClick={() => login()} className="navbar-btn">
            Login
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
