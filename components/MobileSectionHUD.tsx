import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Code, 
  Radio,
  Activity
} from 'lucide-react';

interface MobileSectionHUDProps {
  sectionId: string;
}

const MobileSectionHUD: React.FC<MobileSectionHUDProps> = ({ sectionId }) => {
  const [isInView, setIsInView] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [sectionId]);

  useEffect(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const updateProgress = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const visibleTop = Math.max(0, windowHeight - rect.top);
        const visibleHeight = Math.min(visibleTop, elementHeight, windowHeight);
        const progress = Math.min(100, (visibleHeight / elementHeight) * 100);
        setSectionProgress(progress);
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, [sectionId]);

  const getSectionIcon = () => {
    switch (sectionId) {
      case 'home': return Rocket;
      case 'skills': return Code;
      case 'journey': return Activity;
      case 'projects': return Target;
      case 'contact': return Radio;
      default: return Activity;
    }
  };

  const getSectionTitle = () => {
    switch (sectionId) {
      case 'home': return 'LAUNCH';
      case 'skills': return 'SKILLS';
      case 'journey': return 'JOURNEY';
      case 'projects': return 'PROJECTS';
      case 'contact': return 'CONTACT';
      default: return 'SECTION';
    }
  };

  const getSectionColor = () => {
    switch (sectionId) {
      case 'home': return '#ef4444';
      case 'skills': return '#3b82f6';
      case 'journey': return '#10b981';
      case 'projects': return '#2dd4bf';
      case 'contact': return '#a855f7';
      default: return '#2dd4bf';
    }
  };

  const Icon = getSectionIcon();
  const title = getSectionTitle();
  const color = getSectionColor();

  if (!isInView) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-20 right-4 z-50 xl:hidden"
      >
        <div 
          className="bg-black/90 backdrop-blur-md border rounded-xl p-3 shadow-lg"
          style={{ borderColor: `${color}50` }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
            >
              <Icon className="w-3.5 h-3.5" style={{ color }} />
            </div>
            <div className="flex flex-col">
              <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                {title}
              </span>
              <span className="font-mono text-[9px] font-bold" style={{ color }}>
                {Math.round(sectionProgress)}%
              </span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-1 mt-2">
            <motion.div
              className="h-1 rounded-full"
              style={{ backgroundColor: color }}
              initial={{ width: 0 }}
              animate={{ width: `${sectionProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MobileSectionHUD;