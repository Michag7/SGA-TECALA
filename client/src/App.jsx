import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Login } from "./auth/Login";
import { Home } from "./pages/Home";
import { RoutesAdministrador } from "./routes/RoutesAdministrador";
import { RegistroDocente } from "./views/administrador/RegistroDocente";
import { isAuthenticated } from "../src/auth/auth";
import { RoutesEstudiante } from "./routes/RoutesEstudiante";
import { RoutesDocente } from "./routes/RoutesDocente";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Navigate to="/login" replace={true} />
      )
    }
  />
);

const AdminWrapper = () => {
  // Se verifica si el usuario ha iniciado sesión

  // Se comprueba el estado de autenticación antes de renderizar la ruta privada
  return isAuthenticated ? (
    // Si el usuario está autenticado, muestra el contenido de las rutas de administrador
    <>
      <RoutesAdministrador></RoutesAdministrador>
    </>
  ) : (
    // Si el usuario no está autenticado, redirige al inicio de sesión
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

const Inventarios = () => <RegistroDocente />;

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>} />

          <Route path="/login" element={<Login />} />

          <Route path="/admin/*" element={<AdminWrapper />} />
          <Route path="/docente/*" element={<RoutesDocente />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
