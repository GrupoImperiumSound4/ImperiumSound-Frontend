
import "../styles/objetivos.css"
import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";
import ObjetivosLog from "../componetes/ObjetivosComp/Objetivos1";
import ObjetivosLog2 from "../componetes/ObjetivosComp/Objetivos2";
import ObjetivosLog3 from "../componetes/ObjetivosComp/Objetivos3";
function Objetivos() {
  return (
    <>
    <UpsiteLog></UpsiteLog>
    <div className="tituloObjea"><h1>OBJETIVOS</h1></div>
    <div className="contenedor2">
        <div className="tarjeta1a">
            <h2>Vision </h2>
            <p>Aspiramos a ser líderes en el campo del monitoreo acústico, ofreciendo soluciones innovadoras que mejoren la calidad de vida de las personas en todo el mundo. Nos esforzamos por educar a la comunidad sobre la importancia del control del ruido y proporcionar las herramientas necesarias para lograr un entorno más silencioso y saludable</p>
            <div className="icono1a">
               
                <ObjetivosLog></ObjetivosLog>
            </div>
        </div>

        <div className="tarjeta2a">
            <h2>Innovación y Tecnología</h2>
            <p>En Imperium sound, estamos a la vanguardia de la tecnología acústica. Nuestra herramienta utiliza algoritmos avanzados y sensores precisos para ofrecerte datos exactos sobre el nivel de ruido. Estamos constantemente mejorando y actualizando nuestra tecnología para asegurarnos de que tengas acceso a las mejores soluciones disponibles en el mercado</p>
            <div className="icono1a">
                
                <ObjetivosLog2></ObjetivosLog2>
            </div>
        </div>

        <div className="tarjeta3a">
            <h2>Responsabilidad Social</h2>
            <p>Nos preocupamos por el impacto del ruido en la salud pública y el medio ambiente. Por eso, colaboramos con organizaciones y comunidades para promover la conciencia sobre la contaminación acústica y sus efectos. A través de campañas educativas y proyectos comunitarios, trabajamos para crear un entorno más saludable y sostenible para todos</p>
            <div className="icono1a">
            
                <ObjetivosLog3></ObjetivosLog3>
            </div>
        </div>
    </div>
    </>
  );
}

export default Objetivos;