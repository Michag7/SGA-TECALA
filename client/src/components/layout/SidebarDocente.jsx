import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion } from "framer-motion";

// * React icons
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineHome, AiOutlineBook } from "react-icons/ai";
import { BsPersonVcard } from "react-icons/bs";
import { RiBillLine } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import logo from "../../assets/logo.png";
import { getCuenta, getToken } from "../../auth/auth";
import {
  PermisoDocentes,
  PermisoGrados,
  PermisoHistorialCA,
  PermisoInventario,
} from "./PermisosComponents";

const SidebarDocente = () => {
  const cuenta = getCuenta();
  const token = getToken();

  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  const [permisos, setPermisos] = useState([]);
  const [existsPermisosEstudiante, setExistsPermisosEstudiante] =
    useState(false);

  useEffect(() => {
    cargarPermisos();
  }, []);

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  const cargarPermisos = async () => {
    const response = await fetch(
      `http://localhost:4000/permisos/${cuenta.cuenta_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.message) {
      return setExistsPermisosEstudiante(false), setPermisos([]);
    }

    setExistsPermisosEstudiante(true);
    setPermisos(data);
  };

  return (
    <div>
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-gray-200 text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden lg:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-blue-gray-200 mx-2">
          <img src={logo} width={50} alt="logo" />
          <span className="text-xl font-bold whitespace-pre"> SGA TECALA</span>
        </div>

        <div className="flex flex-col h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1   font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   lg:h-[68%] h-[70%]">
            <li>
              <NavLink to={"home"} className="link">
                <AiOutlineHome size={25} className="min-w-max" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"controla"} className="link">
                <RiBillLine size={25} className="min-w-max" />
                Control
              </NavLink>
            </li>
            <li>
              <NavLink to={"asistencia"} className="link">
                <AiOutlineBook size={25} className="min-w-max" />
                Asistencias
              </NavLink>
            </li>
            <li>
              <NavLink to={"carnet"} className="link">
                <BsPersonVcard size={25} className="min-w-max" />
                Carnet
              </NavLink>
            </li>
            {existsPermisosEstudiante
              ? permisos.map(({ permiso_id }, index) => {
                  if (permiso_id === "PGRD") {
                    return <PermisoGrados key={index} />;
                  }
                  if (permiso_id === "PDCT") {
                    return <PermisoDocentes key={index} />;
                  }
                  if (permiso_id === "PINV") {
                    return <PermisoInventario key={index} />;
                  }
                  if (permiso_id === "PHCA") {
                    return (
                      <li key={index}>
                        <NavLink to={"controlh"} className="link">
                          <RiBillLine size={25} className="min-w-max" />
                          Historial de control
                        </NavLink>
                      </li>
                    );
                  }
                })
              : null}
          </ul>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute z-50 hidden cursor-pointer w-fit h-fit lg:block right-2 bottom-3"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div
        className="mt-4 pt-0.5 ml-4 lg:hidden fixed"
        onClick={() => setOpen(true)}
      >
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default SidebarDocente;
