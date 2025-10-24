import { useState } from "react";
import "../../styles/info.css"
import {  motion ,AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";



export default function AcceInfo() {
    const navegar = useNavigate();

    const [abierto,setAbierto] = useState(false)

    const toggleMenu = () => {
         setAbierto(!abierto);
    };
    
  return (
   <>
    <div className="relative">
    <div className="cont-mayor">
        <button
        onClick={toggleMenu}
        style={{
            border: "none",
            background: "transparent",
            padding: 0,
            cursor: "pointer",
            borderRadius: "50%",      
            overflow: "hidden",       
            width: "3.5em",
            height: "3.5em",
        }}
        >
            
            <img
            src="../../../public/info.svg"
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",     
                borderRadius: "50%",    

            }}
            />
            
        </button>
    </div>
    
    <AnimatePresence>
    {abierto && (
    <motion.div
         className="menu-desplegable-info"
         initial={{ opacity: 0, x: 50 }} 
         animate={{ opacity: 1, x: 0 }}       
         exit={{ opacity: 0, x: 50 }}       
         transition={{ duration: 0.5 }}       
        >
         <a className="sexiones" onClick={() => navegar ("/objetivos")}>Objetivos</a>
         <a className="sexiones" onClick={() => navegar ("/nosotros")}>Nosotros</a>
         <a className="sexiones" onClick={() => navegar ("/servicios")}>Servicios</a>
         <a className="sexiones" onClick={() => navegar ("/caracteristicas")}>Caracteristicas</a>
         <a className="sexiones" onClick={() => navegar ("/contactanos")}>Contactanos</a>

    </motion.div>
    )}
    </AnimatePresence>
    </div>
   </>

  )
}




