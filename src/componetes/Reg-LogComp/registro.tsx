import React, { useState } from "react";
import "../../styles/formularioReg.css";
import { useNavigate } from "react-router-dom";

export function Registrarse() {
  const navegar = useNavigate();
  const inicioSesionURL = "/inicio-sesion";

  const [nombre, setNombre] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");          // ← estado de usuario
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [confirmarContrasena, setConfirmarContrasena] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const apiUrl =
    import.meta.env.VITE_API_URL ??
    "https://imperiumsound-backend-production.up.railway.app";

  const manejarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const data = {
      userName: usuario,
      nombre,
      email: correo,
      passw: contrasena,
    };
    const apiURL = `${apiUrl}/users`;

    try {
      const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error de red: ${response.status}`);
      }

      const json = await response.json();
      console.log("Registro exitoso:", json);
      navegar(inicioSesionURL);
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("Ingrese todos los campos correctamente.");
    }
  };

  return (
    <>
      <form className="formulario" onSubmit={manejarSubmit}>
        <div className="flexp">
          <h1 className="formulario-titulo">Regístrate</h1>
          <div className="flex">
            <p className="formulario-texto-2 txt-f">¿Ya tienes cuenta?</p>
            <a
              className="formulario-texto-2"
              onClick={() => navegar(inicioSesionURL)}
            >
              Inicia sesión
            </a>
          </div>
        </div>

        {/* Campo nombre completo */}
        <div id="a">
          <p className="formulario-texto">Nombre Completo</p>
          <input
            className="inputRqd"
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Nuevo campo usuario */}
        <div id="a">
          <p className="formulario-texto">Nombre de Usuario</p>
          <input
            className="inputRqd"
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>

        {/* Campo correo */}
        <div id="a">
          <p className="formulario-texto">Correo Electrónico</p>
          <input
            className="inputRqd"
            id="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        {/* Campo contraseña */}
        <div id="a">
          <p className="formulario-texto">Contraseña</p>
          <input
            className="inputRqd"
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>

        {/* Confirmar contraseña */}
        <div id="a">
          <p className="formulario-texto">Confirmar Contraseña</p>
          <input
            className="inputRqd"
            id="Ccontrasena"
            type="password"
            value={confirmarContrasena}
            onChange={(e) => setConfirmarContrasena(e.target.value)}
          />
        </div>

        <div id="a">
          <button type="submit" className="boton-Registrarte">
            Registrarse
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </>
  );
}

