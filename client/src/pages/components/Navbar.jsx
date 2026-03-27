import React, { useState, useEffect } from 'react';
import logo from '../../assets/bitmap2.svg';
import '../../index.css'

const Navbar = () => {
  // 1. Create a state to track if the user has scrolled down
  const [isScrolled, setIsScrolled] = useState(false);

  // 2. Set up the scroll listener
  useEffect(() => {
    const handleScroll = () => {
      // If the user scrolls down more than 50 pixels, set to true
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the listener when the component unmounts (Important for performance!)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // The empty array means this only runs once when the Navbar loads

  return (
    {/* 3. The Dynamic Tailwind Wrapper */}
    {/* Notice the backticks ` ` instead of quotes so we can inject JavaScript logic */}
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out px-6 ${
        isScrolled 
          ? 'bg-gray-900 shadow-lg py-3 backdrop-blur-md bg-opacity-90' // Scrolled state: Dark background, slight blur, less padding
          : 'bg-transparent py-5' // Top state: Totally transparent, more breathing room
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo and Brand */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img 
            src={logo} 
            alt="Resourcery Logo" 
            className="w-10 h-10 object-contain" 
          />
          <h1 className="text-xl font-bold text-white tracking-wide">
            Resourcery
          </h1>
        </div>

        {/* Right Side: Navigation Items */}
        <div className="flex items-center gap-6 text-white font-medium">
          <a href="#spells" className="hover:text-purple-400 transition-colors">Spells</a>
          <a href="#inventory" className="hover:text-purple-400 transition-colors">Inventory</a>
          
          {/* A glowing call-to-action button */}
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:scale-105 transition-transform shadow-[0_0_10px_rgba(217,70,239,0.4)]">
            Login
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;