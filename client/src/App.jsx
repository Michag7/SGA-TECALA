import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Home } from "./pages/Home";
import { RoutesAdministrador } from "./routes/RoutesAdministrador";
import { getUser, isAuthenticated } from "../src/auth/auth";
import { RoutesEstudiante } from "./routes/RoutesEstudiante";
import { RoutesDocente } from "./routes/RoutesDocente";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [pathHome, SetPathHome] = useState("/login");

  const estado = isAuthenticated();
  const user = getUser();

  const Redirect = () => {
    if (!!estado) {
      if (user.rol == "administrador") {
        SetPathHome("/admin/home");
      }

      if (user.rol == "docente") {
        SetPathHome("/docente/home");
      }
    }
  };

  useEffect(() => {
    Redirect();
  }, []);

 
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />

          <Route path="/login" element={<Login />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                isAllowed={!!estado && user.rol.includes("administrador")}
              >
                <RoutesAdministrador />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path="/docente/*"
            element={
              <ProtectedRoute
                isAllowed={!!estado && user.rol.includes("docente")}
              >
                <RoutesDocente />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
