
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Journey', href: '#journey' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
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
          scrolled ? 'py-2 sm:py-4' : 'py-4 sm:py-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className={`glass rounded-full px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'shadow-2xl shadow-teal-900/20 border-white/10 bg-black/80' : 'bg-transparent border-transparent'
          }`}>
            <a href="#home" className="flex items-center gap-2 sm:gap-4 group">
              <motion.div 
                whileHover={{ rotate: 90, scale: 1.1 }}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-black text-xl sm:text-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                D
              </motion.div>
              <span className="font-black tracking-tighter hidden sm:block text-lg sm:text-xl text-white">DWARKESH</span>
            </a>

            <div className="hidden lg:flex items-center gap-8 xl:gap-12">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ scale: 1.1, color: '#2dd4bf' }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40 hover:text-white transition-all"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
              <motion.a 
                whileHover={{ scale: 1.2, color: '#2dd4bf' }}
                href="https://github.com/krishn-cc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/30 hover:text-white transition-colors hidden sm:block"
              >
                <Github size={20} className="sm:w-[22px] sm:h-[22px]" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, color: '#2dd4bf' }}
                href="https://www.linkedin.com/in/dwarkesh-dubey-a34287367/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/30 hover:text-white transition-colors hidden sm:block"
              >
                <Linkedin size={20} className="sm:w-[22px] sm:h-[22px]" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="hidden md:flex bg-white text-black px-6 lg:px-10 py-3 lg:py-4 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl"
              >
                Connect
              </motion.a>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-white/60 hover:text-white transition-colors p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-80 bg-black/95 backdrop-blur-xl z-50 lg:hidden"
          >
            <div className="flex flex-col h-full p-8 pt-24">
              <div className="flex flex-col gap-6 mb-12">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-2xl font-black tracking-tight text-white/60 hover:text-teal-400 transition-colors"
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>

              <div className="flex gap-6 mt-auto">
                <motion.a 
                  whileHover={{ scale: 1.1 }}
                  href="https://github.com/krishn-cc" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-teal-400 hover:border-teal-400/30 transition-all"
                >
                  <Github size={20} />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1 }}
                  href="https://www.linkedin.com/in/dwarkesh-dubey-a34287367/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-teal-400 hover:border-teal-400/30 transition-all"
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>

              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                onClick={handleLinkClick}
                className="mt-6 bg-white text-black px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl text-center"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
