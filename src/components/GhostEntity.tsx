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
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <motion.svg 
        id="ghost"
        className="w-[70vw] max-w-[280px] h-auto animate-flicker"
        viewBox="0 0 200 220"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 'idle' ? 0.05 : 1 }}
      >
        {/* OVERLAPPING BODY: Gap is eliminated by V160 extension */}
        <path
          id="body"
          d="M100 20 C60 20, 45 55, 45 90 V160 H155 V90 C155 55, 140 20, 100 20Z"
          fill="rgba(180, 255, 255, 0.4)"
        />

        {/* EYES */}
        <g opacity={step === 'idle' ? 0 : 1}>
          <ellipse cx="85" cy="85" rx="6" ry="10" fill="#050505"/>
          <ellipse cx="115" cy="85" rx="6" ry="10" fill="#050505"/>
          <circle cx="85" cy="85" r="1.5" className="eye-glow" />
          <circle cx="115" cy="85" r="1.5" className="eye-glow" />
        </g>

        {/* LEGS */}
        <motion.path 
          id="leg-left" 
          d="M45 140 C45 165, 80 165, 80 140"
          variants={legVariants}
          animate={getVariant(1)}
        />

        <motion.path 
          id="leg-center" 
          d="M80 140 C80 165, 120 165, 120 140"
          variants={legVariants}
          animate={getVariant(3)} 
        />

        <motion.path 
          id="leg-right" 
          d="M120 140 C120 165, 155 165, 155 140"
          variants={legVariants}
          animate={getVariant(2)}
        />
      </motion.svg>
    </div>
  );
};