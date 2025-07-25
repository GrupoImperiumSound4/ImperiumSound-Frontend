import Logo from "../componetes/Logo";
import Navbar from "../componetes/Navbar";
import "../styles/upsite.css";

function Upsite() {
  return (
    <>
      <div className="upsite">
        <Logo />
        <Navbar Titulo={"Iniciar Sesión"} children={"registrate"} />
      </div>
    </>
  );
}
export default Upsite;
