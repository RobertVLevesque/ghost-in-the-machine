import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameStep = 'idle' | 'scanning' | 'searching' | 'node1' | 'node2' | 'revealed' | 'authenticated';

interface GhostState {
  step: GameStep;
  terminalActive: boolean;
  lastActiveId: number | null;
  setStep: (step: GameStep) => void;
  setTerminalActive: (active: boolean) => void;
  triggerPulse: (id: number) => void;
  reset: () => void;
}

export const useGhostStore = create<GhostState>()(
  persist(
    (set) => ({
      step: 'idle', // Hardcoded string value
      terminalActive: false,
      lastActiveId: null,
      setStep: (step: GameStep) => set({ step }),
      setTerminalActive: (active: boolean) => set({ terminalActive: active }),
      triggerPulse: (id: number) => {
        set({ lastActiveId: id });
        setTimeout(() => set({ lastActiveId: null }), 1000);
      },
      reset: () => {
        localStorage.clear();
        window.location.reload();
      },
    }),
    { name: 'ghost-machine-final-v3' }
  )
);