import { motion } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const { step, lastActiveId } = useGhostStore();
  const isRevealed = step === 'revealed';
  const isHovered = step !== 'idle';

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isRevealed ? 1 : 0.2 }}
    >
      <svg width="400" height="500" viewBox="0 0 100 120">
        {/* Main Body - This now pulses red/white when a node is clicked */}
        <motion.path 
          d="M20,40 A30,30 0 0,1 80,40 V70 L85,75 L85,85 L75,75 V70 H25 V75 L15,85 L15,75 L20,70 Z" 
          fill="none" 
          stroke={lastActiveId ? "#ff0000" : "white"} 
          strokeWidth="0.5"
          animate={lastActiveId ? { strokeDashoffset: [0, -20], strokeWidth: [0.5, 1, 0.5] } : {}}
          transition={{ duration: 0.5 }}
          style={{ strokeDasharray: "4 2" }}
        />
        
        {/* Facial Orifices */}
        <circle cx="38" cy="45" r="5" stroke="white" strokeWidth="0.2" fill="black" />
        <circle cx="62" cy="45" r="5" stroke="white" strokeWidth="0.2" fill="black" />
        <ellipse cx="50" cy="60" rx="4" ry="6" stroke="white" strokeWidth="0.2" fill="black" />

        {/* Circuit Legs with mapped Circles */}
        {/* Left Leg (Maps to Triangle 1) */}
        <path d="M35,70 V85 L25,100" stroke="white" strokeWidth="0.5" fill="none" className={lastActiveId === 1 ? "stroke-red-500" : ""} />
        <motion.circle 
          cx="25" cy="103" r="2" fill="black" stroke={lastActiveId === 1 ? "red" : "white"} strokeWidth="0.5" 
          animate={lastActiveId === 1 ? { r: [2, 4, 2], fill: ["#000", "#f00", "#000"] } : {}}
        />
        
        {/* Center Leg (Maps to Triangle 3) */}
        <path d="M50,70 V105" stroke="white" strokeWidth="0.5" fill="none" className={lastActiveId === 3 ? "stroke-red-500" : ""} />
        <motion.circle 
          cx="50" cy="108" r="2" fill="black" stroke={lastActiveId === 3 ? "red" : "white"} strokeWidth="0.5" 
          animate={lastActiveId === 3 ? { r: [2, 4, 2], fill: ["#000", "#f00", "#000"] } : {}}
        />

        {/* Right Leg (Maps to Triangle 2) */}
        <path d="M65,70 V85 L75,100" stroke="white" strokeWidth="0.5" fill="none" className={lastActiveId === 2 ? "stroke-red-500" : ""} />
        <motion.circle 
          cx="75" cy="103" r="2" fill="black" stroke={lastActiveId === 2 ? "red" : "white"} strokeWidth="0.5" 
          animate={lastActiveId === 2 ? { r: [2, 4, 2], fill: ["#000", "#f00", "#000"] } : {}}
        />

        {/* Eyes */}
        {isHovered && (
          <g>
            <circle cx="38" cy="45" r="1.5" fill="red" className="animate-pulse" />
            <circle cx="62" cy="45" r="1.5" fill="red" className="animate-pulse" />
          </g>
        )}
      </svg>
    </motion.div>
  );
};