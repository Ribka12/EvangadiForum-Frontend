// import React, { createContext, useEffect } from "react";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// import instance from "./Utility/axios";

// export const Context = createContext();
// function App() {
//   const [user, setUser] = useState(null);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   async function checkUser() {
//     try {
//       const { data } = await instance.get("/user/check", {
//         headers: { Authorization: "Bearer " + token },
//       });
//       setUser(data);
//     } catch (error) {
//       setUser(null);
//       localStorage.removeItem("token");
//       if (window.location.pathname !== "/login") {
//         navigate("/login");
//       }
//     }
//   }
//   useEffect(() => {
//     if (token) checkUser();
//   }, [token]);

//   return (
//     <Context.Provider value={{ user, setUser }}>
//       {/* Protected routes like home page, question and answer pages goes below */}
//       <ProtectedRoute></ProtectedRoute>

//       {/* unprotected routes like Howitworks , auth/login/register pages goes below */}
//     </Context.Provider>
//   );
// }

// export default App;

import { useState, useEffect, createContext } from "react";
// import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "./Utility/axios.js";
// import Header from "./Component/Header/Header.jsx";
// import Footer from "./Component/Footer/Footer.jsx";
// import "./index.css";
import About from "./pages/Authpage/About.jsx";
import AuthPage from "./pages/Authpage/AuthPage.jsx";
// import Question from "./Pages/Question";
// import Answer from "./Pages/Answer";
// import HowItWorks from "./Pages/HowItWorks.jsx";
// import instance from "./Utility/axios";

export const appState = createContext();

function App() {
  const [user, setUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  async function checkUser() {
    const publicRoutes = ["/login", "/register", "/about"];
    if (publicRoutes.includes(location.pathname)) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setUser({});
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.get("/user/check", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data.user || data);
      // console.log(data);
    } catch (error) {
      // console.log(error.response);
      console.log(error.response?.data || error.message);
      localStorage.removeItem("token");
      setToken("");
      setUser({});
      navigate("/login");
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <appState.Provider value={{ user, setUser }}>
        {/* <Header /> */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route element={<AuthPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/about" element={<About />} />

          {/* <Route path="/question/:id" element={<Question />} />
          <Route path="/answer/:id" element={<Answer />} />
          <Route path="/HowItWorks" element={<HowItWorks />} /> */}
        </Routes>

        <Footer />
      </appState.Provider>
    </>
  );
}

export default App;
