import Logo from "../Nav-UpsiteComp/Logo";
import "../../styles/upsite.css";
import Salir from "../../images/LogoSalir.png";
import { useNavigate } from "react-router-dom";

function UpsiteUser() {
  return (
    <>
      <div className="upsite">
        <Logo />
        <NavbarUser />
      </div>
    </>
  );
}
export default UpsiteUser;

export function NavbarUser() {
  const navegar = useNavigate();
  const Inicio = "/inicio";

  return (
    <>
      <div className="container">
        <a className="txt-navbar" onClick={() => navegar(Inicio)}>
          <img className="ImagenSalir" src={Salir} />
        </a>
      </div>
    </>
  );
}
