
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Send, Mail, MapPin, Globe, Linkedin } from 'lucide-react';

const Contact: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 3D Transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textX = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);

  const springConfig = { damping: 40, stiffness: 50, mass: 1 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothY = useSpring(y, springConfig);

  const contactItems = [
    { 
      icon: <Mail size={24} />, 
      label: "Direct Channel", 
      value: "dwarkeshdubey21@gmail.com",
      href: "mailto:dwarkeshdubey21@gmail.com"
    },
    { 
      icon: <Linkedin size={24} />, 
      label: "Professional Network", 
      value: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/dwarkesh-dubey-a34287367/"
    },
    { 
      icon: <MapPin size={24} />, 
      label: "Geolocation", 
      value: "KL University, AP, India",
      href: null
    },
    { 
      icon: <Globe size={24} />, 
      label: "Status", 
      value: "Open for Global Innovation",
      href: null
    }
  ];

  return (
    <section id="contact" ref={containerRef} className="h-[140vh] relative z-10 bg-black perspective-3000 flex items-center justify-center overflow-hidden">
      {/* Huge Background Text */}
      <motion.div 
        style={{ x: textX, opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.06, 0]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[40vw] font-black tracking-tighter uppercase text-white whitespace-nowrap leading-none">
          CONTACT
        </span>
      </motion.div>

      {/* 3D Container */}
      <motion.div
        style={{ 
          rotateX: smoothRotateX,
          scale: smoothScale,
          opacity,
          y: smoothY,
          transformStyle: "preserve-3d"
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
      >
        {/* Info Column */}
        <div className="space-y-16" style={{ transformStyle: "preserve-3d" }}>
          <div>
            <h2 className="text-[12px] font-black uppercase tracking-[1em] text-teal-400 mb-10 flex items-center gap-6">
               <span className="w-16 h-[1px] bg-teal-400"></span>
               Connectivity
            </h2>
            <h3 className="text-7xl md:text-9xl font-bold tracking-tighter leading-[0.8] text-white">Let's build <br /><span className="text-white/5 uppercase">the future.</span></h3>
          </div>
          
          <div className="space-y-6 mt-12">
            {contactItems.map((item, i) => (
              <motion.a 
                key={i}
                href={item.href || '#'}
                target={item.href?.startsWith('http') ? "_blank" : undefined}
                whileHover={item.href ? { x: 20, translateZ: 50 } : {}}
                className={`flex items-center gap-8 group ${item.href ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="w-16 h-16 rounded-[24px] bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/20 group-hover:text-teal-400 group-hover:border-teal-400/30 group-hover:bg-teal-400/5 transition-all duration-500">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-1">{item.label}</p>
                  <p className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-teal-400 transition-colors">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* 3D Form Card */}
        <motion.div
          style={{ transformStyle: "preserve-3d", transform: "translateZ(100px)" }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-teal-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <div className="relative glass p-12 md:p-16 rounded-[60px] border border-white/10 bg-[#080808] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)]">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-6">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[28px] px-8 py-5 outline-none focus:border-teal-400/40 transition-all text-white font-medium placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-6">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-[28px] px-8 py-5 outline-none focus:border-teal-400/40 transition-all text-white font-medium placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] ml-6">System Query</label>
                <textarea 
                  rows={4}
                  placeholder="Describe the project scope..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[32px] px-8 py-5 outline-none focus:border-teal-400/40 transition-all text-white font-medium resize-none placeholder:text-white/10"
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05, translateZ: 50, backgroundColor: "#2dd4bf" }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-black rounded-full py-6 font-black text-xs uppercase tracking-[0.5em] flex items-center justify-center gap-6 group shadow-2xl transition-all"
              >
                Initiate Transmit
                <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
