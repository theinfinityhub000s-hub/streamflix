import React from 'react';
import { Play, Download, Info, Star, ShieldAlert } from 'lucide-react';

export default function HeroBanner({ movie, onPlay, onDownload, onInfo }) {
  if (!movie) return null;

  return (
    <div className="relative w-full h-[75vh] md:h-[88vh] overflow-hidden select-none">
      
      {/* 4K Backdrop Image */}
      <img
        src={movie.backdrop_path}
        alt={movie.title}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s5200bm.jpg";
        }}
        className="w-full h-full object-cover object-center filter brightness-[0.85]"
      />

      {/* Netflix Vignette Overlays */}
      <div className="absolute inset-0 hero-vignette-left" />
      <div className="absolute inset-0 hero-vignette" />

      {/* Content Container */}
      <div className="absolute bottom-16 md:bottom-24 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="max-w-2xl space-y-4">
          
          {/* Top Pill / Badge */}
          <div className="flex items-center space-x-2">
            <span className="bg-[#E50914] text-white font-black text-[10px] tracking-wider uppercase px-2 py-0.5 rounded">
              TOP 10
            </span>
            <span className="text-white/80 font-bold text-xs uppercase tracking-widest drop-shadow">
              #1 in Movies Today
            </span>
          </div>

          {/* Cinematic Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl">
            {movie.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-200 font-medium">
            <div className="flex items-center text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400 mr-1" />
              <span>{movie.vote_average}</span>
            </div>
            <span>•</span>
            <span>{movie.release_date}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span className="border border-white/40 px-1.5 py-0.5 rounded text-[11px] font-semibold tracking-wide text-white/90">
              {movie.quality}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-semibold text-white">
              {movie.audio}
            </span>
          </div>

          {/* Clamped Synopsis */}
          <p className="text-sm md:text-base text-gray-300 line-clamp-3 leading-relaxed drop-shadow">
            {movie.overview}
          </p>

          {/* Netflix Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            
            {/* Play Button */}
            <button
              onClick={() => onPlay(movie)}
              className="flex items-center space-x-2 bg-white hover:bg-gray-200 text-black font-extrabold px-6 py-2.5 rounded-md shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-black" />
              <span className="text-base tracking-wide">Play Now</span>
            </button>

            {/* Offline Download Button */}
            <button
              onClick={() => onDownload(movie)}
              className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md font-semibold px-5 py-2.5 rounded-md border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-5 h-5 text-white" />
              <span className="text-sm tracking-wide">Download</span>
            </button>

            {/* More Info */}
            <button
              onClick={() => onInfo(movie)}
              className="hidden sm:flex items-center space-x-2 bg-neutral-800/80 hover:bg-neutral-700/80 text-gray-200 font-medium px-4 py-2.5 rounded-md backdrop-blur-md transition-all cursor-pointer"
            >
              <Info className="w-5 h-5 text-gray-300" />
              <span className="text-sm">Details</span>
            </button>

          </div>

        </div>
      </div>

      {/* Age Rating Pill on Right */}
      <div className="hidden md:flex absolute bottom-24 right-8 z-20 items-center space-x-2 bg-black/50 backdrop-blur-sm border-l-4 border-white px-3 py-1 text-xs font-semibold text-gray-300">
        <ShieldAlert className="w-3.5 h-3.5 text-gray-300" />
        <span>U/A 16+ • Violence, Language</span>
      </div>

    </div>
  );
}
