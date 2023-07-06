import React from "react";

import { Route, Routes } from "react-router-dom";
import EstudianteTemplate from "../components/layout/EstudianteTemplate";
import { Asistencia } from "../views/estudiante/Asistencia";
import { Carnet } from "../views/estudiante/Carnet";
import { Docente } from "../views/administrador/Docente";
import { InventarioInicio } from "../views/administrador/InventarioInicio";
import { GradosInicio } from "../views/administrador/GradosInicio";
import { Grado } from "../views/administrador/Grado";
import { Inventario } from "../views/administrador/Inventario";
import { Bitacora } from "../views/administrador/Bitacora";
import { Control } from "../views/administrador/Control";

export function RoutesEstudiante() {
  return (
    <EstudianteTemplate>
      <Routes>
        <Route path="asistencia" element={<Asistencia />} />
        <Route path="carnet" element={<Carnet />} />
        
        <Route path="docentes" element={<Docente />} />
        <Route path="grados" element={<GradosInicio />} />
        <Route path="grados/:gid" element={<Grado />} />
        <Route path="control" element={<Bitacora />} />
        <Route path="control/:cid" element={<Control />} />

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
    </EstudianteTemplate>
  );
}
