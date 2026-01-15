// src/hooks/useSound.ts
let sharedCtx: AudioContext | null = null;

export const useSound = () => {
  const init = async () => {
    if (!sharedCtx) {
      sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (sharedCtx.state === 'suspended') {
      await sharedCtx.resume();
    }
  };

  const play = (freq: number, type: OscillatorType = 'square', duration = 0.2) => {
    if (!sharedCtx) return;
    const osc = sharedCtx.createOscillator();
    const gain = sharedCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, sharedCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(0.01, sharedCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.1, sharedCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, sharedCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(sharedCtx.destination);
    osc.start();
    osc.stop(sharedCtx.currentTime + duration);
  };

  return { 
    init, 
    playBlip: () => play(880, 'square', 0.1), 
    playSurge: () => play(150, 'sawtooth', 0.6),
    playHum: () => play(110, 'sine', 1.0)
  };
};