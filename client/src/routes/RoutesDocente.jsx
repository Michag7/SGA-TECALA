import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDocente from "../components/layout/DocenteTemplate";
import { Carnet } from "../views/docente/Carnet";
import { Home } from "../views/docente/Home";

export function RoutesDocente() {
  return (
    <AdminDocente>
      <Routes>
        <Route path="carnet" element={<Carnet />} />

        <Route path="home" element={<Home />} />
      </Routes>
    </AdminDocente>
  );
}
