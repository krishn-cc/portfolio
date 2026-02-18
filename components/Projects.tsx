
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PROJECTS } from '../constants.tsx';
import { ArrowUpRight, Github, ExternalLink, Zap, Star, Code2, Sparkles } from 'lucide-react';
import { NebulaCloud } from '../utils/cosmicEffects.tsx';

const ProjectCard = React.memo(({ project, index }: { project: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isFeatured = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        delay: index * 0.15, 
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        y: -12,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group relative ${isFeatured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
    >
      {/* Animated outer glow */}
      <motion.div 
        className="absolute -inset-1 bg-gradient-to-r from-teal-400/0 via-teal-400/30 to-teal-400/0 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
        animate={isHovered ? { scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Main card container */}
      <div className={`relative h-full ${isFeatured ? 'min-h-[600px]' : 'min-h-[400px]'} rounded-3xl border-2 border-teal-400/30 bg-black overflow-hidden group-hover:border-teal-400/60 transition-all duration-500 shadow-[0_0_50px_rgba(45,212,191,0.1)]`}>
        
        {/* Background image with parallax */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dynamic overlay gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 group-hover:from-black/95 group-hover:via-black/70 transition-all duration-500"
          />
          
          {/* Animated scan lines */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-400/5 to-transparent h-32"
              animate={{ y: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Corner brackets */}
        <div className="absolute inset-3 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-teal-400/60" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-teal-400/60" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-teal-400/60" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-teal-400/60" />
        </div>

        {/* Featured badge */}
        {isFeatured && (
          <motion.div 
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            className="absolute top-6 left-6 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-400/20 via-cyan-400/20 to-teal-400/20 border border-teal-400/40 backdrop-blur-xl"
          >
            <Star className="w-4 h-4 text-teal-400 fill-teal-400" />
            <span className="text-xs font-black uppercase tracking-wider text-teal-400">Featured</span>
          </motion.div>
        )}

        {/* Status indicator */}
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 border border-teal-400/30 backdrop-blur-xl">
          <div className="w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)] animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-white/60">Live</span>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 lg:p-10 z-20">
          {/* Project number */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 + 0.2 }}
            className="mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-gradient-to-r from-teal-400/60 to-transparent" />
              <span className="text-teal-400/80 font-black text-xs uppercase tracking-[0.3em]">
                Project {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>

          {/* Title & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.3 }}
            className="mb-4 space-y-2"
          >
            <h3 className={`font-black tracking-tight text-white uppercase leading-none ${isFeatured ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl'}`}>
              {project.title}
            </h3>
            <p className={`text-teal-300/90 font-semibold italic ${isFeatured ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
              "{project.tagline}"
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.4 }}
            className={`text-white/60 leading-relaxed mb-6 ${isFeatured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'} line-clamp-3`}
          >
            {project.description}
          </motion.p>

          {/* Tech stack */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.5 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {project.tech.map((tech: string) => (
              <span 
                key={tech} 
                className="px-3 py-1.5 bg-teal-400/10 border border-teal-400/30 rounded-lg text-xs font-bold uppercase tracking-wider text-teal-400/80 hover:bg-teal-400/20 hover:border-teal-400/50 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.6 }}
            className="flex gap-3"
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-400/20 to-cyan-400/20 border-2 border-teal-400/50 text-white font-bold text-sm uppercase tracking-wide hover:border-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-all duration-300"
            >
              <Github className="w-4 h-4" />
              <span>View Code</span>
            </motion.a>

            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center p-3 rounded-xl bg-white/10 border-2 border-white/20 hover:border-teal-400/50 hover:bg-teal-400/10 transition-all duration-300"
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
            </motion.a>
          </motion.div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-teal-400/0 via-transparent to-teal-400/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

const Projects: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const smoothOpacity = useSpring(opacity, { damping: 25, stiffness: 50, mass: 0.8 });

  return (
    <section ref={sectionRef} id="projects" className="relative z-20 bg-black overflow-hidden py-20 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-black z-0" />
      
      {/* Nebula clouds */}
      <div className="absolute inset-0 z-0">
        <NebulaCloud colors={['#14b8a6', '#2dd4bf', '#5eead4']} position="top-right" size="lg" />
        <NebulaCloud colors={['#14b8a6', '#2dd4bf', '#5eead4']} position="bottom-left" size="lg" />
      </div>

      {/* Animated grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #2dd4bf 1px, transparent 1px),
            linear-gradient(to bottom, #2dd4bf 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-teal-400/60 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.7)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.4, 0.9, 0.4],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mb-16 sm:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 lg:gap-12"
        >
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-gradient-to-r from-teal-400 to-transparent" />
              <span className="text-teal-400 font-black text-xs uppercase tracking-[0.5em]">
                Portfolio
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter leading-[0.85] text-white mb-6"
            >
              Featured<br />
              <span className="bg-gradient-to-r from-teal-400/30 via-teal-400/20 to-transparent bg-clip-text text-transparent">Projects.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:max-w-md p-8 rounded-3xl border border-teal-400/20 bg-gradient-to-br from-black/60 via-teal-950/10 to-black/60 backdrop-blur-xl shadow-[0_0_50px_rgba(45,212,191,0.1)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <span className="text-teal-400/60 font-black text-xs uppercase tracking-widest">
                Innovation Lab
              </span>
            </div>
            <p className="text-white/30 leading-relaxed">
              Explore cutting-edge projects showcasing modern tech stacks, innovative solutions, and creative problem-solving.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        style={{ opacity: smoothOpacity }}
        className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-auto">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border-2 border-teal-400/30 bg-gradient-to-r from-black/80 via-teal-950/20 to-black/80 backdrop-blur-xl">
            <Code2 className="w-5 h-5 text-teal-400" />
            <span className="text-white/60 font-bold text-sm uppercase tracking-wider">
              More Projects on GitHub
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ExternalLink className="w-4 h-4 text-teal-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
