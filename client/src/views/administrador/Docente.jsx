import { Fragment, useState } from "react";
import DataTable from "./DataTable";
import { defaultData } from "./defaultData";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { RegistroDocente } from "./RegistroDocente";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  BsFillFileTextFill,
  BsFillPersonFill,
  BsFillPersonVcardFill,
  BsFillPersonPlusFill,
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

const columnsPdf = [
  { header: "Nombres", dataKey: "name" },
  { header: "Apellidos", dataKey: "lastName" },
];

export const Docente = () => {
  const column = [
    {
      accessorKey: "id",
      header: () => <span>Cedula</span>,
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "name",
      header: () => <span>Nombres</span>,
    },
    {
      accessorKey: "lastName",
      header: () => <span>Apellidos</span>,
    },

    {
      accessorKey: "asignaciones",
      header: "Asignaciones",
      cell: (info) => {
        return (
          <div className="flex items-center">
            <button
              className="flex border-1 bg-yellow-600 text-white py-1 px-3"
              onClick={handleOpenMI}
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
          <div className="flex items-center">
            <button className="flex border-1 bg-green-600 text-white py-1 px-3">
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
      accessorKey: "carnet",
      header: "Carnet",
      cell: (info) => {
        return (
          <div className="flex items-center">
            <button className="flex border-1 bg-blue-600 text-white py-1 px-3">
              Carnet
            </button>
            <div className="max-h-full bg-blue-700 ">
              <BsFillPersonVcardFill className=" text-white m-1.5" size={20} />
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
              onClick={handleOpenMP}
              className="text-white bg-cyan-600 p-0.5 rounded-sm cursor-pointer"
              size={25}
            />
            <AiFillEdit
              className="text-white bg-gray-600 p-0.5 rounded-sm cursor-pointer"
              size={25}
            />
            <AiFillDelete
              className="text-white bg-red-600 p-0.5 rounded-sm cursor-pointer"
              size={25}
            />
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  const [openMI, setOpenMI] = useState(false);
  const handleOpenMI = () => setOpenMI(!openMI);

  const [openMP, setOpenMP] = useState(false);
  const handleOpenMP = () => setOpenMP(!openMP);

  const [openMC, setOpenMC] = useState(false);
  const handleOpenMC = () => setOpenMC(!openMC);

  return (
    <div className="h-screen w-full ">
      <NavbarApp></NavbarApp>

      <Titulo titulo={"Docentes"}></Titulo>
      <DataTable
        columnsPdf={columnsPdf}
        tituloPdf={"Docentes"}
        nombreArchivo={"tablaDocentes"}
        columns={column}
        Data={defaultData}
        nombreBR={"Registrar"}
        onclickBR={handleOpenMC}
        iconoBR={<BsFillPersonPlusFill className="ml-1.5" size={20} />}
      ></DataTable>

      {/* Modal - designacion de asignaturas */}
      <Fragment>
        <Dialog
          size="md"
          className="min-w-fit"
          open={openMI}
          handler={handleOpenMI}
        >
          <DialogBody className="p-0 pt-4">
            <Titulo titulo={"Designacion de asignaturas"}></Titulo>
            <div className="mt-6">
              <h2 className="text-justify text-sm px-6">
                Se han designado las siguientes asignaturas con su respectivo
                grado al docente.
              </h2>

              <div className="flex justify-center  border-b-2 mx-10 lg:mx-20 mt-6  pb-1">
                <div className="flex items-center mr-10 ">
                  <ImBooks size={30} className="mr-2" />
                  Matematicas
                </div>
                <div className="flex items-center ml-10">
                  <HiUserGroup size={30} className="mr-2" /> Grado
                </div>
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <button
              className=" bg-gray-300 text-black border-2 rounded-lg  mt-4 py-1 px-4"
              onClick={handleOpenMI}
            >
              <span>Cerrar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - informacion docente */}
      <Fragment>
        <Dialog
          size="md"
          className="min-w-fit"
          open={openMP}
          handler={handleOpenMP}
        >
          <DialogBody className="p-0 pt-4">
            <Titulo titulo={"Información Docente"}></Titulo>
            <div className="mt-6">
              <p className="ml-6 font-semibold">Identificación:</p>
              <p className="ml-6 font-semibold">Nombres:</p>
              <p className="ml-6 font-semibold">Apellidos:</p>
              <p className="ml-6 font-semibold">Telefono:</p>
              <p className="ml-6 font-semibold">Correo:</p>
              <p className="ml-6 font-semibold">Fecha de nacimiento:</p>
              <p className="ml-6 font-semibold">Genero:</p>
              <p className="ml-6 font-semibold">Dirección:</p>
            </div>
          </DialogBody>
          <DialogFooter>
            <button
              className=" bg-gray-300 text-black border-2 rounded-lg  mt-4 py-1 px-4"
              onClick={handleOpenMP}
            >
              <span>Cerrar</span>
            </button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Modal - Crear Docente */}
      <Fragment>
        <Dialog size="md" open={openMC} handler={handleOpenMC} className="min-w-fit">
          <div className="flex items-center justify-between ">
            <DialogHeader>Crear Docente</DialogHeader>
            <XMarkIcon
              className="mr-3 h-5 w-5 cursor-pointer"
              onClick={handleOpenMC}
            />
          </div>

          <RegistroDocente></RegistroDocente>
        </Dialog>
      </Fragment>
    </div>
  );
};
