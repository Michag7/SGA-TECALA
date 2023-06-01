import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { defaultData } from "./defaultData";
import classNames from "classnames";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { useLocation } from "react-router-dom";

const column = [
  {
    accessorKey: "name",
    header: () => <span>Nombre</span>,
    cell: (info) => <span className="font-bold">{info.getValue()}</span>,
  },
  {
    accessorKey: "lastName",
    header: () => <span>Apellidos</span>,
  },
  {
    accessorKey: "age",
    header: () => <span>Edad</span>,
  },
  {
    accessorKey: "status",
    header: () => <span>Estado</span>,
    cell: (info) => {
      return (
        <span
          className={classNames({
            "text-white px-2 rounded-full font-semibold": true,
            "bg-red-500": "Inactivo" === info.getValue(),
            "bg-green-500": "Activo" === info.getValue(),
          })}
        >
          {info.getValue()}
        </span>
      );
    },
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: (info) => {
      return (
        <div className="space-x-2">
          <button className="text-red-600">Eliminar</button>
          <button className="text-blue-600">Editar</button>
        </div>
      );
    },
    enableSorting: false,
  },
];

export const Inventario = () => {
  const [title, setTitle] = useState("");

  var location = useLocation();
  var pathnam = location.pathname;
  var parts = pathnam.substr(1).split("admin/inventario/");
  var salaS = "salasistemas";

  const cargarAux =  () => {
    if  (parts == salaS) { 
      setTitle("Sala sistemas #1");
    }
    if (parts == "salasistemas2") {
      setTitle("Sala sistemas #2");
    }
  };

  useEffect(() => {
    cargarAux();
  });

  return (
    <>
      <NavbarApp></NavbarApp>
      <Titulo titulo={parts}></Titulo>
      <DataTable columns={column} Data={defaultData}></DataTable>
    </>
  );
};
