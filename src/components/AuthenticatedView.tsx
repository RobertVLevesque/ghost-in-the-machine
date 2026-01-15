import { motion } from 'framer-motion';

export const AuthenticatedView = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#0a0f0a] flex items-center justify-center font-mono text-[#4af626] z-[300]"
      style={{ textShadow: '0 0 8px rgba(74, 246, 38, 0.5)' }}
    >
      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_2px] pointer-events-none" />
      
      <div className="border-2 border-[#4af626]/30 p-12 bg-black/40 backdrop-blur-sm relative">
        {/* Corner Accents */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#4af626]" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#4af626]" />

        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <span className="bg-[#4af626] text-black px-2 py-1 font-bold">LOGIN</span>
            <span className="animate-pulse">admin</span>
          </div>
          
          <div className="flex gap-4 items-center">
            <span className="bg-[#4af626] text-black px-2 py-1 font-bold">PASSWORD</span>
            <span>********</span>
          </div>

          <div className="pt-8 border-t border-[#4af626]/20 mt-8 text-center space-y-2">
            <div className="text-sm tracking-[0.3em] opacity-80">ADMINISTRATION TERMINAL</div>
            <div className="text-[10px] bg-[#4af626]/10 py-1">SESSION ENCRYPTED</div>
          </div>
        </div>
      </div>

      {/* Retro HUD elements */}
      <div className="absolute top-10 left-10 text-[10px] opacity-40">SECURE_LINK: STABLE</div>
      <div className="absolute bottom-10 right-10 text-[10px] opacity-40">VOLTAGE: 1.22V</div>
    </motion.div>
  );
};