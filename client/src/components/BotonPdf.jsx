import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { BsFiletypePdf } from "react-icons/bs";

export const BotonPdf = ({ columsName, datos, archivoName, titleDocument }) => {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(titleDocument, 20, 10);
    doc.autoTable({
      theme: "striped",
      columns: columsName,
      body: datos,
    });
    doc.save(archivoName);
  };
  return (
    <>
      <button
        className="flex items-center border-1 bg-red-900 text-white rounded-md p-2 mr-2 mb-2 lg:mb-0 lg:mr-5"
        onClick={() => downloadPdf()}
      >
        <BsFiletypePdf className="mr-1" size={20}></BsFiletypePdf>PDF
      </button>
    </>
  );
};
