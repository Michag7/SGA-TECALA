import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router";
import { getToken } from "../../auth/auth";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Estudiantes } from "./Estudiantes";
import { Asignaturas } from "./Asignaturas";
import { Button, Card, CardBody, Collapse } from "@material-tailwind/react";
import { Titulo } from "../../components/layout/Titulo";
import { Promociones } from "./Promociones";
import { FaUserGraduate } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const Grado = () => {
  const token = getToken();
  const params = useParams();
  const fecha = new Date();
  const anio = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const dia = fecha.getDate().toString().padStart(2, "0");
  const fechaA = `${anio}-${mes}-${dia}`;

  const [tabActive, setTabActive] = useState(1);
  const [iniciarPromociones, setIniciarPromociones] = useState(false);
  const [docenteActual, setDocenteActual] = useState({});
  const [docentesDisponibles, setDocentesDisponibles] = useState([]);
  const [existsDocentesD, setExistsDocentesD] = useState(false);

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((cur) => !cur);
  };

  const nuevoDirector = useFormik({
    initialValues: {
      did: "",
      gid: params.gid,
    },

    validationSchema: Yup.object().shape({
      did: Yup.string().required("Selecciona un docente"),
    }),

    onSubmit: (data) => {
      HandleSubmit(data);
    },
  });

  useEffect(() => {
    cargarDocenteActual();
    cargarDocentesDisponibles();
  }, []);

  const cargarDocenteActual = async () => {
    const response = await fetch(
      `http://localhost:4000/docentegrado/${params.gid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      setDocenteActual({});
      return;
    }

    setDocenteActual(data);
  };

  const cargarDocentesDisponibles = async () => {
    const response = await fetch("http://localhost:4000/docentesdisponibles", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.message) {
      setDocentesDisponibles([]);
      setExistsDocentesD(false);
      return;
    }
    setExistsDocentesD(true);
    setDocentesDisponibles(data);
  };

  const HandleSubmit = (data) => {
    try {
      Swal.fire({
        title: "Esta segurar de cambiar este director de grupo?",
        text: "Estas accion no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:4000/docentegrado", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.status == 204) {
              Swal.fire(
                "Director de grupo cambiado",
                "EL director de grupo fue cambiado correctamente",
                "success"
              );

              toggleOpen();
              nuevoDirector.resetForm();
              cargarDocenteActual();
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ha ocurrido algun problemas!",
              });

              toggleOpen();
              nuevoDirector.resetForm();
              cargarDocenteActual();
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
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

        <a
          onClick={() => setTabActive(3)}
          className={`tab tab-lifted ${
            tabActive === 3 ? "tab-active font-bold" : ""
          } `}
        >
          General
        </a>
      </div>

      {/* Bitacoras */}

      {tabActive === 1 && <Estudiantes gid={params.gid} />}
      {/* Asistencias */}

      {tabActive === 2 && <Asignaturas />}

      {tabActive === 3 && (
        <div className="flex mt-2 h-5/6">
          <div className="w-1/2">
            <div className="h-full p-4">
              {iniciarPromociones ? (
                <Promociones setOpen={setIniciarPromociones} />
              ) : (
                <Card className="h-full border">
                  <CardBody className="flex items-center justify-center w-full mt-10">
                    <Button
                      className="flex items-center text-lg"
                      onClick={() => setIniciarPromociones(true)}
                    >
                      Iniciar Promociones{" "}
                      <FaUserGraduate size={25} className="ml-5 " />
                    </Button>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
          <div className="w-1/2">
            <div className="p-4 h-1/2">
              <div className="h-full">
                <Card className="h-full border">
                  <CardBody>
                    <Titulo titulo={"Asignación de director de grupo"} />
                    <div className="flex items-center justify-center mx-10">
                      <h2>
                        Director de grupo actual:{" "}
                        <strong>
                          {docenteActual.nombre} {docenteActual.apellido}{" "}
                        </strong>
                      </h2>
                    </div>

                    <div className="flex justify-center mt-2 space-x-2">
                      <Button
                        onClick={() => {
                          if (open) {
                            nuevoDirector.handleSubmit();
                          } else {
                            toggleOpen();
                          }
                        }}
                      >
                        {open ? "Guardar" : "Cambiar"}
                      </Button>
                      {open ? (
                        <Button
                          color="red"
                          onClick={() => {
                            toggleOpen();
                            nuevoDirector.resetForm();
                          }}
                        >
                          Cancelar
                        </Button>
                      ) : null}
                    </div>

                    <Fragment>
                      <Collapse open={open}>
                        <Card className="w-8/12 mx-auto my-4">
                          <CardBody>
                            {existsDocentesD ? (
                              <div className="">
                                <select
                                  onChange={nuevoDirector.handleChange}
                                  value={nuevoDirector.values.did}
                                  onBlur={nuevoDirector.handleBlur}
                                  name="did"
                                  className={`px-0 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 select-border select-md w-full ${
                                    nuevoDirector.errors.did &&
                                    nuevoDirector.errors.did
                                      ? "border-red-500 text-red-500"
                                      : ""
                                  }`}
                                >
                                  <option
                                    value={""}
                                    className="font-bold"
                                    disabled
                                    defaultValue={true}
                                  >
                                    Seleccione
                                  </option>

                                  {docentesDisponibles.map(
                                    ({ nombre, apellido, id }, index) => {
                                      return (
                                        <option key={index} value={id}>
                                          {nombre} {apellido}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                                {nuevoDirector.touched.did &&
                                  nuevoDirector.errors.did && (
                                    <p className="ml-1 text-xs text-red-500 ">
                                      {nuevoDirector.errors.did}
                                    </p>
                                  )}
                              </div>
                            ) : (
                              <h2>
                                No hay docente disponibles para ser asignados a
                                este grado
                              </h2>
                            )}
                          </CardBody>
                        </Card>
                      </Collapse>
                    </Fragment>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
