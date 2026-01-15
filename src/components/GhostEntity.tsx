import { motion } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const { step, lastActiveId } = useGhostStore();
  const isRevealed = step === 'revealed';

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <motion.svg 
        width="450" height="550" viewBox="0 0 100 120"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 'idle' ? 0.05 : 1 }}
      >
        {/* Ghost Body - Pulses Red when any node is active */}
        <motion.path 
          d="M20,40 A30,30 0 0,1 80,40 V70 L85,75 L85,85 L75,75 V70 H25 V75 L15,85 L15,75 L20,70 Z" 
          fill="none" 
          stroke="white" 
          strokeWidth="0.5"
          animate={lastActiveId ? { stroke: "#ff0000", strokeWidth: 1.2, scale: 1.02 } : { stroke: "white", strokeWidth: 0.5, scale: 1 }}
        />
        
        {/* Face */}
        <g className={step === 'idle' ? "opacity-0" : "opacity-100"}>
          <circle cx="38" cy="45" r="5" stroke="white" strokeWidth="0.2" fill="black" />
          <circle cx="62" cy="45" r="5" stroke="white" strokeWidth="0.2" fill="black" />
          <circle cx="38" cy="45" r="1.5" fill="red" className="animate-pulse" />
          <circle cx="62" cy="45" r="1.5" fill="red" className="animate-pulse" />
          <ellipse cx="50" cy="60" rx="4" ry="6" stroke="white" strokeWidth="0.2" fill="black" />
        </g>

        {/* Legs - Light up individually based on lastActiveId */}
        <path d="M35,70 V85 L25,100" stroke={lastActiveId === 1 ? "red" : "white"} strokeWidth="0.5" fill="none" />
        <path d="M50,70 V105" stroke={lastActiveId === 3 ? "red" : "white"} strokeWidth="0.5" fill="none" />
        <path d="M65,70 V85 L75,100" stroke={lastActiveId === 2 ? "red" : "white"} strokeWidth="0.5" fill="none" />
        
        {/* Feet Nodes */}
        <circle cx="25" cy="103" r="2" fill={lastActiveId === 1 ? "red" : "black"} stroke="white" strokeWidth="0.2" />
        <circle cx="50" cy="108" r="2" fill={lastActiveId === 3 ? "red" : "black"} stroke="white" strokeWidth="0.2" />
        <circle cx="75" cy="103" r="2" fill={lastActiveId === 2 ? "red" : "black"} stroke="white" strokeWidth="0.2" />
      </motion.svg>
    </div>
  );
};