// import React, { useRef, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeSlash } from "react-bootstrap-icons";
// import api from "../../Utility/axios";
// import style from "./Login.module.css";

// function Login() {
//   const email = useRef(null);
//   const password = useRef(null);
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const emailValue = email.current.value.trim();
//     const passwordValue = password.current.value.trim();

//     if (!emailValue || !passwordValue) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       const { data } = await api.post("/login", {
//         email: emailValue,
//         password: passwordValue,
//       });

//       localStorage.setItem("token", data.token);
//       navigate("/home");
//     } catch (error) {
//       alert(error?.response?.data?.msg || "Login failed");
//     }
//   }

//   return (
//     <div className={style.loginContainer}>
//       <form className={style.loginForm} onSubmit={handleSubmit}>
//         <h4 className={style.loginTitle}>Login to your account</h4>

//         <div className={style.formGroup}>
//           <label>Email</label>
//           <input ref={email} type="email" placeholder="xyz@gmail.com" />
//         </div>

//         <div className={style.formGroup}>
//           <label>Password</label>
//           <div className={style.passwordWrapper}>
//             <input
//               ref={password}
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter password"
//             />
//             <button
//               type="button"
//               className={style.eyeBtn}
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeSlash /> : <Eye />}
//             </button>
//           </div>
//         </div>

//         <div className={style.forgotPassword}>
//           <Link to="/forgot-password">Forgot password?</Link>
//         </div>

//         <button type="submit" className={style.loginBtn}>
//           Login
//         </button>

//         <p className={style.registerText}>
//           No account? <Link to="/register">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import api from "../../Utility/axios";
import style from "./Login.module.css";

function Login() {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Auto-hide error after 5s
  function showError(message) {
    setErrorMsg(message);
    setTimeout(() => setErrorMsg(""), 5000);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();

    if (!emailValue && !passwordValue) {
      showError("All fields are required");
      return;
    }

    if (!emailValue) {
      showError("Email is required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      showError("Invalid email address");
      return;
    }

    if (!passwordValue) {
      showError("Password is required");
      return;
    }

    if (passwordValue.length < 6) {
      showError("Invalid password");
      return;
    }

    try {
      const { data } = await api.post("/login", {
        email: emailValue,
        password: passwordValue,
      });

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (error) {
      showError(
        error?.response?.data?.msg ||
          "User not registered or incorrect password"
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
        <h4 className={style.loginTitle}>Login to your account</h4>

        {/* SINGLE ERROR BOX */}
        {errorMsg && <div className={style.errorBox}>{errorMsg}</div>}

        <div className={style.formGroup}>
          <label>Email</label>
          <input
            ref={email}
            type="email"
            placeholder="xyz@gmail.com"
            className={errorMsg ? style.inputError : ""}
            onChange={clearError}
          />
        </div>

        <div className={style.formGroup}>
          <label>Password</label>
          <div className={style.passwordWrapper}>
            <input
              ref={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              className={errorMsg ? style.inputError : ""}
              onChange={clearError}
            />
            <button
              type="button"
              className={style.eyeBtn}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </button>
          </div>
        </div>

        <div className={style.forgotPassword}>
          <Link to="/forgot-password">Forgot password?</Link>
        </div>

        <button type="submit" className={style.loginBtn}>
          Login
        </button>

        <p className={style.registerText}>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
