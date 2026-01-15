import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { useGhostStore } from '../store/useGhostStore';

export const TriangleNode = ({ position, isActive, isDiscoveryMode, id, onClick }: any) => {
  const { playSound } = useSound();
  const setLastActiveId = useGhostStore(s => s.setLastActiveId);

  const handleClick = () => {
    if (isActive) return;
    playSound('surge');
    setLastActiveId(id);
    onClick();
    setTimeout(() => setLastActiveId(null), 800);
  };

  return (
    <motion.div className={`absolute ${position} pointer-events-auto z-50`}>
      <button onClick={handleClick} className="group relative p-8 outline-none border-none bg-transparent cursor-pointer">
        <motion.div
          animate={isDiscoveryMode ? { opacity: [0, 1, 0], scale: [0.8, 1.2, 1] } : { opacity: isActive ? 1 : 0 }}
          transition={isDiscoveryMode ? { duration: 1.5, repeat: Infinity } : {}}
        >
          <Triangle className={`w-12 h-12 transition-all duration-1000 ${isActive ? 'text-red-600 fill-red-600/40 shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'text-white/20'}`} />
        </motion.div>

        {/* Active Pulse Beam (Points toward Ghost in center) */}
        {isActive && (
          <motion.div 
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: '40vh', opacity: 0 }}
            className="absolute top-1/2 left-1/2 w-[1px] bg-red-500 origin-top z-[-1]"
            style={{ transform: `rotate(${id === 1 ? '135deg' : id === 2 ? '-135deg' : '180deg'}) translateX(-50%)` }}
          />
        )}
      </button>
    </motion.div>
  );
};