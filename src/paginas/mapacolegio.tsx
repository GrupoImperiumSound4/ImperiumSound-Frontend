import "../styles/mapacolegio.css";
import { UpsiteLog } from "../componetes/Nav-UpsiteComp/UpsiteLog";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

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
    { nombre: "Salon catalina", imagen: "/img/oficinas.jpg" }
  ]
};

const MapaColegio = () => {

  const [piso, setPiso] = useState<keyof typeof zonasColegio>("piso1");
  const [zona, setZona] = useState<string | null>(null);
  const [imagenZona, setImagenZona] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

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
        setAudioURL(URL.createObjectURL(blob));
      };

      recorder.start();
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