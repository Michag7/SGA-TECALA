import React, { useState, useEffect } from "react";
import { Titulo } from "../../components/layout/Titulo";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Link } from "react-router-dom";
import { getToken, getUser } from "../../auth/auth";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { logos } from "../../utils/funciones";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};

export const ControlInicio = () => {
  const token = getToken();
  const user = getUser();

  const currentDate = new Date();
  const currentDay = currentDate
    .toLocaleString("es-ES", { weekday: "long" })
    .toUpperCase();

  const dia = currentDay.toString();

  const [docenteDia, setDocenteDia] = useState({
    did: user.id,
    dia: dia,
  });
  const [controlesHoy, setControlesHoy] = useState([]);
  const [controles, setControles] = useState([]);

  useEffect(() => {
    cargarControlesHoy();
    cargarControles();
    console.log(currentDay.toString());
  }, []);

  const cargarControlesHoy = async () => {
    const response = await fetch(
      `http://localhost:4000/horarioD/${docenteDia.did}/${docenteDia.dia}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setControlesHoy(data);
  };

  const cargarControles = async () => {
    const response = await fetch(
      `http://localhost:4000/horarioD/${docenteDia.did}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setControles(data);
  };

  const [startIndexCH, setStartIndexCH] = useState(0);
  const [startIndexC, setStartIndexC] = useState(0);
  const cardsPerPage = useWindowSize().width < 640 ? 1 : 3;

  const handleNextClickCH = () => {
    setStartIndexCH((prevIndex) => prevIndex + cardsPerPage);
  };
  const handleNextClickC = () => {
    setStartIndexC((prevIndex) => prevIndex + cardsPerPage);
  };

  const handleBackClickCH = () => {
    setStartIndexCH((prevIndex) => prevIndex - cardsPerPage);
  };
  const handleBackClickC = () => {
    setStartIndexC((prevIndex) => prevIndex - cardsPerPage);
  };

  const controlesHoyVisibles = controlesHoy.slice(
    startIndexCH,
    startIndexCH + cardsPerPage
  );

  const controlesVisibles = controles.slice(
    startIndexC,
    startIndexC + cardsPerPage
  );

  return (
    <div className="w-full h-screen">
      <NavbarApp />
      <Titulo titulo={`Control de asistencia`} />
      <div className="px-5 mx-4 border border-gray-300 rounded-lg">
        <div className="flex justify-between mt-4">
          <h2 className="text-lg font-bold">Hoy</h2>
          <div className="flex">
            <button
              onClick={handleBackClickCH}
              disabled={startIndexCH === 0}
              className={`px-4 py-3 border rounded-l-xl hover:border-blue-500 ${
                startIndexCH === 0 ? "cursor-not-allowed" : ""
              }`}
            >
              <MdOutlineArrowBackIos size={18} />
            </button>
            <button
              onClick={handleNextClickCH}
              disabled={startIndexCH + cardsPerPage >= controlesHoy.length}
              className={`px-4 py-3 border rounded-r-xl hover:border-blue-500 ${
                startIndexCH + cardsPerPage >= controlesHoy.length
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              <MdOutlineArrowForwardIos size={18} />
            </button>
          </div>
        </div>
        <div className="grid max-w-4xl grid-cols-1 gap-4 p-4 mx-auto mt-2 sm:grid-cols-3">
          {controlesHoyVisibles.map(({ gid }, index) => (
            <Link key={index} to={`${gid}`}>
              <div
                key={index}
                className="overflow-hidden border border-gray-300 rounded-lg border-opacity-90 hover:border-blue-500 hover:shadow-xl "
              >
                <img
                  className="object-cover object-center w-full h-32 "
                  alt="logo"
                  src={logos[parseInt(gid.split("-")[0], 10) - 1]}
                />

                <div className="flex items-center px-2 py-1 transition duration-300 ease-in cursor-pointer select-none">
                  <h3 className="mb-3 text-2xl font-bold">{gid}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="px-5 mx-4 mt-4 border border-gray-300 rounded-lg">
        <div className="flex justify-between mt-4">
          <h2 className="text-lg font-bold">Todos</h2>
          <div className="flex">
            <button
              onClick={handleBackClickC}
              disabled={startIndexC === 0}
              className={`px-4 py-3 border rounded-l-xl hover:border-blue-500 ${
                startIndexC === 0 ? "cursor-not-allowed" : ""
              }`}
            >
              <MdOutlineArrowBackIos size={18} />
            </button>
            <button
              onClick={handleNextClickC}
              disabled={startIndexC + cardsPerPage >= controles.length}
              className={`px-4 py-3 border rounded-r-xl hover:border-blue-500 ${
                startIndexC + cardsPerPage >= controles.length
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              <MdOutlineArrowForwardIos size={18} />
            </button>
          </div>
        </div>
        <div className="grid max-w-4xl grid-cols-1 gap-4 p-4 mx-auto mt-2 sm:grid-cols-3">
          {controlesVisibles.map(({ gid }, index) => (
            <Link key={index} to={`${gid}`}>
              <div
                key={index}
                className="overflow-hidden border border-gray-300 rounded-lg border-opacity-90 hover:border-blue-500 hover:shadow-xl"
              >
                <img
                  className="object-cover object-center w-full h-32 "
                  alt="logo"
                  src={logos[parseInt(gid.split("-")[0], 10) - 1]}
                />

                <div className="flex items-center px-2 py-1 transition duration-300 ease-in cursor-pointer select-none">
                  <h3 className="mb-3 text-2xl font-bold">{gid}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
