import React from "react";

import { Route, Routes } from "react-router-dom";
import DocenteTemplate from "../components/layout/DocenteTemplate";
import { Carnet } from "../views/docente/Carnet";
import { Home } from "../views/docente/Home";
import { ControlAsistencia } from "../views/docente/ControlAsistencia";
import { ControlInicio } from "../views/docente/ControlInicio";
import { AsistenciaInicio } from "../views/docente/AsistenciaInicio";
import { Asistencia } from "../views/docente/Asistencia";

export function RoutesDocente() {
  return (
    <DocenteTemplate>
      <Routes>
        <Route path="carnet" element={<Carnet />} />
        <Route path="home" element={<Home />} />

        <Route path="control/:grado" element={<ControlAsistencia />} />
        <Route path="control" element={<ControlInicio />} />
        <Route path="asistencia" element={<AsistenciaInicio />} />
        <Route path="asistencia/:aid/:gid" element={<Asistencia />} />
      </Routes>
    </DocenteTemplate>
  );
}
