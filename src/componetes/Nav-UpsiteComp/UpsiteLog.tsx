import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { User } from "../UserComp/User";
import { ValidToken } from "../ValidToken/ValidToken";
import { useEffect } from "react";
import MenuHamburguesa from "./MenuHamburguesa";
import { IconGame } from "./Game";
import "../../styles/navbar.css";

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
