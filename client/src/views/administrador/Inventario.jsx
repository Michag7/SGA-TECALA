import React, { useEffect, useState, Fragment } from "react";
import classNames from "classnames";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Card,
} from "@material-tailwind/react";
import DataTable from "./DataTable";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiOutlineDown,
} from "react-icons/ai";
import { LuPackagePlus } from "react-icons/lu";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Login } from "../../auth/Login";
import { getToken, isAuthenticated } from "../../auth/auth";

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
              onClick={() => HandleView(info)}
              className="text-white bg-cyan-600 p-0.5 rounded-sm cursor-pointer"
              size={25}
            />
            <AiFillEdit
              onClick={() => HandleObtME(info)}
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

  //Estado el cual contiene un Articulo
  const [articulo, setArticulo] = useState({
    id: 0,
    nombre: "",
    marca: "",
    estado: "",
    descripcion: "",
    seccion: seccion,
  });

  //Validador de inputs
  const formik = useFormik({
    initialValues: {
      id: 0,
      nombre: "",
      marca: "",
      estado: "",
      descripcion: "",
      seccion: seccion,
    },

    validationSchema: yup.object({
      nombre: yup.string().required(),
      marca: yup.string().required(),
      estado: yup.string().required(),
      descripcion: yup.string().required(),
    }),

    onSubmit: (formData) => {
      if (openME) {
        HandleEdit(formData);
      } else {
        HandleSubmit(formData);
      }
    },
  });

  //Funcion que limpia el estado articulo
  function LimpiarCampos() {
    setArticulo({
      id: 0,
      nombre: "",
      marca: "",
      estado: "",
      descripcion: "",
      seccion: seccion,
    });

    formik.setValues({
      ...formik.values,
      id: 0,
      nombre: "",
      marca: "",
      estado: "",
      descripcion: "",
    });
  }

  //Obtener el token
  const token = getToken();

  //Mostrar el inventario en la tabla
  //Estado el cual contiene todos los articulos
  const [inventario, setInventario] = useState([]);
  const cargarInventario = async () => {
    const response = await fetch(
      `http://localhost:4000/inventario/${seccion}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(isAuthenticated());
    const data = await response.json();
    setInventario(data);
  };
  useEffect(() => {
    cargarInventario();
  }, []);

  //Capturar los valores de los campos
  const HandleChange = (e) => {
    e.preventDefault();

    setArticulo({ ...articulo, [e.target.name]: e.target.value });
  };

  //Obtener id articulo - RUD
  function ArticuloSeleccionado(info) {
    const valor = info.row.getValue("iid");

    return valor;
  }

  //Añadir articulo
  //Estado y funcion el cual abre y cierra la ventana modal de Añadir articulo
  const [openMC, setOpenMC] = useState(false);
  const handleOpenMC = () => setOpenMC(!openMC);
  const HandleMC = () => {
    setOpenMC(!openMC);
    // LimpiarCampos();
  };
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

      if (response.status == 200) {
        Swal.fire(
          "Articulo actualizado",
          "El articulo, ha sido actualizado correctamente",
          "success"
        );

        cargarInventario();
        HandleMC();
        formik.handleReset();
      }

      if (response.status != 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error!",
        });
        HandleMC();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar un articulo
  const HandleDelete = (info) => {
    try {
      const ArticuloS = ArticuloSeleccionado(info);

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

  //Actualizar un articulo
  const [openME, setOpenME] = useState(false);
  const handleOpenME = () => setOpenME(!openME);
  const HandleME = () => {
    setOpenME(!openME);
    LimpiarCampos();
  };

  const HandleObtME = (info) => {
    setOpenME(true);
    ObtenerArticulo(info);
  };

  const HandleEdit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:4000/inventario/${data.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}, "Content-Type": "application/json"`,
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
        HandleME();
      }

      if (response.status != 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error!",
        });
        HandleME();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Ver un articulo
  const [openMV, setOpenMV] = useState(false);
  const HandleMV = () => {
    setOpenMV(!openMV);
    LimpiarCampos();
  };

  function ObtenerArticulo(info) {
    const ArticuloS = info.row.original;
    setArticulo({
      id: ArticuloS.iid,
      nombre: ArticuloS.articulo_nombre,
      marca: ArticuloS.articulo_marca,
      estado: ArticuloS.articulo_estado,
      descripcion: ArticuloS.articulo_descripcion,
      seccion: seccion,
    });

    formik.setValues({
      ...formik.values,
      id: ArticuloS.iid,
      nombre: ArticuloS.articulo_nombre,
      marca: ArticuloS.articulo_marca,
      estado: ArticuloS.articulo_estado,
      descripcion: ArticuloS.articulo_descripcion,
    });
  }
  const HandleView = (info) => {
    setOpenMV(true);
    ObtenerArticulo(info);
  };

  return (
    <>
      <NavbarApp></NavbarApp>
      <Titulo titulo={title}></Titulo>

      <DataTable
        columns={column}
        Data={inventario}
        nombreArchivo={"Inventario"}
        columnsPdf={columnsPdf}
        tituloPdf={"Hola"}
        iconoBR={<LuPackagePlus size={20} className="ml-1.5" />}
        nombreBR={"Añadir"}
        onclickBR={handleOpenMC}
      ></DataTable>

      {/* Modal - Crear artitulo */}
      <Fragment>
        <Dialog
          size="xs"
          open={openMC}
          handler={HandleMC}
          className="min-w-fit"
        >
          <div className="flex items-center justify-between">
            <DialogHeader>Añadir Articulo</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={HandleMC} />
          </div>
          <DialogBody divider>
            <div className="grid gap-6">
              <Input
                label="Nombre"
                name="nombre"
                type="text"
                onChange={formik.handleChange}
                error={
                  formik.errors.nombre ? formik.errors.nombre.toString() : ""
                }
              />

              <Input
                label="Marca"
                name="marca"
                type="text"
                onChange={formik.handleChange}
                error={
                  formik.errors.marca ? formik.errors.marca.toString() : ""
                }
              />

              <div className="relative inline-flex">
                <select
                  onChange={formik.handleChange}
                  name="estado"
                  error={
                    formik.errors.estado ? formik.errors.estado.toString() : ""
                  }
                  className="block appearance-none w-full bg-white border border-gray-400 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-blue-500 focus:bg-white focus:border-blue-500"
                >
                  <option disabled>Seleccione una opción</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Dañado">Dañado</option>
                  <option value="Regular">Regular</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 focus:text-blue-500">
                  <AiOutlineDown size={12} />
                </div>
              </div>

              <Textarea
                label="Descripcion"
                name="descripcion"
                onChange={formik.handleChange}
                error={
                  formik.errors.descripcion
                    ? formik.errors.descripcion.toString()
                    : ""
                }
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="outlined" color="red" onClick={HandleMC}>
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
        <Dialog
          size="md"
          open={openMV}
          handler={HandleMV}
          className="min-w-fit"
        >
          <Titulo titulo={"Información Articulo"}> </Titulo>

          <DialogBody className="p-0 mx-6 mt-6 ">
            <Card className="p-2 space-y-2">
              <div className="flex w-full">
                <h2 className="font-semibold w-full">ID:</h2>{" "}
                <h3 className="w-full">{formik.values.id} </h3>
              </div>
              <div className="flex w-full">
                <h2 className="font-semibold w-full">Nombre articulo:</h2>{" "}
                <h3 className="w-full">{formik.values.nombre}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="font-semibold w-full">Marca</h2>{" "}
                <h3 className="w-full">{formik.values.marca}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="font-semibold w-full">Estado:</h2>{" "}
                <h3 className="w-full">{formik.values.estado}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="font-semibold w-full">Descripción:</h2>{" "}
                <h3 className="w-full ">{formik.values.descripcion}</h3>
              </div>
            </Card>
          </DialogBody>
          <DialogFooter className="mr-1">
            <button
              className=" bg-gray-300 text-black border-2 rounded-lg  py-1 px-4"
              onClick={HandleMV}
            >
              <span>Cerrar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - Editar articulo */}
      <Fragment>
        <Dialog
          size="xs"
          open={openME}
          handler={HandleME}
          className="min-w-fit"
        >
          <div className="flex items-center justify-between">
            <DialogHeader>EDITAR ARTICULO</DialogHeader>
            <XMarkIcon className="mr-3 h-5 w-5" onClick={HandleME} />
          </div>
          <DialogBody divider>
            <div className="grid gap-6">
              <Input
                value={formik.values.nombre}
                label="Nombre"
                name="nombre"
                type="text"
                onChange={formik.handleChange}
              />

              <Input
                value={formik.values.marca}
                label="Marca"
                name="marca"
                type="text"
                onChange={formik.handleChange}
              />

              <div className="relative inline-flex">
                <select
                  onChange={formik.handleChange}
                  value={formik.values.estado}
                  name="estado"
                  className="block appearance-none w-full bg-white border border-gray-400 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-blue-500 focus:bg-white focus:border-blue-500"
                >
                  <option disabled>Seleccione una opción</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Dañado">Dañado</option>
                  <option value="Regular">Regular</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 focus:text-blue-500">
                  <AiOutlineDown size={12} />
                </div>
              </div>

              <Textarea
                label="Descripcion"
                name="descripcion"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
              />
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button variant="outlined" color="red" onClick={HandleME}>
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
