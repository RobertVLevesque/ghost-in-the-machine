import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// Notice the 'type' keyword below - this fixes the Vercel error
import type { Variants } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const { step, lastActiveId } = useGhostStore();
  const [nodeState, setNodeState] = useState(0);

  useEffect(() => {
    if (step === 'node1') setNodeState(1);
    else if (step === 'node2') setNodeState(2);
    else if (step === 'revealed') {
      setNodeState(2);
      setTimeout(() => setNodeState(3), 350);
    } else if (step === 'idle') setNodeState(0);
  }, [step]);

  // Defined with the explicit type to satisfy TS
  const legVariants: Variants = {
    idle: { 
      y: 0, 
      fill: "rgba(180, 255, 255, 0.4)",
      opacity: 1
    },
    lifted: { 
      y: -18, 
      fill: "rgba(200, 255, 255, 0.8)",
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 12 }
    },
    glitch: {
      opacity: [1, 0.2, 0.9, 0.3, 1],
      x: [0, -3, 3, -1, 0],
      fill: "rgba(255, 255, 255, 1)",
      transition: { duration: 0.3 }
    }
  };

  const getVariant = (id: number) => {
    if (lastActiveId === id) return "glitch";
    // Center leg (ID 3) is the last one in the logic chain
    if (id === 3 && nodeState >= 3) return "lifted";
    if (id !== 3 && nodeState >= id) return "lifted";
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
        {/* BODY - Double Layer for Glow */}
        <path
          d="M100 20 C60 20, 45 55, 45 90 V160 H155 V90 C155 55, 140 20, 100 20Z"
          fill="rgba(180, 255, 255, 0.15)"
          stroke="rgba(180, 255, 255, 0.8)"
          strokeWidth="0.5"
        />

        {/* EYES */}
        <g opacity={step === 'idle' ? 0 : 1}>
          <ellipse cx="85" cy="85" rx="6" ry="10" fill="#050505" />
          <ellipse cx="115" cy="85" rx="6" ry="10" fill="#050505" />
          <motion.circle 
            cx="85" cy="85" r="2" fill="#ff0000" 
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          />
          <motion.circle 
            cx="115" cy="85" r="2" fill="#ff0000" 
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </g>

        {/* --- NEON TUBE LEGS --- */}
        {/* Left Leg */}
        <motion.g variants={legVariants} animate={lastActiveId === 1 ? "glitch" : step.includes('node') || step === 'revealed' ? "lifted" : "idle"}>
          {/* Outer Glow Path */}
          <path d="M70 140 C65 165, 65 190, 55 205" fill="none" stroke="rgba(180, 255, 255, 0.3)" strokeWidth="6" strokeLinecap="round" />
          {/* Inner Bright Tube */}
          <path d="M70 140 C65 165, 65 190, 55 205" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" className="animate-tube" />
          <circle cx="55" cy="205" r="3" fill="#fff" className="neon-glow" />
        </motion.g>

        {/* Center Leg */}
        <motion.g variants={legVariants} animate={lastActiveId === 3 ? "glitch" : step === 'revealed' ? "lifted" : "idle"}>
          <path d="M100 140 C100 170, 100 195, 100 215" fill="none" stroke="rgba(180, 255, 255, 0.3)" strokeWidth="6" strokeLinecap="round" />
          <path d="M100 140 C100 170, 100 195, 100 215" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" className="animate-tube" />
          <circle cx="100" cy="215" r="3" fill="#fff" className="neon-glow" />
        </motion.g>

        {/* Right Leg */}
        <motion.g variants={legVariants} animate={lastActiveId === 2 ? "glitch" : step.includes('node2') || step === 'revealed' ? "lifted" : "idle"}>
          <path d="M130 140 C135 165, 140 185, 150 205" fill="none" stroke="rgba(180, 255, 255, 0.3)" strokeWidth="6" strokeLinecap="round" />
          <path d="M130 140 C135 165, 140 185, 150 205" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" className="animate-tube" />
          <circle cx="150" cy="205" r="3" fill="#fff" className="neon-glow" />
        </motion.g>
      </motion.svg>
    </div>
  );
};