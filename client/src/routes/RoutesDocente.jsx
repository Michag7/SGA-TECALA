import React from "react";

import { Route, Routes } from "react-router-dom";
import DocenteTemplate from "../components/layout/DocenteTemplate";
import { Carnet } from "../views/docente/Carnet";
import { Home } from "../views/docente/Home";
import { ControlAsistencia } from "../views/docente/ControlAsistencia";
import { ControlInicio } from "../views/docente/ControlInicio";
import { AsistenciaInicio } from "../views/docente/AsistenciaInicio";
import { Asistencia } from "../views/docente/Asistencia";
import { Docente } from "../views/administrador/Docente";
import { GradosInicio } from "../views/administrador/GradosInicio";
import { Grado } from "../views/administrador/Grado";
import { Bitacora } from "../views/administrador/Bitacora";
import { Control } from "../views/administrador/Control";
import { InventarioInicio } from "../views/administrador/InventarioInicio";
import { Inventario } from "../views/administrador/Inventario";

export function RoutesDocente() {
  return (
    <DocenteTemplate>
      <Routes>
        <Route path="carnet" element={<Carnet />} />
        <Route path="home" element={<Home />} />
        <Route path="controla/:grado" element={<ControlAsistencia />} />
        <Route path="controla" element={<ControlInicio />} />
        <Route path="asistencia" element={<AsistenciaInicio />} />
        <Route path="asistencia/:aid/:gid" element={<Asistencia />} />

        <Route path="docentes" element={<Docente />} />
        <Route path="grados" element={<GradosInicio />} />
        <Route path="grados/:gid" element={<Grado />} />
        <Route path="controlh" element={<Bitacora />} />
        <Route path="controlh/:cid" element={<Control />} />

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
    </DocenteTemplate>
  );
}
