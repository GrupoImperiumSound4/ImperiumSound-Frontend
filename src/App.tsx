import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Index from "./paginas/Index";
import InicioSesion from "./paginas/InicioSesion";
import Registro from "./paginas/Registro";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/inicio-sesion" element={<InicioSesion />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
