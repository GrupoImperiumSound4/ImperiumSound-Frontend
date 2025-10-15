import { useEffect, useState, useRef } from "react";

export default function useVolume() {
  const [volume, setVolume] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const smoothingRef = useRef<number[]>([]);

  useEffect(() => {
    let stream: MediaStream;
    let animationId: number;

    async function init() {
      try {
        console.log('Iniciando detección de volumen...');
        
        // Crear contexto de audio
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        console.log('AudioContext creado');

        // Solicitar acceso al micrófono
        stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true, // Cambié a true para reducir ruido
            noiseSuppression: true, // Cambié a true para reducir ruido de fondo
            autoGainControl: false
          } 
        });
        console.log('Stream obtenido');

        // Reanudar el contexto si está suspendido
        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        // Crear nodos de audio
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        // Configurar el analizador para volumen
        analyserRef.current.fftSize = 512; // Aumenté para mayor precisión
        analyserRef.current.smoothingTimeConstant = 0.8; // Más suavizado
        
        // Conectar los nodos
        source.connect(analyserRef.current);

        setIsListening(true);
        console.log('Detector de volumen listo');
        
        // Iniciar detección
        detectVolume();

      } catch (error) {
        console.error('Error inicializando detección de volumen:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
      }
    }

    function detectVolume() {
      if (!analyserRef.current) return;

      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Float32Array(bufferLength);
      analyserRef.current.getFloatTimeDomainData(dataArray);

      // Calcular RMS (Root Mean Square) para mayor precisión
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i] * dataArray[i];
      }
      
      const rms = Math.sqrt(sum / bufferLength);
      
      // Convertir a decibeles (dB)
      let decibels = 20 * Math.log10(rms);
      
      // Normalizar el rango de decibeles
      // -70 dB (muy silencioso) a -10 dB (muy fuerte) - Rango más amplio
      const minDb = -70;
      const maxDb = -10;
      
      // Limitar y normalizar
      decibels = Math.max(minDb, Math.min(maxDb, decibels));
      const normalizedDb = ((decibels - minDb) / (maxDb - minDb)) * 100;
      
      // Suavizado para evitar fluctuaciones bruscas
      smoothingRef.current.push(normalizedDb);
      if (smoothingRef.current.length > 5) {
        smoothingRef.current.shift();
      }
      
      const smoothedVolume = smoothingRef.current.reduce((a, b) => a + b, 0) / smoothingRef.current.length;
      
      setVolume(Math.max(0, smoothedVolume));
      
      if (smoothedVolume > 15) { // Solo log si hay sonido significativo
        console.log('Volumen detectado:', Math.round(smoothedVolume), 'dB real:', Math.round(decibels));
      }

      animationId = requestAnimationFrame(detectVolume);
    }

    // Inicializar después de un pequeño delay
    const timer = setTimeout(init, 100);

    return () => {
      console.log('Limpiando recursos...');
      clearTimeout(timer);
      cancelAnimationFrame(animationId);
      
      if (stream) {
        stream.getTracks().forEach(track => {
          track.stop();
        });
      }
      
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
      
      setIsListening(false);
    };
  }, []);

  return { volume, isListening, error };
}