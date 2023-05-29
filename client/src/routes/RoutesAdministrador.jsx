import React from "react";

import { Route, Routes } from "react-router-dom";

import AdminTemplate from "../components/layout/AdminTemplate";
import { Inventario } from "../views/administrador/Inventario";
import { Bitacora } from "../views/administrador/Bitacora";
import { HomeAdmin } from "../views/administrador/Home";

export function RoutesAdministrador() {
  return (
    <AdminTemplate>
      <Routes>
        <Route path="home" element={<HomeAdmin />} />
        <Route path="grados" element={<h1>Grados</h1>} />
        <Route path="docentes" element={<h1>hee</h1>} />
        <Route path="bitacoras" element={<Bitacora />} />
        <Route path="inventario" element={<Inventario />} />
      </Routes>
    </AdminTemplate>
  );
}
