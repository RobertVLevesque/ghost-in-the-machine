import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Terminal = () => {
  const fullText = "I see you.";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 150); // Speed of typing
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-10 left-10 w-80 p-6 border border-red-900/30 bg-black/90 backdrop-blur-xl font-mono z-[70] shadow-[0_0_30px_rgba(255,0,0,0.1)]"
    >
      {/* Flashing Header */}
      <motion.div 
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 1 }}
        className="text-red-600 font-bold text-xs mb-4 tracking-[0.2em]"
      >
        /** SYSTEM_OVERRIDE **/
      </motion.div>

      {/* Typewriter Body */}
      <div className="text-xl text-white tracking-widest uppercase">
        {displayedText}
        <span className="animate-pulse ml-1 inline-block w-2 h-5 bg-red-600" />
      </div>

      <div className="mt-6 text-[10px] text-white/20 uppercase tracking-widest">
        Trace initiated... <br />
        Locating nodes 1-3...
      </div>
    </motion.div>
  );
};