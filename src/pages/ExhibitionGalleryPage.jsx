import React, { useState, useEffect } from 'react';
import { ArrowLeft, Camera, Sliders, MapPin, Eye, Maximize2, X, Sparkles, Filter } from 'lucide-react';
import { getStoredPhotos } from '../services/dataService';

export function ExhibitionGalleryPage({ darkMode, onBack }) {
  const [photosList, setPhotosList] = useState(() => getStoredPhotos());
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activePhoto, setActivePhoto] = useState(null);

  useEffect(() => {
    const handleUpdate = () => {
      setPhotosList(getStoredPhotos());
    };
    window.addEventListener('mza_data_updated', handleUpdate);
    return () => window.removeEventListener('mza_data_updated', handleUpdate);
  }, []);

  const categories = ['All', 'Street', 'Architecture', 'Landscape', 'Portrait', 'Documentary'];

  const filteredPhotos = selectedFilter === 'All'
    ? photosList
    : photosList.filter(p => p.category === selectedFilter);

  return (
    <div className={`min-h-screen py-24 sm:py-28 ${darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border font-mono text-xs transition-all ${
              darkMode 
                ? 'border-slate-800 bg-[#0E1524]/80 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 shadow-sm' 
                : 'border-slate-200 bg-white text-slate-700 hover:text-amber-600 hover:border-amber-500/50 shadow-sm'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>← Back to Portfolio</span>
          </button>

          <span className="font-mono text-xs text-amber-500/90 tracking-wider hidden sm:inline">
            PHOTOGRAPHY // [01] EXHIBITION GALLERY
          </span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <Camera className="w-4 h-4" />
            <span>FUJIFILM X-T5 OPTICAL ARCHIVES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight mb-4">
            Exhibition Gallery
          </h1>
          <p className={`text-base sm:text-lg font-sans max-w-3xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Fine-art photographic curation captured with Fujifilm 40MP X-Trans sensors and prime glass. Works exhibited internationally across galleries in Greece and Scotland.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mb-12 flex flex-wrap items-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl border transition-all ${
                selectedFilter === cat
                  ? (darkMode ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 font-semibold' : 'bg-white text-slate-900 border-amber-500/60 font-semibold shadow-xs')
                  : (darkMode ? 'bg-[#0E1524]/50 border-slate-800 text-slate-400 hover:text-slate-200' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900')
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col justify-between ${
                darkMode 
                  ? 'bg-[#0E1524]/80 border-slate-800/80 hover:border-amber-500/50 shadow-xl shadow-black/30' 
                  : 'bg-white border-slate-200 hover:border-amber-500/60 shadow-sm'
              }`}
            >
              {/* Image Frame with Film Aspect Ratio */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* HUD Overlay Badge */}
                <div className="absolute top-3 right-3 font-mono text-[10px] px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-amber-400 border border-amber-500/30">
                  {photo.exif.filmSimulation}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white">
                    <Maximize2 className="w-4 h-4 text-amber-400" />
                    <span>Inspect EXIF & Story</span>
                  </span>
                </div>
              </div>

              {/* Photo Information & EXIF strip */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-xs text-amber-500">
                    <span>{photo.category}</span>
                    <span className="text-slate-500">{photo.year}</span>
                  </div>

                  <h3 className={`text-lg font-bold font-sans transition-colors ${
                    darkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                  }`}>
                    {photo.title}
                  </h3>

                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{photo.location}</span>
                  </div>

                  <p className={`text-xs font-sans mt-3 line-clamp-2 leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {photo.story}
                  </p>
                </div>

                {/* Quick EXIF readout */}
                <div className="pt-3 mt-4 border-t border-slate-800/60 font-mono text-[10.5px] text-slate-400 flex items-center justify-between">
                  <span>{photo.exif.lens.split(' ')[1]}</span>
                  <span className="text-amber-500/90">{photo.exif.aperture} • {photo.exif.shutterSpeed} • ISO {photo.exif.iso}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Fullscreen & EXIF Inspector */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
            <div className={`max-w-5xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border p-6 sm:p-8 ${
              darkMode ? 'bg-[#0E1524] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-500">
                  <Camera className="w-4 h-4" />
                  <span>EXIF HUD INSPECTOR // {activePhoto.title}</span>
                </div>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/60 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 bg-black rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                  <img
                    src={activePhoto.imageUrl}
                    alt={activePhoto.title}
                    className="max-h-[60vh] w-auto object-contain mx-auto"
                  />
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div>
                    <span className="font-mono text-xs text-amber-500 font-semibold uppercase">{activePhoto.category}</span>
                    <h2 className="text-2xl font-bold font-sans tracking-tight mt-1">{activePhoto.title}</h2>
                    <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      <span>{activePhoto.location} ({activePhoto.coordinates})</span>
                    </p>
                  </div>

                  {/* Story */}
                  <div>
                    <h4 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">Narrative Context</h4>
                    <p className={`text-sm font-sans leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {activePhoto.story}
                    </p>
                  </div>

                  {/* Technical EXIF Table */}
                  <div className={`p-4 rounded-xl border font-mono text-xs space-y-2.5 ${
                    darkMode ? 'bg-[#121927]/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="text-[11px] text-amber-500 uppercase tracking-wider font-semibold pb-1 border-b border-slate-800/60">
                      Sensor & Glass Telemetry
                    </div>
                    <div className="flex justify-between"><span className="text-slate-400">Camera Body:</span><span className="text-slate-200 font-semibold">{activePhoto.exif.camera}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Optics:</span><span className="text-slate-200">{activePhoto.exif.lens}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Focal Length:</span><span className="text-slate-200">{activePhoto.exif.focalLength}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Aperture:</span><span className="text-amber-400">{activePhoto.exif.aperture}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Shutter Speed:</span><span className="text-slate-200">{activePhoto.exif.shutterSpeed}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">ISO:</span><span className="text-slate-200">{activePhoto.exif.iso}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Film Recipe:</span><span className="text-amber-400 font-medium">{activePhoto.exif.filmSimulation}</span></div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => setActivePhoto(null)}
                      className="px-4 py-2 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                    >
                      Close Inspector
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
