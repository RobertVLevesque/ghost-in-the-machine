import { motion, AnimatePresence } from 'framer-motion';
import { Triangle } from 'lucide-react';
import { useState } from 'react';

interface TriangleNodeProps {
  position: string;
  isActive: boolean;
  id: number;
  onClick: () => void;
}

export const TriangleNode = ({ position, isActive, onClick }: TriangleNodeProps) => {
  const [showPulse, setShowPulse] = useState(false);

  // Synthetic "Data Blip" Sound Generator
  const playBlip = () => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square'; // Digital feel
    osc.frequency.setValueAtTime(isActive ? 880 : 440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  const handleClick = () => {
    if (isActive) return;
    playBlip();
    setShowPulse(true);
    onClick();
    // Hide pulse after animation completes
    setTimeout(() => setShowPulse(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute ${position} pointer-events-auto z-40`}
    >
      <button 
        onClick={handleClick}
        className="group relative p-4 focus:outline-none"
      >
        <Triangle 
          className={`w-8 h-8 transition-all duration-700 ${
            isActive ? 'text-red-600 fill-red-600/20' : 'text-white/20 group-hover:text-white'
          }`}
        />

        {/* The Pulse Sweep Line */}
        <AnimatePresence>
          {showPulse && (
            <motion.div 
              initial={{ scaleX: 0, opacity: 1, x: '-50%' }}
              animate={{ scaleX: 1, opacity: 0, x: '100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="fixed left-0 w-screen h-[2px] bg-red-500 shadow-[0_0_15px_rgba(255,0,0,0.8)] z-[-1] pointer-events-none"
              style={{ top: '50%' }}
            />
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};