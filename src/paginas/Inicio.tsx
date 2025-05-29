
import "../styles/inicio.css";
import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";


function PagInicio() {
  return (
    <>
      <UpsiteLog></UpsiteLog>
      <div className="container">

      <div id="textInicioMargen" className="txtPrincipal">
      <div className="TituloPagInicio"><h1>IMPERIUM <br/>SOUND</h1></div>
    <br />
    <br />
        <p className="inicioTxt">
          <br />
          <br />
          Mide el ruido de tu entorno en tiempo real con nuestra
          herramienta en línea. Con unos clics, descubre la intensidad
          del sonido y mejora tu bienestar acústico. ¡Registrate y disfruta
          de un entorno más tranquilo hoy mismo!
        </p>
      </div>
      <div className="senor1" />
      </div>
      
      
    </>
  );
}

export default PagInicio;