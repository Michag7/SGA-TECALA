import React, { useEffect, useState, Fragment } from "react";
import { Titulo } from "./layout/Titulo";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Card,
  Button,
  Collapse,
  CardBody,
  Input,
  Alert,
} from "@material-tailwind/react";
import { BsPlusLg, BsCheckLg } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineClose } from "react-icons/ai";
import { IoIosRemoveCircle } from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

import { getToken } from "../auth/auth";
import { convertTimeTo12HourFormat } from "../utils/funciones";
import { TbClockHour3 } from "react-icons/tb";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router";

export const Horarios = ({ setModal, aid }) => {
  const params = useParams();
  const token = getToken();
  const [horarios, setHorarios] = useState([]);

  const [existsHorarios, setExistsHorarios] = useState(false);
  const [horarioYaExiste, setHorarioYaExiste] = useState(false);

  const [openAñadir, setOpenAñadir] = useState(false);
  const toggleOpen = () => setOpenAñadir((cur) => !cur);

  const horario = useFormik({
    initialValues: {
      dia: "",
      hora_inicio: "",
      hora_finalizacion: "",
      aid: aid,
      gid: params.gid,
    },

    validationSchema: Yup.object().shape({
      dia: Yup.string()
        .matches(/^[a-zA-Z"]+$/, {
          message: "Dia, solo debe contener letras",
        })
        .required("Dia es obligatorio"),
      hora_inicio: Yup.string().required("Nombre horario es obligatorio"),
      hora_finalizacion: Yup.string()
        .test(
          "is-greater-than",
          "La hora de finalización debe ser mayor a la hora de inicio",
          function (hora_inicio) {
            const hora_finalizacion = this.resolve(Yup.ref("hora_inicio"));
            return hora_finalizacion < hora_inicio;
          }
        )
        .required("Hora_finalizacion es obligatorio"),
      aid: Yup.string().required("Aid es obligatorio"),
    }),

    onSubmit: (data) => {
      HandleAssign(data);
    },
  });

  useEffect(() => {
    cargarHorariosAsignatura();
  }, []);

  const cargarHorariosAsignatura = async () => {
    const response = await fetch(`http://localhost:4000/horarioA/${aid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.message) {
      return console.log("No encontrado HA");
    }

    setExistsHorarios(true);
    setHorarios(data);
  };

  const HandleDelete = async (hid) => {
    const response = await fetch(`http://localhost:4000/horario/${hid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    cargarHorariosAsignatura();

    if (data.message === "Permiso no encontrado") {
      return console.log("no borrado");
    }
  };

  const HandleAssign = async (dataH) => {
    const response = await fetch("http://localhost:4000/horario", {
      method: "POST",
      body: JSON.stringify(dataH),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.status === 409) {
      setHorarioYaExiste(true);
      horario.handleReset();

      return;
    }

    if (data.message === "Horario no creado") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Horario no creado",
      });

      return;
    }

    horario.resetForm();
    cargarHorariosAsignatura();
  };

  return (
    <div className="">
      <Titulo titulo={"Asignación de permisos"} />

      {horarioYaExiste ? (
        <div className="flex justify-center w-full">
          <Alert
            className="flex items-center w-5/6 my-2 text-sm"
            variant="gradient"
            color="red"
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
            action={
              <AiOutlineCloseCircle
                size={25}
                className="!absolute right-3 hover:text-red-900"
                onClick={() => setHorarioYaExiste(false)}
              />
            }
          >
            El horario, ya esta asignado a otra asignatura
          </Alert>
        </div>
      ) : null}

      <Fragment>
        <div className="flex items-center justify-end mr-10">
          {openAñadir ? (
            <Button
              color="red"
              className="mr-2"
              size="sm"
              onClick={() => {
                setHorarioYaExiste(false);
                toggleOpen();
                horario.resetForm();
              }}
            >
              Cancelar
            </Button>
          ) : null}
          <Button
            className="flex"
            size="sm"
            onClick={() => {
              if (openAñadir) {
                horario.handleSubmit();
                toggleOpen();
              } else {
                toggleOpen();
                setHorarioYaExiste(false);
              }
            }}
            color={openAñadir ? "green" : "blue"}
          >
            {openAñadir ? "Guardar horario" : "Añadir"}{" "}
            {openAñadir ? (
              <BsCheckLg size={15} className="ml-2 text-white " />
            ) : (
              <BsPlusLg size={15} className="ml-2 text-white " />
            )}
          </Button>
        </div>

        <Collapse className="" open={openAñadir}>
          <Card className="mx-10 my-2 ">
            <CardBody>
              <div className="flex flex-col items-center justify-center w-full mx-auto">
                <select
                  onChange={horario.handleChange}
                  value={horario.values.dia}
                  onBlur={horario.handleBlur}
                  name="dia"
                  className={`w-2/3  font-normal border-b text-blue-gray-700 border-blue-gray-200 select-border select-md ${
                    horario.errors.dia && horario.touched.dia
                      ? "border-red-500 text-red-500"
                      : ""
                  }`}
                >
                  <option
                    className="font-bold"
                    value={""}
                    disabled
                    defaultValue={true}
                  >
                    Seleccione una dia
                  </option>
                  <option value={"LUNES"}>LUNES</option>
                  <option value={"MARTES"}>MARTES</option>
                  <option value={"MIERCOLES"}>MIERCOLES</option>
                  <option value={"JUEVES"}>JUEVES</option>
                  <option value={"VIERNES"}>VIERNES</option>
                </select>
                {horario.touched.dia && horario.errors.dia && (
                  <p className="ml-1 text-xs text-red-500 ">
                    {horario.errors.dia}
                  </p>
                )}
              </div>

              <div className="flex items-center w-full mt-2 space-x-6 border">
                <div className="w-1/2">
                  <select
                    onChange={horario.handleChange}
                    value={horario.values.hora_inicio}
                    onBlur={horario.handleBlur}
                    name="hora_inicio"
                    className={`w-full px-0 font-normal border-b text-blue-gray-700 border-blue-gray-200 select-border select-md${
                      horario.errors.hora_inicio && horario.touched.hora_inicio
                        ? "border-red-500 text-red-500"
                        : ""
                    }`}
                  >
                    <option
                      className="font-bold"
                      value={""}
                      disabled
                      defaultValue={true}
                    >
                      Hora inicio
                    </option>
                    <option value={"06:00"}>06:00 AM</option>
                    <option value={"07:00"}>07:00 AM</option>
                    <option value={"08:00"}>08:00 AM</option>
                    <option value={"09:00"}>09:00 AM</option>
                    <option value={"10:00"}>10:00 AM</option>
                    <option value={"11:00"}>11:00 AM</option>
                    <option value={"12:00"}>12:00 PM</option>
                    <option value={"13:00"}>1:00 PM</option>
                  </select>
                  {horario.touched.hora_inicio &&
                    horario.errors.hora_inicio && (
                      <p className="ml-1 text-xs text-red-500 ">
                        {horario.errors.hora_inicio}
                      </p>
                    )}
                </div>

                <div className="w-1/2">
                  <select
                    onChange={horario.handleChange}
                    value={horario.values.hora_finalizacion}
                    onBlur={horario.handleBlur}
                    name="hora_finalizacion"
                    className={`w-full px-0 font-normal border-b text-blue-gray-700 border-blue-gray-200 select-border select-md ${
                      horario.errors.hora_finalizacion &&
                      horario.touched.hora_finalizacion
                        ? "border-red-500 text-red-500"
                        : ""
                    }`}
                  >
                    <option
                      className="font-bold"
                      value={""}
                      disabled
                      defaultValue={true}
                    >
                      Hora finalización
                    </option>
                    <option value={"06:00"}>06:00 AM</option>
                    <option value={"07:00"}>07:00 AM</option>
                    <option value={"08:00"}>08:00 AM</option>
                    <option value={"09:00"}>09:00 AM</option>
                    <option value={"10:00"}>10:00 AM</option>
                    <option value={"11:00"}>11:00 AM</option>
                    <option value={"12:00"}>12:00 PM</option>
                    <option value={"13:00"}>1:00 PM</option>
                  </select>
                  {horario.touched.hora_finalizacion &&
                    horario.errors.hora_finalizacion && (
                      <p className="ml-1 text-xs text-red-500 ">
                        {horario.errors.hora_finalizacion}
                      </p>
                    )}
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </Fragment>

      {openAñadir ? <AiOutlineArrowDown className="mx-auto" size={25} /> : null}

      <section className={`w-full ${openAñadir ? "" : "mt-3"}`}>
        <Card className="flex justify-center mx-10 rounded-md ">
          <CardBody>
            <List className="">
              {existsHorarios ? (
                horarios.map(
                  ({ dia, hora_inicio, hora_finalizacion, hid }, index) => {
                    return (
                      <ListItem
                        key={index}
                        className="p-3 font-normal rounded-none text-md text-blue-gray-700 hover:bg-gray-200"
                      >
                        <ListItemPrefix>
                          <TbClockHour3 size={25} />
                        </ListItemPrefix>
                        {dia} {convertTimeTo12HourFormat(hora_inicio)} -{" "}
                        {convertTimeTo12HourFormat(hora_finalizacion)}
                        <ListItemSuffix>
                          <IoIosRemoveCircle
                            onClick={() => HandleDelete(hid)}
                            className="text-red-500 hover:text-red-900"
                            size={25}
                          />
                        </ListItemSuffix>
                      </ListItem>
                    );
                  }
                )
              ) : (
                <h2 className="text-center">
                  El estudiante no tiene permisos asignados
                </h2>
              )}
            </List>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};
