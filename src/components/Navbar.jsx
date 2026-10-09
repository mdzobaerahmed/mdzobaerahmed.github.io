import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Menu, X, ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/portfolioData';

export function Navbar({ 
  darkMode, 
  setDarkMode,
  currentPage = 'home',
  navigate,
  navigateAndScroll,
  experienceTab,
  setExperienceTab,
  achievementsTab,
  setAchievementsTab,
  activitiesTab,
  setActivitiesTab
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // 'Experience' | 'Achievements' | 'Activities' | 'Photography'
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollTo = (href) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    if (navigateAndScroll) {
      navigateAndScroll(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { 
      name: 'Home', 
      href: '#hero',
      action: () => {
        if (navigate) navigate('home');
        else scrollTo('#hero');
      }
    },
    { 
      name: 'About', 
      href: '#about',
      action: () => {
        if (navigateAndScroll) navigateAndScroll('#about');
        else scrollTo('#about');
      }
    },
    { 
      name: 'Experience', 
      href: '#experience',
      hasDropdown: true,
      options: [
        { 
          label: 'Work Experience', 
          action: () => {
            if (setExperienceTab) setExperienceTab('work');
            if (navigateAndScroll) navigateAndScroll('#experience');
            else scrollTo('#experience');
          } 
        },
        { 
          label: 'Education', 
          action: () => {
            if (setExperienceTab) setExperienceTab('education');
            if (navigateAndScroll) navigateAndScroll('#education');
            else scrollTo('#education');
          } 
        }
      ]
    },
    { 
      name: 'Achievements', 
      href: '#achievements',
      hasDropdown: true,
      options: [
        { 
          label: 'Certifications', 
          action: () => {
            if (setAchievementsTab) setAchievementsTab('certifications');
            if (navigateAndScroll) navigateAndScroll('#certifications');
            else scrollTo('#certifications');
          } 
        },
        { 
          label: 'Awards', 
          action: () => {
            if (setAchievementsTab) setAchievementsTab('awards');
            if (navigateAndScroll) navigateAndScroll('#awards');
            else scrollTo('#awards');
          } 
        }
      ]
    },
    { 
      name: 'Activities', 
      href: '#activities',
      hasDropdown: true,
      options: [
        { 
          label: 'Skills', 
          action: () => {
            if (navigate) navigate('skills');
          } 
        },
        { 
          label: 'Academic Projects', 
          action: () => {
            if (navigate) navigate('academic-projects');
          } 
        },
        { 
          label: 'Publications', 
          action: () => {
            if (navigate) navigate('publications');
          } 
        },
        { 
          label: 'Extra Curricular Activities', 
          action: () => {
            if (navigate) navigate('extra-curricular');
          } 
        },
        { 
          label: 'Blog', 
          action: () => {
            if (navigate) navigate('blog');
          } 
        }
      ]
    },
    { 
      name: 'Photography', 
      href: '#gallery',
      hasDropdown: true,
      options: [
        { 
          label: 'Exhibition Gallery', 
          action: () => {
            if (navigate) navigate('exhibition-gallery');
          } 
        },
        { 
          label: 'Print Sale', 
          action: () => {
            if (navigate) navigate('print-sale');
          } 
        },
        { 
          label: 'Documentary', 
          action: () => {
            if (navigate) navigate('documentary');
          } 
        }
      ]
    },
    { 
      name: 'Contact', 
      href: '#contact',
      action: () => {
        if (navigateAndScroll) navigateAndScroll('#contact');
        else scrollTo('#contact');
      }
    }
  ];

  const handleDropdownToggle = (itemName, e) => {
    e.preventDefault();
    if (openDropdown === itemName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(itemName);
    }
  };

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'py-3 backdrop-blur-xl border-b ' + (darkMode ? 'bg-[#0B0F17]/85 border-slate-800/80 shadow-lg shadow-black/20' : 'bg-white/85 border-slate-200/80 shadow-sm')
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Original Minimal Monogram Logo & Styling */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                if (navigate) navigate('home');
                else scrollTo('#hero');
              }}
              className="group flex items-center gap-2.5 font-sans tracking-tight cursor-pointer text-left"
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 ${
                darkMode 
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 group-hover:border-amber-400 group-hover:bg-amber-500/20' 
                  : 'border-amber-600/40 bg-amber-500/10 text-amber-700 group-hover:border-amber-600'
              }`}>
                MZA
              </div>
              <span className={`font-bold text-sm sm:text-base tracking-tight transition-colors ${
                darkMode ? 'text-slate-100 group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600'
              }`}>
                MD. ZOBAER AHMED
              </span>
            </button>
          </div>

          {/* Center Links with Interactive Click Dropdowns */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-4 text-xs font-mono tracking-wide">
            {navItems.map((item) => {
              const isOpen = openDropdown === item.name;

              if (item.hasDropdown) {
                const isItemActive = 
                  (item.name === 'Activities' && ['skills', 'academic-projects', 'publications', 'extra-curricular', 'blog'].includes(currentPage)) ||
                  ((item.name === 'Photography' || item.name === 'Photo Gallery' || item.name === 'Gallery') && ['exhibition-gallery', 'print-sale', 'documentary'].includes(currentPage)) ||
                  (item.name === 'Experience' && experienceTab !== 'all') ||
                  (item.name === 'Achievements' && achievementsTab !== 'all');

                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={(e) => handleDropdownToggle(item.name, e)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors cursor-pointer ${
                        isOpen || isItemActive
                          ? (darkMode ? 'text-amber-400 font-semibold' : 'text-amber-600 font-semibold')
                          : (darkMode ? 'text-slate-400 hover:text-slate-100' : 'text-slate-600 hover:text-slate-900')
                      }`}
                    >
                      <span>{item.name}</span>
                      {isOpen ? (
                        <ChevronUp className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </button>

                    {/* Dropdown Menu (Matches User's Screenshot & Current Theme) */}
                    {isOpen && (
                      <div className={`absolute top-full left-0 mt-2 w-56 rounded-xl border py-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                        darkMode 
                          ? 'bg-[#101726]/95 border-slate-800 text-slate-200 shadow-black/60' 
                          : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-200/50'
                      }`}>
                        {item.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => {
                              opt.action();
                              setOpenDropdown(null);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs font-sans font-medium transition-colors flex items-center justify-between ${
                              darkMode 
                                ? 'hover:bg-slate-800/80 hover:text-amber-400 text-slate-200' 
                                : 'hover:bg-slate-50 hover:text-amber-600 text-slate-800'
                            }`}
                          >
                            <span>{opt.label}</span>
                            <span className="text-[10px] text-slate-500 font-mono">→</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.action) item.action();
                    else scrollTo(item.href);
                    setOpenDropdown(null);
                  }}
                  className={`transition-colors duration-200 cursor-pointer px-1 py-1 font-mono text-xs ${
                    item.name === 'Home' && currentPage === 'home'
                      ? (darkMode ? 'text-amber-400 font-semibold' : 'text-amber-600 font-semibold')
                      : (darkMode ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-600')
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Live Status & Theme Toggle */}
          <div className="flex items-center gap-3">


            {/* Dark / Light Toggle Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark and light theme"
              className={`p-2 rounded-lg border transition-all duration-300 flex items-center justify-center ${
                darkMode 
                  ? 'border-slate-800 bg-slate-900/60 text-slate-300 hover:text-amber-400 hover:border-slate-700' 
                  : 'border-slate-200 bg-white text-slate-700 hover:text-amber-600 hover:border-slate-300 shadow-xs'
              }`}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg border transition-colors ${
                darkMode ? 'border-slate-800 bg-slate-900/50 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
              }`}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-6 transition-all max-h-[85vh] overflow-y-auto ${
          darkMode ? 'bg-[#0B0F17]/95 border-slate-800 text-slate-200' : 'bg-white/95 border-slate-200 text-slate-800'
        }`}>
          <div className="flex flex-col gap-2.5 font-mono text-xs">
            {navItems.map((item) => (
              <div key={item.name} className="py-1">
                {item.hasDropdown ? (
                  <div className="space-y-2">
                    <div className="text-amber-400 font-semibold text-xs tracking-wider uppercase">{item.name}</div>
                    <div className="pl-3.5 space-y-2 border-l border-amber-500/30">
                      {item.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            opt.action();
                            setMobileMenuOpen(false);
                          }}
                          className={`block py-1 text-xs text-left w-full font-sans transition-colors cursor-pointer ${
                            darkMode ? 'text-slate-300 hover:text-amber-400' : 'text-slate-700 hover:text-amber-600'
                          }`}
                        >
                          • {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (item.action) item.action();
                      else scrollTo(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className={`transition-colors flex items-center justify-between w-full text-left py-2 px-1 text-xs font-semibold cursor-pointer ${
                      darkMode ? 'text-slate-200 hover:text-amber-400' : 'text-slate-800 hover:text-amber-600'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
