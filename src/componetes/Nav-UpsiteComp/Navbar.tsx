import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navegar = useNavigate();

  const inicioSesionURL = "/inicio-sesion";

  return (
    <>
      <div className="container">
        <a className="txt-navbar" onClick={() => navegar(inicioSesionURL)}>
          Iniciar sesion{" "}
        </a>
      </div>
    </>
  );
}

export default Navbar;
