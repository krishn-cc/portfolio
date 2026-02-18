import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Zap, 
  Clock, 
  Users, 
  Gauge, 
  Radio,
  Shield,
  Cpu,
  Database,
  Code,
  Send,
  Activity,
  TrendingUp,
  Eye,
  Heart,
  Globe
} from 'lucide-react';

interface SectionHUDProps {
  sectionId: string;
  sectionName: string;
  position: 'left' | 'right';
}

const SectionHUD: React.FC<SectionHUDProps> = ({ sectionId, sectionName, position }) => {
  const [isInView, setIsInView] = useState(false);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [timeInSection, setTimeInSection] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          interval = setInterval(() => {
            setTimeInSection(prev => prev + 1);
          }, 1000);
        } else {
          if (interval) clearInterval(interval);
          setTimeInSection(0);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
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

  const getSectionData = () => {
    switch (sectionId) {
      case 'home':
        return {
          title: 'LAUNCH PAD',
          stats: [
            { icon: Rocket, label: 'Launch Energy', value: Math.round(Math.random() * 20 + 80), unit: '%', color: '#ef4444' },
            { icon: Target, label: 'Trajectory', value: Math.round(sectionProgress), unit: '%', color: '#2dd4bf' },
            { icon: Clock, label: 'Mission Time', value: timeInSection, unit: 's', color: '#3b82f6' },
            { icon: Shield, label: 'Systems', value: 'ONLINE', unit: '', color: '#10b981' }
          ]
        };
      case 'skills':
        return {
          title: 'TECH SECTORS',
          stats: [
            { icon: Code, label: 'Languages', value: 5, unit: '', color: '#3b82f6' },
            { icon: Database, label: 'Backends', value: 3, unit: '', color: '#f97316' },
            { icon: Cpu, label: 'Frameworks', value: 3, unit: '', color: '#a855f7' },
            { icon: Activity, label: 'Scan Progress', value: Math.round(sectionProgress), unit: '%', color: '#2dd4bf' }
          ]
        };
      case 'journey':
        return {
          title: 'TIMELINE',
          stats: [
            { icon: TrendingUp, label: 'Growth Rate', value: 95, unit: '%', color: '#10b981' },
            { icon: Eye, label: 'Exploration', value: Math.round(sectionProgress), unit: '%', color: '#2dd4bf' },
            { icon: Heart, label: 'Passion Level', value: 100, unit: '%', color: '#ef4444' },
            { icon: Clock, label: 'Years Journey', value: 2, unit: '', color: '#3b82f6' }
          ]
        };
      case 'projects':
        return {
          title: 'SPACE STATIONS',
          stats: [
            { icon: Rocket, label: 'Active Projects', value: 3, unit: '', color: '#2dd4bf' },
            { icon: Zap, label: 'Innovation', value: 98, unit: '%', color: '#fbbf24' },
            { icon: Globe, label: 'Impact Reach', value: Math.round(Math.random() * 30 + 70), unit: '%', color: '#10b981' },
            { icon: Target, label: 'View Progress', value: Math.round(sectionProgress), unit: '%', color: '#3b82f6' }
          ]
        };
      case 'contact':
        return {
          title: 'COMMS CENTER',
          stats: [
            { icon: Send, label: 'Signal Strength', value: 100, unit: '%', color: '#10b981' },
            { icon: Radio, label: 'Channels Open', value: 4, unit: '', color: '#2dd4bf' },
            { icon: Users, label: 'Connections', value: Math.round(Math.random() * 50 + 150), unit: '', color: '#a855f7' },
            { icon: Activity, label: 'Transmission', value: Math.round(sectionProgress), unit: '%', color: '#ef4444' }
          ]
        };
      default:
        return { title: 'UNKNOWN', stats: [] };
    }
  };

  const data = getSectionData();

  if (!isInView) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: position === 'left' ? -100 : 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: position === 'left' ? -100 : 100, scale: 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-1/2 -translate-y-1/2 z-40 hidden xl:block ${
        position === 'left' ? 'left-6' : 'right-6'
      }`}
    >
      <div className="bg-black/90 backdrop-blur-md border border-teal-400/30 rounded-2xl p-4 w-64 shadow-[0_0_30px_rgba(45,212,191,0.2)]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-teal-400/20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center"
          >
            <Target className="w-4 h-4 text-teal-400" />
          </motion.div>
          <div>
            <h3 className="text-teal-400 font-black text-xs uppercase tracking-wider">
              {data.title}
            </h3>
            <p className="text-white/40 font-mono text-[9px] uppercase">
              Sector {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3">
          {data.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02] border border-white/5 hover:border-teal-400/20 transition-all group"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20`, border: `1px solid ${stat.color}30` }}
              >
                <stat.icon 
                  className="w-4 h-4" 
                  style={{ color: stat.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-[9px] uppercase tracking-wider font-bold truncate">
                    {stat.label}
                  </span>
                  <span 
                    className="font-mono text-sm font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}{stat.unit}
                  </span>
                </div>
                {/* Progress bar for percentage values */}
                {stat.unit === '%' && typeof stat.value === 'number' && (
                  <div className="w-full bg-white/5 rounded-full h-1 mt-1">
                    <motion.div
                      className="h-1 rounded-full"
                      style={{ backgroundColor: stat.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-teal-400/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-teal-400"
              />
              <span className="text-white/40 font-mono text-[8px] uppercase">
                MONITORING
              </span>
            </div>
            <span className="text-teal-400 font-mono text-[8px] font-bold">
              {timeInSection}s
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SectionHUD;