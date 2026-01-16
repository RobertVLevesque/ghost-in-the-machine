import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const { step } = useGhostStore();
  
  // We use this local state to manage the CSS classes
  const [activeClasses, setActiveClasses] = useState<string[]>([]);

  // THIS IS THE REACT VERSION OF YOUR JS SNIPPET
  useEffect(() => {
    if (step === 'node1') {
      setActiveClasses(['node-1']);
    } 
    else if (step === 'node2') {
      setActiveClasses(['node-1', 'node-2']);
    } 
    else if (step === 'revealed') {
      setActiveClasses(['node-1', 'node-2']);
      // Your requested 350ms delay for the analytic feel
      const timer = setTimeout(() => {
        setActiveClasses(['node-1', 'node-2', 'node-3']);
      }, 350);
      return () => clearTimeout(timer);
    }
    else if (step === 'idle') {
      setActiveClasses([]);
    }
  }, [step]);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <motion.svg 
        id="ghost"
        // This dynamically joins your classes (e.g., "ghost node-1 node-2")
        className={`ghost w-[70vw] max-w-[280px] h-auto transition-all duration-1000 ${activeClasses.join(' ')}`}
        viewBox="0 0 200 220"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 'idle' ? 0.05 : 1 }}
      >
        {/* Rounded Spectral Head */}
        <path
          id="body"
          className="ghost-main-body"
          d="M100 20 C60 20, 45 55, 45 90 V140 H155 V90 C155 55, 140 20, 100 20Z"
          fill="rgba(180, 255, 255, 0.4)"
        />

        {/* The Eyes */}
        <g opacity={step === 'idle' ? 0 : 1}>
          <ellipse cx="85" cy="85" rx="6" ry="10" fill="#050505"/>
          <ellipse cx="115" cy="85" rx="6" ry="10" fill="#050505"/>
          <circle cx="85" cy="85" r="1.5" fill="red" className="animate-pulse" />
          <circle cx="115" cy="85" r="1.5" fill="red" className="animate-pulse" />
        </g>

        {/* The Legs - IDs match your CSS selectors exactly */}
        <path id="leg-left" className="leg"
          d="M45 140 C45 165, 80 165, 80 140"
          fill="rgba(180, 255, 255, 0.4)"
        />

        <path id="leg-center" className="leg"
          d="M80 140 C80 165, 120 165, 120 140"
          fill="rgba(180, 255, 255, 0.4)"
        />

        <path id="leg-right" className="leg"
          d="M120 140 C120 165, 155 165, 155 140"
          fill="rgba(180, 255, 255, 0.4)"
        />
      </motion.svg>
    </div>
  );
};