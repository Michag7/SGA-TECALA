import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { getToken, getUser } from "../../auth/auth";
import { logos } from "../../utils/funciones";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const useWindowSize = () => {
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

export const GradosInicio = () => {
  const token = getToken();
  const user = getUser();

  const [grados, setGrados] = useState([]);
  const [asignaturas, setAsignaturas] = useState([]);

  const [selectGrado, setSelectGrado] = useState("Todas");

  useEffect(() => {
    cargarGrados();
  }, []);

  useEffect(() => {
    cargarAsignaturas();
  }, [selectGrado]);

  const cargarGrados = async () => {
    const response = await fetch("http://localhost:4000/grados", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setGrados(data);
  };

  const cargarAsignaturas = async () => {
    if (selectGrado === "Todas") {
      const response = await fetch(
        `http://localhost:4000/asignaturas/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setAsignaturas(data);
    } else {
      const response = await fetch(
        `http://localhost:4000/asignaturas/${user.id}/${selectGrado}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setAsignaturas(data);
    }
  };

  //Capturar los valores de los campos
  const HandleChange = (e) => {
    e.preventDefault();
    setSelectGrado(e.target.value);
    setStartIndexC(0);
  };

  const [startIndexC, setStartIndexC] = useState(0);
  const cardsPerPage = useWindowSize().width < 640 ? 1 : 3;

  const handleNextClickC = () => {
    setStartIndexC((prevIndex) => prevIndex + cardsPerPage);
  };
  const handleBackClickC = () => {
    setStartIndexC((prevIndex) => prevIndex - cardsPerPage);
  };

  const gradosVisibles = grados.slice(startIndexC, startIndexC + cardsPerPage);

  return (
    <div>
      <NavbarApp />
      <Titulo titulo={"Gestion de grados"} />

      {/* <select
        value={selectGrado}
        onChange={HandleChange}
        className={`ml-6 px-0 font-normal border-b border-blue-gray-200 select-md w-32`}
      >
        <option value="Todas">Todas</option>
        {grados.map(({ gid }, index) => {
          return (
            <option value={gid} key={index}>
              {gid}
            </option>
          );
        })}
      </select> */}

      <div className="px-5 mx-4 mt-16 border border-gray-300 rounded-lg">
        <div className="flex justify-between mt-4">
          <h2 className="text-lg font-bold">{selectGrado}</h2>
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
              disabled={startIndexC + cardsPerPage >= asignaturas.length}
              className={`px-4 py-3 border rounded-r-xl hover:border-blue-500 ${
                startIndexC + cardsPerPage >= asignaturas.length
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              <MdOutlineArrowForwardIos size={18} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 mx-auto mt-6 sm:grid-cols-3 h-96">
          {gradosVisibles.map(({ gid }, index) => (
            <Link key={index} to={`${gid}`}>
              <div
                key={index}
                className="overflow-hidden border border-gray-300 rounded-lg h-70 border-opacity-90 hover:border-blue-500 hover:shadow-xl"
              >
                <img
                  className="object-cover object-center w-full h-52"
                  alt="logo"
                  src={logos[parseInt(gid.split("-")[0], 10) - 1]}
                />

                <div className="px-2 py-5 transition duration-300 ease-in cursor-pointer select-none">
                  <h3 className="mb-3 text-2xl font-bold">Grado {gid}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
