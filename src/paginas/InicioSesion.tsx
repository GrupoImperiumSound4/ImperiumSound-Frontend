
import { Formulario } from "../componetes/Reg-LogComp/formulario";
import UpsiteInt from "../componetes/Nav-UpsiteComp/UpsiteInt";
import "../styles/inicioSesion.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ValidToken } from "../componetes/ValidToken/ValidToken";


function InicioSesion() {
  const navigate = useNavigate()
  const tokenEffect = async () => {
    const result = await ValidToken();
    console.log(result);
    
    
    if (result?.error) {
      console.error(result.error);
      return;
    }
    
    
    if (result) {
      navigate("/inicio");
    }
  };
  
  useEffect(() => {
    tokenEffect();
  }, []);
  return (
  
    <>
      <UpsiteInt />
     
      <div className="body">
        <Formulario />
      </div>
    </>
  );
}

export default InicioSesion;  
