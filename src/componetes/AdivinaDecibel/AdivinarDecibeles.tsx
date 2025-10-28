import{ useState, useEffect } from 'react';
import '../../styles/DecibelGame.css'; 

// Definir el tipo de escenario
interface Escenario {
  name: string;
  decibels: number;
  description: string;
  danger: string;
  icon: string;
}

const DecibelGame = () => {
  const soundScenarios: Escenario[] = [
    { name: 'Biblioteca silenciosa', decibels: 30, description: 'Ambiente muy tranquilo', danger: 'seguro', icon: '📚' },
    { name: 'Conversación normal', decibels: 60, description: 'Hablando con amigos', danger: 'seguro', icon: '💬' },
    { name: 'Tráfico urbano pesado', decibels: 85, description: 'Calle con mucho tráfico', danger: 'precaución', icon: '🚗' },
    { name: 'Motocicleta acelerando', decibels: 95, description: 'Moto pasando cerca', danger: 'peligroso', icon: '🏍️' },
    { name: 'Concierto / Discoteca', decibels: 110, description: 'Música a alto volumen', danger: 'peligroso', icon: '🎵' },
    { name: 'Taladro neumático', decibels: 120, description: 'Construcción cercana', danger: 'muy-peligroso', icon: '🔨' },
    { name: 'Avión despegando', decibels: 130, description: 'Cerca de la pista', danger: 'muy-peligroso', icon: '✈️' },
    { name: 'Parque tranquilo', decibels: 40, description: 'Naturaleza y paz', danger: 'seguro', icon: '🌳' },
    { name: 'Restaurante lleno', decibels: 75, description: 'Muchas personas hablando', danger: 'precaución', icon: '🍽️' },
    { name: 'Aspiradora', decibels: 70, description: 'Limpiando la casa', danger: 'seguro', icon: '🧹' },
    { name: 'Bocina de carro', decibels: 100, description: 'Claxon cerca del oído', danger: 'peligroso', icon: '📢' },
    { name: 'Cortadora de césped', decibels: 90, description: 'Jardinería', danger: 'precaución', icon: '🌱' }
  ];

  const [currentScenario, setCurrentScenario] = useState<Escenario | null>(null);
  const [guess, setGuess] = useState(70);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [usedScenarios, setUsedScenarios] = useState<string[]>([]);

  useEffect(() => {
    startNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNewRound = () => {
    const availableScenarios = soundScenarios.filter(
      s => !usedScenarios.includes(s.name)
    );
    
    if (availableScenarios.length === 0 || round > 10) {
      setGameOver(true);
      return;
    }

    const randomScenario = availableScenarios[
      Math.floor(Math.random() * availableScenarios.length)
    ];
    
    setCurrentScenario(randomScenario);
    setGuess(70);
    setShowResult(false);
    setFeedback('');
  };

  const checkGuess = () => {
    if (!currentScenario) return;
    
    const difference = Math.abs(guess - currentScenario.decibels);
    let points = 0;
    let feedbackText = '';

    if (difference <= 5) {
      points = 100;
      feedbackText = '¡Perfecto! 🎯';
    } else if (difference <= 10) {
      points = 75;
      feedbackText = '¡Muy cerca! 👏';
    } else if (difference <= 20) {
      points = 50;
      feedbackText = '¡Bien! 👍';
    } else if (difference <= 30) {
      points = 25;
      feedbackText = 'Más o menos 🤔';
    } else {
      points = 0;
      feedbackText = 'Intenta aprender los niveles 📚';
    }

    setScore(score + points);
    setFeedback(feedbackText);
    setShowResult(true);
    setUsedScenarios([...usedScenarios, currentScenario.name]);
  };

  const nextRound = () => {
    if (round >= 10) {
      setGameOver(true);
    } else {
      setRound(round + 1);
      startNewRound();
    }
  };

  const resetGame = () => {
    setScore(0);
    setRound(1);
    setGameOver(false);
    setUsedScenarios([]);
    startNewRound();
  };

  const getDangerColor = (danger: string) => {
    switch(danger) {
      case 'seguro': return '#00ff88';
      case 'precaución': return '#ffd700';
      case 'peligroso': return '#ff6b35';
      case 'muy-peligroso': return '#ff0055';
      default: return '#00d4ff';
    }
  };

  const getDangerText = (danger: string) => {
    switch(danger) {
      case 'seguro': return 'SEGURO ✓';
      case 'precaución': return 'PRECAUCIÓN ⚠️';
      case 'peligroso': return 'PELIGROSO ⚠️';
      case 'muy-peligroso': return 'MUY PELIGROSO ☠️';
      default: return '';
    }
  };

  if (gameOver) {
    return (
      <div className="juego-decibeles">
        <div className="pantalla-final">
          <h1>¡Juego Terminado! 🎉</h1>
          <div className="puntuacion-final">
            <p className="etiqueta-puntos">Puntuación Final</p>
            <p className="valor-puntos">{score}</p>
            <p className="maximo-puntos">de 1000 puntos</p>
          </div>
          <div className="rendimiento">
            {score >= 800 && <p className="excelente">¡Excelente! Eres un experto en contaminación auditiva 🏆</p>}
            {score >= 600 && score < 800 && <p className="bueno">¡Muy bien! Conoces bien los niveles de ruido 🎯</p>}
            {score >= 400 && score < 600 && <p className="promedio">Buen intento. Sigue aprendiendo sobre decibeles 📚</p>}
            {score < 400 && <p className="necesita-practica">Necesitas practicar más. ¡No te rindas! 💪</p>}
          </div>
          <button className="boton-reiniciar" onClick={resetGame}>
            Jugar de Nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!currentScenario) return <div className="cargando">Cargando...</div>;

  return (
    <div className="juego-decibeles">
      <div className="cabecera-juego">
        <div className="tablero-puntos">
          <span className="etiqueta-puntos">Puntos</span>
          <span className="valor-puntos">{score}</span>
        </div>
        <div className="contador-rondas">
          <span>Ronda {round}/10</span>
        </div>
      </div>

      <div className="contenido-juego">
        <div className="tarjeta-escenario">
          <div className="icono-escenario">{currentScenario.icon}</div>
          <h2 className="nombre-escenario">{currentScenario.name}</h2>
          <p className="descripcion-escenario">{currentScenario.description}</p>
        </div>

        {!showResult ? (
          <div className="seccion-adivinar">
            <h3>¿Cuántos decibeles crees que tiene?</h3>
            <div className="contenedor-slider">
              <input
                type="range"
                min="20"
                max="140"
                value={guess}
                onChange={(e) => setGuess(Number(e.target.value))}
                className="slider-decibeles"
              />
              <div className="display-adivinanza">
                <span className="valor-adivinanza">{guess}</span>
                <span className="unidad-medida">dB</span>
              </div>
            </div>
            <div className="etiquetas-slider">
              <span>20 dB</span>
              <span>140 dB</span>
            </div>
            <button className="boton-confirmar" onClick={checkGuess}>
              Confirmar Respuesta
            </button>
          </div>
        ) : (
          <div className="seccion-resultado">
            <div className="retroalimentacion">{feedback}</div>
            <div className="revelar-respuesta">
              <div className="comparacion">
                <div className="caja-adivinanza">
                  <p className="etiqueta">Tu respuesta</p>
                  <p className="valor">{guess} dB</p>
                </div>
                <div className="flecha">→</div>
                <div className="caja-correcta">
                  <p className="etiqueta">Respuesta correcta</p>
                  <p className="valor">{currentScenario.decibels} dB</p>
                </div>
              </div>
              <div 
                className="nivel-peligro"
                style={{ backgroundColor: getDangerColor(currentScenario.danger) }}
              >
                {getDangerText(currentScenario.danger)}
              </div>
              <div className="info-educativa">
                <p className="texto-info">
                  {currentScenario.decibels >= 85 && 
                    '⚠️ Exposición prolongada (8+ horas) puede causar daño auditivo permanente'}
                  {currentScenario.decibels >= 100 && 
                    '☠️ Daño inmediato posible. Usar protección auditiva obligatoria'}
                  {currentScenario.decibels < 85 && 
                    '✓ Nivel seguro para exposición prolongada'}
                </p>
              </div>
            </div>
            <button className="boton-siguiente" onClick={nextRound}>
              {round >= 10 ? 'Ver Resultados' : 'Siguiente Ronda'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DecibelGame;