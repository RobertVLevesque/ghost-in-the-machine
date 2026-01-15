import { motion } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const step = useGhostStore((state) => state.step);
  const isRevealed = step === 'revealed';
  const isHovered = step !== 'idle';

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: isRevealed ? 1 : 0.5 }}
    >
      <svg width="300" height="300" viewBox="0 0 100 100" className="animate-circuit-flicker">
        <path 
          d="M50 20 L80 80 L50 70 L20 80 Z" 
          fill="none" 
          stroke="white" 
          strokeWidth="0.5"
          className="opacity-20"
        />
        <motion.circle 
          cx="40" cy="50" r="1" 
          fill="red"
          animate={{ opacity: isHovered ? [0, 1, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        <motion.circle 
          cx="60" cy="50" r="1" 
          fill="red"
          animate={{ opacity: isHovered ? [0, 1, 0] : 0 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </svg>
    </motion.div>
  );
};