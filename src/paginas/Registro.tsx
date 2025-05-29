import { Registrarse } from "../componetes/Reg-LogComp/registro";
import "../styles/registro.css" 
import UpsiteInt from "../componetes/Nav-UpsiteComp/UpsiteInt";

function Registro() {
  return (
    <>
    
     <UpsiteInt/>
        <div className="body">  
          <Registrarse />
        </div>
    
    </>
  );
}
export default Registro;
