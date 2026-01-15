import { useGhostStore } from '../store/useGhostStore';

export const RLGlyph = () => {
  const { step, setStep, setTerminalActive } = useGhostStore();

  const handleMouseEnter = () => {
    if (step === 'idle') {
      setStep('glyphHovered');
      // Terminal pops up immediately now
      setTerminalActive(true);
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      className="fixed top-8 left-8 z-[60] cursor-pointer group pointer-events-auto p-4"
    >
      <div className="text-5xl font-black tracking-tighter opacity-20 group-hover:opacity-100 group-hover:text-red-600 transition-all duration-500 uppercase">
        RL
      </div>
      <div className="w-12 h-[2px] bg-white/10 group-hover:bg-red-600 mt-2 transition-all duration-500" />
    </div>
  );
};