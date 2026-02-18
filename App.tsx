
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';
import BackgroundEffect from './components/BackgroundEffect.tsx';
import ChatAssistant from './components/ChatAssistant.tsx';

// Scroll Transition Effect - Star Warp between sections
const StarWarpTransition: React.FC<{ sectionName: string }> = ({ sectionName }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0.8, 1.5, 0.8]);
  
  // Reduce number of lines on mobile
  const [isMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  const lineCount = isMobile ? 8 : 15;

  return (
    <div ref={containerRef} className="relative h-20 sm:h-32 md:h-48 -my-10 sm:-my-16 md:-my-24 pointer-events-none z-40">
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Star warp lines */}
        {[...Array(lineCount)].map((_, i) => {
          const angle = (i / lineCount) * Math.PI * 2;
          const distance = 40 + (i % 3) * 20;
          return (
            <motion.div
              key={i}
              className="absolute w-0.5 sm:w-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent rounded-full"
              style={{
                height: `${30 + (i % 4) * 20}px`,
                left: '50%',
                top: '50%',
                transformOrigin: 'center',
              }}
              animate={{
                rotate: [(angle * 180) / Math.PI, (angle * 180) / Math.PI],
                scaleY: [0, 2, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.05,
                ease: 'easeInOut',
              }}
            />
          );
        })}
        
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full bg-black/80 backdrop-blur-xl border border-teal-400/30"
        >
          <span className="text-teal-400 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em]">
            {sectionName}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Scroll Progress Indicator
const ScrollProgressIndicator: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { damping: 50, stiffness: 300 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-purple-400 to-teal-400 origin-left z-[70] shadow-[0_0_20px_rgba(45,212,191,0.6)]"
      style={{ scaleX }}
    />
  );
};

const CodingJourney: React.FC = () => {
  const containerRef = useRef(null);
  const [isMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Wormhole depth effect
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [35, 0, -35]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.6, 1.1, 1.1, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
  
  // Spiral wormhole text movement
  const textX = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const textRotate = useTransform(scrollYProgress, [0, 1], [0, -15]);

  const springConfig = { damping: 40, stiffness: 50, mass: 1.2 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <section id="journey" ref={containerRef} className="min-h-screen sm:h-[180vh] relative z-10 bg-[#050505] perspective-3000 flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-0">
      {/* Wormhole Spiral Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          opacity: useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.15, 0])
        }}
      >
        {/* Concentric rings creating tunnel effect - fewer on mobile */}
        {[...Array(isMobile ? 3 : 5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/10"
            style={{
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`,
              opacity: 0.3 - i * 0.03
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3 - i * 0.03, 0.15 - i * 0.02, 0.3 - i * 0.03]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
      
      {/* Huge Parallax Background Text */}
      <motion.div 
        style={{ 
          x: textX, 
          rotate: textRotate,
          opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.06, 0]) 
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[35vw] sm:text-[38vw] md:text-[40vw] font-black tracking-tighter uppercase text-white whitespace-nowrap leading-none">
          TIMELINE
        </span>
      </motion.div>

      {/* 3D Timeline Container */}
      <motion.div
        style={{ 
          rotateX: smoothRotateX,
          scale: smoothScale,
          opacity,
          y: smoothY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6"
      >
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6"
          >
            <span className="text-purple-400 font-black text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.6em]">Wormhole Passage</span>
            <div className="h-[1px] w-10 sm:w-12 md:w-16 bg-purple-400/30"></div>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter">
            Educational <span className="text-purple-400">Path</span>
          </h2>
        </div>

        {/* 3D Wormhole Timeline */}
        <div className="relative">
          {/* Glowing Central Line - Wormhole Core */}
          <div className="absolute left-[20px] sm:left-[50%] top-0 bottom-0 w-[2px] sm:translate-x-[-1px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-40"></div>
            <div className="absolute inset-0 bg-purple-400/30 blur-sm animate-pulse"></div>
            {/* Energy pulses */}
            <motion.div
              className="absolute w-full h-8 bg-gradient-to-b from-purple-400/50 to-transparent blur-md"
              animate={{
                y: ["0%", "100%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12 sm:space-y-20 md:space-y-24">
            {/* B.Tech - Current */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
              viewport={{ once: true }}
              className="relative pl-12 sm:pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-12 items-center group"
            >
              {/* Waypoint Marker */}
              <div className="absolute left-[11px] md:left-[50%] md:translate-x-[-50%] w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] rounded-full bg-teal-400 shadow-[0_0_30px_rgba(45,212,191,0.8)] sm:shadow-[0_0_40px_rgba(45,212,191,0.9)] z-10">
                <div className="absolute inset-0 rounded-full bg-teal-400 animate-ping opacity-75"></div>
                <div className="absolute inset-[-6px] sm:inset-[-8px] rounded-full border border-teal-400/30"></div>
              </div>

              {/* Content Card */}
              <div className="md:col-start-2 md:col-span-1">
                <motion.div
                  whileHover={{ scale: 1.03, translateZ: 100 }}
                  className="relative p-5 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-gradient-to-br from-teal-950/40 via-teal-950/20 to-transparent backdrop-blur-2xl border border-teal-400/30 shadow-[0_20px_80px_-15px_rgba(45,212,191,0.4)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-400/30 to-blue-400/30 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center font-black text-black text-sm sm:text-base shadow-lg">
                        BT
                      </div>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-teal-400/20 border border-teal-400/50 text-teal-300 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        ◉ Active
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                      Bachelor of Technology
                    </h3>
                    <p className="text-white/70 font-bold mb-2 sm:mb-3 text-sm sm:text-base">Computer Science & Engineering</p>
                    <p className="text-white/50 text-xs sm:text-sm mb-3 sm:mb-4">KL University, Hyderabad</p>
                    <div className="flex items-center gap-2 text-teal-400 font-black text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-400 animate-pulse"></div>
                      <span>2024 - 2028</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Year Label (Desktop) */}
              <div className="hidden md:block md:col-start-1 md:col-span-1 text-right">
                <span className="text-6xl lg:text-7xl font-black text-white/5 tracking-tighter">2024</span>
              </div>
            </motion.div>

            {/* 12th Grade */}
            <motion.div
              initial={{ opacity: 0, x: 50, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              viewport={{ once: true }}
              className="relative pl-12 sm:pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-12 items-center group"
            >
              {/* Waypoint Marker */}
              <div className="absolute left-[11px] md:left-[50%] md:translate-x-[-50%] w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] rounded-full bg-blue-400 shadow-[0_0_25px_rgba(96,165,250,0.6)] sm:shadow-[0_0_35px_rgba(96,165,250,0.7)] z-10">
                <div className="absolute inset-[-6px] sm:inset-[-8px] rounded-full border border-blue-400/30"></div>
              </div>

              {/* Content Card */}
              <div className="md:col-start-1 md:col-span-1">
                <motion.div
                  whileHover={{ scale: 1.03, translateZ: 100 }}
                  className="relative p-5 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-gradient-to-br from-blue-950/40 via-blue-950/20 to-transparent backdrop-blur-2xl border border-blue-400/30 shadow-[0_20px_80px_-15px_rgba(96,165,250,0.3)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center font-black text-black text-sm sm:text-base shadow-lg">
                        12
                      </div>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-400/20 border border-blue-400/50 text-blue-300 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Completed
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                      Higher Secondary
                    </h3>
                    <p className="text-white/70 font-bold mb-2 sm:mb-3 text-sm sm:text-base">Science Stream</p>
                    <p className="text-white/50 text-xs sm:text-sm mb-3 sm:mb-4">Sri Chaitanya Educational Institutions</p>
                    <div className="flex items-center gap-2 text-blue-400 font-black text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-400"></div>
                      <span>2022 - 2024</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Year Label (Desktop) */}
              <div className="hidden md:block md:col-start-2 md:col-span-1">
                <span className="text-6xl lg:text-7xl font-black text-white/5 tracking-tighter">2022</span>
              </div>
            </motion.div>

            {/* 10th Grade */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.8 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              viewport={{ once: true }}
              className="relative pl-12 sm:pl-16 md:pl-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-12 items-center group"
            >
              {/* Waypoint Marker */}
              <div className="absolute left-[11px] md:left-[50%] md:translate-x-[-50%] w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[18px] md:h-[18px] rounded-full bg-purple-400 shadow-[0_0_25px_rgba(192,132,252,0.6)] sm:shadow-[0_0_35px_rgba(192,132,252,0.7)] z-10">
                <div className="absolute inset-[-6px] sm:inset-[-8px] rounded-full border border-purple-400/30"></div>
              </div>

              {/* Content Card */}
              <div className="md:col-start-2 md:col-span-1">
                <motion.div
                  whileHover={{ scale: 1.03, translateZ: 100 }}
                  className="relative p-5 sm:p-6 md:p-8 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] bg-gradient-to-br from-purple-950/40 via-purple-950/20 to-transparent backdrop-blur-2xl border border-purple-400/30 shadow-[0_20px_80px_-15px_rgba(192,132,252,0.3)]"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-[24px] sm:rounded-[28px] md:rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center font-black text-black text-sm sm:text-base shadow-lg">
                        10
                      </div>
                      <span className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-purple-400/20 border border-purple-400/50 text-purple-300 text-[10px] sm:text-xs font-black uppercase tracking-wider">
                        Completed
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                      Secondary School
                    </h3>
                    <p className="text-white/70 font-bold mb-2 sm:mb-3 text-sm sm:text-base">CBSE Board</p>
                    <p className="text-white/50 text-xs sm:text-sm mb-3 sm:mb-4">Phoenix Greens School of Learning</p>
                    <div className="flex items-center gap-2 text-purple-400 font-black text-xs sm:text-sm">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400"></div>
                      <span>2016 - 2022</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Year Label (Desktop) */}
              <div className="hidden md:block md:col-start-1 md:col-span-1 text-right">
                <span className="text-6xl lg:text-7xl font-black text-white/5 tracking-tighter">2021</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <AnimatePresence>
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-5xl font-black tracking-tighter text-white mb-6 uppercase">DWARKESH</h1>
              <div className="h-0.5 w-16 bg-white/20 mx-auto rounded-full overflow-hidden">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="h-full w-full bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)]"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <ScrollProgressIndicator />
          <BackgroundEffect />
          <Navbar />
          <main className="relative">
            <Hero />
            
            {/* Star Warp Transition to Skills */}
            <StarWarpTransition sectionName="Entering Sector Zone" />
            
            <div className="relative z-30 bg-[#050505] -mt-[2px]">
              <Skills />
              
              {/* Star Warp Transition to Journey */}
              <StarWarpTransition sectionName="Timeline Portal" />
              
              <CodingJourney />
              
              {/* Star Warp Transition to Projects */}
              <StarWarpTransition sectionName="Station Approach" />
              
              <Projects />
              
              {/* Star Warp Transition to Contact */}
              <StarWarpTransition sectionName="Comms Channel" />
              
              <Contact />
            </div>
          </main>
          <ChatAssistant />
          
          <footer className="relative z-30 py-16 sm:py-24 md:py-32 px-4 sm:px-6 border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-16 md:gap-20">
              <div className="sm:col-span-2 space-y-8 sm:space-y-12">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-[20px] sm:rounded-[24px] flex items-center justify-center font-black text-black text-2xl sm:text-3xl">D</div>
                  <span className="text-3xl sm:text-4xl font-black tracking-tighter text-white">DWARKESH</span>
                </div>
                <p className="text-white/30 max-w-md leading-relaxed text-base sm:text-lg md:text-xl font-medium">
                  Exploring the frontiers of Computer Science and AI. B.Tech 2nd Year CSE student at KL University.
                </p>
              </div>
              
              <div>
                <h5 className="font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-8 sm:mb-12 text-teal-400">Navigation</h5>
                <div className="flex flex-col gap-4 sm:gap-6 text-white/40 text-sm font-bold">
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="#home">Home</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="#skills">Skills</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="#journey">Journey</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="#projects">Projects</motion.a>
                </div>
              </div>

              <div>
                <h5 className="font-black text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-8 sm:mb-12 text-teal-400">Ecosystem</h5>
                <div className="flex flex-col gap-4 sm:gap-6 text-white/40 text-sm font-bold">
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="https://github.com/krishn-cc" target="_blank">GitHub</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="https://www.linkedin.com/in/dwarkesh-dubey-a34287367/" target="_blank">LinkedIn</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="mailto:dwarkeshdubey21@gmail.com">Email</motion.a>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 sm:mt-24 md:mt-32 pt-12 sm:pt-16 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-8 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white/10 text-center sm:text-left">
               <span>© {new Date().getFullYear()} DWARKESH DUBEY</span>
               <span className="text-teal-900 font-bold uppercase">Engineered in KL University • AP</span>
            </div>
          </footer>
        </motion.div>
      )}
    </div>
  );
};

export default App;
