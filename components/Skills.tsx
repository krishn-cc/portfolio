
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SKILLS, DWARKESH_STATUS, COSMIC_THEMES } from '../constants.tsx';
import { Planet, NebulaCloud } from '../utils/cosmicEffects.tsx';

const SkillCard = React.memo(({ name, index, category }: { name: string, index: number, category: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: index * 0.04, 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group relative perspective-1000"
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-[1px] bg-gradient-to-r from-teal-400/0 via-teal-400/40 to-teal-400/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      <div className="absolute -inset-[1px] bg-gradient-to-br from-teal-400/20 via-cyan-400/20 to-teal-400/20 rounded-2xl opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />
      
      {/* Main card */}
      <div className="relative px-5 py-4 rounded-2xl border border-teal-400/30 bg-gradient-to-br from-black/80 via-teal-950/20 to-black/80 backdrop-blur-xl overflow-hidden transition-all duration-300 group-hover:border-teal-400/60 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.2)]">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/5 via-transparent to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/10 to-transparent h-[100px]"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <span className="relative z-10 text-sm sm:text-base font-bold uppercase tracking-[0.15em] text-white/80 group-hover:text-teal-400 transition-colors duration-300 whitespace-nowrap drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]">
          {name}
        </span>
      </div>
    </motion.div>
  );
});

SkillCard.displayName = 'SkillCard';


const Skills: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const smoothOpacity = useSpring(opacity, { damping: 25, stiffness: 50, mass: 0.8 });

  // Group skills by category
  const frontend = SKILLS.filter(s => s.category === 'Frontend');
  const backend = SKILLS.filter(s => s.category === 'Backend');
  const languages = SKILLS.filter(s => s.category === 'Language');

  return (
    <section ref={sectionRef} id="skills" className="relative z-30 bg-black overflow-hidden isolate min-h-screen py-20 sm:py-32">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Nebula Background */}
      <div className="absolute inset-0 z-0">
        <NebulaCloud colors={['#14b8a6', '#2dd4bf', '#5eead4']} position="top-left" size="lg" />
        <NebulaCloud colors={['#14b8a6', '#2dd4bf', '#5eead4']} position="bottom-right" size="lg" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 opacity-[0.06]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #2dd4bf 1px, transparent 1px),
            linear-gradient(to bottom, #2dd4bf 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-teal-400/60 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.6)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Intro Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 sm:gap-12 lg:gap-16">
          <div className="max-w-4xl relative">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.6em] sm:tracking-[0.8em] text-teal-400 mb-4 sm:mb-8 flex items-center gap-2 sm:gap-4"
            >
               <span className="w-6 sm:w-10 h-[1px] bg-teal-400"></span>
               Tech Arsenal
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.75] text-white"
            >
              Tech <br />
              <span className="bg-gradient-to-r from-teal-400/20 via-teal-400/10 to-transparent bg-clip-text text-transparent">Stack.</span>
            </motion.h3>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full lg:max-w-sm p-6 sm:p-8 lg:p-10 rounded-[32px] sm:rounded-[48px] border border-teal-400/20 bg-gradient-to-br from-black/60 via-teal-950/10 to-black/60 backdrop-blur-3xl mb-0 lg:mb-4 shadow-[0_0_50px_rgba(45,212,191,0.1)]"
          >
             <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_15px_rgba(45,212,191,0.8)]"></div>
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-teal-400/50">Systems Online</span>
             </div>
             <p className="text-base sm:text-lg lg:text-xl text-white/20 leading-relaxed font-medium">
               "Advanced tech matrix powering next-gen solutions"
             </p>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Bento Grid */}
      <motion.div 
        style={{ opacity: smoothOpacity }}
        className="relative z-20 max-w-[1400px] mx-auto px-4 sm:px-6 pb-16 sm:pb-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Frontend Section - Larger featured card */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
                <h4 className="text-teal-400 font-black text-lg sm:text-xl lg:text-2xl uppercase tracking-[0.2em]">Frontend</h4>
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-transparent" />
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {frontend.map((skill, i) => (
                <SkillCard key={skill.name} name={skill.name} index={i} category="Frontend" />
              ))}
            </div>
          </div>

          {/* Languages Section - Vertical card */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
                <h4 className="text-teal-400 font-black text-lg sm:text-xl lg:text-2xl uppercase tracking-[0.2em]">Languages</h4>
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-transparent" />
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {languages.map((skill, i) => (
                <SkillCard key={skill.name} name={skill.name} index={i + frontend.length + backend.length} category="Language" />
              ))}
            </div>
          </div>

          {/* Backend Section - Full width */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
                <h4 className="text-teal-400 font-black text-lg sm:text-xl lg:text-2xl uppercase tracking-[0.2em]">Backend</h4>
              </div>
              <div className="h-[2px] flex-grow bg-gradient-to-r from-teal-400/40 via-teal-400/20 to-transparent" />
            </motion.div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {backend.map((skill, i) => (
                <SkillCard key={skill.name} name={skill.name} index={i + frontend.length} category="Backend" />
              ))}
            </div>
          </div>
        </div>

        {/* Tech count indicator with animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border-2 border-teal-400/30 bg-gradient-to-r from-black/80 via-teal-950/20 to-black/80 backdrop-blur-xl shadow-[0_0_30px_rgba(45,212,191,0.2)]">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
              <div className="absolute inset-0 w-3 h-3 rounded-full bg-teal-400 animate-ping" />
            </div>
            <span className="text-white/60 text-sm font-black uppercase tracking-wider">
              {SKILLS.length} Technologies
            </span>
            <div className="h-4 w-[1px] bg-teal-400/30" />
            <span className="text-teal-400 text-sm font-black uppercase tracking-wider">
              Mastered
            </span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
