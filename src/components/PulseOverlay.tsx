import { motion, AnimatePresence } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const PulseOverlay = () => {
  const lastActiveId = useGhostStore((s) => s.lastActiveId);

  // Mapping the IDs to screen locations
  const coordinates: Record<number, { x: string, y: string }> = {
    1: { x: "20%", y: "30%" },  // Matches top-40 left-40
    2: { x: "80%", y: "15%" },  // Matches top-20 right-40
    3: { x: "90%", y: "85%" }   // Matches bottom-20 right-20
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      <AnimatePresence>
        {lastActiveId && (
          <svg className="w-full h-full">
            <motion.line
              x1="50%" y1="50%" // Ghost Center
              x2={coordinates[lastActiveId].x}
              y2={coordinates[lastActiveId].y}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              stroke="red"
              strokeWidth="2"
              strokeDasharray="10,5"
            />
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
};