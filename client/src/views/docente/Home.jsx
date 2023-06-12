import React from "react";

import logo from "../../assets/Logoapp.png";

export const Home = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <img
        className="my-32"
        src={logo}
        width={800}
        height={600}
        alt="nature image"
      />
    </div>
  );
};
