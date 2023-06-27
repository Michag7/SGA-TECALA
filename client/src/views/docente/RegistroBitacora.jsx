import React, { Fragment, useState, useEffect } from "react";
import { getToken, getUser } from "../../auth/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Radio,
} from "@material-tailwind/react";
import { Titulo } from "../../components/layout/Titulo";
import { AiFillPlusCircle, AiOutlinePlus } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { BsCheckLg, BsX } from "react-icons/bs";

export const RegistroBitacora = ({ grado }) => {
  const token = getToken();
  const user = getUser();

  const [datosAsistencia, setDatosAsistencia] = useState([]);

  const iniciarAsistencias = () => {
    const estudiatesId = listaEstudiantes.map((estudiante) => estudiante.id);

    // Crear un nuevo objeto con los nombres obtenidos
    const asistencias = estudiatesId.map((id) => ({
      estudiante: id,
      tipo: "Asistencia",
      control: 1,
      materia: 1,
    }));
    console.log(asistencias);

    // Agregar los nuevos objetos al estado nuevosDatos
    setDatosAsistencia([...datosAsistencia, ...asistencias]);
  };

  const handleAsistenciaChange = (index, value) => {
    const nuevosDatosAsistencia = [...datosAsistencia];

    const asistencia = nuevosDatosAsistencia[index];
    asistencia.tipo = value;
    nuevosDatosAsistencia[index] = asistencia;

    setDatosAsistencia(nuevosDatosAsistencia);

    console.log(value);
    console.log(nuevosDatosAsistencia);

    console.log(asistencia);
    console.log(datosAsistencia);
  };

  //Validador de inputs - formik
  const formikAsis = useFormik({
    initialValues: {
      id: 0,
      hora: "",
      materia: "",
      estado: "",
      descripcion: "",
    },

    validationSchema: Yup.object().shape({
      estado: Yup.string().required("El selector Estado es requerido"),
      descripcion: Yup.string().required("El campo Descripción es requerido"),
    }),

    onSubmit: (data) => {},
  });

  const [openME, setOpenME] = useState(false);
  const handleOpenME = (info) => {
    setOpenME(true);
    iniciarAsistencias();
  };
  const handleCloseME = () => {
    setOpenME(false);
    setDatosAsistencia([]);
  };

  const [openMO, setOpenMO] = useState(false);
  const handleOpenMO = (info) => {
    setOpenMO(true);
  };
  const handleCloseMO = () => {
    setOpenMO(false);
    formikObs.setFieldValue("tema", "");
    formikObs.setErrors({});
    formikObs.setTouched({});
  };

  const [listaEstudiantes, setListaEstudiantes] = useState([]);
  const [observaciones, setObservaciones] = useState([]);

  const cargarListaEstudiantes = async () => {
    const response = await fetch(
      `http://localhost:4000/listaestudiantes/${"11-1"}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setListaEstudiantes(data);
  };

  const cargarObservaciones = async () => {
    const response = await fetch(`http://localhost:4000/observaciones/${"1"}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setObservaciones(data);
    setNumeroObservaciones(data.length);
    formikObs.setFieldValue("hora", data.length + 1);
  };

  useEffect(() => {
    cargarListaEstudiantes();
    cargarObservaciones();
  }, []);

  const [numeroObservaciones, setNumeroObservaciones] = useState();
  const [isEditingObs, setIsEditingObs] = useState(false);

  //Validador de inputs - formik
  const formikObs = useFormik({
    initialValues: {
      id: 0,
      hora: 0,
      tema: "",
      control: 1,
      docente: user.nombre + " " + user.apellido,
    },

    validationSchema: Yup.object().shape({
      tema: Yup.string().required("Debes ingresar un tema"),
    }),

    onSubmit: (data) => {
      HandleObservaciones(data);
    },
  });

  const HandleObservaciones = async (data) => {
    try {
      if (!isEditingObs) {
        const response = await fetch("http://localhost:4000/observacion", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          setNumeroObservaciones(numeroObservaciones + 1);
          cargarObservaciones();
          handleCloseMO();
        }
      } else {
        console.log("editing");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Titulo titulo={"Control de asistencia"}></Titulo>
      <div>
        <div className="flex items-center justify-end mr-14 ">
          <button
            onClick={handleOpenME}
            className="flex items-center px-4 py-2 font-bold border-2 rounded-full shadow-lg hover:text-blue-500"
          >
            Llamar lista
            <AiFillPlusCircle size={20} className="ml-1.5 text-blue-500 " />
          </button>
        </div>
        <div className="mt-2 overflow-x-auto mx-14 ">
          <table className="table border-separate border-spacing-1">
            <thead>
              <tr className="text-base text-center text-white bg-blue-500 ">
                <th></th>
                <th>Estudiante</th>
                <th>Hora 1</th>
                <th>Hora 2</th>
                <th>Hora 3</th>
                <th>Hora 4</th>
                <th>Hora 5</th>
                <th>Hora 6</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-base-200"></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-end mr-14 ">
          <button
            onClick={handleOpenMO}
            className={`flex items-center px-4 py-2 font-bold border-2 rounded-full shadow-lg hover:text-blue-500 ${
              numeroObservaciones === 6 ? "hidden" : ""
            }`}
            disabled={numeroObservaciones === 6 ? true : false}
          >
            Añadir observación
            <AiFillPlusCircle size={20} className="ml-1.5 text-blue-500 " />
          </button>
        </div>
        <div className="mt-2 overflow-x-auto mx-14">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="text-base border-b border-black">
                <th>Hora</th>
                <th>Tema</th>
                <th>Docente</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {observaciones.map(({ o_hora, o_tema, docente }, index) => {
                return (
                  <tr key={o_hora} className="border-b border-black">
                    <th>{o_hora}</th>
                    <td>{o_tema}</td>
                    <td>{docente}</td>
                    <td>
                      <FaEdit
                        className="cursor-pointer hover:text-blue-500"
                        size={25}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Fragment>
        <Dialog open={openME} size="md" o className="min-w-fit">
          <div className="flex items-center justify-between">
            <DialogHeader>Lista de estudiante 11°1</DialogHeader>
            {/* <XMarkIcon className="w-5 h-5 mr-3 cursor-pointer hover:text-red-500" /> */}
          </div>
          <DialogBody divider>
            <div className="flex space-x-4">
              <select
                onChange={""}
                value={""}
                // onBlur={formik.handleBlur}
                name="estado"
                className={`w-full px-0 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 m select-border select-md  `}
              >
                {/* ${
                formik.errors.estado && formik.touched.estado
                  ? "border-red-500 text-red-500"
                  : ""
              } */}

                <option value={""} disabled defaultValue>
                  Seleccione la hora
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              {/* {formik.touched.estado && formik.errors.estado && (
              <p className="ml-1 -mt-5 text-xs text-red-500 ">
                {formik.errors.estado}
              </p>
            )} */}
              <select
                value={""}
                name="estado"
                className={`w-full px-0 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 m select-border select-md  `}
              >
                <option value={""} disabled defaultValue={true}>
                  Seleccione la materia
                </option>
                <option value="Nuevo">Matematicas</option>
                <option value="Dañado">Castellano</option>
                <option value="Regular">Ingles</option>
              </select>
            </div>

            <div className="mt-10 overflow-x-auto h-96">
              <table className="table border-separate table-pin-rows border-spacing">
                <thead>
                  <tr className="text-base text-center text-white bg-blue-500">
                    <th>Estudiante</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {listaEstudiantes.map(({ nombre, apellido, id }, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {nombre} {apellido}
                        </td>
                        <td>
                          <div className="flex gap-10">
                            <Radio
                              id={id}
                              name={id}
                              label="Asistio"
                              onChange={() =>
                                handleAsistenciaChange(index, "Asistencia")
                              }
                              onClick={() => console.log(datosAsistencia)}
                              icon={<BsCheckLg />}
                              defaultChecked
                            />
                            <Radio
                              id={id}
                              name={id}
                              label="No asistio"
                              icon={<BsX />}
                              color="red"
                              onChange={() =>
                                handleAsistenciaChange(index, "Inasistencia")
                              }
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button onClick={handleCloseME} variant="outlined" color="red">
              Cancelar
            </Button>
            <Button variant="gradient" color="blue">
              Añadir
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>

      {/* Observacion             */}
      <Fragment>
        <Dialog open={openMO} size="md" o className="min-w-fit">
          <div className="flex items-center justify-between">
            <DialogHeader>Añadir observación</DialogHeader>
            {/* <XMarkIcon className="w-5 h-5 mr-3 cursor-pointer hover:text-red-500" /> */}
          </div>
          <DialogBody divider>
            <div>
              <Textarea
                label="Tema"
                name="tema"
                type="text"
                onChange={formikObs.handleChange}
                error={formikObs.touched.tema && formikObs.errors.tema}
                onBlur={formikObs.handleBlur}
              />
              {formikObs.touched.tema && formikObs.errors.tema && (
                <p className="ml-1 text-xs text-red-500 ">
                  {formikObs.errors.tema}
                </p>
              )}
            </div>
          </DialogBody>
          <DialogFooter className="space-x-2">
            <Button onClick={handleCloseMO} variant="outlined" color="red">
              Cancelar
            </Button>
            <Button
              variant="gradient"
              color="blue"
              onClick={formikObs.handleSubmit}
            >
              Añadir
            </Button>
          </DialogFooter>
        </Dialog>
      </Fragment>
    </>
  );
};
