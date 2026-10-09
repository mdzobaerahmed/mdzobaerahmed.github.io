import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, ArrowUp, Clock, MapPin, Sparkles, Download, Send, CheckCircle2, ArrowRight, Lock } from 'lucide-react';
import { profileData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon, InstagramIcon, FacebookIcon } from './Icons';
import { sendMessageNotificationEmail } from '../services/emailService';
import { addContactMessage } from '../services/dataService';

export function Footer({ darkMode, onNavigate }) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [currentDhakaTime, setCurrentDhakaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      try {
        const datePart = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        }).format(now);

        const timePart = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Dhaka',
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }).format(now);

        setCurrentDhakaTime(`${datePart} at ${timePart} (Dhaka, UTC+6)`);
      } catch {
        setCurrentDhakaTime(now.toLocaleString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const emailAddress = profileData.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    
    try {
      addContactMessage(formState);
      await sendMessageNotificationEmail(formState);
    } catch (err) {
      console.error("Message submission error:", err);
    }

    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className={`pt-24 pb-12 border-t transition-colors ${
      darkMode ? 'bg-[#090D15] border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Layout Matching User's Screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Column: Transmission Channel & Bio Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="font-mono text-xs text-amber-500 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>TRANSMISSION CHANNEL</span>
            </div>

            <h2 className={`text-4xl sm:text-5xl font-bold font-sans tracking-tight ${
              darkMode ? 'text-slate-100' : 'text-slate-900'
            }`}>
              Say Hello
            </h2>

            <p className={`text-base font-sans leading-relaxed ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Have a project idea, want to order a photo print, or just want to connect? Send a message and let's talk.
            </p>

            {/* Direct Information Items */}
            <div className="pt-4 space-y-3 font-sans text-sm">
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a 
                  href={`mailto:${emailAddress}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {emailAddress}
                </a>
              </div>
            </div>

            {/* Academic CV download button */}
            <div className="pt-2">
              <a
                href="/Academic_CV.pdf"
                download="Md_Zobaer_Ahmed_CV.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 bg-slate-900/60 hover:border-amber-400 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-amber-500" />
                <span>Download Academic CV (PDF)</span>
              </a>
            </div>

            {/* Connect Socially */}
            <div className="pt-6">
              <span className="block font-mono text-[11px] text-slate-500 uppercase tracking-wider mb-3 font-semibold">
                CONNECT SOCIALLY
              </span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/mdzobaerahmed" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 rounded-xl border border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://linkedin.com/in/mdzobaerahmed" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 rounded-xl border border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.facebook.com/mdzobaerahmed31" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 rounded-xl border border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com/mdzobaerahmed" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-2.5 rounded-xl border border-slate-800 bg-[#0E1524]/60 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  title="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form Matching User's Screenshot */}
          <div className="lg:col-span-7">
            <div className={`p-7 sm:p-9 rounded-3xl border transition-all ${
              darkMode 
                ? 'bg-[#0E1524]/85 border-slate-800/90 shadow-2xl shadow-black/40' 
                : 'bg-white border-slate-200 shadow-xl'
            }`}>
              
              {formSubmitted ? (
                <div className="py-16 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-sans text-slate-100">
                    Message Transmitted!
                  </h3>
                  <p className="font-sans text-sm text-slate-400 max-w-md mx-auto">
                    Thank you for reaching out. Md. Zobaer Ahmed has received your message and will reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Row 1: Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Md. Zobaer Ahmed"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none transition-colors ${
                          darkMode 
                            ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="mdzobaerahmed31@gmail.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none transition-colors ${
                          darkMode 
                            ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' 
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Row 2: Subject */}
                  <div>
                    <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Fine Art Acquisition / Systems Architecture Contract"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none transition-colors ${
                        darkMode 
                          ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                      }`}
                    />
                  </div>

                  {/* Row 3: Your Message */}
                  <div>
                    <label className="block font-mono text-[11px] text-slate-400 uppercase tracking-wider mb-2 font-semibold">
                      YOUR MESSAGE
                    </label>
                    <textarea
                      rows="4"
                      required
                      placeholder="Outline details, requirements, budget benchmarks, or photo acquisition inquiries..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none transition-colors ${
                        darkMode 
                          ? 'bg-[#090D14] border-slate-800 text-white focus:border-amber-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-600'
                      }`}
                    ></textarea>
                  </div>

                  {/* Submit Button in Signature Amber Accent */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl font-sans text-sm font-bold tracking-wide transition-all bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-[0.99] shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Submit Message</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Footer Bottom Bar: Live Dhaka Time (Left) & Copyright (Right) */}
        <div className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs ${
          darkMode ? 'border-slate-800/60 text-slate-400' : 'border-slate-200 text-slate-600'
        }`}>
          
          {/* Left: Real-time Dhaka Clock */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            <span>{currentDhakaTime || 'Loading local time...'}</span>
          </div>

          {/* Right: Copyright, Admin & Back to Top */}
          <div className="flex items-center gap-3.5">
            <span>© 2026 Md. Zobaer Ahmed</span>
            {onNavigate && (
              <button
                onClick={() => onNavigate('admin')}
                className="hover:text-amber-400 text-slate-500 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                title="Admin Command Center"
              >
                <Lock className="w-3 h-3 text-slate-500 hover:text-amber-500" />
                <span>Admin</span>
              </button>
            )}
            <button
              onClick={scrollToTop}
              className={`p-1.5 px-2.5 rounded-lg border transition-colors flex items-center gap-1 text-[11px] cursor-pointer ${
                darkMode 
                  ? 'border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white' 
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
              title="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOP</span>
            </button>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
