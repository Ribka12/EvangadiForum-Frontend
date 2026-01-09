import React from "react";
import classes from "./Footer.module.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../../public/evangadi-logo.png";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer_container}>
        {/* Left Section - Logo & Socials */}
        <div className={classes.footer_left}>
          <img src={logo} alt="Evangadi Logo" />
          <div className={classes.social_icons}>
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
          </div>
        </div>

        {/* Middle Section - Useful Links */}
        <div className={classes.footer_middle}>
          <h3>Useful Link</h3>
          <ul>
            <li>How it works</li>
            <li>Terms of Service</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* Right Section - Contact Info */}
        <div className={classes.footer_right}>
          <h3>Contact Info</h3>
          <ul>
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
