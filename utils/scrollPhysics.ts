// Scroll physics and smooth scroll utilities

export const smoothScrollTo = (targetId: string, offset: number = 0) => {
  const element = document.getElementById(targetId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const getScrollProgress = (element: HTMLElement | null, offset: [string, string] = ["start end", "end start"]): number => {
  if (!element) return 0;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const elementHeight = rect.height;
  
  // Calculate progress based on element visibility
  const start = rect.top + elementHeight;
  const end = rect.bottom;
  
  if (start <= 0) return 1;
  if (end >= windowHeight) return 0;
  
  return 1 - (start / (windowHeight + elementHeight));
};

export const createSnapPoints = (sections: string[]): void => {
  // Add CSS for snap scrolling
  const style = document.createElement('style');
  style.innerHTML = `
    html {
      scroll-snap-type: y proximity;
      scroll-behavior: smooth;
    }
    
    .snap-section {
      scroll-snap-align: start;
      scroll-snap-stop: normal;
    }

    @media (prefers-reduced-motion: reduce) {
      html {
        scroll-snap-type: none;
        scroll-behavior: auto;
      }
    }
  `;
  
  if (!document.querySelector('#snap-scroll-styles')) {
    style.id = 'snap-scroll-styles';
    document.head.appendChild(style);
  }
};

export const easeOutCubic = (x: number): number => {
  return 1 - Math.pow(1 - x, 3);
};

export const easeInOutCubic = (x: number): number => {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

// Calculate parallax offset based on scroll
export const calculateParallax = (scrollProgress: number, intensity: number = 1): number => {
  return (scrollProgress - 0.5) * 100 * intensity;
};

// Detect if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Debounce function for resize events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function(this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};
