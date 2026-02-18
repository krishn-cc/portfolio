import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionBootSequenceProps {
  onComplete: () => void;
}

const MissionBootSequence: React.FC<MissionBootSequenceProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [bootComplete, setBootComplete] = useState(false);

  const bootMessages = [
    '> INITIALIZING MISSION CONTROL SYSTEMS...',
    '> LOADING HOLOGRAPHIC INTERFACE...',
    '> ESTABLISHING SECURE CONNECTION...',
    '> CALIBRATING NAVIGATION ARRAYS...',
    '> MOUNTING PROJECT DATABASES...',
    '> ACTIVATING COMMUNICATION PROTOCOLS...',
    '> RUNNING DIAGNOSTIC CHECKS...',
    '> ████████████████████ 100%',
    '> ALL SYSTEMS NOMINAL',
    '> MISSION CONTROL READY',
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootMessages.length) {
        setLines(prev => [...prev, bootMessages[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBootComplete(true);
          setTimeout(onComplete, 800);
        }, 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {!bootComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(45, 212, 191, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(45, 212, 191, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* Corner Brackets */}
          <svg className="absolute top-8 left-8 w-20 h-20" viewBox="0 0 80 80">
            <motion.path
              d="M 5 25 L 5 5 L 25 5"
              stroke="rgba(45, 212, 191, 0.6)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>
          <svg className="absolute top-8 right-8 w-20 h-20" viewBox="0 0 80 80">
            <motion.path
              d="M 75 25 L 75 5 L 55 5"
              stroke="rgba(45, 212, 191, 0.6)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>
          <svg className="absolute bottom-8 left-8 w-20 h-20" viewBox="0 0 80 80">
            <motion.path
              d="M 5 55 L 5 75 L 25 75"
              stroke="rgba(45, 212, 191, 0.6)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>
          <svg className="absolute bottom-8 right-8 w-20 h-20" viewBox="0 0 80 80">
            <motion.path
              d="M 75 55 L 75 75 L 55 75"
              stroke="rgba(45, 212, 191, 0.6)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1 }}
            />
          </svg>

          {/* Main Content */}
          <div className="relative z-10 w-full max-w-3xl px-6">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-white mb-4 uppercase">
                MISSION CONTROL
              </h1>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-teal-400/50"></div>
                <span className="text-teal-400 font-mono text-xs uppercase tracking-[0.3em]">
                  SYSTEM BOOT
                </span>
                <div className="h-px w-12 bg-teal-400/50"></div>
              </div>
            </motion.div>

            {/* Terminal */}
            <div className="bg-black/60 backdrop-blur-sm border border-teal-400/30 rounded-lg p-6 sm:p-8 font-mono text-sm">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-teal-400/20">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-teal-400/50 text-xs">SYSTEM_BOOT.EXE</span>
              </div>

              {/* Boot Messages */}
              <div className="space-y-2 max-h-80 overflow-hidden">
                {lines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2"
                  >
                    <span className="text-teal-400 whitespace-pre text-xs sm:text-sm">
                      {line}
                    </span>
                    {index === lines.length - 1 && !bootComplete && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="text-teal-400"
                      >
                        _
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mt-6 pt-4 border-t border-teal-400/20">
                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${(lines.length / bootMessages.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-teal-400 to-blue-400 shadow-[0_0_20px_rgba(45,212,191,0.6)]"
                  />
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-teal-400/50 text-[10px]">
                    {Math.round((lines.length / bootMessages.length) * 100)}% COMPLETE
                  </span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]"
                    />
                    <span className="text-teal-400/50 text-[10px]">LOADING...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* System Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-6 flex justify-center gap-8 text-[10px] text-white/30 font-mono"
            >
              <span>SYS.ID: DWK-2026</span>
              <span>VER: 2.0.0</span>
              <span>BUILD: 02092026</span>
            </motion.div>
          </div>

          {/* Scanline Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-10"
            animate={{ 
              backgroundPosition: ['0% 0%', '0% 100%'] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            style={{
              backgroundImage: 'linear-gradient(transparent 50%, rgba(45, 212, 191, 0.5) 50%)',
              backgroundSize: '100% 4px',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MissionBootSequence;
