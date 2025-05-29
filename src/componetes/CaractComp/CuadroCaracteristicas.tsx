import React from 'react';
import '../../styles/CuadroCarac.css'; 

const CuadroCarac: React.FC = () => {
  return (
    <div className="cuadro-carac">
      <h1 className="titulo">ImperiumSound: Plataforma Web para Monitoreo de Ruido</h1>
      <div className="contenido">

          
        <ol className="lista-caracteristicas">
            <li>
            Desarrollar e implementar ImperiumSound, una plataforma web para monitorear y reducir el ruido en entornos educativos, que ofrece datos en tiempo real y recursos educativos para fomentar un ambiente de aprendizaje saludable.
            </li>
          <li>Instalar dispositivos en cada aula que registren y envíen datos sobre los niveles de ruido a la plataforma ImperiumSound.</li>
          <li>Crear un sistema para la recolección, almacenamiento y visualización de datos en tiempo real.</li>
          <li>Implementar funcionalidades para que coordinadores y rectores visualicen gráficos y análisis de los niveles de ruido.</li>
          <li>Desarrollar contenidos informativos sobre el ruido, su impacto en la salud y consejos de salud auditiva.</li>
          <li>Enviar mensajes importantes a docentes y estudiantes para aumentar la conciencia sobre la contaminación acústica y su impacto en la salud y bienestar.</li>
        </ol>
      </div>
    </div>
  );
}

export default CuadroCarac;