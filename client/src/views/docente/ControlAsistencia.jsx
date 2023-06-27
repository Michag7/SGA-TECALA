import React, { useState } from "react";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { RegistroBitacora } from "./RegistroBitacora";

export const ControlAsistencia = () => {
  const [tabActive, setTabActive] = useState(1);

  return (
    <div>
      <NavbarApp></NavbarApp>
      <div className="tabs">
        <a
          onClick={() => setTabActive(1)}
          className={`tab tab-lifted ${tabActive === 1 ? "tab-active" : ""}`}
        >
          Bitacoras
        </a>
        <a
          onClick={() => setTabActive(2)}
          className={`tab tab-lifted ${tabActive === 2 ? "tab-active" : ""} `}
        >
          Asistencias
        </a>
      </div>

      {/* Bitacoras */}

      {tabActive === 1 && <RegistroBitacora />}
      {/* Asistencias */}

      {tabActive === 2 && <div>2</div>}
    </div>
  );
};
