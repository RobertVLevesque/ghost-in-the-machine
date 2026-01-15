import { motion } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const step = useGhostStore((state) => state.step);
  const isRevealed = step === 'revealed';

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isRevealed ? 1 : 0.15 }}
      transition={{ duration: 2 }}
    >
      <svg width="400" height="500" viewBox="0 0 100 120" className="animate-circuit-flicker">
        {/* The Body Path - Traced from your PNG */}
        <path 
          d="M20,40 A30,30 0 0,1 80,40 V70 L85,75 L85,85 L75,75 V70 H25 V75 L15,85 L15,75 L20,70 Z" 
          fill="none" 
          stroke="white" 
          strokeWidth="0.5"
        />
        
        {/* Facial Orifices */}
        <circle cx="38" cy="45" r="5" stroke="white" strokeWidth="0.5" fill="black" />
        <circle cx="62" cy="45" r="5" stroke="white" strokeWidth="0.5" fill="black" />
        <ellipse cx="50" cy="60" rx="4" ry="6" stroke="white" strokeWidth="0.5" fill="black" />

        {/* Circuit Legs */}
        {/* Left Leg */}
        <path d="M35,70 V85 L25,100" stroke="white" strokeWidth="0.5" fill="none" />
        <circle cx="25" cy="103" r="2" stroke="white" strokeWidth="0.5" fill="none" />
        
        {/* Center Leg */}
        <path d="M50,70 V105" stroke="white" strokeWidth="0.5" fill="none" />
        <circle cx="50" cy="108" r="2" stroke="white" strokeWidth="0.5" fill="none" />

        {/* Right Leg */}
        <path d="M65,70 V85 L75,100" stroke="white" strokeWidth="0.5" fill="none" />
        <circle cx="75" cy="103" r="2" stroke="white" strokeWidth="0.5" fill="none" />

        {/* Glowing Red Eyes (manifests on hover) */}
        {step !== 'idle' && (
          <g>
            <circle cx="38" cy="45" r="1.5" fill="red" className="animate-pulse" />
            <circle cx="62" cy="45" r="1.5" fill="red" className="animate-pulse" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};