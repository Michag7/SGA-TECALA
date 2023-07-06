import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { replace, useFormik } from "formik";
import * as Yup from "yup";
import { Spinner, Avatar } from "@material-tailwind/react";
import logo from "../assets/Banner.png";
import { VscDebugRestart } from "react-icons/vsc";
import { Link } from "react-router-dom";

export const VerificacionCarnet = () => {
  const params = useParams();
  const navigate = useNavigate();
  var id = "";

  if (params.id != undefined) {
    id = params.id;
  }

  const [usuario, setUsuario] = useState();
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const [foto, setFoto] = useState(null);

  const [searched, setSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verificacion = useFormik({
    initialValues: {
      id: id,
    },

    validationSchema: Yup.object().shape({
      id: Yup.string("La identificación debe ser un numero")
        .matches(/^[0-9]+$/, "La identificación solo debe contener numeros")
        .min(10, "La identificación debe contener 10 digitos")
        .max(10, "La identificación debe contener 10 digitos")
        .required("Identificación requerida"),
    }),

    onSubmit: () => {
      cargarUsuario();
    },
  });

  useEffect(() => {
    document.title = "Verificación de carnets";
  }, []);

  const cargarUsuario = async () => {
    setIsLoading(true);
    const response = await fetch(
      `http://localhost:4000/usuario/${verificacion.values.id}`
    );

    console.log(response);

    const data = await response.json();

    setIsLoading(false);
    setSearched(true);

    if (data.message) {
      return setUsuarioEncontrado(false);
    }

    setFoto(data.foto);
    setUsuario(data.user);
    setUsuarioEncontrado(true);
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-100 ">
        <div className="flex justify-center">
          <div className="flex justify-center items-center bg-white lg:w-[1000px] md:w-[1000px] mt-10 lg:mt-4 md:mt-14  w-full mx-4 border border-gray-300">
            <img className="w-60 lg:w-72" src={logo}></img>
          </div>
        </div>

        {searched && usuarioEncontrado ? (
          <div className="flex items-center justify-center mt-10 lg:mt-10 md:mt-10">
            <div className="flex flex-col justify-center items-center bg-white lg:w-[1000px] md:w-[1000px]  py-4 px-2  w-full mx-4 border border-gray-300">
              <h1 className="text-3xl font-bold text-black lg:text-5xl md:text-4xl ">
                Información de usuario
              </h1>
              <div className="flex w-full mt-4 border rounded-lg">
                <div className="flex flex-col justify-start w-1/2 ">
                  <div className="flex justify-center">
                    {
                      <img
                        className="mt-4 rounded-full h-36 w-36 lg:h-72 lg:w-72 md:w-72 md:h-72"
                        src={`data:image/png;base64,${foto}`}
                        alt="foto"
                      />
                    }
                  </div>

                  <div className="flex justify-center w-full mt-1 mb-3 md:mt-2 lg:mt-3">
                    <p className="w-full mx-6 text-center text-white rounded-sm bg-light-green-500 lg:mx-28 md:mx-14 lg:mb-3 md:mb-3 lg:p-0.5">
                      Activo
                    </p>
                  </div>
                </div>

                <div className="w-1/2 p-2 mb-2 lg:px-6 lg:py-5">
                  <div className="mt-3 space-y-1 text-gray-600 lg:text-3xl md:text-2xl lg:space-y-4 md:space-y-4">
                    <div>
                      <p className="font-semibold">Nombres:</p>
                      <p className="">
                        {usuario.nombre} {usuario.apellido}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold">Identificación:</p>
                      <p className="">{usuario.id}</p>
                    </div>

                    <div>
                      <p className="font-semibold">Cargo:</p>
                      <p className="">{usuario.rol}</p>
                    </div>

                    {usuario.gid ? (
                      <div>
                        <p className="font-semibold">Grado:</p>
                        <p className="">{usuario.gid}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-full p-2 mt-1 -mb-2.5">
                <button
                  onClick={() =>
                    params.id === undefined
                      ? window.location.reload()
                      : (navigate("/verificacioncarnet"), window.location.reload())
                  }
                  className="flex items-center px-2 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-800"
                >
                  <VscDebugRestart className="" size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-6 lg:mt-14 md:mt-14">
            <div className="flex flex-col justify-center items-center bg-white lg:w-[1000px] md:w-[1000px]  py-10 px-6  w-full m-4 border border-gray-300">
              <h1 className="text-3xl font-bold text-center text-black">
                Verificación de carnets
              </h1>

              <p className="mt-3 text-sm text-center text-gray-500">
                Este servicio permite comprobar la autenticidad y validez de los
                documentos electrónicos generados por la{" "}
                <strong>I.E TERESA CALDERON DE LASSO</strong>, Podrá consultar
                los datos del sujeto los cuales han sido certificados.
              </p>

              <div className="mt-6">
                <input
                  type="text"
                  name="id"
                  value={verificacion.values.id}
                  onChange={verificacion.handleChange}
                  placeholder="Identificación"
                  className={`border border-gray-300 rounded-lg p-2 indent-1 w-72 lg:w-96 outline-none ${
                    verificacion.errors.id && verificacion.touched.id
                      ? "border-red-500"
                      : "focus:border-blue-500"
                  }`}
                  // error={verificacion.errors.id && verificacion.touched.id}
                  onBlur={verificacion.handleBlur}
                />
                {verificacion.errors.id && verificacion.touched.id ? (
                  <div className="mt-0.5 text-red-500 text-sm text-center">
                    {verificacion.errors.id}{" "}
                  </div>
                ) : verificacion.values.id === "" ||
                  verificacion.values.id === undefined ? (
                  <div className="text-center mt-0.5 text-sm text-gray-500">
                    Introduzca el numero de identificación
                  </div>
                ) : searched && !usuarioEncontrado ? (
                  <div className="text-center mt-0.5 text-sm text-red-500">
                    Usuario no encontrado
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="px-3 py-1.5 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-800 "
                onClick={verificacion.handleSubmit}
              >
                {isLoading ? <Spinner color="blue" /> : "Verificar"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
