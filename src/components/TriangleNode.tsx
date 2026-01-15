import { motion, AnimatePresence } from 'framer-motion';
import { Triangle } from 'lucide-react';
import { useState } from 'react';
import { useGhostStore } from '../store/useGhostStore';

export const TriangleNode = ({ position, isActive, isDiscoveryMode, id, onClick }: any) => {
  const [isPulsing, setIsPulsing] = useState(false);
  const setLastActiveId = useGhostStore(s => s.setLastActiveId);

  const handleClick = () => {
    if (isActive) return;
    setIsPulsing(true);
    setLastActiveId(id);
    onClick();
    
    // Reset the "glow" after a second
    setTimeout(() => {
      setIsPulsing(false);
      setLastActiveId(null);
    }, 1000);
  };

  return (
    <motion.div className={`absolute ${position} pointer-events-auto z-50`}>
      <button onClick={handleClick} className="group relative p-8 outline-none">
        
        {/* The Connection Beam */}
        <AnimatePresence>
          {isPulsing && (
            <motion.div 
              initial={{ opacity: 1, scaleY: 0 }}
              animate={{ opacity: [1, 0], scaleY: 2 }}
              transition={{ duration: 0.8 }}
              // This creates a line that points back toward the center (the ghost)
              className="absolute top-1/2 left-1/2 w-[2px] h-[50vh] bg-gradient-to-t from-red-600 to-transparent origin-top z-[-1]"
              style={{
                transform: `rotate(${id === 1 ? '135deg' : id === 2 ? '-135deg' : '-45deg'}) translateX(-50%)`
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={isDiscoveryMode ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 1] } : { opacity: isActive ? 1 : 0 }}
          transition={isDiscoveryMode ? { duration: 1.5, repeat: 1 } : {}}
        >
          <Triangle className={`w-10 h-10 transition-colors duration-1000 ${isActive ? 'text-red-600 fill-red-600/20' : 'text-white/20'}`} />
          {isActive && (
             <motion.div 
               initial={{ scale: 0 }} 
               animate={{ scale: [1, 2], opacity: 0 }} 
               className="absolute inset-0 border border-red-500 rounded-full" 
             />
          )}
        </motion.div>
      </button>
    </motion.div>
  );
};