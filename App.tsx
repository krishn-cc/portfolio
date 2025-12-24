
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';
import BackgroundEffect from './components/BackgroundEffect.tsx';
import ChatAssistant from './components/ChatAssistant.tsx';

const CodingJourney: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 3D Transforms for the Journey Monolith
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.8, 1.05, 1.05, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const textX = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  const springConfig = { damping: 40, stiffness: 50, mass: 1.2 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <section id="journey" ref={containerRef} className="h-[140vh] relative z-10 bg-[#050505] perspective-3000 flex items-center justify-center overflow-hidden">
      {/* Huge Parallax Background Text */}
      <motion.div 
        style={{ x: textX, opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.06, 0]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[35vw] font-black tracking-tighter uppercase text-white whitespace-nowrap leading-none">
          TRAJECTORY
        </span>
      </motion.div>

      {/* 3D Content Container */}
      <motion.div
        style={{ 
          rotateX: smoothRotateX,
          scale: smoothScale,
          opacity,
          y: smoothY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        {/* Metric Card */}
        <div className="lg:col-span-8 group relative" style={{ transformStyle: "preserve-3d" }}>
          <div className="absolute -inset-10 bg-teal-500/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative rounded-[60px] overflow-hidden border border-white/10 bg-[#080808] p-1 shadow-[0_80px_150px_-20px_rgba(0,0,0,0.8)]">
            <div className="p-8 md:p-16">
               <div className="flex items-center gap-6 mb-12">
                  <span className="text-teal-400 font-black text-xs uppercase tracking-[0.8em]">02 / METRICS</span>
                  <div className="h-[1px] w-20 bg-white/10"></div>
               </div>
               <h4 className="text-5xl md:text-8xl font-bold mb-12 text-white tracking-tighter leading-none">Global <br/><span className="text-white/10">Contributions.</span></h4>
               <img 
                src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=krishn-cc&theme=radical&cache_seconds=300" 
                className="w-full h-auto rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000 opacity-60 hover:opacity-100" 
                alt="GitHub Stats"
              />
            </div>
          </div>
        </div>

        {/* Floating Detail Panel */}
        <div className="lg:col-span-4 space-y-8" style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}>
          <motion.div 
            whileHover={{ translateZ: 100, scale: 1.05 }}
            className="p-12 rounded-[48px] bg-white/[0.02] backdrop-blur-3xl border border-white/5 shadow-2xl"
          >
             <div className="w-16 h-16 rounded-[24px] bg-white flex items-center justify-center text-black font-black text-2xl mb-10">01</div>
             <p className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                "Solving <span className="text-teal-400 italic">architectural puzzles</span> with computational elegance."
             </p>
          </motion.div>
          
          <div className="p-10 rounded-[48px] border border-white/5 bg-transparent">
             <p className="text-white/20 text-lg font-medium leading-relaxed italic">
               Actively pushing the boundaries of what is possible in web architecture through consistent open-source iteration.
             </p>
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
    <div className="relative min-h-screen bg-[#050505]">
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
          <BackgroundEffect />
          <Navbar />
          <main className="relative">
            <Hero />
            <div className="relative z-30 bg-[#050505] -mt-[2px]">
              <Skills />
              <CodingJourney />
              <Projects />
              <Contact />
            </div>
          </main>
          <ChatAssistant />
          
          <footer className="relative z-30 py-32 px-6 border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
              <div className="md:col-span-2 space-y-12">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-white rounded-[24px] flex items-center justify-center font-black text-black text-3xl">D</div>
                  <span className="text-4xl font-black tracking-tighter text-white">DWARKESH</span>
                </div>
                <p className="text-white/30 max-w-md leading-relaxed text-xl font-medium">
                  Exploring the frontiers of Computer Science and AI. B.Tech 2nd Year CSE student at KL University.
                </p>
              </div>
              
              <div>
                <h5 className="font-black text-[10px] uppercase tracking-[0.4em] mb-12 text-teal-400">Navigation</h5>
                <div className="flex flex-col gap-6 text-white/40 text-sm font-bold">
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="#home">Home</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="#skills">Skills</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="#journey">Journey</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="#projects">Projects</motion.a>
                </div>
              </div>

              <div>
                <h5 className="font-black text-[10px] uppercase tracking-[0.4em] mb-12 text-teal-400">Ecosystem</h5>
                <div className="flex flex-col gap-6 text-white/40 text-sm font-bold">
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="https://github.com/krishn-cc" target="_blank">GitHub</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="https://www.linkedin.com/in/dwarkesh-dubey-a34287367/" target="_blank">LinkedIn</motion.a>
                  <motion.a whileHover={{ x: 10, color: '#2dd4bf' }} href="mailto:dwarkeshdubey21@gmail.com">Email</motion.a>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
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
