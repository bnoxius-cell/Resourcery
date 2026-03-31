import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import AnimatedEye from "../components/AnimatedEye";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState("");  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    // 1. Prevent clicking if the text is currently scrambling!
    if (isAnimating) return;

    if (!password) {
      setShowPassword(!showPassword);
      return;
    }
    setShowPassword(!showPassword);
    setIsAnimating(true);
  };

  // The text scrambling/decoding effect
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4 font-mono text-black">
      {/* Main Container */}
      <div className="w-full max-w-md border-[4px] border-black p-10 bg-white flex flex-col gap-10 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        
        {/* Title */}
        <h1 className="text-center text-xl font-black tracking-widest uppercase">
          Login
        </h1>

        <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div className="relative border-[3px] border-black p-3.5 flex items-center group transition-colors duration-200">
            <input
              type="email"
              placeholder="email"
              className="w-full outline-none bg-transparent placeholder-black font-semibold text-base tracking-wide"
            />
            <Mail className="w-6 h-6 ml-2 text-black transition-colors duration-200" strokeWidth={3} />
          </div>

          {/* Password Input */}
          <div className="relative border-[3px] border-black p-3.5 flex items-center overflow-hidden bg-white">
            <input
              type={isAnimating ? "text" : showPassword ? "text" : "password"}
              value={isAnimating ? displayPassword : password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isAnimating}
              placeholder="password"
              className="w-full outline-none bg-transparent placeholder-black font-semibold font-mono disabled:opacity-100 disabled:text-black"
              spellCheck="false"
            />
            
            {/* The Animated Eye Component */}
            <div className="ml-2 h-6 flex items-center justify-center group-focus-within:text-white transition-colors duration-200">
              <AnimatedEye 
                isVisible={showPassword} 
                onClick={handleToggle} 
              />
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <label className="flex items-center gap-3 cursor-pointer select-none w-max">
            <div className="relative flex items-center justify-center w-5 h-5">
              <input type="checkbox" className="peer sr-only" />
              <div className="w-5 h-5 border-[3px] border-black bg-white flex items-center justify-center transition peer-checked:bg-black">
                <div className="w-2 h-2 bg-white hidden peer-checked:block transition-all"></div>
              </div>
            </div>
            <span className="text-sm font-black uppercase tracking-wider">remember me</span>
          </label>

          {/* Login Button */}
          <button className="mt-4 self-center border-[4px] border-black px-12 py-3 font-black uppercase transition-colors duration-200 hover:bg-black hover:text-white shadow-[4px_4px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none bg-white">
            Login
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm font-bold mt-2 uppercase tracking-tight">
          don't have an account?{" "}
          <a href="#" className="underline font-black hover:opacity-70 transition-opacity">
            register here
          </a>
        </p>
      </div>
    </div>
  );
}