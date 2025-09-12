import "../styles/User.css"
import UpsiteUser from "../componetes/Nav-UpsiteComp/Upsite_User";
import MicrophoneVisualizer from "../componetes/UserComp/MicroPrueba";
import { useNavigate } from "react-router-dom";
import AudioAnalyzer from "../componetes/UserComp/MicroMedir";

function MicroUP (){
    return(
        <>
        <div className="ContainerUser">
    <UpsiteUser/>
    <div className="ContainerContenidoUser">
        <NavUser/>
        <div className="ContainerTxtMic">
            <h1>Prueba de Micrófono</h1>
            <p id="txtMicUp">Realiza aqui una prueba para saber si tu microfono esta funcionando correctamente</p>
            <MicrophoneVisualizer></MicrophoneVisualizer>
            <br /><br />
            <AudioAnalyzer></AudioAnalyzer>

        </div>
    </div>
  </div>
        </>
    )
}
export default MicroUP;

export function NavUser(){
    const navegar = useNavigate();
    const Microfono = "/microConfig";
    const Soporte = "/soporte";
    const Info = "/cuenta";
    
    return(
        <>
        <div className="ContenedorListaUser">
            <ul>
                <a onClick={() => navegar(Info)}>{" "}<li id="ListaUser"><h1>INFORMACION</h1></li></a>
                <a onClick={() => navegar(Microfono)}>{" "}<li id="ListaUser"><h1>MICROFONO</h1></li></a>
                <a onClick={() => navegar(Soporte)}>{" "}<li id="ListaUser"><h1>SOPORTE</h1></li></a>
                
            </ul>
                <div className="Linea"></div>
        </div>
        </>
    )
}