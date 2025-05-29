import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navegar = useNavigate();

  const inicioSesionURL = "/inicio-sesion";
  const registroURL = "/registro";

  return (
    <>
      <div className="container">
        <a className="txt-navbar" onClick={() => navegar(inicioSesionURL)}>
          Iniciar sesion{" "}
        </a>
        <a className="txt-navbar" onClick={() => navegar(registroURL)}>
          {" "}
          Registro
        </a>
      </div>
    </>
  );
}

export default Navbar;
