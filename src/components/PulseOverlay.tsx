import { motion, AnimatePresence } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const PulseOverlay = () => {
  // Explicitly typing the state 's'
  const lastActiveId = useGhostStore((s) => s.lastActiveId);

  const starts: Record<number, { x: string, y: string }> = {
    1: { x: "44%", y: "58%" }, // Matches Left Foot Circle
    2: { x: "56%", y: "58%" }, // Matches Right Foot Circle
    3: { x: "50%", y: "61%" }  // Matches Center Foot Circle
  };

const targets: Record<number, { x: string, y: string }> = {
  1: { x: "15%", y: "25%" }, // Adjusted for top-[20%] left-[10%]
  2: { x: "85%", y: "15%" }, // Adjusted for top-[10%] right-[10%]
  3: { x: "85%", y: "85%" }  // Adjusted for bottom-[15%] right-[10%]
};

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      <AnimatePresence>
        {lastActiveId && targets[lastActiveId] && (
          <svg className="w-full h-full">
            <motion.line
              x1={starts[lastActiveId].x} 
              y1={starts[lastActiveId].y}
              x2={targets[lastActiveId].x} 
              y2={targets[lastActiveId].y}
              initial={{ pathLength: 0, opacity: 1 }}
              animate={{ pathLength: 1, opacity: [1, 1, 0] }}
              transition={{ duration: 0.5 }}
              stroke="#ff0000"
              strokeWidth="2"
            />
          </svg>
        )}
      </AnimatePresence>
    </div>
  );
};