import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { defaultData } from "./defaultData";
import classNames from "classnames";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import {
  BsFillFileTextFill,
  BsFillPersonFill,
  BsFillPersonVcardFill,
} from "react-icons/bs";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillTool,
} from "react-icons/ai";

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
          <button className="flex border-1 bg-yellow-600 text-white py-1 px-3">
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

const columnsPdf = [
  { header: "Nombres", dataKey: "name" },
  { header: "Apellidos", dataKey: "lastName" },
];

export const Docente = () => {
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
      ></DataTable>
    </div>
  );
};
