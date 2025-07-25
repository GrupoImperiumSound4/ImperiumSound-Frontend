// Formulario.tsx
import React, { useState } from "react";
import "../styles/formulario.css";
 // Asegúrate de que esta ruta sea correcta

export function Formulario() {
  const [nombre, setNombre] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");

  const manejarSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Nombre:", nombre);
    console.log("Contraseña:", contrasena);
  };

  return (
    <>
      <form className="formulario" onSubmit={manejarSubmit}>
        <h1>Iniciar Sesión</h1>
        <div>
          <p>Correo*</p>
          <label htmlFor="nombre"></label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contrasena"></label>
          <p>Contraseña *</p>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </>
  );
}
