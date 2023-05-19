import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import { RoutesAdministrador } from "./sections/administrador/RoutesAdministrador";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home></Home>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/admin/*" element={<RoutesAdministrador />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
