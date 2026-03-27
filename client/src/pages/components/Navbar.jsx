import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Book, Wand2, Shield, Sparkles } from 'lucide-react';
import logo from '../../assets/bitmap2.svg';

const navItems = [
  { id: 'tomes', label: 'Tomes', icon: Book, color: 'text-fuchsia-400', orb: 'from-fuchsia-600 to-purple-900', shadow: 'shadow-fuchsia-500/80' },
  { id: 'spells', label: 'Spells', icon: Wand2, color: 'text-cyan-400', orb: 'from-cyan-500 to-blue-900', shadow: 'shadow-cyan-500/80' },
  { id: 'armory', label: 'Armory', icon: Shield, color: 'text-amber-400', orb: 'from-orange-500 to-amber-900', shadow: 'shadow-orange-500/80' },
  { id: 'quests', label: 'Quests', icon: Sparkles, color: 'text-emerald-400', orb: 'from-emerald-500 to-teal-900', shadow: 'shadow-emerald-500/80' }
];

export default function Navbar() {
  const [scrollState, setScrollState] = useState('top');
  const [activeItem, setActiveItem] = useState('tomes');

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y < 30) setScrollState('top');
      else if (y >= 30 && y < 150) setScrollState('stuck');
      else setScrollState('shot');
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find active data for dynamic colors
  const activeData = navItems.find(item => item.id === activeItem);

  const navVariants = {
    top: {
      y: 0, opacity: 1, width: "100%",
      backgroundColor: "rgba(15, 23, 42, 0)",
      borderColor: "rgba(139, 92, 246, 0)",
      transition: { duration: 0.3 }
    },
    stuck: { y: -100, opacity: 0, width: "80%", transition: { duration: 0.2 } },
    shot: {
      y: 20, opacity: 1, width: "90%",
      backgroundColor: "rgba(10, 10, 26, 0.9)", // Deep Void Indigo
      borderColor: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 0 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,255,255,0.05)",
      borderRadius: "9999px",
      backdropFilter: "blur(16px)",
      transition: { type: "spring", stiffness: 250, damping: 12 }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none mt-4">
      <motion.nav
        variants={navVariants}
        initial="top"
        animate={scrollState}
        className="flex items-center justify-between px-8 py-2 border-[1px] pointer-events-auto h-20 relative overflow-visible"
      >
        {/* Prismatic Border Effect (only visible when shot) */}
        {scrollState === 'shot' && (
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none shadow-[inset_0_0_15px_rgba(168,85,247,0.2)]" />
        )}

        {/* Logo Section */}
        <div className="flex items-center gap-3 w-48">
          <div className="relative">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-12 h-12 object-contain bg-slate-900 rounded-full border-2 border-white/20 drop-shadow-[0_4px_0_rgba(255,255,255,0.3)]"
            />
          </div>
          <span className="hidden lg:block text-2xl font-black tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]">
            resourcery
          </span>
        </div>

        {/* The Magic Indicator Navigation */}
        <ul className="flex items-center relative h-full gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <li
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className="relative w-20 h-full flex flex-col justify-center items-center cursor-pointer z-10"
              >
                {/* Dynamic Magic Orb - Colors change based on active item */}
                {isActive && (
                  <motion.div
                    layoutId="magic-indicator"
                    className={`absolute -top-6 w-14 h-14 rounded-full border-[6px] border-[#0a0a1a] z-0 bg-gradient-to-br shadow-lg ${activeData.orb} ${activeData.shadow}`}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    {/* Internal Glow Pulse */}
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
                  </motion.div>
                )}

                {/* Icon */}
                <motion.div
                  animate={{ y: isActive ? -28 : 0 }}
                  className={`absolute z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                >
                  <Icon size={24} className={isActive ? 'drop-shadow-md' : ''} />
                </motion.div>

                {/* Elemental Text Label */}
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 16 : 30 }}
                  className={`absolute text-[10px] font-black tracking-[0.2em] uppercase ${item.color}`}
                >
                  {item.label}
                </motion.span>
              </li>
            );
          })}
        </ul>

        {/* CTA Button - Prismatic Gradient */}
        <div className="w-48 flex justify-end">
          <button className="px-6 py-2 bg-white text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95">
            ENTER
          </button>
        </div>
      </motion.nav>
    </div>
  );
}