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

export const RegistroDocente = ({ cargarDocentes, setOpen }) => {
  //Obtener el token
  const token = getToken();

  //Strepper
  const formArray = [1, 2];
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [formNo, setFormNo] = useState(formArray[0]);

  //Mostrar password
  const [mostrarPassword, setmostrarPassword] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");

  //Docente
  const [docente, setDocente] = useState({
    id: "",
    nombres: "",
    apellidos: "",
    edad: "",
    genero: "",
    telefono: "",
    correo: "",
    ciudad: "",
    barrio: "",
    direccion: "",
    username: "",
    password: "",
    Rpassword: "",
  });

  //Select genero
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);

    setDocente({
      ...docente,
      genero: event.target.value,
    });
  };

  //Image
  const [selectedFile, setSelectedFile] = useState(null);

  //Mostrar contraseña
  const switchShown = (e) => {
    e.preventDefault();
    setmostrarPassword(!mostrarPassword);
  };

  //Strepper
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  //Capturar los valores de los campos
  const HandleChange = (e) => {
    e.preventDefault();
    setDocente({ ...docente, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  //Siguiente
  const next = () => {
    if (
      formNo === 1 &&
      docente.id &&
      docente.nombres &&
      docente.apellidos &&
      docente.edad &&
      docente.genero &&
      docente.telefono &&
      docente.correo &&
      docente.ciudad &&
      docente.barrio &&
      docente.direccion
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
  const finalSubmit = async (e) => {
    e.preventDefault();

    if (formNo === 2 && docente.password != docente.Rpassword) {
      toast.error("Las contraseñas no coinciden, intente de nuevo");
    } else if (
      formNo === 2 &&
      docente.username &&
      docente.password &&
      docente.Rpassword
    ) {
      if (selectedFile) {
        const newFormData = new FormData();
        newFormData.append("image", selectedFile);
        newFormData.append("docente", JSON.stringify(docente));

        const response = await axios.post(
          "http://localhost:4000/docente",
          newFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);

        const Rdata = await response.data;
        
        setOpen(false);

        if (Rdata.message === "Docente no creado") {
          return Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${Rdata.message}`,
          });
        }

        Swal.fire(
          "Docente creado",
          "El docente, ha sido actualizado correctamente",
          "success"
        );
        cargarDocentes();
      } else {
        toast.error("Porfavor, suba una foto");
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
            <div className="flex flex-col mb-2 space-y-2">
              <Input
                value={docente.id}
                label="Identificación"
                name="id"
                type="number"
                onChange={HandleChange}
              />
              <Input
                value={docente.nombres}
                label="Nombres"
                name="nombres"
                onChange={HandleChange}
              />
              <Input
                value={docente.apellidos}
                label="Apellidos"
                name="apellidos"
                onChange={HandleChange}
              />
              <Input
                value={docente.edad}
                label="Edad"
                name="edad"
                type="number"
                onChange={HandleChange}
              />
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                name="genero"
                className="w-full py-3 font-normal border-b-2 text-blue-gray-700 border-blue-gray-200"
              >
                <option value={""} disabled>
                  Seleccione una opción
                </option>
                <option value="MASCULINO">MASCULINO</option>
                <option value="FEMENINO">FEMENINO</option>
              </select>
              <Input
                value={docente.telefono}
                label="Telefono"
                name="telefono"
                type="number"
                onChange={HandleChange}
              />
              <Input
                value={docente.correo}
                label="Correo"
                name="correo"
                type="email"
                onChange={HandleChange}
              />
              <Input
                value={docente.ciudad}
                label="Ciudad"
                name="ciudad"
                onChange={HandleChange}
              />
              <Input
                value={docente.barrio}
                label="Barrio"
                name="barrio"
                onChange={HandleChange}
              />
              <Input
                value={docente.direccion}
                label="Dirección"
                name="direccion"
                onChange={HandleChange}
              />
            </div>

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
            <div className="flex flex-col mb-2 space-y-2">
              <Input
                value={docente.usuario}
                label="Usuario"
                name="username"
                onChange={HandleChange}
              />

              <Input
                value={docente.password}
                label="Contraseña"
                name="password"
                type={mostrarPassword ? "text" : "password"}
                onChange={HandleChange}
                icon={
                  mostrarPassword ? (
                    <AiFillEye
                      className="text-blue-500 cursor-pointer"
                      size={20}
                      onClick={switchShown}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className="cursor-pointer "
                      size={20}
                      onClick={switchShown}
                    />
                  )
                }
              />

              <Input
                value={docente.Rpassword}
                label="Confirmar Contraseña"
                name="Rpassword"
                type={mostrarPassword ? "text" : "password"}
                onChange={HandleChange}
                icon={
                  mostrarPassword ? (
                    <AiFillEye
                      className="text-blue-500 cursor-pointer"
                      size={20}
                      onClick={switchShown}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      className="cursor-pointer "
                      size={20}
                      onClick={switchShown}
                    />
                  )
                }
              />

              <div className="flex justify-end w-full max-w-xs form-control ">
                <label className="label ">
                  <span className="label-text">
                    Selecciona una foto de perfil
                  </span>
                </label>
                <input
                  onChange={handleFileChange}
                  type="file"
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
                onClick={finalSubmit}
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
