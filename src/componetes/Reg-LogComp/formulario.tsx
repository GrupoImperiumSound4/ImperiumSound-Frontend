// Formulario.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import "../../styles/formulario.css";
import { useNavigate, useLocation } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
}

export function Formulario() {
  const navigate = useNavigate();
  const location = useLocation();
  const registroURL = "/Registro";

  const from = (location.state as any)?.from || "/";
  console.log("Redirigiendo a:", from);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const ApiURL = "https://imperium-sound-backend.vercel.app";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setError("Por favor llene todos los campos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Iniciando sesión...");

      const response = await fetch(`${ApiURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Obligatorio para recibir y enviar cookies
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (!response.ok) {
        throw new Error(data.detail || "Error al iniciar sesión");
      }

      // EL TOKEN ESTÁ EN LA COOKIE (HttpOnly) → NO LO GUARDES EN LOCALSTORAGE
      // Solo guarda el usuario si lo necesitas en el frontend
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("Usuario guardado en localStorage:", data.user);
      }

      console.log("Login exitoso. Token guardado en cookie HttpOnly.");
      navigate(from, { replace: true });

    } catch (error) {
      console.error("Error en login:", error);
      if (error instanceof TypeError && error.message.includes("fetch")) {
        setError("No se puede conectar al servidor. Verifica tu conexión.");
      } else {
        setError((error as Error).message);
      }
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
              style={{ cursor: "pointer" }}
            >
              Regístrate
            </a>
          </div>
        </div>

        <div>
          <p className="formulario-texto">Correo Electrónico</p>
          <label htmlFor="email"></label>
          <input
            className="inputRqd"
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password"></label>
          <p className="formulario-texto">Contraseña</p>
          <input
            className="inputRqd"
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="formulario-texto-2 hover">¿Olvidaste la contraseña?</p>
        </div>

        <button
          type="submit"
          className="boton-Registrarte1"
          disabled={loading}
        >
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </>
  );
}