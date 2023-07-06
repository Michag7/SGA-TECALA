import React from "react";
import { useReactToPrint } from "react-to-print";
import { saveAs } from "file-saver";
import Colegio from "../../assets/colegio.png";
import CodigoQR from "../../assets/qr_ejemplo.png";
import "../../css/Carnet.css";
import { getImagenP, getUser } from "../../auth/auth";
import { NavbarApp } from "../../components/layout/NavbarApp";

export const Carnet = () => {
  const componentRef = React.useRef();

  const user = getUser();
  const avatar = getImagenP();

  const handleAfterPrint = () => {
    // Generate PDF from the printed content
    const input = componentRef.current;
    const pdfOptions = {
      filename: `${user.id}.pdf`,
      image: { type: "png" },
    };

    saveAs(pdf.from(input).toBlob(), pdfOptions.filename);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${user.id}-carnet.pdf`,
    onAfterPrint: handleAfterPrint,
  });

  return (
    <div className="w-full h-screen">
      <NavbarApp></NavbarApp>

      <div
        className="flex items-center justify-center mt-20 ml-52"
        ref={componentRef}
      >
        <div className="container-carnetT">
          <div className="left">
            <h1 className="rol">{user.rol.toUpperCase()}</h1>
          </div>
          <div className="right">
            <img src={Colegio} alt="icono" className="logo-colegio" />
            <h4 className="titulo">TERESA CALDERÓN</h4>
            <h1 className="subtitulo">DE LASSO</h1>
            <img
              src={`data:image/png;base64,${avatar}`}
              alt="perfil-foto"
              className="foto"
            />
            <div className="nombre-estudiante">
              <h3 className="nombre">
                {user.nombre} {user.apellido}
              </h3>
            </div>
            <h4 className="identificacion">C.C:{user.id}</h4>
            <img src={CodigoQR} alt="perfil-foto" className="codeQR" />
          </div>
        </div>
      </div>

      <div>
        <button
          className="flex justify-center p-2 text-white bg-red-500 rounded-lg print-button"
          onClick={handlePrint}
        >
          Descargar PDF
        </button>
      </div>
    </div>
  );
};
