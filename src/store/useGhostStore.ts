// ... inside create() ...
lastActiveId: null,
triggerNode: (id: number) => {
  set({ lastActiveId: id });
  setTimeout(() => set({ lastActiveId: null }), 600);
},