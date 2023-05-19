
import { Route, Routes } from "react-router-dom";
import { HomeAdmin } from "./views/Home";
import { Inventario } from "./views/Inventario";
import AdminTemplate from "../../components/admin/AdminTemplate";
import { Docente } from "./views/Docente";

export function RoutesAdministrador() {
  return (
    <AdminTemplate>
      <Routes>
        <Route path="home" element={<HomeAdmin />} />
        <Route path="grados" element={<h1>Grados</h1>} />
        <Route path="docentes" element={<Docente />} />
        <Route path="bitacoras" element={<h1>Bitácoras</h1>} />
        <Route path="inventario" element={<Inventario />} />
      </Routes>
    </AdminTemplate>
  );
}