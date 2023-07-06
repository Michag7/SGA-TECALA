import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getToken } from "../../auth/auth";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Estudiantes } from "./Estudiantes";
import { Asignaturas } from "./Asignaturas";

export const Grado = () => {
  const token = getToken();
  const params = useParams();
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const dia = fecha.getDate().toString().padStart(2, "0");
  const fechaA = `${anio}-${mes}-${dia}`;

  const [tabActive, setTabActive] = useState(1);
  const [existControl, setExistsControl] = useState(false);
  const [fechaActual, setFechaActual] = useState(fechaA);
  const [control, setControl] = useState({
    cid: 0,
    gid: params.gid,
    c_fecha: fechaA,
  });
  return (
    <div className="h-full overflow-auto">
      <NavbarApp></NavbarApp>
      <div className="tabs">
        <a
          onClick={() => setTabActive(1)}
          className={`tab tab-lifted ${
            tabActive === 1 ? "tab-active font-bold" : ""
          }`}
        >
          Estudiantes
        </a>
        <a
          onClick={() => setTabActive(2)}
          className={`tab tab-lifted ${
            tabActive === 2 ? "tab-active font-bold" : ""
          } `}
        >
          Asignaturas
        </a>
      </div>

      {/* Bitacoras */}

      {tabActive === 1 && <Estudiantes gid={params.gid} />}
      {/* Asistencias */}

      {tabActive === 2 && <Asignaturas />}
    </div>
  );
};
