
import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";
import "../styles/index.css";
import AcceInf from "../componetes/InfoComp/info"


function PagInicio() {
  return (
    <>
      <UpsiteLog />
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
        


       
        

      </div>
      <div className="senor" />
      
      </div>

      <AcceInf/>
      
      
    </>
  ); 
}

export default PagInicio;
