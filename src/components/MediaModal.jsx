import React, { useState, useEffect } from 'react';
import { X, Play, Download, Send, RefreshCw, Star, Film, Server, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { getStreamingUrls, getDownloadGateways } from '../services/api';

export default function MediaModal({ movie, initialTab = 'stream', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'stream' | 'download' | 'telegram'
  const [server, setServer] = useState(1);
  const [iframeKey, setIframeKey] = useState(0);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const streamUrl = getStreamingUrls(movie, server);
  const downloadLinks = getDownloadGateways(movie);

  const handleServerChange = (newServer) => {
    setServer(newServer);
    setIframeKey(prev => prev + 1);
  };

  const defaultPoster = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80";

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex flex-col justify-end sm:justify-start sm:items-start sm:py-6 p-0 sm:p-4 md:p-6 animate-fadeIn"
      onClick={onClose}
    >
      
      {/* Netflix OTT Player & Download Modal */}
      <div 
        className="relative w-full max-w-5xl mx-auto bg-[#181818] rounded-t-2xl sm:rounded-xl overflow-hidden shadow-2xl border-t sm:border border-white/10 max-h-[95vh] sm:max-h-none overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Mobile Swipe Handle Indicator */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-black">
          <div className="w-10 h-1 rounded-full bg-white/30" />
        </div>

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/85 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-2xl hover:scale-110 active:scale-95"
          title="Close (Esc)"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* 1. TOP SECTION: STREAM PLAYER OR BANNER */}
        {activeTab === 'stream' ? (
          /* REAL NETFLIX VIDEO PLAYER AT THE TOP */
          <div className="relative bg-black w-full">
            
            {/* 16:9 Cinematic Video Player Frame */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                key={iframeKey}
                src={streamUrl}
                title={movie.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Server Switcher Toolbar Under Player */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-[#121212] px-3 sm:px-6 py-2.5 border-b border-white/10">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="flex items-center text-[11px] sm:text-xs font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
                  Streaming Live:
                </span>
                <div className="flex items-center space-x-1">
                  {[
                    { id: 1, name: 'Server 1 (2Embed 4K)' },
                    { id: 2, name: 'Server 2 (AutoEmbed)' },
                    { id: 3, name: 'Server 3 (VidSrc)' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServerChange(s.id)}
                      className={`text-[10px] sm:text-xs px-2.5 py-1 rounded font-medium transition-all cursor-pointer ${
                        server === s.id
                          ? 'bg-[#E50914] text-white shadow-md font-bold'
                          : 'bg-white/10 hover:bg-white/20 text-gray-300'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIframeKey(prev => prev + 1)}
                className="flex items-center space-x-1 text-[11px] sm:text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Reload Player"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reload</span>
              </button>
            </div>

          </div>
        ) : (
          /* CINEMATIC BACKDROP BANNER (Shown on Download or Telegram tabs) */
          <div className="relative h-44 sm:h-72 w-full overflow-hidden bg-neutral-950">
            <img
              src={movie.backdrop_path || movie.poster_path || defaultPoster}
              alt={movie.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultPoster;
              }}
              className="w-full h-full object-cover object-center filter brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/60 to-transparent" />
            
            <div className="absolute bottom-3 left-4 right-4 sm:bottom-6 sm:left-6">
              <span className="bg-[#E50914] text-white font-black text-[9px] uppercase px-1.5 py-0.5 rounded">
                STREAMFLIX ORIGINAL
              </span>
              <h2 className="text-xl sm:text-3xl font-black text-white mt-1 drop-shadow-md">
                {movie.title}
              </h2>
            </div>
          </div>
        )}

        {/* 2. NAVIGATION TABS (Watch Online / Save Offline / Telegram Bot) */}
        <div className="flex items-center border-b border-white/10 px-3 sm:px-6 bg-[#141414] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('stream')}
            className={`flex items-center space-x-2 py-3 sm:py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'stream'
                ? 'border-[#E50914] text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Watch Online (4K Player)</span>
          </button>

          <button
            onClick={() => setActiveTab('download')}
            className={`flex items-center space-x-2 py-3 sm:py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'download'
                ? 'border-[#E50914] text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Save Offline (Vega 10Gbps)</span>
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`flex items-center space-x-2 py-3 sm:py-3.5 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'telegram'
                ? 'border-[#E50914] text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-[#0088cc]" />
            <span>Telegram Bot Delivery</span>
          </button>
        </div>

        {/* 3. TAB CONTENT BODY */}
        <div className="p-4 sm:p-6 bg-[#181818] pb-12 sm:pb-6 space-y-4">
          
          {/* TAB 1: WATCH ONLINE DETAILS */}
          {activeTab === 'stream' && (
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-3xl font-black text-white">{movie.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-gray-300">
                    <span className="text-amber-400 font-bold">★ {movie.vote_average || "7.8"} IMDb</span>
                    <span>•</span>
                    <span>{movie.release_date || "2024"}</span>
                    <span>•</span>
                    <span>{movie.duration || "2h 15m"}</span>
                    <span>•</span>
                    <span className="border border-white/30 px-1 py-0.5 rounded text-[10px] text-white font-semibold">
                      {movie.quality || "4K UHD"}
                    </span>
                    <span className="text-emerald-400 font-medium">{movie.audio || "Hindi DD 5.1 + English"}</span>
                  </div>
                </div>

                {/* Quick 1-Click Download Switcher Button */}
                <button
                  onClick={() => setActiveTab('download')}
                  className="flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded font-semibold border border-white/20 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Movie (4K/1080p)</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-3xl">
                {movie.overview}
              </p>

              <div className="flex items-center space-x-2 text-xs text-gray-400 pt-2 border-t border-white/5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Ad-Free Protected Stream • Zero Popups • Dual Audio Switching</span>
              </div>
            </div>
          )}

          {/* TAB 2: VEGAMOVIES 10GBPS DIRECT DOWNLOAD GATEWAYS */}
          {activeTab === 'download' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                    <span>Direct 10Gbps Vega Download Mirrors</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
                      FastDL Active
                    </span>
                  </h3>
                  <p className="text-xs text-gray-400">High-speed Cloudflare R2 & Google Drive direct CDN mirrors. Zero waiting time.</p>
                </div>
              </div>

              {/* 4-Tier Download Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {downloadLinks.map((dl, index) => (
                  <div
                    key={index}
                    className="p-3.5 sm:p-4 rounded-lg bg-[#141414] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between space-y-3 group shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-gray-100 group-hover:text-[#E50914] transition-colors">
                            {dl.quality}
                          </h4>
                          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-mono font-bold">
                            {dl.size}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{dl.codec}</p>
                        <p className="text-xs text-amber-300/90 font-medium mt-0.5">{dl.audio}</p>
                      </div>

                      <span className="text-[10px] text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded font-mono border border-emerald-800/50">
                        {dl.speed}
                      </span>
                    </div>

                    <a
                      href={dl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full py-2.5 px-4 rounded bg-[#E50914] hover:bg-[#b20710] text-white font-bold text-xs transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Start Direct Download ({dl.quality.split(' ')[0]})</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TELEGRAM BOT RELAY (@MaltiMuvesbot) */}
          {activeTab === 'telegram' && (
            <div className="p-6 rounded-lg bg-[#141414] border border-white/10 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#0088cc]/20 border border-[#0088cc]/40 text-[#0088cc] flex items-center justify-center mx-auto shadow-xl">
                <Send className="w-7 h-7" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-lg font-bold text-white">Deliver to Telegram App</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Stream or download this movie directly inside your Telegram chat without saving files to laptop storage. Works on any device via our official verified bot!
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={`https://t.me/MaltiMuvesbot?start=${encodeURIComponent(movie.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#0088cc] hover:bg-[#0077b5] text-white font-bold text-sm px-6 py-3 rounded-lg shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send "{movie.title}" to @MaltiMuvesbot</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
