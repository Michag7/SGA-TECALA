import "./Home.css";
import Admin from "../../../assets/Admin.png";
import Docente from "../../../assets/Docente.png";
import Estudiante from "../../../assets/Estudiante.png";

export const HomeAdmin = () => {
  return (
    <section id="home-section">
      <div className="contenedor-titulo-home">
        <p className="bx bx-message-rounded-add"></p>
        <h4>¡Bienvenido a tu panel administrativo!</h4>
      </div>

      <div className="content">
        <div className="componentes">
          <div className="componente">
            <div className="box">
              <h1>400</h1>
              <h3>ESTUDIANTES</h3>
            </div>
            <div className="icon-case">
              <img src ={Estudiante} alt="estudiantes" />
            </div>
          </div>

          <div className="componente">
            <div className="box">
              <h1>30</h1>
              <h3>DOCENTES</h3>
            </div>
            <div className="icon-case2">
              <img src ={Docente} alt="estudiantes" />
            </div>
          </div>

          <div className="componente">
            <div className="box">
              <h1>3</h1>
              <h3>ADMIN</h3>
            </div>
            <div className="icon-case3">
              <img src ={Admin} alt="estudiantes" />
            </div>
          </div>
        </div>

        <div className="content-2">
          <div className="usuarios-nuevos">
            <div className="titulo-tabla">
              <h3>Usuarios nuevos</h3>
              <button>Ver Más</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Identificación</th>
                  <th>Nombre</th>
                  <th>Rol</th>
                  <th>Fecha activación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1110282253</td>
                  <td>Jaime Duqué</td>
                  <td>Docente</td>
                  <td>10/05/2023</td>
                </tr>
                <tr>
                  <td>1006154221</td>
                  <td>Diana Hoyos</td>
                  <td>Estudiante</td>
                  <td>10/05/2023</td>
                </tr>
                <tr>
                  <td>1002651987</td>
                  <td>Brayan Morales</td>
                  <td>Docente</td>
                  <td>10/05/2023</td>
                </tr>
                <tr>
                  <td>1001548721</td>
                  <td>Yaneth Lozada</td>
                  <td>Estudiante</td>
                  <td>10/05/2023</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="permisos">
            <h3 style={{ textAlign: "center" }}>Permisos otorgados</h3>
            <div className="usuarios-permisos">
              <p className="bx bxs-user-circle" style={{ color: "#1877f2" }}></p>
              <div className="usuarios-name">
                <h5>Matias Bautista</h5>
                <p>Inventario-Sala de róbotica</p>
              </div>
              <p className="permisos-fecha">Hoy</p>
            </div>

            <div className="usuarios-permisos">
              <p className="bx bxs-user-circle" style={{ color: "#1877f2" }}></p>
              <div className="usuarios-name">
                <h5>Jorge Mendéz</h5>
                <p>Inventario-Sala de sistemas #2</p>
              </div>
              <p className="permisos-fecha">Ayer</p>
            </div>

            <div className="usuarios-permisos">
              <p className="bx bxs-user-circle" style={{ color: "#1877f2" }}></p>
              <div className="usuarios-name">
                <h5>Mariam Ochoa</h5>
                <p>Inventario-Sala de róbotica</p>
              </div>
              <p className="permisos-fecha">12/09</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};