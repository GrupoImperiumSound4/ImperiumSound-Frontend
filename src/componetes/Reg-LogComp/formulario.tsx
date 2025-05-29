// Formulario.tsx
import  { useState, ChangeEvent, FormEvent } from "react";
import "../../styles/formulario.css";
import { useNavigate } from "react-router-dom";

interface FormData {
  userName: string;
  passw: string;
}

export function Formulario() {
  const navigate = useNavigate();
  const registroURL = "/registro";
  
  const [formData, setFormData] = useState<FormData>({
    userName: "",
    passw: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.userName === "" || formData.passw === "") {
      setError("Porfavor llene todos los campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://imperiumsound-backend-production.up.railway.app/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
         await console.log(errorData);
        throw new Error(errorData.error || "Error al Iniciar Sesion");
        
      }
      await console.log(response);
      navigate("/inicio");
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="formulario" onSubmit={handleSubmit}>
        <div className="flexp">
          <h1 className="formulario-titulo">Iniciar Sesión</h1>
          <div className="flex">
            <p className="formulario-texto-2 txt-f">¿Es tu primera vez?</p>
            <a
              className="formulario-texto-2"
              onClick={() => navigate(registroURL)}
            >
              Registrate
            </a>
          </div>
        </div>
        <div>
          <p className="formulario-texto">Usuario</p>
          <label htmlFor="userName"></label>
          <input
            className="inputRqd"
            id="userName"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="passw"></label>
          <p className="formulario-texto">Contraseña</p>
          <input
            className="inputRqd"
            id="passw"
            type="password"
            name="passw"
            value={formData.passw}
            onChange={handleChange}
          />
          <p className="formulario-texto-2 hover">¿Olvidaste la contraseña?</p>
        </div>
        <button type="submit" className="boton-Registrarte1">
          Iniciar Sesion
        </button>
        {error && <p className="error-message">{error}</p>}
        {loading && <p className="loading-message">Cargando...</p>}
      </form>
    </>
  );
}
