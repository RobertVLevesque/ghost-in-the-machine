import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { useGhostStore } from '../store/useGhostStore';

export const TriangleNode = ({ position, isActive, isDiscoveryMode, id, onClick }: any) => {
  const { playBlip, playSurge } = useSound();
  const { lastActiveId, triggerNode } = useGhostStore();

  const handleClick = () => {
    if (isActive) return;
    playSurge();
    triggerNode(id);
    onClick();
  };

  return (
    <motion.div className={`absolute ${position} pointer-events-auto z-50`}>
      <button onClick={handleClick} className="group relative p-10 border-none bg-transparent cursor-pointer outline-none">
        
        {/* THE BEAM: An SVG line that points to the Ghost (center of screen) */}
        {lastActiveId === id && (
          <svg className="fixed inset-0 w-full h-full pointer-events-none z-[-1]">
             <motion.line 
               x1="50%" y1="50%" // Ghost Center
               x2="50%" y2="50%" // Start at center
               animate={{ 
                 // Use specific coordinates based on position string or simpler:
                 x2: id === 1 ? "15%" : id === 2 ? "85%" : "85%",
                 y2: id === 1 ? "30%" : id === 2 ? "15%" : "85%",
                 opacity: [0, 1, 0]
               }}
               stroke="red"
               strokeWidth="2"
               strokeDasharray="5,5"
             />
          </svg>
        )}

        <motion.div
          animate={isDiscoveryMode ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] } : { opacity: isActive ? 1 : 0 }}
          transition={isDiscoveryMode ? { duration: 1.5, repeat: Infinity } : {}}
        >
          <Triangle className={`w-12 h-12 ${isActive ? 'text-red-600 fill-red-600/20' : 'text-white/20'}`} />
        </motion.div>
      </button>
    </motion.div>
  );
};