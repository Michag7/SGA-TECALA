import React from "react";

import { Route, Routes } from "react-router-dom";
import { HomeAdmin } from "./views/Home";
import { Inventario } from "./views/Inventario";
import AdminTemplate from "../../components/admin/AdminTemplate";
import { Docente } from "./views/Docente";
import { Bitacora } from "./views/Bitacora";

export function RoutesAdministrador() {
  return (
    <AdminTemplate>
      <Routes>
        <Route path="home" element={<HomeAdmin />} />
        <Route path="grados" element={<h1>Grados</h1>} />
        <Route path="docentes" element={<h1>hee</h1>} />
        <Route path="bitacoras" element={<Bitacora/>} />
        <Route path="inventario" element={<Inventario />} />
      </Routes>
    </AdminTemplate>
  );
}
