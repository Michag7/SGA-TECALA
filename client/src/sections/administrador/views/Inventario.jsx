import React from "react";
import { Navigate, useNavigate } from "react-router";
import salaS from "../../../assets/salaS.jpg";
import { Link } from "react-router-dom";

export const Inventario = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-gray-100">
      <section className="md:h-full md:w-full lg:w-full flex items-center text-gray-600">
        <div className="container px-5 py-10 mx-auto">
          <div className="text-center mb-12">
            <h5 className="text-base md:text-lg text-blue-500 mb-1">
              Secciones
            </h5>
            <h1 className="text-4xl md:text-6xl text-gray-700 font-semibold">
              Inventario
            </h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {/* Sala 1*/}
            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                  src={salaS}
                  alt="blog"
                />
                <div className="p-6 hover:bg-blue-500 hover:text-white transition duration-300 ease-in">
                  <h2 className="text-base font-medium text-blue-300 mb-1">
                    October 29, 2021
                  </h2>
                  <h1 className="text-2xl font-semibold mb-3">
                    Sala de sistemas
                  </h1>

                  <p className="leading-relaxed mb-3">Descripción</p>
                </div>
              </div>
            </div>

            {/* Sala 2*/}

            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                  src={salaS}
                  alt="blog"
                />
                <Link to={"robotica"}>
                  <div className="p-6 hover:bg-blue-500 hover:text-white transition duration-300 ease-in cursor-pointer select-none">
                    <h2 className="text-base font-medium text-blue-300 mb-1">
                      October 29, 2021
                    </h2>
                    <h1 className="text-2xl font-semibold mb-3">
                      Sala de sistemas
                    </h1>

                    <p className="leading-relaxed mb-3">Descripción</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sala 2*/}
            <div className="p-4 sm:w-1/2 lg:w-1/3">
              <div className="border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-72 md:h-48 w-full object-cover object-center"
                  src={salaS}
                  alt="blog"
                />
                <div className="p-6 hover:bg-blue-500 hover:text-white transition duration-300 ease-in">
                  <h2 className="text-base font-medium text-blue-300 mb-1">
                    October 29, 2021
                  </h2>
                  <h1 className="text-2xl font-semibold mb-3">
                    Sala de sistemas
                  </h1>

                  <p className="leading-relaxed mb-3">Descripción</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
