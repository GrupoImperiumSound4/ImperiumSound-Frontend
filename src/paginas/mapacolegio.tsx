import "../styles/mapacolegio.css";
import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const zonasColegio: Record<string, { nombre: string; imagen: string }[]> = {
  piso1: [
    { nombre: "Porteria", imagen: "/img/entrada.png" },
    { nombre: "Papeleria", imagen: "/img/....jpg" },
    { nombre: "restaurante", imagen: "/img/....jpg" }
  ],
  piso2: [
    { nombre: "Zona de informatica", imagen: "/img/laboratorio.jpg" },
    { nombre: "a", imagen: "/img/aula201.jpg" },
    { nombre: "b", imagen: "/img/pasillo.jpg" }
  ],
  piso3: [
    { nombre: "Aulas Pacho", imagen: "/img/musica.jpg" },
    { nombre: "Baños zoilo", imagen: "/img/aula301.jpg" },
    { nombre: "salon catalina", imagen: "/img/oficinas.jpg" }
  ]
};

const MapaColegio = () => {
  const navegar = useNavigate();

  const [piso, setPiso] = useState<keyof typeof zonasColegio>("piso1");
  const [zona, setZona] = useState<string | null>(null);
  const [imagenZona, setImagenZona] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const seleccionarZona = (zonaSeleccionada: { nombre: string; imagen: string }) => {
    setZona(zonaSeleccionada.nombre);
    setImagenZona(zonaSeleccionada.imagen);
    setModalOpen(true);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioChunks([]);
        setAudioURL(URL.createObjectURL(blob));
      };

      recorder.start();
      setAudioChunks(chunks);
      setIsRecording(true);
    } catch (err) {
      console.error("Error al iniciar grabación:", err);
    }
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  return (
    
      
    <div className="ano">
        <UpsiteLog></UpsiteLog>
        {/* Contenedor vertical */}
        <div className="zonas-container">
          <p className="txt"> 👋 Bienvenido Querido Profes@r a el lugar donde van a poder registrar el sonido 🔊 </p>
          {/* Aguamarina - Selector de piso */}
          <div className="pisos_picados">
            <button onClick={() => setPiso("piso1")}>Piso 1</button>
            <button onClick={() => setPiso("piso2")}>Piso 2</button>
            <button onClick={() => setPiso("piso3")}>Piso 3</button>
          </div>

          {/* Azul - Lista de zonas */}
          <div className="zona zona-azul">
            {zonasColegio[piso].map((z) => (
              <button key={z.nombre} onClick={() => seleccionarZona(z)}>
                {z.nombre}
              </button>
            ))}
          </div>
        </div>
        

        {/* Modal */}
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

          {!isRecording ? (
            <button onClick={startRecording}>🎤 Iniciar grabación</button>
          ) : (
            <button onClick={stopRecording}>⏹ Detener grabación</button>
          )}

          {audioURL && (
            <div style={{ marginTop: "10px" }}>
              <audio controls src={audioURL}></audio>
            </div>
          )}
        </Modal>
        </div> 
  );
};

export default MapaColegio;