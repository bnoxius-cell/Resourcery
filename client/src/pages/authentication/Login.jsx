import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import AnimatedEye from '../components/AnimatedEye';

export default function Login() {
  const navigate = useNavigate();
  
  // --- Scramble Animation State ---
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");  
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // --- Scramble Toggle Logic ---
  const handleToggle = () => {
    if (isAnimating) return; // Prevent clicking while scrambling

    if (!password) {
      setShowPassword(!showPassword);
      return;
    }
    setShowPassword(!showPassword);
    setIsAnimating(true);
  };

  // --- Scramble Decoding Effect ---
  useEffect(() => {
    if (!isAnimating) return;

    let iteration = 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const maxIterations = password.length;

    const interval = setInterval(() => {
      setDisplayPassword(() => {
        return password
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return showPassword ? char : "•";
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setIsAnimating(false);
      }
      
      iteration += 1 / 2; 
    }, 15);

    return () => clearInterval(interval);
  }, [isAnimating, showPassword, password]);

  return (
    <div className="min-h-screen w-full flex overflow-hidden font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* =========================================
          LEFT COLUMN: Piltover (The Vision)
          ========================================= */}
      <div className="hidden lg:block w-1/2 relative bg-[#0a0604] overflow-hidden">
          {/* Gritty Texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          
          {/* Main Tavern Window Glow */}
          <div className="absolute top-[30%] left-[-10%] w-[120%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/40 via-orange-900/10 to-transparent blur-2xl pointer-events-none"></div>
          
          {/* Subtle Rain / Slats simulation */}
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_4px,rgba(0,0,0,0.3)_4px,rgba(0,0,0,0.3)_6px)] z-0 pointer-events-none"></div>
          
          {/* THE MELT: Seamless transition to the login form */}
          <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-r from-transparent to-[#09090B] z-10"></div>
          
          {/* Atmospheric Label */}
          <div className="absolute bottom-12 left-12 z-20">
             <h3 className="text-amber-500 font-black tracking-widest uppercase text-xs drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">The Arcane Archives</h3>
             <div className="w-12 h-1 mt-2 bg-gradient-to-r from-amber-500 to-transparent rounded-full"></div>
          </div>
        </div>

      {/* =========================================
          RIGHT COLUMN: Zaun (The Reality)
          ========================================= */}
      <div className="w-full lg:w-1/2 bg-[#09090B] flex items-center justify-center relative p-6 lg:p-12 z-20">
        
        <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md bg-[#121214]/80 backdrop-blur-xl border-2 border-slate-800/80 rounded-sm p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
          
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-slate-600"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-slate-600"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-slate-600"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-slate-600"></div>

          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Login</h2>
            <p className="text-slate-400 text-sm">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Field */}
            <div className="relative group/input">
              <input 
                type="email" 
                className="w-full bg-[#09090B] border border-slate-700/80 rounded-sm px-4 py-4 text-white text-base focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 transition-all duration-300 placeholder:text-white/60 font-medium pr-12"
                placeholder="Email"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-emerald-400 transition-colors pointer-events-none">
                <Mail size={20} />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="relative group/input">
                <input 
                  type={isAnimating ? "text" : showPassword ? "text" : "password"}
                  value={isAnimating ? displayPassword : password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isAnimating}
                  spellCheck="false"
                  className="w-full bg-[#09090B] border border-slate-700/80 rounded-sm px-4 py-4 text-white text-base focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/50 transition-all duration-300 placeholder:text-white/60 font-medium font-mono pr-12 disabled:opacity-100 disabled:text-emerald-400"
                  placeholder="Password"
                />
                
                {/* The Custom GSAP Eye & Toggle */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within/input:text-purple-400 transition-colors duration-300 z-10 cursor-pointer">
                  <AnimatedEye 
                    isVisible={showPassword} 
                    onClick={handleToggle} 
                  />
                  
                  {/* Volatile Zaunite Sparks */}
                  <div className="absolute -inset-3 opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-300 pointer-events-none">
                     <span className="absolute top-1 right-[-4px] w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_rgba(52,211,153,1)] animate-ping"></span>
                     <span className="absolute bottom-0 left-[-2px] w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,1)] animate-pulse"></span>
                     <span className="absolute top-[-2px] left-2 w-1 h-1 bg-emerald-300 rounded-full shadow-[0_0_5px_rgba(110,231,183,1)] animate-bounce"></span>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="mt-5 flex items-center justify-between">
                
                {/* Custom Zaunite Checkbox */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5">
                    
                    {/* 1. The Hidden Native Checkbox */}
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    
                    {/* 2. The Mechanical Box */}
                    <div className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center transition-all duration-35 ${
                      rememberMe 
                        ? 'border-emerald-500 bg-emerald-900/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
                        : 'border-slate-700 bg-black/50 shadow-none'
                    }`}>
                       {/* 3. The Sharp Checkmark */}
                       <svg 
                         className={`w-3.5 h-3.5 text-emerald-400 transition-all duration-35 transform ${
                           rememberMe ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                         }`} 
                         fill="none" 
                         viewBox="0 0 24 24" 
                         stroke="currentColor" 
                         strokeWidth="3"
                       >
                         <path strokeLinecap="square" strokeLinejoin="miter" d="M4 12l5 5L20 6" />
                       </svg>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors tracking-wide select-none">
                    Remember me
                  </span>
                </label>

                {/* Forgot Password Link */}
                <a href="#" className="text-xs font-bold text-slate-500 hover:text-amber-400 transition-all tracking-wide">
                  Forgot password?
                </a>
              </div>
            </div>
            {/* Zaunite Submit Button */}
            <button 
              type="button"
              onClick={() => navigate('/home')}
              className="w-full mt-4 px-6 py-4 rounded-sm font-black text-[#09090B] tracking-widest uppercase text-sm
                bg-gradient-to-r from-emerald-500 via-emerald-400 to-purple-500 
                hover:to-purple-400 hover:from-emerald-400
                shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] 
                transition-all duration-300 ease-out"
            >
              Login
            </button>
          </form>

          {/* Industrial Divider */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-[1px] flex-1 bg-slate-800"></div>
            <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">or</span>
            <div className="h-[1px] flex-1 bg-slate-800"></div>
          </div>

          {/* Google Auth */}
          <button className="w-full mt-8 px-6 py-4 rounded-sm font-bold text-slate-300 
            bg-[#1A1A1E] border border-slate-700/50 
            hover:bg-[#27272A] hover:text-white hover:border-slate-500 
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
          
          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <a href="#" className="text-purple-400 hover:text-emerald-400 font-bold transition-colors">
              Register
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}