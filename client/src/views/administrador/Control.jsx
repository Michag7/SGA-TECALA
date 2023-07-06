import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router";
import { getToken, getUser } from "../../auth/auth";

import { Titulo } from "../../components/layout/Titulo";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import { convertirFormatoFecha } from "../../utils/funciones";
import { NavbarApp } from "../../components/layout/NavbarApp";

export const Control = () => {
  const token = getToken();
  const user = getUser();
  const params = useParams();

  const [control, setControl] = useState({ cid: "", c_fecha: "", gid: "" });
  const [estudiantesInasistentes, setEstudiantesInasistentes] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [observaciones, setObservaciones] = useState([]);

  useEffect(() => {
    cargarControl();
  }, []);

  useEffect(() => {
    cargarObservaciones();
    cargarHorarios();
    cargarEstudianteInasistentes();
  }, [control]);

  const cargarControl = async () => {
    const response = await fetch(
      `http://localhost:4000/control/${params.cid}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setControl(data);
  };

  const cargarHorarios = async () => {
    const response = await fetch(
      `http://localhost:4000/horarioG/${control.gid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setHorarios(data);
  };

  const cargarEstudianteInasistentes = async () => {
    const response = await fetch(
      `http://localhost:4000/asistenciasE/${control.cid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setEstudiantesInasistentes(data);
  };

  const cargarObservaciones = async () => {
    const response = await fetch(
      `http://localhost:4000/observaciones/${control.cid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setObservaciones(data);
  };

  return (
    <div className="h-full">
      <NavbarApp />
      <Titulo
        titulo={`Control ${convertirFormatoFecha(control.c_fecha)} - Grado ${
          control.gid
        }`}
      ></Titulo>

      <div>
        <div className="mx-6 mt-2 overflow-x-auto lg:mx-14 md:mx-14">
          <table className="table border-separate border-spacing-1">
            <thead>
              <tr className="text-base text-center text-white bg-blue-500 ">
                <th></th>
                <th>Estudiante</th>
                {horarios.map(({ a_nombre }, index) => {
                  return <th key={index}>{a_nombre}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {estudiantesInasistentes.map(
                ({ eid, hora1, hora2, hora3, hora4, hora5, hora6 }, index) => {
                  return (
                    <tr
                      key={index}
                      className="text-center border-b border-black"
                    >
                      <th>{index + 1}</th>
                      <td>{eid}</td>
                      {hora1 === "Inasistencia" ? (
                        <td className="text-center ">
                          <BsXLg className="mx-auto text-red-500" size={19} />
                        </td>
                      ) : hora1 === "Asistencia" ? (
                        <td className="text-center">
                          <BsCheckLg
                            className="mx-auto text-green-500"
                            size={25}
                          />
                        </td>
                      ) : (
                        ""
                      )}
                      {hora2 === "Inasistencia" ? (
                        <td className="text-center">
                          <BsXLg className="mx-auto text-red-500" size={19} />
                        </td>
                      ) : hora2 === "Asistencia" ? (
                        <td>
                          <BsCheckLg
                            className="mx-auto text-green-500"
                            size={25}
                          />
                        </td>
                      ) : (
                        ""
                      )}

                      {hora3 === "Inasistencia" ? (
                        <td>
                          <BsXLg className="mx-auto text-red-500" size={19} />
                        </td>
                      ) : hora3 === "Asistencia" ? (
                        <td>
                          <BsCheckLg
                            className="mx-auto text-green-500"
                            size={25}
                          />
                        </td>
                      ) : (
                        ""
                      )}

                      {hora4 === "Inasistencia" ? (
                        <td>
                          <BsXLg className="mx-auto text-red-500" size={19} />
                        </td>
                      ) : hora4 === "Asistencia" ? (
                        <td>
                          <BsCheckLg
                            className="mx-auto text-green-500"
                            size={25}
                          />
                        </td>
                      ) : (
                        ""
                      )}

                      {hora5 === "Inasistencia" ? (
                        <td>
                          <BsXLg className="mx-auto text-red-500" size={19} />
                        </td>
                      ) : hora5 === "Asistencia" ? (
                        <td>
                          <BsCheckLg
                            className="mx-auto text-green-500"
                            size={25}
                          />
                        </td>
                      ) : (
                        ""
                      )}

                      {hora6 === "Inasistencia" ? (
                        <td>
                          <BsXLg className="mx-auto text-red-500" size={19} />
                        </td>
                      ) : hora6 === "Asistencia" ? (
                        <td>
                          <BsCheckLg
                            className="mx-auto text-green-500"
                            size={25}
                          />
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <div className="mx-6 mt-2 overflow-x-auto lg:mx-10 md:mx-10">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-base border-b border-black">
                <th>Hora</th>
                <th>Tema</th>
                <th>Docente</th>
              </tr>
            </thead>
            <tbody>
              {observaciones.map(({ o_hora, o_tema, docente, oid }, index) => {
                return (
                  <tr key={index} className="border-b border-black">
                    <th>{o_hora}</th>
                    <td>{o_tema}</td>
                    <td>{docente}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
