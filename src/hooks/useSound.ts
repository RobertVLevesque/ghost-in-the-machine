let audioCtx: AudioContext | null = null;

export const useSound = () => {
  const init = () => {
    if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
  };

  const play = (freq: number, type: OscillatorType, duration: number) => {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  };

  return { 
    init, 
    playHum: () => play(110, 'sine', 1.5),
    playSurge: () => play(220, 'sawtooth', 0.8),
    playBlip: () => play(880, 'square', 0.1)
  };
};