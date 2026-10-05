import React, { useState, useEffect } from 'react';
import { Search, Send, Film, X } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onSearchSubmit, onSelectCategory, activeCategory = 'Home' }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#141414]/95 backdrop-blur-md shadow-2xl py-2.5 sm:py-3 border-b border-white/5' : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-3 sm:py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Brand Logo & Netflix Category Navigation */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div 
            onClick={() => { setSearchQuery(''); onSelectCategory('Home'); }}
            className="flex items-center space-x-1.5 sm:space-x-2 cursor-pointer group flex-shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-tr from-[#B20710] to-[#E50914] rounded-md flex items-center justify-center shadow-lg shadow-[#E50914]/20 group-hover:scale-105 transition-transform">
              <Film className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-[#E50914] uppercase">
              STREAM<span className="text-white">FLIX</span>
            </span>
          </div>

          {/* Desktop & Tablet Category Nav */}
          <nav className="hidden md:flex items-center space-x-5 text-sm font-medium text-gray-300">
            {['Home', 'TV Shows', 'Movies', 'Bollywood', 'Trending'].map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`transition-colors cursor-pointer ${
                  activeCategory === cat ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Top Category Pills (Real Netflix Mobile App Bar) */}
        <div className="flex md:hidden items-center space-x-3 text-xs font-semibold text-gray-300">
          <button
            onClick={() => onSelectCategory('TV Shows')}
            className={`transition-colors cursor-pointer ${activeCategory === 'TV Shows' ? 'text-white underline underline-offset-4 decoration-[#E50914]' : ''}`}
          >
            TV Shows
          </button>
          <button
            onClick={() => onSelectCategory('Movies')}
            className={`transition-colors cursor-pointer ${activeCategory === 'Movies' ? 'text-white underline underline-offset-4 decoration-[#E50914]' : ''}`}
          >
            Movies
          </button>
          <button
            onClick={() => onSelectCategory('Categories')}
            className={`transition-colors cursor-pointer ${activeCategory === 'Categories' ? 'text-white underline underline-offset-4 decoration-[#E50914]' : ''}`}
          >
            Categories ▾
          </button>
        </div>

        {/* Right: Search, Telegram Bot & SF Badge */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          
          {/* Animated Search Bar */}
          <div className="relative flex items-center">
            {searchOpen ? (
              <div className="flex items-center bg-black/90 border border-white/25 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 transition-all w-40 sm:w-64 md:w-72 shadow-lg">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 mr-1.5 sm:mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Movies, shows, actors..."
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
                  className="text-gray-400 hover:text-white p-0.5 sm:p-1 transition-colors flex-shrink-0 cursor-pointer"
                  title={searchQuery ? "Clear Search" : "Close Search"}
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-1.5 sm:p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10 cursor-pointer"
                title="Search Movies"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </div>

          {/* Telegram Bot Link Button */}
          <a
            href="https://t.me/MaltiMuvesbot"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 bg-[#0088cc]/20 hover:bg-[#0088cc]/30 text-[#0088cc] hover:text-[#38bdf8] border border-[#0088cc]/30 text-xs px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium transition-all"
            title="Open Telegram Bot"
          >
            <Send className="w-3.5 h-3.5" />
            <span>@MaltiMuvesbot</span>
          </a>

          {/* Profile Avatar */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-[#E50914] flex items-center justify-center font-bold text-xs text-white shadow-md">
            SF
          </div>

        </div>

      </div>
    </header>
  );
}
