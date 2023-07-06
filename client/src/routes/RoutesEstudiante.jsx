import React from "react";

import { Route, Routes } from "react-router-dom";
import EstudianteTemplate from "../components/layout/EstudianteTemplate";
import { Asistencia } from "../views/estudiante/Asistencia";
import { Carnet } from "../views/estudiante/Carnet";

export function RoutesEstudiante() {
  return (
    <EstudianteTemplate>
      <Routes>
        <Route path="asistencia" element={<Asistencia />} />

        <Route path="carnet" element={<Carnet/>} />
      </Routes>
    </EstudianteTemplate>
  );
}
