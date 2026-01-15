import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGhostStore } from '../store/useGhostStore';

export const Terminal = () => {
  const setStep = useGhostStore(s => s.setStep);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  useEffect(() => {
    const t1 = "I SEE YOU.";
    const t2 = "TRACE INITIATED...";
    const t3 = "LOCATING NODES 1-3...";

    // Typewriter Sequence
    let i = 0;
    const interval = setInterval(() => {
      if (i <= t1.length) {
        setLine1(t1.slice(0, i));
      } else if (i <= t1.length + t2.length) {
        setLine2(t2.slice(0, i - t1.length));
      } else if (i <= t1.length + t2.length + t3.length) {
        setLine3(t3.slice(0, i - t1.length - t2.length));
      } else {
        clearInterval(interval);
        // Script finished: Start the search!
        setTimeout(() => setStep('searching'), 1000);
      }
      i++;
    }, 80);

    return () => clearInterval(interval);
  }, [setStep]);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-10 left-10 w-80 p-6 border border-red-900/30 bg-black/95 font-mono z-[70]"
    >
      <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.2 }} className="text-red-600 font-bold text-xs mb-4 tracking-widest">
        /** SYSTEM_OVERRIDE **/
      </motion.div>

      <div className="space-y-2 uppercase tracking-[0.2em] text-sm">
        <div className="text-white">{line1}</div>
        <div className="text-white/60">{line2}</div>
        <div className="text-red-500/80">{line3}</div>
      </div>
    </motion.div>
  );
};