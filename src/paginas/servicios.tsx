import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";
import "../styles/servicios.css";
import Cuadro from "../componetes/ServicesComp/cuadro";
import AcceInf from "../componetes/InfoComp/info";
function Servicios() {
  return (
    <>
    
      <UpsiteLog/>
      <AcceInf/>
      <div className="body">
      <div>
      <div className="titulo1">
      <h1>SERVICIOS</h1>
      </div>
      <Cuadro></Cuadro>
        </div>
      </div>
    </>
  );
}

export default Servicios;