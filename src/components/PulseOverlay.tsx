import { motion, AnimatePresence } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const PulseOverlay = () => {
  const lastActiveId = useGhostStore((s) => s.lastActiveId);

  // Screen coordinates for the pulses
  const targets: Record<number, { x: string; y: string }> = {
    1: { x: "20%", y: "25%" }, // Top Left Node
    2: { x: "80%", y: "15%" }, // Top Right Node
    3: { x: "90%", y: "90%" }, // Bottom Right Node
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      <AnimatePresence>
        {lastActiveId && (
          <svg className="w-full h-full">
            <motion.line
              x1="50%" y1="50%" // Ghost Center
              x2={targets[lastActiveId].x} 
              y2={targets[lastActiveId].y}
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: [1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              stroke="#ff0000"
              strokeWidth="2"
              strokeDasharray="10 5"
            />
            <motion.circle
              cx={targets[lastActiveId].x}
              cy={targets[lastActiveId].y}
              initial={{ r: 0, opacity: 1 }}
              animate={{ r: 100, opacity: 0 }}
              transition={{ duration: 0.6 }}
              fill="none"
              stroke="#ff0000"
              strokeWidth="1"
            />
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
};