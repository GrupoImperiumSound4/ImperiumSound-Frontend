import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";
import "../styles/caracteristicas.css"
import CuadroCarac from "../componetes/CaractComp/CuadroCaracteristicas";
function Caracteristicas(){
    return(
        <>
        <UpsiteLog></UpsiteLog> 
            <div className="tituloCarac"><h1>CARACTERISTICAS</h1></div>
            <CuadroCarac></CuadroCarac>

        </>
    )
    
}
export default Caracteristicas;