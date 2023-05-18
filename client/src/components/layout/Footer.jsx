import React from "react";

export const Footer = () => {
  return (
    <footer className="relative pt-8 pb-6 bg-gradient-to-b from-blue-500 to-blue-900 ">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12  px-4">
            <h4 className="text-3xl font-bold text-white">
              TERESA CALDERON DE LASSSO
            </h4>
            <h5 className="text-base font-normal mt-3 mb-2 text-white">
              Somos una intitutucion de carácter público, mixto, aprobada por el
              Ministerio de Educación Nacional y Secretaría de Educación del
              Valle, mediante resolución No. de 1788 de Septiembre 04 de 2002
              para impartir enseñanza formal, en los niveles de Preescolar,
              Básica Primaria, Básica Secundaria y Media y en calendario A.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i
                  className="fa-brands fa-facebook-f"
                  style={{ color: "#1877f2" }}
                ></i>
              </button>
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i
                  className="fa-brands fa-twitter"
                  style={{ color: "#1877f2" }}
                ></i>
              </button>
              <button
                className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                type="button"
              >
                <i
                  className="fa-brands fa-instagram"
                  style={{ color: "#1877f2" }}
                ></i>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-white text-sm font-bold mb-2">
                  Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-white hover:text-blueGray-800 font-normal block pb-2 text-sm"
                      href="https://www.creative-tim.com/presentation?ref=njs-profile"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-blueGray-800 font-normal block pb-2 text-sm"
                      href="https://blog.creative-tim.com?ref=njs-profile"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-blueGray-800 font-normal block pb-2 text-sm"
                      href="https://www.github.com/creativetimofficial?ref=njs-profile"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-blueGray-800 font-normal block pb-2 text-sm"
                      href="https://www.creative-tim.com/bootstrap-themes/free?ref=njs-profile"
                    >
                      Free Products
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-white text-sm font-bold mb-2">
                  Contacto
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-white hover:text-blueGray-800 font-normal block pb-2 text-sm"
                      href="https://github.com/creativetimofficial/notus-js/blob/main/LICENSE.md?ref=njs-profile"
                    >
                      <i
                        className="fa-solid fa-phone"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      3167680711 - 22624007
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-blueGray-800 font-normal block pb-2 text-sm"
                      href="https://creative-tim.com/terms?ref=njs-profile"
                    >
                      <i
                        className="fa-solid fa-envelope"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      tecala@hotmail.com.
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-white hover:text-blueGray-800 font-normal block pb-2 text-sm"
                      href="https://creative-tim.com/privacy?ref=njs-profile"
                    >
                      <i
                        className="fa-solid fa-location-dot"
                        style={{ color: "#ffffff" }}
                      ></i>{" "}
                      Calle 42 # 16 - 60 Barrio primero de Mayo, Palmira,
                      Colombia.
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center md:justify-between justify-center mt-5">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-white font-semibold py-1">
              Copyright © <span id="get-current-year">2021</span>
              <a
                href="https://www.creative-tim.com/product/notus-js"
                className="text-white hover:text-gray-800"
                target="_blank"
              />{" "}
              Notus JS by
              <a
                href="https://www.creative-tim.com?ref=njs-profile"
                className="text-white hover:text-blueGray-800"
              >
                Creative Tim
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
