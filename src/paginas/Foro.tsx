import ForoCuadro from "../componetes/ForoComp/RecuadroForo"
import "../styles/RecuadroForo.css"

import UpsiteUser from "../componetes/Nav-UpsiteComp/Upsite_User"

function Foro(){
    return(
        <>
        <UpsiteUser/>
        <h1 id="TitleForo">Foro</h1>
        <p id="SubtitleForo">Bienvenido al foro de imperium sound, sube aqui tu comentario</p>
        <ForoCuadro></ForoCuadro>
        </>
    )
}
export default Foro