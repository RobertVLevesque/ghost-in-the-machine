import { useGhostStore } from '../store/useGhostStore';
import { useSound } from '../hooks/useSound';

export const RLGlyph = () => {
  const { step, setStep, setTerminalActive } = useGhostStore();
  const { playSound } = useSound();

  const handleClick = () => {
    if (step === 'idle') {
      playSound('hum');
      setStep('scanning');
      setTerminalActive(true);
    }
  };

  return (
    <button onClick={handleClick} className="fixed top-8 left-8 z-[110] p-4 bg-transparent border-none cursor-pointer group">
      <div className="text-7xl font-black tracking-tighter opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-700 uppercase">
        RL
      </div>
    </button>
  );
};