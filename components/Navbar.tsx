
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X, Download, Rocket } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Launch', href: '#home' },
    { name: 'Sectors', href: '#skills' },
    { name: 'Timeline', href: '#journey' },
    { name: 'Stations', href: '#projects' },
    { name: 'Signal', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
          scrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`backdrop-blur-2xl rounded-full px-5 sm:px-8 py-3 sm:py-4 flex items-center justify-between transition-all duration-500 border ${
            scrolled 
              ? 'shadow-[0_0_40px_rgba(45,212,191,0.15)] border-teal-400/20 bg-black/90' 
              : 'bg-black/30 border-white/10'
          }`}>
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 sm:gap-4 group">
              <motion.div 
                whileHover={{ rotate: 180, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-black text-xl sm:text-2xl shadow-[0_0_25px_rgba(45,212,191,0.4)]"
              >
                D
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-white/20"></div>
              </motion.div>
              <div className="hidden sm:block">
                <div className="font-black tracking-tighter text-base sm:text-lg text-white flex items-center gap-2">
                  DWARKESH
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Rocket className="w-3 h-3 text-teal-400" />
                  </motion.div>
                </div>
                <div className="text-[8px] text-teal-400/60 font-mono tracking-wider">MISSION_CTRL</div>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ y: -2 }}
                  className="group relative text-[10px] uppercase font-black tracking-[0.3em] text-white/50 hover:text-teal-400 transition-all"
                >
                  {link.name}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-[2px] bg-teal-400 rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.2 }}
                  />
                  <span className="absolute -top-3 left-0 text-[8px] text-teal-400/40 font-mono">0{i + 1}</span>
                </motion.a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <motion.a 
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/krishn-cc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/40 hover:text-teal-400 transition-colors hidden sm:block"
              >
                <Github size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/dwarkesh-dubey-a34287367/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/40 hover:text-teal-400 transition-colors hidden sm:block"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(45,212,191,0.5)' }}
                whileTap={{ scale: 0.95 }}
                href="/resume (1).pdf" 
                download="Dwarkesh_Dubey_Resume.pdf"
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-black px-5 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all shadow-lg"
              >
                <Download size={14} />
                <span>RESUME</span>
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: '#2dd4bf' }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="hidden md:flex bg-white text-black px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:text-black transition-all shadow-lg"
              >
                CONNECT
              </motion.a>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white/60 hover:text-teal-400 transition-colors p-2 rounded-lg hover:bg-white/5"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[65] lg:hidden"
          />
        )}
      </AnimatePresence>
      
      {/* Enhanced Mobile Menu - Mission Control Theme */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-gradient-to-br from-black via-gray-900 to-black z-[70] lg:hidden border-l border-teal-400/20"
          >
              <div className="flex flex-col h-full p-6 sm:p-8 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[100px]"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px]"></div>
                </div>
                
                {/* Header */}
                <div className="flex justify-between items-center mb-12 relative z-10">
                  <div>
                    <div className="font-black text-xl text-white">MISSION CONTROL</div>
                    <div className="text-teal-400/60 font-mono text-xs mt-1">MAIN_NAVIGATION</div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9, rotate: 90 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-teal-400 hover:border-teal-400/30 transition-all"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
                
                {/* Navigation Links */}
                <div className="flex flex-col gap-5 mb-auto relative z-10">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={handleLinkClick}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ x: 10, backgroundColor: 'rgba(45,212,191,0.05)' }}
                      className="group flex items-center gap-4 p-4 rounded-2xl transition-all"
                    >
                      <span className="text-teal-400/40 font-mono text-xs">0{i + 1}</span>
                      <span className="text-xl sm:text-2xl font-black tracking-tight text-white/70 group-hover:text-teal-400 transition-colors">
                        {link.name}
                      </span>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mb-6 relative z-10">
                  <motion.a 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(45,212,191,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    href="https://github.com/krishn-cc" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-teal-400 hover:border-teal-400/30 transition-all"
                  >
                    <Github size={18} />
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(45,212,191,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.linkedin.com/in/dwarkesh-dubey-a34287367/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-teal-400 hover:border-teal-400/30 transition-all"
                  >
                    <Linkedin size={18} />
                  </motion.a>
                </div>

                {/* Action Buttons */}
                <motion.a 
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(45,212,191,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  href="/resume (1).pdf"
                  download="Dwarkesh_Dubey_Resume.pdf"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-teal-400 text-black px-6 py-4 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-lg mb-3 relative z-10"
                >
                  <Download size={16} />
                  <span>Download Resume</span>
                </motion.a>

                <motion.a 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  onClick={handleLinkClick}
                  className="bg-white text-black px-6 py-4 rounded-full text-xs font-black uppercase tracking-wider hover:bg-gray-200 transition-all shadow-lg text-center relative z-10"
                >
                  Initiate Contact
                </motion.a>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
