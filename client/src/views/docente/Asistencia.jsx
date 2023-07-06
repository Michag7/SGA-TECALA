import React, { useEffect, useState } from "react";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { useParams } from "react-router";
import { Radio } from "@material-tailwind/react";
import { getToken } from "../../auth/auth";
import { meses, periodos } from "../../utils/arrays";
import { convertirFormatoFecha } from "../../utils/funciones";
import { BsCheck, BsX } from "react-icons/bs";

export const Asistencia = () => {
  const token = getToken();
  const params = useParams();

  const [mesesAsistencias, setmesesAsistencias] = useState([]);
  const [periodosAsistencias, setPeriodosAsistencias] = useState([]);

  const [listaestudiantes, setListaEstudiantes] = useState([]);

  const [asistencias, setAsistencias] = useState([]);
  const [fechasAsistencias, setFechasAsistencias] = useState([]);
  const [inasistenciasEstudiantes, setInasistenciasEstudiantes] = useState([]);
  const [asistenciasEstudiantes, setAsistenciasEstudiantes] = useState([]);
  const [asistenciasTotales, setAsistenciasTotales] = useState(0);
  const [inasistenciasTotales, setInasistenciasTotales] = useState(0);

  const [existsAsistencias, setexistsAsistencias] = useState(false);
  const [searched, setSearched] = useState(false);

  const [selectSearch, setSelectSearch] = useState("Periodo");
  const [selected, setSelected] = useState("");

  useEffect(() => {
    cargarMeses();
    cargarPeriodos();
    cargarListaEstudiantes();
  }, []);

  useEffect(() => {
    if (selected != "") {
      cargarAsistencias();
    }
  }, [selected]);

  useEffect(() => {
    if (asistencias.length > 0) {
      obtenerFechasAsistencias();
    }
  }, [asistencias]);

  const cargarListaEstudiantes = async () => {
    const response = await fetch(
      `http://localhost:4000/listaestudiantes/${params.gid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setListaEstudiantes(data);
  };

  const cargarMeses = async () => {
    const response = await fetch(
      `http://localhost:4000/mesesasistencia/${params.aid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return setexistsAsistencias(false);
    }

    setexistsAsistencias(true);
    setmesesAsistencias(data);
  };

  const cargarPeriodos = async () => {
    const response = await fetch(
      `http://localhost:4000/periodosasistencia/${params.aid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    if (data.message) {
      return setexistsAsistencias(false);
    }
    setexistsAsistencias(true);
    setPeriodosAsistencias(data);
  };

  const cargarAsistencias = async () => {
    if (selectSearch === "Periodo") {
      const response = await fetch(
        `http://localhost:4000/asistenciasasignaturaperiodo/${params.aid}/${selected}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.message) {
        return setSearched(false);
      }

      setSearched(true);
      setAsistencias(data);
    }

    if (selectSearch === "Mes") {
      const response = await fetch(
        `http://localhost:4000/asistenciasasignaturames/${params.aid}/${selected}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (data.message) {
        return setSearched(false);
      }

      setSearched(true);
      setAsistencias(data);
    }
  };

  const handleChangeCheckBox = (e) => {
    setSelectSearch(e.target.value);
    setSelected("");
  };

  const handleChangeSelected = (e) => {
    e.preventDefault();
    setSelected(e.target.value);
  };

  const obtenerFechasAsistencias = () => {
    let fechas = [];
    let inasistenciasEstudiantes = [];
    let asistenciasEstudiantes = [];
    let nAsistencias = 0;
    let nInasistencias = 0;
    asistencias.forEach((asisp) => {
      let fecha = convertirFormatoFecha(asisp.c_fecha);
      let iEstudiante = { eid: asisp.eid, inasistencias: 0 };
      let AEstudiante = { eid: asisp.eid, asistencias: 0 };

      if (!fechas.includes(fecha)) {
        fechas.push(fecha);
      }

      if (asisp.asistencia_tipo === "Asistencia") {
        nAsistencias++;
      }

      if (asisp.asistencia_tipo === "Inasistencia") {
        nInasistencias++;
      }

      asistencias.forEach((asish) => {
        if (asisp.eid === asish.eid) {
          if (asish.asistencia_tipo === "Inasistencia") {
            iEstudiante.inasistencias++;
          }
        }

        if (asisp.eid === asish.eid) {
          if (asish.asistencia_tipo === "Asistencia") {
            AEstudiante.asistencias++;
          }
        }
      });

      inasistenciasEstudiantes.push(iEstudiante);
      asistenciasEstudiantes.push(AEstudiante);
    });

    setInasistenciasEstudiantes(inasistenciasEstudiantes);
    setAsistenciasEstudiantes(asistenciasEstudiantes);
    setAsistenciasTotales(nAsistencias);
    setInasistenciasTotales(nInasistencias);

    setFechasAsistencias(fechas);
  };

  return (
    <div>
      <NavbarApp />
      <Titulo titulo={`Asistencias - ${params.aid}`} />

      <div className="flex justify-center">
        <div className="px-4 py-1 pb-3 border rounded-lg w-fit">
          <div className="flex items-center">
            <p>Busqueda por:</p>
            <Radio
              id="busqueda"
              name="busqueda"
              label="Periodo"
              value={"Periodo"}
              onChange={handleChangeCheckBox}
              checked={selectSearch === "Periodo" ? true : false}
              disabled={existsAsistencias ? false : true}
            />
            <Radio
              id="busqueda"
              name="busqueda"
              label="Mes"
              value={"Mes"}
              onChange={handleChangeCheckBox}
              checked={selectSearch === "Mes" ? true : false}
              disabled={existsAsistencias ? false : true}
            />
          </div>
          <div className="flex justify-center">
            <select
              value={selected}
              className="font-normal w-28 select-sm select select-bordered"
              onChange={handleChangeSelected}
              disabled={existsAsistencias ? false : true}
            >
              <option value={""} defaultValue disabled>
                {selectSearch === "Periodo" ? "Periodo" : "Mes"}
              </option>

              {existsAsistencias && selectSearch === "Mes"
                ? mesesAsistencias.map(({ extract }, index) => {
                    return (
                      <option key={index} value={extract}>
                        {meses[extract - 1]}
                      </option>
                    );
                  })
                : existsAsistencias &&
                  periodosAsistencias.map(({ pid }, index) => {
                    return (
                      <option key={index} value={pid}>
                        {pid}
                      </option>
                    );
                  })}
            </select>
          </div>
        </div>
      </div>

      {searched ? (
        <div className="mx-2 mt-6 overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th className="text-black textarea-md">Estudiante</th>
                {fechasAsistencias.map((fecha, index) => {
                  return (
                    <th key={index} className="text-black textarea-md">
                      {fecha}
                    </th>
                  );
                })}
                <th className="text-black textarea-md">Asistencias</th>
                <th className="text-black textarea-md">Inasistencias</th>
              </tr>
            </thead>
            <tbody>
              {asistencias.map((asisp, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>

                    {listaestudiantes.map((estudiante, index) => {
                      if (asisp.eid === estudiante.id) {
                        return (
                          <td key={index}>
                            {estudiante.nombre} {estudiante.apellido}
                          </td>
                        );
                      }
                    })}

                    {asistencias.map((asish, index) => {
                      if (asisp.eid === asish.eid) {
                        if (asish.asistencia_tipo === "Asistencia") {
                          return (
                            <td key={index}>
                              <BsCheck className="text-green-500" size={20} />
                            </td>
                          );
                        }

                        if (asish.asistencia_tipo === "Inasistencia") {
                          return (
                            <td key={index}>
                              <BsX className="text-red-500" size={20}></BsX>
                            </td>
                          );
                        }
                      }
                    })}

                    {asistenciasEstudiantes.map(
                      ({ eid, asistencias }, index) => {
                        if (asisp.eid === eid) {
                          return <td key={index}>{asistencias}</td>;
                        }
                      }
                    )}

                    {inasistenciasEstudiantes.map(
                      ({ eid, inasistencias }, index) => {
                        if (asisp.eid === eid) {
                          return <td key={index}>{inasistencias}</td>;
                        }
                      }
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-center mt-10">
            <div className="flex flex-col justify-end p-4 mr-4 border rounded-lg">
              <div className="flex justify-end">
                <div className="flex items-center">Asistencias totales:</div>

                <div className="flex ml-2">
                  {asistenciasTotales}
                  <BsCheck className="text-green-500" size={25} />
                </div>
              </div>

              <div className="flex justify-end">
                <div className="flex items-center">Inasistencias totales:</div>

                <div className="flex ml-2">
                  {inasistenciasTotales}
                  <BsX className="text-red-500" size={25} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : existsAsistencias ? (
        <div className="flex justify-center mt-5">
          Seleccione los datos a buscar
        </div>
      ) : (
        <div className="flex justify-center mt-5 text-red-500">
          No hay asistencias que mostrar
        </div>
      )}
    </div>
  );
};
