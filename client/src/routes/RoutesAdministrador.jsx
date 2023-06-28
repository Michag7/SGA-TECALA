import React from "react";

import { Route, Routes } from "react-router-dom";

import AdminTemplate from "../components/layout/AdminTemplate";

import { Bitacora } from "../views/administrador/Bitacora";
import { HomeAdmin } from "../views/administrador/Home";
import { Docente } from "../views/administrador/Docente";
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
        <Route
          path="inventario/salasistemas"
          element={<Inventario seccion={1} title={"Sala de Sistemas #1"} />}
        />
        <Route
          path="inventario/salasistemas2"
          element={<Inventario seccion={2} title={"Sala de Sistemas #2"} />}
        />
        <Route
          path="inventario/salarobotica"
          element={<Inventario seccion={3} title={"Sala de Robotica"} />}
        />
      </Routes>
    </AdminTemplate>
  );
}
