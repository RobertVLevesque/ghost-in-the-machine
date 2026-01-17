import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const { step, lastActiveId } = useGhostStore();
  const [nodeState, setNodeState] = useState(0);

  // Synchronize internal state for the "Analytic" lift delay
  useEffect(() => {
    if (step === 'node1') setNodeState(1);
    else if (step === 'node2') setNodeState(2);
    else if (step === 'revealed') {
      setNodeState(2);
      setTimeout(() => setNodeState(3), 350);
    } else if (step === 'idle') setNodeState(0);
  }, [step]);

  const legVariants: Variants = {
    idle: { 
      y: 0, 
      opacity: 0.6 
    },
    lifted: { 
      y: -18, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 120, damping: 12 } 
    },
    glitch: {
      opacity: [1, 0.2, 0.9, 0.3, 1],
      x: [0, -3, 3, -1, 0],
      transition: { duration: 0.3 }
    }
  };

  // This function now handles the animation state logic
  const getVariant = (id: number) => {
    if (lastActiveId === id) return "glitch";
    if (id === 3 && nodeState >= 3) return "lifted"; // Center leg
    if (id !== 3 && nodeState >= id) return "lifted"; // Side legs
    return "idle";
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
      <motion.svg 
        className="w-[75vw] max-w-[320px] h-auto neon-glow"
        viewBox="0 0 200 240"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 'idle' ? 0.05 : 1 }}
      >
        <defs>
          <filter id="neon-bloom">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* BODY - Spectral Shell */}
        <path
          d="M100 20 C60 20, 45 55, 45 90 V160 H155 V90 C155 55, 140 20, 100 20Z"
          fill="rgba(180, 255, 255, 0.15)"
          stroke="rgba(180, 255, 255, 0.8)"
          strokeWidth="0.5"
          filter="url(#neon-bloom)"
        />

        {/* EYES - Void with Pulsing Pupils */}
        <g opacity={step === 'idle' ? 0 : 1}>
          <ellipse cx="85" cy="85" rx="6" ry="10" fill="#050505" />
          <ellipse cx="115" cy="85" rx="6" ry="10" fill="#050505" />
          <motion.circle 
            cx="85" cy="85" r="2" fill="#ff0000" 
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.circle 
            cx="115" cy="85" r="2" fill="#ff0000" 
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </g>

        {/* --- NEON TUBE LEGS --- */}
        
        {/* Left Leg (Node 1) */}
        <motion.g variants={legVariants} animate={getVariant(1)}>
          <path d="M70 140 C65 165, 65 190, 55 205" fill="none" stroke="rgba(180, 255, 255, 0.3)" strokeWidth="6" strokeLinecap="round" />
          <path d="M70 140 C65 165, 65 190, 55 205" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="animate-tube" />
          <circle cx="55" cy="205" r="3" fill="#fff" filter="url(#neon-bloom)" />
        </motion.g>

        {/* Center Leg (Node 3) */}
        <motion.g variants={legVariants} animate={getVariant(3)}>
          <path d="M100 140 C100 170, 100 195, 100 215" fill="none" stroke="rgba(180, 255, 255, 0.3)" strokeWidth="6" strokeLinecap="round" />
          <path d="M100 140 C100 170, 100 195, 100 215" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="animate-tube" />
          <circle cx="100" cy="215" r="3" fill="#fff" filter="url(#neon-bloom)" />
        </motion.g>

        {/* Right Leg (Node 2) */}
        <motion.g variants={legVariants} animate={getVariant(2)}>
          <path d="M130 140 C135 165, 140 185, 150 205" fill="none" stroke="rgba(180, 255, 255, 0.3)" strokeWidth="6" strokeLinecap="round" />
          <path d="M130 140 C135 165, 140 185, 150 205" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" className="animate-tube" />
          <circle cx="150" cy="205" r="3" fill="#fff" filter="url(#neon-bloom)" />
        </motion.g>
      </motion.svg>
    </div>
  );
};