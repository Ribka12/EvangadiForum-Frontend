
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import api from "../../Utility/axios";
import style from "./Login.module.css";
import { Appstate } from "../../App";
// Import i18n translation hook for multi-language support
import { useTranslation } from "react-i18next";

function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(Appstate);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // Get translation function for language-specific text
  const { t } = useTranslation();

  // Auto-hide error after 5s
  function showError(message) {
    setErrorMsg(message);
    setTimeout(() => setErrorMsg(""), 5000);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();

    // Check if both fields are empty
    if (!emailValue && !passwordValue) {
      // Previously: "All fields are required" (hardcoded)
      // Now: Uses translation from errors.fillAll key
      showError(t("errors.fillAll"));
      return;
    }

    // Check if email is empty
    if (!emailValue) {
      // Previously: "Email is required" (hardcoded)
      // Now: Uses translation from errors.emailRequired key
      showError(t("errors.emailRequired"));
      return;
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      // Previously: "Invalid email address" (hardcoded)
      // Now: Uses translation from errors.invalidEmail key
      showError(t("errors.invalidEmail"));
      return;
    }

    // Check if password is empty
    if (!passwordValue) {
      // Previously: "Password is required" (hardcoded)
      // Now: Uses translation from errors.passwordRequired key
      showError(t("errors.passwordRequired"));
      return;
    }

    // Validate password length
    if (passwordValue.length < 6) {
      // Previously: "Invalid password" (hardcoded)
      // Now: Uses translation from errors.passwordLength key
      showError(t("errors.passwordLength"));
      return;
    }

    try {
      const { data } = await api.post("/user/login", {
        email: emailValue,
        password: passwordValue,
      });

      localStorage.setItem("token", data.token);
      setUser(data);
      navigate("/home");
    } catch (error) {
      // Previously: "User not registered or incorrect password" (hardcoded)
      // Now: Uses translation from errors.invalidCredentials key
      showError(
        error?.response?.data?.msg ||
          t("errors.invalidCredentials")
      );
    }
  }

  // Clear error while typing
  function clearError() {
    if (errorMsg) setErrorMsg("");
  }

  return (
    <div className={style.loginContainer}>
      <form className={style.loginForm} onSubmit={handleSubmit}>
        {/* Title: Previously hardcoded, now uses translation */}
        <h4 className={style.loginTitle}>{t("login.title")}</h4>

        {/* SINGLE ERROR BOX */}
        {errorMsg && <div className={style.errorBox}>{errorMsg}</div>}

        <div className={style.formGroup}>
          {/* Email label: Previously hardcoded, now uses translation */}
          <label>{t("login.email")}</label>
          <input
            ref={email}
            type="email"
            // Email placeholder: Previously hardcoded, now uses translation
            placeholder={t("login.emailPlaceholder")}
            className={errorMsg ? style.inputError : ""}
            onChange={clearError}
          />
        </div>

        <div className={style.formGroup}>
          {/* Password label: Previously hardcoded, now uses translation */}
          <label>{t("login.password")}</label>
          <div className={style.passwordWrapper}>
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              // Password placeholder: Previously hardcoded, now uses translation
              placeholder={t("login.passwordPlaceholder")}
              className={errorMsg ? style.inputError : ""}
              onChange={clearError}
            />
            <button
              type="button"
              className={style.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye /> : <EyeSlash />}
            </button>
          </div>
        </div>

        <div className={style.forgotPassword}>
          {/* Forgot password link: Previously hardcoded, now uses translation */}
          <Link to="/auth/forgotpassword">{t("login.forgotPassword")}</Link>
        </div>

        {/* Login button: Previously hardcoded, now uses translation */}
        <button type="submit" className={style.loginBtn}>
          {t("login.submit")}
        </button>

        <p className={style.registerText}>
          {/* "No account?" text: Previously hardcoded, now uses translation */}
          {t("login.noAccount")}{" "}
          <Link to="/auth/register">
            {/* "Register" link: Previously hardcoded, now uses translation */}
            {t("login.createAccount")}
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;