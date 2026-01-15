import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { useGhostStore } from '../store/useGhostStore';

export const TriangleNode = ({ position, isActive, isDiscoveryMode, id, onClick }: any) => {
  const { playSurge } = useSound();
  const triggerPulse = useGhostStore(s => s.triggerPulse);

  const handleClick = () => {
    if (isActive || isDiscoveryMode) return;
    playSurge();      // Sound
    triggerPulse(id); // Animation
    onClick();        // State
  };

  return (
    <motion.div className={`absolute ${position} pointer-events-auto z-50`}>
      <button onClick={handleClick} className="group relative p-8 bg-transparent border-none outline-none cursor-pointer">
        <motion.div
          animate={isDiscoveryMode ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] } : { opacity: isActive ? 1 : 0 }}
          transition={isDiscoveryMode ? { duration: 1.5, repeat: Infinity } : {}}
        >
          <Triangle className={`w-12 h-12 ${isActive ? 'text-red-600 fill-red-600/20' : 'text-white/10'}`} />
        </motion.div>
      </button>
    </motion.div>
  );
};