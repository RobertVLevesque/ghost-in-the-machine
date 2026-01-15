import { motion } from 'framer-motion';

export const Terminal = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-10 left-10 w-64 p-4 border border-white/10 bg-black/80 backdrop-blur-md font-mono text-[10px] text-red-500 z-[70]"
    >
      <div className="mb-2 opacity-50">/** SYSTEM_OVERRIDE **/</div>
      <div className="animate-pulse">I see you.</div>
      <div className="mt-4 text-white/40 italic">Searching for nodes...</div>
    </motion.div>
  );
};