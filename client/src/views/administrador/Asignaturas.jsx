import React from "react";
import { useParams } from "react-router";
import { Titulo } from "../../components/layout/Titulo";
import DataTable from "./DataTable";
import {
    AiFillDelete,
    AiFillEdit,
    AiFillEye,
    AiFillTool,
    AiFillBook
  } from "react-icons/ai";
  import {
    BsFillFileTextFill,
    BsFillPersonFill,
    BsFillPersonVcardFill,
    BsFillPersonPlusFill,
  } from "react-icons/bs";
import { defaultData } from "./defaultData";

export const Asignaturas = () => {
  const column = [
    {
      accessorKey: "aid",
      header: () => <span>id</span>,
      cell: (info) => <span className="font-bold">{info.getValue()}</span>,
    },
    {
      accessorKey: "a_name",
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
          <div className="flex items-center">
            <button
              className="flex px-3 py-1 text-white bg-green-600 border-1"
             
            >
              Horarios
            </button>
            <div className="max-h-full bg-green-700 ">
              <BsFillFileTextFill className=" text-white m-1.5" size={20} />
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

  const params = useParams();
  return (
    <div>
      <Titulo titulo={`Gestion de asignaturas - Grado ${params.gid}`} />

      <DataTable columns={column} Data={defaultData} nombreBR={"Añadir"} iconoBR={<AiFillBook className="ml-2"/>}/>
    </div>
  );
};
