
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`glass rounded-full px-8 py-4 flex items-center justify-between transition-all duration-500 ${
          scrolled ? 'shadow-2xl shadow-teal-900/20 border-white/10 bg-black/80' : 'bg-transparent border-transparent'
        }`}>
          <a href="#home" className="flex items-center gap-4 group">
            <motion.div 
              whileHover={{ rotate: 90, scale: 1.1 }}
              className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-black text-2xl shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              D
            </motion.div>
            <span className="font-black tracking-tighter hidden md:block text-xl text-white">DWARKESH</span>
          </a>

          <div className="hidden lg:flex items-center gap-12">
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

          <div className="flex items-center gap-6 md:gap-8">
            <motion.a 
              whileHover={{ scale: 1.2, color: '#2dd4bf' }}
              href="https://github.com/krishn-cc" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/30 hover:text-white transition-colors"
            >
              <Github size={22} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, color: '#2dd4bf' }}
              href="https://www.linkedin.com/in/dwarkesh-dubey-a34287367/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-white/30 hover:text-white transition-colors"
            >
              <Linkedin size={22} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact" 
              className="hidden sm:flex bg-white text-black px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-teal-400 transition-all shadow-xl"
            >
              Connect
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
