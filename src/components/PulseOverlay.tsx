import { motion, AnimatePresence } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const PulseOverlay = () => {
  const lastActiveId = useGhostStore((s) => s.lastActiveId);

  // Mapped start points (Ghost's feet)
  const starts: Record<number, { x: string, y: string }> = {
    1: { x: "44%", y: "60%" }, // Left Foot
    2: { x: "56%", y: "60%" }, // Right Foot
    3: { x: "50%", y: "62%" }  // Center Foot
  };

  const targets: Record<number, { x: string, y: string }> = {
    1: { x: "20%", y: "30%" },
    2: { x: "80%", y: "15%" },
    3: { x: "90%", y: "85%" }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      <AnimatePresence>
        {lastActiveId && (
          <svg className="w-full h-full">
            <motion.line
              x1={starts[lastActiveId].x} y1={starts[lastActiveId].y}
              x2={targets[lastActiveId].x} y2={targets[lastActiveId].y}
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