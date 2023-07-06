import React, { useEffect, useState, Fragment } from "react";
import classNames from "classnames";
import Swal from "sweetalert2";
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
} from "@material-tailwind/react";
import DataTable from "./DataTable";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
} from "react-icons/ai";
import { LuPackagePlus } from "react-icons/lu";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { getToken } from "../../auth/auth";

//Columnas las cual el archivo PDF contendra
const columnsPdf = [
  { header: "Id", dataKey: "iid" },
  { header: "Nombres", dataKey: "articulo_nombre" },
  { header: "Marca", dataKey: "articulo_marca" },
  { header: "Estado", dataKey: "articulo_estado" },
  { header: "Descripción", dataKey: "articulo_descripcion" },
];

export const Inventario = ({ seccion, title }) => {
  //Columnas de las tablas
  const column = [
    {
      accessorKey: "iid",
      header: () => <span>Id</span>,
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "articulo_nombre",
      header: () => <span>Nombre</span>,
    },
    {
      accessorKey: "articulo_marca",
      header: () => <span>Marca</span>,
    },
    {
      accessorKey: "articulo_estado",
      header: () => <span>Estado</span>,
      cell: (info) => {
        return (
          <span
            className={classNames({
              "text-white px-2 rounded-full font-semibold": true,
              "bg-red-500": "Dañado" === info.getValue(),
              "bg-green-500": "Nuevo" === info.getValue(),
              "bg-orange-500": "Regular" === info.getValue(),
            })}
          >
            {info.getValue()}
          </span>
        );
      },
    },
    {
      accessorKey: "articulo_descripcion",
      header: () => <span>Descripcion</span>,
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

  //Validador de inputs - formik
  const formik = useFormik({
    initialValues: {
      id: 0,
      nombre: "",
      marca: "",
      estado: "",
      descripcion: "",
      seccion: seccion,
    },

    validationSchema: Yup.object().shape({
      nombre: Yup.string()
        .matches(/^[a-zA-Z]+$/, {
          message: "El campo solo puede contener letras",
        })
        .required("El campo Nombre es requerido"),
      marca: Yup.string().required("El campo Marca es requerido"),
      estado: Yup.string().required("El selector Estado es requerido"),
      descripcion: Yup.string().required("El campo Descripción es requerido"),
    }),

    onSubmit: (data) => {
      if (openME) {
        HandleEdit(data);
      } else {
        HandleSubmit(data);
      }
    },
  });

  /**
   * * Funcion que obtiene el token del LocalStorage
   */
  const token = getToken();

  //Mostrar el inventario en la tabla
  //Estado el cual contiene todos los articulos
  const [inventario, setInventario] = useState([]);
  const cargarInventario = async () => {
    const response = await fetch(
      `http://localhost:4000/inventarios/${seccion}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setInventario(data);
  };
  useEffect(() => {
    cargarInventario();
  }, []);

  //Añadir articulo
  //Estado y funcion el cual abre y cierra la ventana modal de Añadir articulo
  const [openMC, setOpenMC] = useState(false);
  const handleOpenMC = () => setOpenMC(true);
  const handleCloseMC = () => {
    setOpenMC(false);
    formik.resetForm();
  };

  //Manejador del envio de datos - Añadir
  const HandleSubmit = async (data) => {
    try {
      setOpenMC(true);
      const response = await fetch("http://localhost:4000/inventario", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        Swal.fire(
          "Articulo añadido",
          "El articulo, ha sido añadido correctamente",
          "success"
        );

        cargarInventario();
        handleCloseMC();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error!",
        });
        handleCloseMC();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Ver un articulo
  const [openMV, setOpenMV] = useState(false);
  const handleOpenMV = (info) => {
    ObtenerArticulo(info);
    setOpenMV(true);
  };
  const handleCloseMV = () => {
    setOpenMV(false);
    formik.resetForm();
  };

  //Actualizar un articulo
  const [openME, setOpenME] = useState(false);
  const handleOpenME = (info) => {
    ObtenerArticulo(info);
    setOpenME(true);
  };
  const handleCloseME = () => {
    formik.resetForm();
    setOpenME(false);
  };

  //Manejador del envio de datos - Editar
  const HandleEdit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:4000/inventario/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status == 200) {
        Swal.fire(
          "Articulo actualizado",
          "El articulo, ha sido actualizado correctamente",
          "success"
        );

        cargarInventario();
        handleCloseME();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error!",
        });
        handleCloseME();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar un articulo
  const HandleDelete = (info) => {
    try {
      const ArticuloS = info.row.getValue("iid");

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
          fetch(`http://localhost:4000/inventario/${ArticuloS}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            if (response.status == 200) {
              Swal.fire(
                "Articulo Eliminado",
                "El articulo, ha sido eliminado correctamente",
                "success"
              );

              cargarInventario();
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ha ocurrido algun problemas!",
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Funcion que obtiene los datos del articulo
  function ObtenerArticulo(info) {
    const ArticuloS = info.row.original;

    formik.setValues({
      ...formik.values,
      id: ArticuloS.iid,
      nombre: ArticuloS.articulo_nombre,
      marca: ArticuloS.articulo_marca,
      estado: ArticuloS.articulo_estado,
      descripcion: ArticuloS.articulo_descripcion,
    });
  }

  return (
    <>
      <NavbarApp></NavbarApp>
      <Titulo titulo={title}></Titulo>

      <DataTable
        columns={column}
        Data={inventario}
        nombreArchivo={"Inventario"}
        columnsPdf={columnsPdf}
        tituloPdf={"Inventario"}
        iconoBR={<LuPackagePlus size={20} className="ml-1.5" />}
        nombreBR={"Añadir"}
        onclickBR={handleOpenMC}
      ></DataTable>

      {/* Modal - Crear artitulo */}
      <Fragment>
        <Dialog size="xs" open={openMC} className="min-w-fit">
          <div className="flex items-center justify-between">
            <DialogHeader>AÑADIR ARTICULO</DialogHeader>
            <XMarkIcon
              className="w-5 h-5 mr-3 cursor-pointer hover:text-red-500"
              onClick={handleCloseMC}
            />
          </div>
          <DialogBody divider>
            <form className="grid gap-5">
              <Input
                className="border-2"
                label="Nombre"
                name="nombre"
                type="text"
                error={formik.touched.nombre && formik.errors.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {formik.errors.nombre}
                </p>
              )}

              <Input
                label="Marca"
                name="marca"
                type="text"
                onChange={formik.handleChange}
                error={formik.touched.marca && formik.errors.marca}
                onBlur={formik.handleBlur}
              />
              {formik.touched.marca && formik.errors.marca && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {formik.errors.marca}
                </p>
              )}

              <select
                onChange={formik.handleChange}
                value={formik.values.estado}
                onBlur={formik.handleBlur}
                name="estado"
                className={`w-full px-0 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 m select-border select-md ${
                  formik.errors.estado && formik.touched.estado
                    ? "border-red-500 text-red-500"
                    : ""
                }`}
              >
                <option value={""} disabled defaultValue={true}>
                  Seleccione una opción
                </option>
                <option value="Nuevo">Nuevo</option>
                <option value="Dañado">Dañado</option>
                <option value="Regular">Regular</option>
              </select>
              {formik.touched.estado && formik.errors.estado && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {formik.errors.estado}
                </p>
              )}

              <Textarea
                label="Descripcion"
                name="descripcion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.descripcion && formik.errors.descripcion}
              />
              {formik.touched.descripcion && formik.errors.descripcion && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {formik.errors.descripcion}
                </p>
              )}
            </form>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="outlined" color="red" onClick={handleCloseMC}>
              Cancelar
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={formik.handleSubmit}
            >
              Añadir
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - Ver articulo */}
      <Fragment>
        <Dialog size="md" open={openMV} className="min-w-fit">
          <Titulo titulo={"Información Articulo"}> </Titulo>

          <DialogBody className="p-0 mx-6 mt-6 ">
            <div className="px-2 space-y-2 ">
              <div className="flex w-full">
                <h2 className="w-full font-semibold">ID:</h2>{" "}
                <h3 className="w-full">{formik.values.id} </h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Nombre articulo:</h2>{" "}
                <h3 className="w-full">{formik.values.nombre}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Marca</h2>{" "}
                <h3 className="w-full">{formik.values.marca}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Estado:</h2>{" "}
                <h3 className="w-full">{formik.values.estado}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Descripción:</h2>{" "}
                <h3 className="w-full ">{formik.values.descripcion}</h3>
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

      {/* Modal - Editar articulo */}
      <Fragment>
        <Dialog size="xs" open={openME} className="min-w-fit">
          <div className="flex items-center justify-between">
            <DialogHeader>EDITAR ARTICULO</DialogHeader>
            <XMarkIcon
              className="w-5 h-5 mr-3 cursor-pointer hover:text-red-500"
              onClick={handleCloseME}
            />
          </div>
          <DialogBody divider>
            <div className="grid gap-5">
              <Input
                value={formik.values.nombre}
                label="Nombre"
                name="nombre"
                type="text"
                onChange={formik.handleChange}
                error={formik.touched.nombre && formik.errors.nombre}
                onBlur={formik.handleBlur}
              />
              {formik.touched.nombre && formik.errors.nombre && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {formik.errors.nombre}
                </p>
              )}
              <Input
                value={formik.values.marca}
                label="Marca"
                name="marca"
                type="text"
                onChange={formik.handleChange}
                error={formik.touched.marca && formik.errors.marca}
                onBlur={formik.handleBlur}
              />
              {formik.touched.marca && formik.errors.marca && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {formik.errors.marca}
                </p>
              )}
              <select
                onChange={formik.handleChange}
                value={formik.values.estado}
                onBlur={formik.handleBlur}
                name="estado"
                className={`w-full px-0 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 m select-border select-md ${
                  formik.errors.estado && formik.touched.estado
                    ? "border-red-500 text-red-500"
                    : ""
                }`}
              >
                <option value={""} disabled selected>
                  Seleccione una opción
                </option>
                <option value="Nuevo">Nuevo</option>
                <option value="Dañado">Dañado</option>
                <option value="Regular">Regular</option>
              </select>
              {formik.touched.estado && formik.errors.estado && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {formik.errors.estado}
                </p>
              )}
              <Textarea
                label="Descripcion"
                name="descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                error={formik.touched.descripcion && formik.errors.descripcion}
                onBlur={formik.handleBlur}
              />
              {formik.touched.descripcion && formik.errors.descripcion && (
                <p className="ml-1 -mt-5 text-xs text-red-500 ">
                  {formik.errors.descripcion}
                </p>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="outlined" color="red" onClick={handleCloseME}>
              Cancelar
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={formik.handleSubmit}
            >
              Guardar Cambios
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </>
  );
};
