import React from "react";
import { Navigate, useNavigate } from "react-router";
import salaS from "../../assets/salaS.jpg";
import salaS2 from "../../assets/salaS2.jpg";
import salaR from "../../assets/salaR.jpg";
import { Link } from "react-router-dom";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";

export const InventarioInicio = () => {
  const navigate = useNavigate();
  return (
    <div>
      <NavbarApp></NavbarApp>
      <Titulo titulo={"Inventarios"}></Titulo>
      <section className="flex items-center text-gray-600 md:h-full md:w-full lg:w-full lg:mt-14 ">
        <div className="container px-5 mx-auto">
          {/* <div className="mb-12 text-center">
            <h5 className="mt-2 text-base text-blue-500 md:text-lg">Secciones</h5>
            <h1 className="text-4xl font-semibold text-gray-700 md:text-6xl">
              Inventario
            </h1>
          </div> */}
          <div className="flex flex-wrap ">
            {/* Sala 1*/}
            <div className="p-4 sm:w-1/2 lg:w-1/3 ">
              <div className="overflow-hidden border-2 border-gray-300 rounded-lg border-opacity-90 ">
                <img
                  className="object-cover object-center w-full lg:h-72 md:h-48 "
                  src={salaS}
                  alt="blog"
                />
                <Link to={"salasistemas"}>
                  <div className="p-6 transition duration-300 ease-in cursor-pointer select-none hover:bg-blue-500 hover:text-white">
                    <h2 className="mb-1 text-base font-medium text-blue-300">
                      SS1TCL
                    </h2>
                    <h1 className="mb-3 text-2xl font-semibold">
                      Sala de sistemas #1
                    </h1>

                    <p className="mb-3 leading-relaxed">
                      Encargado: Gabriel Martinez - Docente <br /> Ubicacion:
                      Primer piso, salon 1
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sala 2*/}

            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="overflow-hidden border-2 border-gray-300 rounded-lg border-opacity-90">
                <img
                  className="object-cover object-center w-full lg:h-72 md:h-48"
                  src={salaS2}
                  alt="blog"
                />
                <Link to={"salasistemas2"}>
                  <div className="p-6 transition duration-300 ease-in cursor-pointer select-none hover:bg-blue-500 hover:text-white">
                    <h2 className="mb-1 text-base font-medium text-blue-300">
                    SS2TCL
                    </h2>
                    <h1 className="mb-3 text-2xl font-semibold">Sala de sistemas #2</h1>

                    <p className="mb-3 leading-relaxed">
                      Encargado: Ronaldo Nazario - Docente <br /> Ubicacion:
                      Segundo piso, salon 8
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sala 2*/}
            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="overflow-hidden border-2 border-gray-300 rounded-lg border-opacity-90">
                <img
                  className="object-cover object-center w-full lg:h-72 md:h-48"
                  src={salaR}
                  alt="blog"
                />
                <Link to={"salarobotica"}>
                  <div className="p-6 transition duration-300 ease-in cursor-pointer select-none hover:bg-blue-500 hover:text-white">
                    <h2 className="mb-1 text-base font-medium text-blue-300">
                      SRTCL
                    </h2>
                    <h1 className="mb-3 text-2xl font-semibold">
                      Sala de robotica
                    </h1>

                    <p className="mb-3 leading-relaxed">
                      Encargado: Gabriel Martinez - Docente <br /> Ubicacion:
                      Primer piso, salon 1
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
