
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROJECTS } from '../constants.tsx';
import { ArrowUpRight, Github, Monitor } from 'lucide-react';

const ProjectCard = ({ project, idx }: { project: any, idx: number }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.8, 1.05, 1.05, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textX = useTransform(
    scrollYProgress, 
    [0, 1], 
    [idx % 2 === 0 ? '-30%' : '30%', idx % 2 === 0 ? '30%' : '-30%']
  );
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const springConfig = { damping: 40, stiffness: 50, mass: 1.2 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen sm:h-[140vh] w-full flex items-center justify-center relative perspective-3000 overflow-visible py-12 sm:py-0"
    >
      {/* Background Parallax Title */}
      <motion.div 
        style={{ 
          x: textX, 
          opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.05, 0]),
          color: project.color
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <h1 className="text-[25vw] sm:text-[35vw] font-black tracking-tighter uppercase whitespace-nowrap leading-none filter blur-sm">
          {project.title.split(' ')[0]}
        </h1>
      </motion.div>

      {/* 3D Dashboard Container */}
      <motion.div
        style={{ 
          rotateX: smoothRotateX,
          scale: smoothScale,
          opacity,
          y: smoothY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] group z-10 px-4 sm:px-6"
      >
        {/* Atmospheric Glow */}
        <div 
          className="absolute -inset-10 sm:-inset-20 blur-[120px] sm:blur-[180px] rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1000"
          style={{ backgroundColor: project.color }}
        ></div>

        <div className="relative h-full w-full rounded-[32px] sm:rounded-[48px] md:rounded-[72px] overflow-hidden border border-white/10 bg-black shadow-[0_120px_250px_-50px_rgba(0,0,0,1)] transition-all duration-700 group-hover:border-white/20">
          
          {/* Base Layer: Project Image with High-End Filtering */}
          <div className="absolute inset-0 overflow-hidden bg-black">
             <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-all duration-1000 opacity-30 group-hover:opacity-90 filter contrast-125 brightness-90 group-hover:brightness-100"
            />
          </div>
          
          {/* High-End Interface Layer (The "Blending") */}
          <div className="absolute inset-0 pointer-events-none">
             {/* Scanlines Effect */}
             <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
             
             {/* Vignette Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-20"></div>
             
             {/* Dynamic Color Tint (On Hover) */}
             <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 mix-blend-color z-20"
              style={{ backgroundColor: project.color }}
             ></div>
          </div>

          {/* Interface Header Decoration */}
          <div className="absolute top-4 sm:top-8 md:top-12 left-4 sm:left-8 md:left-12 right-4 sm:right-8 md:right-12 flex justify-between items-start z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-[-20px] group-hover:translate-y-0">
             <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center">
                   <Monitor size={14} className="sm:w-4 sm:h-4 text-white/40" />
                </div>
                <div className="hidden sm:block">
                   <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/20">System ID</p>
                   <p className="text-[10px] sm:text-[12px] font-bold text-white/60">PRJ-{idx + 9321}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse" style={{ backgroundColor: project.color }}></div>
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30">Active Production</span>
             </div>
          </div>

          {/* Floating Action Circle */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, backgroundColor: project.color, color: '#000' }}
            className="absolute top-4 sm:top-8 md:top-12 right-4 sm:right-8 md:right-12 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full glass border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700 z-40 pointer-events-auto text-white shadow-2xl"
          >
            <ArrowUpRight size={24} className="sm:w-8 sm:h-8 md:w-10 md:h-10" />
          </motion.a>

          {/* Main Info Block */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 lg:p-20 z-30 flex flex-col items-start gap-4 sm:gap-6 md:gap-8 pointer-events-none">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                <span className="font-black text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.6em] md:tracking-[0.8em]" style={{ color: project.color }}>
                   0{idx + 1} // OVERVIEW
                </span>
                <div className="h-[1px] w-10 sm:w-16 md:w-20 bg-white/10"></div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <h4 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-black tracking-tighter text-white leading-none uppercase">
                  {project.title}
                </h4>
                <p className="text-teal-400 font-bold text-sm sm:text-base md:text-lg lg:text-2xl tracking-tight leading-none italic opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200">
                  "{project.tagline}"
                </p>
              </div>

              <p className="text-white/40 text-xs sm:text-sm md:text-base lg:text-xl font-medium max-w-3xl leading-relaxed mt-2 sm:mt-3 md:mt-4 drop-shadow-2xl">
                {project.description}
              </p>
            </div>

            {/* Tech Badges & GitHub */}
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 pointer-events-auto mt-3 sm:mt-4 md:mt-6">
              <div className="bg-white/[0.03] backdrop-blur-3xl p-2 sm:p-2.5 md:p-3 rounded-[20px] sm:rounded-[24px] md:rounded-[32px] border border-white/5 flex gap-2 sm:gap-2.5 md:gap-3 items-center shadow-2xl flex-wrap">
                 {project.tech.map((t: string) => (
                    <span 
                      key={t} 
                      className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-3 bg-white/5 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 hover:text-white transition-all cursor-default whitespace-nowrap"
                    >
                      {t}
                    </span>
                 ))}
                 <div className="h-6 sm:h-8 w-[1px] bg-white/10 mx-1 sm:mx-2"></div>
                 <motion.a 
                    whileHover={{ scale: 1.2, backgroundColor: project.color, color: '#000' }}
                    href={project.link}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 rounded-full text-white/40 transition-all"
                  >
                    <Github size={16} className="sm:w-5 sm:h-5" />
                  </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative z-10 bg-[#050505] overflow-visible pb-[10vh] sm:pb-[20vh]">
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 pt-32 sm:pt-48 md:pt-64 pb-16 sm:pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 sm:gap-12 lg:gap-16"
        >
          <div className="flex-1">
            <h2 className="text-[10px] sm:text-[12px] md:text-[14px] font-black uppercase tracking-[0.6em] sm:tracking-[0.8em] md:tracking-[1em] text-teal-400 mb-6 sm:mb-8 md:mb-10 flex items-center gap-4 sm:gap-6 md:gap-8">
               <span className="w-12 sm:w-20 md:w-24 h-[1px] bg-teal-400"></span>
               System Architecture
            </h2>
            <h3 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[14rem] font-bold tracking-tighter leading-[0.75] text-white uppercase italic">
              Digital <br />
              <span className="text-white/5">Ecosystems.</span>
            </h3>
          </div>
          
          <div className="w-full lg:max-w-sm p-6 sm:p-8 md:p-10 lg:p-12 rounded-[36px] sm:rounded-[44px] md:rounded-[56px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl mb-0 lg:mb-8">
             <p className="text-lg sm:text-xl md:text-2xl text-white/20 leading-relaxed font-light italic">
               Transforming complex data structures into high-performance visual experiences.
             </p>
          </div>
        </motion.div>
      </div>

      {/* Projects Sequence */}
      <div className="relative space-y-[10vh] sm:space-y-[15vh] md:space-y-[20vh]">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
