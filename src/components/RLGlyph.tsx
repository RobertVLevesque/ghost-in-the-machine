import { useGhostStore } from '../store/useGhostStore';

export const RLGlyph = () => {
  const { step, setStep, setTerminalActive } = useGhostStore();

  const handleMouseEnter = () => {
    if (step === 'idle') {
      setStep('glyphHovered');
      setTimeout(() => setTerminalActive(true), 1000);
    }
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      className="fixed top-8 left-8 z-[60] cursor-pointer group pointer-events-auto"
    >
      <div className="text-[10px] font-bold tracking-tighter opacity-40 group-hover:opacity-100 transition-opacity">
        RL
      </div>
      <div className="w-4 h-[1px] bg-white/20 group-hover:bg-red-600 transition-colors" />
    </div>
  );
};