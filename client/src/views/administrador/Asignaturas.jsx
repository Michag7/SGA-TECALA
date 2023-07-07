import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { Titulo } from "../../components/layout/Titulo";
import { getToken } from "../../auth/auth";
import DataTable from "./DataTable";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillBook,
} from "react-icons/ai";
import { BsFillFileTextFill } from "react-icons/bs";
import { TbClockHour3 } from "react-icons/tb";

import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Horarios } from "../../components/Horarios";

const columnsPdf = [
  { header: "Id", dataKey: "aid" },
  { header: "Nombre asignatura", dataKey: "a_nombre" },
  { header: "Docente", dataKey: "did" },
  { header: "Grado", dataKey: "gid" },
];

export const Asignaturas = () => {
  const token = getToken();
  const params = useParams();
  const column = [
    {
      accessorKey: "aid",
      header: () => <span>id</span>,
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "a_nombre",
      header: () => <span>Asignatura</span>,
    },
    {
      accessorKey: "did",
      header: () => <span>Docente</span>,
    },

    {
      accessorKey: "horarios",
      header: "Horarios",
      cell: (info) => {
        return (
          <div className="flex items-center" onClick={() => handleOpenMH(info)}>
            <button className="flex px-3 py-1 text-white bg-green-600 border-1">
              Horarios
            </button>
            <div className="max-h-full bg-green-700 ">
              <TbClockHour3 className=" text-white m-1.5" size={20} />
            </div>
          </div>
        );
      },
      enableSorting: false,
    },

    {
      accessorKey: "actions",
      header: "Acciones",
      cell: (info) => {
        return (
          <div className="flex items-center space-x-1">
            <AiFillEye
              onClick={() => handleOpenMV(info)}
              className="text-white bg-cyan-600 p-0.5 rounded-sm cursor-pointer"
              size={25}
            />
            <AiFillEdit
              onClick={() => {
                setIsEditing(true);
                handleOpenME(info);
              }}
              className="text-white bg-gray-600 p-0.5 rounded-sm cursor-pointer"
              size={25}
            />
            <AiFillDelete
              onClick={() => HandleDelete(info)}
              className="text-white bg-red-600 p-0.5 rounded-sm cursor-pointer"
              size={25}
            />
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  const [asignturas, setAsignaturas] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [openMC, setOpenMC] = useState(false);
  const [openMV, setOpenMV] = useState(false);
  const [openMH, setOpenMH] = useState(false);

  const asignatura = useFormik({
    initialValues: {
      aid: "",
      a_nombre: "",
      gid: params.gid,
      did: "",
    },

    validationSchema: Yup.object().shape({
      aid: Yup.string()
        .matches(/^[a-zA-Z0-9\-"]+$/, {
          message:
            "El nombre de la asignaturas, no debe contener caracteres especiales y espacios",
        })
        .required("Id es obligatorio"),
      a_nombre: Yup.string()
        .matches(/^[a-zA-Z" "0-9]+$/, {
          message:
            "El nombre de la asignaturas, no debe contener caracteres especiales",
        })
        .required("Nombre asignatura es obligatorio"),
      gid: Yup.string().required("Gradi es obligatorio"),
      did: Yup.string()
        .matches(/^[0-9]+$/, {
          message: "La identificación del docente, solo debe contener digitos",
        })
        .required("Docente es obligatorio"),
    }),

    onSubmit: (data) => {
      HandleAsignaturas(data);
    },
  });

  useEffect(() => {
    cargarAsignaturas();
    cargarDocentes();
  }, []);

  const cargarAsignaturas = async () => {
    const response = await fetch(
      `http://localhost:4000/asignaturasG/${params.gid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setAsignaturas(data);
  };

  const cargarHorariosAsignatura = async (info) => {
    const aid = info.row.getValue("aid");
    const response = await fetch(`http://localhost:4000/horarioA/${aid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.message) {
      return console.log("No encontrado HA");
    }

    setHorarios(data);
  };

  const cargarDocentes = async () => {
    const response = await fetch("http://localhost:4000/docentes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setDocentes(data);
  };

  const HandleAsignaturas = async (data) => {
    try {
      if (!isEditing) {
        const response = await fetch("http://localhost:4000/asignatura", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          Swal.fire(
            "Asignatura creada",
            "El signatura, ha sido creada correctamente",
            "success"
          );

          cargarAsignaturas();
          handleCloseMC();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ocurrido un error!",
          });
          handleCloseMC();
        }
      } else {
        const response = await fetch("http://localhost:4000/asignatura", {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.message === "Datos no actualizados") {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrio un error, no se puedieron actualizar los datos",
          });
        }

        Swal.fire(
          "Asignatura actualizada",
          "La asignatura, ha sido actualizado correctamente",
          "success"
        );

        cargarAsignaturas();
        handleCloseMC();
        setIsEditing(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar un asignatura
  const HandleDelete = (info) => {
    try {
      const aid = info.row.getValue("aid");

      Swal.fire({
        title: "Esta Seguro?",
        text: "Estas accion no se puede revertir",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:4000/asignatura/${aid}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            if (response.status === 204) {
              Swal.fire(
                "Asignatura Eliminada",
                "La asignatura, ha sido eliminado correctamente",
                "success"
              );

              cargarAsignaturas();
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${response.message}`,
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  function cargarAsignatura(info) {
    const asignaturaSelect = info.row.original;
    asignatura.setValues({
      aid: asignaturaSelect.aid,
      a_nombre: asignaturaSelect.a_nombre,
      gid: params.gid,
      did: asignaturaSelect.did,
    });
  }

  const handleOpenME = (info) => {
    cargarAsignatura(info);
    setOpenMC(true);
  };

  const handleOpenMC = () => {
    setOpenMC(true);
  };

  const handleCloseMC = () => {
    asignatura.resetForm();
    setOpenMC(false);
    setIsEditing(false);
  };

  const handleOpenMV = (info) => {
    cargarAsignatura(info);
    setOpenMV(true);
  };

  const handleCloseMV = () => {
    asignatura.resetForm();
    setOpenMV(false);
  };

  const handleOpenMH = (info) => {
    cargarAsignatura(info);
    setOpenMH(true);
  };

  const handleCloseMH = () => {
    asignatura.resetForm();
    setOpenMH(false);
  };
  return (
    <div>
      <Titulo titulo={`Gestion de asignaturas - Grado ${params.gid}`} />

      <DataTable
        columns={column}
        Data={asignturas}
        nombreBR={"Añadir"}
        onclickBR={handleOpenMC}
        tituloPdf={`Asignaturas ${params.gid}`}
        columnsPdf={columnsPdf}
        iconoBR={<AiFillBook className="ml-2" />}
        nombreArchivo={`Asignaturas ${params.gid}`}
      />

      <Fragment>
        <Dialog size="xs" open={openMC} className="min-w-fit">
          <div className="flex items-center justify-between">
            <DialogHeader>
              {isEditing ? "Editar asignatura" : "Crear asignatura"}
            </DialogHeader>
            <XMarkIcon
              className="w-5 h-5 mr-3 cursor-pointer hover:text-red-500"
              onClick={handleCloseMC}
            />
          </div>
          <DialogBody>
            <form className="grid gap-5">
              {isEditing ? null : (
                <>
                  <Input
                    className="border-2"
                    label="Id asignatura"
                    name="aid"
                    type="text"
                    error={asignatura.touched.aid && asignatura.errors.aid}
                    onChange={asignatura.handleChange}
                    onBlur={asignatura.handleBlur}
                  />
                  {asignatura.touched.aid && asignatura.errors.aid && (
                    <p className="ml-1 -mt-5 text-xs text-red-500 ">
                      {asignatura.errors.aid}
                    </p>
                  )}
                </>
              )}

              <Input
                label="Nombre asignatura"
                name="a_nombre"
                type="text"
                value={asignatura.values.a_nombre}
                onChange={asignatura.handleChange}
                error={
                  asignatura.touched.a_nombre && asignatura.errors.a_nombre
                }
                onBlur={asignatura.handleBlur}
              />
              {asignatura.touched.a_nombre && asignatura.errors.a_nombre && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {asignatura.errors.a_nombre}
                </p>
              )}

              <select
                onChange={asignatura.handleChange}
                value={asignatura.values.did}
                onBlur={asignatura.handleBlur}
                name="did"
                className={`w-full px-0 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 m select-border select-md ${
                  asignatura.errors.did && asignatura.touched.did
                    ? "border-red-500 text-red-500"
                    : ""
                }`}
              >
                <option value={""} disabled defaultValue={true}>
                  Seleccione una opción
                </option>

                {docentes.map(({ id, nombre, apellido }, index) => {
                  return (
                    <option key={index} value={id}>
                      {nombre} {apellido}
                    </option>
                  );
                })}
              </select>
              {asignatura.touched.did && asignatura.errors.did && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {asignatura.errors.did}
                </p>
              )}
            </form>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button color="red" onClick={handleCloseMC}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="gradient"
              color="blue"
              onClick={asignatura.handleSubmit}
            >
              Añadir
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - horarios */}
      <Fragment>
        <Dialog size="sm" open={openMH} className=" min-w-fit">
          <Horarios aid={asignatura.values.aid} />

          <DialogFooter className="mr-1">
            <button
              className="px-4 py-1 text-black bg-gray-300 border-2 rounded-lg "
              onClick={handleCloseMH}
            >
              <span>Cerrar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - ver asignatura */}
      <Fragment>
        <Dialog size="sm" open={openMV} className="min-w-fit">
          <Titulo titulo={"Información asignatura"}> </Titulo>

          <DialogBody className="p-0 mx-6 mt-6 ">
            <div className="px-2 space-y-2 ">
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Id:</h2>{" "}
                <h3 className="w-full">{asignatura.values.aid} </h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Nombres asignatura:</h2>{" "}
                <h3 className="w-full">{asignatura.values.a_nombre}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Docente:</h2>{" "}
                <h3 className="w-full">{asignatura.values.did}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Grado:</h2>{" "}
                <h3 className="w-full">{asignatura.values.gid}</h3>
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="mr-1">
            <button
              className="px-4 py-1 text-black bg-gray-300 border-2 rounded-lg "
              onClick={handleCloseMV}
            >
              <span>Cerrar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </div>
  );
};
