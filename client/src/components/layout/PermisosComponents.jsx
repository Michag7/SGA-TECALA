import React from "react";

import { NavLink } from "react-router-dom";

import { AiOutlineBook } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FiFolder } from "react-icons/fi";

export const PermisoDocentes = () => {
  return (
    <li>
      <NavLink to={"docentes"} className="link">
        <BsPerson size={25} className="min-w-max" />
        Docentes
      </NavLink>
    </li>
  );
};

export const PermisoInventario = () => {
  return (
    <li>
      <NavLink to={"inventario"} className="link">
        <FiFolder size={25} className="min-w-max" />
        Inventarios
      </NavLink>
    </li>
  );
};

export const PermisoHistorialCA = () => {
  return (
    <li>
      <NavLink to={"control"} className="link">
        <RiBillLine size={25} className="min-w-max" />
        Historial de control
      </NavLink>
    </li>
  );
};

export const PermisoGrados = () => {
  return (
    <li>
      <NavLink to={"grados"} className="link">
        <AiOutlineBook size={25} className="min-w-max" />
        Grados
      </NavLink>
    </li>
  );
};
