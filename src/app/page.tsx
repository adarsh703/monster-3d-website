"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weapons } from '@/data/weapons';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SequenceScroll from '@/components/SequenceScroll';

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Scroll Reset and Theme Management on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Update CSS variables based on weapon
    const weapon = weapons[currentIndex];
    const root = document.documentElement;
    root.style.setProperty('--weapon-gradient', weapon.gradient);
    root.style.setProperty('--weapon-color', weapon.themeColor);
    
    if (weapon.themeMode === 'light') {
      root.style.setProperty('--bg-color', '#e0f7fa'); // Bluish light vibe
      root.style.setProperty('--text-primary', '#0f172a'); // Dark slate text
      root.style.setProperty('--selection-bg', weapon.themeColor);
      root.style.setProperty('--selection-color', '#ffffff');
    } else {
      root.style.setProperty('--bg-color', '#050505'); // Pitch black
      root.style.setProperty('--text-primary', '#ffffff'); // White text
      root.style.setProperty('--selection-bg', weapon.themeColor);
      root.style.setProperty('--selection-color', '#000000');
    }
  }, [currentIndex]);

  const weapon = weapons[currentIndex];
  const isLight = weapon.themeMode === 'light';

  return (
    <main className="min-h-screen bg-transparent  overflow-x-hidden">
      <Navbar themeColor={weapon.themeColor} isLight={isLight} />

      {/* 3D Cinematic Scroll Experience - OUTSIDE AnimatePresence so it's not trapped in a CSS containing block */}
      <SequenceScroll weapon={weapon} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full relative"
        >
          {/* Weapon Details Section */}
          <section className="py-40 px-6 max-w-screen-2xl mx-auto relative z-10 mt-[20vh] min-h-screen flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 lg:gap-20"
            >
              {/* Left Column: Title & Description */}
              <div className={`lg:col-span-7 flex flex-col justify-center backdrop-blur-lg p-6 md:p-10 rounded-2xl border transition-colors duration-800 ${isLight ? 'bg-white/40 border-black/10 shadow-2xl' : 'bg-black/50 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]'}`}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-[2px] w-12" style={{ backgroundColor: weapon.themeColor }}></div>
                  <span className={`uppercase tracking-[0.3em] text-sm font-bold drop-shadow-lg ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>Classified Intel</span>
                </div>
                <h3 
                  className="text-4xl sm:text-5xl md:text-8xl font-bold mb-10 uppercase tracking-tighter leading-none transition-colors duration-800"
                  style={{ color: 'var(--text-primary)', textShadow: isLight ? 'none' : '0 4px 20px rgba(0,0,0,0.8)' }}
                >
                  {weapon.detailsSection.title}
                </h3>
                <p className="text-2xl leading-relaxed max-w-2xl font-semibold tracking-wide drop-shadow-xl transition-colors duration-800" style={{ color: 'var(--text-primary)', textShadow: isLight ? 'none' : '0 2px 10px rgba(0,0,0,0.9)' }}>
                  {weapon.detailsSection.description}
                </p>
                
                <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-10 transition-colors duration-800 ${isLight ? 'border-black/10' : 'border-white/20'}`}>
                  {weapon.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span 
                        className="text-3xl md:text-5xl font-bold mb-2 tracking-tighter drop-shadow-lg" 
                        style={{ color: weapon.themeColor }}
                      >
                        {stat.val}
                      </span>
                      <span className={`text-sm uppercase tracking-widest font-bold drop-shadow-md ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right Column: Forge Details & Tags */}
              <div className="lg:col-span-5 flex flex-col justify-center gap-12">
                <div className={`backdrop-blur-2xl p-6 md:p-10 lg:p-14 border-l-4 relative overflow-hidden shadow-2xl transition-colors duration-800 ${isLight ? 'bg-white/50' : 'bg-black/60'}`} style={{ borderLeftColor: weapon.themeColor }}>
                  {/* Subtle corner accent */}
                  <div className={`absolute top-0 right-0 w-16 h-16 border-t border-r ${isLight ? 'border-black/10' : 'border-white/10'}`} />
                  
                  <h4 className="text-3xl font-bold mb-6 uppercase tracking-wider drop-shadow-md transition-colors duration-800" style={{ color: 'var(--text-primary)' }}>
                    {weapon.forgeSection.title}
                  </h4>
                  <p className={`text-lg leading-relaxed font-semibold drop-shadow-md ${isLight ? 'text-gray-800' : 'text-gray-200'}`}>
                    {weapon.forgeSection.description}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {weapon.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className={`px-6 py-3 backdrop-blur-md text-sm font-bold uppercase tracking-widest border transition-colors cursor-default ${isLight ? 'bg-white/30 text-gray-900 border-black/10 hover:border-black/30' : 'bg-white/5 text-white border-white/10 hover:border-white/30'}`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* Unlock Section */}
          <section className="py-40 px-6 max-w-screen-2xl mx-auto relative z-10 mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full backdrop-blur-2xl border p-6 sm:p-10 md:p-24 overflow-hidden transition-colors duration-800 ${isLight ? 'bg-white/60 border-black/10' : 'bg-[#050505]/80 border-white/10'}`}
            >
              {/* Cinematic Glow Background */}
              <div 
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none ${isLight ? 'opacity-30' : 'opacity-20'}`}
                style={{ backgroundColor: weapon.themeColor }}
              />

              <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-20">
                <div className="flex-1">
                  <div className={`mb-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full border ${isLight ? 'border-black/10 bg-white/40' : 'border-white/10 bg-white/5'}`}>
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: weapon.themeColor }} />
                    <span className={`text-xs font-bold uppercase tracking-[0.2em] ${isLight ? 'text-gray-900' : 'text-white'}`}>Target Acquired</span>
                  </div>
                  
                  <h3 className="text-5xl sm:text-6xl md:text-9xl font-bold mb-4 uppercase tracking-tighter leading-none transition-colors duration-800" style={{ color: 'var(--text-primary)' }}>
                    {weapon.name}
                  </h3>
                  <p className={`text-2xl font-bold uppercase tracking-widest mb-12 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                    {weapon.subName}
                  </p>
                  
                  <div className="flex flex-wrap items-baseline gap-4 md:gap-6 mb-8 md:mb-12">
                    <span className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter transition-colors duration-800" style={{ color: 'var(--text-primary)' }}>{weapon.unlockSection.price}</span>
                    <span className={`font-bold uppercase tracking-widest text-lg ${isLight ? 'text-gray-600' : 'text-gray-500'}`}>{weapon.unlockSection.unit}</span>
                  </div>
                  
                  <button 
                    className="group relative w-full md:w-auto px-8 md:px-16 py-4 md:py-6 bg-white text-black font-bold text-xl uppercase tracking-widest overflow-hidden hover:scale-[1.02] transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    <span className="relative z-10">Access Protocol</span>
                    <div 
                      className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" 
                      style={{ backgroundColor: weapon.themeColor }}
                    />
                  </button>
                </div>
                
                <div className={`w-full lg:w-[450px] shrink-0 border backdrop-blur-md p-6 md:p-10 transition-colors duration-800 ${isLight ? 'bg-white/40 border-black/10' : 'bg-black/40 border-white/10'}`}>
                  <h4 className={`font-bold mb-8 text-2xl uppercase tracking-widest border-b pb-6 transition-colors duration-800 ${isLight ? 'text-gray-900 border-black/10' : 'text-white border-white/10'}`}>
                    Deployment Specs
                  </h4>
                  
                  <ul className="space-y-6 mb-10">
                    {weapon.unlockSection.processingParams.map((param, idx) => (
                      <li key={idx} className={`flex items-center gap-5 text-base font-bold uppercase tracking-widest ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={weapon.themeColor} strokeWidth="2" strokeLinecap="square">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                        {param}
                      </li>
                    ))}
                  </ul>

                  <div className={`space-y-4 pt-8 border-t text-sm font-semibold tracking-wide transition-colors duration-800 ${isLight ? 'border-black/10 text-gray-600' : 'border-white/10 text-gray-500'}`}>
                    <p>{weapon.unlockSection.deliveryPromise}</p>
                    <p>{weapon.unlockSection.returnPolicy}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

        </motion.div>
      </AnimatePresence>

      {/* Cybernetic Pill Menu */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
        <div className={`flex backdrop-blur-xl p-2 rounded-full border shadow-2xl transition-colors duration-800 ${isLight ? 'bg-white/80 border-black/20' : 'bg-black/80 border-white/20'}`}>
          {weapons.map((w, idx) => (
            <button
              key={w.id}
              onClick={() => setCurrentIndex(idx)}
              className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all ${
                currentIndex === idx 
                  ? 'text-black' 
                  : isLight ? 'text-gray-600 hover:text-black hover:bg-black/10' : 'text-gray-500 hover:text-white hover:bg-white/10'
              }`}
              style={currentIndex === idx ? { backgroundColor: w.themeColor, boxShadow: `0 0 15px ${w.themeColor}50` } : {}}
            >
              {w.id}
            </button>
          ))}
        </div>
      </div>

      {/* Tactical HUD Overlay (Hides injected preview logos on desktop) */}
      <div className={`hidden md:flex fixed bottom-36 right-10 z-[99999] flex-col gap-3 px-6 py-4 rounded-tl-2xl rounded-br-2xl border backdrop-blur-xl shadow-2xl transition-colors duration-800 ${isLight ? 'bg-white/90 border-black/20' : 'bg-[#050505]/95 border-white/10'}`}>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-4 h-4">
            <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: weapon.themeColor }}></div>
            <div className="relative w-2 h-2 rounded-full" style={{ backgroundColor: weapon.themeColor }}></div>
          </div>
          <div className="flex flex-col">
            <span className={`text-[10px] font-bold tracking-[0.3em] uppercase leading-none mb-1 transition-colors duration-800 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
              System Status
            </span>
            <span className="text-xs font-bold tracking-widest uppercase leading-none transition-colors duration-800" style={{ color: weapon.themeColor }}>
              Uplink Active
            </span>
          </div>
        </div>
      </div>

      <Footer themeColor={weapon.themeColor} isLight={isLight} />
    </main>
  );
}
