
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Send, Mail, MapPin, Globe, Linkedin, CheckCircle2, XCircle, Antenna, Radio } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Starfield } from '../utils/cosmicEffects.tsx';

// EmailJS Configuration - Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = 'service_xdpcsqt'; // From EmailJS dashboard
const EMAILJS_TEMPLATE_ID_FEEDBACK = 'template_bnu6jwp'; // Template for receiving feedback
const EMAILJS_TEMPLATE_ID_THANKYOU = 'template_syr7g53'; // Template for thank you message
const EMAILJS_PUBLIC_KEY = 'YmuqYfbyWGO_86LxM'; // Your EmailJS public key

const Contact: React.FC = () => {
  const containerRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // 3D Transforms
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], [0.7, 1.05, 1.05, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const textX = useTransform(scrollYProgress, [0, 1], ['-40%', '40%']);

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
      value: "KL University, Hyderabad, India",
      href: null
    },
    { 
      icon: <Globe size={24} />, 
      label: "Status", 
      value: "Open for Global Innovation",
      href: null
    }
  ];

  // Handle form input changes - optimized to prevent re-renders
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle form submission - optimized
  const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Initialize EmailJS (only needs to be done once, but safe to call multiple times)
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // 1. Send feedback to your email
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_FEEDBACK,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'dwarkeshdubey21@gmail.com' // Your email
        },
        EMAILJS_PUBLIC_KEY
      );

      // 2. Send thank you email to the user
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID_THANKYOU,
        {
          to_name: formData.name,
          to_email: formData.email,
          from_name: 'Dwarkesh Dubey'
        },
        EMAILJS_PUBLIC_KEY
      );

      // Success!
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for reaching out!! We\'ll get back to you soon. 🚀'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  return (
    <section id="contact" ref={containerRef} className="min-h-screen sm:h-[140vh] relative z-10 bg-black perspective-3000 flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-0">
      {/* Starfield Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <Starfield density={80} speed={0.5} />
      </div>
      
      {/* Floating Satellites */}
      <motion.div
        className="absolute top-10 sm:top-16 md:top-20 right-10 sm:right-16 md:right-20 opacity-10 sm:opacity-15 md:opacity-20"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Antenna className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-teal-400" />
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 sm:bottom-32 md:bottom-40 left-10 sm:left-16 md:left-20 opacity-8 sm:opacity-12 md:opacity-15"
        animate={{
          y: [0, 40, 0],
          rotate: [0, -15, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Radio className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-purple-400" />
      </motion.div>
      
      {/* Huge Background Text */}
      <motion.div 
        style={{ x: textX, opacity: useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.05, 0]) }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span className="text-[35vw] sm:text-[40vw] md:text-[45vw] font-black tracking-tighter uppercase text-white whitespace-nowrap leading-none">
          SIGNAL
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
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 items-center"
      >
        {/* Info Column */}
        <div className="space-y-6 sm:space-y-10 md:space-y-12 lg:space-y-16" style={{ transformStyle: "preserve-3d" }}>
          <div>
            <h2 className="text-[10px] sm:text-[12px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] md:tracking-[1em] text-teal-400 mb-4 sm:mb-6 md:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
               <span className="w-6 sm:w-10 md:w-12 lg:w-16 h-[1px] bg-teal-400"></span>
               Communications Hub
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.75] text-white">
              Let's Build <br />
              <span className="text-teal-400/20">Together</span>
            </h3>
            <div className="mt-4 sm:mt-6 md:mt-8 flex items-center gap-2 sm:gap-3 text-teal-400/60 text-xs sm:text-sm font-mono">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-400 animate-pulse"></div>
              <span>Transmission Active</span>
            </div>
          </div>
          
          <div className="space-y-3 sm:space-y-4 md:space-y-6 mt-6 sm:mt-8 md:mt-12">
            {contactItems.map((item, i) => (
              <motion.a 
                key={i}
                href={item.href || '#'}
                target={item.href?.startsWith('http') ? "_blank" : undefined}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={item.href ? { x: 20, translateZ: 50, backgroundColor: 'rgba(45,212,191,0.05)' } : {}}
                className={`flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 group p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all ${item.href ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-[14px] sm:rounded-[16px] md:rounded-[20px] lg:rounded-[24px] bg-white/[0.05] border-2 border-white/10 flex items-center justify-center text-white/30 group-hover:text-teal-400 group-hover:border-teal-400/50 group-hover:bg-teal-400/10 transition-all duration-500 shadow-inner flex-shrink-0">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6">{item.icon}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/30 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] mb-0.5 sm:mb-1">{item.label}</p>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white tracking-tight group-hover:text-teal-400 transition-colors break-words">{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* 3D Form Card - Communications Terminal */}
        <motion.div
          style={{ transformStyle: "preserve-3d", transform: "translateZ(100px)" }}
          className="relative group"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Terminal Glow */}
          <div className="absolute -inset-1 bg-gradient-to-br from-teal-500/20 via-blue-500/10 to-purple-500/20 blur-[60px] sm:blur-[80px] md:blur-[100px] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          {/* Terminal Frame */}
          <div className="relative glass p-6 sm:p-8 md:p-10 lg:p-16 rounded-[32px] sm:rounded-[40px] md:rounded-[48px] lg:rounded-[60px] border-2 border-white/20 bg-gradient-to-br from-[#0a0a0a] to-[#050505] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)]">
            {/* Terminal Header */}
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/60"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/60"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/60"></div>
                </div>
                <span className="text-white/40 font-mono text-[10px] sm:text-xs">COMMS.TERMINAL</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-400 animate-pulse"></div>
                <span className="text-teal-400/60 text-[10px] sm:text-xs font-mono">ONLINE</span>
              </div>
            </div>
            
            <form ref={formRef} className="space-y-4 sm:space-y-6 md:space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[8px] sm:text-[10px] font-black text-teal-400/50 uppercase tracking-[0.3em] sm:tracking-[0.4em] ml-3 sm:ml-4">Sender ID</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/[0.05] border-2 border-white/10 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-3.5 sm:py-4 outline-none focus:border-teal-400/50 focus:bg-teal-400/5 transition-all text-white font-medium placeholder:text-white/20 text-sm disabled:opacity-50 touch-manipulation"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-[8px] sm:text-[10px] font-black text-teal-400/50 uppercase tracking-[0.3em] sm:tracking-[0.4em] ml-3 sm:ml-4">Frequency</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white/[0.05] border-2 border-white/10 rounded-[16px] sm:rounded-[20px] md:rounded-[24px] px-4 sm:px-5 py-3.5 sm:py-4 outline-none focus:border-teal-400/50 focus:bg-teal-400/5 transition-all text-white font-medium placeholder:text-white/20 text-sm disabled:opacity-50 touch-manipulation"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <label className="text-[8px] sm:text-[10px] font-black text-teal-400/50 uppercase tracking-[0.3em] sm:tracking-[0.4em] ml-3 sm:ml-4">Transmission Content</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Encode your message..."
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white/[0.05] border-2 border-white/10 rounded-[20px] sm:rounded-[24px] md:rounded-[28px] px-4 sm:px-5 py-3.5 sm:py-4 outline-none focus:border-teal-400/50 focus:bg-teal-400/5 transition-all text-white font-medium resize-none placeholder:text-white/20 leading-relaxed disabled:opacity-50 touch-manipulation"
                ></textarea>
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <motion.div
                  key={submitStatus.message}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`flex items-center gap-2 sm:gap-3 p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] border-2 ${
                    submitStatus.type === 'success' 
                      ? 'bg-teal-500/10 border-teal-500/40 text-teal-400' 
                      : 'bg-red-500/10 border-red-500/40 text-red-400'
                  }`}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle2 size={20} className="sm:w-[22px] sm:h-[22px] flex-shrink-0" />
                  ) : (
                    <XCircle size={20} className="sm:w-[22px] sm:h-[22px] flex-shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">{submitStatus.message}</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02, translateZ: 50 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full bg-gradient-to-r from-teal-500 to-teal-400 text-black rounded-full py-4 sm:py-5 font-black text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.5em] flex items-center justify-center gap-3 sm:gap-4 group shadow-[0_0_40px_rgba(45,212,191,0.3)] hover:shadow-[0_0_60px_rgba(45,212,191,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:from-gray-600 disabled:to-gray-500"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Transmitting Signal...</span>
                    <span className="sm:hidden">Sending...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Initiate Transmission</span>
                    <span className="sm:hidden">Send Message</span>
                    <Send size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
