import React, { useState } from 'react';
import { ArrowLeft, Film, MapPin, Calendar, Camera, Eye, Quote, Sparkles } from 'lucide-react';
import { photographyGallery } from '../data/portfolioData';

export function DocumentaryPage({ darkMode, onBack }) {
  const documentarySeries = [
    {
      id: "series-dhaka-transit",
      title: "Shadows of the Megacity: The Pedestrian Arteries of Dhaka",
      period: "2024 — 2025",
      location: "Dhaka, Bangladesh",
      curatorialStatement:
        "Dhaka is defined by extreme density, velocity, and resilience. This long-form visual investigation moves beyond stereotypical representations of traffic and focuses on individual thresholds—the micro-moments where commuters, rickshaw pullers, and street laborers carve out dignity and quiet reflection amidst immense urban velocity.",
      frames: [
        {
          title: "The Solitary Commuter",
          year: "2025",
          location: "Kawran Bazar Transit Corridor",
          imageUrl: "https://kwnnvkpelgficegjdqvt.supabase.co/storage/v1/object/public/portfolio-assets/Street_01.jpg",
          exif: "Fujifilm X-T5 • 35mm f/1.4 • 1/200s • ISO 200",
          narrative: "Morning light cuts through smog along the railway market. The commuter steps between tracks while vendors set up wicker baskets."
        },
        {
          title: "Evening Motion Silhouette",
          year: "2025",
          location: "Hatirjheel Eastern Bypass",
          imageUrl: "https://kwnnvkpelgficegjdqvt.supabase.co/storage/v1/object/public/portfolio-assets/Street_02.jpg",
          exif: "Fujifilm X-T5 • 35mm f/1.4 • 1/250s • ISO 320",
          narrative: "Dusk over the eastern transit artery. Commuters dissolve into dark silhouettes against reflective vehicle headlamps and bridge cables."
        }
      ]
    },
    {
      id: "series-brutalism",
      title: "Concrete & Rhythm: Architectural Form in Bengal",
      period: "2023 — 2024",
      location: "Dhaka & University Corridors",
      curatorialStatement:
        "An exploration of monumental institutional spaces and brutalist geometry. Inspired by Louis Kahn's philosophy of light and mass, these photographs examine how tropical sunlight carves sharp diagonals into concrete facades, transforming static architecture into living rhythms.",
      frames: [
        {
          title: "Vertical Tension & Shadows",
          year: "2025",
          location: "University Campus Structure",
          imageUrl: "https://kwnnvkpelgficegjdqvt.supabase.co/storage/v1/object/public/portfolio-assets/Md.%20Zobaer%20Ahmed_02.jpg",
          exif: "Fujifilm X-T5 • 18-55mm f/2.8-4 • 1/500s • ISO 100",
          narrative: "High-contrast architectural study. The stark verticality of the facade frames the sky while heavy shadows ground the structure in geometric balance."
        },
        {
          title: "Glass & Cloud Reflections",
          year: "2024",
          location: "Financial District Highrise",
          imageUrl: "https://kwnnvkpelgficegjdqvt.supabase.co/storage/v1/object/public/portfolio-assets/Md.%20Zobaer%20Ahmed_05.jpg",
          exif: "Fujifilm X-T5 • 18-55mm f/2.8-4 • 1/400s • ISO 160",
          narrative: "Reflections between modern glass curtains and shifting monsoon clouds. Curated for international exhibition tour in Europe."
        }
      ]
    },
    {
      id: "series-riverine",
      title: "Riverine Bengal: Horizons Along the Delta",
      period: "2024",
      location: "Coastal & Riverways, Bangladesh",
      curatorialStatement:
        "Water shapes the geography and spirit of Bangladesh. This series documents the peaceful expanse of river deltas—where fisherman boats navigate dawn fog and riverbanks quietly shift with seasonal currents.",
      frames: [
        {
          title: "The Delta Horizon",
          year: "2024",
          location: "Southern River Estuary",
          imageUrl: "https://kwnnvkpelgficegjdqvt.supabase.co/storage/v1/object/public/portfolio-assets/nature_01.jpg",
          exif: "Fujifilm X-T5 • 50-140mm f/2.8 • 1/320s • ISO 200",
          narrative: "A quiet study of texture, horizon mist, and riverine tranquility. Awarded 1st Runner-up at the 3rd DRMC National Nature Festival."
        }
      ]
    }
  ];

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
            PHOTOGRAPHY // [03] DOCUMENTARY
          </span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <Film className="w-4 h-4" />
            <span>VISUAL SOCIOLOGY & LONG-FORM ESSAYS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight mb-4">
            Documentary Photo Essays
          </h1>
          <p className={`text-base sm:text-lg font-sans max-w-3xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Multi-year documentary stories examining pedestrian density, brutalist institutional forms, and the delta ecosystems of Bangladesh through monochrome and deliberate framing.
          </p>
        </div>

        {/* Series Breakdown */}
        <div className="space-y-20">
          {documentarySeries.map((series, sIdx) => (
            <div
              key={series.id}
              className={`p-8 sm:p-12 rounded-3xl border transition-all ${
                darkMode ? 'bg-[#0E1524]/80 border-slate-800/80 shadow-2xl shadow-black/30' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              {/* Series Title & Curatorial Statement */}
              <div className="mb-10 pb-8 border-b border-slate-800/60">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs mb-3">
                  <span className="text-amber-500 uppercase font-semibold">Series 0{sIdx + 1}</span>
                  <div className="flex items-center gap-3 text-slate-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-amber-500" />{series.location}</span>
                    <span>•</span>
                    <span>{series.period}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight mb-4">
                  {series.title}
                </h2>

                <div className={`p-5 rounded-2xl border font-sans text-sm sm:text-base leading-relaxed italic relative ${
                  darkMode ? 'bg-[#0B0F17]/60 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  <Quote className="w-5 h-5 text-amber-500/40 absolute -top-2.5 left-4" />
                  <p className="pt-1">{series.curatorialStatement}</p>
                </div>
              </div>

              {/* Photo Frames in Series */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {series.frames.map((frame, fIdx) => (
                  <div
                    key={fIdx}
                    className={`rounded-2xl border overflow-hidden transition-all group flex flex-col justify-between ${
                      darkMode ? 'bg-[#121927]/60 border-slate-800 hover:border-amber-500/40' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="relative aspect-[4/3] bg-black overflow-hidden">
                      <img
                        src={frame.imageUrl}
                        alt={frame.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 font-mono text-[10px] px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-amber-400 border border-slate-700">
                        {frame.exif}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                        <span>{frame.location}</span>
                        <span className="text-amber-500">{frame.year}</span>
                      </div>
                      <h3 className="text-lg font-bold font-sans mb-2">
                        {frame.title}
                      </h3>
                      <p className={`text-xs sm:text-sm font-sans leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {frame.narrative}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
