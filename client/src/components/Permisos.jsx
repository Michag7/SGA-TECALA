import React, { useEffect, useState, Fragment } from "react";
import { Titulo } from "./layout/Titulo";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Card,
  Checkbox,
  Button,
  Collapse,
  Typography,
  CardBody,
} from "@material-tailwind/react";
import { AiOutlineBook } from "react-icons/ai";
import {
  BsPerson,
  BsCheck2,
  BsPlus,
  BsPlusLg,
  BsCheckLg,
} from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FiFolder } from "react-icons/fi";
import { AiFillPlusCircle, AiOutlineArrowDown } from "react-icons/ai";
import { IoIosRemoveCircle } from "react-icons/io";

import { getToken } from "../auth/auth";

export const Permisos = ({ setModal, cuenta_id }) => {
  const token = getToken();

  const [permisos, setPermisos] = useState([]);
  const [permisosUsuario, setPermisosUsuario] = useState([]);
  const [permisosSinAsignar, setPermisosSinAsignar] = useState([]);

  const [existsPermisosUsuario, setExistsPermisosUsuario] =
    useState(false);

  const [openAñadir, setOpenAñadir] = useState(false);
  const toggleOpen = () => setOpenAñadir((cur) => !cur);

  useEffect(() => {
    cargarPermisos();
    cargarPermisosUsuario();
  }, []);

  useEffect(() => {
    obtenerPermisosFaltantes();
  }, [permisos, permisosUsuario]);

  const cargarPermisos = async () => {
    const response = await fetch("http://localhost:4000/permisos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setPermisos(data);
  };

  const cargarPermisosUsuario = async () => {
    const response = await fetch(
      `http://localhost:4000/permisos/${cuenta_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return setExistsPermisosUsuario(false), setPermisosUsuario([]);
    }

    setExistsPermisosUsuario(true);
    setPermisosUsuario(data);
  };

  const obtenerPermisosFaltantes = () => {
    const permisosFaltantes = permisos.filter((permiso) => {
      return !permisosUsuario.some(
        (permisoUsuario) => permisoUsuario.permiso_id === permiso.permiso_id
      );
    });

    setPermisosSinAsignar(permisosFaltantes);
  };

  const HandleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/cuentapermiso/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.message === "Permiso no encontrado") {
      return console.log("no borrado");
    }

    cargarPermisosUsuario();
    cargarPermisos();
  };

  const HandleAssign = async (permiso_id, cuenta_id) => {
    const nuevoPermiso = { permiso_id: permiso_id, cuenta_id: cuenta_id };

    const response = await fetch("http://localhost:4000/cuentapermiso", {
      method: "POST",
      body: JSON.stringify(nuevoPermiso),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.message) {
      return console.log(data.message);
    }

    cargarPermisos();
    cargarPermisosUsuario();
  };

  return (
    <div className="">
      <Titulo titulo={"Asignación de permisos"} />

      <Fragment>
        <div className="flex items-center justify-end mr-10">
          <Button className="flex" size="sm" onClick={toggleOpen}>
            {openAñadir ? "Terminado" : "Añadir"}{" "}
            {openAñadir ? (
              <BsCheckLg size={15} className="ml-2 text-white " />
            ) : (
              <BsPlusLg size={15} className="ml-2 text-white " />
            )}
          </Button>
        </div>

        <Collapse className="" open={openAñadir}>
          <Card className="mx-10 my-2 ">
            <CardBody>
              {permisosSinAsignar.length === 0 ? (
                <h2 className="text-center">
                  Todos lo permisos han sido asignados
                </h2>
              ) : (
                <List>
                  {permisosSinAsignar.map((permiso, index) => {
                    return (
                      <ListItem
                        key={index}
                        className="p-3 font-normal rounded-none text-md text-blue-gray-700 hover:bg-gray-200"
                      >
                        <ListItemPrefix>
                          {permiso.permiso_id === "PINV" ? (
                            <FiFolder size={25} />
                          ) : permiso.permiso_id === "PGRD" ? (
                            <AiOutlineBook size={25} />
                          ) : permiso.permiso_id === "PHCA" ? (
                            <RiBillLine size={25} />
                          ) : permiso.permiso_id === "PDCT" ? (
                            <BsPerson size={25} />
                          ) : null}
                        </ListItemPrefix>
                        {permiso.permiso_nombre}
                        <ListItemSuffix>
                          <AiFillPlusCircle
                            onClick={() =>
                              HandleAssign(permiso.permiso_id, cuenta_id)
                            }
                            className="text-green-500 hover:text-green-900"
                            size={25}
                          />
                        </ListItemSuffix>
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </CardBody>
          </Card>
        </Collapse>
      </Fragment>

      {openAñadir ? <AiOutlineArrowDown className="mx-auto" size={25} /> : null}

      <section className={`w-full ${openAñadir ? "" : "mt-3"}`}>
        <Card className="flex justify-center mx-10 rounded-md ">
          <CardBody>
            <List className="">
              {existsPermisosUsuario ? (
                permisosUsuario.map(
                  ({ permiso_nombre, permiso_id, id }, index) => {
                    return (
                      <ListItem
                        key={index}
                        className="p-3 font-normal rounded-none text-md text-blue-gray-700 hover:bg-gray-200"
                      >
                        <ListItemPrefix>
                          {permiso_id === "PINV" ? (
                            <FiFolder size={25} />
                          ) : permiso_id === "PGRD" ? (
                            <AiOutlineBook size={25} />
                          ) : permiso_id === "PHCA" ? (
                            <RiBillLine size={25} />
                          ) : permiso_id === "PDCT" ? (
                            <BsPerson size={25} />
                          ) : null}
                        </ListItemPrefix>
                        {permiso_nombre}
                        <ListItemSuffix>
                          <IoIosRemoveCircle
                            onClick={() => HandleDelete(id)}
                            className="text-red-500 hover:text-red-900"
                            size={25}
                          />
                        </ListItemSuffix>
                      </ListItem>
                    );
                  }
                )
              ) : (
                <h2 className="text-center">
                  El usuario no tiene permisos asignados
                </h2>
              )}
            </List>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};
