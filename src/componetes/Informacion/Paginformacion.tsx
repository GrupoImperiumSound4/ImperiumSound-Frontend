import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/PagInfo.css";

export const PagInfo = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contenidoModal, setContenidoModal] = useState({
    titulo: "",
    descripcion: ""
  });

  const informacionOndas = {
    sonido: {
      titulo: "Intensidad o nivel sonoro",
      descripcion: "La intensidad o nivel sonoro es la cantidad de energía que transporta una onda sonora y determina qué tan fuerte o débil percibimos un sonido. Se mide en decibelios (dB), una unidad que indica la potencia del sonido en relación con el umbral de audición humana. Cuanto mayor es el nivel sonoro, más alto y fuerte se percibe el ruido."
    },
    frecuencia: {
      titulo: "Frecuencia",
      descripcion: "La frecuencia o tono es la propiedad del sonido que indica qué tan agudo o grave lo percibimos. Depende de la cantidad de vibraciones por segundo que produce una fuente sonora, medida en hercios (Hz). Un sonido con mayor frecuencia tiene un tono agudo, mientras que uno con menor frecuencia suena grave."
    },
    interferencia: {
      titulo: "Interferencia",
      descripcion: "La interferencia ocurre cuando dos o más ondas sonoras se encuentran en el mismo punto del espacio. Puede ser constructiva (las ondas se suman y el sonido es más fuerte) o destructiva (las ondas se cancelan parcial o totalmente). Este fenómeno es crucial en acústica arquitectónica y en la cancelación activa de ruido."
    }
  };

 const abrirModal = (tipo: keyof typeof informacionOndas) => {
  setContenidoModal(informacionOndas[tipo]);
  setModalAbierto(true);
};

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  return (
    <div className="page-wrapper">
      <div className="blog-container">
        <header className="blog-header">
          <h1>¿Quieres conocer sobre el sonido?</h1>
          <p>¡Este es tu lugar!</p>
        </header>

        <section className="seccion-contenido">
          <div className="contenido-imagen">
            <img src="https://venezuelasinfonica.com/wp-content/uploads/2015/03/sounds.jpg" alt="Entrada" className="imagen"/>
          </div>
          <div className="contenido-texto">
            <h2>¿Qué es el sonido?</h2>
            <p>
              El sonido es una vibración que se propaga como una onda acústica a través de un medio de transmisión como un gas, líquido o sólido. Estas ondas sonoras son percibidas por nuestros oídos y procesadas por el cerebro, permitiéndonos experimentar el mundo audible que nos rodea.
              La intensidad del sonido se mide en decibeles (dB), una unidad que indica qué tan fuerte o suave percibimos un sonido.
            </p>
          </div>
        </section>


        <section className="seccion-contenido">
          <div className="contenido-imagen">
            <img src="/img/decibeles.png" alt="Ondas" className="imagen"/>
          </div>
          <div className="contenido-texto">
            <h2>¿Sabes que son los decibeles?</h2>
            <p>
              Los decibeles son la unidad que se utiliza para medir la intensidad del sonido. Un susurro tiene alrededor de 30 dB, una conversación normal unos 60 dB, y un concierto puede superar los 100 dB. Niveles muy altos pueden causar daño auditivo, por eso es importante cuidar nuestros oídos.
            </p>
          </div>
        </section>


        <section className="seccion-contenido seccion-invertida">
          <div className="contenido-texto">
              <h2>¡Cuidado!</h2>
            <p>
              Debes cuidar tus oidos, aqui puedes ver que niveles son seguros
            </p>
            <ul className="lista-aplicaciones">
              <li>🟢 Seguro (0 – 70 dB)</li>
              <li>🟡 Moderado (70 – 85 dB)</li>
              <li>🟠 Riesgo alto (85 – 100 dB)</li>
              <li>🔴 Peligroso (+100 dB)</li>
            </ul>
            <button className="boton-comparador">
            <Link to="/comparador-sonido">
            <cite>
              (Dale click aquí para ir al comparador de decibeles con situaciones cotidianas)
            </cite>
          </Link>
          </button>
          </div>
          <div className="contenido-imagen">
            <img src="/img/oido.jpg" alt="Aplicaciones" className="imagen"/>
          </div>
        </section>

        <section className="seccion-imagen-completa">
          <div className="imagen-hero">
            <img src="https://concepto.de/wp-content/uploads/2018/08/f%C3%ADsica-e1534938838719.jpg" alt="Sonido visual" />
            <div className="overlay-texto">
              <h3>La física del sonido</h3>
            </div>
          </div>
        </section>



        <section className="seccion-texto-destacado">
          <div className="texto-cita">
            <h2 className="titulo-seccion">Ondas sonoras</h2>
            <p>
              Una onda sonora es una vibración que viaja por un medio, como el aire, el agua o los sólidos. Cuando un objeto vibra, hace que las partículas del medio se muevan y transmitan esa energía en forma de compresiones y expansiones. Así es como el sonido llega a nuestros oídos y podemos escucharlo.
            </p>
          </div>
        </section>

        <section className="seccion-galeria">
          <p className="subtitulo-galeria">Haz click en cada imagen para más información</p>
          <div className="galeria-grid">
            <div className="galeria-item" onClick={() => abrirModal('sonido')}>
              <img src="/img/nivel-sonoro.jpg" alt="Nivel Sonoro" />
              <p>Nivel Sonoro</p>
              <div className="click-indicator">👆 Click para más info</div>
            </div>
            <div className="galeria-item" onClick={() => abrirModal('frecuencia')}>
              <img src="/img/frecuencia.jpg" alt="Ondas transversales" />
              <p>Frecuencia</p>
              <div className="click-indicator">👆 Click para más info</div>
            </div>
            <div className="galeria-item" onClick={() => abrirModal('interferencia')}>
              <img src="/img/interferencia.jpg" alt="Interferencia" />
              <p>Interferencia</p>
              <div className="click-indicator">👆 Click para más info</div>
            </div>
          </div>
        </section>

        {/* MODAL */}
        {modalAbierto && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
              <button className="modal-cerrar" onClick={cerrarModal}>✕</button>
              <div className="modal-texto">
                <h2>{contenidoModal.titulo}</h2>
                <p>{contenidoModal.descripcion}</p>
              </div>
            </div>
          </div>
        )}



        <section className="seccion-contenido seccion-invertida">
          <div className="contenido-texto">
            <h2>Propiedades del Sonido</h2>
            <p>
              El sonido se caracteriza por tres propiedades principales: frecuencia, que determina el tono (si un sonido es grave o agudo); amplitud, que define el volumen (qué tan fuerte o suave se percibe); y timbre, que da la calidad del sonido, permitiéndonos diferenciar entre distintos instrumentos o voces.
            </p>
          </div>
          <div className="contenido-imagen">
            <img src="/img/propiedades-sonido.png" alt="Propiedades" className="imagen"/>
          </div>
        </section>



        <section className="seccion-dos-imagenes">
          <div className="imagen-dual">
            <img src="/img/baja-frecuencia.png" alt="Frecuencia baja" />
            <div className="caption">Baja frecuencia</div>
          </div>
          <div className="imagen-dual">
            <img src="/img/alta-frecuencia.png" alt="Frecuencia alta" />
            <div className="caption">Alta frecuencia</div>
          </div>
        </section>






        <section className="seccion-banner">
          <img src="https://humanidades.com/wp-content/uploads/2016/04/sonido-e1558136715385-800x400.jpg" alt="Banner" />
          <div className="banner-overlay">
            <h2>Explora el mundo del sonido</h2>
            <p>Descubre cómo las ondas sonoras dan forma a nuestra experiencia auditiva</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default PagInfo;