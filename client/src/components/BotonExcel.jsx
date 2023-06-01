import React, { useState } from "react";
import * as XLSX from "xlsx";
import { RiFileExcel2Line, RiFileExcel2Fill} from "react-icons/ri";

const BotonExcel = ({ datos }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(datos);

    XLSX.utils.book_append_sheet(libro, hoja, "Tabla");

    setTimeout(() => {
      XLSX.writeFile(libro, "ProductosDefault.xlsx");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      
      <button className="flex items-center border-1 bg-green-900 text-white rounded-md p-2 mr-2 mb-2 lg:mb-0 lg:mr-3" onClick={handleDownload}><RiFileExcel2Fill className="mr-1" size={20}></RiFileExcel2Fill >Excel</button>
      {/* {!loading ? (
        <Button color="success" onClick={handleDownload}>
          Excel Default
        </Button>
      ) : (
        <Button color="success" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Generando...</span>
        </Button>
      )} */}
    </>
  );
};

export default BotonExcel;
