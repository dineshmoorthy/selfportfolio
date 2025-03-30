import React, { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import ProfileOverview from "@/components/ProfileOverview";
import TabNavigation from "@/components/TabNavigation";
import Experience from "@/components/tabs/Experience";
import Skills from "@/components/tabs/Skills";
import Education from "@/components/tabs/Education";
import Achievements from "@/components/tabs/Achievements";
import Projects from "@/components/tabs/Projects";
import FutureProjects from "@/components/tabs/FutureProjects";
import Resume from "@/components/tabs/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { portfolioData } from "@/data/portfolio-data";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [isLoaded, setIsLoaded] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  // Simulate a loading sequence
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);
  
  // Scroll to section when anchor links are clicked
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const tabId = hash.substring(1);
        const validTabs = ["experience", "skills", "education", "achievements", "projects", "futureProjects", "resume", "contact"];
        
        if (validTabs.includes(tabId)) {
          setActiveTab(tabId);
          
          setTimeout(() => {
            const element = document.getElementById(tabId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
        }
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col">
      {/* Loading overlay */}
      <div className={`fixed inset-0 z-50 bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="relative">
          <div className="h-1 w-52 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-full animate-scan" style={{width: '100%'}}></div>
          </div>
          <div className="font-mono text-center">
            <div className="text-sm text-gray-500 mb-1">INITIALIZING SYSTEM</div>
            <div className="text-lg bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent font-bold">PORTFOLIO.SYS</div>
          </div>
        </div>
      </div>
      
      {/* Background noise texture (subtle) */}
      <div className="fixed inset-0 bg-noise opacity-[0.02] mix-blend-overlay pointer-events-none"></div>
      
      {/* Scan lines */}
      <div className="fixed inset-0 bg-scan-lines opacity-10 pointer-events-none z-10"></div>
      
      {/* Main content */}
      <div className={`flex flex-col w-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} ref={mainContentRef}>
        <Header profile={portfolioData.profile} />
        
        {/* Add a spacer so the fixed header doesn't overlap content */}
        <div className="pt-20"></div>
        
        <ProfileOverview profile={portfolioData.profile} />
        
        <div id="experience" className="pt-12 -mt-12"></div> {/* Anchor point */}
        <TabNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <section className="container mx-auto px-4 pb-16 relative">
          {/* Content background */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black"></div>
          
          {/* Tab content with cyberpunk styles */}
          <div className="relative z-10">
            {activeTab === "experience" && <Experience experiences={portfolioData.experiences} />}
            {activeTab === "skills" && <Skills skillCategories={portfolioData.skillCategories} tools={portfolioData.tools} />}
            {activeTab === "education" && <Education education={portfolioData.education} />}
            {activeTab === "achievements" && <Achievements achievements={portfolioData.achievements} />}
            {activeTab === "projects" && <Projects projects={portfolioData.projects} />}
            {activeTab === "futureProjects" && <FutureProjects futureProjects={portfolioData.futureProjects} />}
            {activeTab === "resume" && <Resume profile={portfolioData.profile} />}
          </div>
          
          {/* Decorative horizontal line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        </section>
        
        <div id="contact" className="pt-12 -mt-12"></div> {/* Anchor point */}
        <Contact profile={portfolioData.profile} />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
