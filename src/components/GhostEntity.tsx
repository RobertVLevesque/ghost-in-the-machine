import { motion } from 'framer-motion';
import { useGhostStore } from '../store/useGhostStore';

export const GhostEntity = () => {
  const { step, lastActiveId } = useGhostStore();
  const isRevealed = step === 'revealed';
  const isSearching = step !== 'idle' && step !== 'authenticated';

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4">
      <motion.svg 
        className="w-[70vw] max-w-[300px] h-auto"
        viewBox="0 0 200 240"
        initial={{ opacity: 0 }}
        animate={{ opacity: step === 'idle' ? 0.05 : 1 }}
        transition={{ duration: 1 }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* --- BODY --- */}
        <motion.path
          d="M100 20 C60 20, 45 55, 45 90 V140 C45 165, 155 165, 155 140 V90 C155 55, 140 20, 100 20Z"
          fill={lastActiveId ? "rgba(255, 0, 0, 0.4)" : "rgba(180, 255, 255, 0.2)"}
          stroke={lastActiveId ? "red" : "rgba(180, 255, 255, 0.9)"}
          strokeWidth="1"
          animate={lastActiveId ? { scale: 1.02 } : { scale: 1 }}
          filter="url(#glow)"
          className="transition-colors duration-300"
        />

        {/* --- EYES --- */}
        {/* If idle, eyes are dark. If active, eyes glow red. */}
        <ellipse cx="85" cy="85" rx="6" ry="10" fill="#0b1f26" />
        <ellipse cx="115" cy="85" rx="6" ry="10" fill="#0b1f26" />
        
        {isSearching && (
          <g>
            <motion.circle 
              cx="85" cy="85" r="3" fill="red" 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <motion.circle 
              cx="115" cy="85" r="3" fill="red" 
              animate={{ opacity: [0.5, 1, 0.5] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </g>
        )}

        {/* --- LEGS --- */}
        {/* LEFT LEG (Linked to Node 1) */}
        <motion.path
          d="M70 140 C65 165, 65 190, 55 205"
          stroke={lastActiveId === 1 ? "red" : "rgba(160, 255, 255, 0.85)"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={lastActiveId === 1 ? { strokeWidth: 8 } : { strokeWidth: 4 }}
        />
        <circle cx="55" cy="205" r="3" fill={lastActiveId === 1 ? "red" : "rgba(160, 255, 255, 0.9)"} />

        {/* CENTER LEG (Linked to Node 3) */}
        <motion.path
          d="M100 140 C100 170, 100 195, 100 215"
          stroke={lastActiveId === 3 ? "red" : "rgba(160, 255, 255, 0.9)"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={lastActiveId === 3 ? { strokeWidth: 8 } : { strokeWidth: 4 }}
        />
        <circle cx="100" cy="215" r="3" fill={lastActiveId === 3 ? "red" : "rgba(160, 255, 255, 0.9)"} />

        {/* RIGHT LEG (Linked to Node 2) */}
        <motion.path
          d="M130 140 C135 165, 140 185, 150 205"
          stroke={lastActiveId === 2 ? "red" : "rgba(160, 255, 255, 0.8)"}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          animate={lastActiveId === 2 ? { strokeWidth: 8 } : { strokeWidth: 4 }}
        />
        <circle cx="150" cy="205" r="3" fill={lastActiveId === 2 ? "red" : "rgba(160, 255, 255, 0.9)"} />
        
      </motion.svg>
    </div>
  );
};