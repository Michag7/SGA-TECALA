import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaClipboardList } from "react-icons/fa";

import { getToken } from "../../auth/auth";
import { convertirFormatoFecha, obtenerMes } from "../../utils/funciones";
import { meses } from "../../utils/arrays";

export const Bitacora = () => {
  const navigate = useNavigate();
  const token = getToken();
  const fecha = new Date();
  const año = fecha.getFullYear();

  const [open, setOpen] = useState(0);
  const [controles, setControles] = useState([]);
  const [grados, setGrados] = useState([]);

  const [controlesExist, setControlesExist] = useState(false);
  const [searched, setSearched] = useState(false);

  const controlBusqueda = useFormik({
    initialValues: {
      gid: "",
      mesN: "",
    },

    validationSchema: Yup.object().shape({
      gid: Yup.string().required("Grado requerido"),
      mesN: Yup.string().required("Mes requerido"),
    }),

    onSubmit: (data) => {
      // if (openME) {
      //   HandleEdit(data);
      // } else {
      //   HandleSubmit(data);
      // }
    },
  });

  useEffect(() => {
    cargarGrados();
  }, []);

  const cargarControles = async () => {
    const response = await fetch(
      `http://localhost:4000/controles/${controlBusqueda.values.gid}/${controlBusqueda.values.mesN}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setSearched(true);
    if (data.message) {
      setControlesExist(false);
      console.log(data);
    } else {
      setControles(data);
      setControlesExist(true);
      console.log(data);
    }
  };

  const cargarGrados = async () => {
    const response = await fetch("http://localhost:4000/grados", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.message) {
      console.log("error grados");
    } else {
      setGrados(data);
    }
  };

  const HandleControl = (cid) => {
    navigate(`${cid}`);
  };

  return (
    <>
      <NavbarApp></NavbarApp>
      <Titulo titulo={"Historial de control"}></Titulo>
      <div className="flex justify-center">
        <div className="flex ">
          <div className="my-2 mr-1">
            <select
              onChange={controlBusqueda.handleChange}
              value={controlBusqueda.values.gid}
              onBlur={controlBusqueda.handleBlur}
              name="gid"
              className={`font-normal select-sm select select-bordered w-22 ${
                controlBusqueda.errors.gid && controlBusqueda.touched.gid
                  ? "border-red-500 text-red-500"
                  : ""
              }`}
            >
              <option
                className="font-bold text-black"
                value={""}
                disabled
                defaultValue={true}
              >
                Grado
              </option>

              {grados.map(({ gid }, index) => {
                return (
                  <option key={index} className="text-black" value={gid}>
                    {gid}
                  </option>
                );
              })}
            </select>
            {controlBusqueda.touched.gid && controlBusqueda.errors.gid && (
              <p className="ml-1 text-xs text-red-500 ">
                {controlBusqueda.errors.gid}
              </p>
            )}
          </div>
          <div className="my-2 mr-1 ">
            <select
              value={controlBusqueda.values.mesN}
              onChange={controlBusqueda.handleChange}
              onBlur={controlBusqueda.handleBlur}
              name="mesN"
              className={`font-normal select-sm select select-bordered w-fit ${
                controlBusqueda.errors.mesN && controlBusqueda.touched.mesN
                  ? "border-red-500 text-red-500"
                  : ""
              }`}
            >
              <option
                className="font-bold text-black"
                value={""}
                disabled
                defaultValue={true}
              >
                Mes
              </option>
              {meses.map((mes, index) => {
                return (
                  <option className="text-black" value={index + 1}>
                    {mes}
                  </option>
                );
              })}
            </select>
            {controlBusqueda.touched.mesN && controlBusqueda.errors.mesN && (
              <p className="ml-1 text-xs text-red-500 ">
                {controlBusqueda.errors.mesN}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={cargarControles}
              className={`px-4 py-1 ml-4 text-white bg-blue-500 rounded-lg hover:bg-blue-700 ${
                (controlBusqueda.errors.mesN && controlBusqueda.touched.mesN) ||
                (controlBusqueda.errors.gid && controlBusqueda.touched.gid)
                  ? "-mt-4"
                  : ""
              }`}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {searched ? (
        controlesExist ? (
          <section className="p-4 m-2 lg:m-4">
            <h2 className="text-2xl font-bold ">
              Control {meses[obtenerMes(controles[0].c_fecha)]} - Grado{" "}
              {controles[0].gid}
            </h2>
            {controles.map(({ c_fecha, cid }, index) => {
              return (
                <div
                  key={index}
                  onClick={() => HandleControl(cid)}
                  className="flex items-center py-3 mx-4 my-1 mt-3 bg-white border border-gray-300 rounded-md hover:shadow-xl hover:border-blue-500"
                >
                  <FaClipboardList
                    size={25}
                    className="mx-3 -mt-1 text-blue-500"
                  />
                  Control {convertirFormatoFecha(c_fecha)}
                </div>
              );
            })}
          </section>
        ) : (
          <div className="flex justify-center mt-5">
            No se encontraron resultados
          </div>
        )
      ) : (
        <div className="flex justify-center mt-5">
          Selecciones los datos que desea buscar
        </div>
      )}
    </>
  );
};
