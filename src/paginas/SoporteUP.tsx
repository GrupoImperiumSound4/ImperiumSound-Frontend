import "../styles/soporteup.css";
import { useNavigate } from 'react-router-dom'
import UpsiteUser from "../componetes/Nav-UpsiteComp/Upsite_User";



const SoporteUP =() =>{
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
                <div className='divtit'>
                  <h1 className='TituloSop'>Estamos en proceso de elaboracion, muchas gracias por su comprension😊👍</h1>
                </div>
          </div>
        </div>
     </div>
    </div>
        </>
    )
}

export default SoporteUP;