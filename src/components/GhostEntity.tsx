import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  // High-frequency glitch animation for activation
  const activationGlitch = {
    opacity: [1, 0.4, 0.9, 0.2, 1],
    x: [0, -2, 2, -1, 0],
    filter: [
      "drop-shadow(0 0 0px rgba(120,255,255,0))",
      "drop-shadow(0 0 15px rgba(120,255,255,1))",
      "drop-shadow(0 0 5px rgba(120,255,255,0.5))"
    ],
    transition: { duration: 0.3 }
  };

  const legVariants = {
    active: (id: number) => ({
      y: nodeState >= id ? -18 : 0, // Lift higher for more impact
      fill: nodeState >= id ? "rgba(200, 255, 255, 0.8)" : "rgba(180, 255, 255, 0.4)",
      transition: { type: "spring", stiffness: 120, damping: 10 }
    })
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
        {/* BODY: V148 creates an 8px overlap into the legs at 140, killing the gap */}
        <path
          id="body"
          d="M100 20 C60 20, 45 55, 45 90 V148 H155 V90 C155 55, 140 20, 100 20Z"
          fill="rgba(180, 255, 255, 0.4)"
        />

        {/* EYES */}
        <g opacity={step === 'idle' ? 0 : 1}>
          <ellipse cx="85" cy="85" rx="6" ry="10" fill="#050505"/>
          <ellipse cx="115" cy="85" rx="6" ry="10" fill="#050505"/>
          <circle cx="85" cy="85" r="1.5" fill="red" className="eye-glow" />
          <circle cx="115" cy="85" r="1.5" fill="red" className="eye-glow" />
        </g>

        {/* LEGS: They now listen for lastActiveId to trigger the glitch flicker */}
        <motion.path 
          id="leg-left" 
          d="M45 140 C45 165, 80 165, 80 140"
          animate={lastActiveId === 1 ? activationGlitch : legVariants.active(1)}
        />

        <motion.path 
          id="leg-center" 
          d="M80 140 C80 165, 120 165, 120 140"
          animate={lastActiveId === 3 ? activationGlitch : legVariants.active(2)}
        />

        <motion.path 
          id="leg-right" 
          d="M120 140 C120 165, 155 165, 155 140"
          animate={lastActiveId === 2 ? activationGlitch : legVariants.active(3)}
        />
      </motion.svg>
    </div>
  );
};