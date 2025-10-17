import { useEffect, useState, useRef } from "react";

export default function useVolume() {
  const [volume, setVolume] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] =useState<string | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const smoothingRef = useRef<number[]>([]);

  useEffect(() => {
    let stream: MediaStream;
    let animationId: number;

    async function init() {
      try {
        console.log('Iniciando detección de volumen...');

        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        console.log('AudioContext creado');

        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: false
          }
        });
        console.log('Stream obtenido');

        if (audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }

        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();

        analyserRef.current.fftSize = 512;
        analyserRef.current.smoothingTimeConstant = 0.8;

        source.connect(analyserRef.current);
        setIsListening(true);
        console.log('Detector de volumen listo');

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

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i] * dataArray[i];
      }

      const rms = Math.sqrt(sum / bufferLength);

      let decibels = 20 * Math.log10(rms);

      const minDb = -70;
      const maxDb = -10;

      decibels = Math.max(minDb, Math.min(maxDb, decibels));
      const normalizedDb = ((decibels - minDb) / (maxDb - minDb)) * 100;

      smoothingRef.current.push(normalizedDb);
      if (smoothingRef.current.length > 5) {
        smoothingRef.current.shift();
      }

      const smoothedVolume = smoothingRef.current.reduce((a, b) => a + b, 0) / smoothingRef.current.length;

      setVolume(Math.max(0, smoothedVolume));

      if (smoothedVolume > 15) {
        console.log('Volumen detectado:', Math.round(smoothedVolume), 'dB real:', Math.round(decibels));
      }

      animationId = requestAnimationFrame(detectVolume);
    }

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
