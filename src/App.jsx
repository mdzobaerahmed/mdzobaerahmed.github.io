import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EngineeringSection } from './components/EngineeringSection';
import { PhotographyGallery } from './components/PhotographyGallery';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

// Dedicated Activity Pages
import { SkillsPage } from './pages/SkillsPage';
import { AcademicProjectsPage } from './pages/AcademicProjectsPage';
import { PublicationsPage } from './pages/PublicationsPage';
import { ExtraCurricularPage } from './pages/ExtraCurricularPage';
import { BlogPage } from './pages/BlogPage';

// Dedicated Photography Pages
import { ExhibitionGalleryPage } from './pages/ExhibitionGalleryPage';
import { PrintSalePage } from './pages/PrintSalePage';
import { DocumentaryPage } from './pages/DocumentaryPage';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // default dark mode
  });

  // Filter states that can be toggled via Navbar dropdowns or in-page pills
  const [experienceTab, setExperienceTab] = useState('all'); // 'all', 'work', 'education'
  const [achievementsTab, setAchievementsTab] = useState('all'); // 'all', 'awards', 'certifications'
  const [activitiesTab, setActivitiesTab] = useState('all');

  // Page Routing State
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/')) {
      return hash.replace('#/', '');
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/')) {
        setCurrentPage(hash.replace('#/', ''));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navigate = (page) => {
    if (page === 'home') {
      window.location.hash = '';
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = `#/${page}`;
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateAndScroll = (targetId) => {
    if (currentPage !== 'home') {
      window.location.hash = '';
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.querySelector(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 film-grain ${
      darkMode ? 'bg-[#0B0F17] text-slate-100' : 'bg-[#FAFAFA] text-slate-900'
    }`}>
      {/* Top Navigation */}
      <Navbar 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        currentPage={currentPage}
        navigate={navigate}
        navigateAndScroll={navigateAndScroll}
        experienceTab={experienceTab}
        setExperienceTab={setExperienceTab}
        achievementsTab={achievementsTab}
        setAchievementsTab={setAchievementsTab}
        activitiesTab={activitiesTab}
        setActivitiesTab={setActivitiesTab}
      />

      {/* Conditional Activity Page Rendering */}
      {currentPage === 'skills' && (
        <SkillsPage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {currentPage === 'academic-projects' && (
        <AcademicProjectsPage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {currentPage === 'publications' && (
        <PublicationsPage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {currentPage === 'extra-curricular' && (
        <ExtraCurricularPage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {currentPage === 'blog' && (
        <BlogPage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {/* Conditional Photography Page Rendering */}
      {(currentPage === 'exhibition-gallery' || currentPage === 'exhibition' || currentPage === 'photography-gallery') && (
        <ExhibitionGalleryPage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {currentPage === 'print-sale' && (
        <PrintSalePage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {currentPage === 'documentary' && (
        <DocumentaryPage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {/* Admin Management Dashboard */}
      {currentPage === 'admin' && (
        <AdminPage darkMode={darkMode} onBack={() => navigate('home')} />
      )}

      {/* Main Home Portfolio View */}
      {currentPage === 'home' && (
        <>
          {/* Hero Section */}
          <Hero 
            darkMode={darkMode}
            onExploreCode={() => navigateAndScroll('#activities')}
            onExploreLens={() => navigateAndScroll('#gallery')}
          />

          {/* Main Content Sections In User's Exact Order */}
          <main className="space-y-16">
            {/* 01-04: About Me, Work Experience, Education, Achievements */}
            <AboutSection 
              darkMode={darkMode}
              experienceTab={experienceTab}
              setExperienceTab={setExperienceTab}
              achievementsTab={achievementsTab}
              setAchievementsTab={setAchievementsTab}
              activitiesTab={activitiesTab}
              setActivitiesTab={setActivitiesTab}
              onNavigate={navigate}
              navigateAndScroll={navigateAndScroll}
            />

            {/* 05: Activities // Academic Projects */}
            <EngineeringSection 
              darkMode={darkMode} 
              onNavigateToAcademicProjects={() => navigate('academic-projects')}
              onNavigate={navigate}
            />

            {/* 06: Photo Gallery // Exhibition, Print Sale, Documentary */}
            <PhotographyGallery 
              darkMode={darkMode} 
              onNavigateToExhibition={() => navigate('exhibition-gallery')}
              onNavigate={navigate}
            />
          </main>
        </>
      )}

      {/* Footer & Contact */}
      <Footer darkMode={darkMode} onNavigate={navigate} />
    </div>
  );
}

export default App;
