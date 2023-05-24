import { useState } from 'react';
import "./RegistroDocente.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistroDocente = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
      setCurrentStep(currentStep + 1);
      if (currentStep === 3) {
        toast.success('Se ha insertado un nuevo registro en la base de datos!');
      }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const setProgressBar = (curStep) => {
    const percent = ((100 / steps) * curStep).toFixed();
    const progressBarStyle = {
      width: `${percent}%`,
    };
    return progressBarStyle;
  };

  const steps = 4; // Formulario multipasos
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-11 col-sm-10 col-md-10 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
          <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
            <h2 id="heading">Registrar Docente</h2> 
            <p>Diligencie todos los campos para avanzar a la sgte sesion.</p>
            <form id="msform">
              {/* progressbar */}
              <ul id="progressbar">
                <li className={currentStep === 1 ? 'active' : ''} id="account">
                  <strong>Personal</strong>
                </li>
                <li className={currentStep === 2 ? 'active' : ''} id="personal">
                  <strong>Asignaciones</strong>
                </li>
                <li className={currentStep === 3 ? 'active' : ''} id="payment">
                  <strong>Cuenta</strong>
                </li>
                <li className={currentStep === 4 ? 'active' : ''} id="confirm">
                  <strong>Finalizado</strong>
                </li>
              </ul>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={setProgressBar(currentStep)}
                ></div>
              </div>
              <br />
              {/* fieldsets */}
              <fieldset style={{ display: currentStep === 1 ? 'block' : 'none' }}>
                <div className="form-card">
                  <div className="row">
                    <div className="col-7">
                      <h2 className="fs-title">Información personal</h2>
                    </div>
                    <div className="col-5">
                      <h2 className="steps">Sesion 1 - 4</h2>
                    </div>
                   </div>
                  <label className="fieldlabels">Nombre completo: *</label>
                  <input type="text" name="email" placeholder="Ingrese nombres y apellidos" />
                  <label className="fieldlabels">Identificación: *</label>
                  <input type="text" name="uname" placeholder="Ingrese número de cédula" />
                  <label className="fieldlabels">Teléfono: *</label>
                  <input type="text" name="pwd" placeholder="Ingrese número telefónico" />
                </div>
                <input
                  type="button"
                  name="next"
                  className="next action-button"
                  value="Siguiente"
                  onClick={handleNext}
                />
              </fieldset>
              <fieldset style={{ display: currentStep === 2 ? 'block' : 'none' }}>
                <div className="form-card">
                  <div className="row">
                    <div className="col-7">
                      <h2 className="fs-title">Designación de grados</h2>
                    </div>
                    <div className="col-5">
                      <h2 className="steps">Sesión 2 - 4</h2>
                    </div>
                  </div>
                  <label className="fieldlabels">Grado: *</label>
                  <input type="text" name="fname" placeholder="Seleccione" />
                  <label className="fieldlabels">Asignatura: *</label>
                  <input type="text" name="lname" placeholder="Seleccione" />
                </div>
                <input
                  type="button"
                  name="next"
                  className="next action-button"
                  value="Siguiente"
                  onClick={handleNext}
                />
                <input
                  type="button"
                  name="previous"
                  className="previous action-button-previous"
                  value="Anterior"
                  onClick={handlePrevious}
                />
              </fieldset>
              <fieldset style={{ display: currentStep === 3 ? 'block' : 'none' }}>
                <div className="form-card">
                  <div className="row">
                    <div className="col-7">
                      <h2 className="fs-title">Creación de cuenta</h2>
                    </div>
                    <div className="col-5">
                      <h2 className="steps">Sesión 3 - 4</h2>
                    </div>
                  </div>
                  <label className="fieldlabels">Correo: *</label>
                  <input type="text" name="fname" placeholder="Ingrese correcto electrónico" />
                  <label className="fieldlabels">Contraseña generada: *</label>
                  <input type="password" name="fname" placeholder="Contraseña asignada" />
                  <label className="fieldlabels">Subir foto:</label>
                  <input type="file" name="pic" accept="image/*" />
                </div>
                <input
                  type="button"
                  name="next"
                  className="next action-button"
                  value="Confirmar"
                  onClick={handleNext}
                />
                <input
                  type="button"
                  name="previous"
                  className="previous action-button-previous"
                  value="Anterior"
                  onClick={handlePrevious}
                />
              </fieldset>
              <fieldset style={{ display: currentStep === 4 ? 'block' : 'none' }}>
                <div className="form-card">
                  <div className="row">
                    <div className="col-7">
                      <h2 className="fs-title">Cuenta creada</h2>
                    </div>
                    <div className="col-5">
                      <h2 className="steps">Sesión 4 - 4</h2>
                    </div>
                  </div>
                  <br />
                  <br />
                  <h2 className="purple-text text-center">
                    <strong>¡La cuenta del docente se ha creado satisfactoriamente!</strong>
                  </h2>
                </div>
              </fieldset>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};
