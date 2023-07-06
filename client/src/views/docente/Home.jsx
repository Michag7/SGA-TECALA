import React from "react";

import logo from "../../assets/Logoapp.png";
import { Titulo } from "../../components/layout/Titulo";
import { NavbarApp } from "../../components/layout/NavbarApp";
import { getUser } from "../../auth/auth";

export const Home = () => {
  const user = getUser();

  return (
    <div>
      <NavbarApp />
      <Titulo titulo={"Home"} />
      <h2 className="ml-5 text-2xl font-bold">
        ¡Bienvenido/a de nuevo, {user.nombre} {user.apellido}!
      </h2>
      <div className="flex items-center justify-center w-full">
        <img
          className="my-32"
          src={logo}
          width={800}
          height={600}
          alt="nature image"
        />
      </div>
    </div>
  );
};
