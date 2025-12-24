
import React from 'react';

const BackgroundEffect: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 bg-[#050505]">
      {/* Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#2dd4bf 1px, transparent 1px), linear-gradient(90deg, #2dd4bf 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      ></div>
      
      {/* Deep Teal & Blue Glow Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-teal-900/10 rounded-full blur-[200px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[200px] animate-pulse delay-1000"></div>
      
      {/* Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
    </div>
  );
};

export default BackgroundEffect;
