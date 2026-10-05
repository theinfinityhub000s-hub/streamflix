import React, { useState, useEffect } from 'react';
import { Search, Bell, Send, Film, X } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onSearchSubmit, onSelectCategory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#141414]/95 backdrop-blur-md shadow-2xl py-3 border-b border-white/5' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <div 
            onClick={() => { setSearchQuery(''); onSelectCategory('Home'); }}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-[#B20710] to-[#E50914] rounded-md flex items-center justify-center shadow-lg shadow-[#E50914]/20 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#E50914] uppercase">
              STREAM<span className="text-white">FLIX</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
            <button onClick={() => onSelectCategory('Home')} className="hover:text-white transition-colors cursor-pointer">Home</button>
            <button onClick={() => onSelectCategory('Movies')} className="hover:text-white transition-colors cursor-pointer">Movies</button>
            <button onClick={() => onSelectCategory('Series')} className="hover:text-white transition-colors cursor-pointer">Web Series</button>
            <button onClick={() => onSelectCategory('Bollywood')} className="hover:text-white transition-colors cursor-pointer">Bollywood</button>
            <button onClick={() => onSelectCategory('Hindi Dubbed')} className="hover:text-white transition-colors cursor-pointer">Hindi Dubbed</button>
          </nav>
        </div>

        {/* Right: Search, Telegram Bot & Profile */}
        <div className="flex items-center space-x-4">
          
          {/* Animated Search Bar */}
          <div className="relative flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-black/90 border border-white/25 rounded-full px-3 py-1.5 transition-all w-44 sm:w-64 md:w-72 shadow-lg">
                <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Titles, genres..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit && onSearchSubmit()}
                  autoFocus
                  className="bg-transparent text-white text-xs sm:text-sm focus:outline-none w-full"
                />
                <button 
                  onClick={() => {
                    if (searchQuery) {
                      setSearchQuery('');
                    } else {
                      setSearchOpen(false);
                    }
                  }} 
                  className="text-gray-400 hover:text-white p-1 transition-colors flex-shrink-0 cursor-pointer"
                  title={searchQuery ? "Clear Search" : "Close Search"}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer"
                title="Search Movies"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Telegram Bot Link Button */}
          <a
            href="https://t.me/MaltiMuvesbot"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] hover:text-[#38bdf8] border border-[#0088cc]/30 text-xs px-3 py-1.5 rounded-full font-medium transition-all"
            title="Open Telegram Bot"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bot</span>
          </a>

          {/* Profile Avatar */}
          <div className="w-8 h-8 rounded bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center font-bold text-xs text-[#E50914]">
            SF
          </div>

        </div>

      </div>
    </header>
  );
}
