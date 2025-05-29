import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { User } from "../UserComp/User";
import { ValidToken } from "../ValidToken/ValidToken";
import { useEffect } from "react";
export function UpsiteLog() {
const navigate = useNavigate()
const isLogin = async () =>{
  
  const result = await ValidToken()
  if(result == null){
    navigate('/')
    console.log('no estas logueado')
    return
  }
  console.log('estas logueado')
  
}

useEffect(()=>{
  isLogin()
},[])

  return (
    <>
      <div className="upsite">
        <Logo />
        <div className="contenido">
          <NavbarLog />
          <User />
        </div>
      </div>
    </>
  );
}

export function NavbarLog() {
  const navegar = useNavigate();
  const inicio = "/inicio";
  const nosotros = "/nosotros";
  const objetivos = "/objetivos";
  const sevicios = "/servicios";
  const caracteristicas = "/caracteristicas";
  const contactanos = "/contactanos";

  return (
    <>
      <div className="container">
        <a className="txt-navbar" onClick={() => navegar(inicio)}>
          Inicio{" "}
        </a>
        <a className="txt-navbar" onClick={() => navegar(nosotros)}>
          {" "}
          Nosotros
        </a>
        <a className="txt-navbar" onClick={() => navegar(objetivos)}>
          {" "}
          Objetivos
        </a>
        <a className="txt-navbar" onClick={() => navegar(sevicios)}>
          {" "}
          Servicios
        </a>
        <a className="txt-navbar" onClick={() => navegar(caracteristicas)}>
          {" "}
          Caracteristicas
        </a>
        <a className="txt-navbar" onClick={() => navegar(contactanos)}>
          {" "}
          Contactanos
        </a>
      </div>
    </>
  );
}
