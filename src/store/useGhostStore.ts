import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type GameStep = 'idle' | 'scanning' | 'searching' | 'node1' | 'node2' | 'revealed';

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
      step: 'idle',
      terminalActive: false,
      lastActiveId: null,
      setStep: (step) => set({ step }),
      setTerminalActive: (active) => set({ terminalActive: active }),
      triggerPulse: (id) => {
        set({ lastActiveId: id });
        // Pulse lasts 1 second
        setTimeout(() => set({ lastActiveId: null }), 1000);
      },
      reset: () => {
        localStorage.clear();
        window.location.reload();
      },
    }),
    { name: 'ghost-machine-final' }
  )
);