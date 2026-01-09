import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../../../public/evangadi-logo.png";

const Header = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className={classes.header}>
      <div className={classes.header_container}>
        {/* Logo */}
        <div className={classes.logo}>
          <Link to="/">
            <img src={logo} alt="Evangadi Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className={classes.nav}>
          <Link to="/home">Home</Link>
          <Link to="/Howitworks">How it works</Link>

          {isLoggedIn ? (
            <button
              className={`${classes.auth_btn} ${classes.logout}`}
              onClick={handleLogout}
            >
              {isLoggedIn ? "LOG OUT" : "SIGN IN"}
            </button>
          ) : (
            <Link
              to="/login"
              className={`${classes.auth_btn} ${classes.login}`}
            >
              {isLoggedIn ? "LOG OUT" : "SIGN IN"}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
