import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";
import "../styles/feedback.css"
import ContactCard from "../componetes/ContactanosComp/cuadrocontac";
import AcceInf from "../componetes/InfoComp/info";
function Feedback(){
   return(<>
   <UpsiteLog></UpsiteLog>
   <AcceInf/>
   <div className="form-container">
      <form className="contact-form">
        <input type="text" placeholder="Nombre" className="input-field" />
        <input type="text" placeholder="Sugerencias" className="input-field" />
        <textarea placeholder="Mensaje" id="Mensaje" className="input-field textarea-field" />
        <button type="submit" className="submit-button">ENVIAR</button>
      </form>
      <div className="contc1">
      <ContactCard></ContactCard>
      </div>
      v
    </div>
    
   </>) 
}
export default Feedback;