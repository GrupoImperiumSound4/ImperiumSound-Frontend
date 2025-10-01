
import React, { useRef, useEffect, useState } from "react";
import useVolume from "./hooks/usePitch";

export default function VoiceFlappy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { volume, isListening, error } = useVolume();

  const width = 600;
  const height = 400;

  const [birdY, setBirdY] = useState(height / 2);
  const [velocity, setVelocity] = useState(0);
  const gravity = 0.5;
  const jumpStrength = -8;

  const [pipes, setPipes] = useState([
    { x: width, gapTop: 120 + Math.random() * 150 },
  ]);
  const pipeWidth = 60;
  const gap = 120;
  const pipeSpeed = 2;

  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [volumeThreshold] = useState(30);

  const [lastJumpTime, setLastJumpTime] = useState(0);

  // Cargar imagen del pájaro
  const birdImage = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const img = new Image();
    img.src = "./img/pajaro.png"; // <-- tu archivo en public
    birdImage.current = img;
  }, []);

  // Salto por picos de volumen
  useEffect(() => {
    if (!gameOver && gameStarted && volume > 0) {
      const now = Date.now();
      if (volume > volumeThreshold && now - lastJumpTime > 250) {
        setVelocity(jumpStrength);
        setLastJumpTime(now);
      }
    }
  }, [volume, gameOver, gameStarted, volumeThreshold, lastJumpTime]);

  // Física del juego
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameInterval = setInterval(() => {
      setVelocity((v) => v + gravity);
      setBirdY((y) => {
        const newY = y + velocity;
        if (newY <= 15) return 15;
        if (newY >= height - 15) {
          setGameOver(true);
          return height - 15;
        }
        return newY;
      });

      setPipes((oldPipes) => {
        const moved = oldPipes
          .map((p) => ({ ...p, x: p.x - pipeSpeed }))
          .filter((p) => p.x + pipeWidth > 0);

        if (
          oldPipes.length === 0 ||
          oldPipes[oldPipes.length - 1].x < width - 200
        ) {
          moved.push({
            x: width,
            gapTop: 50 + Math.random() * (height - gap - 100),
          });
        }
        return moved;
      });
    }, 16);

    return () => clearInterval(gameInterval);
  }, [gameStarted, gameOver, velocity, gravity]);

  // Dibujo en canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#87ceeb";
      ctx.fillRect(0, 0, width, height);

      // Dibujar pájaro con imagen o círculo de respaldo
      if (birdImage.current && birdImage.current.complete) {
        ctx.drawImage(birdImage.current, 85, birdY - 15, 30, 30);
      } else {
        const birdColor = volume > volumeThreshold ? "#ff4444" : "#ff8888";
        ctx.fillStyle = birdColor;
        ctx.beginPath();
        ctx.arc(100, birdY, 15, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dibujar tubos y colisiones
      pipes.forEach((pipe) => {
        ctx.fillStyle = "green";
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.gapTop);
        ctx.fillRect(
          pipe.x,
          pipe.gapTop + gap,
          pipeWidth,
          height - pipe.gapTop - gap
        );

        if (
          gameStarted &&
          100 + 15 > pipe.x &&
          100 - 15 < pipe.x + pipeWidth &&
          (birdY - 15 < pipe.gapTop || birdY + 15 > pipe.gapTop + gap)
        ) {
          setGameOver(true);
        }

        if (
          gameStarted &&
          pipe.x + pipeWidth < 100 &&
          pipe.x + pipeWidth + pipeSpeed >= 100
        ) {
          setScore((s) => s + 1);
        }
      });

      // UI y datos
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText(`Puntos: ${score}`, 10, 30);

      ctx.font = "14px Arial";
      ctx.fillText(`Velocidad: ${velocity.toFixed(1)}`, 10, 55);
      ctx.fillText(`Posición Y: ${birdY.toFixed(1)}`, 10, 75);

      if (volume > 0) {
        const displayDb = -70 + (volume / 100) * 60;
        ctx.fillStyle = volume > volumeThreshold ? "red" : "blue";
        ctx.font = "16px Arial";
        ctx.fillText(`${Math.round(displayDb)} dB`, 10, 100);

        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(10, 110, 200, 15);
        ctx.fillStyle = volume > volumeThreshold ? "red" : "blue";
        ctx.fillRect(10, 110, (volume / 100) * 200, 15);

        ctx.fillStyle = "orange";
        ctx.fillRect(10 + (volumeThreshold / 100) * 200, 105, 3, 25);
      }

      if (!gameStarted && !gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "24px Arial";
        ctx.fillText("¡Haz ruidos cortos para volar!", width / 2 - 140, height / 2);
        ctx.font = "18px Arial";
        ctx.fillText("Haz clic en Iniciar para comenzar", width / 2 - 120, height / 2 + 30);
      }

      if (gameOver) {
        ctx.fillStyle = "rgba(0,0,0,0.7)";
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText("Game Over", width / 2 - 80, height / 2);
        ctx.font = "18px Arial";
        ctx.fillText(`Puntuación final: ${score}`, width / 2 - 70, height / 2 + 40);
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animationId);
  }, [gameOver, gameStarted, score, velocity, birdY, pipes, volume, volumeThreshold]);

  function startGame() {
    setGameStarted(true);
    setGameOver(false);
    setBirdY(height / 2);
    setVelocity(0);
    setPipes([{ x: width, gapTop: 150 }]);
    setScore(0);
    setLastJumpTime(0);
  }

  function resetGame() {
    setBirdY(height / 2);
    setVelocity(0);
    setPipes([{ x: width, gapTop: 150 }]);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setLastJumpTime(0);
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <div style={{ marginBottom: "10px" }}>
        <p>
          <strong>Instrucciones:</strong> Haz ruidos cortos e intermitentes (como "eh", "ah") para que el pájaro salte.
        </p>
        <p>
          <strong>IMPORTANTE:</strong> No grites continuamente, solo sonidos breves.
        </p>
        <p>
          {error && <span style={{ color: "red" }}>❌ Error: {error}</span>}
          {!error && isListening && volume > 0 && (
            <span style={{ color: "green" }}>
              🎤 {Math.round(-70 + (volume / 100) * 60)} dB{" "}
              {volume > volumeThreshold ? "(¡Detectado!)" : "(Muy bajo)"}
            </span>
          )}
          {!error && isListening && volume === 0 && (
            <span style={{ color: "blue" }}>
              🎤 Micrófono activo - Haz ruidos intermitentes
            </span>
          )}
          {!error && !isListening && (
            <span style={{ color: "orange" }}>🎤 Inicializando micrófono...</span>
          )}
        </p>
      </div>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ border: "1px solid #ccc" }}
      />

      <div style={{ marginTop: "10px" }}>
        {!gameStarted && !gameOver && (
          <button onClick={startGame} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Iniciar Juego
          </button>
        )}
        {gameOver && (
          <button onClick={resetGame} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Jugar de Nuevo
          </button>
        )}
      </div>
    </div>
  );
}
