import React from 'react'
import AnimatedBat from '../components/AnimatedBat'

const Home = () => {
  return (
        <div className="hidden lg:block w-1/2 relative bg-[#040906] overflow-hidden">
          {/* Paper Texture */}
          <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"></div>
          
          {/* Chem-tech Desk Lamp Glow shining down from the top left */}
          <div className="absolute top-[-20%] left-[10%] w-[150%] h-[120%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-emerald-900/10 to-transparent blur-3xl transform -rotate-12 pointer-events-none"></div>
          
          {/* Volatile Magic Dust in the air */}
          <div className="absolute top-[40%] left-[30%] w-1.5 h-1.5 bg-emerald-300 rounded-full blur-[1px] animate-pulse shadow-[0_0_10px_rgba(110,231,183,1)]"></div>
          <div className="absolute top-[55%] left-[45%] w-1 h-1 bg-purple-400 rounded-full blur-[1px] animate-ping shadow-[0_0_10px_rgba(168,85,247,1)]" style={{ animationDuration: '3s' }}></div>
          
          {/* THE MELT: Seamless transition to the login form */}
          <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-r from-transparent to-[#09090B] z-10"></div>
          
          {/* Atmospheric Label */}
          <div className="absolute bottom-12 left-12 z-20">
             <h3 className="text-emerald-500 font-black tracking-widest uppercase text-xs drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]">Restricted Archives</h3>
             <div className="w-12 h-1 mt-2 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
          </div>
        </div>
  )
}

export default Home
