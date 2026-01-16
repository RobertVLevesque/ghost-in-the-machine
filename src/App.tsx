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

  // LOGIC: Transition from "revealed" (3 nodes found) to "authenticated" (green screen)
  useEffect(() => {
    if (step === 'revealed') {
      setIsGlitching(true);
      
      // Wait 1.5 seconds for the glitch effect to play out before switching views
      const timer = setTimeout(() => {
        setIsGlitching(false);
        setStep('authenticated');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [step, setStep]);

  // If we are authenticated, show the green terminal only
  if (step === 'authenticated') {
    return <AuthenticatedView />;
  }

  return (
    <motion.main 
      // This animate block handles the "Screen Glitch" jitter and color inversion
      animate={isGlitching ? { 
        x: [-10, 10, -5, 5, 0], 
        filter: [
          "none", 
          "invert(1) hue-rotate(90deg)", 
          "contrast(2) brightness(2)", 
          "invert(1) hue-rotate(-90deg)", 
          "none"
        ] 
      } : {}}
      transition={isGlitching ? { duration: 0.4, repeat: 7 } : {}}
      className="relative w-full h-[100dvh] bg-[#050505] overflow-hidden cursor-crosshair touch-none"
    >
      {/* Visual Overlay: CRT Scanlines */}
      <div className="pointer-events-none fixed inset-0 z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
      
      {/* Primary Interaction: The RL Glyph */}
      <RLGlyph />

      {/* The Central Entity */}
      <GhostEntity />

      {/* Cipher HUD: Triangle Nodes */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <AnimatePresence>
          {step !== 'idle' && (
            <>
              {/* NODE 1: Top Left Quadrant (Responsive) */}
              <TriangleNode 
                id={1} 
                position="top-[25%] left-[15%] md:top-40 md:left-40" 
                isDiscoveryMode={step === 'scanning'}
                // Logic: Active if found or later in sequence
                isActive={step !== 'searching' && step !== 'scanning'} 
                onClick={() => { if(step === 'searching') setStep('node1') }} 
              />

              {/* NODE 2: Top Right Quadrant (Responsive) */}
              <TriangleNode 
                id={2} 
                position="top-[15%] right-[15%] md:top-20 md:right-40" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'node2' || step === 'revealed'} 
                onClick={() => { if(step === 'node1') setStep('node2') }} 
              />

              {/* NODE 3: Bottom Right Quadrant (Responsive) */}
              <TriangleNode 
                id={3} 
                position="bottom-[20%] right-[15%] md:bottom-20 md:right-20" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'revealed'} 
                onClick={() => { if(step === 'node2') setStep('revealed') }} 
              />
            </>
          )}
        </AnimatePresence>
      </div>

      {/* The Narrator: Terminal */}
      <AnimatePresence>
        {terminalActive && <Terminal />}
      </AnimatePresence>

      {/* The Pulse Connection: Beams shoot from Ghost to Nodes */}
      <PulseOverlay />
    </motion.main>
  );
}