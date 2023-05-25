import ReactModal from 'react-modal';
import "./Carnet.css";
import Colegio from "../../../assets/Colegio.png";
import Avatar from "../../../assets/fotoEjemplo.jpg";
import CodigoQR from "../../../assets/qr_ejemplo.png";

export const Carnet = ({ isOpen, closeModal }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Modal"
      style={{
        content: {
          width: '50%',
          height: '80%',
          margin: 'auto',
        },
      }}
    >
      <button className="close-button" onClick={closeModal}>
       X
      </button>
      <div className="wrapper-carnetT">
        <div className="container-carnetT">
          <div className="left">
            <h1 className='rol'>DOCENTE</h1>
          </div>
          <div className="right">
            <img src = {Colegio} alt="icono" className="logo-colegio" />
            <h4 className ="titulo">TERESA CALDERÓN</h4>
            <h1 className ='subtitulo'>DE LASSO</h1>
            <img src = {Avatar} alt="perfil-foto" className="foto" />
            <div className="nombre-estudiante">
              <h3 className="nombre">Name Teacher</h3>
            </div>
            <h4 className="identificacion">C.C:1006285742</h4>
            <img src= {CodigoQR} alt="perfil-foto" className="codeQR" />
          </div>
        </div>
      </div>
    </ReactModal>
  );
};









