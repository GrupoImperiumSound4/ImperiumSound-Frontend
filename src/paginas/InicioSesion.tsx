
import { Formulario } from "../componetes/Reg-LogComp/formulario";
import UpsiteInt from "../componetes/Nav-UpsiteComp/UpsiteInt";
import "../styles/inicioSesion.css";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ValidToken } from "../componetes/ValidToken/ValidToken";


function InicioSesion() {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la ruta de destino (donde quería ir antes de ser redirigido)
  const from = (location.state as any)?.from || "/";

  const tokenEffect = async () => {
    const result = await ValidToken();
    console.log(result);
    
    
    if (result?.error) {
      console.error(result.error);
      return;
    }
    
    
    if (result) {
      console.log(from);
      navigate(from, { replace: true });
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
