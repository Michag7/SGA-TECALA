import logo1 from "../assets/GradosCards/grado1.svg";
import logo2 from "../assets/GradosCards/grado2.svg";
import logo3 from "../assets/GradosCards/grado3.svg";
import logo4 from "../assets/GradosCards/grado4.svg";
import logo5 from "../assets/GradosCards/grado5.svg";
import logo6 from "../assets/GradosCards/grado6.svg";
import logo7 from "../assets/GradosCards/grado7.svg";
import logo8 from "../assets/GradosCards/grado8.svg";
import logo9 from "../assets/GradosCards/grado9.svg";
import logo10 from "../assets/GradosCards/grado10.svg";
import logo11 from "../assets/GradosCards/grado11.svg";

export const logos = [
  logo4,
  logo5,
  logo6,
  logo7,
  logo8,
  logo9,
  logo10,
  logo11,
  logo1,
  logo2,
  logo3,
];

export const convertirFormatoFecha = (fecha) => {
  const fechaObjeto = new Date(fecha);
  const dia = fechaObjeto.getDate();
  const mes = fechaObjeto.getMonth() + 1;
  const anio = fechaObjeto.getFullYear();

  const fechaFormateada = `${dia < 10 ? "0" + dia : dia}/${
    mes < 10 ? "0" + mes : mes
  }/${anio}`;

  return fechaFormateada;
};

export const obtenerMes = (fecha) => {
  const fechaObjeto = new Date(fecha);
  const mes = fechaObjeto.getMonth();

  return mes;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
