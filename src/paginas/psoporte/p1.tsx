import "../../styles/pregunta1.css";
import { useNavigate } from 'react-router-dom'
import UpsiteUser from "../../componetes/Nav-UpsiteComp/Upsite_User";



const Pregunta1 =() =>{
    const navegar  = useNavigate();
    const Microfono = "/microConfig";
    const Soporte = "/soporte";
    const Info = "/cuenta";
    const Colegio= "/mapacolegio"
    
    return(
        <>
        <div className='boxcontent'>
          <UpsiteUser/>
     <div className='ContenedorListaUser'>
        <ul>
          <a onClick={() => navegar(Info)}>
            {" "}
            <li id="ListaUser">
              <h1>INFORMACION</h1>
            </li>
          </a>
          <a onClick={() => navegar(Microfono)}>
            {" "}
            <li id="ListaUser">
              <h1>MICROFONO</h1>
            </li>
          </a>
           <a onClick={() => navegar(Colegio)}>
            {" "}
            <li id ="ListaUser">
              <h1>COLEGIO</h1>
            </li>
          </a>
          <a onClick={() => navegar(Soporte)}>
            {" "}
            <li id="ListaUser">
              <h1>SOPORTE</h1>
            </li>
          </a>
        </ul>
        <div className='Linea'>
          <div className='PQRcont'>
                
          </div>
        </div>
     </div>
    </div>
        </>
    )
}

export default Pregunta1;