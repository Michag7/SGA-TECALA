import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stepper, Step, Typography, Input } from "@material-tailwind/react";
import { UserIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import { MdPassword } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export const RegistroDocente = () => {
  //Strepper
  const formArray = [1, 2];
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [formNo, setFormNo] = useState(formArray[0]);

  //Mostrar password
  const [mostrarPassword, setmostrarPassword] = useState(false);

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

  //Mostrar Docente
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
  const finalSubmit = () => {
    
    
    if (formNo === 2 && docente.password != docente.Rpassword) {
      toast.error("Las contraseñas no coinciden, intente de nuevo");
    } else if (
      formNo === 2 &&
      docente.username &&
      docente.password &&
      docente.Rpassword
    ) {
      toast.success("Registrado");
    } else {
      toast.error("Porfavor, llene todos los campos");
    }
  };

  return (
    <div className="flex justify-center items-center w-full ">
      <ToastContainer />
      <div className="w-full rounded-md shadow-md bg-white p-8">
        <div>
          <Stepper activeStep={activeStep}>
            <Step>
              <UserIcon className="h-5 w-5" />
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
              <MdPassword className="h-5 w-5" />
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
              <Input
                value={docente.genero}
                label="Genero"
                name="genero"
                onChange={HandleChange}
              />
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

            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={next}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
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
                      className="cursor-pointer text-blue-500"
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
                      className="cursor-pointer text-blue-500"
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
            </div>
            <div className="mt-4 gap-3 flex justify-center items-center">
              <button
                onClick={pre}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
              >
                Atras
              </button>
              <button
                onClick={finalSubmit}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
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
