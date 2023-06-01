import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

export const Titulo = ({ titulo }) => {
  return (
    <div className="flex items-center bg-blue-900 m-4 rounded-md p-1">
      <AiFillPlusCircle className="text-white ml-2"></AiFillPlusCircle>
      <h1 className="ml-2 text-white text-xl font-semibold">{titulo}</h1>
    </div>
  );
};
