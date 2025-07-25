import Upsite from "../componetes/Upsite";
import "../styles/index.css";
import Conteo from "../componetes/Conteo";

function Index() {
  return (
    <>
      <Upsite />
      <div className="container">

      <div>
        <Conteo />
    <br />
    <br />
   
        <p>
          Bienvenidos a Nuestra Página!
          <br />
          <br />
          Estamos encantados de recibirte en nuestro sitio web, donde
          encontrarás todo lo que necesitas. Nuestro equipo se dedica a
          ofrecerte la mejor experiencia posible, brindándote contenido de
          calidad, recursos útiles y el apoyo que necesitas.
        </p>
      </div>
      <div className="senor" />
      </div>
      <button>registrate</button>
      
    </>
  );
}

export default Index;
