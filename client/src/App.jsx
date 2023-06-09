import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { Home } from "./pages/Home";
import { RoutesAdministrador } from "./routes/RoutesAdministrador";
import DataTable from "./views/administrador/DataTable";
import { RegistroDocente } from "./views/administrador/RegistroDocente";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />

          <Route path="/login" element={<Login />} />

          <Route path="/admin/*" element={<RoutesAdministrador />} />
          <Route path="/modal" element={<RegistroDocente />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
