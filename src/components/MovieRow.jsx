import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Download, Star } from 'lucide-react';

export default function MovieRow({ title, items, onSelectMovie, onPlayMovie, onDownloadMovie }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-2 py-4 relative group">
      
      {/* Row Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-bold text-gray-100 hover:text-white transition-colors cursor-pointer flex items-center space-x-2">
          <span>{title}</span>
          <span className="text-xs text-[#E50914] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
            Explore All ›
          </span>
        </h2>
      </div>

      {/* Row Scroller with Arrows */}
      <div className="relative">
        
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-30 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer"
          title="Scroll Left"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Horizontal Container */}
        <div
          ref={rowRef}
          className="flex items-center space-x-3 sm:space-x-4 overflow-x-auto no-scrollbar py-3 px-4 sm:px-6 lg:px-8"
        >
          {items.map((movie) => (
            <div
              key={movie.id || movie.title}
              className="flex-none w-44 sm:w-56 md:w-64 rounded-md overflow-hidden bg-[#181818] border border-white/5 shadow-md hover:shadow-2xl hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:z-20 group/card cursor-pointer"
              onClick={() => onSelectMovie(movie)}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                <img
                  src={movie.backdrop_path || movie.poster_path}
                  alt={movie.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover/card:brightness-90 transition-all duration-300"
                />

                {/* Top Quality Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-black/70 backdrop-blur-sm border border-white/20 text-[10px] font-bold px-1.5 py-0.5 rounded text-white">
                    {movie.quality || "HD"}
                  </span>
                </div>

                {/* Rating Badge */}
                {movie.vote_average && (
                  <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/70 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-amber-400">
                    <Star className="w-2.5 h-2.5 fill-amber-400" />
                    <span>{movie.vote_average}</span>
                  </div>
                )}

                {/* Quick Action Overlay (shows on hover) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayMovie(movie);
                    }}
                    className="w-10 h-10 rounded-full bg-white hover:bg-gray-200 text-black flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95 transition-all"
                    title="Play Movie"
                  >
                    <Play className="w-5 h-5 fill-black ml-0.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDownloadMovie(movie);
                    }}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center border border-white/30 shadow-lg transform hover:scale-110 active:scale-95 transition-all"
                    title="Download Movie"
                  >
                    <Download className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="p-2.5 space-y-1">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-100 truncate group-hover/card:text-[#E50914] transition-colors">
                  {movie.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span>{movie.release_date}</span>
                  <span className="text-[10px] text-gray-400 font-medium truncate max-w-[110px]">
                    {movie.audio || (movie.genres && movie.genres[0]) || "Hindi"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-30 w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm cursor-pointer"
          title="Scroll Right"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

      </div>

    </div>
  );
}
