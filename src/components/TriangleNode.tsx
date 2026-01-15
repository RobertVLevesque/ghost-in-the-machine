import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';

interface Props { position: string; isActive: boolean; isDiscoveryMode: boolean; id: number; onClick: () => void; }

export const TriangleNode = ({ position, isActive, isDiscoveryMode, onClick }: Props) => {
  return (
    <motion.div className={`absolute ${position} pointer-events-auto z-50`}>
      <button onClick={onClick} className="group relative p-8 outline-none">
        <motion.div
          animate={isDiscoveryMode ? { 
            opacity: [0, 1, 0, 0.8, 0], 
            scale: [0.8, 1.1, 1] 
          } : { 
            opacity: isActive ? 1 : 0 // Invisible unless activated
          }}
          transition={isDiscoveryMode ? { duration: 1.5, repeat: 1 } : { duration: 0.5 }}
        >
          <Triangle className={`w-8 h-8 ${isActive ? 'text-red-600 fill-red-600/20' : 'text-white/40'}`} />
        </motion.div>
        
        {/* Only show the hover ghosting when the user is searching */}
        {!isActive && !isDiscoveryMode && (
           <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-red-500 rounded-full" />
        )}
      </button>
    </motion.div>
  );
};