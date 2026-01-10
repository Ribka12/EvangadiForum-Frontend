import React, { useContext, useState } from "react";
// import axios from 'axios'
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Appstate } from "../../App";
import styles from "./Register.module.css";
import axios from "../../Utility/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import i18n from "../../i18n";

export default function Register() {
  const navigate = useNavigate();
  // const { setToken, setUsername } = useContext(Context);
  const { setUser } = useContext(Appstate);

  const { t } = useTranslation();
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    const { email, first_name, last_name, username, password } = form;
    if (!email || !first_name || !last_name || !username || !password) {
      setError(t("errors.fillAll"));

      return;
    }
    try {
      if (password.length < 8) {
        setError(t("errors.passwordLength"));
        return;
      }
      await axios.post("/user/register", form);
      const res = await axios.post("/user/login", { email, password });
      // localStorage.setItem("token", res.data.token);
      // setUser(res.data.user || res.data);
      navigate("/auth/login");
    } catch (err) {
      console.log("REGISTER ERROR 👉", err);
      console.log("RESPONSE 👉", err.response?.data);

      setError(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2 style={{ textAlign: "center" }}>{t("signup.title")}</h2>
        <p className={styles.topText}>
          {t("signup.haveAccount")}{" "}
          <Link to="/auth/login">{t("signup.signIn")}</Link>
        </p>
        <form className={styles.form} onSubmit={submit}>
          <input
            className={styles.input}
            name="username"
            autoComplete="username"
            placeholder={t("signup.username")}
            value={form.username}
            onChange={change}
          />
          <div className={styles.row}>
            <input
              className={styles.input}
              name="first_name"
              autoComplete="given-name"
              placeholder={t("signup.firstName")}
              value={form.first_name}
              onChange={change}
            />
            <input
              className={styles.input}
              name="last_name"
              autoComplete="family-name"
              placeholder={t("signup.lastName")}
              value={form.last_name}
              onChange={change}
            />
          </div>
          <input
            className={styles.input}
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t("signup.email")}
            value={form.email}
            onChange={change}
          />
          <div className={styles.passwordWrap}>
            <input
              className={styles.input}
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder={t("signup.password")}
              value={form.password}
              onChange={change}
            />
            <span
              className={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          <p className={styles.policy}>
            I agree to the <span>privacy policy</span> and{" "}
            <span>terms of service</span>.
          </p>

          <button type="submit" className={styles.primary}>
            {t("signup.agreeJoin")}
          </button>
        </form>
      </div>
    </div>
  );
}
