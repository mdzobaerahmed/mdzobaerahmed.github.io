import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Camera, MapPin, Calendar, Aperture, Copy, Check, Sliders } from 'lucide-react';

export function LightboxModal({ 
  photos, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext 
}) {
  const [copied, setCopied] = React.useState(false);
  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!currentPhoto) return null;

  const copyExif = () => {
    const exifText = `${currentPhoto.title} | ${currentPhoto.exif.camera} + ${currentPhoto.exif.lens} | ${currentPhoto.exif.focalLength}, ${currentPhoto.exif.aperture}, ${currentPhoto.exif.shutterSpeed}, ISO ${currentPhoto.exif.iso} | Film/Sim: ${currentPhoto.exif.filmSimulation}`;
    navigator.clipboard.writeText(exifText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar: Title & Controls */}
      <div 
        className="px-6 py-4 flex items-center justify-between z-10 bg-linear-to-b from-black/80 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 font-mono text-xs text-slate-300">
          <span className="text-amber-500 font-bold">
            [{String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}]
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="font-semibold tracking-wide text-white hidden sm:inline">
            {currentPhoto.title}
          </span>
          <span className="text-slate-500 text-[11px] hidden md:inline">
            ({currentPhoto.location})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyExif}
            className="px-3 py-1.5 rounded-lg border border-white/20 text-xs font-mono text-slate-300 hover:text-white hover:border-amber-500 transition-colors flex items-center gap-1.5"
            title="Copy EXIF to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'EXIF Copied' : 'Copy EXIF'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport with Previous & Next Arrows */}
      <div 
        className="relative flex-1 flex items-center justify-center p-4 sm:p-8 max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white z-20 transition-all hover:scale-105"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Photo */}
        <div className="relative max-w-full max-h-full flex items-center justify-center">
          <img
            src={currentPhoto.imageUrl}
            alt={currentPhoto.title}
            className="max-h-[68vh] max-w-full w-auto object-contain rounded-lg shadow-2xl transition-all duration-300"
          />
          {/* Subtle Viewfinder Framing marks on image */}
          <div className="absolute inset-2 border border-white/10 pointer-events-none rounded"></div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white z-20 transition-all hover:scale-105"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Bar: Camera Metadata HUD (Monospace Overlay) */}
      <div 
        className="px-6 py-5 bg-black/90 border-t border-white/10 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-6xl mx-auto space-y-3 font-mono">
          
          {/* HUD EXIF Parameters Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-xs border-b border-white/10 pb-3">
            <div>
              <div className="text-slate-500 text-[10px] tracking-wider uppercase">BODY</div>
              <div className="text-amber-400 font-semibold truncate mt-0.5">{currentPhoto.exif.camera}</div>
            </div>

            <div>
              <div className="text-slate-500 text-[10px] tracking-wider uppercase">OPTICS</div>
              <div className="text-slate-200 font-semibold truncate mt-0.5">{currentPhoto.exif.lens}</div>
            </div>

            <div>
              <div className="text-slate-500 text-[10px] tracking-wider uppercase">EXPOSURE</div>
              <div className="text-slate-200 font-semibold mt-0.5">
                {currentPhoto.exif.shutterSpeed} · {currentPhoto.exif.aperture}
              </div>
            </div>

            <div>
              <div className="text-slate-500 text-[10px] tracking-wider uppercase">SENSITIVITY</div>
              <div className="text-slate-200 font-semibold mt-0.5">
                ISO {currentPhoto.exif.iso} {currentPhoto.exif.exposureComp !== '0.0 EV' && `(${currentPhoto.exif.exposureComp})`}
              </div>
            </div>

            <div>
              <div className="text-slate-500 text-[10px] tracking-wider uppercase">EMULSION / RECIPE</div>
              <div className="text-amber-300 font-semibold truncate mt-0.5">{currentPhoto.exif.filmSimulation}</div>
            </div>

            <div>
              <div className="text-slate-500 text-[10px] tracking-wider uppercase">COORDINATES</div>
              <div className="text-slate-300 font-mono text-[11px] truncate mt-0.5">{currentPhoto.coordinates}</div>
            </div>
          </div>

          {/* Story Narrative & Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
            <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-4xl italic">
              "{currentPhoto.story}"
            </p>
            <div className="flex items-center gap-3 text-slate-500 shrink-0 font-mono text-[11px]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-amber-500" />
                <span>{currentPhoto.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{currentPhoto.year}</span>
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
