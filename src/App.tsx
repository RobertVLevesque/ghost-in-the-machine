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
      <div className="pointer-events-none fixed inset-0 z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
      
      <RLGlyph />
      <GhostEntity />

      <div className="absolute inset-0 z-40 pointer-events-none">
        <AnimatePresence>
          {/* Only show nodes if we have started scanning */}
          {step !== 'idle' && (
            <>
              <TriangleNode 
                position="top-40 left-40" 
                // Visible if scanning OR if already found
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'node1' || step === 'node2' || step === 'revealed'} 
                onClick={() => { if(step === 'searching') setStep('node1') }} 
              />

              <TriangleNode 
                position="top-20 right-40" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'node2' || step === 'revealed'} 
                onClick={() => { if(step === 'node1') setStep('node2') }} 
              />

              <TriangleNode 
                position="bottom-20 right-20" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'revealed'} 
                onClick={() => { if(step === 'node2') setStep('revealed') }} 
              />
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {terminalActive && <Terminal />}
      </AnimatePresence>
    </main>
  );
}