import { useState } from "react";
import menuIcon from "../../../public/menu.svg";
import "../../styles/menuhamburguesa.css"

const MenuHamburguesa = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <img
        src={menuIcon} 
        alt="menu"
        width={32}
        height={32}
        className="hamburguesa"
      />
    </div>
    
  );
};

export default MenuHamburguesa;