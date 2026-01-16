import { motion } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const { step, lastActiveId } = useGhostStore();

  // Map the internal state to a CSS class for the animations
  const stepClass = `step-${step}`;

  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 ghost-container ${stepClass}`}>
      <motion.svg 
        width="200" height="220" viewBox="0 0 200 220"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 'idle' ? 0.05 : 1 }}
        className="ghost"
      >
        {/* Main Rounded Head/Body */}
        <path
          className="ghost-main-body transition-all duration-1000"
          d="M100 20 C60 20, 45 55, 45 90 V140 H155 V90 C155 55, 140 20, 100 20Z"
          fill={lastActiveId ? "rgba(255, 0, 0, 0.4)" : "rgba(180, 255, 255, 0.4)"}
        />

        {/* Eyes - Now Ovals based on your reference */}
        <g className={step === 'idle' ? "opacity-0" : "opacity-100"}>
          <ellipse cx="85" cy="85" rx="6" ry="10" fill="#050505"/>
          <ellipse cx="115" cy="85" rx="6" ry="10" fill="#050505"/>
          {/* Glowing Pupils */}
          <circle cx="85" cy="85" r="2" fill="red" className="animate-pulse" />
          <circle cx="115" cy="85" r="2" fill="red" className="animate-pulse" />
        </g>

        {/* Bottom Waves (The "Legs") */}
        {/* Each segment is a distinct path to allow the CSS translateY to work */}
        
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