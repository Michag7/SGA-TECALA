import React from "react";

import { Route, Routes } from "react-router-dom";

import AdminTemplate from "../components/layout/AdminTemplate";

import { Bitacora } from "../views/administrador/Bitacora";
import { HomeAdmin } from "../views/administrador/Home";
import { Docente } from "../views/administrador/Docente";
import DataTable from "../views/administrador/DataTable";
import { InventarioInicio } from "../views/administrador/InventarioInicio";
import { Inventario } from "../views/administrador/Inventario";

export function RoutesAdministrador() {
  return (
    <AdminTemplate>
      <Routes>
        <Route path="home" element={<HomeAdmin />} />
        <Route path="grados" element={<h1>Grados</h1>} />
        <Route path="docentes" element={<Docente></Docente>} />
        <Route path="bitacoras" element={<Bitacora />} />
        <Route path="inventario" element={<InventarioInicio />} />
        <Route path="inventario/salasistemas" element={<Inventario />} />
        <Route path="inventario/salasistemas2" element={<Inventario />} />
        <Route path="inventario/salarobotica" element={<Inventario />} />
      </Routes>
    </AdminTemplate>
  );
}
