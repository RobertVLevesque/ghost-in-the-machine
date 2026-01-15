import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameStep = 'idle' | 'scanning' | 'searching' | 'node1' | 'node2' | 'revealed';

interface GhostState {
  step: GameStep;
  terminalActive: boolean;
  lastActiveId: number | null; // Track which node just fired
  setStep: (step: GameStep) => void;
  setTerminalActive: (active: boolean) => void;
  triggerNode: (id: number) => void; // Centralized trigger
  reset: () => void;
}

export const useGhostStore = create<GhostState>()(
  persist(
    (set) => ({
      step: 'idle',
      terminalActive: false,
      lastActiveId: null,
      setStep: (step) => set({ step }),
      setTerminalActive: (active) => set({ terminalActive: active }),
      triggerNode: (id) => {
        set({ lastActiveId: id });
        // Auto-reset the pulse after 800ms
        setTimeout(() => set({ lastActiveId: null }), 800);
      },
      reset: () => {
        localStorage.clear();
        window.location.reload();
      },
    }),
    { name: 'ghost-machine-v2' }
  )
);