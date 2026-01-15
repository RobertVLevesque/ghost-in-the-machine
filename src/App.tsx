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
          {step !== 'idle' && (
            <>
              {/* NODE 1 */}
              <TriangleNode 
                id={1}
                position="top-40 left-40" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'node1' || step === 'node2' || step === 'revealed'} 
                onClick={() => { if(step === 'searching') setStep('node1') }} 
              />

              {/* NODE 2 */}
              <TriangleNode 
                id={2}
                position="top-20 right-40" 
                isDiscoveryMode={step === 'scanning'}
                isActive={step === 'node2' || step === 'revealed'} 
                onClick={() => { if(step === 'node1') setStep('node2') }} 
              />

              {/* NODE 3 */}
              <TriangleNode 
                id={3}
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