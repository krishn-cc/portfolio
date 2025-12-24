
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
      className="h-[140vh] w-full flex items-center justify-center relative perspective-3000 overflow-visible"
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
        <h1 className="text-[35vw] font-black tracking-tighter uppercase whitespace-nowrap leading-none filter blur-sm">
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
        className="relative w-full max-w-6xl aspect-[16/9] group z-10 px-6"
      >
        {/* Atmospheric Glow */}
        <div 
          className="absolute -inset-20 blur-[180px] rounded-full opacity-0 group-hover:opacity-40 transition-all duration-1000"
          style={{ backgroundColor: project.color }}
        ></div>

        <div className="relative h-full w-full rounded-[48px] md:rounded-[72px] overflow-hidden border border-white/10 bg-black shadow-[0_120px_250px_-50px_rgba(0,0,0,1)] transition-all duration-700 group-hover:border-white/20">
          
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
          <div className="absolute top-12 left-12 right-12 flex justify-between items-start z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-[-20px] group-hover:translate-y-0">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center">
                   <Monitor size={16} className="text-white/40" />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">System ID</p>
                   <p className="text-[12px] font-bold text-white/60">PRJ-{idx + 9321}</p>
                </div>
             </div>
             
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: project.color }}></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Active Production</span>
             </div>
          </div>

          {/* Floating Action Circle */}
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, backgroundColor: project.color, color: '#000' }}
            className="absolute top-12 right-12 w-24 h-24 rounded-full glass border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-700 z-40 pointer-events-auto text-white shadow-2xl"
          >
            <ArrowUpRight size={40} />
          </motion.a>

          {/* Main Info Block */}
          <div className="absolute bottom-0 left-0 right-0 p-12 md:p-20 z-30 flex flex-col items-start gap-8 pointer-events-none">
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <span className="font-black text-[10px] uppercase tracking-[0.8em]" style={{ color: project.color }}>
                   0{idx + 1} // OVERVIEW
                </span>
                <div className="h-[1px] w-20 bg-white/10"></div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none uppercase">
                  {project.title}
                </h4>
                <p className="text-teal-400 font-bold text-lg md:text-2xl tracking-tight leading-none italic opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200">
                  "{project.tagline}"
                </p>
              </div>

              <p className="text-white/40 text-base md:text-xl font-medium max-w-3xl leading-relaxed mt-4 drop-shadow-2xl">
                {project.description}
              </p>
            </div>

            {/* Tech Badges & GitHub */}
            <div className="flex flex-wrap gap-4 pointer-events-auto mt-6">
              <div className="bg-white/[0.03] backdrop-blur-3xl p-3 rounded-[32px] border border-white/5 flex gap-3 items-center shadow-2xl">
                 {project.tech.map((t: string) => (
                    <span 
                      key={t} 
                      className="px-5 py-3 bg-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all cursor-default whitespace-nowrap"
                    >
                      {t}
                    </span>
                 ))}
                 <div className="h-8 w-[1px] bg-white/10 mx-2"></div>
                 <motion.a 
                    whileHover={{ scale: 1.2, backgroundColor: project.color, color: '#000' }}
                    href={project.link}
                    className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white/40 transition-all"
                  >
                    <Github size={20} />
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
    <section id="projects" className="relative z-10 bg-[#050505] overflow-visible pb-[20vh]">
      {/* Section Header */}
      <div className="max-w-[1600px] mx-auto px-6 pt-64 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-end justify-between gap-16"
        >
          <div className="flex-1">
            <h2 className="text-[14px] font-black uppercase tracking-[1em] text-teal-400 mb-10 flex items-center gap-8">
               <span className="w-24 h-[1px] bg-teal-400"></span>
               System Architecture
            </h2>
            <h3 className="text-8xl md:text-[14rem] font-bold tracking-tighter leading-[0.75] text-white uppercase italic">
              Digital <br />
              <span className="text-white/5">Ecosystems.</span>
            </h3>
          </div>
          
          <div className="lg:max-w-sm p-12 rounded-[56px] border border-white/10 bg-white/[0.02] backdrop-blur-3xl mb-8">
             <p className="text-2xl text-white/20 leading-relaxed font-light italic">
               Transforming complex data structures into high-performance visual experiences.
             </p>
          </div>
        </motion.div>
      </div>

      {/* Projects Sequence */}
      <div className="relative space-y-[20vh]">
        {PROJECTS.map((project, idx) => (
          <ProjectCard key={project.title} project={project} idx={idx} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
