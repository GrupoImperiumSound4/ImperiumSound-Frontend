
import "../../styles/Comparador.css";
import React, { useEffect, useState, useRef } from "react";



interface SoundExample {
  name: string;
  db: number;
  icon: string;
  category: string;
  description: string;
  danger: string;
}

interface Category {
  value: string;
  label: string;
  icon: string;
}

interface IconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Iconos basados en emojis
const Volume2 = ({ size = 16, className }: IconProps) =>
  <span className={className} style={{ fontSize: `${size}px` }}>🔊</span>;
const Mic = ({ size = 16, className, style }: IconProps) =>
  <span className={className} style={{ ...style, fontSize: `${size}px` }}>🎤</span>;
const Pause = ({ size = 16, className, style }: IconProps) =>
  <span className={className} style={{ ...style, fontSize: `${size}px` }}>⏸️</span>;
const Info = ({ size = 16, className }: IconProps) =>
  <span className={className} style={{ fontSize: `${size}px` }}>ℹ️</span>;
const BarChart3 = ({ size = 16, className, style }: IconProps) =>
  <span className={className} style={{ ...style, fontSize: `${size}px` }}>📊</span>;

export const Comparador = () => {
  const [currentDb, setCurrentDb] = useState(0);
  const [highestDb, setHighestDb] = useState(0);
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [alertMessage, setAlertMessage] = useState("");
  const lastUpdateTime = useRef(0);

  const soundExamples: SoundExample[] = [
    { name: "Susurro", db: 20, icon: "🤫", category: "humanos", description: "Conversación muy suave", danger: "safe" },
    { name: "Conversación Normal", db: 60, icon: "👥", category: "humanos", description: "Habla cotidiana", danger: "safe" },
    { name: "Grito Humano", db: 100, icon: "😱", category: "humanos", description: "Voz muy alta", danger: "warning" },
    { name: "Gato Ronroneando", db: 25, icon: "😸", category: "domesticos", description: "Sonido relajante", danger: "safe" },
    { name: "Gato Maullando", db: 45, icon: "🐱", category: "domesticos", description: "Miau normal", danger: "safe" },
    { name: "Perro Pequeño", db: 70, icon: "🐕", category: "domesticos", description: "Ladrido agudo", danger: "moderate" },
    { name: "Perro Grande", db: 85, icon: "🐕‍🦺", category: "domesticos", description: "Ladrido profundo", danger: "warning" },
    { name: "Lobo Aullando", db: 90, icon: "🐺", category: "salvajes", description: "Aullido nocturno", danger: "warning" },
    { name: "León Rugiendo", db: 114, icon: "🦁", category: "salvajes", description: "Rugido territorial", danger: "danger" },
    { name: "Elefante", db: 117, icon: "🐘", category: "salvajes", description: "Bramido potente", danger: "danger" },
    { name: "Ballena Azul", db: 188, icon: "🐋", category: "salvajes", description: "Canto submarino", danger: "extreme" },
    { name: "Biblioteca", db: 30, icon: "📚", category: "urbano", description: "Ambiente silencioso", danger: "safe" },
    { name: "Oficina", db: 50, icon: "🏢", category: "urbano", description: "Ruido de fondo", danger: "safe" },
    { name: "Tráfico Normal", db: 70, icon: "🚗", category: "urbano", description: "Calle transitada", danger: "moderate" },
    { name: "Tráfico Pesado", db: 80, icon: "🚛", category: "urbano", description: "Avenida principal", danger: "warning" },
    { name: "Construcción", db: 90, icon: "🚧", category: "urbano", description: "Obras públicas", danger: "warning" },
    { name: "Concierto", db: 115, icon: "🎸", category: "urbano", description: "Música en vivo", danger: "danger" },
    { name: "Avión Despegando", db: 140, icon: "✈️", category: "urbano", description: "Aeropuerto", danger: "extreme" }
  ];

  const categories: Category[] = [
    { value: "todos", label: "Ver Todos", icon: "🌍" },
    { value: "humanos", label: "Humanos", icon: "👥" },
    { value: "domesticos", label: "Mascotas", icon: "🐕" },
    { value: "salvajes", label: "Animales Salvajes", icon: "🦁" },
    { value: "urbano", label: "Entorno Urbano", icon: "🏙️" }
  ];

  const filteredExamples = selectedCategory === "todos"
    ? soundExamples
    : soundExamples.filter(example => example.category === selectedCategory);

  const getCurrentComparison = () =>
    soundExamples.find(example => Math.abs(example.db - currentDb) <= 8);

  const getDbColorClass = (db: number): string => {
    if (db < 30) return "db-safe";
    if (db < 60) return "db-moderate";
    if (db < 85) return "db-warning";
    return "db-danger";
  };

  const getDangerClass = (danger: string): string => `danger-${danger}`;
  const getLevelBarClass = (danger: string): string => `level-bar level-bar-${danger}`;

  const toggleMeasuring = () => {
    if (!isMeasuring) {
      setCurrentDb(0);
      setHighestDb(0);
      setAlertMessage("");
    }
    setIsMeasuring(!isMeasuring);
  };

  const currentComparison = getCurrentComparison();

  useEffect(() => {
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let microphone: MediaStreamAudioSourceNode | null = null;
    let scriptProcessor: ScriptProcessorNode | null = null;

    const startAnalyzingAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

        if (audioContext.state === "suspended") await audioContext.resume();

        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);
        scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.8;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = () => {
          const currentTime = Date.now();
          if (currentTime - lastUpdateTime.current < 100) return;
          lastUpdateTime.current = currentTime;

          if (!analyser) return;
          analyser.getFloatFrequencyData(dataArray);
          let maxDb = Math.max(...dataArray);
          if (maxDb < -100) maxDb = -100;
          const normalizedDb = Math.max(0, maxDb + 100);

          if (normalizedDb > 0) {
            setCurrentDb(normalizedDb);
            if (normalizedDb > highestDb) setHighestDb(normalizedDb);

            if (normalizedDb > 85) setAlertMessage("🔴 NIVEL PELIGROSO - Protege tu audición");
            else if (normalizedDb > 70) setAlertMessage("🟠 NIVEL ALTO - Ten cuidado");
            else if (normalizedDb > 50) setAlertMessage("🟡 NIVEL MODERADO");
            else setAlertMessage("🟢 NIVEL SEGURO");
          } else {
            setCurrentDb(0);
            setAlertMessage("");
          }
        };
      } catch (err) {
        console.error("Error al acceder al micrófono:", err);
        setAlertMessage("❌ Error: No se pudo acceder al micrófono");
      }
    };

    if (isMeasuring) startAnalyzingAudio();

    return () => {
      if (audioContext) audioContext.close();
      if (scriptProcessor) scriptProcessor.disconnect();
      if (microphone) microphone.disconnect();
    };
  }, [isMeasuring, highestDb]);

  return (
    <div className="page-wrapper">
      <div className="hero-container">
        <p className="hero-description">
          Descubre cómo suena el mundo comparando tu entorno con humanos, animales y la ciudad
        </p>
      </div>

      <div className="main-container">
        {/* Medidor principal */}
        <div className="main-meter">
          <div className="meter-header">
            <Volume2 size={40} className="meter-icon" />
            <h3 className="meter-title">Medidor en Tiempo Real.</h3>
          </div>

          <div>
            <div className={`db-display ${getDbColorClass(currentDb)}`}>
              {currentDb.toFixed(1)}
              <span className="db-unit">dB</span>
            </div>

            {currentComparison && isMeasuring && (
              <div className="current-comparison">
                <div className="comparison-icon">{currentComparison.icon}</div>
                <div className="comparison-title">Suena como: {currentComparison.name}</div>
                <div className="comparison-description">{currentComparison.description}</div>
              </div>
            )}
          </div>

          <button
            onClick={toggleMeasuring}
            className={`measure-button ${isMeasuring ? "measuring" : "not-measuring"}`}
          >
            {isMeasuring ? (
              <>
                <Pause className="inline" size={20} style={{ marginRight: "0.5rem" }} />
                Detener Medición
              </>
            ) : (
              <>
                <Mic className="inline" size={20} style={{ marginRight: "0.5rem" }} />
                Comenzar a Medir
              </>
            )}
          </button>

          {highestDb > 0 && (
            <div className="stats-display">
              <BarChart3 className="inline" size={16} style={{ marginRight: "0.5rem" }} />
              <span>Pico máximo registrado: </span>
              <span className={`peak-value ${getDbColorClass(highestDb)}`}>
                {highestDb.toFixed(1)} dB
              </span>
            </div>
          )}

          {alertMessage && (
            <div className="alert-message">
              <div className="alert-content">
                <Info className="alert-icon" size={20} />
                <span className="alert-text">{alertMessage}</span>
              </div>
            </div>
          )}
        </div>

        {/* Filtros por categorías */}
        <div className="categories-section">
          <h3 className="categories-title">Explora por Categorías</h3>
          <div className="categories-container">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`category-button ${selectedCategory === category.value ? "active" : "inactive"}`}
              >
                <span className="category-icon">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comparaciones */}
        <div className="examples-grid">
          {filteredExamples.map((example) => (
            <div
              key={example.name}
              className={`example-card ${
                Math.abs(example.db - currentDb) <= 10 && isMeasuring ? "highlighted" : ""
              }`}
            >
              <div className="example-icon">{example.icon}</div>
              <h4 className="example-name">{example.name}</h4>
              <div className={`example-db ${getDbColorClass(example.db)}`}>{example.db} dB</div>
              <p className="example-description">{example.description}</p>

              <div className="level-bar-container">
                <div
                  className={getLevelBarClass(example.danger)}
                  style={{ width: `${Math.min((example.db / 150) * 100, 100)}%` }}
                />
              </div>

              <div className={`danger-label ${getDangerClass(example.danger)}`}>
                {example.danger === "safe" && "✅ SEGURO"}
                {example.danger === "moderate" && "⚠️ MODERADO"}
                {example.danger === "warning" && "🔶 CUIDADO"}
                {example.danger === "danger" && "🔴 PELIGROSO"}
                {example.danger === "extreme" && "☢️ EXTREMO"}
              </div>
            </div>
          ))}
        </div>

        {/* Escala visual */}
        {isMeasuring && (
          <div className="visual-scale">
            <h3 className="scale-title">📊 Tu Entorno en la Escala Global</h3>
            <div className="scale-container">
              <div className="scale-labels">
                <span>Silencio</span>
                <span>Límite Humano</span>
              </div>
              <div className="scale-bar">
                <div
                  className={`current-indicator ${isMeasuring ? "measuring" : ""}`}
                  style={{ left: `calc(${Math.min((currentDb / 150) * 100, 100)}% - 4px)` }}
                >
                  <div className="current-label">
                    TÚ AHORA: {currentDb.toFixed(1)} dB
                  </div>
                </div>
                {[30, 60, 85, 120].map((db) => (
                  <div key={db} className="scale-marker" style={{ left: `${(db / 150) * 100}%` }}>
                    <div className="marker-label">{db}</div>
                  </div>
                ))}
              </div>
            </div>

            {currentComparison && (
              <div className="current-comparison-highlight">
                <div className="comparison-highlight-icon">{currentComparison.icon}</div>
                <div className="comparison-highlight-title">
                  ¡Tu entorno suena como {currentComparison.name}!
                </div>
                <div className="comparison-highlight-desc">
                  {currentComparison.description}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};