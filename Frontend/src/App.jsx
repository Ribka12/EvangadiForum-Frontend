import React, { createContext, useEffect } from "react";
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import instance from "./Utility/axios";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import QuestionAnswer from "./pages/Answer-page/QuestionAnswer";

export const Context = createContext();
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
      <Routes>
        <Route
          path="/question/:question_id"
          element={
            // <ProtectedRoute>
              <QuestionAnswer />
          //   {/* </ProtectedRoute> */}
          }
        />
      </Routes>
      {/* <ProtectedRoute></ProtectedRoute> */}

      {/* unprotected routes like Howitworks , auth/login/register pages goes below */}
    </Context.Provider>
  );
}

export default App;
