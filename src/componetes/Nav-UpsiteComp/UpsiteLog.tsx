import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { User } from "../UserComp/User";
import MenuHamburguesa from "./MenuHamburguesa";
import { IconGame } from "./Game";
import "../../styles/navbar.css";

export function UpsiteLog() {
  return (
    <>
      <div className="upsite">
        <div className="cel-xd">
        <Logo />
        </div>
        <div className="contenido">
          <NavbarLog />
          <IconGame />
          <User/>
        </div>
      </div>
    </>
  );
}

export function NavbarLog() {
  const navegar = useNavigate();
  const inicio = "/inicio";
  const Comparadorsonidos = "/comparador-sonido";
  const Info = "/Informacion";
  const colegio = "/colegio"



  return (
  <>

    <div className='relative'>    
      <div className="container-navbar">
        <a className="txt-navbar" onClick={() => navegar(inicio)}>
          Inicio{" "}
        </a>
        <a className="txt-navbar" onClick={() => navegar(Info)}>
          {" "}
          Conoce
        </a>
        <a className="txt-navbar" onClick={() => navegar(Comparadorsonidos)}>
          {" "}
          Comparación
        </a>
        <a className="txt-navbar" onClick={() => navegar(colegio)}>
          {" "}
          Colegio
        </a>
      </div>
    </div>  

    <MenuHamburguesa/>
  </>
  );
} 
