
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Starfield, ParticleTrail, ShootingStar } from '../utils/cosmicEffects.tsx';
import { Rocket, ChevronDown } from 'lucide-react';

const Hero: React.FC = React.memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Launch sequence transforms
  const rocketY = useTransform(scrollYProgress, [0, 0.3, 1], [0, -50, -500]);
  const rocketRotate = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, -5, 0]);
  const rocketScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3]);
  
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.6, 1], [0, 5, 15]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -200]);
  
  // Starfield acceleration
  const starSpeed = useTransform(scrollYProgress, [0, 0.5, 1], [1, 3, 8]);
  const starOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0]);

  return (
    <div ref={containerRef} className="h-[200vh] sm:h-[250vh] relative z-20">
      <section id="home" className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        
        {/* Animated Starfield Background */}
        <motion.div 
          style={{ opacity: starOpacity }}
          className="absolute inset-0 z-0"
        >
          <Starfield density={200} speed={1} />
          <ShootingStar />
        </motion.div>
        
        {/* Particle trails during launch */}
        <motion.div
          style={{ 
            opacity: useTransform(scrollYProgress, [0.1, 0.3, 0.6], [0, 1, 0])
          }}
          className="absolute inset-0 z-5"
        >
          <ParticleTrail count={10} color="#2dd4bf" direction="down" />
        </motion.div>

        {/* Earth gradient at bottom (launch platform) */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]),
            y: useTransform(scrollYProgress, [0, 0.5], [0, 200])
          }}
          className="absolute bottom-0 left-0 right-0 h-[40vh] z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-blue-950/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-950/30 via-transparent to-transparent" />
          {/* Horizon glow */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400/50 to-transparent blur-sm" />
        </motion.div>

        {/* Main title with rocket launch effect */}
        <motion.div 
          style={{ 
            y: rocketY,
            rotate: rocketRotate,
            scale: rocketScale,
            opacity, 
            filter: `blur(${blur}px)`
          }}
          className="relative z-10 flex flex-col items-center pointer-events-none px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center relative"
          >
            {/* Rocket icon above name */}
            <motion.div
              style={{
                y: useTransform(scrollYProgress, [0, 0.5], [0, -100])
              }}
              className="mb-4 sm:mb-8"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Rocket 
                  className="w-12 h-12 sm:w-16 sm:h-16 text-teal-400" 
                  strokeWidth={2}
                />
              </motion.div>
            </motion.div>
            
            <h1 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] font-black tracking-tighter leading-none text-white drop-shadow-[0_0_80px_rgba(45,212,191,0.3)] select-none text-center relative px-4">
              DWARKESH
              {/* Light trails behind text */}
              <motion.div
                style={{
                  opacity: useTransform(scrollYProgress, [0.1, 0.3], [0, 0.6])
                }}
                className="absolute inset-0 text-teal-400/20 blur-2xl"
              >
                DWARKESH
              </motion.div>
            </h1>
            
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
              className="mt-3 sm:mt-6 md:mt-8 flex flex-col items-center gap-2 sm:gap-4 md:gap-6"
            >
              <h2 className="text-[10px] sm:text-sm md:text-lg lg:text-2xl font-light text-white/40 tracking-[0.2em] sm:tracking-[0.4em] md:tracking-[0.6em] uppercase text-center px-4">
                BTech student • Aspiring AI Generalist
              </h2>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-teal-500/30"></div>
                <div className="px-3 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/10 glass text-white/80 text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase bg-white/[0.02] whitespace-nowrap">
                </div>
                <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-teal-500/30"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Launch prompt */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none"
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-3"
          >
            <span className="text-teal-400/60 text-xs font-bold tracking-[0.3em] uppercase">
              Begin Journey
            </span>
            <ChevronDown className="w-6 h-6 text-teal-400" />
          </motion.div>
        </motion.div>
        
        {/* Space depth indicator */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0.3, 0.6], [0, 1])
          }}
          className="absolute top-8 right-8 text-right text-white/20 font-mono text-xs hidden sm:block"
        >
          <div>ALTITUDE: {Math.floor(scrollYProgress.get() * 100000)} KM</div>
          <div>VELOCITY: {Math.floor(scrollYProgress.get() * 25000)} M/S</div>
        </motion.div>
      </section>
    </div>
  );
});

export default Hero;
