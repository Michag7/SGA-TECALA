import React, { useEffect, useState } from "react";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { RegistroBitacora } from "./RegistroBitacora";
import { useParams } from "react-router";
import { getToken } from "../../auth/auth";
import { BsClipboardPlusFill } from "react-icons/bs";

export const ControlAsistencia = () => {
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
    gid: params.grado,
    c_fecha: fechaA,
  });

  useEffect(() => {
    cargarControl();
  }, []);

  const cargarControl = async () => {
    const response = await fetch(
      `http://localhost:4000/control/${control.gid}/${fechaActual}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      setExistsControl(false);
    } else {
      setControl(data);
      setExistsControl(true);
    }
  };

  const HandleControl = async () => {
    const response = await fetch("http://localhost:4000/control", {
      method: "POST",
      body: JSON.stringify(control),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.message) {
      return console.log("No creado");
    }

    if (response.status === 201) {
      console.log(data);
      setControl(data);
      setExistsControl(true);
    }
  };

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
          Control hoy
        </a>
        <a
          onClick={() => setTabActive(2)}
          className={`tab tab-lifted ${
            tabActive === 2 ? "tab-active font-bold" : ""
          } `}
        >
          Historial de controles
        </a>
      </div>

      {/* Bitacoras */}

      {tabActive === 1 &&
        (existControl ? (
          <RegistroBitacora grado={params.grado} cid={control.cid} />
        ) : (
          <div className="flex items-start justify-center w-full h-full">
            <button
              onClick={HandleControl}
              className="flex items-center p-4 mt-10 text-lg text-white bg-blue-500 border rounded-lg hover:"
            >
              Iniciar nuevo control{" "}
              <BsClipboardPlusFill className="ml-2 -mt-1" size={20} />
            </button>
          </div>
        ))}
      {/* Asistencias */}

      {tabActive === 2 && <div>2</div>}
    </div>
  );
};
