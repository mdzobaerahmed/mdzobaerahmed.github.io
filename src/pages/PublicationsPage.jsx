import React from 'react';
import { ArrowLeft, BookOpen, FileText, ExternalLink, Mail, Award, CheckCircle2 } from 'lucide-react';

export function PublicationsPage({ darkMode, onBack }) {
  const publications = [
    {
      type: "Research Paper (Preprint / Under Review)",
      title: "Evaluating Synthetic Resampling Strategies in Imbalanced Clinical Prognostics: A Comparative Empirical Study",
      authors: "Md. Zobaer Ahmed, Research Collaborators, United International University",
      venue: "Preprint submitted to Healthcare Informatics & Machine Learning Track",
      year: "2024–2025",
      status: "Manuscript in Preparation",
      abstract:
        "Medical informatics datasets intrinsically suffer from severe positive-class scarcity. In cardiovascular risk diagnostics, standard objective functions disproportionately penalize minority errors, yielding deceptively high accuracies but unacceptable recall. This empirical investigation benchmarks Synthetic Minority Over-sampling Technique (SMOTE), ADASYN, and Tomek Links across 200-estimator Random Forest ensembles and Logistic Regressors. Findings demonstrate that controlled SMOTE boundary interpolation elevates macro F1-score from 68.2% to 89.4% while preserving false-positive calibration across 10-fold cross-validation.",
      keywords: ["Class Imbalance", "SMOTE Resampling", "Clinical Diagnostics", "Random Forest", "Macro F1-Score"],
      doi: "Under Peer Review",
      link: null
    },
    {
      type: "Photographic & Sociological Monograph",
      title: "Urban Spatial Dynamics and Transit Silhouettes: A Visual Monograph of Contemporary Dhaka",
      authors: "Md. Zobaer Ahmed",
      venue: "International Exhibition Tour (Greece & Scotland Curation)",
      year: "2024–2025",
      status: "Curated & Exhibited Internationally",
      abstract:
        "An architectural and documentary photo-essay captured with the Fujifilm X-T5 and Fujinon 35mm f/1.4 lens across Dhaka's densely populated northern and eastern corridors. Exploring high-contrast monochrome tones and Acros film simulation, the monograph documents human resilience, pedestrian threshold moments, and geometric tension amidst brutalist concrete structures.",
      keywords: ["Visual Sociology", "Street Photography", "Fujifilm X-T5", "Dhaka Urbanism", "Acros Monochrome"],
      doi: "Exhibition Catalog 2024",
      link: null
    }
  ];

  return (
    <div className={`min-h-screen py-24 sm:py-28 ${darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
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
            ACTIVITIES // [03] PUBLICATIONS
          </span>
        </div>

        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>SCHOLARLY INQUIRY & RESEARCH ARCHIVES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight mb-4">
            Publications & Research
          </h1>
          <p className={`text-base sm:text-lg font-sans max-w-3xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Scholarly manuscripts, machine learning research investigations, and visual sociological monographs created at United International University and exhibited internationally.
          </p>
        </div>

        {/* Publications List */}
        <div className="space-y-10 mb-16">
          {publications.map((pub, idx) => (
            <div
              key={idx}
              className={`p-8 sm:p-10 rounded-2xl border transition-all ${
                darkMode ? 'bg-[#0E1524]/80 border-slate-800/80 shadow-xl shadow-black/20' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800/60">
                <span className="font-mono text-xs text-amber-500 font-semibold tracking-wide uppercase">
                  {pub.type}
                </span>
                <span className={`text-[11px] font-mono px-3 py-1 rounded-full border self-start sm:self-auto ${
                  darkMode ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' : 'border-amber-500/50 bg-amber-50 text-amber-800'
                }`}>
                  {pub.status}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-3">
                {pub.title}
              </h2>

              <p className={`text-xs sm:text-sm font-sans mb-2 font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {pub.authors}
              </p>

              <p className={`text-xs font-mono mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {pub.venue} • {pub.year}
              </p>

              <div className="mb-6">
                <h3 className="font-mono text-xs text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                  Abstract / Overview
                </h3>
                <p className={`text-sm font-sans leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {pub.abstract}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/60 flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="text-slate-500 text-[11px] uppercase mr-2 font-semibold">Keywords:</span>
                {pub.keywords.map((kw, kIdx) => (
                  <span
                    key={kIdx}
                    className={`px-3 py-1 rounded-lg border ${
                      darkMode 
                        ? 'border-slate-800 bg-slate-900/80 text-slate-300' 
                        : 'border-slate-200 bg-slate-100 text-slate-700'
                    }`}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Collaborative Callout */}
        <div className={`p-8 rounded-2xl border text-center max-w-3xl mx-auto font-sans ${
          darkMode ? 'bg-[#0E1524]/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <h3 className="text-xl font-bold mb-2">Interested in Research Collaboration?</h3>
          <p className={`text-sm mb-6 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Always open to academic research, computational biology, clinical machine learning, or documentary art collaborations.
          </p>
          <a
            href="mailto:mdzobaerahmed31@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border font-mono text-xs text-amber-500 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 transition-all font-semibold"
          >
            <Mail className="w-4 h-4" />
            <span>mdzobaerahmed31@gmail.com</span>
          </a>
        </div>

      </div>
    </div>
  );
}

export default PublicationsPage;
