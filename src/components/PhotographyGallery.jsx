import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Maximize2, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { getStoredPhotos } from '../services/dataService';
import { LightboxModal } from './LightboxModal';

export function PhotographyGallery({ darkMode, onNavigateToExhibition, onNavigate }) {
  const [photosList, setPhotosList] = useState(() => getStoredPhotos());
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      setPhotosList(getStoredPhotos());
    };
    window.addEventListener('mza_data_updated', handleUpdate);
    return () => window.removeEventListener('mza_data_updated', handleUpdate);
  }, []);

  const totalPhotos = photosList.length || 1;

  // Auto-rotate 3 photos periodically (every 4 seconds)
  useEffect(() => {
    if (isPaused || totalPhotos <= 1) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % totalPhotos);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, totalPhotos]);

  const handleNextPhotos = () => {
    setStartIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handlePrevPhotos = () => {
    setStartIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  // Get current 3 visible photos
  const visiblePhotos = totalPhotos > 0 ? [
    photosList[startIndex % totalPhotos],
    photosList[(startIndex + 1) % totalPhotos] || photosList[0],
    photosList[(startIndex + 2) % totalPhotos] || photosList[0],
  ] : [];

  const openLightbox = (photo) => {
    const index = photosList.findIndex((p) => p.id === photo.id);
    setLightboxIndex(index >= 0 ? index : 0);
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  return (
    <section id="gallery" className="py-24 relative scroll-mt-24">
      {/* Scroll Anchor */}
      <div id="photography" className="absolute -top-24"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-amber-500 tracking-wider uppercase font-semibold">
              <Camera className="w-4 h-4" />
              <span>06 // PHOTOGRAPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight">
              Photography
            </h2>
            <p className={`text-sm sm:text-base max-w-xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Street documentation, Brutalist studies, and fine art collections shot on mechanical rangefinders and Fujifilm X-T5.
            </p>
          </div>

          {/* Direct Action Link to Exhibition Gallery */}
          {onNavigateToExhibition && (
            <button
              onClick={onNavigateToExhibition}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border font-mono text-xs text-amber-400 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-all font-semibold cursor-pointer w-fit shrink-0 shadow-sm"
            >
              <span>Explore Exhibition Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Photography Sub-Navigation Hub */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-800/60 font-mono text-xs">
          <span className="text-slate-500 text-[11px] uppercase tracking-wider mr-2">PHOTOGRAPHY HUB:</span>
          <button 
            onClick={() => onNavigateToExhibition && onNavigateToExhibition()}
            className="px-3 py-1.5 rounded-lg border border-amber-500/40 bg-amber-500/20 text-amber-400 font-semibold cursor-pointer"
          >
            • Exhibition Gallery
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('print-sale')}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              darkMode ? 'border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-slate-700' : 'border-slate-200 bg-white text-slate-600 hover:text-amber-600'
            }`}
          >
            • Print Sale
          </button>
          <button 
            onClick={() => onNavigate && onNavigate('documentary')}
            className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              darkMode ? 'border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-slate-700' : 'border-slate-200 bg-white text-slate-600 hover:text-amber-600'
            }`}
          >
            • Documentary
          </button>
        </div>

        {/* 3 Rotating Photo Cards Container (Pauses on Hover) */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* 3 Showcase Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visiblePhotos.map((photo, slotIdx) => (
              <div
                key={`${photo.id}-slot-${slotIdx}`}
                onClick={() => {
                  if (onNavigateToExhibition) {
                    onNavigateToExhibition();
                  } else {
                    openLightbox(photo);
                  }
                }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-700 ${
                  darkMode ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-slate-100'
                } hover:shadow-2xl hover:border-amber-500/50 hover:-translate-y-1`}
              >
                {/* Image Frame */}
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-115"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/35 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

                  {/* Category Pill Tag (top-left) */}
                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="px-2.5 py-1 rounded-md text-[10.5px] font-mono font-medium tracking-wide bg-black/70 backdrop-blur-md border border-white/15 text-amber-400">
                      {photo.category}
                    </span>
                  </div>

                  {/* Corner Viewfinder Reticle Markers */}
                  <div className="absolute inset-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between">
                    <div className="flex justify-between text-amber-400 text-[10px] font-mono">
                      <span className="border-t border-l border-amber-400 w-3 h-3"></span>
                      <span className="border-t border-r border-amber-400 w-3 h-3"></span>
                    </div>
                    <div className="flex justify-between text-amber-400 text-[10px] font-mono">
                      <span className="border-b border-l border-amber-400 w-3 h-3"></span>
                      <span className="border-b border-r border-amber-400 w-3 h-3"></span>
                    </div>
                  </div>

                  {/* Hover Center Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none">
                    <div className="px-3.5 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-amber-500/40 text-amber-400 font-mono text-xs flex items-center gap-2 shadow-xl">
                      <span>View in Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Bottom Overlay Info (Monospace HUD) */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 font-mono text-xs text-white z-10 transition-transform duration-300">
                    <div className="flex items-center justify-between text-[11px] text-amber-400 mb-1">
                      <span className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3" />
                        <span>{photo.location}</span>
                      </span>
                      <span className="text-slate-300 text-[10px]">{photo.year}</span>
                    </div>

                    <h3 className="font-sans font-bold text-lg tracking-tight text-white group-hover:text-amber-300 transition-colors">
                      {photo.title}
                    </h3>

                    {/* Monospace Quick EXIF metadata bar */}
                    <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[10.5px] text-slate-300 font-mono">
                      <span>{photo.exif.focalLength} · {photo.exif.aperture}</span>
                      <span className="text-slate-400">{photo.exif.shutterSpeed}</span>
                      <span className="text-amber-400/90 font-medium truncate max-w-[100px] text-right">
                        {photo.exif.camera.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Toolbar */}
          <div className="mt-8 flex items-center justify-between font-mono text-xs text-slate-500">
            {/* Auto-cycling indicator */}
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-slate-500' : 'bg-amber-400 animate-pulse'}`}></span>
              <span className="text-[11px]">
                {isPaused ? 'Auto-rotate paused (hovered)' : 'Rotating curated frames every 4s'}
              </span>
            </div>

            {/* Manual Controls & Dots */}
            <div className="flex items-center gap-4">
              {/* Pagination Dots */}
              <div className="flex items-center gap-1.5">
                {photosList.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setStartIndex(dotIdx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      startIndex === dotIdx 
                        ? 'w-5 bg-amber-400' 
                        : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                    title={`Frame ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevPhotos}
                  className="p-1.5 rounded-lg border border-slate-800 bg-[#0E1524]/70 hover:border-amber-400/50 hover:text-amber-400 text-slate-400 transition-colors cursor-pointer"
                  title="Previous frames"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPhotos}
                  className="p-1.5 rounded-lg border border-slate-800 bg-[#0E1524]/70 hover:border-amber-400/50 hover:text-amber-400 text-slate-400 transition-colors cursor-pointer"
                  title="Next frames"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <LightboxModal
          photos={photosList}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}
    </section>
  );
}
