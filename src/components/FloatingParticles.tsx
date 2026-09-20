import React, { useMemo } from 'react';

interface Particle {
  id: number;
  type: 'heart' | 'petal' | 'star';
  size: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const FloatingParticles: React.FC = () => {
  const particles = useMemo(() => {
    const items: Particle[] = [];
    for (let i = 0; i < 28; i++) {
      items.push({
        id: i,
        type: i % 3 === 0 ? 'heart' : i % 3 === 1 ? 'petal' : 'star',
        size: Math.floor(Math.random() * 16) + 12,
        left: Math.floor(Math.random() * 98),
        duration: Math.floor(Math.random() * 12) + 10,
        delay: Math.floor(Math.random() * 8),
        opacity: Math.random() * 0.4 + 0.2,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none will-change-transform"
          style={{
            left: `${p.left}%`,
            bottom: '-20px',
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'heart' ? '💖' : p.type === 'petal' ? '🌸' : '✨'}
        </span>
      ))}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: var(--tw-opacity, 0.4);
          }
          85% {
            opacity: var(--tw-opacity, 0.4);
          }
          100% {
            transform: translateY(-110vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
