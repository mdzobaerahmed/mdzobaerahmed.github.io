import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Calendar, Clock, Tag, ArrowRight, X, Sparkles } from 'lucide-react';

export function BlogPage({ darkMode, onBack }) {
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: "smote-clinical-ml",
      title: "Tackling Severe Class Imbalance with SMOTE in Clinical ML",
      category: "Machine Learning",
      date: "Jan 15, 2025",
      readTime: "6 min read",
      summary:
        "Why accuracy is a deceptive metric when dealing with rare medical outcomes, and how synthetic minority oversampling paired with Macro F1-score evaluation builds trustworthy diagnostic classifiers.",
      content: `When dealing with cardiovascular disease prediction, true positive patients are overwhelmingly outnumbered by healthy individuals. A naive classifier predicting every patient as 'healthy' readily scores 88% overall accuracy while failing 100% of the individuals at immediate clinical risk.

### The Mechanism of SMOTE
Synthetic Minority Over-sampling Technique (SMOTE) overcomes random oversampling's overfitting vulnerabilities by synthesizing plausible synthetic samples along the $k$-nearest neighbor feature lines in minority feature space:

$$\\mathbf{x}_{new} = \\mathbf{x}_i + \\lambda (\\mathbf{x}_{zi} - \\mathbf{x}_i) \\quad \\text{where } \\lambda \\sim U(0, 1)$$

### Critical Implementation Rules
1. **Prevent Data Leakage:** Always perform SMOTE strictly within cross-validation folds on the training partition. Resampling prior to splitting causes synthetic artifacts to bleed into the validation test set, causing artificially inflated test performance.
2. **Optimize for Macro F1:** Rely on Macro-averaged F1 and Precision-Recall Area Under Curve (PR-AUC) rather than ROC-AUC or Raw Accuracy.
3. **Calibrate Decision Thresholds:** Tune probability decision boundaries according to healthcare utility penalties (false negatives carry significantly higher cost than false positives).`
    },
    {
      id: "framing-to-figma-ux",
      title: "From Framing to Figma: What Street Photography Taught Me About Product UX",
      category: "Product Management",
      date: "Dec 28, 2024",
      readTime: "5 min read",
      summary:
        "Good composition is the art of subtraction—eliminating unnecessary visual noise until only the core message remains. Designing intuitive digital products follows the exact same philosophy.",
      content: `In photography, amateur instincts tempt you to include everything in the frame. You want the monument, the sky, the passerby, and the vehicle. The resulting frame is cluttered; the viewer's eye wanders with no focal point to rest on.

Mastering photography begins when you realize composition is an act of subtraction.

### The Parallels in Product Design
When creating software interfaces, product managers frequently succumb to feature bloat. Every stakeholder demands their metric on the primary dashboard, resulting in cognitive overload for real users.

1. **Visual Hierarchy Directs Intent:** Just as aperture and depth of field create separation between subject and background, spacing and typography contrast guide users effortlessly toward key actions.
2. **Negative Space is Breathing Room:** Dead space is not wasted space. In a frame, negative space allows the eye to process contrast. In UI, white space isolates primary actions and reduces decision paralysis.
3. **Empathy Before Execution:** You cannot take a compelling street portrait without understanding human emotional subtext. You cannot build a winning product without genuine user empathy.`
    },
    {
      id: "fastapi-async-architecture",
      title: "Architecting High-Throughput APIs with FastAPI and Pydantic v2",
      category: "Software Engineering",
      date: "Nov 12, 2024",
      readTime: "7 min read",
      summary:
        "A practical look at asynchronous route handlers, dependency injection, declarative validation models, and automated Swagger/OpenAPI documentation.",
      content: `FastAPI has transformed the Python backend landscape by marrying asynchronous event loops (asyncio/uvicorn) with type-safe declarative validation (Pydantic).

### Why Async Matters for Microservices
Traditional synchronous frameworks block OS threads during I/O operations (database queries, network RPCs, file reading). FastAPI's asynchronous coroutines release the event loop back to the system while awaiting I/O completion:

\`\`\`python
@app.get("/api/v1/patients/{patient_id}", response_model=PatientResponse)
async def get_patient_profile(patient_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Patient).where(Patient.id == patient_id))
    patient = result.scalar_one_or_none()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient
\`\`\`

### Key Production Lessons
- **Dependency Injection for Auth and DB Sessions:** Use FastAPI's \`Depends()\` to cleanly isolate token verification and database lifespan management.
- **Pydantic v2 Performance:** Built on Rust-backed core validation, Pydantic v2 speeds up JSON serialization up to 5x-10x compared to v1.`
    },
    {
      id: "fujifilm-acros-monochrome",
      title: "Fujifilm Acros Film Simulation: Why I Shoot Black & White on the Streets of Dhaka",
      category: "Photography",
      date: "Oct 20, 2024",
      readTime: "4 min read",
      summary:
        "Removing color strips away the chaotic distraction of urban traffic, leaving behind pure architectural structure, shadow geometry, and raw human emotion.",
      content: `Dhaka is one of the most chromatic cities in the world. Rickshaw art, hand-painted truck murals, vibrant textiles, and neon signage flood every square meter with intense saturation.

Yet when you photograph Dhaka in high-saturation color, the color often becomes the only thing anyone sees.

### Finding Order in Chaos
Switching the Fujifilm X-T5 to Acros Monochrome with a Green or Yellow filter changes how you see:
- You stop looking for bright colors and start searching for light rays penetrating morning dust.
- You notice the geometric concrete repetitive forms of brutalist university campuses and pedestrian bridges.
- You capture the quiet contemplation in an elderly commuter's eyes rather than the loud paint of the bus behind them.

Monochrome strips the distraction so that the soul of the city remains.`
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
            ACTIVITIES // [05] BLOG & NOTES
          </span>
        </div>

        {/* Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>ESSAYS, ENGINEERING NOTES & VISUAL LOGS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-sans tracking-tight mb-4">
            Blog & Technical Writings
          </h1>
          <p className={`text-base sm:text-lg font-sans max-w-3xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Thoughts on scalable software engineering, clinical machine learning, digital product discovery, and the art of seeing through the camera lens.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`p-8 rounded-2xl border transition-all flex flex-col justify-between group ${
                darkMode 
                  ? 'bg-[#0E1524]/80 border-slate-800/80 hover:border-amber-500/40 shadow-xl shadow-black/20' 
                  : 'bg-white border-slate-200 hover:border-amber-500/50 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h2 className={`text-xl sm:text-2xl font-bold font-sans tracking-tight mb-3 transition-colors ${
                  darkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
                }`}>
                  {post.title}
                </h2>

                <p className={`text-sm font-sans leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {post.summary}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/50 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-amber-500 hover:text-amber-400 font-semibold transition-colors"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-slate-500 text-[11px] font-mono">By Md. Zobaer Ahmed</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Full Article Reader */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div 
              className={`max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border p-6 sm:p-10 shadow-2xl ${
                darkMode ? 'bg-[#0E1524] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/60">
                <div className="flex items-center gap-2 font-mono text-xs text-amber-500">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{selectedPost.category}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/60 transition-colors"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight mb-6">
                {selectedPost.title}
              </h2>

              <div className={`prose prose-invert max-w-none space-y-4 font-sans text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                darkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {selectedPost.content}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center justify-between font-mono text-xs text-slate-400">
                <span>Written by Md. Zobaer Ahmed</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-amber-500 hover:underline"
                >
                  Close Reader ✕
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
