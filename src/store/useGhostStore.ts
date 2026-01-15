// Add this to your GhostState interface:
lastActiveId: number | null;
setLastActiveId: (id: number | null) => void;

// Add this to the create function:
lastActiveId: null,
setLastActiveId: (id) => set({ lastActiveId: id }),