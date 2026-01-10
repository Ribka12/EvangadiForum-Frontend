import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../../../public/evangadi-logo.png";
import { Appstate } from "../../App";

const Header = () => {
  const navigate = useNavigate();
  const {user, setUser} = useContext(Appstate);
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null)
    navigate("/auth/login");
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
              LOG OUT
            </button>
          ) : (
            <Link
              to="/auth/login"
              className={`${classes.auth_btn} ${classes.login}`}
            >
              SIGN IN
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
