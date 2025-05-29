import React from 'react';
import Nosotros1 from "../../images/nosotros1.png"
import "../../styles/nosotros.css"


const NosotrosLog: React.FC = () => {
    return (
      <div>
        {/* Aplica la clase CSS a la imagen */}
        <img src={Nosotros1} alt="Logo" className="imagen-reducida" />
      </div>
    );
  };
  export default NosotrosLog