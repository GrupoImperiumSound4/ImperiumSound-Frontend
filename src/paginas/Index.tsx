import Upsite from "../componetes/Nav-UpsiteComp/Upsite";
import "../styles/index.css";
import { useNavigate } from "react-router-dom";

function Index() {

const navegar = useNavigate();
const registroURL = "/Registro"



  return (
    <>
      <Upsite />
      <div className="container">

      <div className="txtPrincipal">
        <div className="conteo"></div>
    <br />
    <br />
   
        <div className="mrg-general">
         <h1> Imperium Sound </h1>
         <h2>Aprende, Diviertete y cuida tu audición.</h2>
          <br />
          <br />
          La contaminación auditiva afecta nuestra salud más de lo que creemos. Aquí encontrarás información clara, actividades interactivas y recursos útiles para aprender a proteger tu audición de manera didáctica y entretenida.
        </div>
        <a onClick={() => navegar(registroURL)}><button className="boton-registrarme">
          
        <div className="bolita"></div>REGISTRARME</button></a>
        


       
        
      </div>
      <div className="senor" />
      
      </div>
      
    </>
  ); 
}

export default Index;
