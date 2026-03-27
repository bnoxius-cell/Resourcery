import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      
      {/* VIBRANT RPG Background Glows (Competing Colors) */}
      {/* Intense Amethyst Glow */}
      <div className="absolute top-[15%] left-[10%] w-[600px] h-[600px] bg-fuchsia-600/40 rounded-full blur-[140px] pointer-events-none"></div>
      {/* Intense Cyan Frost Glow */}
      <div className="absolute bottom-[20%] right-[10%] w-[700px] h-[700px] bg-cyan-600/30 rounded-full blur-[160px] pointer-events-none"></div>
      {/* Warm Gold Glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[110px] pointer-events-none"></div>

      <Navbar />

      {/* Login Form Container (Polished Tome with depth) */}
      <div className="flex-1 flex items-center justify-center p-6 z-10 mt-16">
        <div className="w-full max-w-md 
          bg-slate-900/70 backdrop-blur-2xl 
          border-2 border-fuchsia-700/60 shadow-[0_20px_100px_rgba(0,0,0,0.9)] // massive shadow
          rounded-2xl p-9 group"
        >
          {/* Header (Multi-Color Gradient) */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text 
              bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 // vibrant text
              tracking-tight mb-2"
            >
              Unlock the Vault
            </h2>
            <p className="text-slate-400 text-sm tracking-wide">Enter your secret words to access the Sanctuary</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-slate-300 text-xs uppercase font-bold mb-2.5 tracking-widest">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-black/40 border border-slate-700/50 rounded-lg px-4.5 py-3.5 text-white text-lg 
                  focus:outline-none focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
                placeholder="mage@resourcery.com"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-xs uppercase font-bold mb-2.5 tracking-widest">Secret Word</label>
              <input 
                type="password" 
                className="w-full bg-black/40 border border-slate-700/50 rounded-lg px-4.5 py-3.5 text-white text-lg
                  focus:outline-none focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
                placeholder="••••••••"
              />
            </div>

            {/* ARCANE-GOLD Gilded Button (Massive Glow/Depth) */}
            <button 
              type="button"
              onClick={() => navigate('/home')}
              className="w-full mt-8 px-10 py-4.5 rounded-lg font-bold text-white tracking-widest uppercase text-base
                bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500 // 3 colors now
                border-2 border-white/20 
                shadow-[0_0_20px_rgba(217,70,239,0.7)] hover:shadow-[0_0_40px_rgba(34,211,238,0.9)] // multi-color glow
                hover:scale-[1.03] hover:border-amber-400/50 transition-all duration-300 ease-in-out"
            >
              Cast Spell
            </button>
          </form>

          {/* Google Login Section (Richer definition) */}
          <div className="mt-9 flex items-center justify-center gap-3">
            <div className="h-px w-full bg-slate-700"></div>
            <span className="text-slate-500 text-xs uppercase tracking-widest font-black">or</span>
            <div className="h-px w-full bg-slate-700"></div>
          </div>

          <button className="w-full mt-7 px-8 py-3 rounded-lg font-bold text-slate-200 
            bg-slate-800/60 border border-slate-600 
            hover:bg-slate-700/80 hover:border-amber-400/50 hover:text-white // added gold hover
            transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default Login;