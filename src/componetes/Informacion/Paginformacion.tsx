import React, { useEffect, useState, useRef } from "react";
import "../../styles/info.css";
export const PagInfo = () => {
  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>¿Quieres conocer sobre el sonido?</h1>
        <p>¡Este es tu lugar!</p>
      </header>

      <section className="seccion-contenido">
        <div className="contenido-imagen">
          <img src="public/img/entrada.png" className="imagen"/>
        </div>
        <div className="contenido-texto">
          <p>
            ksakkask
            
          </p>
        </div>
      </section>
    </div>
  );
};

export default PagInfo;