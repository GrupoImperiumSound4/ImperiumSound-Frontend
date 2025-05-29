import React, { useEffect, useState, useRef } from "react";
import Select, { SingleValue } from 'react-select';

const AudioAnalyzer: React.FC = () => {
  const [currentDb, setCurrentDb] = useState<number>(0); // Nivel actual de dB
  const [highestDb, setHighestDb] = useState<number>(0);  // Nivel más alto registrado
  const [location, setLocation] = useState<{ value: string; label: string } | null>(null); // Lugar seleccionado
  const lastSoundTimeRef = useRef<number>(Date.now()); // Último tiempo de detección de sonido
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isMeasuring, setIsMeasuring] = useState<boolean>(false); // Estado de la medición
  const lastUpdateTime = useRef<number>(0); // Guardar el último tiempo de actualización
  const [locations, setLocations] = useState<{ value: string; label: string }[]>([]); // Estado para las ubicaciones

  // Función para obtener las ciudades desde el API
  const city = async () => {
    try {
      const response = await fetch('https://api-colombia.com/api/v1/City', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      // Extraer nombres de las ciudades
      const cities = data.map((city: { name: string }) => ({
        value: city.name.toLowerCase().replace(/ /g, '-'), // Reemplazar espacios con guiones
        label: city.name,
      }));
      setLocations(cities);
    } catch (e) {
      console.log('No se pudo obtener las ciudades:', e);
    }
  };

  useEffect(() => {
    city(); // Llamar a la API para obtener las ciudades
  }, []);

  useEffect(() => {
    let audioContext: AudioContext | undefined;
    let analyser: AnalyserNode | undefined;
    let microphone: MediaStreamAudioSourceNode | undefined;
    let scriptProcessor: ScriptProcessorNode | undefined;

    const startAnalyzingAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Resumir el contexto de audio si está suspendido
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }

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
          if (currentTime - lastUpdateTime.current < 250) return; // Actualiza cada 250 ms
          lastUpdateTime.current = currentTime; 

          analyser?.getFloatFrequencyData(dataArray);
          let maxDb = Math.max(...dataArray);
          if (maxDb < -100) maxDb = -100; 
          const normalizedDb = Math.max(0, (maxDb + 100));

          // Actualizar currentDb si normalizedDb es mayor que el umbral
          if (normalizedDb > 0) {
            setCurrentDb(normalizedDb);
            lastSoundTimeRef.current = currentTime;

            if (normalizedDb > highestDb) {
              setHighestDb(normalizedDb);
            }

            if (normalizedDb > 70) {
              setAlertMessage("¡Cuidado! El nivel de ruido ha superado los 70 dB.");
            } else {
              setAlertMessage("");
            }
          } else {
            // Si no hay sonido, establecer currentDb en 0
            setCurrentDb(0);
          }
        };

        // Detener la medición después de 10 segundos
        setTimeout(() => {
          setIsMeasuring(false);
          audioContext?.close(); // Cerrar el contexto de audio
        }, 10000);

      } catch (err) {
        console.error("Error al acceder al micrófono:", err);
      }
    };

    if (isMeasuring) {
      startAnalyzingAudio();
    }

    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (scriptProcessor) {
        scriptProcessor.disconnect();
      }
      if (microphone) {
        microphone.disconnect();
      }
    };
  }, [isMeasuring, highestDb]); // Dependencias actualizadas

  const handleStartTest = () => {
    // Reiniciar datos solo si no estamos midiendo
    if (!isMeasuring) {
      setCurrentDb(0);  // Reiniciar el nivel actual
      setHighestDb(0); // Reiniciar el nivel más alto
      setAlertMessage(""); // Reiniciar el mensaje de alerta
      setLocation(null); // Reiniciar la ubicación
      setIsMeasuring(true); // Iniciar la medición
    }
  };

  const handleLocationChange = (newValue: SingleValue<{ value: string; label: string }>) => {
    setLocation(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (highestDb > 0 && location) {
      console.log("Datos guardados:", { highestDb, location });
      alert(`Datos guardados:\nNivel más alto: ${highestDb.toFixed(2)} dB\nLugar: ${location.label}`);
    } else {
      alert("Por favor, seleccione un lugar y asegúrese de que se haya medido un nivel de dB.");
    }
  };

  return (
    <div>
      <h1>Medición de Contaminación Sonora</h1>
      <br />
      <p>Nivel actual en dB: {currentDb.toFixed(2)} dB</p>
      <p>Nivel más alto registrado: {highestDb.toFixed(2)} dB</p>
      {alertMessage && <p style={{ color: 'red' }}>{alertMessage}</p>}
      <button id="BtnMicP" onClick={handleStartTest}>Iniciar Medicion</button>
      
      <div style={{ marginTop: '1em' }}>
      <Select 
        options={locations} 
        onChange={handleLocationChange} 
        placeholder="Seleccione una Ciudad" 
        styles={{
            control: (provided) => ({
              ...provided,
              color: 'black', // Cambiar el color del texto del control
              width: '60%',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black', // Cambiar el color del texto seleccionado
            }),
            option: (provided, state) => ({
              ...provided,
              color: state.isFocused ? 'white' : 'black', // Cambiar el color del texto de la opción
              backgroundColor: state.isFocused ? '#7C4DFF' : 'white', // Cambiar el fondo al pasar el ratón
            }),
          }}
          isClearable
          isSearchable 
      />
      </div>
      <button id="BtnMicP" onClick={handleSubmit}>Guardar Datos</button>
    </div>
  );
};

export default AudioAnalyzer;
