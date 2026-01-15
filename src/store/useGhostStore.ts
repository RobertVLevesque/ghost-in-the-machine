import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameStep = 'idle' | 'glyphHovered' | 'node1' | 'node2' | 'node3' | 'revealed';

interface GhostState {
  step: GameStep;
  terminalActive: boolean;
  setStep: (step: GameStep) => void;
  setTerminalActive: (active: boolean) => void;
  reset: () => void;
}

export const useGhostStore = create<GhostState>()(
  persist(
    (set) => ({
      step: 'idle',
      terminalActive: false,
      setStep: (step) => set({ step }),
      setTerminalActive: (active) => set({ terminalActive: active }),
      reset: () => set({ step: 'idle', terminalActive: false }),
    }),
    { name: 'ghost-storage' }
  )
);