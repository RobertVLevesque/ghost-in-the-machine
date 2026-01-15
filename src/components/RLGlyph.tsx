import { useGhostStore } from '../store/useGhostStore';

export const RLGlyph = () => {
  const { step, setStep, setTerminalActive } = useGhostStore();

  const handleMouseEnter = () => {
    if (step === 'idle') {
      setStep('glyphHovered');
      setTerminalActive(true);
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      // Added w-fit and h-fit to prevent blocking other elements
      className="fixed top-8 left-8 z-[60] cursor-pointer group pointer-events-auto w-fit h-fit p-2"
    >
      <div className="text-6xl font-black tracking-tighter opacity-10 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-700 uppercase select-none">
        RL
      </div>
      <div className="w-8 h-[2px] bg-white/5 group-hover:bg-red-600 mt-1 transition-all duration-700" />
    </div>
  );
};