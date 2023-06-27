import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../assets/bg.jpg";
import logo from "../assets/logo.png";
import { Footer } from "../components/layout/Footer";
import { Nav } from "../components/layout/Nav";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Login = () => {
  const navigate = useNavigate();

  function isValidBase64(base64String) {
    try {
      // Decodificar la cadena base64
      const decodedString = atob(base64String);

      // Verificar si la cadena decodificada tiene contenido
      return decodedString.length > 0;
    } catch (error) {
      // Si ocurre un error al decodificar, la cadena no es válida
      return false;
    }
  }

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [userFound, setUserFound] = useState(true);
  const [mostrarPassword, setmostrarPassword] = useState(false);

  const switchShown = (e) => {
    e.preventDefault();
    setmostrarPassword(!mostrarPassword);
  };

  const handleSubmit = async (Data) => {
    try {
      setLoading(true);

      const response = await axios.post("http://localhost:4000/login", Data);

      if (response.status === 200) {
        // Almacenar el token en el estado del componente padre
        const token = response.data.tokenj.token;
        const userJ = response.data.user;
        const imagen = response.data.imagen;

        const isValid = isValidBase64(imagen);

        const user = JSON.stringify(userJ);

        // Guardar el token en el localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        localStorage.setItem("imagenP", imagen);

      

        if (userJ.rol == "administrador") {
          navigate("/admin/home", { replace: true });
        }

        if (userJ.rol == "docente") {
          navigate("/docente/home", { replace: true });
        }
      } else {
        console.log("hola");
      }

      setLoading(false);
    } catch (error) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Usuario no encontrado",
      //   text: "Las credenciales proporcionadas, no corresponden a ningun usuario resgistrado en el sistema.",
      // });
      console.log(error.message);
      toast.error("Credenciales incorrectas");
    }
  };

  return (
    <>
      <Nav></Nav>

      <ToastContainer />

      <div className="flex h-screen bg-white ">
        <div className="relative items-center justify-center hidden w-1/2 h-full bg-white lg:flex">
          <img src={bg} alt="bg" className="object-cover w-full h-full" />
        </div>

        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className=" w-11/12 max-w-[700px] px-10 py-14  rounded-3xl bg-white border-2  border-gray-100">
            <div className="flex flex-col items-center">
              <img src={logo} alt="logo" width="180" height="180" />
              <h1 className="mx-0 text-4xl font-bold text-black">
                ¡Bienvenidos!
              </h1>
            </div>

            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required(
                  "El campo Username es requerido"
                ),
                password: Yup.string().required(
                  "El campo Password es requerido"
                ),
              })}
              onSubmit={(data) => {
                handleSubmit(data);
              }}
            >
              {({ errors }) => (
                <Form className="mt-10">
                  <div>
                    <Field
                      name="username"
                      className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                      placeholder="Ingrese su Usuario"
                    />
                    <ErrorMessage
                      name="username"
                      component={() => (
                        <div className="text-sm text-red-800">
                          {errors.username}
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <Field
                      name="password"
                      className="w-full p-4 mt-1 bg-transparent border-2 border-gray-100 rounded-xl"
                      placeholder="Ingrese su contraseña"
                      type={"password"}
                    />
                    <ErrorMessage
                      name="password"
                      component={() => (
                        <div className="text-sm text-red-800">
                          {errors.password}
                        </div>
                      )}
                    />
                  </div>

                  <div className="flex items-center justify-end mt-3">
                    <input type="checkbox" id="remember" />
                    <label
                      className="ml-2 text-base font-medium"
                      htmlFor="remember"
                    >
                      Recordar contraseña
                    </label>
                  </div>
                  <div className="flex flex-col mt-10 gap-y-4">
                    <button
                      type="submit"
                      className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
                    >
                      Iniciar Sesion
                    </button>
                  </div>

                  <div className="flex items-center justify-center mt-5">
                    <a
                      href="#"
                      className="text-lg font-semibold text-blue-500 hover:text-blue-700 focus:text-blue-700"
                    >
                      Olvido su Contraseña?
                    </a>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};
