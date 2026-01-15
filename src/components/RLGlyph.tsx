import { useGhostStore } from '../store/useGhostStore';

export const RLGlyph = () => {
  const { step, setStep, setTerminalActive } = useGhostStore();

  const handleClick = () => {
    if (step === 'idle') {
      setStep('scanning'); // Start the flicker reveal
      setTerminalActive(true);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="fixed top-8 left-8 z-[110] cursor-pointer group p-4 bg-transparent border-none outline-none"
    >
      <div className="text-6xl font-black tracking-tighter opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-700 uppercase select-none">
        RL
      </div>
    </button>
  );
};