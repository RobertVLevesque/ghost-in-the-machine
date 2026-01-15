import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';

interface TriangleNodeProps {
  position: string;
  isActive: boolean;
  id: number;
  onClick: () => void;
}

export const TriangleNode = ({ position, isActive, onClick }: TriangleNodeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`absolute ${position} pointer-events-auto`}
    >
      <button 
        onClick={onClick}
        className="group relative p-4 focus:outline-none"
      >
        <Triangle 
          className={`w-8 h-8 transition-all duration-700 ${
            isActive ? 'text-red-600 fill-red-600/20' : 'text-white/20 group-hover:text-white'
          }`}
        />
        {isActive && (
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100vw' }}
            className="absolute top-1/2 left-1/2 h-[1px] bg-red-500/30 -translate-y-1/2 origin-left z-[-1]"
          />
        )}
      </button>
    </motion.div>
  );
};