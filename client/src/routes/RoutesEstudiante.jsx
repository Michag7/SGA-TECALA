import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDocente from "../components/layout/DocenteTemplate";
import { Carnet } from "../views/docente/Carnet";
import { Home } from "../views/docente/Home";

export function RoutesEstudiante() {
  return (
    <AdminDocente>
      <Routes>
        <Route
          path="home"
          element={
            <>
              <div>home</div>
            </>
          }
        />

        <Route path="carnet" element={<Carnet />} />

        <Route path="home" element={<Home />} />
      </Routes>
    </AdminDocente>
  );
}
