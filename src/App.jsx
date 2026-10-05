import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import MediaModal from './components/MediaModal';
import { INITIAL_FEATURED, POPULAR_ROWS, searchMovies } from './services/api';
import { Film, Search, Loader2 } from 'lucide-react';

export default function App() {
  const [featured, setFeatured] = useState(INITIAL_FEATURED);
  const [rows, setRows] = useState(POPULAR_ROWS);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalTab, setModalTab] = useState('stream');
  const [activeCategory, setActiveCategory] = useState('Home');

  // Live search effect with debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchMovies(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleOpenModal = (movie, tab = 'stream') => {
    setSelectedMovie(movie);
    setModalTab(tab);
  };

  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    setSearchQuery('');
    
    if (category === 'Bollywood') {
      const bRow = POPULAR_ROWS.find(r => r.title.includes('Bollywood'));
      if (bRow && bRow.items[0]) setFeatured(bRow.items[0]);
    } else if (category === 'Movies') {
      const aRow = POPULAR_ROWS.find(r => r.title.includes('Action'));
      if (aRow && aRow.items[0]) setFeatured(aRow.items[0]);
    } else {
      setFeatured(INITIAL_FEATURED);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col font-sans">
      
      {/* Sticky Translucent Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {/* If User is Searching: Render Search Results Grid */}
        {searchQuery.trim() ? (
          <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h1 className="text-xl sm:text-2xl font-bold flex items-center space-x-2 text-gray-100">
                <Search className="w-5 h-5 text-[#E50914]" />
                <span>Search results for "{searchQuery}"</span>
              </h1>
              {isSearching && (
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <Loader2 className="w-4 h-4 animate-spin text-[#E50914]" />
                  <span>Searching...</span>
                </div>
              )}
            </div>

            {searchResults.length === 0 && !isSearching ? (
              <div className="text-center py-20 space-y-3">
                <Film className="w-12 h-12 text-gray-600 mx-auto" />
                <p className="text-gray-400 text-sm">No titles found matching "{searchQuery}". Try searching for Marvel, Avengers, Stree 2, or Kalki.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {searchResults.map((movie) => (
                  <div
                    key={movie.id || movie.title}
                    onClick={() => handleOpenModal(movie, 'stream')}
                    className="bg-[#181818] rounded-md overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg group"
                  >
                    <div className="aspect-[2/3] w-full bg-neutral-900 overflow-hidden relative">
                      <img
                        src={movie.poster_path || movie.backdrop_path}
                        alt={movie.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:brightness-90 transition-all"
                      />
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-[10px] font-bold px-1.5 py-0.5 rounded text-white">
                        {movie.quality || "HD"}
                      </div>
                    </div>
                    <div className="p-2.5 space-y-1">
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-100 truncate group-hover:text-[#E50914] transition-colors">
                        {movie.title}
                      </h3>
                      <p className="text-[11px] text-gray-400">{movie.release_date || "2024"}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal Netflix Browsing Mode */
          <>
            {/* Top 4K Billboard Banner */}
            <HeroBanner
              movie={featured}
              onPlay={(m) => handleOpenModal(m, 'stream')}
              onDownload={(m) => handleOpenModal(m, 'download')}
              onInfo={(m) => handleOpenModal(m, 'stream')}
            />

            {/* Horizontal Movie Rows */}
            <div className="-mt-16 md:-mt-24 relative z-30 space-y-4">
              {rows.map((row) => (
                <MovieRow
                  key={row.title}
                  title={row.title}
                  items={row.items}
                  onSelectMovie={(m) => handleOpenModal(m, 'stream')}
                  onPlayMovie={(m) => handleOpenModal(m, 'stream')}
                  onDownloadMovie={(m) => handleOpenModal(m, 'download')}
                />
              ))}
            </div>
          </>
        )}

      </main>

      {/* Netflix Detail & Streaming Modal */}
      {selectedMovie && (
        <MediaModal
          movie={selectedMovie}
          initialTab={modalTab}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {/* Netflix Minimalist Dark Footer */}
      <footer className="border-t border-white/10 bg-[#141414] py-12 text-gray-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="hover:underline cursor-pointer">Questions? Join Telegram: @MaltiMuvesbot</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px]">
            <span className="hover:underline cursor-pointer">FAQ</span>
            <span className="hover:underline cursor-pointer">Help Centre</span>
            <span className="hover:underline cursor-pointer">Terms of Use</span>
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Cookie Preferences</span>
            <span className="hover:underline cursor-pointer">Corporate Information</span>
            <span className="hover:underline cursor-pointer">Speed Test</span>
            <span className="hover:underline cursor-pointer">Legal Notices</span>
          </div>

          <div className="pt-4 flex items-center justify-between text-[11px]">
            <span>© 2026 StreamFlix Inc. — Powered by High-Speed Edge Cloud</span>
            <span className="text-[#E50914] font-bold">4K Ultra HD Streaming Fleet</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
