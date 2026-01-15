import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Added 'scanning' and 'searching' steps
export type GameStep = 'idle' | 'scanning' | 'searching' | 'node1' | 'node2' | 'revealed';

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
      reset: () => {
        localStorage.clear();
        set({ step: 'idle', terminalActive: false });
        window.location.reload();
      },
    }),
    { name: 'ghost-storage' }
  )
);