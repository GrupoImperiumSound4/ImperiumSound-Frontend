declare module 'ml5' {
  interface ML5 {
    pitchDetection(model: string, audioContext: AudioContext, stream: MediaStream, callback: Function): any;
  }
  
  const ml5: ML5;
  export = ml5;
}