"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navbar({ themeColor = "#00FF00", isLight = false }: { themeColor?: string, isLight?: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-800 ${
        scrolled 
          ? isLight 
            ? 'bg-white/60 backdrop-blur-md border-b border-black/10 py-4 shadow-lg' 
            : 'bg-black/60 backdrop-blur-md border-b py-4' 
          : 'bg-transparent py-6'
      }`}
      style={{ borderBottomColor: scrolled ? `${themeColor}40` : 'transparent' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center ">
        <div className="flex items-center gap-3 cursor-pointer group">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-110 transition-transform duration-800">
            {/* Placeholder M-Claw SVG */}
            <path d="M4 2L6 22L8 4L10 20L12 6L14 20L16 4L18 22L20 2" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-3xl font-bold tracking-widest uppercase transition-colors duration-800" style={{ color: 'var(--text-primary)', textShadow: isLight ? 'none' : `0 0 10px ${themeColor}80` }}>
            THE FORGE
          </span>
        </div>
        
        <div className={`hidden md:flex gap-8 text-sm font-semibold tracking-wider uppercase transition-colors duration-800 ${isLight ? 'text-gray-600' : 'text-white/80'}`}>
          <a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`} style={{ hover: { color: themeColor } } as any}>Armory</a>
          <a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Lore</a>
          <a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Support</a>
        </div>

        <button 
          className={`relative group overflow-hidden rounded-md text-black px-8 py-2 font-bold text-sm tracking-widest uppercase transition-all duration-800 hover:scale-105 ${isLight ? 'shadow-[0_0_10px_rgba(0,0,0,0.1)]' : ''}`}
          style={{ 
            backgroundColor: themeColor,
            boxShadow: isLight ? `0 4px 15px ${themeColor}60` : `0 0 20px ${themeColor}60`
          }}
        >
          <span className="relative z-10">Unlock Weapon</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </button>
      </div>
    </motion.nav>
  );
}
