import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Activity, 
  Wifi, 
  Zap, 
  Radio, 
  Gauge,
  Target,
  TrendingUp,
  Shield,
  Signal,
  Users,
  Clock,
  Rocket,
  Sparkles,
  Eye
} from 'lucide-react';

interface MissionControlFrameProps {
  children: React.ReactNode;
}

const MissionControlFrame: React.FC<MissionControlFrameProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [missionTime, setMissionTime] = useState(0);
  const [visitorCount, setVisitorCount] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(100);
  
  const { scrollYProgress } = useScroll();
  const systemPower = useTransform(scrollYProgress, [0, 1], [85, 100]);

  // Initialize visitor count from localStorage
  useEffect(() => {
    const storedVisits = localStorage.getItem('portfolio_visits');
    const visits = storedVisits ? parseInt(storedVisits, 10) : 0;
    const newVisitCount = visits + 1;
    setVisitorCount(newVisitCount);
    localStorage.setItem('portfolio_visits', newVisitCount.toString());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setMissionTime(prev => prev + 1);
      // Random energy fluctuation for fun
      setEnergyLevel(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 2)));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatMissionTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      {/* Corner Brackets - Responsive */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Top Left */}
        <svg className="absolute top-2 left-2 sm:top-4 sm:left-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" viewBox="0 0 80 80">
          <motion.path
            d="M 5 25 L 5 5 L 25 5"
            stroke="rgba(45, 212, 191, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M 10 30 L 10 10 L 30 10"
            stroke="rgba(45, 212, 191, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </svg>

        {/* Top Right */}
        <svg className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" viewBox="0 0 80 80">
          <motion.path
            d="M 75 25 L 75 5 L 55 5"
            stroke="rgba(45, 212, 191, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M 70 30 L 70 10 L 50 10"
            stroke="rgba(45, 212, 191, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </svg>

        {/* Bottom Left */}
        <svg className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" viewBox="0 0 80 80">
          <motion.path
            d="M 5 55 L 5 75 L 25 75"
            stroke="rgba(45, 212, 191, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M 10 50 L 10 70 L 30 70"
            stroke="rgba(45, 212, 191, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </svg>

        {/* Bottom Right */}
        <svg className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" viewBox="0 0 80 80">
          <motion.path
            d="M 75 55 L 75 75 L 55 75"
            stroke="rgba(45, 212, 191, 0.6)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.path
            d="M 70 50 L 70 70 L 50 70"
            stroke="rgba(45, 212, 191, 0.3)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </svg>
      </div>

      {/* Top HUD Bar - Responsive */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed top-0 left-0 right-0 h-12 sm:h-14 md:h-16 bg-gradient-to-b from-black/90 via-black/70 to-transparent backdrop-blur-sm border-b border-teal-400/20 z-40 px-2 sm:px-4 md:px-6"
      >
        <div className="h-full flex items-center justify-between max-w-[2000px] mx-auto">
          {/* Left Section - Visitor Count */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]"
            />
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 rounded-full bg-teal-400/10 border border-teal-400/30">
              <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" />
              <span className="text-teal-400 font-mono text-[9px] sm:text-[10px] md:text-xs font-bold">
                {visitorCount.toString().padStart(4, '0')}
              </span>
              <span className="text-teal-400/60 font-mono text-[7px] sm:text-[8px] md:text-[9px] hidden sm:inline">
                VISITORS
              </span>
            </div>
            <div className="h-3 sm:h-4 w-px bg-teal-400/30 hidden md:block"></div>
            <span className="text-white/70 font-mono text-[8px] sm:text-[9px] md:text-[10px] hidden md:inline">
              DWK-MISSION-CTRL
            </span>
          </div>

          {/* Center Section - Mission Logo */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/5 border border-teal-400/20">
            <Rocket className="w-4 h-4 text-teal-400" />
            <span className="text-teal-400 font-black text-[10px] uppercase tracking-wider">
              Space Command
            </span>
          </div>

          {/* Right Section - System Time */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded bg-teal-400/10">
              <Signal className="w-3 h-3 text-teal-400" />
              <span className="text-teal-400 font-mono text-[9px] font-bold">ONLINE</span>
            </div>
            <div className="h-3 sm:h-4 w-px bg-teal-400/30 hidden sm:block"></div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-400" />
              <span className="text-white/70 font-mono text-[8px] sm:text-[9px] md:text-[10px]">
                {currentTime.toLocaleTimeString('en-US', { hour12: false })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Left Side Panel - Visitor Stats */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:block fixed left-0 top-20 bottom-20 w-20 xl:w-24 bg-gradient-to-r from-black/80 to-transparent backdrop-blur-sm border-r border-teal-400/20 z-40"
      >
        <div className="h-full flex flex-col items-center justify-center gap-6 xl:gap-8 py-8">
          {/* Visitor Count */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 xl:w-14 xl:h-14 rounded-full bg-teal-400/10 border-2 border-teal-400/30 flex items-center justify-center"
            >
              <Users className="w-5 h-5 xl:w-6 xl:h-6 text-teal-400" />
            </motion.div>
            <div className="text-center">
              <div className="text-teal-400 font-mono text-lg xl:text-xl font-bold">
                {visitorCount}
              </div>
              <div className="text-white/40 font-mono text-[7px] xl:text-[8px] uppercase tracking-wider">
                Visitors
              </div>
            </div>
          </div>

          {/* Fun Stats */}
          <StatDisplay 
            icon={Eye} 
            value={Math.round(scrollYProgress.get() * 347)} 
            label="Views"
            tooltip="Page views"
          />
          <StatDisplay 
            icon={Sparkles} 
            value={Math.round(energyLevel)} 
            label="Energy"
            tooltip="System energy"
            suffix="%"
          />
          <StatDisplay 
            icon={Zap} 
            value={Math.floor(missionTime / 60)} 
            label="Mins"
            tooltip="Time active"
          />
        </div>
      </motion.div>

      {/* Right Side Panel - Progress & Time */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="hidden lg:block fixed right-0 top-20 bottom-20 w-20 xl:w-24 bg-gradient-to-l from-black/80 to-transparent backdrop-blur-sm border-l border-teal-400/20 z-40"
      >
        <div className="h-full flex flex-col items-center justify-center gap-6 xl:gap-8 py-8">
          {/* Scroll Progress */}
          <div className="flex flex-col items-center gap-2">
            <motion.div className="relative w-12 h-12 xl:w-14 xl:h-14">
              {/* Background circle */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgba(45, 212, 191, 0.1)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="45%"
                  fill="none"
                  stroke="rgb(45, 212, 191)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    pathLength: scrollYProgress,
                    strokeDasharray: "0 1"
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-4 h-4 xl:w-5 xl:h-5 text-teal-400" />
              </div>
            </motion.div>
            <div className="text-center">
              <motion.div className="text-teal-400 font-mono text-lg xl:text-xl font-bold">
                {Math.round(scrollYProgress.get() * 100)}
              </motion.div>
              <div className="text-white/40 font-mono text-[7px] xl:text-[8px] uppercase tracking-wider">
                Progress
              </div>
            </div>
          </div>

          {/* Time Stats */}
          <StatDisplay 
            icon={Clock} 
            value={missionTime} 
            label="Seconds"
            tooltip="Time on site"
            suffix="s"
          />
          <StatDisplay 
            icon={Gauge} 
            value={Math.round(systemPower.get())} 
            label="Power"
            tooltip="System power"
            suffix="%"
          />
          <StatDisplay 
            icon={TrendingUp} 
            value={Math.round(scrollYProgress.get() * 100)} 
            label="Journey"
            tooltip="Journey progress"
            suffix="%"
          />
        </div>
      </motion.div>

      {/* Bottom HUD Bar - Responsive */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="fixed bottom-0 left-0 right-0 h-10 sm:h-12 md:h-14 bg-gradient-to-t from-black/90 via-black/70 to-transparent backdrop-blur-sm border-t border-teal-400/20 z-40 px-2 sm:px-4 md:px-6"
      >
        <div className="h-full flex items-center justify-between max-w-[2000px] mx-auto">
          {/* Left Info */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-teal-400/10 border border-teal-400/30">
              <Clock className="w-3 h-3 text-teal-400" />
              <span className="text-teal-400 font-mono text-[8px] sm:text-[9px] md:text-[10px] font-bold">
                {formatMissionTime(missionTime)}
              </span>
            </div>
            <div className="h-3 sm:h-4 w-px bg-teal-400/30 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-1.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 text-teal-400" />
              </motion.div>
              <span className="text-white/50 font-mono text-[8px] sm:text-[9px] md:text-[10px]">
                OPERATIONAL
              </span>
            </div>
          </div>

          {/* Center - Fun Element (Mobile friendly) */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ 
                y: [0, -3, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400" />
            </motion.div>
            <span className="text-teal-400/60 font-mono text-[8px] sm:text-[9px] uppercase hidden md:inline">
              {scrollYProgress.get() > 0.8 ? 'LANDING SOON' : scrollYProgress.get() > 0.5 ? 'IN ORBIT' : 'LAUNCHING'}
            </span>
          </div>

          {/* Right Info */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded bg-emerald-400/10 border border-emerald-400/30">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-400 font-mono text-[9px] font-bold">
                {Math.round(energyLevel)}%
              </span>
            </div>
            <div className="h-3 sm:h-4 w-px bg-teal-400/30 hidden sm:block"></div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-teal-400/10 border border-teal-400/30">
              <Activity className="w-3 h-3 text-teal-400" />
              <span className="text-teal-400 font-mono text-[8px] sm:text-[9px] md:text-[10px] font-bold">
                {Math.round(scrollYProgress.get() * 100)}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Holographic Screen Effect - Responsive padding */}
      <div className="relative pt-12 sm:pt-14 md:pt-16 pb-10 sm:pb-12 md:pb-14 px-0 lg:px-16 xl:px-20">
        {/* Scanline Effect */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-30 opacity-5"
          animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{
            backgroundImage: 'linear-gradient(transparent 50%, rgba(45, 212, 191, 0.5) 50%)',
            backgroundSize: '100% 4px',
          }}
        />

        {/* Vignette Effect */}
        <div className="fixed inset-0 pointer-events-none z-30 bg-gradient-radial from-transparent via-transparent to-black/50" />

        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      {/* Grid Overlay - Subtle, hidden on mobile */}
      <div 
        className="fixed inset-0 pointer-events-none z-20 opacity-[0.02] hidden sm:block"
        style={{
          backgroundImage: `
            linear-gradient(rgba(45, 212, 191, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

// Stat Display Component with tooltip
const StatDisplay: React.FC<{ 
  icon: any; 
  value: number; 
  label: string; 
  tooltip?: string;
  suffix?: string;
}> = ({ icon: Icon, value, label, tooltip, suffix = '' }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="relative group cursor-pointer"
  >
    <div className="flex flex-col items-center gap-1">
      <div className="w-10 h-10 xl:w-12 xl:h-12 rounded-lg flex items-center justify-center bg-teal-400/10 border border-teal-400/20 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-teal-400/20 to-transparent"
          animate={{ y: ['100%', '-100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <Icon className="w-4 h-4 xl:w-5 xl:h-5 text-teal-400 relative z-10" />
      </div>
      <div className="text-center">
        <div className="text-teal-400 font-mono text-sm xl:text-base font-bold">
          {value}{suffix}
        </div>
        <div className="text-white/30 font-mono text-[7px] xl:text-[8px] uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
    
    {tooltip && (
      <div className="absolute left-full ml-3 px-3 py-1.5 bg-black/95 border border-teal-400/30 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
        <span className="text-teal-400 font-mono text-[9px]">{tooltip}</span>
      </div>
    )}
  </motion.div>
);

export default MissionControlFrame;
