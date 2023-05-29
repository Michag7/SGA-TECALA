import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";


export function RoutesEstudiante() {
  return (
    <Routes>
      <Routes
        path="/admin/est"
        element={
          <>
            <div>Estudiante</div>
          </>
        }
      />
    </Routes>
  );
}
