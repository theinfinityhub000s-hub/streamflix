import React, { useState } from 'react';
import { X, Play, Download, Send, RefreshCw, Star, Film, Server, CheckCircle2, ShieldCheck } from 'lucide-react';
import { getStreamingUrls, getDownloadGateways } from '../services/api';

export default function MediaModal({ movie, initialTab = 'stream', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'stream' | 'download' | 'telegram'
  const [server, setServer] = useState(1);
  const [iframeKey, setIframeKey] = useState(0);

  if (!movie) return null;

  const streamUrl = getStreamingUrls(movie, server);
  const downloadLinks = getDownloadGateways(movie);

  const handleServerChange = (newServer) => {
    setServer(newServer);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-5xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl border border-white/10 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-lg"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header / Banner */}
        <div className="relative h-60 sm:h-80 md:h-96 w-full overflow-hidden bg-neutral-950">
          <img
            src={movie.backdrop_path || movie.poster_path}
            alt={movie.title}
            className="w-full h-full object-cover object-center filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/40 to-transparent" />

          {/* Banner Details Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#E50914] text-white font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
                STREAMFLIX ORIGINAL
              </span>
              <div className="flex items-center text-amber-400 font-bold text-xs bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                <Star className="w-3 h-3 fill-amber-400 mr-1" />
                <span>{movie.vote_average || "7.5"}</span>
              </div>
              <span className="text-gray-300 text-xs">{movie.release_date || "2024"}</span>
              <span className="text-gray-300 text-xs">•</span>
              <span className="text-gray-300 text-xs">{movie.duration || "2h"}</span>
              <span className="border border-white/30 text-[10px] px-1.5 py-0.5 rounded text-white/80 font-semibold">
                {movie.quality || "4K UHD"}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-md">
              {movie.title}
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 line-clamp-2 max-w-2xl leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-white/10 px-6 bg-[#141414]">
          <button
            onClick={() => setActiveTab('stream')}
            className={`flex items-center space-x-2 py-4 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'stream'
                ? 'border-[#E50914] text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Watch Online</span>
          </button>

          <button
            onClick={() => setActiveTab('download')}
            className={`flex items-center space-x-2 py-4 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'download'
                ? 'border-[#E50914] text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Save Offline (4K / 1080p)</span>
          </button>

          <button
            onClick={() => setActiveTab('telegram')}
            className={`flex items-center space-x-2 py-4 px-4 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'telegram'
                ? 'border-[#E50914] text-white'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Send className="w-4 h-4 text-[#0088cc]" />
            <span>Telegram Bot</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-4 sm:p-6 bg-[#181818]">
          
          {/* TAB 1: WATCH ONLINE (STREAM PLAYER) */}
          {activeTab === 'stream' && (
            <div className="space-y-4">
              
              {/* Server Switcher Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#141414] p-3 rounded-lg border border-white/5">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-semibold text-gray-300">Streaming Server:</span>
                  <div className="flex items-center space-x-1.5">
                    {[
                      { id: 1, name: 'Server 1 (2Embed - 4K)' },
                      { id: 2, name: 'Server 2 (AutoEmbed)' },
                      { id: 3, name: 'Server 3 (VidSrc)' }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => handleServerChange(s.id)}
                        className={`text-xs px-2.5 py-1 rounded font-medium transition-all cursor-pointer ${
                          server === s.id
                            ? 'bg-[#E50914] text-white shadow-md'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setIframeKey(prev => prev + 1)}
                  className="flex items-center space-x-1 text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                  title="Reload Player"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reload Player</span>
                </button>
              </div>

              {/* Video Player Frame Container */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-white/10 shadow-2xl">
                <iframe
                  key={iframeKey}
                  src={streamUrl}
                  title={movie.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-1">
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Ad-Free Protected Player • Auto Quality Selector</span>
                </div>
                <span>If buffering occurs, switch between Server 1, 2, or 3 above</span>
              </div>

            </div>
          )}

          {/* TAB 2: SAVE OFFLINE (DOWNLOAD GATEWAYS) */}
          {activeTab === 'download' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">Select Download Quality</h3>
                  <p className="text-xs text-gray-400">High-speed 10Gbps CDN servers powered by Cloudflare R2 / FastDL</p>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-medium border border-emerald-500/30">
                  Vega Direct Verified
                </span>
              </div>

              {/* Quality Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {downloadLinks.map((dl, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-[#141414] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-gray-100 group-hover:text-[#E50914] transition-colors">
                            {dl.quality}
                          </h4>
                          <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300 font-mono">
                            {dl.size}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{dl.codec}</p>
                        <p className="text-xs text-amber-300/90 font-medium mt-0.5">{dl.audio}</p>
                      </div>

                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded font-mono border border-emerald-800/40">
                        {dl.speed}
                      </span>
                    </div>

                    <a
                      href={dl.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-2 w-full py-2 px-4 rounded bg-white/10 hover:bg-[#E50914] text-white font-semibold text-xs transition-all shadow cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download {dl.quality.split(' ')[0]}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TELEGRAM BOT RELAY */}
          {activeTab === 'telegram' && (
            <div className="p-6 rounded-lg bg-[#141414] border border-white/5 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#0088cc]/20 border border-[#0088cc]/40 text-[#0088cc] flex items-center justify-center mx-auto shadow-lg">
                <Send className="w-7 h-7" />
              </div>

              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-lg font-bold text-white">Send Directly to Telegram</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Receive this movie directly on your Telegram account with zero ads. Download up to 2GB files with 1-click in your chat!
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
                  <span>Open in @MaltiMuvesbot</span>
                </a>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
