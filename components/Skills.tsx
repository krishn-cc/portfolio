
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SKILLS, DWARKESH_STATUS } from '../constants.tsx';

const SkillNode = ({ name, index }: { name: string, index: number }) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.1, 
        z: 50,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderColor: "rgba(45, 212, 191, 0.5)"
      }}
      className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center cursor-default transition-all duration-500 shadow-2xl group/node"
    >
      <div className="absolute inset-0 bg-teal-400/5 opacity-0 group-hover/node:opacity-100 transition-opacity rounded-xl sm:rounded-2xl" />
      <span className="text-xs sm:text-sm md:text-lg font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/40 group-hover/node:text-teal-400 transition-colors relative z-10">
        {name}
      </span>
    </motion.div>
  );
};

const SkillCategoryZone = ({ category, skills, index }: { category: string, skills: any[], index: number }) => {
  const zoneRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ["start end", "end start"]
  });

  // 3D Motion Logic consistent with Projects
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // Parallax Background Text
  const textX = useTransform(
    scrollYProgress, 
    [0, 1], 
    [index % 2 === 0 ? '-30%' : '30%', index % 2 === 0 ? '30%' : '-30%']
  );

  const springConfig = { damping: 30, stiffness: 60, mass: 1 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <div ref={zoneRef} className="min-h-screen h-auto sm:h-screen w-full flex items-center justify-center relative perspective-2500 overflow-visible py-12 sm:py-0">
      {/* Massive Parallax Background */}
      <motion.div 
        style={{ x: textX, opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.05, 0]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[25vw] sm:text-[30vw] font-black tracking-tighter uppercase text-white whitespace-nowrap leading-none">
          {category}
        </span>
      </motion.div>

      {/* 3D Skill Grid Container */}
      <motion.div
        style={{ 
          rotateX: smoothRotateX,
          scale: smoothScale,
          opacity,
          y: smoothY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full max-w-6xl px-4 sm:px-6"
      >
        <div className="flex flex-col items-center gap-6 sm:gap-8 md:gap-12">
          {/* Header */}
          <div className="text-center space-y-2 sm:space-y-4 mb-4 sm:mb-8">
            <div className="flex items-center justify-center gap-3 sm:gap-6">
               <div className="h-[1px] w-6 sm:w-12 bg-teal-400/30"></div>
               <span className="text-teal-400 font-black text-[8px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em]">Layer 0{index + 1}</span>
               <div className="h-[1px] w-6 sm:w-12 bg-teal-400/30"></div>
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white uppercase italic">
              {category}<span className="text-teal-400">.</span>
            </h3>
          </div>

          {/* Floating Nodes */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-8 max-w-4xl">
            {skills.map((skill, i) => (
              <SkillNode key={skill.name} name={skill.name} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Skills: React.FC = () => {
  const categories = Array.from(new Set(SKILLS.map(s => s.category)));

  return (
    <section id="skills" className="relative z-10 bg-[#050505] overflow-visible">
      {/* Intro Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-32 sm:pt-48 md:pt-64 pb-16 sm:pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 sm:gap-12 lg:gap-16"
        >
          <div className="max-w-4xl">
            <h2 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.6em] sm:tracking-[0.8em] text-teal-400 mb-4 sm:mb-8 flex items-center gap-2 sm:gap-4">
               <span className="w-6 sm:w-10 h-[1px] bg-teal-400"></span>
               Technical DNA
            </h2>
            <h3 className="text-5xl sm:text-6xl md:text-8xl lg:text-[12rem] font-bold tracking-tighter leading-[0.75] text-white">
              Built <br />
              <span className="text-white/5">Different.</span>
            </h3>
          </div>
          
          <div className="w-full lg:max-w-sm p-6 sm:p-8 lg:p-10 rounded-[32px] sm:rounded-[48px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl mb-0 lg:mb-4">
             <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_15px_rgba(45,212,191,0.8)]"></div>
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-teal-400/50">Runtime Active</span>
             </div>
             <p className="text-base sm:text-lg lg:text-xl text-white/20 leading-relaxed font-medium">
               "{DWARKESH_STATUS.role}"
             </p>
          </div>
        </motion.div>
      </div>

      {/* 3D Scroll Sequence for Skills */}
      <div className="relative">
        {categories.map((cat, i) => (
          <SkillCategoryZone 
            key={cat} 
            category={cat} 
            skills={SKILLS.filter(s => s.category === cat)} 
            index={i} 
          />
        ))}
      </div>

      {/* Extra space for scroll feel */}
      <div className="h-[10vh] sm:h-[20vh]"></div>
    </section>
  );
};

export default Skills;
