
import React from 'react';
import { Starfield, NebulaCloud } from '../utils/cosmicEffects.tsx';

const BackgroundEffect: React.FC = React.memo(() => {
  // Optimize particle count for mobile - reduced for performance
  const [isMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const dustCount = isMobile ? 5 : 10;
  
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-black overflow-hidden">
      {/* Dynamic Multi-layer Starfield - reduced density for performance */}
      <div className="absolute inset-0">
        <Starfield density={60} speed={1} />
      </div>
      
      {/* Animated Cosmic Nebulas */}
      <NebulaCloud 
        colors={['#2dd4bf', '#14b8a6', '#0d9488']} 
        position="top-right" 
        size="lg"
      />
      <NebulaCloud 
        colors={['#3b82f6', '#2563eb', '#1d4ed8']} 
        position="bottom-left" 
        size="md"
      />
      <NebulaCloud 
        colors={['#a855f7', '#9333ea', '#7c3aed']} 
        position="center" 
        size="lg"
      />
      
      {/* Cosmic Mesh Grid - Enhanced */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#2dd4bf 1px, transparent 1px), 
            linear-gradient(90deg, #2dd4bf 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(45, 212, 191, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '80px 80px, 80px 80px, 100% 100%'
        }}
      ></div>
      
      {/* Deep Space Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black"></div>
      
      {/* Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay" 
        style={{ 
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          backgroundSize: '200px 200px'
        }}
      ></div>

      {/* Enhanced Vignette */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
      </div>
      
      {/* Cosmic dust particles effect */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(dustCount)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse will-change-transform"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );
});

BackgroundEffect.displayName = 'BackgroundEffect';

export default BackgroundEffect;
