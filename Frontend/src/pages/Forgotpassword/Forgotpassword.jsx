import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ForgotPassword.module.css";

function Forgotpassword() {
  const emailRef = useRef(null);
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setMessage("If this email exists, a reset link has been sent.");
  }

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        {/* Back to login */}
        <Link to="/auth/login" className={styles.backLink}>
          ← Back to login
        </Link>

        <h3 className={styles.title}>Forgot password?</h3>
        <p className={styles.subtitle}>
          Enter your email and we’ll send you a reset link.
        </p>

        {message && <div className={styles.message}>{message}</div>}

        <input
          ref={emailRef}
          type="email"
          placeholder="Email address"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Send reset link
        </button>
      </form>
    </div>
  );
}

export default Forgotpassword;
