export default function App() {
  const { terminalActive } = useGhostStore();
  return (
    <main className="relative w-full h-screen bg-[#050505] overflow-hidden cursor-crosshair">
      <RLGlyph />
      <GhostEntity />
      <div className="absolute inset-0 z-40 pointer-events-none">
        {/* TriangleNodes here... */}
      </div>
      <AnimatePresence>{terminalActive && <Terminal />}</AnimatePresence>
      <PulseOverlay /> {/* ADDED THIS */}
    </main>
  );
}