import { useState } from "react";
import "../../styles/PagInfo.css";
import oido from "public/img/oido.jpg"
import propiedadessonido from "public/img/propiedades-sonido.png"
import frecuenciabaja from "public/img/baja-frecuencia.png"
import frecuenciaalta from "public/img/alta-frecuencia.png"

export const PagInfo = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contenidoModal, setContenidoModal] = useState({
    titulo: "",
    descripcion: ""
  });

  const informacionOndas = {
    longitudinales: {
      titulo: "Ondas Longitudinales",
      descripcion: "Las ondas longitudinales son aquellas en las que las partículas del medio se mueven en la misma dirección que la propagación de la onda. El sonido es un ejemplo perfecto de este tipo de onda. Cuando el sonido viaja por el aire, las moléculas se comprimen y expanden en la dirección del movimiento de la onda, creando zonas de alta y baja presión."
    },
    transversales: {
      titulo: "Ondas Transversales",
      descripcion: "En las ondas transversales, las partículas del medio oscilan perpendicular a la dirección de propagación de la onda. Aunque el sonido no puede propagarse como onda transversal en gases, este tipo de ondas son fundamentales para entender fenómenos como las ondas electromagnéticas y las vibraciones en cuerdas de instrumentos musicales."
    },
    interferencia: {
      titulo: "Interferencia de Ondas",
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
              <a href="/comparador-sonido">
              <cite>
              (Dale click aqui para ir al comparador de decibeles con situaciones cotidianas)  
            </cite>
            </a>
            </button>
          </div>
          <div className="contenido-imagen">
            <img src={oido} alt="Aplicaciones" className="imagen"/>
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

                {/* CAMBIARRRRRRRRRRRRRRRRRRR */}
                                {/* CAMBIARRRRRRRRRRRRRRRRRRR */}
                                                {/* CAMBIARRRRRRRRRRRRRRRRRRR */}
                                                                {/* CAMBIARRRRRRRRRRRRRRRRRRR */}


        <section className="seccion-galeria">
          <h2 className="titulo-seccion">Tipos de ondas sonoras</h2>
          <p className="subtitulo-galeria">Haz click en cada imagen para más información</p>
          <div className="galeria-grid">
            <div className="galeria-item" onClick={() => abrirModal('longitudinales')}>
              <img src="public/img/entrada.png" alt="Ondas longitudinales" />
              <p>Ondas Longitudinales</p>
              <div className="click-indicator">👆 Click para más info</div>
            </div>
            <div className="galeria-item" onClick={() => abrirModal('transversales')}>
              <img src="public/img/entrada.png" alt="Ondas transversales" />
              <p>Ondas Transversales</p>
              <div className="click-indicator">👆 Click para más info</div>
            </div>
            <div className="galeria-item" onClick={() => abrirModal('interferencia')}>
              <img src="public/img/entrada.png" alt="Interferencia" />
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
            <img src={propiedadessonido} alt="Propiedades" className="imagen"/>
          </div>
        </section>



        <section className="seccion-dos-imagenes">
          <div className="imagen-dual">
            <img src={frecuenciabaja} alt="Frecuencia baja" />
            <div className="caption">Baja frecuencia</div>
          </div>
          <div className="imagen-dual">
            <img src={frecuenciaalta} alt="Frecuencia alta" />
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