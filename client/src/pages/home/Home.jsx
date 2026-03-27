// src/pages/Home.jsx
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

// Pixel-perfect particles that move on a grid-like coordinate system
const PixelParticle = ({ x, y, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0], 
      scale: [1, 1.2, 1],
      y: [0, -40, 0] 
    }}
    transition={{ duration: 3, repeat: Infinity, delay }}
    className={`absolute w-2 h-2 ${color} shadow-[2px_2px_0px_rgba(0,0,0,0.5)]`}
    style={{ left: x, top: y }}
  />
);

export default function Home() {
  return (
    <div className="relative min-h-[300vh] bg-[#1a103d] text-white font-mono selection:bg-yellow-400 selection:text-black overflow-hidden">
      
      {/* --- PIXEL ART BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Retro Grid Floor */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />

        {/* Floating Magic Pixel Clusters */}
        <PixelParticle x="15%" y="25%" color="bg-pink-500" delay={0} />
        <PixelParticle x="17%" y="22%" color="bg-purple-400" delay={0.5} />
        <PixelParticle x="80%" y="45%" color="bg-cyan-400" delay={1} />
        <PixelParticle x="82%" y="48%" color="bg-blue-600" delay={1.2} />
        <PixelParticle x="45%" y="70%" color="bg-yellow-400" delay={2} />
      </div>

      <Navbar />

      {/* --- PIXEL HERO SECTION --- */}
      <main className="relative z-10 pt-64 px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* "Magic Effects" Title Style */}
        <div className="relative inline-block mb-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic">
                <span className="relative z-10 text-white drop-shadow-[4px_4px_0px_#701a75]">
                    Magic <span className="text-yellow-400">Pixel</span>
                </span>
                <span className="absolute -bottom-2 -left-2 z-0 text-fuchsia-600 blur-[2px]">Magic Pixel</span>
            </h1>
        </div>

        <p className="text-xl md:text-2xl text-cyan-300 max-w-2xl mb-12 bg-black/40 p-4 border-l-4 border-cyan-500 backdrop-blur-sm">
          [ SYSTEM ] : Explore the enchanted forest of Resourcery. Collect mana and master the arcane arts.
        </p>
        
        {/* Pixel Arrow Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-fuchsia-400"
        >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11 4h2v12h2v-2h2v-2h2v2h-2v2h-2v2h-2v2h-2v-2H9v-2H7v-2H5v-2h2v2h2v2h2V4z" />
            </svg>
        </motion.div>
      </main>

      {/* --- QUEST LOG CARDS --- */}
      <div className="relative z-10 mt-[40vh] max-w-4xl mx-auto px-8 space-y-16 pb-64">
        {[
          { title: "Mushroom Grotto", color: "border-fuchsia-500", bg: "bg-fuchsia-950/50", label: "LVL 5" },
          { title: "Crystal Archive", color: "border-cyan-500", bg: "bg-cyan-950/50", label: "LVL 12" },
          { title: "Shadow Forge", color: "border-yellow-500", bg: "bg-orange-950/50", label: "LVL 20" }
        ].map((quest, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02, x: 10 }}
            className={`relative border-4 ${quest.color} ${quest.bg} p-1 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden group`}
          >
            {/* The "Pixel Bevel" Inner Border */}
            <div className="border-2 border-white/10 p-6 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white/50 mb-2 block tracking-[0.2em]">MISSION {i + 1}</span>
                <h3 className="text-3xl font-bold group-hover:text-yellow-400 transition-colors uppercase italic">{quest.title}</h3>
              </div>
              <div className={`px-4 py-2 border-2 ${quest.color} bg-black font-bold text-xl`}>
                {quest.label}
              </div>
            </div>
            
            {/* Hover Decorative Element */}
            <motion.div 
                className={`absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white/10 to-transparent transform skew-x-12 translate-x-32 group-hover:translate-x-0 transition-transform duration-500`}
            />
          </motion.div>
        ))}
      </div>

    </div>
  );
}