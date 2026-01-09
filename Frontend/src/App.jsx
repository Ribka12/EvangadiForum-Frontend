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
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoadingAuth(false);
        return;
      }

      try {
        const { data } = await api.get("/check");
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoadingAuth(false);
      }
    }

    checkUser();
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (loadingAuth) {
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-primary" role="status" />
        </div>
      );
    }

    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Appstate.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="Howitworks" element={<HowItWorks />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </Appstate.Provider>
  );
}

export default App;
