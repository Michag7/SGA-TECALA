import { Fragment, useState, useEffect } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { getToken } from "../../auth/auth";
import DataTable from "./DataTable";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { RegistroDocente } from "./RegistroDocente";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Button,
} from "@material-tailwind/react";
import {
  BsFillFileTextFill,
  BsFillPersonFill,
  BsFillPersonVcardFill,
  BsFillPersonPlusFill,
  BsPersonFillGear,
} from "react-icons/bs";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillTool,
} from "react-icons/ai";

import { ImBooks } from "react-icons/im";
import { HiUserGroup } from "react-icons/hi";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Permisos } from "../../components/Permisos";

const columnsPdf = [
  { header: "Identificación", dataKey: "id" },
  { header: "Nombres", dataKey: "nombre" },
  { header: "Apellidos", dataKey: "apellido" },
  { header: "Genero", dataKey: "genero" },
  { header: "Email", dataKey: "email" },
  { header: "Ciudad", dataKey: "ciudad" },
  { header: "Barrio", dataKey: "barrio" },
  { header: "direccion", dataKey: "direccion" },
];

export const Docente = () => {
  //Obtener el token
  const token = getToken();

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
      accessorKey: "asignaciones",
      header: "Asignaciones",
      cell: (info) => {
        return (
          <div className="flex items-center">
            <button
              className="flex px-3 py-1 text-white bg-yellow-600 border-1"
              onClick={() => handleOpenMI(info)}
            >
              Informe
            </button>
            <div className="max-h-full bg-yellow-700 ">
              <BsFillFileTextFill className=" text-white m-1.5" size={20} />
            </div>
          </div>
        );
      },
      enableSorting: false,
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
              Recuperar
            </button>
            <div className="max-h-full bg-green-700 ">
              <AiFillTool className=" text-white m-1.5" size={20} />
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

  const [docentes, setDocentes] = useState([]);
  const [asignaturasDocente, setAsignaturasDocente] = useState([]);
  const [existAsignaturas, setExistAsignaturas] = useState(false);

  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  const [openMP, setOpenMP] = useState(false);
  const [openMI, setOpenMI] = useState(false);
  const [openMC, setOpenMC] = useState(false);
  const [openMV, setOpenMV] = useState(false);
  const [openME, setOpenME] = useState(false);
  const [openMCC, setOpenMCC] = useState(false);

  //Docente
  const [docente, setDocente] = useState({
    id: "",
    nombres: "",
    apellidos: "",
    edad: "",
    genero: "",
    telefono: "",
    correo: "",
    ciudad: "",
    barrio: "",
    direccion: "",
    username: "",
    password: "",
    Rpassword: "",
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
    cargarDocentes();
  }, []);

  const cargarDocentes = async () => {
    const response = await fetch(`http://localhost:4000/docentes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setDocentes(data);
  };

  const cargarAsignaturasDocente = async (did) => {
    const response = await fetch(`http://localhost:4000/asignaturas/${did}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.message) {
      setExistAsignaturas(false);
      return;
    }

    setExistAsignaturas(true);
    setAsignaturasDocente(data);
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

      handleCloseMCC();

      Swal.fire(
        "Contraseña actualizada",
        "La contraseña, ha sido actualizada correctamente",
        "success"
      );
      cargarDocentes();
    } catch (error) {
      console.log(error);
    }
  };

  //Manejo de los cambios en los inputs
  const HandleChange = (e) => {
    e.preventDefault();
    setDocente({ ...docente, [e.target.name]: e.target.value });
  };

  //Select genero
  const [selectedOption, setSelectedOption] = useState(docente.genero);
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    setDocente({
      ...docente,
      genero: event.target.value,
    });
  };

  function cargarDocente(info) {
    const docenteSelect = info.row.original;
    setDocente({
      id: docenteSelect.id,
      nombres: docenteSelect.nombre,
      apellidos: docenteSelect.apellido,
      genero: docenteSelect.genero,
      telefono: docenteSelect.telefono,
      correo: docenteSelect.email,
      ciudad: docenteSelect.ciudad,
      barrio: docenteSelect.barrio,
      direccion: docenteSelect.direccion,
    });

    setSelectedOption(docente.genero);

    // formik.setValues({
    //   ...formik.values,
    //   id: ArticuloS.iid,
    //   nombre: ArticuloS.articulo_nombre,
    //   marca: ArticuloS.articulo_marca,
    //   estado: ArticuloS.articulo_estado,
    //   descripcion: ArticuloS.articulo_descripcion,
    // });
  }

  function LimpiarCampos() {
    setDocente({
      id: "",
      nombres: "",
      apellidos: "",
      edad: "",
      genero: "",
      telefono: "",
      correo: "",
      ciudad: "",
      barrio: "",
      direccion: "",
      username: "",
      password: "",
      Rpassword: "",
    });

    // formik.setValues({
    //   ...formik.values,
    //   id: 0,
    //   nombre: "",
    //   marca: "",
    //   estado: "",
    //   descripcion: "",
    // });
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

  //Manejo del modal - Designacion de asignaturas

  const handleOpenMP = (info) => {
    cargarCuenta(info);
    setOpenMP(true);
  };

  const handleCloseMP = (info) => {
    cuenta.resetForm();
    setOpenMP(false);
  };

  //Manejo del modal - Designacion de asignaturas

  const handleOpenMI = (info) => {
    cargarAsignaturasDocente(info.row.original.id);
    setOpenMI(true);
  };
  const handleCloseMI = () => {
    setAsignaturasDocente([]);
    setExistAsignaturas(false);
    setOpenMI(false);
  };

  //Manejo del modal - Crear docente
  const handleOpenMC = () => setOpenMC(!openMC);

  //Manejo del modal - Ver docente

  const handlerMV = () => setOpenMV(!openMV);

  const handleOpenMV = (info) => {
    cargarDocente(info);
    setOpenMV(true);
  };
  const handleClosenMV = () => {
    LimpiarCampos();
    setOpenMV(false);
  };

  //Manejo del modal - Editar docente

  const handlerME = () => setOpenME(!openME);

  const handleOpenME = (info) => {
    cargarDocente(info);
    setOpenME(true);
  };
  const handleClosenME = () => {
    LimpiarCampos();
    setOpenME(false);
  };

  //Eliminar un docente
  const HandleDelete = (info) => {
    try {
      const docenteId = info.row.getValue("id");

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
          fetch(`http://localhost:4000/docente/${docenteId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => {
            if (response.status == 200) {
              Swal.fire(
                "Docente Eliminado",
                "El docente, ha sido eliminado correctamente",
                "success"
              );

              cargarDocentes();
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

  //Actualizar un docente
  const HandleEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/docente/${docente.id}`,
        {
          method: "PUT",
          body: JSON.stringify(docente),
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

        cargarDocentes();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error!",
        });
      }

      handleClosenME();
    } catch (error) {
      console.log(error);
    }
  };

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
  return (
    <div className="w-full h-screen ">
      <NavbarApp></NavbarApp>

      <Titulo titulo={"Docentes"}></Titulo>
      <DataTable
        columnsPdf={columnsPdf}
        tituloPdf={"Docentes"}
        nombreArchivo={"Docentes"}
        columns={column}
        Data={docentes}
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

      {/* Modal - designacion de asignaturas */}
      <Fragment>
        <Dialog size="md" className="min-w-fit" open={openMI}>
          <DialogBody className="p-0 pt-4">
            <Titulo titulo={"Designacion de asignaturas"}></Titulo>
            <div className="mt-6">
              {existAsignaturas ? (
                <>
                  <h2 className="px-6 text-sm text-center">
                    Se han designado las siguientes asignaturas con su
                    respectivo grado al docente.
                  </h2>

                  {asignaturasDocente.map(({ a_nombre, gid }, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-center pb-1 mx-10 mt-6 border-b-2 lg:mx-20"
                      >
                        <div className="flex items-center mr-10 ">
                          <ImBooks size={30} className="mr-2" />
                          {a_nombre}
                        </div>
                        <div className="flex items-center ml-10">
                          <HiUserGroup size={30} className="mr-2" /> Grado {gid}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <h2 className="px-6 text-sm text-center">
                  El docente no tiene asignaturas designadas.
                </h2>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <button
              className="px-4 py-1 mt-4 text-black bg-gray-300 border-2 rounded-lg "
              onClick={handleCloseMI}
            >
              <span>Cerrar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - ver docente */}
      <Fragment>
        <Dialog
          size="md"
          open={openMV}
          handler={handlerMV}
          className="min-w-fit"
        >
          <Titulo titulo={"Información Articulo"}> </Titulo>

          <DialogBody className="p-0 mx-6 mt-6 ">
            <div className="px-2 space-y-2 ">
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Identificación</h2>{" "}
                <h3 className="w-full">{docente.id} </h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Nombres:</h2>{" "}
                <h3 className="w-full">{docente.nombres}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Apellidos:</h2>{" "}
                <h3 className="w-full">{docente.apellidos}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Genero:</h2>{" "}
                <h3 className="w-full">{docente.genero}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Telefono:</h2>{" "}
                <h3 className="w-full ">{docente.telefono}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Email:</h2>{" "}
                <h3 className="w-full ">{docente.correo}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Ciudad:</h2>{" "}
                <h3 className="w-full ">{docente.ciudad}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Barrio:</h2>{" "}
                <h3 className="w-full ">{docente.barrio}</h3>
              </div>
              <div className="flex w-full">
                <h2 className="w-full font-semibold">Dirección:</h2>{" "}
                <h3 className="w-full ">{docente.direccion}</h3>
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

      {/* Modal - Crear Docente */}
      <Fragment>
        <Dialog
          size="sm"
          open={openMC}
          handler={handleOpenMC}
          className="min-w-fit"
        >
          <div className="flex items-center justify-between ">
            <DialogHeader>Crear Docente</DialogHeader>
            <XMarkIcon
              className="w-5 h-5 mr-3 cursor-pointer"
              onClick={handleOpenMC}
            />
          </div>

          <RegistroDocente
            cargarDocentes={cargarDocentes}
            setOpen={setOpenMC}
          ></RegistroDocente>
        </Dialog>
      </Fragment>

      {/* Modal - Editar Docente */}
      <Fragment>
        <Dialog
          size="xs"
          open={openME}
          handler={handlerME}
          className="min-w-fit"
        >
          <div className="flex items-center justify-between ">
            <DialogHeader>Editar Docente</DialogHeader>
            <XMarkIcon
              className="w-5 h-5 mr-3 cursor-pointer"
              onClick={handleClosenME}
            />
          </div>

          <div className="flex items-center justify-center w-full ">
            <div className="w-full p-8 bg-white rounded-md shadow-md">
              <div className="mt-2">
                <div className="flex flex-col mb-2 space-y-2">
                  <Input
                    value={docente.nombres}
                    label="Nombres"
                    name="nombres"
                    onChange={HandleChange}
                  />
                  <Input
                    value={docente.apellidos}
                    label="Apellidos"
                    name="apellidos"
                    onChange={HandleChange}
                  />
                  {/* <Input
                    value={docente.edad}
                    label="Edad"
                    name="edad"
                    type="number"
                    onChange={HandleChange}
                  /> */}
                  <select
                    value={docente.genero}
                    onChange={HandleChange}
                    name="genero"
                    className="w-full py-2 font-normal border-2 rounded-md text-blue-gray-700 border-blue-gray-100"
                  >
                    <option value={""} disabled>
                      Seleccione una opción
                    </option>
                    <option value="MASCULINO">MASCULINO</option>
                    <option value="FEMENINO">FEMENINO</option>
                  </select>
                  <Input
                    value={docente.telefono}
                    label="Telefono"
                    name="telefono"
                    type="number"
                    onChange={HandleChange}
                  />
                  <Input
                    value={docente.correo}
                    label="Correo"
                    name="correo"
                    type="email"
                    onChange={HandleChange}
                  />
                  <Input
                    value={docente.ciudad}
                    label="Ciudad"
                    name="ciudad"
                    onChange={HandleChange}
                  />
                  <Input
                    value={docente.barrio}
                    label="Barrio"
                    name="barrio"
                    onChange={HandleChange}
                  />
                  <Input
                    value={docente.direccion}
                    label="Dirección"
                    name="direccion"
                    onChange={HandleChange}
                  />
                </div>

                <DialogFooter className="p-0 mt-4 space-x-2">
                  <Button color="red" onClick={handleClosenME}>
                    Cancelar
                  </Button>
                  <Button variant="gradient" color="blue" onClick={HandleEdit}>
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
