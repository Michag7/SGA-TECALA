import { Fragment, useState, useEffect } from "react";

import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { getToken } from "../../auth/auth";
import DataTable from "./DataTable";
import { Titulo } from "../../components/layout/Titulo";
import { RegistroEstudiante } from "./RegistroEstudiante";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import { BsFillPersonPlusFill, BsPersonFillGear } from "react-icons/bs";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
} from "react-icons/ai";
import { TbPassword } from "react-icons/tb";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Permisos } from "../../components/Permisos";

const columnsPdf = [
  { header: "Identificación", dataKey: "id" },
  { header: "Nombres", dataKey: "nombre" },
  { header: "Apellidos", dataKey: "apellido" },
  { header: "Grado", dataKey: "gid" },
  { header: "Genero", dataKey: "genero" },
  { header: "Email", dataKey: "email" },
  { header: "Barrio", dataKey: "barrio" },
  { header: "direccion", dataKey: "direccion" },
];

export const Estudiantes = ({ gid }) => {
  const column = [
    {
      accessorKey: "id",
      header: () => <span>Cedula</span>,
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "nombre",
      header: () => <span>Nombres</span>,
    },
    {
      accessorKey: "apellido",
      header: () => <span>Apellidos</span>,
    },

    {
      accessorKey: "recuperar",
      header: "Contraseña",
      cell: (info) => {
        return (
          <div
            className="flex items-center"
            onClick={() => handleOpenMCC(info)}
          >
            <button className="flex px-3 py-1 text-white bg-green-600 border-1">
              Contraseña
            </button>
            <div className="max-h-full bg-green-700 ">
              <TbPassword className=" text-white m-1.5" size={20} />
            </div>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "permisos",
      header: "Permisos",
      cell: (info) => {
        return (
          <div className="flex items-center">
            <button
              className="flex px-3 py-1 text-white bg-purple-600 border-1"
              onClick={() => handleOpenMP(info)}
            >
              Permisos
            </button>
            <div className="max-h-full bg-purple-700 ">
              <BsPersonFillGear className=" text-white m-1.5" size={20} />
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
              onClick={() => handleOpenME(info)}
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

  //Obtener el token
  const token = getToken();

  //Estado el cual contiene todos los estudiantes
  const [estudiantes, setEstudiantes] = useState([]);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const [openMP, setOpenMP] = useState(false);
  const [openMCC, setOpenMCC] = useState(false);
  const [openMC, setOpenMC] = useState(false);
  const [openMV, setOpenMV] = useState(false);
  const [openME, setOpenME] = useState(false);

  const estudiante = useFormik({
    initialValues: {
      id: "",
      nombres: "",
      apellidos: "",
      genero: "",
      telefono: "",
      correo: "",
      barrio: "",
      direccion: "",
      gid: gid,
    },

    validationSchema: Yup.object().shape({
      id: Yup.string("La identificación debe ser un numero")
        .matches(/^[0-9]+$/, "La identificación solo debe contener numeros")
        .min(10, "La identificación debe contener 10 digitos")
        .max(10, "La identificación debe contener 10 digitos")
        .required("Identificación es obligatorio"),
      nombres: Yup.string()
        .matches(/^[a-zA-Z" "]+$/, {
          message: "El campo solo puede contener letras",
        })
        .required("Nombres es obligatorio"),
      apellidos: Yup.string()
        .matches(/^[a-zA-Z" "]+$/, {
          message: "El campo solo puede contener letras",
        })
        .required("Apellidos es obligatorio"),
      genero: Yup.string()
        .matches(/^[a-zA-Z]+$/, {
          message: "El campo solo puede contener letras",
        })
        .required("Genero es obligatorio"),

      telefono: Yup.string("Telefono debe ser un numero")
        .matches(/^[0-9]+$/, "Telefono solo debe contener numeros")
        .required("Telefono es obligatorio"),
      correo: Yup.string()
        .email("Ingresa un correo electrónico válido")
        .required("El correo electrónico es obligatorio"),
      barrio: Yup.string().required("Barrio es obligatorio"),
      direccion: Yup.string().required("Dirrección es obligatorio"),
    }),

    onSubmit: (data) => {
      HandleEdit(data);
    },
  });

  const cuenta = useFormik({
    initialValues: {
      id: "",
      usuario: "",
      contraseña: "",
      Rcontraseña: "",
    },

    validationSchema: Yup.object().shape({
      id: Yup.string("La identificación debe ser un numero").required(
        "Identificación es obligatorio"
      ),
      usuario: Yup.string().required("Usuario es obligatorio"),
      contraseña: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
      Rcontraseña: Yup.string()
        .oneOf([Yup.ref("contraseña"), null], "Las contraseñas no coinciden")
        .required("Debes confirmar la contraseña"),
    }),

    onSubmit: (data) => {
      HandleEditContraseña(data);
    },
  });

  useEffect(() => {
    cargarEstudiantes();
  }, []);

  const cargarEstudiantes = async () => {
    const response = await fetch(
      `http://localhost:4000/listaestudiantes/${gid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setEstudiantes(data);
  };

  //Eliminar un estudiante
  const HandleDelete = (info) => {
    try {
      const estudianteId = info.row.getValue("id");

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
          fetch(`http://localhost:4000/estudiante/${estudianteId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            if (response.status === 204) {
              Swal.fire(
                "Estudiante Eliminado",
                "El estudiante, ha sido eliminado correctamente",
                "success"
              );

              cargarEstudiantes();
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

  //Actualizar un estudiante
  const HandleEdit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:4000/estudiante/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.message === "Datos no actualizados") {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ocurrio un error, no se puedieron actualizar los datos",
        });
      }

      Swal.fire(
        "Estudiante actualizado",
        "El estudiante, ha sido actualizado correctamente",
        "success"
      );

      cargarEstudiantes();

      handleClosenME();
    } catch (error) {
      console.log(error);
    }
  };

  //Cambiar contraseña
  const HandleEditContraseña = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/cuenta/", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const dataR = response.json();

      if (dataR.message) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${dataR.message}`,
        });
      }

      Swal.fire(
        "Contraseña actualizada",
        "La contraseña, ha sido actualizada correctamente",
        "success"
      );

      cargarEstudiantes();
      handleCloseMCC();
    } catch (error) {
      console.log(error);
    }
  };

  function cargarEstudiante(info) {
    const estudianteSelect = info.row.original;
    estudiante.setValues({
      id: estudianteSelect.id,
      nombres: estudianteSelect.nombre,
      apellidos: estudianteSelect.apellido,
      genero: estudianteSelect.genero,
      telefono: estudianteSelect.telefono,
      correo: estudianteSelect.email,
      barrio: estudianteSelect.barrio,
      direccion: estudianteSelect.direccion,
      gid: gid,
    });
  }

  function cargarCuenta(info) {
    const cuentaSelect = info.row.original;
    cuenta.setValues({
      id: cuentaSelect.cuenta_id,
      usuario: cuentaSelect.usuario,
      contraseña: "",
      Rcontraseña: "",
    });
  }

  //Manejo del modal - Permisos
  const handleOpenMP = (info) => {
    cargarCuenta(info);
    setOpenMP(true);
  };

  const handleCloseMP = (info) => {
    cuenta.resetForm();
    setOpenMP(false);
  };

  //Manejo del modal - Crear estudiante
  const handleOpenMC = () => setOpenMC(!openMC);

  //Manejo del modal - Ver estudiante
  const handlerMV = () => setOpenMV(!openMV);

  //Manejo del modal - Cambiar contraseña
  const handleOpenMCC = (info) => {
    cargarCuenta(info);
    setOpenMCC(true);
  };
  const handleCloseMCC = () => {
    cuenta.resetForm();
    setOpenMCC(false);
    setMostrarContraseña(false);
  };

  const handleOpenMV = (info) => {
    cargarEstudiante(info);
    setOpenMV(true);
  };
  const handleClosenMV = () => {
    estudiante.resetForm();
    setOpenMV(false);
  };

  //Manejo del modal - Editar estudiante
  const handlerME = () => setOpenME(!openME);

  const handleOpenME = (info) => {
    cargarEstudiante(info);
    setOpenME(true);
  };
  const handleClosenME = () => {
    estudiante.resetForm();
    setOpenME(false);
  };

  return (
    <div className="w-full ">
      <Titulo titulo={`Gestion de estudiantes - Grado ${gid}`}></Titulo>
      <DataTable
        columnsPdf={columnsPdf}
        tituloPdf={"Estudiantes"}
        nombreArchivo={"Estudiantes"}
        columns={column}
        Data={estudiantes}
        nombreBR={"Registrar"}
        onclickBR={handleOpenMC}
        iconoBR={<BsFillPersonPlusFill className="ml-1.5" size={20} />}
      ></DataTable>

      {/* Modal - permisos */}
      <Fragment>
        <Dialog size="sm" className="" open={openMP}>
          <Permisos cuenta_id={cuenta.values.id} setModal={setOpenMP} />

          <DialogFooter className="mr-1">
            <button
              className="px-4 py-1 text-black bg-gray-300 border-2 rounded-lg "
              onClick={handleCloseMP}
            >
              <span>Cerrar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - cambiar contraseña */}
      <Fragment>
        <Dialog size="xs" className="min-w-fit min-h-fit" open={openMCC}>
          <DialogBody className="p-0 pt-1">
            <Titulo titulo={"Cambiar contraseña"}></Titulo>
            <div className="mt-6">
              <div className="mx-4 mt-4 space-y-2.5 ">
                <h2 className="">
                  <strong className="font-bold">Usuario:</strong>{" "}
                  {cuenta.values.usuario}
                </h2>

                <div>
                  <Input
                    size="lg"
                    type={mostrarContraseña ? "text" : "password"}
                    label="Contraseña"
                    value={cuenta.values.contraseña}
                    name="contraseña"
                    onChange={cuenta.handleChange}
                    onBlur={cuenta.handleBlur}
                    error={
                      cuenta.errors.contraseña && cuenta.touched.contraseña
                    }
                  ></Input>
                  {cuenta.errors.contraseña && cuenta.touched.contraseña ? (
                    <div className="-mt.0.5 text-sm text-red-500">
                      {cuenta.errors.contraseña}
                    </div>
                  ) : null}
                </div>

                <div>
                  <Input
                    className=""
                    size="lg"
                    type={mostrarContraseña ? "text" : "password"}
                    label="Confirmación"
                    value={cuenta.values.Rcontraseña}
                    name="Rcontraseña"
                    onChange={cuenta.handleChange}
                    onBlur={cuenta.handleBlur}
                    error={
                      cuenta.errors.Rcontraseña && cuenta.touched.Rcontraseña
                    }
                  ></Input>
                  {cuenta.errors.Rcontraseña && cuenta.touched.Rcontraseña ? (
                    <div className="-mt.0.5 text-sm text-red-500">
                      {cuenta.errors.Rcontraseña}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex items-center mt-2 ml-5">
                <input
                  type="checkbox"
                  className=""
                  onChange={() => setMostrarContraseña(!mostrarContraseña)}
                  checked={mostrarContraseña ? true : false}
                />
                <label className="ml-2 text-sm">Mostrar contraseña</label>
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="mt-4">
            <Button
              size="sm"
              variant="gradient"
              className="mr-2"
              color="red"
              onClick={handleCloseMCC}
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              type="submit"
              variant="gradient"
              color="blue"
              onClick={cuenta.handleSubmit}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - ver estudiante */}
      <Fragment>
        <Dialog size="md" open={openMV} className="min-w-fit">
          <Titulo titulo={"Información Articulo"}> </Titulo>

          <DialogBody className="p-0 mx-6 mt-6 ">
            <div className="px-2 space-y-2 ">
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Identificación</h2>{" "}
                <h3 className="w-full">{estudiante.values.id} </h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Nombres:</h2>{" "}
                <h3 className="w-full">{estudiante.values.nombres}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Apellidos:</h2>{" "}
                <h3 className="w-full">{estudiante.values.apellidos}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Genero:</h2>{" "}
                <h3 className="w-full">{estudiante.values.genero}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Telefono:</h2>{" "}
                <h3 className="w-full ">{estudiante.values.telefono}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Email:</h2>{" "}
                <h3 className="w-full ">{estudiante.values.correo}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Barrio:</h2>{" "}
                <h3 className="w-full ">{estudiante.values.barrio}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Dirección:</h2>{" "}
                <h3 className="w-full ">{estudiante.values.direccion}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Grado:</h2>{" "}
                <h3 className="w-full ">{estudiante.values.gid}</h3>
              </div>
            </div>
          </DialogBody>
          <DialogFooter className="mr-1">
            <button
              className="px-4 py-1 text-black bg-gray-300 border-2 rounded-lg "
              onClick={handleClosenMV}
            >
              <span>Cerrar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - Crear Estudiante */}
      <Fragment>
        <Dialog
          size="sm"
          open={openMC}
          handler={handleOpenMC}
          className="min-w-fit"
        >
          <div className="flex items-center justify-between ">
            <DialogHeader>Crear Estudiante</DialogHeader>
            <XMarkIcon
              className="w-5 h-5 mr-3 cursor-pointer"
              onClick={handleOpenMC}
            />
          </div>

          <RegistroEstudiante
            cargarEstudiantes={cargarEstudiantes}
            setOpen={setOpenMC}
            gid={gid}
          ></RegistroEstudiante>
        </Dialog>
      </Fragment>

      {/* Modal - Editar Estudiante */}
      <Fragment>
        <Dialog
          size="xs"
          open={openME}
          handler={handlerME}
          className="min-w-fit"
        >
          <div className="flex items-center justify-between ">
            <DialogHeader>Editar Estudiante</DialogHeader>
            <XMarkIcon
              className="w-5 h-5 mr-3 cursor-pointer"
              onClick={handleClosenME}
            />
          </div>

          <div className="flex items-center justify-center w-full ">
            <div className="w-full px-5 py-3 bg-white rounded-md shadow-md">
              <div className="">
                <form className="grid gap-3">
                  <Input
                    type="text"
                    value={estudiante.values.nombres}
                    label="Nombres"
                    name="nombres"
                    onChange={estudiante.handleChange}
                    onBlur={estudiante.handleBlur}
                  />
                  <Input
                    type="text"
                    value={estudiante.values.apellidos}
                    label="Apellidos"
                    name="apellidos"
                    onChange={estudiante.handleChange}
                    onBlur={estudiante.handleBlur}
                  />

                  <select
                    value={estudiante.values.genero}
                    onChange={estudiante.handleChange}
                    onBlur={estudiante.handleBlur}
                    name="genero"
                    className="w-full py-2 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200"
                  >
                    <option value={""} disabled defaultValue={true}>
                      Seleccione una opción
                    </option>
                    <option value="MASCULINO">MASCULINO</option>
                    <option value="FEMENINO">FEMENINO</option>
                  </select>
                  <Input
                    value={estudiante.values.telefono}
                    label="Telefono"
                    name="telefono"
                    type="text"
                    onChange={estudiante.handleChange}
                    onBlur={estudiante.handleBlur}
                  />
                  <Input
                    value={estudiante.values.correo}
                    label="Correo"
                    name="correo"
                    type="text"
                    onChange={estudiante.handleChange}
                    onBlur={estudiante.handleBlur}
                  />

                  <Input
                    value={estudiante.values.barrio}
                    label="Barrio"
                    name="barrio"
                    type="text"
                    onChange={estudiante.handleChange}
                    onBlur={estudiante.handleBlur}
                  />
                  <Input
                    value={estudiante.values.direccion}
                    label="Dirección"
                    name="direccion"
                    type="text"
                    onChange={estudiante.handleChange}
                    onBlur={estudiante.handleBlur}
                  />
                </form>

                <DialogFooter className="p-0 mt-4 space-x-2">
                  <Button
                    variant="gradient"
                    color="red"
                    onClick={handleClosenME}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="gradient"
                    color="blue"
                    onClick={estudiante.handleSubmit}
                  >
                    Guardar Cambios
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </div>
        </Dialog>
      </Fragment>
    </div>
  );
};
