import "../styles/soporteup.css";
import UpsiteUser from "../componetes/Nav-UpsiteComp/Upsite_User";
import { NavUser } from "./MicroUP";


const SoporteUP =() =>{



    
    return(
        <>
       <div className="ContainerUser-sp">
    <UpsiteUser/>
    <NavUser/>
    <div className="ContainerContenidoUser">
        
        <h1 className="txt-provicional">🚧 Estamos Trabajando en esto 🚧</h1>
    </div>
    </div>
        </>
    )
}

export default SoporteUP;