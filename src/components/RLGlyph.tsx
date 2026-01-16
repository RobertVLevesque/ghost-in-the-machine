import { useGhostStore } from '../store/useGhostStore';
import { useSound } from '../hooks/useSound';

export const RLGlyph = () => {
  const step = useGhostStore((s) => s.step);
  const setStep = useGhostStore((s) => s.setStep);
  const setTerminalActive = useGhostStore((s) => s.setTerminalActive);
  const { init, playHum } = useSound();

  const handleClick = () => {
    if (step === 'idle') {
      init();
      playHum();
      setStep('scanning');
      setTerminalActive(true);
    }
  };

  return (
    <button 
      onClick={handleClick} 
      className="fixed top-8 left-8 z-[110] p-4 bg-transparent border-none cursor-pointer group outline-none"
    >
      <div className="text-4xl md:text-7xl font-black tracking-tighter opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-700 uppercase select-none">
        RL
      </div>
    </button>
  );
};