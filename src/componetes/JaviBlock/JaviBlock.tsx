import { useRef, useState, useEffect } from "react";
import "../../styles/JaviBlock.css";

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  type: string;
  passed: boolean;
}

export default function JaviBlock() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const volumeRef = useRef(0);
  const playerYRef = useRef(235); // Empieza en el suelo (GROUND_Y - PLAYER_SIZE)
  const playerVyRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const gameSpeedRef = useRef(3);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const canJumpRef = useRef(true);
  const lastJumpTimeRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const lastObstacleTimeRef = useRef(0);

  const [_volume, setVolume] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [displayDB, setDisplayDB] = useState(0);

  const width = 500;
  const height = 300;
  const GROUND_Y = 260; // Posición Y del suelo (parte superior)
  const GRAVITY = 0.5;
  const JUMP_FORCE = -12;
  const VOLUME_THRESHOLD = 80;
  const JUMP_COOLDOWN = 300;
  const PLAYER_SIZE = 25;
  const PLAYER_X = 40;

  // Tipos de obstáculos
  const obstacleTypes = [
    { width: 18, height: 35, color: "#e74c3c", type: "thin" },
    { width: 35, height: 50, color: "#c0392b", type: "wide" },
    { width: 25, height: 65, color: "#8e44ad", type: "tall" },
    { width: 22, height: 42, color: "#d35400", type: "medium" },
  ];

  const createObstacle = (): Obstacle => {
    const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
    return {
      x: width,
      y: GROUND_Y - type.height,
      ...type,
      passed: false,
    };
  };

  // Función para inicializar el contexto de audio con reintentos
  const initAudioContext = async () => {
    if (audioContextRef.current) return true;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContext();
      await audioCtx.resume();

      const source = audioCtx.createMediaStreamSource(stream);
      const processor = audioCtx.createScriptProcessor(256, 1, 1);

      source.connect(processor);
      processor.connect(audioCtx.destination);

      processor.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
          sum += input[i] * input[i];
        }
        const rms = Math.sqrt(sum / input.length);
        const vol = rms * 1000;

        volumeRef.current = vol;
        setVolume(vol);

        // Convertir a dB solo para mostrar (no afecta la lógica)
        const displayedDB = vol > 0 ? 20 * Math.log10(vol / 1000) + 60 : 0;
        setDisplayDB(displayedDB);
      };

      audioContextRef.current = audioCtx;
      audioProcessorRef.current = processor;
      return true;
    } catch (err) {
      console.error("Error con el micrófono:", err);
      alert("Activa el micrófono en el navegador para jugar.");
      return false;
    }
  };

  const jump = () => {
    const currentTime = Date.now();
    if (
      playerYRef.current >= GROUND_Y - PLAYER_SIZE &&
      canJumpRef.current &&
      currentTime - lastJumpTimeRef.current > JUMP_COOLDOWN
    ) {
      playerVyRef.current = JUMP_FORCE;
      canJumpRef.current = false;
      lastJumpTimeRef.current = currentTime;
    }
  };

  const checkCollision = (obstacle: Obstacle): boolean => {
    return (
      PLAYER_X < obstacle.x + obstacle.width &&
      PLAYER_X + PLAYER_SIZE > obstacle.x &&
      playerYRef.current < obstacle.y + obstacle.height &&
      playerYRef.current + PLAYER_SIZE > obstacle.y
    );
  };

  const resetGame = () => {
    playerYRef.current = GROUND_Y - PLAYER_SIZE;
    playerVyRef.current = 0;
    obstaclesRef.current = [];
    gameSpeedRef.current = 3;
    scoreRef.current = 0;
    gameOverRef.current = false;
    canJumpRef.current = true;
    lastJumpTimeRef.current = 0;
    lastObstacleTimeRef.current = 0;
    setScore(0);
    setGameOver(false);
    setDisplayDB(0);
  };

  const updatePlayer = () => {
    const vol = volumeRef.current;
    const currentTime = Date.now();

    // Saltar con micrófono
    if (
      vol > VOLUME_THRESHOLD &&
      playerYRef.current >= GROUND_Y - PLAYER_SIZE &&
      canJumpRef.current &&
      currentTime - lastJumpTimeRef.current > JUMP_COOLDOWN
    ) {
      jump();
    }

    if (vol < VOLUME_THRESHOLD) {
      canJumpRef.current = true;
    }

    playerVyRef.current += GRAVITY;
    playerYRef.current += playerVyRef.current;

    // Colisión con el suelo
    if (playerYRef.current >= GROUND_Y - PLAYER_SIZE) {
      playerYRef.current = GROUND_Y - PLAYER_SIZE;
      playerVyRef.current = 0;
    }

    if (playerYRef.current < 0) {
      playerYRef.current = 0;
      playerVyRef.current = 0;
    }
  };

  const updateObstacles = (ctx: CanvasRenderingContext2D) => {
    const currentTime = Date.now();
    const baseMin = 1000;
    const baseMax = 2400;
    const speedFactor = Math.max(1, gameSpeedRef.current / 3);
    const dynamicMin = baseMin / speedFactor;
    const dynamicMax = baseMax / speedFactor;
    const randomInterval = dynamicMin + Math.random() * (dynamicMax - dynamicMin);

    if (currentTime - lastObstacleTimeRef.current > randomInterval) {
      obstaclesRef.current.push(createObstacle());
      lastObstacleTimeRef.current = currentTime;
    }

    obstaclesRef.current = obstaclesRef.current.filter((obs) => {
      obs.x -= gameSpeedRef.current;

      if (!obs.passed && obs.x + obs.width < PLAYER_X) {
        obs.passed = true;
        scoreRef.current += 10;
        setScore(scoreRef.current);

        if (scoreRef.current % 50 === 0) {
          gameSpeedRef.current += 0.5;
        }
      }

      if (checkCollision(obs)) {
        gameOverRef.current = true;
        setGameOver(true);
        setIsRunning(false);
        return false;
      }

      return obs.x + obs.width > 0;
    });

    obstaclesRef.current.forEach((obs) => {
      ctx.fillStyle = obs.color;
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(obs.x + 5, obs.y + obs.height, obs.width - 5, 5);
    });
  };

  const renderGame = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);

    // Fondo con nubes
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, width, height);

    // Nubes decorativas
    ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
    ctx.beginPath();
    ctx.arc(80, 40, 25, 0, Math.PI * 2);
    ctx.arc(105, 40, 20, 0, Math.PI * 2);
    ctx.arc(120, 40, 25, 0, Math.PI * 2);
    ctx.fill();

    // Suelo con textura (desde y=260 hasta y=300)
    ctx.fillStyle = "#2ecc71";
    ctx.fillRect(0, GROUND_Y, width, 40);
    ctx.fillStyle = "#27ae60";
    for (let i = 0; i < width; i += 35) {
      ctx.fillRect(i, GROUND_Y, 18, 40);
    }

    // Dibujar obstáculos
    updateObstacles(ctx);

    // Jugador con expresión
    const vol = volumeRef.current;
    ctx.fillStyle = vol > VOLUME_THRESHOLD ? "#e74c3c" : "#e67e22";
    ctx.fillRect(PLAYER_X, playerYRef.current, PLAYER_SIZE, PLAYER_SIZE);

    // Ojos del jugador
    ctx.fillStyle = "white";
    ctx.fillRect(PLAYER_X + 4, playerYRef.current + 6, 7, 7);
    ctx.fillRect(PLAYER_X + 14, playerYRef.current + 6, 7, 7);
    ctx.fillStyle = "black";
    ctx.fillRect(PLAYER_X + 6, playerYRef.current + 8, 3, 3);
    ctx.fillRect(PLAYER_X + 16, playerYRef.current + 8, 3, 3);

    // Indicador de volumen (visualizado en dB)
    const barWidth = Math.min((volumeRef.current / 1000) * 150, 150);
    ctx.fillStyle = "rgba(52, 152, 219, 0.5)";
    ctx.fillRect(10, 10, barWidth, 15);
    ctx.strokeStyle = "#2980b9";
    ctx.strokeRect(10, 10, 150, 15);

    // Mostrar velocidad
    ctx.fillStyle = "#34495e";
    ctx.font = "12px Arial";
    ctx.fillText(`Velocidad: ${gameSpeedRef.current.toFixed(1)}x`, 170, 22);
  };

  const gameLoop = () => {
    if (gameOverRef.current) return;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    updatePlayer();
    renderGame(ctx);

    if (!gameOverRef.current) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }
  };

  const startGame = async () => {
    resetGame();
    const success = await initAudioContext();
    if (!success) return;

    setIsRunning(true);
    gameLoop();
  };

  const stopGame = () => {
    setIsRunning(false);
    gameOverRef.current = true;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  // Manejo del salto con teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "Space" || e.key === " ") && isRunning) {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning]);

  // Limpiar recursos al desmontar
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="page-wrapper">
      <div className="game-page">
        <div className="game-card">
          <h1 className="game-title">🎤 JaviBlock</h1>
          <div className="instructions">
            <h3 className="instructions-title">📖 Cómo jugar:</h3>
            <ul className="instructions-list">
              <li>🎤 Haz ruido o grita para hacer saltar al cuadrito</li>
              <li>⌨️ También puedes saltar con la barra espaciadora</li>
              <li>🚧 Evita los obstáculos de diferentes tamaños</li>
              <li>⚡ La velocidad aumenta cada 50 puntos</li>
              <li>🎯 Cada obstáculo superado suma 10 puntos</li>
            </ul>
          </div>

          <div className="game-header">
            <div className="game-score">Score: {score}</div>
            <div className="button-container">
              {!isRunning && !gameOver && (
                <button
                  onClick={startGame}
                  className="game-button start"
                  aria-label="Iniciar juego"
                >
                  ▶ Iniciar Juego
                </button>
              )}
              {isRunning && (
                <button
                  onClick={stopGame}
                  className="game-button stop"
                  aria-label="Detener juego"
                >
                  ⏹ Detener
                </button>
              )}
            </div>
          </div>

          <p className="volume-text">
            ¡Grita o presiona <kbd>espacio</kbd> para saltar! Nivel de Sonido:{" "}
            <span className="volume-value">{displayDB.toFixed(1)} dB</span>
          </p>

          <div className="canvas-container">
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              className="game-canvas"
              aria-label="Juego de salto con micrófono"
            />
            {gameOver && (
              <div className="game-over-overlay">
                <div className="game-over-title">¡Game Over! 💀</div>
                <div className="game-over-score">Puntuación Final: {score}</div>
                <button
                  onClick={startGame}
                  className="game-button restart"
                  aria-label="Reiniciar juego"
                >
                  🔄 Jugar de Nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
  );
}