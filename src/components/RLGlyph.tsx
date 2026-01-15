import { useGhostStore } from '../store/useGhostStore';

export const RLGlyph = () => {
  const { step, setStep, setTerminalActive } = useGhostStore();

  const playOminousHum = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, ctx.currentTime); // Low hum
    osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 1.5);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.5);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1.5);
  };

  const handleMouseEnter = () => {
    if (step === 'idle') {
      playOminousHum();
      setStep('glyphHovered');
      setTimeout(() => setTerminalActive(true), 1500);
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      className="fixed top-8 left-8 z-[60] cursor-pointer group pointer-events-auto p-4"
    >
      <div className="text-[10px] font-bold tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
        RL
      </div>
      <div className="w-4 h-[1px] bg-white/20 group-hover:bg-red-600 transition-colors" />
    </div>
  );
};