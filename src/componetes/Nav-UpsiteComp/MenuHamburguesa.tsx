import { useState } from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "../../../public/menu.svg";
import "../../styles/menuhamburguesa.css";

<<<<<<< HEAD
=======



>>>>>>> andres
const MenuHamburguesa = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navegar = useNavigate();

  const toggleMenu = () => {
      setIsOpen(!isOpen);
      console.log("isOpen", !isOpen)
  }
  return (
    <div className="relative">
      <img
        src={menuIcon}
        alt="menu"
        width={32}
        height={32}
        onClick={toggleMenu}
        className="hamburguesa"
      />

      {isOpen && (
        <div className="menu-desplegable">
          <a className="txt-navbar-mv" onClick={() => navegar("/inicio")}>Inicio</a>
          <a className="txt-navbar-mv" onClick={() => navegar("/didactico")}>Conoce</a>
          <a className="txt-navbar-mv" onClick={() => navegar("/colegio")}>Colegio</a>
          <a className="txt-navbar-mv" onClick={() => navegar("/nosotros")}>Nosotros</a>
          <a className="txt-navbar-mv" onClick={() => navegar("/objetivos")}>Objetivos</a>
          <a className="txt-navbar-mv" onClick={() => navegar("/servicios")}>Servicios</a>
          <a className="txt-navbar-mv" onClick={() => navegar("/caracteristicas")}>Características</a>
          <a className="txt-navbar-mv" onClick={() => navegar("/contactanos")}>Contáctanos</a>
        </div>
      )}
    </div>
  );
};


export default MenuHamburguesa;