export const useSound = () => {
  const playSound = (freq: number, type: OscillatorType = 'square', duration = 0.1) => {
    try {
      const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error("Audio blocked by browser policy");
    }
  };

  return { 
    playBlip: () => playSound(880, 'square', 0.1),
    playSurge: () => playSound(220, 'sawtooth', 0.4),
    playHum: () => playSound(110, 'sine', 1.5)
  };
};