import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "../assets/bg.jpg";
import logo from "../assets/logo.png";

import { Footer } from "../components/layout/Footer";
import { Nav } from "../components/layout/Nav";

export const Login = () => {
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      axios.post("http://localhost:4000/login", login).then((response) => {
        if (response.data.message) {
          setErrors(response.data.message);
          setUserFound(false);
        } else {
          let user = response.data.fields[0].name;
          if (user === "aid") {
            navigate("/admin");
          }
          // if (user === "eid") {
          //   navigate("/user/administrador");
          // }
          // if (user === "pid") {
          //   useNavigate("/user/administrador");
          // }
          setUserFound(true);
        }
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Nav></Nav>

      <div className="flex bg-white  lg:h-screen md:h-screen h-screen">
        <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-white">
          <img src={bg} alt="bg" className="w-full h-full object-cover" />
        </div>

        <div className="w-full flex items-center justify-center lg:w-1/2">
          <div className=" w-11/12 max-w-[700px] px-10 py-20 mt-0 rounded-3xl bg-white border-2  border-gray-100">
            <div className="flex flex-col items-center ">
              <img src={logo} alt="logo" width="180" height="180" />
              <h1 className="text-4xl font-bold mx-0">¡Bienvenidos!</h1>
            </div>
            <div className="mt-8">
              <div className="flex flex-col">
                <input
                  name="username"
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Ingrese su Usuario"
                />
              </div>
              <div className="flex flex-col mt-4">
                <input
                  name="password"
                  onChange={handleChange}
                  className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                  placeholder="Ingrese su contraseña"
                  type={"password"}
                />
              </div>
              <div className="mt-3 flex justify-end items-center">
                <input type="checkbox" id="remember" />
                <label
                  className="ml-2 font-medium text-base"
                  htmlFor="remember"
                >
                  Recordar contraseña
                </label>
              </div>
              <div className="mt-10 flex flex-col gap-y-4">
                <button
                  onClick={handleSubmit}
                  className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-blue-500 rounded-xl text-white font-bold text-lg"
                >
                  Iniciar Sesion
                </button>
              </div>

              <div className="mt-5 flex justify-center items-center">
                <a
                  href="#"
                  className="text-lg font-semibold text-blue-500 hover:text-blue-700 focus:text-blue-700"
                >
                  Olvido su Contraseña?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};
