import { useGhostStore } from './store/useGhostStore';
import { GhostEntity } from './components/GhostEntity';
import { TriangleNode } from './components/TriangleNode';
import { Terminal } from './components/Terminal';
import { RLGlyph } from './components/RLGlyph';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const { step, setStep, terminalActive } = useGhostStore();

  return (
    <main className="relative w-full h-screen bg-[#050505] overflow-hidden cursor-crosshair">
      {/* Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
      
      <RLGlyph />
      <GhostEntity />

      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {/* NODE 1: Moved further right and down to clear the RL */}
          {(step === 'glyphHovered' || step.includes('node') || step === 'revealed') && (
            <TriangleNode 
              position="top-40 left-40" 
              isActive={step !== 'glyphHovered'} 
              id={1} 
              onClick={() => setStep('node1')} 
            />
          )}

          {/* NODE 2: Top Right */}
          {(step === 'node1' || step.includes('node2') || step === 'revealed') && (
            <TriangleNode 
              position="top-12 right-12" 
              isActive={step === 'node2' || step === 'node3' || step === 'revealed'} 
              id={2} 
              onClick={() => setStep('node2')} 
            />
          )}

          {/* NODE 3: Bottom Right */}
          {(step === 'node2' || step === 'revealed') && (
            <TriangleNode 
              position="bottom-12 right-12" 
              isActive={step === 'revealed'} 
              id={3} 
              onClick={() => setStep('revealed')} 
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {terminalActive && <Terminal />}
      </AnimatePresence>
    </main>
  );
}