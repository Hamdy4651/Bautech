import { useMemo } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks';

interface ParticlesProps {
  count?: number;
  className?: string;
}

export default function Particles({ count = 20, className = '' }: ParticlesProps) {
  const reduced = usePrefersReducedMotion();

  const particles = useMemo(() => {
    if (reduced) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.05,
    }));
  }, [count, reduced]);

  if (reduced) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `float-particle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
