import React, { useEffect, useState } from "react";
import { Titulo } from "./Titulo";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Card,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { AiOutlineBook } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { FiFolder } from "react-icons/fi";
import { getToken } from "../../auth/auth";

export const Permisos = ({ setModal, cuenta_id }) => {
  const token = getToken();

  const [permisos, setPermisos] = useState([]);
  const [permisosEstudiante, setPermisosEstudiante] = useState([]);
  const [existsPermisosEstudiante, setExistsPermisosEstudiante] =
    useState(false);

  useEffect(() => {
    cargarPermisos();
    cargarPermisosEstudiante();
  }, []);

  const cargarPermisos = async () => {
    const response = await fetch("http://localhost:4000/permisos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setPermisos(data);
  };

  const cargarPermisosEstudiante = async () => {
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
      return setExistsPermisosEstudiante(false);
    }

    setExistsPermisosEstudiante(true);
    setPermisosEstudiante(data);
  };

  return (
    <div>
      <Titulo titulo={"Asignación de permisos"} />

      <section className="px-16 py-6">
        <Card className="flex justify-center w-full rounded-md ">
          <List className="">
            {permisos.map(({ permiso_nombre, permiso_id }, index) => {
              return (
                <ListItem
                  key={index}
                  className="rounded-none text-md py-1.5 px-3 font-normal text-blue-gray-700 hover:bg-blue-200 hover:text-white "
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
                    <Checkbox />
                  </ListItemSuffix>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </section>

      <Button>Guardar cambios</Button>
    </div>
  );
};
