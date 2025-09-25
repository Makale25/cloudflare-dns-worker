import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const startX = Math.random() * window.innerWidth;
      const colors = ['hsl(262, 83%, 58%)', 'hsl(240, 30%, 70%)', 'hsl(280, 60%, 45%)'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      particle.className = 'particle animate-particle-float';
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${startX}px;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color};
        animation-duration: ${8 + Math.random() * 4}s;
        animation-delay: ${Math.random() * 2}s;
      `;
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 12000);
    };

    const interval = setInterval(createParticle, 300);
    
    // Create initial particles
    for (let i = 0; i < 10; i++) {
      setTimeout(createParticle, i * 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ overflow: 'hidden' }}
    />
  );
};

export default ParticleBackground;