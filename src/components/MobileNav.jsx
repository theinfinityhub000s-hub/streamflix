import React from 'react';
import { Home, Flame, Search, Send, Download } from 'lucide-react';

export default function MobileNav({ activeTab, onSelectTab, onOpenSearch }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#121212]/95 backdrop-blur-xl border-t border-white/10 md:hidden px-4 py-2 flex items-center justify-around safe-area-bottom shadow-2xl">
      
      {/* Home Tab */}
      <button
        onClick={() => onSelectTab('Home')}
        className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
          activeTab === 'Home' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'Home' ? 'text-[#E50914]' : ''}`} />
        <span className="text-[10px] font-medium tracking-tight">Home</span>
      </button>

      {/* New & Hot (Trending) Tab */}
      <button
        onClick={() => onSelectTab('Trending')}
        className={`flex flex-col items-center justify-center space-y-1 transition-colors cursor-pointer ${
          activeTab === 'Trending' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
        }`}
      >
        <Flame className={`w-5 h-5 ${activeTab === 'Trending' ? 'text-[#E50914]' : ''}`} />
        <span className="text-[10px] font-medium tracking-tight">New & Hot</span>
      </button>

      {/* Search Tab */}
      <button
        onClick={onOpenSearch}
        className="flex flex-col items-center justify-center space-y-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
      >
        <Search className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-tight">Search</span>
      </button>

      {/* Telegram Bot Direct Link */}
      <a
        href="https://t.me/MaltiMuvesbot"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center space-y-1 text-[#0088cc] hover:text-[#38bdf8] transition-colors cursor-pointer"
      >
        <Send className="w-5 h-5" />
        <span className="text-[10px] font-medium tracking-tight">Bot</span>
      </a>

    </div>
  );
}
