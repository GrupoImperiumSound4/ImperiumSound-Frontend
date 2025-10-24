import React, { useState } from "react";
import "../../styles/formularioReg.css";
import { useNavigate } from "react-router-dom";

export function Registrarse() {
  const navegar = useNavigate();
  const loginURL = "/inicio-sesion";

  const [usuario, setUsuario] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [contrasena, setContrasena] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const apiUrl = 'http://localhost:8000';

  const manejarSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario || !correo || !contrasena) {
      setError("Por favor llene todos los campos.");
      return;
    }

    setLoading(true);
    setError("");

    const data = {
      name: usuario,
      email: correo,
      password: contrasena,
    };

    try {
      const response = await fetch(`${apiUrl}/crear_usuario`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const jsonData = await response.json();

      if (!response.ok) {
        throw new Error(jsonData.detail || `Error: ${response.status}`);
      }

      console.log("Registro exitoso:", jsonData);
      
      navegar(loginURL);
      
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError((err as Error).message || "No se pudo completar el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="formulario" onSubmit={manejarSubmit}>
      <div className="flexp">
        <h1 className="formulario-titulo">Regístrate</h1>
        <div className="flex">
          <p className="formulario-texto-2 txt-f">¿Ya tienes cuenta?</p>
          <a
            className="formulario-texto-2"
            onClick={() => navegar(loginURL)}
            style={{ cursor: 'pointer' }}
          >
            Inicia sesión
          </a>
        </div>
      </div>

      <div id="a">
        <p className="formulario-texto">Nombre de Usuario</p>
        <input
          className="inputRqd"
          id="name"
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div id="a">
        <p className="formulario-texto">Correo Electrónico</p>
        <input
          className="inputRqd"
          id="email"
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
          disabled={loading}
        />
      </div>

      <div id="a">
        <p className="formulario-texto">Contraseña</p>
        <input
          className="inputRqd"
          id="password"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
          minLength={6}
          disabled={loading}
        />
      </div>

      <div id="a">
        <button 
          type="submit" 
          className="boton-Registrarte"
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </div>
      
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}