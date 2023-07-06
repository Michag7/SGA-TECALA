import "./Home.css";
import Admin from "../../assets/Admin.png";
import Docente from "../../assets/Docente.png";
import Estudiante from "../../assets/Estudiante.png";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { Titulo } from "../../components/layout/Titulo";
import { getUser } from "../../auth/auth";
import logo from "../../assets/Logoapp.png";
export const HomeAdmin = () => {
  const user = getUser();
  return (
    <>
      <NavbarApp></NavbarApp>
      <Titulo titulo={"Home"}></Titulo>
      <h2 className="ml-5 text-2xl font-bold">
        ¡Bienvenido/a de nuevo, {user.nombre} {user.apellido}!
      </h2>
      <section id="home-section" className="ml-3 -mt-7">
        <div className="content">
          <div className="componentes">
            <div className="componente">
              <div className="box">
                <h1>400</h1>
                <h3>ESTUDIANTES</h3>
              </div>
              <div className="icon-case">
                <img src={Estudiante} alt="estudiantes" />
              </div>
            </div>

            <div className="componente">
              <div className="box">
                <h1>30</h1>
                <h3>DOCENTES</h3>
              </div>
              <div className="icon-case2">
                <img src={Docente} alt="estudiantes" />
              </div>
            </div>

            <div className="componente">
              <div className="box">
                <h1>3</h1>
                <h3>ADMIN</h3>
              </div>
              <div className="icon-case3">
                <img src={Admin} alt="estudiantes" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full -mt-32">
            <img
              className="my-32"
              src={logo}
              width={800}
              height={600}
              alt="nature image"
            />
          </div>
        </div>
      </section>
    </>
  );
};
