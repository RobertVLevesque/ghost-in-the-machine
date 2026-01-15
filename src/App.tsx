import { useEffect, useState } from 'react';
import { useGhostStore } from './store/useGhostStore';
import { GhostEntity } from './components/GhostEntity';
import { TriangleNode } from './components/TriangleNode';
import { Terminal } from './components/Terminal';
import { RLGlyph } from './components/RLGlyph';
import { PulseOverlay } from './components/PulseOverlay';
import { AuthenticatedView } from './components/AuthenticatedView';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const { step, setStep, terminalActive } = useGhostStore();
  const [isGlitching, setIsGlitching] = useState(false);

  // Trigger Glitch when 3/3 nodes found
  useEffect(() => {
    if (step === 'revealed') {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
        setStep('authenticated');
      }, 1500); // 1.5s Glitch duration
    }
  }, [step, setStep]);

  if (step === 'authenticated') return <AuthenticatedView />;

  return (
    <motion.main 
      animate={isGlitching ? { 
        x: [-5, 5, -2, 2, 0], 
        filter: ["invert(1)", "hue-rotate(90deg)", "none"] 
      } : {}}
      className="relative w-full h-screen bg-[#050505] overflow-hidden cursor-crosshair"
    >
      <RLGlyph />
      <GhostEntity />

      <div className="absolute inset-0 z-40 pointer-events-none">
        <AnimatePresence>
          {step !== 'idle' && (
            <>
              <TriangleNode id={1} position="top-40 left-40" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step !== 'searching' && step !== 'scanning'} 
                onClick={() => { if(step === 'searching') setStep('node1') }} />
              
              <TriangleNode id={2} position="top-20 right-40" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'node2' || step === 'revealed'} 
                onClick={() => { if(step === 'node1') setStep('node2') }} />
              
              <TriangleNode id={3} position="bottom-20 right-20" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'revealed'} 
                onClick={() => { if(step === 'node2') setStep('revealed') }} />
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>{terminalActive && <Terminal />}</AnimatePresence>
      <PulseOverlay />
    </motion.main>
  );
}