import { useState } from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "../../../public/menu.svg";
import "../../styles/menuhamburguesa.css";
import { motion, AnimatePresence } from "framer-motion"; 


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

       <AnimatePresence>
        {isOpen && (
          <motion.div
            className="menu-desplegable"
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }}       
            exit={{ opacity: 0, x: 50 }}       
            transition={{ duration: 0.5 }}       
          >
            <a className="txt-navbar-mv" onClick={() => navegar("/inicio")}>Inicio</a>
            <a className="txt-navbar-mv" onClick={() => navegar("/comparador-sonido")}>xd</a>
            <a className="txt-navbar-mv" onClick={() => navegar("/informacion")}>Conoce</a>
            <a className="txt-navbar-mv" onClick={() => navegar("/colegio")}>Colegio</a>
        
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


export default MenuHamburguesa;