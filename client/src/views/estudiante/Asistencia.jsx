import React, { useEffect, useState } from "react";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getToken, getUser } from "../../auth/auth";
import { convertirFormatoFecha } from "../../utils/funciones";

export const Asistencia = () => {
  const token = getToken();
  const user = getUser();

  const [estudiante, setEstudiante] = useState(null);
  const [asignaturas, setAsignaturas] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [periodosAsistencias, setPeriodosAsistencias] = useState([]);

  const [existAsistencias, setExistAsistencias] = useState(false);
  const [searched, setSearched] = useState(false);

  const controlBusqueda = useFormik({
    initialValues: {
      pid: "",
      asignatura: "",
    },

    validationSchema: Yup.object().shape({
      pid: Yup.string().required("Periodo requerido"),
      asignatura: Yup.string().required("Asignatura requerido"),
    }),

    onSubmit: (data) => {
      // if (openME) {
      //   HandleEdit(data);
      // } else {
      //   HandleSubmit(data);
      // }
    },
  });

  useEffect(() => {
    cargarEstudiante();
    cargarPeriodos();
  }, []);

  useEffect(() => {
    if (estudiante != null) {
      cargarAsignaturas();
    }
  }, [estudiante]);

  const cargarEstudiante = async () => {
    const response = await fetch(
      `http://localhost:4000/estudiante/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return console.log("estudiante no encontrado");
    }

    setEstudiante(data);
  };

  const cargarAsignaturas = async () => {
    const response = await fetch(
      `http://localhost:4000/asignaturasG/${estudiante.gid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return console.log("asignaturas no encontradas");
    }
    setAsignaturas(data);
  };

  const cargarPeriodos = async () => {
    const response = await fetch(
      `http://localhost:4000/periodosasistenciasestudiante/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (data.message) {
      return setExistAsistencias(false);
    }
    setExistAsistencias(true);
    setPeriodosAsistencias(data);
  };

  const cargarAsistencias = async () => {
    const response = await fetch(
      `http://localhost:4000/asistenciasestudianteasignaturaperiodo/${estudiante.id}/${controlBusqueda.values.asignatura}/${controlBusqueda.values.pid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return setSearched(true), setExistAsistencias(false);
    }
    setSearched(true);
    setExistAsistencias(true);
    setAsistencias(data);
  };

  return (
    <>
      <NavbarApp />
      <Titulo titulo={"Asistencias"} />

      <div className="flex justify-center">
        <div className="flex ">
          <div className="my-2 mr-1">
            <select
              onChange={controlBusqueda.handleChange}
              value={controlBusqueda.values.pid}
              onBlur={controlBusqueda.handleBlur}
              name="pid"
              className={`font-normal select-sm select select-bordered w-22 ${
                controlBusqueda.errors.pid && controlBusqueda.touched.pid
                  ? "border-red-500 text-red-500"
                  : ""
              }`}
            >
              <option
                className="font-bold text-black"
                value={""}
                disabled
                defaultValue={true}
              >
                Periodo
              </option>

              {periodosAsistencias.map(({ pid }, index) => {
                return (
                  <option key={index} className="text-black" value={pid}>
                    {pid}
                  </option>
                );
              })}
            </select>
            {controlBusqueda.touched.pid && controlBusqueda.errors.pid && (
              <p className="ml-1 text-xs text-red-500 ">
                {controlBusqueda.errors.pid}
              </p>
            )}
          </div>
          <div className="my-2 mr-1 ">
            <select
              value={controlBusqueda.values.asignatura}
              onChange={controlBusqueda.handleChange}
              onBlur={controlBusqueda.handleBlur}
              name="asignatura"
              className={`font-normal select-sm select select-bordered w-fit ${
                controlBusqueda.errors.asignatura &&
                controlBusqueda.touched.asignatura
                  ? "border-red-500 text-red-500"
                  : ""
              }`}
            >
              <option
                className="font-bold text-black"
                value={""}
                disabled
                defaultValue={true}
              >
                Mes
              </option>
              {asignaturas.map(({ aid, a_nombre }, index) => {
                return (
                  <option key={index} className="text-black" value={aid}>
                    {a_nombre}
                  </option>
                );
              })}
            </select>
            {controlBusqueda.touched.asignatura &&
              controlBusqueda.errors.asignatura && (
                <p className="ml-1 text-xs text-red-500 ">
                  {controlBusqueda.errors.asignatura}
                </p>
              )}
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => cargarAsistencias()}
              className={`px-4 py-1 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-700 ${
                (controlBusqueda.errors.asignatura &&
                  controlBusqueda.touched.asignatura) ||
                (controlBusqueda.errors.pid && controlBusqueda.touched.pid)
                  ? "-mt-4"
                  : ""
              }`}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      

      {searched && existAsistencias ? (
        <div className="mx-4 mt-10 overflow-x-auto">
          <table className="table">
            <thead className="text-base text-center text-white bg-blue-500">
              <th className="w-0"></th>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Asignatura</th>
              <th>Periodo</th>
            </thead>
            <tbody className="text-base text-center">
              {asistencias.map((asistencia, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{convertirFormatoFecha(asistencia.c_fecha)}</td>
                    <td>{asistencia.asistencia_tipo}</td>

                    {asignaturas.map(({ aid, a_nombre }, index) => {
                      if (asistencia.aid === aid) {
                        return <td key={index}>{a_nombre}</td>;
                      }
                    })}
                    <td>{asistencia.pid}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : !searched && existAsistencias ? (
        <div className="flex justify-center mt-5">
          Seleccione los datos a buscar
        </div>
      ) : searched && !existAsistencias ? (
        <div className="flex justify-center mt-5">
          No se encontraron asistencias
        </div>
      ) : (
        <div className="flex justify-center mt-5 text-red-500">
          No hay asistencias que mostrar
        </div>
      )}
    </>
  );
};
