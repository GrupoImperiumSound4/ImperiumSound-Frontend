import Logo from "./Logo";
import "../../styles/upsite.css";
import { useNavigate } from "react-router-dom";

function UpsiteInt() {
  const navegar = useNavigate();

  const inicioUrl = "/";
  return (
    <>
      <div className="upsiteInt">
        <Logo />
        <a className="tituloNavbar" onClick={() => navegar(inicioUrl)}>
          Volver{" "}
        </a>
      </div>
    </>
  );
}

export default UpsiteInt;
