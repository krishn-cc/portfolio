
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.7, 1], [1, 10, 35]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.8], [0, 15]);
  const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="h-[200vh] sm:h-[250vh] relative z-20">
      <section id="home" className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            style={{ opacity, y: useTransform(scrollYProgress, [0, 1], [0, 150]) }}
            className="w-full h-full flex flex-col items-center justify-center pt-20"
          >
             <img 
              src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,3,5,30&height=300&section=header&text=&fontSize=60&fontAlignY=35&animation=twinkling" 
              className="w-full object-cover h-[300px] sm:h-[500px] opacity-20 grayscale invert"
              alt="Banner"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]"></div>
          </motion.div>
        </div>

        <motion.div 
          style={{ scale, opacity, filter: `blur(${blur}px)`, y: yTranslate }}
          className="relative z-10 flex flex-col items-center pointer-events-none px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h1 className="text-[18vw] sm:text-[16vw] font-black tracking-tighter leading-none text-white drop-shadow-[0_0_50px_rgba(45,212,191,0.15)] select-none text-center">
              DWARKESH
            </h1>
            
            <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
              className="mt-4 sm:mt-8 flex flex-col items-center gap-3 sm:gap-6"
            >
              <h2 className="text-xs sm:text-lg md:text-2xl font-light text-white/40 tracking-[0.3em] sm:tracking-[0.6em] uppercase text-center px-4">
                Software Architect • AI Generalist
              </h2>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-teal-500/30"></div>
                <div className="px-3 sm:px-6 py-1.5 sm:py-2 rounded-full border border-white/10 glass text-white/80 text-[8px] sm:text-[10px] font-bold tracking-[0.2em] sm:tracking-[0.4em] uppercase bg-white/[0.02] whitespace-nowrap">
                  Innovation Labs
                </div>
                <div className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-teal-500/30"></div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute bottom-8 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-5 h-10 sm:w-6 sm:h-12 rounded-full border border-white/10 flex justify-center p-1 bg-white/[0.02]">
             <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1 h-1 rounded-full bg-teal-400"
             />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
