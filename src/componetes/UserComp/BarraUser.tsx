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
  const API_URL = "http://localhost:8000";

  const obtenerDatosUsuario = async () => {
    try {
      setLoading(true);
      
      // ✅ Obtener el token de localStorage
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        console.log("❌ No hay token en localStorage");
        navegar("/");
        return;
      }

      console.log("🔍 Obteniendo datos del usuario...");

      const response = await fetch(`${API_URL}/user/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // ← ESTO ES LO QUE FALTABA
        },
      });

      if (!response.ok) {
        console.log(`❌ Error ${response.status}`);
        if (response.status === 401) {
          // Token inválido, limpiar localStorage
          localStorage.removeItem("access_token");
          localStorage.removeItem("user");
          navegar("/");
          return;
        }
        throw new Error('Error al obtener datos del usuario');
      }

      const userData = await response.json();
      console.log("✅ Datos del usuario obtenidos:", userData);
      setUser(userData);
      setError(null);
    } catch (err) {
      console.error('❌ Error:', err);
      setError('Error al cargar los datos del usuario');
      // Limpiar localStorage en caso de error
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      navegar("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerDatosUsuario();
  }, []);


  const cerrarSesion = async () => {
    try {
      const token = localStorage.getItem("access_token");
      
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (response.ok) {
        // Limpiar localStorage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        console.log("✅ Sesión cerrada correctamente");
        navegar("/");
      }
    } catch (err) {
      console.error('❌ Error al cerrar sesión:', err);
      // Aún así limpiar y redirigir
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      navegar("/");
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