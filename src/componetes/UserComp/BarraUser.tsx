import { useEffect, useState } from "react";
import "../../styles/User.css";
import { useNavigate } from "react-router-dom";

interface UserType {
  id: number;
  name: string;
  email: string;
}

function BarraUser() {
  const navegar = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const Microfono = "/microConfig";
  const Soporte = "/soporte";
  const Info = "/cuenta"; 
  const API_URL = "https://imperium-sound-backend.vercel.app";

  const obtenerDatosUsuario = async () => {
    try {
      setLoading(true);
      
      console.log("🔍 Obteniendo datos del usuario con cookies...");

      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(`Respuesta del servidor: ${response.status}`);

      if (!response.ok) {
        console.log(`❌ Error ${response.status}`);
        if (response.status === 401) {
          localStorage.removeItem("user");
          navegar("/inicio-sesion");
          return;
        }
        throw new Error('Error al obtener datos del usuario');
      }

      const userData = await response.json();
      console.log("✅ Datos del usuario obtenidos:", userData);
      setUser(userData);
      
      localStorage.setItem("user", JSON.stringify(userData));
      
      setError(null);
    } catch (err) {
      console.error('Error:', err);
      setError('Error al cargar los datos del usuario');
      localStorage.removeItem("user");
      navegar("/inicio-sesion");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);

  const cerrarSesion = async () => {
    try {
      console.log("Cerrando sesión...");

      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem("user");

      if (response.ok) {
        console.log("✅ Sesión cerrada correctamente");
      } else {
        console.warn("⚠️ Error en el servidor, pero limpiando sesión local");
      }
      navegar("/inicio-sesion");

    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      localStorage.removeItem("user");
      navegar("/inicio-sesion");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <div className="ContenedorListaUser">
        <div className="cargar">
          Cargando...
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="ContenedorListaUser">
        <div className="nsfw">
          {error || 'No se pudieron cargar los datos'}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="ContenedorListaUser">
        <ul>
          <a onClick={() => navegar(Info)}>
            <li id="ListaUser">
              <h1>INFORMACION</h1>
            </li>
          </a>
          <a onClick={() => navegar(Microfono)}>
            <li id="ListaUser">
              <h1>MICROFONO</h1>
            </li>
          </a>
          <a onClick={() => navegar(Soporte)}>
            <li id="ListaUser">
              <h1>SOPORTE</h1>
            </li>
          </a>
        </ul>
        <div className="Linea"></div>
        <div className="ContenedorTxtUser">
          <h1 id="TitUser">INFORMACION PERSONAL</h1>
          <br />
          <br />
          <p id="TxtUser">Nombre: {user.name}</p>
          <br />
          <p id="TxtUser">Correo: {user.email}</p>
          <br />
          <br />
          <br />
          <button 
            onClick={cerrarSesion}
            className="Csesion"
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
          >
            Cerrar Sesión
          </button>

          <div className="ContenedorUserFoto">
            <div className="Perfil">
              {getInitials(user.name)}
            </div>
            <div className="ProfileInfo">
              <p>{user.name}</p>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BarraUser;