import React, { useRef, useState } from 'react';

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
    }
}

const AudioRecorder: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
            mediaRecorderRef.current = new MediaRecorder(stream);

            const audioChunks: BlobPart[] = [];
            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunks.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error("Error al acceder al micrófono:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    const playAudio = () => {
        if (audioURL) {
            const audio = new Audio(audioURL);
            audio.play();
        }
    };

    return (
        <div>
            <button id='BtnMicP' onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Detener Prueba' : 'Iniciar Prueba'}
            </button>
            {audioURL && (
                <div>
                    <button id='BtnMicP' onClick={playAudio}>Reproducir Audio de la Prueba</button>
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
