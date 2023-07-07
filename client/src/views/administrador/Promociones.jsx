import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Button,
  Card,
  CardBody,
  List,
  ListItem,
  ListItemSuffix,
  Tooltip,
} from "@material-tailwind/react";
import { Titulo } from "../../components/layout/Titulo";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import { useFormik } from "formik";
import * as Yup from "yup";
import { getToken } from "../../auth/auth";

export const Promociones = ({setOpen}) => {
  const token = getToken();
  const params = useParams();

  const [grados, setGrados] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesNoPromovidos, setEstudiantesNoPromovidos] = useState([]);

  const promociones = useFormik({
    initialValues: {
      gid: "",
      gida: params.gid,
    },

    validationSchema: Yup.object().shape({
      gid: Yup.string().required("Grado es requerido"),
    }),

    onSubmit: (data) => {
      HandleSubmit(data);
    },
  });

  useEffect(() => {
    cargarGrados();
    cargarEstudiantes();
  }, []);

  const cargarGrados = async () => {
    const response = await fetch("http://localhost:4000/grados", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.message) {
      setGrados([]);
      return;
    }

    setGrados(data);
  };

  const cargarEstudiantes = async () => {
    const response = await fetch(
      `http://localhost:4000/listaestudiantes/${params.gid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      setEstudiantes([]);
      return;
    }

    setEstudiantes(data);
  };

  const HandleSubmit = (data) => {
    try {
      Swal.fire({
        title: "Esta Seguro que desea promover a estos estudiantes?",
        text: "Estas accion no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (estudiantesNoPromovidos.length === 0) {
            fetch("http://localhost:4000/promocionesall", {
              method: "PUT",
              body: JSON.stringify(data),
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }).then((response) => {
              if (response.status == 204) {
                Swal.fire(
                  "Promociones completadas",
                  "Las promociones se llevaron acabo correctamente",
                  "success"
                );

                cargarEstudiantes();
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ha ocurrido algun problemas!",
                });
              }
            });
          } else {
            fetch(
              `http://localhost:4000/promociones/${params.gid}/${data.gid}`,
              {
                method: "PUT",
                body: JSON.stringify(estudiantesNoPromovidos),
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            ).then((response) => {
              if (response.status == 204) {
                Swal.fire(
                  "Promociones completadas",
                  "Las promociones se llevaron acabo correctamente",
                  "success"
                );

                cargarEstudiantes();
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Ha ocurrido algun problemas!",
                });
              }
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event, id) => {
    if (event.target.checked) {
      if (estudiantesNoPromovidos.some((item) => item.id === id)) {
        const nuevoArreglo = estudiantesNoPromovidos.filter(
          (item) => item.id !== id
        );
        setEstudiantesNoPromovidos(nuevoArreglo);
      }
    } else {
      if (!estudiantesNoPromovidos.some((item) => item.id === id)) {
        setEstudiantesNoPromovidos((prevArreglo) => [...prevArreglo, { id }]);
      }
    }
  };
  return (
    <Card className="h-full border">
      <CardBody>
        <Titulo titulo={"Promociones"} />
        <div className="flex flex-col ">
          <div className="flex items-center justify-center space-x-5">
            <h2>
              Promover de{" "}
              <strong className="font-semibold">{params.gid}</strong> a :
            </h2>

            <div className="w-28">
              <select
                onChange={promociones.handleChange}
                value={promociones.values.gid}
                onBlur={promociones.handleBlur}
                name="gid"
                className={`px-0 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 select-border select-md w-full ${
                  promociones.errors.gid && promociones.errors.gid
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

                <option value={"Egresados"}>Egresados</option>

                {grados.map(({ gid }, index) => {
                  return (
                    <option key={index} value={gid}>
                      {gid}
                    </option>
                  );
                })}
              </select>
              {promociones.touched.gid && promociones.errors.gid && (
                <p className="ml-1 text-xs text-red-500 ">
                  {promociones.errors.gid}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 overflow-y-auto">
            <List className="mt-4 border h-80">
              {estudiantes.map(({ nombre, apellido, id }, index) => {
                return (
                  <ListItem key={index}>
                    {nombre} {apellido}
                    <ListItemSuffix>
                      <input
                        type="checkbox"
                        onChange={(event) => handleChange(event, id)}
                        defaultChecked={true}
                      ></input>
                    </ListItemSuffix>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div className="flex justify-end mt-6 space-x-2">
            <Button
              onClick={() => {
                setOpen(false);
                promociones.resetForm();
              }}
              color="red"
            >
              Cancelar
            </Button>

            <Button
              onClick={promociones.handleSubmit}
              disabled={estudiantesNoPromovidos.length === estudiantes.length}
            >
              Promover
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
