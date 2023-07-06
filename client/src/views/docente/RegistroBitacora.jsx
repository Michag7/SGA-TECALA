import React, { Fragment, useState, useEffect } from "react";
import { getToken, getUser } from "../../auth/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Radio,
} from "@material-tailwind/react";
import { Titulo } from "../../components/layout/Titulo";
import { AiFillPlusCircle, AiOutlinePlus } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsCheckLg, BsX } from "react-icons/bs";

export const RegistroBitacora = ({ cid, grado }) => {
  const token = getToken();
  const user = getUser();

  const [fechaActual, setFechaActual] = useState(new Date());
  const [asignaturaActual, setAsignaturaActual] = useState({
    aid: "",
    a_nombre: "",
  });

  const [asistencias, setAsistencias] = useState([]);
  const [asistenciasAsignaturaActual, setAsistenciasAsignaturaActual] =
    useState([]);
  const [estudiantesInasistentes, setEstudiantesInasistentes] = useState([]);
  const [existsAssists, setExistsAssists] = useState(false);

  const [openME, setOpenME] = useState(false);
  const [openMO, setOpenMO] = useState(false);

  const [horarios, setHorarios] = useState([]);

  const [listaEstudiantes, setListaEstudiantes] = useState([]);

  const [observaciones, setObservaciones] = useState([]);
  const [numeroObservaciones, setNumeroObservaciones] = useState();
  const [isEditingObs, setIsEditingObs] = useState(false);

  //Validador de observacion
  const formikObs = useFormik({
    initialValues: {
      id: 0,
      hora: 0,
      tema: "",
      control: cid,
      docente: user.nombre + " " + user.apellido,
    },

    validationSchema: Yup.object().shape({
      tema: Yup.string().required("Debes ingresar un tema"),
    }),

    onSubmit: (data) => {
      HandleObservaciones(data);
    },
  });

  //Obtiene la fecha actual
  useEffect(() => {
    const interval = setInterval(() => {
      setFechaActual(new Date());
    }, 1000);

    // Cleanup del efecto
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    cargarListaEstudiantes();
    cargarObservaciones();
    cargarHorarios();
    cargarAsistencias();
  }, []);

  useEffect(() => {
    AsignaturaActual();
  }, [horarios]);

  useEffect(() => {
    cargarEstudianteInasistentes();
  }, [asistenciasAsignaturaActual]);

  const cargarHorarios = async () => {
    const response = await fetch(`http://localhost:4000/horarioG/${grado}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setHorarios(data);
  };

  const cargarAsistencias = async () => {
    const response = await fetch(`http://localhost:4000/asistencias/${cid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setAsistencias(data);
  };

  const cargarAsistenciasAsignatura = async () => {
    const response = await fetch(
      `http://localhost:4000/asistenciasAsignatura/${cid}/${asignaturaActual.aid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.length === 0) {
      setExistsAssists(false);
      iniciarAsistencias();
    } else {
      setAsistenciasAsignaturaActual(data);
      setExistsAssists(true);
    }
  };

  const cargarEstudianteInasistentes = async () => {
    const response = await fetch(`http://localhost:4000/asistenciasE/${cid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setEstudiantesInasistentes(data);
  };

  const cargarListaEstudiantes = async () => {
    const response = await fetch(
      `http://localhost:4000/listaestudiantes/${grado}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setListaEstudiantes(data);
  };

  const cargarObservaciones = async () => {
    const response = await fetch(`http://localhost:4000/observaciones/${cid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setObservaciones(data);
    setNumeroObservaciones(data.length);
    formikObs.setFieldValue("hora", data.length + 1);
  };

  const HandleAsistencias = async (e) => {
    try {
      e.preventDefault();
      if (!existsAssists) {
        const response = await fetch("http://localhost:4000/asistencias", {
          method: "POST",
          body: JSON.stringify(asistenciasAsignaturaActual),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        if (data.message) {
          return console.log("No creado");
        }

        setExistsAssists(true);
        handleCloseME();
      } else {
        const response = await fetch("http://localhost:4000/asistencias", {
          method: "PUT",
          body: JSON.stringify(asistenciasAsignaturaActual),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.message) {
          console.log("No creado");
        } else {
          handleCloseME();
        }

        setExistsAssists(true);
      }

      cargarEstudianteInasistentes();
    } catch (error) {
      console.log(error.message);
    }
  };

  const HandleObservaciones = async (data) => {
    try {
      if (!isEditingObs) {
        const response = await fetch("http://localhost:4000/observacion", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          setNumeroObservaciones(numeroObservaciones + 1);
          cargarObservaciones();
          handleCloseMO();
        }
      } else {
        const response = await fetch("http://localhost:4000/observacion", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          cargarObservaciones();
          handleCloseMO();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAsistenciaChange = (index, value) => {
    const nuevosDatosAsistencia = [...asistenciasAsignaturaActual];

    const asistencia = nuevosDatosAsistencia[index];
    asistencia.asistencia_tipo = value;
    nuevosDatosAsistencia[index] = asistencia;

    setAsistenciasAsignaturaActual(nuevosDatosAsistencia);
  };

  const handleAsignaturaActualChange = (e) => {
    const asignaturaID = buscarAsignaturaID(e.target.value);

    setAsignaturaActual({ aid: asignaturaID, a_nombre: e.target.value });
  };

  const handleOpenME = () => {
    setOpenME(true);
    cargarAsistenciasAsignatura();
  };
  const handleCloseME = () => {
    setOpenME(false);
  };

  const handleOpenMO = () => {
    setOpenMO(true);
  };

  const handleOpenMOE = (tema, id) => {
    setOpenMO(true);
    setIsEditingObs(true);
    formikObs.setFieldValue("tema", tema);
    formikObs.setFieldValue("id", id);
  };
  const handleCloseMO = () => {
    setOpenMO(false);
    setIsEditingObs(false);
    formikObs.setFieldValue("tema", "");
    formikObs.setFieldValue("id", 0);
    formikObs.setErrors({});
    formikObs.setTouched({});
  };

  const buscarAsignaturaID = (a_nombre) => {
    let aid = "";
    horarios.forEach((horario) => {
      const asignaturaNombre = horario.a_nombre;

      if (a_nombre === asignaturaNombre) {
        aid = horario.aid;
      }
    });

    return aid;
  };

  const iniciarAsistencias = () => {
    const asistencias = listaEstudiantes.map(({ id, nombre, apellido }) => ({
      eid: id,
      nombre: nombre,
      apellido: apellido,
      asistencia_tipo: "Asistencia",
      cid: cid,
      aid: asignaturaActual.aid,
      pid: 2,
    }));

    // Agregar los nuevos objetos al estado nuevosDatos
    setAsistenciasAsignaturaActual(asistencias);
  };

  const AsignaturaActual = () => {
    const horaActual = parseInt(
      fechaActual.toLocaleTimeString().replace(/:/g, ""),
      10
    );

    horarios.forEach((horario) => {
      const horaInicio = parseInt(horario.hora_inicio.replace(/:/g, ""), 10);
      const horaFinalizacion = parseInt(
        horario.hora_finalizacion.replace(/:/g, ""),
        10
      );

      if (horaInicio <= 83000 && 83000 < horaFinalizacion) {
        setAsignaturaActual({ aid: horario.aid, a_nombre: horario.a_nombre });
      }
    });
  };

  return (
    <div className="h-full">
      <Titulo titulo={`Control - GRADO ${grado}`}></Titulo>

      <div className="flex ml-5 space-x-4 overflow-auto w-80">
        <select
          value={asignaturaActual.a_nombre}
          onChange={handleAsignaturaActualChange}
          name="a_nombre"
          className={`w-full px-0 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 m select-border select-md  `}
        >
          {horarios.map(({ a_nombre }, index) => {
            return (
              <option value={a_nombre} key={index}>
                {a_nombre}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div className="flex items-center justify-end mt-3 mr-6 lg:mr-14 md:mr-14">
          <button
            onClick={handleOpenME}
            className="flex items-center px-4 py-2 font-bold border-2 rounded-full shadow-lg hover:text-blue-500"
          >
            Llamar lista
            <AiFillPlusCircle size={20} className="ml-1.5 text-blue-500 " />
          </button>
        </div>
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
                    <tr key={index} className="border-b border-black">
                      <th>{index + 1}</th>
                      <td>{eid}</td>
                      {hora1 === "Inasistencia" ? (
                        <td>
                          <BsX className="text-red-500" size={25} />
                        </td>
                      ) : hora1 === "Asistencia" ? (
                        <td>
                          <BsCheckLg className="text-green-500" size={25} />
                        </td>
                      ) : (
                        ""
                      )}
                      {hora2 === "Inasistencia" ? (
                        <td>
                          <BsX className="text-red-500" size={25} />
                        </td>
                      ) : hora2 === "Asistencia" ? (
                        <td>
                          <BsCheckLg className="text-green-500" size={25} />
                        </td>
                      ) : (
                        ""
                      )}

                      {hora3 === "Inasistencia" ? (
                        <td>
                          <BsX className="text-red-500" size={25} />
                        </td>
                      ) : hora3 === "Asistencia" ? (
                        <td>
                          <BsCheckLg className="text-green-500" size={25} />
                        </td>
                      ) : (
                        ""
                      )}

                      {hora4 === "Inasistencia" ? (
                        <td>
                          <BsX className="text-red-500" size={25} />
                        </td>
                      ) : hora4 === "Asistencia" ? (
                        <td>
                          <BsCheckLg className="text-green-500" size={25} />
                        </td>
                      ) : (
                        ""
                      )}

                      {hora5 === "Inasistencia" ? (
                        <td>
                          <BsX className="text-red-500" size={25} />
                        </td>
                      ) : hora5 === "Asistencia" ? (
                        <td>
                          <BsCheckLg className="text-green-500" size={25} />
                        </td>
                      ) : (
                        ""
                      )}

                      {hora6 === "Inasistencia" ? (
                        <td>
                          <BsX className="text-red-500" size={25} />
                        </td>
                      ) : hora6 === "Asistencia" ? (
                        <td>
                          <BsCheckLg className="text-green-500" size={25} />
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
        <div className="flex items-center justify-end mr-6 lg:mr-14 md:mr-14">
          <button
            onClick={handleOpenMO}
            className={`flex items-center px-4 py-2 font-bold border-2 rounded-full shadow-lg hover:text-blue-500 ${
              numeroObservaciones === 6 ? "hidden" : ""
            }`}
            disabled={numeroObservaciones === 6 ? true : false}
          >
            Añadir observación
            <AiFillPlusCircle size={20} className="ml-1.5 text-blue-500 " />
          </button>
        </div>
        <div className="mx-6 mt-2 overflow-x-auto lg:mx-14 md:mx-14">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-base border-b border-black">
                <th>Hora</th>
                <th>Tema</th>
                <th>Docente</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {observaciones.map(({ o_hora, o_tema, docente, oid }, index) => {
                return (
                  <tr key={index} className="border-b border-black">
                    <th>{o_hora}</th>
                    <td>{o_tema}</td>
                    <td>{docente}</td>
                    <td>
                      <FaEdit
                        className="cursor-pointer hover:text-blue-500"
                        onClick={() => handleOpenMOE(o_tema, oid)}
                        size={25}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* //Modal lista estudiantes */}
      <Fragment>
        <Dialog open={openME} size="md" o className="min-w-fit">
          <div className="flex items-center justify-between">
            <DialogHeader>Lista de estudiante {grado}</DialogHeader>
            {/* <XMarkIcon className="w-5 h-5 mr-3 cursor-pointer hover:text-red-500" /> */}
          </div>
          <DialogBody divider>
            <div className="mt-2 overflow-x-auto h-96">
              <table className="table border-separate table-pin-rows border-spacing">
                <thead>
                  <tr className="text-base text-center text-white bg-blue-500">
                    <th>Estudiante</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {asistenciasAsignaturaActual.map(
                    ({ nombre, apellido, eid, asistencia_tipo }, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            {nombre} {apellido}
                          </td>
                          <td>
                            <div className="flex gap-10">
                              <Radio
                                id={eid}
                                name={eid}
                                label="Asistio"
                                onChange={() =>
                                  handleAsistenciaChange(index, "Asistencia")
                                }
                                icon={<BsCheckLg />}
                                checked={
                                  asistencia_tipo === "Asistencia"
                                    ? true
                                    : false
                                }
                              />
                              <Radio
                                id={eid}
                                name={eid}
                                label="No asistio"
                                icon={<BsX />}
                                color="red"
                                onChange={() =>
                                  handleAsistenciaChange(index, "Inasistencia")
                                }
                                checked={
                                  asistencia_tipo === "Inasistencia"
                                    ? true
                                    : false
                                }
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button onClick={handleCloseME} variant="outlined" color="red">
              Cancelar
            </Button>
            <Button onClick={HandleAsistencias} variant="gradient" color="blue">
              Añadir
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Observacion             */}
      <Fragment>
        <Dialog open={openMO} size="md" o className="min-w-fit">
          <div className="flex items-center justify-between">
            <DialogHeader>Añadir observación</DialogHeader>
            {/* <XMarkIcon className="w-5 h-5 mr-3 cursor-pointer hover:text-red-500" /> */}
          </div>
          <DialogBody divider>
            <div>
              <Textarea
                value={formikObs.values.tema}
                label="Tema"
                name="tema"
                type="text"
                onChange={formikObs.handleChange}
                error={formikObs.touched.tema && formikObs.errors.tema}
                onBlur={formikObs.handleBlur}
              />
              {formikObs.touched.tema && formikObs.errors.tema && (
                <p className="ml-1 text-xs text-red-500 ">
                  {formikObs.errors.tema}
                </p>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button onClick={handleCloseMO} variant="outlined" color="red">
              Cancelar
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={formikObs.handleSubmit}
            >
              Añadir
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
};
