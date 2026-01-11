

// Header.jsx - ADD LanguageSwitcher
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../../../public/evangadi-logo.png";
import { Appstate } from "../../App";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"; // ADD THIS

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
          <Link to="/home">{t('header.home')}</Link>
          <Link to="/Howitworks">{t('header.howItWorks')}</Link>

          {/* ADD LanguageSwitcher HERE - BEFORE Logout */}
          <LanguageSwitcher />

          {isLoggedIn ? (
            <button
              className={`${classes.auth_btn} ${classes.logout}`}
              onClick={handleLogout}
            >
              {t('header.logout')}
            </button>
          ) : (
            <Link
              to="/auth/login"
              className={`${classes.auth_btn} ${classes.login}`}
            >
              {t('header.signIn')}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;