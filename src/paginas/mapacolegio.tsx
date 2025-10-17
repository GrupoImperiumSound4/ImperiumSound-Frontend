import "../styles/mapacolegio.css";
import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";
import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

// Mapeo de zonas a IDs de la base de datos
const zonasToPointId: Record<string, number> = {
  "Porteria": 1,
  "Papeleria": 2,
  "restaurante": 3,
  "Zona de informatica": 4,
  "a": 5,
  "b": 6,
  "Aulas Pacho": 7,
  "Baños zoilo": 8,
  "salon catalina": 9,
  "Salon primo": 10
};

const zonasColegio: Record<string, { nombre: string; imagen: string }[]> = {
  piso1: [
    { nombre: "Porteria", imagen: "/img/entrada.png" },
    { nombre: "Papeleria", imagen: "/img/....jpg" },
    { nombre: "Restaurante", imagen: "/img/....jpg" }
  ],
  piso2: [
    { nombre: "Zona de informatica", imagen: "/img/laboratorio.jpg" },
    { nombre: "Algun sito", imagen: "/img/aula201.jpg" },
    { nombre: "Algun sitio", imagen: "/img/pasillo.jpg" }
  ],
  piso3: [
    { nombre: "Aulas Pacho", imagen: "/img/musica.jpg" },
    { nombre: "Baños zoilo", imagen: "/img/aula301.jpg" },
    { nombre: "salon catalina", imagen: "/img/oficinas.jpg" },
    { nombre: "Salon primo", imagen: "/img/mate.jpg"}
  ]
};

const MapaColegio = () => {
  const [piso, setPiso] = useState<keyof typeof zonasColegio>("piso1");
  const [zona, setZona] = useState<string | null>(null);
  const [imagenZona, setImagenZona] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Estados para decibeles
  const [currentDb, setCurrentDb] = useState(0);
  const [highestDb, setHighestDb] = useState(0);
  const lastUpdateTime = useRef(0);

  // Referencias para el análisis de audio
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  // Estados para subida
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const API_URL = "http://localhost:8000";

  const seleccionarZona = (zonaSeleccionada: { nombre: string; imagen: string }) => {
    setZona(zonaSeleccionada.nombre);
    setImagenZona(zonaSeleccionada.imagen);
    setModalOpen(true);
    setAudioURL(null);
    setAudioBlob(null);
    setUploadStatus("");
    setCurrentDb(0);
    setHighestDb(0);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });

      // Inicializar AudioContext para medir decibeles (método de didactico.tsx)
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }

      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      scriptProcessorRef.current = audioContextRef.current.createScriptProcessor(2048, 1, 1);

      analyserRef.current.fftSize = 2048;
      analyserRef.current.smoothingTimeConstant = 0.8;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);

      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.connect(scriptProcessorRef.current);
      scriptProcessorRef.current.connect(audioContextRef.current.destination);

      // Procesar audio en tiempo real
      scriptProcessorRef.current.onaudioprocess = () => {
        const currentTime = Date.now();
        if (currentTime - lastUpdateTime.current < 100) return;
        lastUpdateTime.current = currentTime;

        if (!analyserRef.current) return;
        analyserRef.current.getFloatFrequencyData(dataArray);
        let maxDb = Math.max(...dataArray);
        if (maxDb < -100) maxDb = -100;
        const normalizedDb = Math.max(0, maxDb + 100);

        if (normalizedDb > 0) {
          setCurrentDb(normalizedDb);
          setHighestDb(prev => Math.max(prev, normalizedDb));
        }
      };

      // Configurar MediaRecorder para grabar
      const options: any = { mimeType: 'audio/webm;codecs=opus' };
      
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'audio/webm';
      }
      
      const recorder = new MediaRecorder(stream, options);
      setMediaRecorder(recorder);
      const chunks: Blob[] = [];
      setCurrentDb(0);
      setHighestDb(0);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType });
        setAudioURL(URL.createObjectURL(blob));
        setAudioBlob(blob);

        // Detener el stream
        stream.getTracks().forEach(track => track.stop());

        // Limpiar audio context
        if (scriptProcessorRef.current) {
          scriptProcessorRef.current.disconnect();
          scriptProcessorRef.current = null;
        }
        if (microphoneRef.current) {
          microphoneRef.current.disconnect();
          microphoneRef.current = null;
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
        analyserRef.current = null;
      };

      recorder.start();
      setIsRecording(true);

    } catch (err) {
      console.error("Error al iniciar grabación:", err);
      alert("No se pudo acceder al micrófono");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const uploadAudio = async () => {
    if (!audioBlob) {
      alert("No hay audio para subir");
      return;
    }

    if (!zona) {
      alert("Error: No hay zona seleccionada");
      return;
    }

    const id_point = zonasToPointId[zona];
    if (!id_point) {
      alert("Error: Zona no encontrada en la base de datos");
      return;
    }

    if (highestDb === 0) {
      alert("Error: No se registraron decibeles");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Subiendo...");

    try {
      // Debug: Ver el tipo de blob
      console.log("Tipo de blob:", audioBlob.type);
      console.log("Tamaño de blob:", audioBlob.size);

      const formData = new FormData();
      // Asegurar que el blob tenga el tipo correcto
      const finalBlob = new Blob([audioBlob], { type: 'audio/webm' });
      formData.append("audio", finalBlob, "recording.webm");
      formData.append("decibels", highestDb.toFixed(2));
      formData.append("id_point", id_point.toString());

      const response = await fetch(`${API_URL}/Registro-sonido`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadStatus("✓ Audio guardado exitosamente");
        console.log("Respuesta:", data);

        setTimeout(() => {
          setModalOpen(false);
          setAudioURL(null);
          setAudioBlob(null);
          setUploadStatus("");
          setCurrentDb(0);
          setHighestDb(0);
        }, 2000);
      } else {
        const error = await response.json();
        setUploadStatus(`✗ Error: ${error.detail || "Error desconocido"}`);
        console.error("Error del servidor:", error);
      }
    } catch (err) {
      console.error("Error al subir:", err);
      setUploadStatus("✗ Error de conexión con el servidor");
    } finally {
      setIsUploading(false);
    }
  };

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
      }
      if (microphoneRef.current) {
        microphoneRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="ano">
        <UpsiteLog/>
        <div className="zonas-container">
                 
          <div className="pisos">
              <div className={`piso1 ${piso === "piso1" ? "activo" : ""}`}>
              <button onClick={() => setPiso("piso1")}>Piso 1</button></div>
                                                          
          <div className={`piso2 ${piso === "piso2" ? "activo" : ""}`}>
            <button onClick={() => setPiso("piso2")}>Piso 2</button></div>
 
          <div className={`piso3 ${piso === "piso3" ? "activo" : ""}`}>
              <button onClick={() => setPiso("piso3")}>Piso 3</button></div>
            
    </div>

      <div className="location">
        {zonasColegio[piso].map((z) => (
          <button
            key={z.nombre}
            className={`zona-btn ${zona === z.nombre ? "activa" : ""}`}
            onClick={() => seleccionarZona(z)}
          >
            {z.nombre}
          </button>
        ))}
      </div>
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        style={{
          content: {
            width: "400px",
            margin: "auto",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center"
          }
        }}
      >
        <h2>{zona}</h2>

        {imagenZona && (
          <img
            src={imagenZona}
            alt={zona || ""}
            style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }}
          />
        )}

        {isRecording && (
          <div style={{ 
            margin: "15px 0", 
            padding: "10px", 
            background: "#f0f0f0", 
            borderRadius: "8px" 
          }}>
            <p style={{ margin: "5px 0", fontWeight: "bold", fontSize: "18px" }}>
              🔊 {currentDb.toFixed(1)} dB
            </p>
            <div style={{
              width: "100%",
              height: "20px",
              background: "#ddd",
              borderRadius: "10px",
              overflow: "hidden"
            }}>
              <div style={{
                width: `${Math.min((currentDb / 120) * 100, 100)}%`,
                height: "100%",
                background: `linear-gradient(to right, green, yellow, red)`,
                transition: "width 0.1s"
              }} />
            </div>
            <p style={{ margin: "5px 0", fontSize: "12px", color: "#666" }}>
              Máximo: {highestDb.toFixed(1)} dB
            </p>
          </div>
        )}

        {!isRecording ? (
          <button onClick={startRecording}>🎤 Iniciar grabación</button>
        ) : (
          <button onClick={stopRecording}>⏹ Detener grabación</button>
        )}

        {audioURL && (
          <div style={{ marginTop: "10px" }}>
            <audio controls src={audioURL}></audio>
            
            <div style={{ 
              margin: "10px 0", 
              padding: "8px", 
              background: "#e8f5e9", 
              borderRadius: "5px" 
            }}>
              <strong>Decibeles máximos registrados: {highestDb.toFixed(1)} dB</strong>
            </div>

            <button
              onClick={uploadAudio}
              disabled={isUploading}
              style={{
                marginTop: "10px",
                background: isUploading ? "#ccc" : "#4CAF50",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: isUploading ? "not-allowed" : "pointer",
                width: "100%"
              }}
            >
              {isUploading ? "⏳ Subiendo..." : "📤 Guardar "}
            </button>

            {uploadStatus && (
              <p style={{
                marginTop: "10px",
                color: uploadStatus.startsWith("✓") ? "green" : "red",
                fontWeight: "bold"
              }}>
                {uploadStatus}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MapaColegio;