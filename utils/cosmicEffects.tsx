import React from 'react';
import { motion } from 'framer-motion';

// Starfield component with multiple depth layers - OPTIMIZED with CSS animations
export const Starfield: React.FC<{ density?: number; speed?: number }> = React.memo(({ 
  density = 100, 
  speed = 1 
}) => {
  // Optimize for mobile devices - drastically reduce count
  const [isMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const adjustedDensity = isMobile ? Math.floor(density * 0.2) : Math.floor(density * 0.4);
  
  const stars = React.useMemo(() => {
    return Array.from({ length: adjustedDensity }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      layer: Math.floor(Math.random() * 3), // 0 = far, 1 = mid, 2 = near
      twinkleDelay: Math.random() * 3,
      duration: 2 + Math.random() * 2
    }));
  }, [adjustedDensity]);

  return (
    <>
      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity * (star.layer === 2 ? 1 : star.layer === 1 ? 0.8 : 0.5),
              animation: `starTwinkle ${star.duration}s ease-in-out ${star.twinkleDelay}s infinite`,
              willChange: 'opacity, transform',
              transform: 'translateZ(0)' // GPU acceleration
            }}
          />
        ))}
      </div>
    </>
  );
});

Starfield.displayName = 'Starfield';

// Nebula cloud effect - OPTIMIZED with CSS
export const NebulaCloud: React.FC<{ 
  colors: string[]; 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  size?: 'sm' | 'md' | 'lg';
}> = React.memo(({ 
  colors, 
  position = 'center',
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'w-[400px] h-[400px] blur-[100px]',
    md: 'w-[600px] h-[600px] blur-[150px]',
    lg: 'w-[1000px] h-[1000px] blur-[200px]'
  };

  const positionClasses = {
    'top-left': 'top-[-20%] left-[-20%]',
    'top-right': 'top-[-20%] right-[-20%]',
    'bottom-left': 'bottom-[-20%] left-[-20%]',
    'bottom-right': 'bottom-[-20%] right-[-20%]',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
  };

  return (
    <>
      <style>{`
        @keyframes nebulaPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.1); opacity: 0.25; }
        }
      `}</style>
      <div
        className={`absolute ${positionClasses[position]} ${sizeClasses[size]} rounded-full`}
        style={{
          background: `radial-gradient(circle, ${colors.join(', ')})`,
          animation: 'nebulaPulse 8s ease-in-out infinite',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)'
        }}
      />
    </>
  );
});

NebulaCloud.displayName = 'NebulaCloud';

// Orbital ring component for skills section
export const OrbitalRing: React.FC<{
  radius: number;
  items: Array<{ name: string; angle: number }>;
  rotationDuration?: number;
  children?: React.ReactNode;
}> = ({ radius, items, rotationDuration = 20, children }) => {
  return (
    <div className="relative" style={{ width: radius * 2, height: radius * 2 }}>
      {/* Central planet/sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
      
      {/* Orbital path */}
      <div 
        className="absolute inset-0 rounded-full border border-white/10"
        style={{ width: radius * 2, height: radius * 2 }}
      />
      
      {/* Orbiting items */}
      {items.map((item, index) => {
        const angle = (item.angle || (index * 360) / items.length) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <motion.div
            key={item.name}
            className="absolute top-1/2 left-1/2"
            style={{
              x: x - 50,
              y: y - 20
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: rotationDuration,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.1
            }}
          >
            <div className="w-24 h-10 flex items-center justify-center">
              <span className="text-xs font-bold text-white/60">{item.name}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// Planet sphere component - Enhanced with innovative 3D effects
export const Planet: React.FC<{
  size: number;
  color: string;
  glowColor: string;
  type: 'nebula' | 'tech' | 'crystal';
}> = React.memo(({ size, color, glowColor, type }) => {
  return (
    <>
      <style>{`
        @keyframes planetRotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        @keyframes planetPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.03); opacity: 1; }
        }
        @keyframes ringRotate {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Multiple glow layers for depth */}
        <div 
          className="absolute inset-[-80%] rounded-full opacity-30 blur-[80px]"
          style={{ 
            backgroundColor: glowColor,
            animation: 'planetPulse 4s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute inset-[-60%] rounded-full opacity-40 blur-[60px]"
          style={{ 
            backgroundColor: glowColor,
            animation: 'planetPulse 3s ease-in-out infinite 0.5s'
          }}
        />
        
        {/* Orbital ring */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 opacity-30"
          style={{
            width: size * 1.6,
            height: size * 0.4,
            borderColor: color,
            animation: 'ringRotate 30s linear infinite',
            transform: 'rotateX(75deg) rotateZ(0deg)',
            transformStyle: 'preserve-3d'
          }}
        />
        
        {/* Main planet sphere */}
        <div
          className="relative rounded-full overflow-hidden"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 35% 35%, ${color}FF, ${color}CC 40%, ${color}99 70%, ${glowColor})`,
            animation: 'planetRotate 25s linear infinite',
            willChange: 'transform',
            transform: 'translateZ(0)',
            boxShadow: `
              inset -15px -15px 40px rgba(0, 0, 0, 0.5),
              inset 15px 15px 40px ${glowColor},
              0 0 50px ${glowColor},
              0 0 100px ${glowColor}50
            `
          }}
        >
          {/* Glossy highlight */}
          <div 
            className="absolute top-[15%] left-[20%] w-[30%] h-[30%] rounded-full opacity-40"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), transparent 60%)'
            }}
          />
          
          {/* Surface detail based on type */}
          {type === 'nebula' && (
            <>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
              {/* Nebula swirls */}
              <div 
                className="absolute inset-0 rounded-full opacity-30"
                style={{
                  background: `radial-gradient(ellipse at 60% 40%, ${color}80 0%, transparent 50%),
                               radial-gradient(ellipse at 30% 70%, ${color}60 0%, transparent 40%)`,
                  animation: 'shimmer 8s ease-in-out infinite',
                  backgroundSize: '200% 200%'
                }}
              />
            </>
          )}
          {type === 'tech' && (
            <>
              <div className="absolute inset-0 rounded-full" 
                style={{
                  backgroundImage: `
                    linear-gradient(${color}40 1.5px, transparent 1.5px),
                    linear-gradient(90deg, ${color}40 1.5px, transparent 1.5px)
                  `,
                  backgroundSize: '15px 15px',
                  opacity: 0.3
                }}
              />
              {/* Circuit patterns */}
              <div className="absolute top-[20%] left-[30%] w-[40%] h-[2px] opacity-40" 
                style={{ backgroundColor: color }} 
              />
              <div className="absolute top-[40%] right-[25%] w-[2px] h-[30%] opacity-40" 
                style={{ backgroundColor: color }} 
              />
              <div className="absolute bottom-[30%] left-[20%] w-[35%] h-[2px] opacity-40" 
                style={{ backgroundColor: color }} 
              />
              
              {/* Animated data streams */}
              <motion.div
                className="absolute top-[25%] left-[15%] w-[3px] h-[3px] rounded-full"
                style={{ backgroundColor: color }}
                animate={{
                  x: [0, 40, 40, 0],
                  y: [0, 0, 30, 30],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </>
          )}
          {type === 'crystal' && (
            <>
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />
              {/* Crystal facets */}
              <div 
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  background: `
                    conic-gradient(from 0deg at 50% 50%, 
                      transparent 0deg, ${color}80 45deg, transparent 90deg,
                      transparent 90deg, ${color}60 135deg, transparent 180deg,
                      transparent 180deg, ${color}80 225deg, transparent 270deg,
                      transparent 270deg, ${color}60 315deg, transparent 360deg
                    )
                  `
                }}
              />
              {/* Sparkle effect */}
              <motion.div
                className="absolute top-[30%] right-[30%] w-2 h-2 rounded-full bg-white"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </>
          )}
          
          {/* Atmospheric glow overlay */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle at 30% 30%, transparent 40%, ${glowColor}30 100%)`,
              mixBlendMode: 'overlay'
            }}
          />
          
          {/* Shadow side */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at 70% 70%, transparent 30%, rgba(0, 0, 0, 0.7) 100%)'
            }}
          />
        </div>
        
        {/* Floating particles around planet */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 6px ${glowColor}`,
              left: '50%',
              top: '50%',
            }}
            animate={{
              x: Math.cos(i * 45 * Math.PI / 180) * size * 0.6,
              y: Math.sin(i * 45 * Math.PI / 180) * size * 0.6,
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
});

// Shooting star effect
export const ShootingStar: React.FC = React.memo(() => {
  // Optimize for mobile - fewer shooting stars
  const [isMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const starCount = isMobile ? 3 : 5;
  
  const stars = React.useMemo(() => 
    Array.from({ length: starCount }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      startY: Math.random() * 50,
      delay: Math.random() * 10
    })),
    [starCount]
  );

  return (
    <>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute w-1 h-1 bg-white rounded-full will-change-transform"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            boxShadow: '0 0 20px 2px rgba(255, 255, 255, 0.8)'
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            x: [0, 200],
            y: [0, 200],
            scale: [1, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: star.delay,
            repeatDelay: 5,
            ease: "easeOut"
          }}
        >
          <div className="absolute w-40 h-[2px] bg-gradient-to-r from-white to-transparent -rotate-45" />
        </motion.div>
      ))}
    </>
  );
});

ShootingStar.displayName = 'ShootingStar';

// Particle trail effect - FURTHER OPTIMIZED
export const ParticleTrail: React.FC<{ 
  count?: number; 
  color?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}> = React.memo(({ count = 20, color = '#2dd4bf', direction = 'up' }) => {
  // Optimize for mobile devices - drastically reduce for performance
  const [isMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const adjustedCount = isMobile ? Math.floor(count * 0.15) : Math.floor(count * 0.3);
  
  const particles = React.useMemo(() => 
    Array.from({ length: adjustedCount }, (_, i) => ({
      id: i,
      delay: i * 0.05,
      offset: (Math.random() - 0.5) * 20
    })),
    [adjustedCount]
  );

  const directionValues = {
    up: { x: 0, y: -100 },
    down: { x: 0, y: 100 },
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bottom-0 left-1/2 w-1 h-1 rounded-full will-change-transform"
          style={{
            backgroundColor: color,
            x: particle.offset
          }}
          animate={{
            y: [0, directionValues[direction].y],
            x: [particle.offset, particle.offset + directionValues[direction].x * 0.2],
            opacity: [0.8, 0],
            scale: [1, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
});

ParticleTrail.displayName = 'ParticleTrail';

// Holographic screen effect - Optimized for performance
export const HolographicScreen: React.FC<{ children: React.ReactNode }> = React.memo(({ children }) => {
  return (
    <div className="relative">
      {/* Static scanlines */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,255,150,0.3)_50%)] bg-[length:100%_4px]" />
      
      {/* Content */}
      <div className="relative z-0">
        {children}
      </div>
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-teal-400/50" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-teal-400/50" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-teal-400/50" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-teal-400/50" />
    </div>
  );
});
