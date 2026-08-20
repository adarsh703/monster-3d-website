import React from 'react';

export default function Footer({ themeColor = "#00FF00", isLight = false }: { themeColor?: string, isLight?: boolean }) {
  return (
    <footer 
      className={`py-16 px-6 relative z-10 border-t transition-colors duration-800 ${isLight ? 'bg-[#e0f7fa] text-gray-900 border-black/10' : 'bg-black text-white border-white/10'}`}
      style={{ borderTopColor: isLight ? 'rgba(0,0,0,0.1)' : `${themeColor}40` }}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-colors duration-800">
              <path d="M4 2L6 22L8 4L10 20L12 6L14 20L16 4L18 22L20 2" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-2xl font-bold tracking-widest uppercase transition-colors duration-800" style={{ color: 'var(--text-primary)' }}>Monster Energy</span>
          </div>
          <p className={`text-sm leading-relaxed mb-6 font-medium transition-colors duration-800 ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>
            Unleash the Beast. The Forge is a promotional experience.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-xl tracking-widest uppercase transition-colors duration-800" style={{ color: themeColor }}>Terms of Use</h4>
          <ul className={`space-y-4 text-sm font-semibold tracking-wider uppercase transition-colors duration-800 ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>
            <li><a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Privacy Policy</a></li>
            <li><a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Rules & Conditions</a></li>
            <li><a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Cookie Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-xl tracking-widest uppercase transition-colors duration-800" style={{ color: themeColor }}>Digital Armory Support</h4>
          <ul className={`space-y-4 text-sm font-semibold tracking-wider uppercase transition-colors duration-800 ${isLight ? 'text-gray-700' : 'text-gray-400'}`}>
            <li><a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Redemption Issues</a></li>
            <li><a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>FAQ</a></li>
            <li><a href="#" className={`transition-colors ${isLight ? 'hover:text-black' : 'hover:text-white'}`}>Contact Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className={`container mx-auto mt-16 pt-8 border-t flex justify-between items-center text-xs font-semibold tracking-widest uppercase transition-colors duration-800 ${isLight ? 'border-black/10 text-gray-500' : 'border-white/10 text-gray-500'}`}>
        <p>© {new Date().getFullYear()} Monster Energy. All rights reserved.</p>
      </div>
    </footer>
  );
}
