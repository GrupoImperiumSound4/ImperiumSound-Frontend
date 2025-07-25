import Upsite from "../componetes/Upsite";
import { Formulario } from "../componetes/formulario";



function InicioSesion() {
  return (
    <>
      <div className="App">
        <Upsite />
        <div className="contenido">
          <Formulario />
        </div>
      </div>
    </>
  );
}

export default InicioSesion;
