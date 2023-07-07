import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stepper, Step, Typography, Input } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { MdPassword } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getToken } from "../../auth/auth";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useFormik } from "formik";
import * as Yup from "yup";

export const RegistroEstudiante = ({ cargarEstudiantes, setOpen, gid }) => {
  //Obtener el token
  const token = getToken();

  //Strepper
  const formArray = [1, 2];
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [formNo, setFormNo] = useState(formArray[0]);

  //Mostrar contraseña
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  //Image
  const [selectedFile, setSelectedFile] = useState(null);

  //Estudiante
  const estudiante = useFormik({
    initialValues: {
      id: "",
      nombres: "",
      apellidos: "",
      genero: "",
      telefono: "",
      correo: "",
      barrio: "",
      direccion: "",
      contraseña: "",
      Rcontraseña: "",
      gid: gid,
    },

    validationSchema: Yup.object().shape({
      id: Yup.string()
        .matches(/^[0-9]+$/, "La identificación solo debe contener digitos")
        .min(10, "La identificación debe contener 10 digitos")
        .max(10, "La identificación debe contener 10 digitos")
        .required("Identificación es obligatorio"),
      nombres: Yup.string()
        .matches(/^[a-zA-Z" "]+$/, {
          message: "El campo solo puede contener letras",
        })
        .required("Nombres es obligatorio"),
      apellidos: Yup.string()
        .matches(/^[a-zA-Z" "]+$/, {
          message: "El campo solo puede contener letras",
        })
        .required("Apellidos es obligatorio"),
      genero: Yup.string()
        .matches(/^[a-zA-Z]+$/, {
          message: "El campo solo puede contener letras",
        })
        .required("Genero es obligatorio"),

      telefono: Yup.string("Telefono debe ser un numero")
        .matches(/^[0-9]+$/, "Telefono solo debe contener dgitos")
        .required("Telefono es obligatorio"),
      correo: Yup.string()
        .email("Ingresa un correo electrónico válido")
        .required("El correo electrónico es obligatorio"),
      barrio: Yup.string().required("Barrio es obligatorio"),
      direccion: Yup.string().required("Dirrección es obligatorio"),
      contraseña: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
      Rcontraseña: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .oneOf([Yup.ref("contraseña"), null], "Las contraseñas no coinciden")
        .required("Debes confirmar la contraseña"),
    }),

    onSubmit: (data) => {
      finalSubmit(data);
    },
  });

  //Strepper
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //Siguiente
  const next = () => {
    if (
      formNo === 1 &&
      estudiante.values.id &&
      estudiante.values.nombres &&
      estudiante.values.apellidos &&
      estudiante.values.genero &&
      estudiante.values.telefono &&
      estudiante.values.correo &&
      estudiante.values.barrio &&
      estudiante.values.direccion
    ) {
      setFormNo(formNo + 1);
      handleNext();
    } else {
      toast.error("Porfavor, llene todos los campos");
    }
  };

  //Atras
  const pre = () => {
    setFormNo(formNo - 1);
    handlePrev();
  };

  //Enviar
  const finalSubmit = async (data) => {
    if (
      formNo === 2 &&
      estudiante.values.contraseña &&
      estudiante.values.Rcontraseña
    ) {
      if (selectedFile) {
        const newFormData = new FormData();
        newFormData.append("image", selectedFile);
        newFormData.append("estudiante", JSON.stringify(estudiante.values));

        const response = await axios.post(
          "http://localhost:4000/estudiante",
          newFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const Rdata = response.data;

        if (Rdata.message === "Estudiante no creado") {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${Rdata.message}`,
          });
        }

        Swal.fire(
          "Estudiante creado",
          "El estudiante, ha sido actualizado correctamente",
          "success"
        );

        cargarEstudiantes();
        setMostrarContraseña(false);
        setOpen(false);
        estudiante.resetForm();
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-full ">
      <ToastContainer />
      <div className="w-full p-8 bg-white rounded-md shadow-md">
        <div>
          <Stepper activeStep={activeStep}>
            <Step>
              <UserIcon className="w-5 h-5" />
              <div className="absolute -top-[1.8rem] w-max text-center">
                <Typography
                  variant="h6"
                  color={activeStep === 0 ? "blue" : "blue-gray"}
                >
                  Personal
                </Typography>
              </div>
            </Step>
            <Step>
              <MdPassword className="w-5 h-5" />
              <div className="absolute -top-[1.8rem] w-max text-center">
                <Typography
                  variant="h6"
                  color={activeStep === 2 ? "blue" : "blue-gray"}
                >
                  Cuenta
                </Typography>
              </div>
            </Step>
          </Stepper>
        </div>
        {formNo === 1 && (
          <div className="mt-8">
            <form className="grid gap-2">
              <Input
                value={estudiante.values.id}
                label="Identificación"
                name="id"
                type="text"
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
                error={estudiante.errors.id && estudiante.touched.id}
              />
              {estudiante.touched.id && estudiante.errors.id && (
                <p className="ml-1 -mt-2 text-xs text-red-500 ">
                  {estudiante.errors.id}
                </p>
              )}

              <Input
                value={estudiante.values.nombres}
                label="Nombres"
                name="nombres"
                type="text"
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
                error={estudiante.errors.nombres && estudiante.touched.nombres}
              />
              {estudiante.touched.nombres && estudiante.errors.nombres && (
                <p className="ml-1 -mt-2 text-xs text-red-500 ">
                  {estudiante.errors.nombres}
                </p>
              )}

              <Input
                value={estudiante.values.apellidos}
                label="Apellidos"
                name="apellidos"
                type="text"
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
                error={
                  estudiante.errors.apellidos && estudiante.touched.apellidos
                }
              />
              {estudiante.touched.apellidos && estudiante.errors.apellidos && (
                <p className="ml-1 -mt-2 text-xs text-red-500 ">
                  {estudiante.errors.apellidos}
                </p>
              )}

              <select
                value={estudiante.values.genero}
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
                name="genero"
                className={`w-full py-3 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200 ${
                  estudiante.touched.genero && estudiante.errors.genero
                    ? "text-red-500 border-b-red-500"
                    : ""
                }`}
              >
                <option value={""} disabled defaultValue={true}>
                  Seleccione una opción
                </option>
                <option value="MASCULINO">MASCULINO</option>
                <option value="FEMENINO">FEMENINO</option>
              </select>
              {estudiante.touched.genero && estudiante.errors.genero && (
                <p className="ml-1 -mt-2 text-xs text-red-500 ">
                  {estudiante.errors.genero}
                </p>
              )}

              <Input
                value={estudiante.values.telefono}
                label="Telefono"
                name="telefono"
                type="text"
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
                error={
                  estudiante.errors.telefono && estudiante.touched.telefono
                }
              />
              {estudiante.touched.telefono && estudiante.errors.telefono && (
                <p className="ml-1 -mt-2 text-xs text-red-500 ">
                  {estudiante.errors.telefono}
                </p>
              )}

              <Input
                value={estudiante.values.correo}
                label="Correo"
                name="correo"
                type="text"
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
                error={estudiante.errors.correo && estudiante.touched.correo}
              />
              {estudiante.touched.correo && estudiante.errors.correo && (
                <p className="ml-1 -mt-2 text-xs text-red-500 ">
                  {estudiante.errors.correo}
                </p>
              )}

              <Input
                value={estudiante.values.barrio}
                label="Barrio"
                name="barrio"
                type="text"
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
                error={estudiante.errors.barrio && estudiante.touched.barrio}
              />

              {estudiante.touched.barrio && estudiante.errors.barrio && (
                <p className="ml-1 -mt-2 text-xs text-red-500 ">
                  {estudiante.errors.barrio}
                </p>
              )}

              <Input
                value={estudiante.values.direccion}
                label="Dirección"
                name="direccion"
                type="text"
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
                error={
                  estudiante.errors.direccion && estudiante.touched.direccion
                }
              />

              {estudiante.touched.direccion && estudiante.errors.direccion && (
                <p className="ml-1 -mt-2 text-xs text-red-500 ">
                  {estudiante.errors.direccion}
                </p>
              )}
            </form>

            <div className="flex items-center justify-center mt-4">
              <button
                onClick={next}
                className="w-full px-3 py-2 text-lg text-white bg-blue-500 rounded-md"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {formNo === 2 && (
          <div className="mt-8">
            <div className="grid gap-2">
              <Input
                error={
                  estudiante.touched.contraseña && estudiante.errors.contraseña
                }
                value={estudiante.values.contraseña}
                label="Contraseña"
                name="contraseña"
                type={mostrarContraseña ? "text" : "password"}
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
              />
              {estudiante.touched.contraseña &&
                estudiante.errors.contraseña && (
                  <p className="ml-1 -mt-2 text-xs text-red-500 ">
                    {estudiante.errors.contraseña}
                  </p>
                )}

              <Input
                error={
                  estudiante.touched.Rcontraseña &&
                  estudiante.errors.Rcontraseña
                }
                value={estudiante.values.Rcontraseña}
                label="Confirmar Contraseña"
                name="Rcontraseña"
                type={mostrarContraseña ? "text" : "password"}
                onChange={estudiante.handleChange}
                onBlur={estudiante.handleBlur}
              />
              {estudiante.touched.Rcontraseña &&
                estudiante.errors.Rcontraseña && (
                  <p className="ml-1 -mt-2 text-xs text-red-500 ">
                    {estudiante.errors.Rcontraseña}
                  </p>
                )}
              <div className="flex items-center ml-1">
                <input
                  type="checkbox"
                  className=""
                  onChange={() => setMostrarContraseña(!mostrarContraseña)}
                  checked={mostrarContraseña ? true : false}
                />
                <label className="ml-2 text-sm">Mostrar contraseña</label>
              </div>

              <div className="flex justify-end w-full max-w-xs form-control ">
                <label className="label ">
                  <span className="label-text">
                    Selecciona una foto de perfil
                  </span>
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
                  name="image"
                  className="w-full max-w-xs file-input file-input-bordered file-input-sm "
                />
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={pre}
                className="w-full px-3 py-2 text-lg text-white bg-blue-500 rounded-md"
              >
                Atras
              </button>
              <button
                type="submit"
                onClick={estudiante.handleSubmit}
                className="w-full px-3 py-2 text-lg text-white bg-blue-500 rounded-md"
              >
                Registrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
