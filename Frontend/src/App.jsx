import { useEffect, useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./pages/Home-page/Home";
import api from "./Utility/axios";
import Register from "./components/Register/Register";
import HowItWorks from "./pages/Howitworks/HowItWorks";
import Layout from "./components/Layout/Layout";

export const Appstate = createContext();

function App() {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  async function checkUser() {
    try {
      const { data } = await instance.get("/user/check", {
        headers: { Authorization: "Bearer " + token },
      });
      setUser(data);
    } catch (error) {
      setUser(null);
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }
  useEffect(() => {
    if (token) checkUser();
  }, [token]);

  return (
    <Context.Provider value={{ user, setUser }}>
      {/* Protected routes like home page, question and answer pages goes below */}
      <ProtectedRoute></ProtectedRoute>

      {/* unprotected routes like Howitworks , auth/login/register pages goes below */}
    </Context.Provider>
  );
}

export default App;
